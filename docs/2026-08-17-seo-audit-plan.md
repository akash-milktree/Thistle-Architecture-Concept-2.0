# SEO audit: findings and plan

Source: "Thistle Audit" Google Sheet from the SEO agency (tabs: Audit, Images,
Table formatting). Read 17 August 2026. Ten items, all marked "Awaiting Action".

Every item below was checked against the repo **and** against the live site at
www.thistlearchitecture.co.uk before being scheduled. Two are already done.

---

## Status at a glance

| # | Issue | Their priority | Real status | Batch |
|---|---|---|---|---|
| 1 | Canonical tags missing | High | **Built, awaiting deploy** | 1 |
| 2 | Missing sitemap | High | **Already live** | 0 |
| 3 | Robots.txt blocking | High | **Already live** | 0 |
| 4 | Blog redirects | High | **Built, awaiting deploy** | 1 |
| 5 | Recent Posts section | Medium | **Built, awaiting deploy** | 1 |
| 6 | Smooth scroll on jump links | Low | **Built, awaiting deploy** | 1 |
| 7 | Images over 500kb | Medium | **Built, awaiting deploy** | 2 |
| 8 | Table formatting on blog | Medium | **Built, awaiting deploy** | 2 |
| 9 | JS categories on blog | Medium | **Built, awaiting deploy** | 3 |
| 10 | Class MA checker | Medium | **Built, needs a Formspree deploy** | 4 |

---

## Batch 0: already done, needs reporting back

These two were built when the password gate came off. The agency's crawl looks
to predate that, so they should re-crawl rather than us rebuild.

### 2. Sitemap
`src/app/sitemap.ts` generates the full sitemap: 13 static paths, plus every
conversion page, case study and blog post. Live check returns HTTP 200 at
https://www.thistlearchitecture.co.uk/sitemap.xml.

**Re-verified 17 August, against the live site, not the build:**
- Returns HTTP 200 with `content-type: application/xml`, and parses as a valid
  `urlset`.
- **65 URLs, and all 65 return 200.** No 404s, no redirects, nothing stale.
- **Nothing indexable is missing.** Cross-checked against every built route: the
  only pages not listed are `_not-found`, `_global-error` and `/team-review`,
  and all three should be absent.
- Referenced from robots.txt, and sitting at exactly the URL the audit asked
  for.

Two deliberate omissions to explain to them: `/case-studies` (redirects to the
feasibility listing, so pointing crawlers at it wastes crawl budget) and
`/team-review` (internal, noindex).

**Still worth doing, and it is not a code change:** submit the sitemap in Google
Search Console. Serving it is our half; submitting it is theirs. Wix currently
holds the GSC connection for this domain.

Note for later: the blog category pages from item 9 will need adding to
`staticPaths` when that lands.

### 3. Robots.txt
`src/app/robots.ts` serves `User-Agent: * / Allow: /` plus the sitemap
reference. Verified live. The site is crawlable.

**Action:** reply to the agency, ask for a fresh crawl before we work anything
else off the same report.

---

## Batch 1: quick wins, no design risk

Small, self-contained, low chance of breaking anything. Do these first.

### 1. Canonical tags (High) — DONE, awaiting deploy
Confirmed missing. There is no `metadataBase` and no `alternates.canonical`
anywhere in the codebase, and the live homepage and blog posts serve no
canonical link tag.

Fix: set `metadataBase` in the root layout, then add
`alternates: { canonical: '/path' }` to every page's metadata export and to the
three dynamic `generateMetadata` functions (blog posts, case studies,
conversions). Roughly 18 route files.

This also quietly fixes any www/non-www and trailing-slash duplication.

**Built 17 August.** `metadataBase` set once in the root layout; self-referencing
canonicals added to all 9 static pages, the homepage, the 3 tools pages and all
3 dynamic routes. Verified against the build output: **68 pages, 65 with a
self-referencing canonical, 0 mismatched.** The 3 without are correct
(`_not-found`, `_global-error`, and `/team-review`, which is noindex).

Two calls worth recording:
- No canonical on the root layout. Page metadata inherits from the layout, so
  one there would point any page that forgot its own at the homepage. Missing
  beats wrong.
- The homepage had no metadata export at all and was inheriting the layout
  defaults. Now explicit. Its canonical renders without a trailing slash because
  Next normalises that away whenever `trailingSlash` is off, no matter how the
  value is written. Same URL to every crawler, not worth changing global config
  over.

