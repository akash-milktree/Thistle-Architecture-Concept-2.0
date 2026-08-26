# Mobile video, burger menu and responsive pass

Date: 25 August 2026
Trigger: Ed reported that videos do not work on mobile, and asked for the burger menu and the site's responsiveness generally to be checked.

Everything below was reproduced before it was changed and re-measured after. Testing was done against a production build, at 320, 375, 390, 430, 768 and 1024px, across all 73 routes in the sitemap. The two device-specific bugs were reproduced on the live site itself in WebKit, which is the engine iPhone Safari actually uses.

## The two Ed reported

### Videos on mobile

`sections/Hero.tsx` gated the Vimeo hero film behind `hidden sm:motion-safe:block`, so it was switched off below 640px. Measured on the live site at iPhone 13 size: the wrapper computed to `display: none` and the iframe rendered at 0x0.

The part worth knowing: the iframe still loaded. Vimeo was streaming full video segments at 390px wide, behind `display: none`. Mobile visitors were already paying the data cost for a film they could not see, so turning it on costs no extra bandwidth. It just makes the download useful.

Fixed by dropping the `sm:` gate. The film now plays at every width, still suppressed for anyone who has asked for reduced motion. Vimeo's background mode is muted and inline, which is what iOS requires for autoplay, and the poster image sits underneath as the fallback if a device refuses anyway. Verified: wrapper `display: block`, rendered 1180x1038 over a 390x664 viewport, so the cover maths holds in portrait.

This is the only video on the site, so it was the whole of the complaint.

### The burger menu could trap people

Two faults compounded into one bad outcome.

`document.body.style.overflow = 'hidden'` does not lock scrolling in iOS Safari. The page kept scrolling behind the open menu: measured leak of 0 to 500px on the live site. That leaked scroll then triggered the navbar's hide-on-scroll animation, and the close button lives inside the navbar. Traced on live:

| step | menu | close button |
| --- | --- | --- |
| opened | open | on screen, top 22px |
| after scrolling | still open | `transform: -68px`, top -54px, off screen |

So: open the menu, move your thumb, and the only way out slides off the top of the screen. Scrolling back to the top restores it, but nobody would guess that.

Fixed in `components/ui/Navbar.tsx` two ways, because either fault alone could resurface:

1. The navbar can no longer retract while the menu is open.
2. The scroll lock now pins the body with `position: fixed` and carries the scroll offset by hand, restoring it on close. This is the approach that actually holds in WebKit.

Verified in WebKit at iPhone 13: scroll stays at 0, the navbar keeps `transform: none`, the close button stays at top 20px. Confirmed at 320, 390, 768 and 1023px.

## Five more found in the sweep

These were not reported but break pages, so they were fixed in the same pass.

1. **A blog article scrolled sideways and displayed raw markdown.** The Class MA piece has a link whose label contains a bracketed aside (`... Order 2024 [SI 2024 No. 141]`). The inline markdown regex used `[^\]]+` for the label, which stops at the inner `]`, so the link never matched and rendered as literal text. The bare URL then pushed the page to 422px inside a 320px screen. The regex now allows one level of nesting, and article paragraphs carry `break-words` so no future URL can do this again. Verified: the link renders as a proper anchor, no raw markdown remains on the page.

2. **Two case-study titles pushed the page sideways.** Beechmount at 378px and Boyne Rise at 344px, both inside a 320px screen. `--font-h1` bottoms out at 50.88px and long single words such as "Reconfiguration" cannot fit a 288px column.

3. **One Expertise title was silently amputated.** Mixed-Use Commercial rendered to 321px inside a 320px container that hides its overflow, so the last letter was cut with no scrollbar to hint at it. About was 9px from the same fate.

   Both fixed with `break-words hyphens-auto` on the two headings, which only engage where a word genuinely cannot fit and change nothing elsewhere. All four now sit inside 320px with no overflow and no clipping.

   Note for Ed: the underlying cause is that the H1 minimum of 50.88px is large for a 320px phone. Reducing it would look better on phones but changes headline size on every page, so it was left alone as a design decision rather than a bug fix.

