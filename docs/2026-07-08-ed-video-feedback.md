# Ed's video feedback, 8 July 2026

**Status 2026-07-17:** most items are built and live. What remains is listed
under "Blockers" and the unticked boxes below; nearly all of it needs something
from Ed (the videography, the TrustPilot text, team roles, two feasibility
documents) rather than more build time.

Source: `03 New Website/Thistle mark up-20260708_105905-Meeting Recording.mp4`
(27 minutes, Ed walking the site). Transcribed locally with whisper.cpp; wording
below is a faithful reading of that transcript, not a paraphrase of intent.

Status key: `[ ]` to do, `[?]` blocked on a decision or missing asset.

## Blockers to resolve before building

- [x] **Price: £1,800 to £298. DONE.** Akash confirmed 2026-07-16, shipped.
  Original note: Ed: "That's wrong, isn't it? Because 1800 is
  way too high. It starts at 298, I think from the lowest package." He hedged
  ("I think"), and this is a live 6x price change, so confirm before shipping.
  Lives in one place: `data/feasibilityPackageData.ts` (`pricingFrom`), which
  feeds the package page, sticky CTA and hero line. Also hardcoded in
  `data/blog/what-is-a-feasibility-study.ts`.
- [x] **Videography: RESOLVED 2026-07-17.** Akash supplied the 6.25GB OneDrive
  archive; the homepage footage is cut and live. Remaining unused: Bereweeke
  drone reels and a 2.8GB Monument House clip (the "pull back over Winchester"
  shot Ed described, if he prefers it to the one used).
  Original note: Ed talks at length about drone footage for the
  homepage: a Monument House folder called "existing videos used for homepage"
  (Winchester drone footage), finished footage of Bereweeke Avenue, CGIs, and
  the video on the current live site. The shared folder contains **no video
  files at all** apart from this recording. Ed says it is in the Google Drive
  folder. Needs downloading before any homepage video work.
- [~] **Team: PART DONE.** Roster now matches the photo folder (Adouj and
  Beverley added, Onaiza removed, Seyma has no photo). STILL NEEDED: job titles
  for Adouj and Beverley, and a decision on Kaan (our site says "Design Lead",
  the live site says "Architect", which is a protected title under the
  Architects Act, so it needs ARB confirmation). Scarlett is on the live site
  as Design Developer but not in the folder: does she go on?
  Original note: Shared folder has Adouj Abu Saadeh, Beverley
  Gibbs, Ed, Jan, Kaan, Seyma (Seyma's folder is empty). The site currently
  shows Ed, Kaan, Jan, Onaiza. So Onaiza and Nick are absent from the new
  material and three people are new. Confirm who is on the team, their roles,
  and whether Onaiza/Nick come off.
- [?] **"Get Scarlett's comments"** on the conversion types and the SEO setup.
  Who is Scarlett, and is this a gate or a parallel track?
- [?] **TrustPilot description.** Ed wants it used as source copy in two places
  (homepage and About). Supply the exact text.
- [?] **Client reviews.** Ed: "There's some really good client reviews on iLit
  now" (transcription uncertain: Elite? Trustpilot?). Need the source and the
  review text.
- [?] **Case studies "doesn't appear to be working".** Could not reproduce.
  All 12 detail pages return 200, both tabs switch correctly, no console
  errors. Possibly transient on 8 July, or a stale cache. Ask Ed what he
  clicked.

## Homepage

- [x] Hero headline to **"Nationwide Feasibility First Architecture"**. Ed lands
  here explicitly, having first said "nationwide developer led architecture":
  "call this nationwide feasibility first architecture, because then that fits
  high end residential as well as developer led architecture as well." Current
  copy is "Nationwide Developer-Led Retrofit Architecture."
- [x] Hero replaced with the client's own Winchester drone footage (Monument
  House, "Existing videos - use for homepage"), cut to 12s at 1.44 MB. DONE.
  Original note: Ed wants "nice big
  images across the website", ideally a cut-together background video from the
  drone footage.
- [x] Use the TrustPilot practice description in the hero subtext area:
  "developer led architecture practice specialising in feasibility studies,
  retrofit conversions, reuse of existing buildings".