### 4. Blog redirects (High) — DONE, awaiting deploy
Already built. `next.config.ts` carries the full Wix map: 13 root-level post
slugs, the `/post/:slug` pattern, `/journal`, `/works`, `/studio`,
`/winchesterproject`, plus older internal moves. Spot-checked five live: all
redirect to the right destination.

**Changed 17 August.** All 26 redirects swapped from `permanent: true` to
`statusCode: 301`. Next emits 308 for `permanent: true`; Google has treated 308
as equivalent to 301 for years, and the only real difference is that 308 forbids
a client downgrading the method. Everything hitting these is a GET from a
bookmark, inbound link or search result, so neither was wrong. 301 is now stated
explicitly because it is what the audit asked for and what crawl tools expect.

Verified against a local production server:
- **26 of 26 return 301** to the correct destination.
- **Every destination returns 200.** No redirect chains, no redirects landing on
  a 404.
- **All 13 blog posts** have an explicit root-level 301, and the `/post/:slug`
  pattern covers the second URL form Wix served them at.

#### The gap, and how it was closed

The original map was built from the Wix nav and the 13 known posts, which left
no way to prove it was complete. Two sources were checked to settle it.

**Wayback Machine (CDX API).** Pulled every URL the archive holds for the
domain. After filtering out Wix asset noise, 27 real pages. **Eight were live on
Wix, had never been in the redirect map, and had been 404ing since the move:**

| Old URL | What the archived page actually was | Now redirects to |
|---|---|---|
| `/2nd-project` | "HACKNEY HOUSE" | `/case-studies/corner-house-hackney` |
| `/3rd-project` | "SCHOOL HOUSE" | `/case-studies/school-house-south-downs` |
| `/4th-project` | "FOREST HOUSE" | `/case-studies/forest-house-lymington` |
| `/copy-of-bereweeke-avenue` | "WINCHESTER HOUSE, CONCEPT" | `/case-studies/bereweeke-avenue` |
| `/copy-of-historic-commercial` | "BEAUCHAMP HOUSE" | `/case-studies/beauchamp-house` |
| `/copy-of-school-house` | "UPPER HIGH STREET", i.e. 5 Upper High Street, Winchester | `/case-studies/monument-house` |
| `/fullscreen-page-1` | Wix gallery system page | `/case-studies/completed-projects` |
| `/fullscreen-page-2` | Wix gallery system page | `/case-studies/completed-projects` |

Wix named project pages after creation order or after whatever page they were
duplicated from, so the slugs say nothing about the content. Every destination
above was matched on the archived page's own title and body text, not its slug.

**Wix dashboard, URL Redirect Manager.** The bigger find. Wix was serving 301s
for **16 URLs** right up to the migration, and all 16 were lost when the domain
moved. These are older than anything in the Wayback list: URLs from an earlier
version of the site that Wix was already redirecting, which is why neither a
crawl nor guesswork would ever have surfaced them.

15 were confirmed 404 on the live site. All 15 are now mapped:

| Old URL | Wix sent it to | Now redirects to |
|---|---|---|
| `/1st-project` | `/winchesterproject` | `/case-studies/bereweeke-avenue` |
| `/about-us` | `/studio` | `/about` |
| `/cookie-policy` | `/` | `/cookies` |
| `/featured-projects` | `/works` | `/case-studies/completed-projects` |
| `/our-process` | `/studio` | `/feasibility-package#how-it-works` |
| `/post` | `/` (group) | `/blog` |
| `/project/courtyard-house` | `/2nd-project` | `/case-studies/corner-house-hackney` |
| `/project/queens-road` | `/` | `/case-studies/queens-road` |
| `/project/interior-design` | `/` | `/case-studies/completed-projects` |
| `/project/terrace-end-house` | `/` | `/case-studies/completed-projects` |
| `/project/wharf-house` | `/` | `/case-studies/completed-projects` |
| `/project/zinc-house` | `/` | `/case-studies/completed-projects` |
| `/what-we-do` | `/studio` | `/feasibility-package` |
| `/what-we-do/residential-architecture` | `/studio` | `/conversions/high-end-residential` |
| `/what-we-do/self-build-architecture` | `/studio` | `/feasibility-package` |

