/**
 * Dry-run the Thistle feasibility automation webhook.
 *
 * Their API validates and echoes back how it mapped our fields without starting
 * a run or costing anything, as long as dry_run is true. Use this to confirm the
 * mapping BEFORE any real submission, in particular how it handles our
 * "Existing HMO" and "Other" property types, which are not in their documented
 * vocabulary.
 *
 *   node scripts/feasibility-webhook-test.mjs
 *   node scripts/feasibility-webhook-test.mjs --ptype "Existing HMO"
 *   node scripts/feasibility-webhook-test.mjs --real     # NO dry_run, starts a real ~30min run
 *
 * Reads FEASIBILITY_API_URL and FEASIBILITY_API_SECRET from .env.local.
 */
import { readFileSync } from 'node:fs';

// Minimal .env.local reader; avoids adding a dependency for one script.
function loadEnv() {
  try {
    for (const line of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  } catch {
    // Fine: the vars may already be exported in the shell.
  }
}
loadEnv();

const url = process.env.FEASIBILITY_API_URL;
const secret = process.env.FEASIBILITY_API_SECRET;

if (!url || !secret) {
  console.error('Missing FEASIBILITY_API_URL or FEASIBILITY_API_SECRET.');
  console.error('Set them in Vercel, then: vercel env pull .env.local');
  process.exit(1);
}

const args = process.argv.slice(2);
const real = args.includes('--real');
const ptypeIdx = args.indexOf('--ptype');
const ptype = ptypeIdx > -1 ? args[ptypeIdx + 1] : 'Residential';

// Shaped exactly like the route handler's payload, so a pass here means a pass
// in production. Address and name are required by their API.
const payload = {
  name: 'Test Submission',
  email: 'test@milktreeagency.com',
  contact: '07000 000000',
  address: '1 Test Street, Winchester, Hampshire, SO23 8RE',
  ptype,
  value: '650000',
  gia: '232',
  rightmove: '',
  files: [],
  ...(real ? {} : { dry_run: true }),
};

if (real) {
  console.log('\n*** --real: this starts a REAL run, roughly 30 minutes on Kaan\'s side.');
  console.log('*** Make sure he is expecting it. Ctrl-C now if not.\n');
  await new Promise((r) => setTimeout(r, 5000));
}

console.log(`POST ${url}`);
console.log(`ptype: ${JSON.stringify(ptype)}   dry_run: ${!real}\n`);

try {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Webhook-Secret': secret },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(30_000),
  });

  const text = await res.text();
  console.log(`HTTP ${res.status}\n`);
  try {
    console.log(JSON.stringify(JSON.parse(text), null, 2));
  } catch {
    console.log(text.slice(0, 2000));
  }

  if (res.status === 401) console.log('\n-> Bad secret. Ask Kaan to confirm the current one.');
  if (res.status === 429) console.log('\n-> Duplicate within 10 minutes, or rate limited. Expected on repeats; change the address to retry.');
  process.exit(res.ok ? 0 : 1);
} catch (err) {
  // "fetch failed" on its own is useless. The real reason is on err.cause, and
  // DNS vs TLS vs refused need completely different people to fix them.
  const cause = err.cause ?? err;
  const code = cause?.code ?? '';
  console.error(`\nRequest failed: ${cause?.message ?? err.message}${code ? `  [${code}]` : ''}\n`);

  const host = new URL(url).hostname;

  if (code === 'ENOTFOUND' || code === 'EAI_AGAIN') {
    console.error(`DNS: this machine cannot resolve ${host}.`);
    console.error('Public resolvers may already be fine, so this is usually a local cache.');
    console.error('  dig +short @1.1.1.1 ' + host + '      # what the world sees');
    console.error('  dig +short ' + host + '               # what you see');
    console.error('  sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder');
  } else if (code.startsWith('ERR_TLS') || code.startsWith('ERR_SSL') || /certificate|SSL|TLS/i.test(cause?.message ?? '')) {
    console.error(`TLS: ${host} is not serving a valid certificate. THIS IS THEIR SIDE, not ours.`);
    console.error('Check what it presents:');
    console.error(`  echo | openssl s_client -connect ${host}:443 -servername ${host} 2>&1 | head -20`);
    console.error('"no peer certificate available" means the cert was never issued.');
    console.error('Usually the ACME challenge was run before the A record existed. Ask Kaan to re-run it.');
  } else if (code === 'ECONNREFUSED') {
    console.error(`Nothing is listening on 443 at ${host}. Their service is down.`);
  } else if (code === 'UND_ERR_CONNECT_TIMEOUT' || code === 'ETIMEDOUT') {
    console.error(`Connection to ${host} timed out. Firewall, or the host is unreachable.`);
  }
  process.exit(1);
}
