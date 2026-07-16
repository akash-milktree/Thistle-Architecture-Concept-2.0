# Ed's video feedback, 8 July 2026

Source: `03 New Website/Thistle mark up-20260708_105905-Meeting Recording.mp4`
(27 minutes, Ed walking the site). Transcribed locally with whisper.cpp; wording
below is a faithful reading of that transcript, not a paraphrase of intent.

Status key: `[ ]` to do, `[?]` blocked on a decision or missing asset.

## Blockers to resolve before building

- [?] **Price: £1,800 or £298?** Ed: "That's wrong, isn't it? Because 1800 is
  way too high. It starts at 298, I think from the lowest package." He hedged
  ("I think"), and this is a live 6x price change, so confirm before shipping.
  Lives in one place: `data/feasibilityPackageData.ts` (`pricingFrom`), which
  feeds the package page, sticky CTA and hero line. Also hardcoded in
  `data/blog/what-is-a-feasibility-study.ts`.
- [?] **Videography is missing.** Ed talks at length about drone footage for the
  homepage: a Monument House folder called "existing videos used for homepage"
  (Winchester drone footage), finished footage of Bereweeke Avenue, CGIs, and
  the video on the current live site. The shared folder contains **no video
  files at all** apart from this recording. Ed says it is in the Google Drive
  folder. Needs downloading before any homepage video work.
- [?] **Team roster changed.** Shared folder has Adouj Abu Saadeh, Beverley
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

- [ ] Hero headline to **"Nationwide Feasibility First Architecture"**. Ed lands
  here explicitly, having first said "nationwide developer led architecture":
  "call this nationwide feasibility first architecture, because then that fits
  high end residential as well as developer led architecture as well." Current
  copy is "Nationwide Developer-Led Retrofit Architecture."
- [ ] Replace the hero image with real project imagery. Ed wants "nice big
  images across the website", ideally a cut-together background video from the
  drone footage.
- [ ] Use the TrustPilot practice description in the hero subtext area:
  "developer led architecture practice specialising in feasibility studies,
  retrofit conversions, reuse of existing buildings".
- [ ] Make the five-step process numbers noticeably bigger ("one, two, three,
  four, five" clearly readable).
- [ ] Add an **Example Projects** section directly under "Trusted by developers
  across the UK", before the feasibility process.
- [ ] **Simplify the homepage; it is too long.** Ed's target shape: hero →
  trusted by developers → example projects → five-step feasibility process →
  stop. The page should then push people to the other pages.
- [ ] More developer logos coming from Ed for the "trusted by" strip.
- Keep as is: the 98.5% / five-day / 86% stats, "trusted by developers across
  the UK".

## Feasibility package page

- [ ] Price corrected (see blocker above), in both the hero line ("one package,
  one fixed fee from X") and the package card.
- [ ] Change the hero image.
- [ ] Restore the previous tagline. Ed: "What was the tag before? It was like
  clarity, five days or something. Can you put it back to what it was before."
  Needs digging out of git history.
- [ ] Explain that the automated analysis removes the laborious work so the
  architect concentrates on the most valuable part, the sketch scheme.
- [ ] **Fix the process order.** Correct sequence: upload property details →
  instant call (step 2) → automated analysis → sketch scheme → final meeting.
- [ ] Add a closing idea about "complete clarity, move into conveyancing with
  confidence".
- [ ] Merge "local policy analysis" and "targeted policy analysis"; they say the
  same thing.

### Deliverables rework

- [ ] Sketch schemes become deliverable **number one**: one to two options of GA
  floor plan sketch schemes, drawn over estate agent or detailed plans. Rename
  from "GA Floor Plans" to sketch scheme.
- [ ] "Schedule of Accommodation" becomes schedule of accommodation **and space
  standards analysis** (unit by unit breakdown of GIA).
- [ ] "Constraints Analysis" becomes **planning policy analysis**.
- [ ] Risk register stays.
- [ ] "Go/No-Go Recommendation" reframed as the **full feasibility document**.
- [ ] **Remove "Efficiency Metrics"** entirely.
- [ ] Spatial layout optimisation reframed as **spatial analysis**: local space
  standards, building regs, licensing requirements, national space standards.
- [ ] Show the **complete document set** they receive, not just the report:
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

- [ ] **Add seven new feasibility studies** now in the shared folder: 13 Beech
  House Road (C3 to 13 bed HMO), 16 Claremont Road Luton (C3 to 7 bed HMO),
  2 Gyfford Walk (C3 to C4 HMO), 70 Hathaway Road Croydon (C3 to C3(b)),
  Former Lloyds Bank Cheddar (C3 to 11 bed HMO and shop), Highbury Buildings
  Portsmouth (co-living, mixed commercial/HMO/shop), Stanmore Winchester
  (house extension, resi).
- [ ] Build out the finished projects properly. Beauchamp House now has four
  real site photos and full plans; Axis House has five plan PDFs. These
  replace the placeholder stock imagery and "coming soon" copy.

## Conversions

- [ ] Categories Ed wants: high-end residential, commercial to residential,
  HMO, mixed-use commercial. (Site currently has commercial-to-residential and
  HMO only.)
- [ ] Use real project images. Ed approves what is there so far.
- [?] Scarlett to comment on the conversion types and SEO structure.

## Tools

Ed likes the Class MA checker as is ("Yeah, I like this. It's cool").

- [ ] Rename the GDV calculator to **Apartment GDV Calculator**, and add an
  **HMO calculator** underneath it (one exists on the HMO Checker website).
- [ ] Add HMO Checker into the tools area.
- [ ] On the HMO conversion page: link to HMO Checker, offer a free report or
  mention the £15.99 one-off purchase, and possibly show the HMO Checker map.
- [ ] **New tool: build cost analyser.** User picks the project type, then:
  - HMO: process already exists on the HMO Checker website.
  - Commercial to resi: ask specification, project size, location, and whether
    mixed-use commercial or just apartments.
  - High-end residential: location, spec tier (ultra-high / high / medium), and
    what extensions are planned.
  - Output: calculated GDV.

## About

- [ ] **Remove "Developers first, architects second"** framing. Ed: "don't like
  this... don't like that either."
- [ ] Rewrite from the TrustPilot description: a feasibility-first architectural
  practice; how we analyse data, create accuracy, reduce time; we work with
  both developers and high-end residential clients; all about retrofit and
  existing buildings.
- [ ] Use real images; Ed has new ones for this.
- [ ] Ed has "new words" for the "every project and feasibility" area, to come.
- [ ] Ed's idea: run the project images through AI so they all look consistent.
