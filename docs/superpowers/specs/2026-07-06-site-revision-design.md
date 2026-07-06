# Thistle Site Revision, July 2026 (Ed's Feedback Round)

Design spec for the site-wide revision agreed with Akash on 6 July 2026, based on
Ed's feedback. Approach: editorial hybrid. Keep the existing design system and
product-platform positioning; adopt HMO Designers' business tone and photo-led
warmth; concentrate all sales pressure on the feasibility package page.

Source material: `03 New Website/` folder at the project root (Ed's team photos,
real sketch PDFs, the St Johns feasibility document). Reference site:
https://hmodesigners.co.uk/ (homepage, about, blog).

## Goals

1. De-sales every page except the feasibility package page.
2. Real imagery across the site (currently only kaan.png and logos).
3. Feasibility package page becomes a standalone CRO landing page for Google Ads.
4. Blog matches the HMO Designers pattern, with new SEO content.
5. The site reads as one cohesive product, not disconnected pages.

## 1. Sitemap and navigation

- Remove `/tools` index page. 301 redirect `/tools` to `/tools/class-ma-checker`.
- Remove `/how-it-works` page. 301 redirect to `/feasibility-package#how-it-works`.
- Merge conversions: fold "Office to Resi (Class MA)" into "Commercial to
  Residential" (one page, office content becomes a major section with its own
  anchor). 301 redirect `/conversions/office-to-resi-class-ma` to
  `/conversions/commercial-to-residential`. Keep `/conversions/hmo`.
- Nav (desktop, left to right): Feasibility Package, Case Studies, Conversions
  (dropdown: Commercial to Residential, HMO), Tools (dropdown: Class MA Checker,
  GDV Calculator), About, Blog. Nav CTA button: "Book Your Feasibility".
- Footer link columns updated to match (no Tools index, no How It Works,
  two conversions).

Redirects live in `next.config.ts` as permanent redirects.

## 2. CTA architecture (two-tier funnel)

- **Tier 1 (site-wide)**: every CTA outside the package page is labelled
  "Book Your Feasibility" and links to `/feasibility-package`. This replaces both
  "Start Feasibility" (modal trigger) and "Book your feasibility today" copy
  everywhere outside the package page.
- **Tier 2 (package page only)**: CTAs are labelled "Start Feasibility" and open
  the full-page form.
- **Full-page form**: rebuild `FeasibilityModal` as a full-screen takeover
  (covers viewport, thistle-white surface, close button, Escape works). Four
  steps reordered for friction: 1) Property (address/postcode first, size,
  floors, current use), 2) Project goals, 3) Contact details, 4) Review and
  submit. Progress bar plus step indicator. "Takes about 2 minutes" shown on step
  1. Keep `FeasibilityContext` API (`openModal`) so call sites do not change.
- **Exit-intent popup** (`components/ExitIntentPopup.tsx`): render on
  `/feasibility-package` only.
- Microcopy under primary CTAs: "No obligation. Response within one working day."
  (mirrors HMO Designers reassurance pattern). Confirm the one-working-day claim
  with Ed before launch; fall back to "No obligation." if unconfirmed.

## 3. Homepage

Section order after the change: Hero (with metrics strip), DeveloperLogos,
Process, DataSources, ArchitectReview, Benefits, Difference, CaseStudies,
Testimonials, FAQ. (FeasibilityEngine moves to the package page.)

- **Hero** (`sections/Hero.tsx`): remove the feasibility report card and Kaan
  block entirely. Centre-aligned layout. Full-bleed background: licence-free
  drone shot of UK housing/rooftops with a dark overlay for contrast (text goes
  white; check contrast at all viewports). New copy:
  - H1: "Nationwide Feasibility For Building Conversions."
  - Support line keeps the facts without the pitch: data-driven feasibility for
    developers, clear Go or No-Go in five days.
  - Primary CTA: "Book Your Feasibility" (links to `/feasibility-package`).
  - Secondary: "See how it works" scrolls to the Process section.
  - The "5-day turnaround" badge stays but calm (no pulsing dot).
  - Metrics strip below hero unchanged in content; keep dark band.
- **Process** (`sections/Process.tsx`): keep the 5 steps and layout. Retitle:
  eyebrow "Our Process", H2 "Our Five-Step Feasibility Process." Inline CTA
  becomes tier-1 ("Book Your Feasibility" link).
- **DataSources**: unchanged apart from tier-1 CTA swap.
- **FeasibilityEngine**: remove from homepage; component moves to the package
  page (see section 4).
- **ArchitectReview** (`sections/ArchitectReview.tsx`): keep eyebrow "Next
  Stage". Soften copy (remove urgency phrasing). Add the human element: Kaan's
  team photo with name, role, credentials (BArch), HMO Designers-style. CTA
  becomes tier-1.
