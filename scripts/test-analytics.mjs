/**
 * End-to-end checks for the GA4 measurement layer.
 *
 * These assert behaviour that cannot be seen in the source: the ORDER of the
 * consent calls against the library load, whether a stored choice is applied
 * before the first hit, whether a route change actually produces a second page
 * view, and whether a refresh of the Stripe success URL counts the same
 * payment twice. Every one of those reads as correct in the code and is only
 * really settled by running it.
 *
 * Nothing reaches Google: requests to googletagmanager.com are intercepted and
 * fulfilled locally, and the assertions read window.dataLayer, which is where
 * gtag queues everything before the library drains it.
 *
 * Needs a built site running, with a measurement id set:
 *
 *   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-TESTONLY123 npm run build:local
 *   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-TESTONLY123 npx next start -p 3111
 *   npm run test:analytics
 */
import { chromium } from 'playwright';

const BASE = process.env.ANALYTICS_ORIGIN || 'http://localhost:3111';
const browser = await chromium.launch();
const fails = [];
const ok = (label, cond, extra='') => { console.log(`${cond ? 'PASS' : 'FAIL'}  ${label}${extra ? '  ' + extra : ''}`); if (!cond) fails.push(label); };

// Requests to Google are blocked so the test never touches the real network.
const newPage = async () => {
  const ctx = await browser.newContext();
  const hits = [];
  for (const pattern of ['**://*.googletagmanager.com/**', '**://*.clarity.ms/**']) {
    await ctx.route(pattern, (route) => {
      hits.push(route.request().url());
      route.fulfill({ status: 200, contentType: 'application/javascript', body: '' });
    });
  }
  const page = await ctx.newPage();
  page.hits = hits;
  page.ctx = ctx;
  return page;
};

// --- 1. consent defaults to denied, and the banner is offered ---------------
let page = await newPage();
await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });

const consentDefault = await page.evaluate(() =>
  (window.dataLayer || []).filter((a) => a[0] === 'consent' && a[1] === 'default').map((a) => a[2])
);
ok('consent default is queued', consentDefault.length === 1);
ok('analytics_storage defaults to denied', consentDefault[0]?.analytics_storage === 'denied', JSON.stringify(consentDefault[0] || {}));
ok('gtag.js is requested', page.hits.some((u) => u.includes('gtag/js?id=G-TESTONLY123')));
ok('cookie banner is shown to a new visitor', await page.getByRole('dialog', { name: 'Cookies' }).isVisible());

// --- 2. accepting grants analytics storage and remembers the choice ---------
await page.getByRole('button', { name: 'Allow analytics' }).click();
const updates = await page.evaluate(() =>
  (window.dataLayer || []).filter((a) => a[0] === 'consent' && a[1] === 'update').map((a) => a[2])
);
ok('accepting grants analytics_storage', updates.at(-1)?.analytics_storage === 'granted');
ok('advertising storage stays denied', updates.at(-1)?.ad_storage === 'denied');
// The banner animates out, so it is still in the DOM for a moment after the click.
await page.getByRole('dialog', { name: 'Cookies' }).waitFor({ state: 'detached', timeout: 3000 }).catch(() => {});
ok('banner closes after answering', (await page.getByRole('dialog', { name: 'Cookies' }).count()) === 0);

await page.reload({ waitUntil: 'networkidle' });
ok('the choice survives a reload', !(await page.getByRole('dialog', { name: 'Cookies' }).isVisible().catch(() => false)));
const afterReload = await page.evaluate(() =>
  (window.dataLayer || []).filter((a) => a[0] === 'consent' && a[1] === 'update').map((a) => a[2])
);
ok('stored consent re-applies before the first hit', afterReload[0]?.analytics_storage === 'granted');

// --- 3. page views on client-side navigation --------------------------------
const views = async () => page.evaluate(() =>
  (window.dataLayer || []).filter((a) => a[0] === 'event' && a[1] === 'page_view').map((a) => a[2].page_path)
);
ok('the landing page sends one page view', (await views()).length === 1, JSON.stringify(await views()));
// "View All Our Work" points at /case-studies, which server-redirects on to
// /case-studies/feasibility-studies. Exactly two page views must come out of
// that: the landing page and the page they end up on, never the redirect stub.
await page.getByRole('link', { name: 'View All Our Work' }).first().click();
await page.waitForURL('**/case-studies/feasibility-studies');
await page.waitForTimeout(600);
ok('a redirecting navigation sends one page view, not two', (await views()).length === 2, JSON.stringify(await views()));
ok('the redirect stub is never reported', !(await views()).includes('/case-studies'), JSON.stringify(await views()));