4. **Every form field was 14px, so iOS zoomed in whenever anyone tapped one**, and does not zoom back out. This affected the whole funnel: contact form, feasibility brief, both calculators, the fee calculator and every email gate. A single rule in `globals.css` now sets fields to 16px below 768px, which is the threshold iOS uses. Checkboxes and radios are excluded so the controls themselves are unchanged. Verified at 16px across contact, the HMO calculator and pricing.

5. **A stat cell overflowed its column** on case-study cards. "Conservation Area" needed 89px in the 77px column a three-up grid leaves at 320px, so it ran under its neighbour. Fixed with `min-w-0` and `break-words`.

## Touch targets

Brought up to the 44px minimum for primary controls: the burger (was 40px, now 48px), the mobile dropdown links (36px, now 44px), the fee calculator pills (34px, now 44px, and these are how the whole calculator is driven), the blog category filters and the sketch carousel arrows.

Footer links were 21px and 16px. These are a dense secondary list, so they were taken to 32px, comfortably clear of the 24px WCAG 2.5.8 AA minimum, rather than 44px which would have doubled the footer's height. The email and phone links got the same treatment. The one link left under that is "Riftly.ai", which sits inline inside a sentence and is explicitly exempt from the target size rule.

## Two more fixes

- **FeasibilityEngine diagrams were clipped.** The graphics are drawn at a fixed type size but their box height came from a 4:3 ratio on the card width, so at 320px the box was shorter than its own content and sliced the legend and stat rows in half. A `min-h` now stops the box shrinking past the point the content fits, while keeping 4:3 wherever there is room.
- **The sticky CTA bar broke at 320px**, with both halves wrapping and the bar swelling to about 110px. The price no longer wraps and the bar is now 84px at 320 to 375px and 64px at 390px and up. The button label still runs to two lines at 375px and below. That reads tidily and is not broken, but trimming "Get Your Instant Fixed Fee" to the site-standard "Get Your Fixed Fee" would put it on one line. Left alone because it is a copy decision.

## Result

Zero horizontal overflow across all 73 routes at 320, 375, 390, 430 and 768px. Desktop re-checked at 1280 and 1440px with no regressions.

One console error remains in the sweep, and it is unrelated to any of this. See below.

## Separate bug found and fixed: the blog view counter

**The blog view counter was broken sitewide, on live.** Every article POSTed to `/api/views` on load and got a 400 back, and `GET /api/views` returned `{}`, so no article has been counting views since the counter was built.

Cause: `data/blogViews.ts` carries `"use client"` at the top, because it also exports the `useViewCounts` hook. `src/app/api/views/route.ts` imported `seedViews` from that same module. Across the client boundary the route handler did not receive the real object, so `Object.keys(seedViews)` was empty and `slug in seedViews` was false for every slug, which is exactly the condition that returns 400.

Fixed in three parts:

1. The seed numbers moved to `data/blogViewSeeds.ts`, which carries no `"use client"` directive and can therefore be read on the server. `data/blogViews.ts` keeps the hook and re-exports the seeds, so nothing that imported them had to change.
2. The route now imports the seeds from that pure module.
3. The route validates slugs against the real post list in `blogData.ts` rather than against the seed list. The seed list only holds the numbers each article carried over from Wix, so anything published since had no entry and could never have been counted, no matter what else was fixed. The rebrand article was in exactly that position.

Verified: `GET` returns all fourteen posts with their seeds; posting a known slug increments and returns 200; posting the rebrand article, which has no seed, returns 200 and starts from 1; posting a junk slug still returns 400, so the guard against inflating the store is intact. No failed requests remain anywhere in the browser sweep.

One thing to watch after deploy: writes go to Vercel Blob, so `BLOB_READ_WRITE_TOKEN` has to be present in production for counts to persist. Without it the API still answers correctly, it just cannot save, so numbers would reset. Worth confirming once live.

## Content note

The Class MA article reads "making Class MA easiest and more attractive to developers". That should be "easier". Not changed, since it is Ed's copy.