- **Benefits** (`sections/Benefits.tsx`): tone pass. H2 becomes "Why Developers
  Use Thistle." Flip-card interaction replaced with static cards showing the
  full body copy (the hover-to-reveal hides content for no benefit, and hides it
  entirely on touch devices).
- **Difference** (`sections/Difference.tsx`): keep the comparison table; tone
  pass on the heading only if needed. No structural change.
- **CaseStudies**: keep; cards now pull real project imagery (see section 6).
- **Testimonials, FAQ**: keep. FAQ sidebar button becomes tier-1.
- **Footer CTA band** (`sections/Footer.tsx`): keep "Make Faster Decisions."
  headline; add background image (drone/site photography) with dark overlay;
  button becomes tier-1.

## 4. Feasibility package page (Google Ads landing page)

Full rebuild of `views/FeasibilityPackagePage.tsx`. Section order:

1. **Hero**: H1 value statement plus price anchor ("From £1,800, fixed fee"),
   trust markers row (98.5% planning success, 5-day guarantee, response within
   one working day), CTA "Start Feasibility" (opens form), background imagery
   (Higgsfield-generated or drone shot, dark overlay).
2. **Social proof strip**: developer logos plus a pull-quote testimonial.
3. **How It Works** (`id="how-it-works"`): the 5-step narrative condensed from
   the deleted How It Works page, using its StepRow pattern where it fits.
4. **What's Included In Data Analysis**: the FeasibilityEngine section moved
   from the homepage (six alternating rows with data-layer graphics; graphics
   may stay as SVG data-viz since they show the system output, but reskin any
   that read as walls of text).
5. **Six deliverables**: keep the alternating row structure; replace the
   text-heavy SVG graphics with real imagery: converted sketch drawings from
   Ed's projects (GA plans, elevations) plus Higgsfield-generated on-brand
   photos where a drawing does not fit the deliverable.
6. **Sample report**: rebuilt from the real St Johns feasibility document
   (7 pages). Show real page thumbnails. Add gated download: email captures a
   lead, then the anonymised sample PDF is available. (Anonymise the client
   address if Ed prefers; flag to Ed.)
7. **Pricing and scope**: PricingAnchor (£1,800) plus ScopeClarity (what is and
   is not included), kept close together.
8. **Timeline band**: the 5-day breakdown, existing component reskinned.
9. **Case study highlight**: one real project (St Johns) with outcome.
10. **Testimonials**: selection of the strongest 3 or 4.
11. **FAQ**: objection-led (cost, speed, accuracy, planning risk, what happens
    after feasibility).
12. **Final CTA**: "Ready When You Are." plus form CTA.

Extras: sticky mobile CTA bar (appears after hero scroll), exit-intent popup
enabled here only. The page must stand alone for paid traffic: message match
with ad copy ("feasibility study", "5 days", "fixed fee"), no dead ends.

## 5. Imagery system

Priority order when choosing imagery for any section:

1. **Real drawings**: sketch PDFs from `03 New Website/Feasibility Examples/`
   and `Finished Projects/`, converted to web images (PNG/WebP via pdftoppm or
   similar), cropped and treated consistently (thistle-white background, subtle
   border, consistent aspect ratios).
2. **Real people**: team photos from `03 New Website/Team Photos/` (Ed, Kaan,
   Jan, Nick, Onaiza; Seyma pending from Ed).
3. **Generated**: Higgsfield MCP images for atmosphere (UK streetscapes, office
   exteriors, site visits), art-directed to the thistle palette, muted tones,
   no text in image, photorealistic.
4. **Licence-free stock**: drone shot for the homepage hero (Unsplash/Pexels,
   UK residential rooftops), licence recorded in the repo.

All processed images land in `public/images/` with descriptive kebab-case names.
Unsplash hotlinks are removed site-wide. The rules above get written into
design.md.

## 6. Case studies

Replace all four fabricated studies with real projects from Ed's folder:

| Slug | Project | Type | Material available |
|---|---|---|---|
| st-johns-aylesbury | 4 St John's Street, Aylesbury | Large HMO (9-bed, Sui Generis) | Full feasibility doc, existing/proposed plans, sketches |
| harpenden-police-station | Harpenden Police Station | Police station to flats | Sketches, planning appraisal |
| greyfriars-kings-lynn | Greyfriars, King's Lynn | Office to flats/HMO mixed use | Option sketches (Options 2 and 4), existing info |
| axis-house | Axis House | Office to high-end houses | Sketch proposals 1 to 3, plans and elevations |
| southgate-winchester | Southgate, Winchester | Listed building to HMO | Proposed sketches |
| beechmount-manchester | Beech Mount, Manchester | Existing HMO feasibility | Draft SK001 |