The 16th, `/blog`, redirected to `/journal` on Wix. On this site `/blog` is the
real page and already returns 200, so it is deliberately **not** in the map:
adding it would create a loop with the `/journal` redirect.

#### Where we deviated from Wix, and why

Wix pointed most of these at other Wix pages. Those chains were resolved to
their real end destination rather than adding a second hop. Five go somewhere
better than Wix did, because this site has a more specific page than Wix had:

- `/cookie-policy` went to the homepage on Wix, which had no cookie policy. We
  have one.
- `/our-process` went to `/studio`. This site has an actual process section, and
  `/how-it-works` already points at it.
- `/what-we-do` and `/what-we-do/self-build-architecture` went to `/studio`,
  the about page. This site separates who we are from what we sell.
- `/what-we-do/residential-architecture` now goes to the high-end residential
  conversion page rather than a generic about page.
- The four dead `/project/*` pages went to the homepage on Wix. The projects hub
  is closer to what someone clicking a project link wanted.

**One for Ed to confirm:** `/project/queens-road` now points at our Queens Road
case study (South Coast). Wix sent it to the homepage because the original page
was deleted, so we cannot prove from the archive that it is the same Queens
Road. The name match is exact and Thistle is a small practice, so it is very
likely right, but it is a one-line change if not.

#### Final state

**49 redirects.** Verified against a local production server:
- **Every one returns 301** to the intended destination.
- **Every destination returns 200.** No chains, nothing landing on a 404.
- All 27 archived Wix pages and all 16 Wix-managed redirects now resolve.
- `/blog` still serves directly, confirmed, so there is no loop.

The remaining unknown is small: Wayback only holds what it crawled, and the Wix
redirect manager only holds what someone entered. Search Console's page indexing
report would be the last word. Worth a look once the agency re-crawls, but the
two sources above between them found 23 dead URLs that guessing did not.

### 5. "Recent Posts" section (Medium) — DONE, awaiting deploy
Confirmed. It is not a component. It is baked into the article body of all 13
imported Wix posts as a `## Recent Posts` heading in `data/blog/*.ts`, followed
by the old post links.

**Done 17 August.** Every one was the same shape: a `## Recent Posts` heading
plus a single hard-coded link, always the last element of the content array.
26 lines removed across 13 files.

Verified in the build output: **0 of 13 articles contain "Recent Posts", 13 of
13 still render "Keep Reading".** Each article now ends on its real closing
paragraph, then the author byline, then Keep Reading.

Worth noting this removes an internal link from each article, but Keep Reading
already links three related posts on every page, so internal linking comes out
ahead rather than behind.

### 6. Smooth scroll on jump links (Low) — DONE, awaiting deploy
Confirmed, no `scroll-behavior` anywhere. Jump links exist in the blog post
table of contents, the hero `#process` link, and `/feasibility-package#how-it-works`.

**Done 17 August.** `scroll-behavior: smooth` on the html element, added in
`globals.css` rather than as a Tailwind class so it could be wrapped in
`@media (prefers-reduced-motion: no-preference)`. Smooth scrolling is a common
vestibular-migraine trigger, and this is the one motion setting that applies to
the whole document rather than a single component, so it has to respect the
system preference. Confirmed present in the built CSS.

While checking the jump targets, found that `#process` on the homepage had no
`scroll-margin-top`, so the fixed navbar covered the heading it landed on. The
blog headings (`scroll-mt-28`) and `#how-it-works` (`scroll-mt-24`) already had
one. `#process` now matches the blog at `scroll-mt-28`. All three jump targets
now clear the header.

---

## Batch 2: content and assets

### 7. Images over 500kb (Medium)
Confirmed and worse than the sheet shows. `public/images` is **92MB** and 28
files sit over 500kb. The heaviest is `st-johns-sk001-1.png` at 4.77MB, served
raw and verified at that size on the live site.

The cause is that architectural sketches and elevations were saved as PNG. PNG
is the wrong format for these; they will drop by roughly 90% as quality JPEGs or
WebP with no visible loss.

#### What the measurement actually showed

Before compressing anything, worth knowing what visitors download. For
`st-johns-sk001-1.png`, measured against the live site:

| Delivery path | Size |
|---|---|
| Raw file | **4,768,354 bytes (4.77 MB)** |
| `next/image`, WebP, w=1920 | **57,098 bytes (56 KB)** |
| `next/image`, WebP, w=3840 | 145,256 bytes (142 KB) |

