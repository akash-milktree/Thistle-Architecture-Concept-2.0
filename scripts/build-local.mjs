/**
 * Full production build without TinaCloud credentials.
 *
 * Why this exists: in local mode the generated client points at
 * http://localhost:4001/graphql, and `next build` prerenders pages that call
 * it. With no server listening, every CMS-backed route fails with
 * ECONNREFUSED and the export aborts. So the content API has to be up for the
 * duration of the build.
 *
 * `npm run build` (tinacms build && next build) is the deploy path and needs
 * NEXT_PUBLIC_TINA_CLIENT_ID and TINA_TOKEN, because `tinacms build` performs a
 * cloud auth check and exits non-zero without them — verified, it does this
 * even with --local. This script is the credential-free equivalent for local
 * prod-parity checks.
 *
 * Note on the "run next build top-level or React is duplicated" advice that
 * circulates with this pattern: it does not hold. Separate OS processes have
 * separate module registries, so a child `next build` cannot share a React
 * instance with its parent either way. The ordering below is about the server
 * being reachable, nothing more.
 */
import { spawn, execSync } from 'node:child_process';

const isWin = process.platform === 'win32';
const npx = isWin ? 'npx.cmd' : 'npx';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const serverReady = async () => {
  try {
    const r = await fetch('http://localhost:4001/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '{ __typename }' }),
    });
    return r.ok;
  } catch {
    return false;
  }
};

const tina = spawn(npx, ['tinacms', 'dev', '--noTelemetry'], { stdio: 'inherit', shell: true });

let cleanedUp = false;
const cleanup = () => {
  if (cleanedUp) return;
  cleanedUp = true;
  try {
    // The CLI spawns its own children (the datalayer server on :9000), which
    // outlive a plain kill on Windows and then hold the port against the next
    // run. /T takes the whole tree.
    if (isWin && tina.pid) execSync(`taskkill /F /T /PID ${tina.pid}`, { stdio: 'ignore' });
    else tina.kill('SIGKILL');
  } catch {
    /* already gone */
  }
};

process.on('SIGINT', () => {
  cleanup();
  process.exit(1);
});
process.on('SIGTERM', () => {
  cleanup();
  process.exit(1);
});

(async () => {
  let up = false;
  for (let i = 0; i < 90; i++) {
    if (await serverReady()) {
      up = true;
      break;
    }
    await wait(1000);
  }

  if (!up) {
    console.error('\nTina local content server never came up on :4001.');
    console.error('If a previous run was interrupted, the port may still be held:');
    console.error('  Get-NetTCPConnection -LocalPort 4001,9000 -State Listen | %{ Stop-Process -Id $_.OwningProcess -Force }');
    cleanup();
    process.exit(1);
  }

  const build = spawn(npx, ['next', 'build'], { stdio: 'inherit', shell: true });
  build.on('exit', (code) => {
    cleanup();
    process.exit(code ?? 0);
  });
})();