- [x] Make the five-step process numbers noticeably bigger ("one, two, three,
  four, five" clearly readable).
- [x] Add an **Example Projects** section directly under "Trusted by developers
  across the UK", before the feasibility process.
- [x] **Simplify the homepage; it is too long.** Ed's target shape: hero →
  trusted by developers → example projects → five-step feasibility process →
  stop. The page should then push people to the other pages.
- [ ] More developer logos coming from Ed for the "trusted by" strip.
- Keep as is: the 98.5% / five-day / 86% stats, "trusted by developers across
  the UK".

## Feasibility package page

- [x] Price corrected (see blocker above), in both the hero line ("one package,
  one fixed fee from X") and the package card.
- [ ] Change the hero image.
- [?] Restore the previous tagline. Ed: "What was the tag before? It was like
  clarity, five days or something. Can you put it back to what it was before."
  **Searched all git history: no clarity-based tagline ever existed.** The h1
  has been "Your Building, Answered In Five Days." since it was created
  (b33702b). Ed is misremembering, or thinking of the old WordPress site. Ask
  him for the wording he wants.
- [x] Explain that the automated analysis removes the laborious work so the
  architect concentrates on the most valuable part, the sketch scheme.
- [x] **Fix the process order.** Correct sequence: upload property details →
  instant call (step 2) → automated analysis → sketch scheme → final meeting.
- [x] Add a closing idea about "complete clarity, move into conveyancing with
  confidence".
- [x] Merge "local policy analysis" and "targeted policy analysis"; they say the
  same thing.

### Deliverables rework

- [x] Sketch schemes become deliverable **number one**: one to two options of GA
  floor plan sketch schemes, drawn over estate agent or detailed plans. Rename
  from "GA Floor Plans" to sketch scheme.
- [x] "Schedule of Accommodation" becomes schedule of accommodation **and space
  standards analysis** (unit by unit breakdown of GIA).
- [x] "Constraints Analysis" becomes **planning policy analysis**.
- [ ] Risk register stays.
- [x] "Go/No-Go Recommendation" reframed as the **full feasibility document**.
- [x] **Remove "Efficiency Metrics"** entirely.
- [x] Spatial layout optimisation reframed as **spatial analysis**: local space
  standards, building regs, licensing requirements, national space standards.
- [x] DONE. The Report section is now "What You Receive", showing all four:
  Feasibility Overview, Planning Research, Space Standards, and the sketches.
  Real examples now sit in `03 New Website/Example Feasibility, to be emailed
  as example/`. Ed described what each contains:
  - Feasibility Overview: overall context, planning constraints (history plus
    local comparables approved and refused), planning risk, development
    potential and extensions, building regulation compliance, commercial
    position and GDV.
  - Planning Research: risk level on planning constraints, e.g. Article 4.
  - Space Standards: the local space standards for that area.
- [ ] Add a client review to this page.

## Case studies / Our Work

- [x] **Five of the seven new feasibility studies are live**, written from their
  Feasibility Overview documents: 13 Beech House Road (C3 to 13 bed HMO),
  16 Claremont Road Luton (C3 to 7 bed HMO), 2 Gyfford Walk (C3 to C4 HMO),
  70 Hathaway Road Croydon (C3 to C3(b)), Former Lloyds Bank Cheddar (C3 to
  11 bed HMO and shop).
- [?] **Highbury Buildings Portsmouth and Stanmore Winchester are NOT done.**
  Their folders contain drawings only, with no feasibility document, so there
  is nothing to write the facts from. Needs the documents from Ed.
- [x] Beauchamp House rebuilt from its real material: Building Regulations
  drawings, four site photos, 4 flats at 73.4 to 80.3 sqm. Two corrections the
  documents forced: it is in Royal Leamington Spa (the entry said "South of
  England"), and it is **on site, not complete** (the site photos show
  strip-out), so a `status` field now carries that rather than a hardcoded
  "Complete" badge.
- [x] Monument House, Wigan Church and 162 Millbrook are DONE from the archive.
  Bishopstoke and Forest Home were REMOVED (nothing exists for them anywhere).
  Original note: Monument House, Wigan Church, 162 Millbrook, Bishopstoke and Forest Home
  are **still stock placeholders**. Their folders in the shared drive are empty.
  Needs photos and write-ups from Ed.

## Conversions

- [x] Categories Ed wants: high-end residential, commercial to residential,
  HMO, mixed-use commercial. (Site currently has commercial-to-residential and
  HMO only.)
- [ ] Use real project images. Ed approves what is there so far.
- [?] Scarlett to comment on the conversion types and SEO structure.

## Tools

Ed likes the Class MA checker as is ("Yeah, I like this. It's cool").

- [x] Rename the GDV calculator to **Apartment GDV Calculator**, and add an
  **HMO calculator** underneath it (one exists on the HMO Checker website).
- [x] DONE. HMO Checker is in the Tools nav, opening in a new tab.
- [x] On the HMO conversion page: link to HMO Checker, offer a free report or
  mention the £15.99 one-off purchase, and possibly show the HMO Checker map.
- [ ] **New tool: build cost analyser.** User picks the project type, then:
  - HMO: process already exists on the HMO Checker website.
  - Commercial to resi: ask specification, project size, location, and whether
    mixed-use commercial or just apartments.
  - High-end residential: location, spec tier (ultra-high / high / medium), and
    what extensions are planned.
  - Output: calculated GDV.

## About

- [x] **Remove "Developers first, architects second"** framing. Ed: "don't like
  this... don't like that either."
- [x] Rewrite from the TrustPilot description: a feasibility-first architectural
  practice; how we analyse data, create accuracy, reduce time; we work with
  both developers and high-end residential clients; all about retrofit and
  existing buildings.
- [ ] Use real images; Ed has new ones for this.
- [ ] Ed has "new words" for the "every project and feasibility" area, to come.
- [ ] Ed's idea: run the project images through AI so they all look consistent.