So anywhere `next/image` is used, page weight was already fine: a 99% reduction
happens automatically. The audit's finding is real, but the cause was not file
size on its own. It was **which images bypassed `next/image` entirely.**

#### The actual bug: two raw image tags

Two components rendered plain tags instead of `next/image`, so they served
source files untouched:

- `sections/conversions/RelatedCaseStudy.tsx` used a plain `<img>`. One card on
  four conversion pages.
- `sections/CaseStudies.tsx` used a `motion.img` inside `CaseCard`. This was the
  serious one: `CaseCard` is the card used on the homepage, the completed
  projects listing **and** the feasibility studies listing.

What those listing pages were shipping, as raw source files:

| Page | Card images | Raw weight |
|---|---|---|
| Feasibility studies listing | 13 | **19.6 MB** |
| Homepage | 5 | 4.4 MB |
| Completed projects listing | 1 server-rendered, rest client-filtered | 1.4 MB |

**Both fixed 17 August.** The `motion.img` became a `motion.div` wrapping an
`Image`, which keeps the hover zoom. Verified after a clean rebuild: **0 raw
`/images/` references left in any built HTML**, down from 13. Every image on the
site now goes through `next/image`.

Lazy loading was never the issue: it is on by default wherever `next/image` is
used, which is now everywhere.

#### Source file compression — DONE, awaiting deploy

Delivery is fixed, so compressing sources now buys three narrower things: repo
size (92MB), build time, and stopping crawlers finding 4.7MB files, which is
what the audit actually flagged.

The problem is dimensions, not format. These are architectural drawings exported
at print resolution:

| File | Dimensions | Size |
|---|---|---|
| `axis-house-elevation-1.png` | 8534 x 6397 (54 megapixels) | 2.2 MB |
| `axis-house-plans-1.png` | 6397 x 8534 | 2.7 MB |
| `stanmore-option-a-1.png` | 2520 x 4037 | 5.0 MB |
| `st-johns-sk001-1.png` | 4037 x 2520 | 4.7 MB |

`next/image` never serves above 3840px, and the full-screen sketch viewer
requests 2400px, so **anything above 3840 on the long edge can never be seen by
anyone.** Capping there is free.

Tested with Clop 2.7.1 (CLI at
`/Applications/Clop.app/Contents/SharedSupport/ClopCLI`, no PATH install needed):

| Approach | `st-johns` 4.7MB | `axis-elevation` 2.2MB | Quality |
|---|---|---|---|
| Clop `optimise -a`, no resize | 2.4 MB | 1.6 MB | lossless |
| Cap 3840 + Clop optimise | 2.7 MB | **424 KB** | no visible loss |
| Cap 3840 + WebP q90 | **432 KB** | — | near-lossless |
| Cap 3840 + Clop WebP q60 | 128 KB | — | visible on drawings |

Capping alone clears the extreme outliers but leaves the detailed renders over
500kb, because a 3840px PNG of a detailed drawing simply is that big. Getting
those under 500kb means moving the sources to WebP, which also means updating
the `.png` references in `data/caseStudiesData.ts`.

**Note against going aggressive:** `components/case-study/SketchViewer.tsx`
exists specifically so sketches can be opened full screen and read closely, and
its own comment says the text on them is small.

**Run 17 August: cap at 3840 plus Clop plain `optimise`.** Aggressive mode
(`-a`) was tested and rejected. It saved a further 16% but measured 0.74% pixel
difference against 0.06% for plain, twelve times the error, which is not a
trade worth making on drawings that exist to be read closely.

124 files in scope (everything over 200kb); 8 needed resizing.

| Measure | Before | After |
|---|---|---|
| `public/images` total | 92 MB | **68 MB** |
| Files over 500kb | 28 | **15** |
| Files above 3840px | 8 | **0** |

