> **This gate no longer exists.** It was removed on 14 August 2026 when Akash
> took the site public. The middleware and the SITE_PASSWORD variable are both
> gone, robots.txt now allows crawling, and a sitemap of 65 URLs was added.
> Kept for the record, and for the sequencing note if it is ever put back.

# Site password gate (REMOVED 14 August 2026)

Put up 2026-08-07 at Ed's request. The site went live on the real domain, but he
does not want the public seeing it until the outstanding work is finished. He
still wants to walk the live pages himself and give feedback, so the site is
behind one shared password rather than taken down.

## The password

```
Thistle-Preview-2026
```

Ed enters it once at www.thistlearchitecture.co.uk and stays signed in for 30
days. It works on every page, on phone and desktop.

To change it, update the `SITE_PASSWORD` environment variable on the Vercel
project (Production) and redeploy. Nothing in the repo needs editing.

## What is gated

Everything: pages, static assets, and the API routes. The one exception is
`/robots.txt`, which is served without the password and says `Disallow: /` so
crawlers stay away while the gate is up.

## How to open the site to the public again

1. Delete `src/middleware.ts`.
2. Delete the `SITE_PASSWORD` variable from the Vercel project.
3. Push. The gate goes with it, and `/robots.txt` reverts to normal.

Do both. Deleting only the variable does not open the site, it locks it harder:
the gate fails closed in production on purpose, so a missing password locks
everyone out rather than quietly making the site public.

## Two things Ed should know

**The site was publicly reachable for about three days** before the gate went up,
from roughly 2026-08-04. Google may have crawled and indexed pages in that
window. `robots.txt` now blocks crawlers, but that stops future crawling, it does
not remove anything already indexed. If we care about a clean launch, the pages
need removing through Google Search Console. Worth checking what is in the index
before we open up again.

**There is now no public website at all.** Anyone typing thistlearchitecture.co.uk
gets the password prompt, including real prospects, existing clients, anyone
following a link from Google or a business listing, and anyone dialling in from
the phone number on old marketing. That is the intended effect of what was asked
for, but it is worth Ed confirming he is happy with the practice having no public
web presence for the duration, rather than only picturing it keeping strangers
out of an unfinished site.

## Why not Vercel's own password protection

It is a paid add-on on the Pro plan. The middleware costs nothing, lives in
version control, and the gate page is on brand instead of a generic prompt.