// --- 4. the funnel events ---------------------------------------------------
const events = async (p) => p.evaluate(() =>
  (window.dataLayer || []).filter((a) => a[0] === 'event' && a[1] !== 'page_view').map((a) => ({ name: a[1], ...a[2] }))
);

await page.goto(`${BASE}/tools/hmo-calculator`, { waitUntil: 'networkidle' });
// Filled with a value that differs from the default, or React sees no change
// and the handler this test exists to exercise never runs.
await page.getByLabel('Number of rooms').fill('9');
await page.waitForTimeout(300);
let e = await events(page);
ok('changing a field starts the HMO calculator', e.some((x) => x.name === 'calculator_started' && x.source === 'hmo-calculator'), JSON.stringify(e));
ok('starting fires once, not per keystroke', e.filter((x) => x.name === 'calculator_started').length === 1);

await page.goto(`${BASE}/tools/class-ma-checker`, { waitUntil: 'networkidle' });
const before = (await events(page)).length;
await page.getByRole('button').filter({ hasText: /./ }).nth(3).click().catch(() => {});
await page.waitForTimeout(300);
e = await events(page);
ok('answering starts the Class MA checker', e.some((x) => x.name === 'calculator_started' && x.source === 'class-ma-checker'), JSON.stringify(e.slice(before)));

// payment_paid, from the Stripe success URL
const paid = await newPage();
await paid.goto(`${BASE}/feasibility-confirmed?session_id=cs_test_123&tier=automated`, { waitUntil: 'networkidle' });
await paid.waitForTimeout(400);
e = await events(paid);
ok('the Stripe success URL reports payment_paid', e.some((x) => x.name === 'payment_paid' && x.transaction_id === 'cs_test_123'), JSON.stringify(e));
await paid.reload({ waitUntil: 'networkidle' });
await paid.waitForTimeout(400);
e = await events(paid);
ok('a refresh does not count the payment twice', e.filter((x) => x.name === 'payment_paid').length === 0, JSON.stringify(e));

// payment_abandoned, from the Stripe cancel URL
const cancelled = await newPage();
await cancelled.goto(`${BASE}/pricing?cancelled=1`, { waitUntil: 'networkidle' });
await cancelled.waitForTimeout(400);
e = await events(cancelled);
ok('the Stripe cancel URL reports payment_abandoned', e.some((x) => x.name === 'payment_abandoned' && x.tier === 'architectural'), JSON.stringify(e));

// --- 5. Clarity does not load until consent is given -------------------------
// Stricter than GA4 on purpose: GA4 loads immediately and stays cookieless,
// Clarity is not fetched at all. Session replay should not start on a maybe.
const cl = await newPage();
await cl.goto(`${BASE}/`, { waitUntil: 'networkidle' });
await cl.waitForTimeout(800);
ok('no Clarity request before consent', !cl.hits.some((u) => u.includes('clarity.ms')), JSON.stringify(cl.hits));
ok('Clarity is absent from the document too', (await cl.locator('script#clarity').count()) === 0);

await cl.getByRole('button', { name: 'Allow analytics' }).click();
await cl.waitForTimeout(1500);
ok('Clarity loads once consent is given', cl.hits.some((u) => u.includes('clarity.ms/tag/')), JSON.stringify(cl.hits));

// Declining must leave it absent, not merely quiet.
const no = await newPage();
await no.goto(`${BASE}/`, { waitUntil: 'networkidle' });
await no.getByRole('button', { name: 'No thanks' }).click();
await no.waitForTimeout(1500);
ok('declining keeps Clarity off', !no.hits.some((u) => u.includes('clarity.ms')), JSON.stringify(no.hits));

// --- 6. consent can be withdrawn --------------------------------------------
const again = await newPage();
await again.goto(`${BASE}/`, { waitUntil: 'networkidle' });
await again.getByRole('button', { name: 'Allow analytics' }).click();
await again.getByRole('dialog', { name: 'Cookies' }).waitFor({ state: 'detached', timeout: 3000 }).catch(() => {});
await again.getByRole('button', { name: 'Cookie settings' }).first().click();
await again.waitForTimeout(500);
ok('the footer link brings the prompt back', await again.getByRole('dialog', { name: 'Cookies' }).isVisible());
const withdrawn = await again.evaluate(() =>
  (window.dataLayer || []).filter((a) => a[0] === 'consent' && a[1] === 'update').map((a) => a[2])
);
ok('opening it withdraws consent straight away', withdrawn.at(-1)?.analytics_storage === 'denied', JSON.stringify(withdrawn.at(-1) || {}));

await browser.close();
console.log(fails.length ? `\n${fails.length} failing check(s).` : '\nAll checks pass.');
process.exit(fails.length ? 1 : 0);