Verified afterwards:
- **296 images checked, 0 corrupt.**
- **226 image references across the data and components, 0 missing.**
- Build clean.
- Visual check on the four largest sketches: at the size `next/image` actually
  delivers, the difference measures around 2% RMSE, and the delivered file is
  slightly *smaller* than before (55KB to 51KB for St John's). A 1:1 crop of the
  fine annotation text was compared before and after and is identical: same
  letterforms, same line weights, same colour.

**The 15 files still over 500kb are all sketches**, and that is the right answer
rather than a shortfall. They are 3840px architectural drawings; a PNG of a
detailed drawing at that size simply is a few megabytes. Getting them lower
means either moving the sources to WebP, which needs every `.png` reference in
`data/caseStudiesData.ts` updating, or degrading the one thing on those pages
worth looking at closely.

**What to tell the agency:** the row is addressed, but the fix was not the one
the sheet proposed. File weight was a symptom. The cause was two components
bypassing `next/image` and serving sources raw, and that is now impossible
anywhere on the site.

#### Every file on their Images tab, accounted for

The tab lists 21 rows covering **16 unique images**. Some are listed by their
raw URL and some by their `/_next/image?...&w=3840&q=75` URL, which are very
different things and must not be compared against each other.

All 16, measured against git HEAD:

| File | Listed as | Was | Now | Change |
|---|---|---|---|---|
| `axis-house-plans-1.png` | `_next` | 2811K | 535K | **-81%** |
| `axis-house-elevation-1.png` | raw | 2247K | 541K | **-76%** |
| `greyfriars-option2-1.png` | `_next` | 1925K | 1014K | -47% |
| `claremont-sketch-1.png` | raw | 900K | 504K | -44% |
| `gyfford-optiona-1.png` | raw | 693K | 389K | -44% |
| `greyfriars-option4-1.png` | raw | 1678K | 1019K | -39% |
| `cheddar-sketch-1.png` | raw | 1351K | 832K | -38% |
| `hathaway-sketch-1.png` | raw | 916K | 580K | -37% |
| `beech-house-sketch-1.png` | raw | 1254K | 797K | -36% |
| `windmill-lane-sketch-1.png` | `_next` | 1373K | 926K | -33% |
| `st-johns-sk001-1.png` | raw | 4657K | 3146K | -32% |
| `stanmore-option-a-1.png` | `_next` | 5110K | 3477K | -32% |
| `bereweeke-1.jpg` | raw | 527K | 403K | -24% |
| `harpenden-sketch-1.png` | raw | 926K | 725K | -22% |
| `cta-band.jpg` | `_next` | 1440K | 1289K | -10% |
| `beechmount-sk001-1.png` | raw | 3634K | 3372K | -7% |

**16 of 16 reduced. None grew. 30.7MB to 19.1MB across the set, down 38%.**
Two dropped under 500kb; 14 are still above it as raw source files.

#### Why their `_next/image` numbers looked so bad, and what a re-crawl will show

This is worth understanding before they re-crawl, because it explains half
their tab.

Their sheet reports `/_next/image?url=...st-johns-sk001-1.png&w=3840&q=75` as
**1,640,143 bytes**. Requesting that exact URL two ways:

| Request | Response |
|---|---|
| `Accept: image/avif,image/webp,*/*` (every real browser) | **145,256 bytes, image/webp** |
| `Accept: */*` (their crawler) | **1,640,143 bytes, image/png** |

An exact match to their figure. Next only serves WebP to clients that say they
accept it; everything else falls back to the source format. Screaming Frog does
not advertise WebP by default, so it measured the PNG fallback that no visitor
ever receives.

**So a re-crawl will still report large images**, both raw and `_next`, even
though real users now get 40-145KB. Two ways to deal with that:

1. **Ask them to configure the crawler** to send an `Accept` header including
   `image/webp`. Costs nothing and makes their report reflect reality.
2. **Convert the sketch sources to WebP** (the option parked earlier). That
   would fix both problems at once: the raw files drop under 500kb *and* the
   `next/image` fallback becomes WebP, so even a non-accepting crawler sees
   small files. Cost is updating every `.png` reference in
   `data/caseStudiesData.ts` and re-verifying.

Option 1 is the honest fix for a measurement artefact. Option 2 is worth doing
anyway if we want the row to close cleanly on their tooling without argument.

#### Option 2 taken: sources moved to WebP

Done 17 August. 14 sources converted with Clop at q90 (q82 for two where q90
left them near the limit), 22 references re-pointed across
`data/caseStudiesData.ts`, `data/blog/class-q-barn-conversions.ts`,
`data/blog/buying-vs-building-a-home-in-the-uk.ts`, `sections/Footer.tsx` and
`sections/feasibility-package/DeliverableShowcase.tsx`, then the superseded
PNG/JPGs deleted.

| File | PNG | WebP | Change |
|---|---|---|---|
| `beechmount-sk001-1` | 3372K | 448K | -87% |
| `hathaway-sketch-1` | 580K | 84K | -86% |
| `st-johns-sk001-1` | 3148K | 432K | -86% |
| `claremont-sketch-1` | 508K | 84K | -84% |
| `cheddar-sketch-1` | 832K | 152K | -82% |
| `windmill-lane-sketch-1` | 928K | 180K | -81% |
| `beech-house-sketch-1` | 800K | 184K | -77% |
| `axis-house-elevation-1` | 544K | 152K | -73% |
| `harpenden-sketch-1` | 728K | 228K | -69% |
| `axis-house-plans-1` | 536K | 208K | -62% |
| `greyfriars-option2-1` / `-option4-1` | ~1018K each | ~396K each | -61% |
| `stanmore-option-a-1` (q82) | 3480K | 260K | -93% |

**`cta-band.jpg` was a special case and turned up two real bugs.** It is the
footer CTA background, so it loads on every page: the sheet gave it 71 inlinks,
by far the most-requested image on the site.

1. Its `<Image>` had **no `sizes` prop**. A `fill` image without one defaults to
   `100vw`, so Next was serving the largest variant on every page.
2. The source was a **2400x3600 portrait** sitting in a wide strip under a 75%
   black overlay, so `object-cover` was discarding most of the height.

Cropped to the 16:9 strip that was actually visible, converted at q80, and given
an explicit `sizes`. 1440K to 404K. Note WebP at q90 came out *larger* than the
original JPEG for this one, which is why the quality was dropped rather than the
conversion forced blindly.

#### Final state

| Measure | Session start | Now |
|---|---|---|
| `public/images` | 92 MB | **51 MB** |
| Files over 500kb | 28 | **0** |
| Files above 3840px | 8 | **0** |
| Raw `<img>` refs in built HTML | 13 | **0** |

Verified: 297 images decode, 0 corrupt. 226 image references, 0 missing. Build
clean. A 1:1 crop of the fine annotation text on the St John's sketch was
compared PNG against WebP and is identical: same letterforms, line weights and
colour.

Because the sources are WebP now, the `next/image` fallback for a client that
does not advertise WebP is **also** WebP. Their crawler will measure small files
on the next pass without needing to change any of its settings.

#### One content gap found in passing

`highbury-sk003-1` was a 3.3MB feasibility sketch sitting in `public/images`
**referenced by nothing.** The Highbury Buildings Cosham case study has CGIs and
photos but no sketch section, unlike the other feasibility studies.

It has been kept and converted (3304K to 314K) rather than deleted, because it
looks like a missing piece of content rather than junk. **Worth Ed confirming**
whether that sketch should be on the Highbury page.

### 8. Table formatting on the blog (Medium) — DONE, awaiting deploy
The blog renderer in `views/BlogPostPage.tsx` supports h2, h3, unordered list,
image and paragraph blocks. There is no table block, so a markdown table in an
article would render as a row of pipe characters.

#### Correcting an earlier call in this document

An earlier pass through this file said there were no tables in any published
post and that this was pre-emptive work. **That was wrong.** The check was a
grep for markdown pipe syntax, which found nothing because the table does not
use pipes. Opening their "Table formatting" tab in the browser, rather than
reading it through the Drive text extraction that returned it empty, showed a
screenshot of a real table on a live article, collapsed into a single vertical
list.

The lesson is the check, not the conclusion: rendered output should have been
compared against the source content, rather than grepping for the syntax the
renderer happened to support.

#### What was actually wrong

`brick-vs-stone-vs-concrete-masonry-in-self-build-homes` contains a nine-row
comparison table. The Wix import flattened it into **39 consecutive one-line
strings** in the content array, so the renderer, correctly, drew 39 paragraphs.
Every cell on its own line, no structure, no headers.

A scan of all 13 posts for the same signature found **one occurrence**, so this
is the only affected article.

#### The fix

**Parser.** A `table` block kind that reads standard markdown pipe tables: a
header row, a `|---|` divider, then body rows. It is the one block that has to
look ahead rather than being decided line by line. Written to the standard
syntax so a future article can just type a normal markdown table.

**Data.** The 39 flattened cells were rebuilt into a 9 x 4 markdown table. The
header's first cell was empty in the original, so the column of row labels was
given the heading "Material": a table with a blank corner reads as broken and
announces nothing to a screen reader.

**Rendering.** Semantic throughout, which is the part the audit cared about:
`<table>` with `<thead>` and `<tbody>`, 4 `scope="col"` headers, and 9
`scope="row"` headers, since the first cell of each row names the thing being
compared rather than being data.

Three design decisions worth recording:

- **The ranks are tinted.** Every cell is Highest, Mid or Lowest, so flat text
  is a wall of three repeating words. Highest takes the brand green, Lowest
  drops back to 35% black. The shape of the answer is now legible at a glance,
  and the words remain for anyone who cannot see the colour.
- **The wrapper scrolls, never the page.** Four columns cannot fit 375px, and a
  body that scrolls sideways breaks every other section. Verified at 390px: page
  scrolls sideways = false, wrapper scrolls = true.
- **The first column is frozen on mobile,** with a divider and a right-edge fade.
  Scrolled fully right you still see which row you are reading, which is the
  entire point of a comparison table. The fade signals there is more to the
  right; without it a scrollable table reads as one that simply stops.

Checked on desktop at 1440px and mobile at 390px, including the fully scrolled
state.

---

## Batch 3: structural

### 9. JS categories on the blog (Medium) — DONE, awaiting deploy
Confirmed. `views/BlogPage.tsx` filters posts with React state. The URL never
changes, so no category is separately indexable and none can have its own title,
description or H1. Categories are derived from the posts themselves in
`data/blogData.ts`.

**Done 17 August.** New route at `src/app/blog/category/[slug]/page.tsx`, server
rendered, statically generated per category. The filter chips are now `<Link>`s
in a labelled `<nav>` rather than `useState` toggles, so filtering happens from
the route.

| Page | H1 | Title | Canonical | Posts |
|---|---|---|---|---|
| `/blog` | Insights For Developers. | Blog | `/blog` | 13 |
| `/blog/category/self-build` | Self Build Guides | Self Build Guides | `/blog/category/self-build` | 10 |
| `/blog/category/permitted-development` | Permitted Development | Permitted Development | `/blog/category/permitted-development` | 2 |
| `/blog/category/investment` | Property Investment | Property Investment | `/blog/category/investment` | 1 |

All four have distinct H1s, titles, meta descriptions and self-referencing
canonicals, which is exactly what the audit asked for.

**Three pages, not seven.** The `BlogCategory` union lists seven categories but
only three have any posts. Pages are generated from the posts rather than the
union, so an empty category never gets a listing. `/blog/category/planning`
correctly returns 404, as do unknown slugs and the bare `/blog/category`.
`dynamicParams` is off, so there is no soft 404 showing an empty listing under a
generic title.

**Descriptions are written per category**, not generated from a template. A
templated "Articles about X" on every page is the thin duplication these URLs
are meant to avoid.

**The category badge on each article is now a link.** It was a bare span. With
13 articles pointing at 3 category pages, the listings actually have internal
links worth crawling: self-build is linked from 14 pages, permitted-development
from 6, investment from 5.

Added to the sitemap, and confirmed present in the built XML.

**One to watch:** Investment has a single post, so that page is thin. It is a
real URL with real content and it is what the audit asked for, but it is not
worth much until there are more posts in it. Worth mentioning to Ed as a content
prompt rather than treating as a defect.

---

## Batch 4: needs Ed's decision first

### 10. Class MA checker (Medium) — DONE, with one dependency
Three separate points in their note. Two are real, one is a non-issue.

**a. The email gate.** Their read is right and the current setup is the worst of
both worlds. The verdict headline sits **outside** the gate and only the
supporting paragraph is blurred, so the gate withholds almost nothing while
still charging an email for it. On top of that the email goes to Formspree for
the team, and the person who typed it gets nothing back at all.

Two coherent options, Ed picks:
- **Gate properly:** obfuscate the whole verdict box, say plainly what they get
  ("we'll email your result and what to do next"), and actually send them their
  result.
- **Drop the gate:** give the verdict free, and put the email ask after it as an
  offer rather than a wall.

**Decided and built 18 August: drop the gate on the checker only.**

What made the call was comparing the three tools that share `ToolGate`:

| Tool | Free | Behind the gate |
|---|---|---|
| GDV calculator | Projected GDV | Total cost, margin, margin % |
| HMO calculator | Gross annual rent | Net income, capital value, profit, profit % |
| **Class MA checker** | **The whole verdict** | **One generic paragraph** |

The calculators are coherent: one number free, the money numbers cost an
address. The checker was charging an email for a sentence saying a feasibility
would confirm what the headline had already told you. It is also the cheapest
qualifying step in the funnel, where friction costs more than it captures.

So the gate came off the checker and `ToolGate` stays exactly as it is on both
calculators. Verified in a live DOM check that both are still gated.

In its place, `components/ui/ToolEmailOffer.tsx`: the open counterpart to
`ToolGate`. It asks for an email without withholding anything, and its rule is
written into the file: the heading must name something that genuinely gets sent.

**The email now actually arrives**, which was the other half of their note.
Three things were needed:

1. **A dedicated Formspree form.** The autoresponse was first added to the
   shared `leads` form, which was wrong: that form is also used by both
   calculators, the sample report download and the contact page, so a Class MA
   prior-approval checklist would have gone out as the reply to a general
   enquiry. There is now a separate `class-ma-checker` form and the route picks
   the endpoint by source.
2. **A lowercase `email` field.** Formspree's autoresponse looks for a field
   named exactly `email` to decide where to send. The payload only had `Email`.
3. **A static message.** Formspree autoresponse bodies do not support variable
   substitution, so the email cannot carry the person's own verdict. That is
   fine here precisely because the gate came off: they see the verdict on
   screen, and the email carries the prior-approval checklist, which is worth
   having on its own and is what the on-page copy promises.

**Dependency, and it blocks the promise rather than the code:** `formspree.json`
only takes effect when deployed with the Formspree CLI, which is a separate
release from the site. Until that runs, the `class-ma-checker` form does not
exist and no autoresponse sends.

To stop that becoming a broken promise in the worst way, the route now falls
back to the shared `leads` form if the dedicated one 404s. The lead is never
lost; the only thing missing until the CLI deploy is the email itself.

**Also fixed while in here:** the page claimed "Six quick questions ... around
two minutes". The checker asks four. Now "Four quick questions ... around a
minute". The GDV page's "five inputs" claim was checked and is accurate.

**b. Repeat use.** They flagged that you can run it as many times as you like.
They explicitly said it is not an issue, just a note. No action.

**c. "Other or unsure" always fails.** Confirmed bug. In
`sections/tools/EligibilityChecker.tsx`, `computeVerdict` treats
`useClass === 'other'` as a hard fail, identical to "already residential", so it
returns "Class MA is probably not the route" no matter what the other four
answers say. That is wrong: unsure is uncertainty, not disqualification.

**Fixed 18 August.** "Other or unsure" moved out of the hard-fail branch into
the borderline branch, alongside the other unknowns.

Verified across **all 108 answer combinations**:
- The auditor's exact case (unsure use class, two years yes, no Article 4, not
  listed) now returns **borderline**, where it returned not-eligible before.