Build the first four as full case studies; Southgate and Beechmount as shorter
entries if material stretches. Metrics rules: only state figures a document
supports (e.g. St Johns: 9 bedrooms, 12 to 16 sqm rooms, £800 to £850 pcm room
rates, 25 sqm amenity). No invented purchase prices or GDV percentages.
Where the layout expects a stat we cannot support, use factual non-financial
stats (unit counts, timescales, planning route). Produce
`docs/case-study-confirmations.md` listing every claim Ed needs to confirm plus
the missing photo folders (all `Photos/` directories in his share were empty),
so Akash can send it to Ed in one go.

Case study detail pages and cards get real sketch imagery.

## 7. About and Team

Mirror the HMO Designers about page structure:

1. PageHero intro (business tone).
2. "Who we are" block with the personal-experience angle (developer-led, they
   run these projects themselves).
3. Stats row (reuse homepage metric numbers).
4. Team grid with real photos: Ed (founder), Kaan (design lead), Jan, Nick,
   Onaiza. Each card: photo, name, role, credential bullets. Crop/treat photos
   consistently (same aspect, same background treatment where possible).
5. No "Work With Us" CTA band. The footer band closes the page. This resolves
   the stacked dual-CTA problem by removal, as Ed allowed.

## 8. Blog

**Archive** (`views/BlogPage.tsx`): HMO Designers pattern. Header "Blog" plus
tagline, category filter buttons (All, Planning, Permitted Development,
Feasibility, HMO, Investment, News), article count, image-led card grid
(featured image, category tag, title), no sidebar, no pagination until volume
demands it.

**Post template** (`views/BlogPostPage.tsx`): category tag, H1, author and
dates, featured image, jump-to contents for posts with 3 or more sections,
body with tables and images where useful, mid-article CTA box (tier-1), author
bio at the end, "Keep reading" related posts (3 cards), footer band.

**Data model** (`data/blogData.ts`): add `category` from the fixed set above
and optional `updated` date. Recategorise the 3 existing posts.

**New content**: 8 new SEO articles, Grade 7 UK English, no em dashes,
1,200 to 1,800 words each, each mapped to a target query:

1. Office to residential conversion: the 2026 guide (Permitted Development)
2. Class MA explained: converting commercial buildings without full planning
   (Permitted Development)
3. How much does a commercial to residential conversion cost? (Investment)
4. What is a feasibility study, and when do you need one? (Feasibility)
5. HMO feasibility: how to know if a building works as an HMO (HMO)
6. How to calculate GDV, with worked examples (Investment)
7. Article 4 directions: what they block and how to check (Planning)
8. The top reasons conversion schemes get refused (Planning)

Each article links to a relevant tool or the feasibility page, includes an FAQ
block, and carries Article schema markup. Internal links between related posts.

## 9. Lead-gen extras

- Gated sample report download on the package page (email capture).
- Email capture on both free tools before showing full results (soft gate:
  summary visible, full detail after email).
- Reassurance microcopy under primary CTAs (see section 2).
- Testimonial cards keep names, roles, companies; add headshots only if Ed
  supplies them (no stock faces).

## 10. design.md and cohesion pass

After implementation:

- design.md gains: imagery system rules (section 5), CTA canon (section 2),
  new components (FullPageForm, PhotoSection/ImageBand, blog card set, sticky
  mobile CTA), blog category tokens, and any new spacing/type decisions.
- Copy rules unchanged (UK English, Grade 7, no em or en dashes, no hype verbs)
  and re-affirmed against every new string.
- Cohesion checklist: every page uses the same section rhythm, same CTA tier
  rules, same imagery treatment; run `scripts/responsive-sweep.mjs` at
  mobile-375, tablet-768, laptop-1280, desktop-1440, desktop-1920 with no
  horizontal scroll.

## Build order (one continuous run)

1. Homepage (hero, tone pass, section moves, imagery).
2. Feasibility package page plus full-page form plus exit-intent scoping.
3. Blog structure plus 8 articles.
4. About/Team.
5. Case studies rebuild plus confirmations doc.
6. Conversions merge, tools index removal, nav/footer/redirects.
7. design.md update, cohesion pass, responsive sweep, screenshots for review.

## Error handling and edge cases

- Form: client-side validation per step, submit failure shows a retry state and
  preserves input; success state confirms the one-working-day response.
- Redirects must not loop and must preserve unknown `/tools/*` or
  `/conversions/*` slugs to a 404 rather than a wrong-page redirect.
- Images: every `<Image>` gets width/height or fill with sized container to
  avoid CLS; alt text in UK English; drone hero has a solid-colour fallback.
- Blog category filter buttons render only for categories that have at least
  one post, so no filter can lead to an empty grid.

## Out of scope

- Payment integration on the form (current behaviour unchanged).
- New testimonials or logos (Ed to supply).
- Contact page changes beyond CTA relabelling.
- Anything on the HMO Designers or HMO Checker sites themselves.
