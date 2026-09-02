/**
 * Live check to run AFTER switching Microsoft Clarity on, before telling anyone
 * it is done.
 *
 * WHY THIS EXISTS. Clarity was enabled on 2 September 2026 and this check found
 * that, with Clarity's data sharing left at its default, accepting cookies also
 * set Microsoft ADVERTISING cookies (MUID, MR, SRM_B, ANONCHK) and fired a
 * cookie sync to c.bing.com. The site's own cookie policy says in as many words
 * that no advertising cookies are used, and the GA4 consent config pins all
 * three advertising types to denied. So the default configuration made the
 * site's published policy untrue. Clarity was switched back off the same hour.
 *
 * None of that is visible in the offline suite, because that intercepts
 * clarity.ms and so never reaches the real tag. It is only observable against a
 * live project id, which is what this script is for.
 *
 * BEFORE RE-ENABLING, in the Clarity dashboard:
 *   1. Settings, then Setup: turn OFF sharing data with Microsoft Advertising.
 *   2. Settings, then Masking: keep masking Strict, so nothing typed into the
 *      feasibility questionnaire or checkout is ever recorded.
 * Then set NEXT_PUBLIC_CLARITY_PROJECT_ID on production, redeploy, and run:
 *
 *   node scripts/test-clarity-live.mjs
 */
import { chromium } from 'playwright';

const BASE = process.env.ANALYTICS_ORIGIN || 'https://www.thistlearchitecture.co.uk';
const AD_COOKIES = ['MUID', 'MR', 'SRM_B', 'ANONCHK', 'SM'];

const browser = await chromium.launch();
const fails = [];
const ok = (l, c, x = '') => { console.log(`${c ? 'PASS' : 'FAIL'}  ${l}${x ? '  ' + x : ''}`); if (!c) fails.push(l); };

const open = async () => {
  const ctx = await browser.newContext();
  const hits = [];
  ctx.on('request', (r) => { if (/clarity\.ms|bing\.com/.test(r.url())) hits.push(r.url()); });
  const page = await ctx.newPage();
  page.hits = hits; page.ctx = ctx;
  return page;
};

// --- before consent ---------------------------------------------------------
let p = await open();
await p.goto(BASE, { waitUntil: 'load' });
await p.waitForTimeout(2500);
ok('nothing is fetched from Clarity before consent', p.hits.length === 0, JSON.stringify(p.hits));

// --- after accepting --------------------------------------------------------
await p.getByRole('button', { name: 'Allow analytics' }).click();
await p.waitForTimeout(3500);
const names = (await p.ctx.cookies()).map((c) => c.name);

ok('Clarity loads once accepted', p.hits.some((u) => u.includes('clarity.ms/tag/')), JSON.stringify(p.hits.slice(0, 2)));

// The two that matter, and the reason this file exists.
const ads = names.filter((n) => AD_COOKIES.includes(n));
ok('NO Microsoft advertising cookies are set', ads.length === 0, ads.length ? `found ${ads.join(', ')} — turn OFF data sharing with Microsoft Advertising in the Clarity dashboard` : '');
ok('no cookie sync to Bing', !p.hits.some((u) => u.includes('bing.com')), JSON.stringify(p.hits.filter((u) => u.includes('bing'))));

// --- after declining --------------------------------------------------------
const no = await open();
await no.goto(BASE, { waitUntil: 'load' });
await no.waitForTimeout(1500);
await no.getByRole('button', { name: 'No thanks' }).click();
await no.waitForTimeout(2500);
ok('declining keeps Clarity off entirely', no.hits.length === 0, JSON.stringify(no.hits));

await browser.close();
console.log(fails.length ? `\n${fails.length} failing check(s). Do not leave Clarity on.` : '\nAll checks pass.');
process.exit(fails.length ? 1 : 0);