- "Other or unsure" now only fails when there is a genuine hard fail, i.e.
  Article 4 in force or the building is listed.
- "Already residential" still fails in every combination, as it must.

Confirmed by driving the real page: selecting "Other or unsure" then Yes, No,
Neither now shows "Borderline. A feasibility removes the doubt."

Worth noting why this mattered more than it looks: not knowing your use class is
the most common reason someone runs a screener like this at all, so the bug was
failing exactly the people the tool exists to help.

---

## Suggested order

1. Reply to the agency: sitemap and robots are done, ask for a re-crawl and for
   the Table formatting example.
2. Batch 1: canonicals, 301s, Recent Posts, smooth scroll. One pass, one deploy.
3. Batch 2: image compression, then table rendering.
4. Batch 3: blog category routes.
5. Batch 4: put the Class MA gate question to Ed, then ship the "other or
   unsure" fix with whatever he decides on the gate.

## Open questions

- **Ed:** gate the Class MA verdict properly, or drop the gate?
- **Agency:** the Table formatting tab was empty on our copy. What were you
  looking at?
- **Agency:** worth asking for their Search Console access or export, as the last
  check on redirect completeness. Lower priority now that Wayback and the Wix
  redirect manager have been mined.
- **Ed:** is `/project/queens-road` from the old Wix site the same Queens Road
  as our published case study? Currently assumed yes.
- ~~Switch redirects from 308 to explicit 301?~~ Done.
