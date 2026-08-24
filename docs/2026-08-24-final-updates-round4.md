# Final update brief: round 4 (missed items + case-study audit)

Date: 24 August 2026
Source: full recheck of Ed's "Website Final Update Brief" PDF against rounds 1-3
Follows: rounds 1-3 (docs/2026-08-24-final-updates-round1.md through round3.md)

The user asked to make sure everything in Ed's brief had actually been done before calling it finished. This round is that recheck: two missed items from earlier sections, plus a first real pass at section 04 (the case-study audit), which round 3 had scoped but not started.

## Two items round 1-3 missed

- **Homepage featured projects had no stage/outcome line.** Ed's section 01: "add a subtle stage or outcome line where useful, e.g. 'Feasibility → Planning → Technical → Construction' or 'Commercial → 4 Apartments / Planning Approved'." The three homepage cards (Beauchamp House, Bath Street Cheddar, Beech House Road) now each show one, composed from facts already on each project (status, units, recommendation) rather than new data: "Office → 4 Flats / On Site" and "Feasibility → Go Recommendation" ×2.
- **The feasibility package page had no "hundreds of conversions, nationwide" credibility line.** Ed's section 03: "Use concise credibility proof such as hundreds of conversions designed, nationwide project experience, planning success and core project types. Look at hmo designers, use the same context but more general." I checked HMO Designers' own site for the *style* of claim they make (a nationwide framing, a nationally-said "hundreds of them" phrase) but did not borrow their specific numbers, since those are a different business's figures, not Thistle's. Added a compact line under the team section using language already established elsewhere on this site.
- **The five-day SLA FAQ was now inaccurate.** Since the pay-first journey (round 1-2), the "How quickly can you start?" answer still said the clock starts "from the first working day after submission" — vague about submission of what. Ed's brief is explicit: the SLA starts "once both payment and all required project information are complete." Reworded to match.

## Section 04: case-study audit — a first real pass

I had an Explore agent compare every one of the 12 feasibility studies in `data/caseStudiesData.ts` against their source folders in `03 New Website/Feasibility Examples/`, which is genuinely in this repo. Full findings below; I acted on the two clearest, safest, best-evidenced ones myself and stopped short of the rest, for reasons explained per item.

### Fixed

- **Axis House's sketch images had the full drawing title block, disclaimer and Thistle logo still visible** — exactly what Ed's brief says to crop out ("create clean web-only crops with the drawing disclaimer, Thistle logo and title-block material removed"). Re-cropped both existing images from the source PDFs, content only. Also added a second, genuinely distinct sketch proposal (elevation and plans) that existed in the source folder but was never published, since the site's own copy already says "we tested three sketch proposals."
- **Highbury Buildings' bed count was wrong.** The site said "11 bedrooms" / "Eleven-Bed" throughout (title, stats, description, project story). The source drawing (`SK003 - Highbury 10 Bed HMO Layout.pdf`) clearly labels ten rooms, bed 1 through bed 10, across four floors. Corrected everywhere it appeared. Also restored the drawing itself to the gallery — a processed, ready-to-use image of it already existed in `public/images/projects/` but was never referenced anywhere in the code.

### Found, not acted on — needs your input

- **Axis House's "three proposals" claim may not be accurate.** The source folder has a file named "Sketch Proposal 3 - Elevation.pdf", but its visible content — including the red unit-schedule annotations ("4 x 3BED UNITS 88m²...") — is identical to Proposal 2's, just rendered faintly. It reads as a duplicate or superseded export, not a genuine third design. I've published the second proposal (which is genuinely distinct) but left the "three proposals tested" / "three rounds of sketch testing" copy and the "3" stat exactly as they were, rather than guess whether a real third design exists somewhere else. Can you confirm whether there really were three, or whether it's two?
- **Stanmore Winchester exists as source material but isn't published anywhere on the site.** Five drawing sheets (existing elevations, existing plans, two design options, proposed elevations) with no written brief, no address confirmation, no client details, no outcome. I read the drawings directly and could not responsibly write a challenge/approach/outcome narrative from sketches alone without inventing facts that aren't there — that would be exactly the kind of fabrication this project's own conventions rule out (see `docs/case-study-confirmations.md`'s pattern of flagging unconfirmed facts rather than guessing). This one needs you: either a written brief for it exists somewhere I don't have access to, or you can give me the facts directly (address, what was asked, what was found) and I'll write it up properly.
- **Harpenden Police Station's copy references a "Nov 2025 Planning Appraisal" that isn't in the source folder** — only the sketches PDF is there. This was already flagged as an open question in `docs/case-study-confirmations.md` before this round ("OK to publish? The appraisal was produced for an agent/buyer context"), so it's not a new gap, just one I can confirm is still open.
- **Several other studies have minor, lower-stakes gaps** the audit surfaced but I didn't touch: a few sketch PDFs exist in source folders but only one derived image is shown per project (Beech House Road, Claremont Road, Hathaway Road); a couple of local-authority HMO standards documents are referenced as "guidance" but have no working link (arguably correct behaviour, since hosting a copy of a council's own guidance document ourselves is a separate decision from linking to it); St John's Aylesbury has four "Client Information" source files (existing/proposed floor plans, one CAD file) that aren't used beyond the two images already derived from them. None of these looked urgent enough to act on unilaterally in this pass.

### Not re-checked

Six of the twelve studies (Greyfriars, Beechmount, Southgate Winchester, Bath Street Cheddar, Claremont Road, Gyfford Walk, Hathaway Road) had no major gaps in the audit findings — sketch coverage matches source, or the source itself has nothing further to surface. I haven't independently re-verified each of these myself; I'm relying on the audit agent's comparison for those.

## Verified

- Full production build is clean.
- The pricing engine's own test script still passes.
- Axis House and Highbury Buildings' case study pages checked in a real browser: all four Axis House drawings render cleanly with no title blocks visible; Highbury shows "10, all en suite" and its previously-orphaned sketch now appears in the gallery.

## Consolidated list of everything still blocked on you

Pulling together every open item from all four rounds:

1. **Photography and video** — new team photography, the full-office photo, and studio B-roll video for the About page; completion photography for Monument House and 162 Millbrook Road (both in your top-ten priority list, currently showing drawing thumbnails because no photo exists anywhere in this repo or in `03 New Website`); any video at all for Completed Projects (none exists in the repo).
2. **Jodi** — her Calendly link (the Contact page and feasibility package team card both have working stand-ins ready to swap the moment it exists) and her photo.
3. **Analytics/CRM platform** — there is currently no analytics integration in the codebase at all (no GA4, GTM, or Vercel Analytics) and no CRM webhook configured, so the funnel-tracking and unified-lead-record parts of section 10 have nothing to build against yet.
4. **Case-study content decisions** (this round): whether Axis House really had three tested proposals or two; the missing facts for Stanmore Winchester if you want it published; confirmation on Harpenden's planning appraisal.
5. **Sign-offs from earlier rounds**: the balance-due wording and VAT-inclusive pricing change (round 1); the £49.99-paid-in-full vs £298-deposit asymmetry, and what Kaan's automation system does with the new `tier` field it now receives (round 2); whether the homepage's "86% faster" stat should be replaced too, now that the identical claim has been replaced on the About page (round 3); confirmation that hello@thistlearchitecture.co.uk is actually monitored.
