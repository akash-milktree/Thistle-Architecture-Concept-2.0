/**
 * Push formspree.json to Formspree as part of the production build.
 *
 * Why this exists: formspree.json describes the forms, their recipient and
 * the Class MA checker's automatic email, but Formspree does not read it from
 * the repo. It only changes when the file is deployed with the CLI, and until
 * 5 September 2026 nobody had a key to do that, so the file said one thing and
 * Formspree did another for a month (the checker's form did not exist at all,
 * so its submissions were 404ing). With the key on Vercel, every production
 * build now deploys the file, and the two cannot drift again.
 *
 * Rules:
 *  - Production only. A preview build must not change the live forms.
 *  - No key, no attempt. Local builds and forks skip quietly.
 *  - A rejected config fails the build, because that is a bug in the file
 *    and it should be fixed before the site ships. A network failure warns and
 *    lets the build through: a Formspree outage should not take the site down
 *    with it.
 */
import { spawnSync } from 'node:child_process';

const key = process.env.FORMSPREE_DEPLOY_KEY;
const env = process.env.VERCEL_ENV;

if (!key) {
  console.log('[formspree] no FORMSPREE_DEPLOY_KEY, skipping deploy');
  process.exit(0);
}
if (env && env !== 'production') {
  console.log(`[formspree] ${env} build, skipping deploy (production only)`);
  process.exit(0);
}

const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const r = spawnSync(npx, ['formspree', 'deploy', '--key', key, '--skip-version-check'], {
  encoding: 'utf8',
  stdio: ['ignore', 'pipe', 'pipe'],
});
const out = `${r.stdout ?? ''}${r.stderr ?? ''}`;
process.stdout.write(out);

if (/Deployment failed/i.test(out)) {
  console.error('[formspree] formspree.json was rejected; fix the file before shipping');
  process.exit(1);
}
if (r.status !== 0) {
  console.warn('[formspree] deploy did not complete (network or CLI error); the site build continues');
  process.exit(0);
}
console.log('[formspree] deployed');
