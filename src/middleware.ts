import { NextResponse, type NextRequest } from 'next/server';

// Site-wide password gate. The site is live on the real domain, but Ed does not
// want the public seeing it until the outstanding work is finished, so every
// request is held behind a single shared password. He signs in once and can then
// browse the live pages normally to give feedback.
//
// Remove this file (and the SITE_PASSWORD env var) to open the site up again.

const COOKIE = 'thistle_preview';
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days, so Ed signs in once and stays in.

// Signed rather than a plain flag: the cookie is derived from the password, so
// it cannot be forged by anyone who does not already know it, and the password
// itself is never stored in the browser.
const encoder = new TextEncoder();
async function tokenFor(password: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode('thistle-preview-v1'));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// Length-independent compare, so a wrong password cannot be narrowed down by
// timing the response.
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function page(error: boolean, locked = false): string {
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Thistle Architecture</title>
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body {
    margin: 0; min-height: 100svh; display: grid; place-items: center; padding: 24px;
    background: #14150F; color: #F5F4EF;
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif;
  }
  .card { width: 100%; max-width: 380px; text-align: center; }
  .mark {
    width: 44px; height: 44px; margin: 0 auto 28px; border-radius: 8px;
    background: linear-gradient(135deg, #A3B565, #6F8235);
  }
  h1 { font-size: 20px; font-weight: 600; letter-spacing: -0.01em; margin: 0 0 8px; }
  p { font-size: 14px; line-height: 1.55; color: #A8A79E; margin: 0 0 26px; }
  form { display: flex; flex-direction: column; gap: 10px; }
  input {
    width: 100%; padding: 13px 15px; font-size: 15px; color: #F5F4EF;
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.14);
    border-radius: 9px; outline: none; transition: border-color .15s;
  }
  input:focus { border-color: #A3B565; }
  button {
    padding: 13px 15px; font-size: 15px; font-weight: 600; color: #14150F;
    background: #A3B565; border: 0; border-radius: 9px; cursor: pointer;
    transition: background .15s;
  }
  button:hover { background: #B4C578; }
  .err { color: #E88C7D; font-size: 13px; margin: 4px 0 0; }
</style>
</head>
<body>
  <div class="card">
    <div class="mark"></div>
    ${
      locked
        ? `<h1>Preview unavailable</h1>
    <p>This site is password protected, but no password is configured. Please contact the web team.</p>`
        : `<h1>Thistle Architecture</h1>
    <p>This site is not public yet. Enter the password to preview it.</p>
    <form method="POST">
      <input type="password" name="password" placeholder="Password" autocomplete="current-password" autofocus required>
      <button type="submit">View site</button>
      ${error ? '<p class="err">That password is not right. Try again.</p>' : ''}
    </form>`
    }
  </div>
</body>
</html>`;
}

export async function middleware(req: NextRequest) {
  // Crawlers are told to stay away regardless, so nothing gets indexed while the
  // site sits behind the gate. Served unauthenticated or it would never be read.
  if (req.nextUrl.pathname === '/robots.txt') {
    return new NextResponse('User-agent: *\nDisallow: /\n', {
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  const password = process.env.SITE_PASSWORD;

  // Off outside production, so local dev and branch previews do not need the
  // variable set. Previews are already closed to the public by Vercel's own
  // deployment protection, so nothing is exposed by skipping the gate there.
  if (!password && process.env.VERCEL_ENV !== 'production') {
    return NextResponse.next();
  }

  // In production it deliberately fails closed. Ed's requirement is that the
  // public must not see the site, so a missing password locks everyone out
  // rather than quietly opening it up. The failure is obvious and quick to fix.
  if (!password) {
    return new NextResponse(page(false, true), {
      status: 503,
      headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex' },
    });
  }

  const expected = await tokenFor(password);

  const cookie = req.cookies.get(COOKIE)?.value;
  if (cookie && safeEqual(cookie, expected)) {
    return NextResponse.next();
  }

  if (req.method === 'POST') {
    const form = await req.formData().catch(() => null);
    const given = String(form?.get('password') ?? '');
    if (given && safeEqual(given, password)) {
      // Redirect rather than render, so a refresh does not re-post the password.
      const res = NextResponse.redirect(new URL(req.nextUrl.pathname, req.url), 303);
      res.cookies.set(COOKIE, expected, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: MAX_AGE,
      });
      return res;
    }
    return new NextResponse(page(true), {
      status: 401,
      headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex' },
    });
  }

  return new NextResponse(page(false), {
    status: 401,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex' },
  });
}

// Everything is gated, including static assets and the API routes, so nothing
// leaks to someone who has not signed in. The gate page is self-contained, with
// its styles inline, so it still renders with the asset routes closed.
export const config = {
  matcher: '/:path*',
};
