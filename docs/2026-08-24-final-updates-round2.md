# Final update brief: round 2 (feasibility package restructure)

Date: 24 August 2026
Source: Ed's "Website Final Update Brief" PDF, section 03 (Feasibility Package)
Follows: docs/2026-08-24-final-updates-round1.md (pricing journey + CTA rewiring)

## Shipped in this round

### Pricing and entry point
- Hero price stamp replaced: "Feasibility from £49.99." with "Architect-led feasibility from £298." immediately below, instead of a single "from £298" line.
- New section, `PackageEntry`, sits right after the hero (near the top, per the brief): a two-card choice between the £49.99 Automated Site Feasibility (its own small checkout form) and the £298+ Architectural Feasibility (Recommended badge), with the shared `FeasibilityCalculator` component embedded directly beneath, at `#instant-quote`. Every "Get Your Instant Fixed Fee" CTA on the page now scrolls here instead of navigating to `/pricing`.
- The £49.99 route now has a real, working checkout: a flat fee, charged in full (not a deposit), via a new `tier: 'automated'` branch in `/api/checkout`. Contact details are captured and posted as a lead before Stripe is called, so an abandoned or unavailable checkout still leaves a lead.
- £15.99 HMO Property Check appears only as a small, faint, explicitly-labelled partner-tool link ("HMO Property Check, £15.99 — a partner tool from HMO Checker"), per the brief's instruction not to use it as the main feasibility headline.

### Condensed content: "What You Actually Receive"
- "Five Deliverables. One Decision.", "Real Documents. Not A Brochure." (the sample report gate) and the nine-bed HMO example are now one section, `DeliverableShowcase`, under a single heading. The sample-report email gate and the nine-bed HMO "see it in practice" card (linking to `/case-studies/st-johns-aylesbury`) sit inside the same section as the deliverable selector.
- The old standalone case-study highlight section at the bottom of the page (which showed the same nine-bed study a second time) has been removed as redundant.
- "Five Days, Five Steps" rewritten to the pay-first journey: secure your fixed fee → complete your project brief → Jodi validates the brief (Architectural tier only) → automated analysis, then architect review → feasibility delivered (video call for Architectural, email report for Automated).
- "What Is Analysed" (`FeasibilityEngine`) body copy shortened per the brief, letting the six diagrams carry more of the explanation.
- "One Fee. Everything In." removed as a standalone section, now that pricing sits near the top. Its exclusions list survives as a new accordion entry, "What isn't included in the fixed fee?", in the FAQ.

### People and proof
- "Who You're Working With" now has three people instead of two: Edward Kercher (Founder & Director), Kaan (retitled Design & Planning Lead, per the brief, without implying chartered town-planner status), and Jodi (Business Development & Expert Sessions, first point of contact for a free Expert Session). Jodi has no photo yet, so her card uses an initials avatar rather than inventing or borrowing one — the same discipline the About page roster already follows for unconfirmed details.
- Maywood Group's "avoided a bad purchase" review continues to lead the reviews section (already correct before this round).

## Backend work that came with this (not separately requested, but required to make the £49.99 route real)

- `/api/checkout` now branches on a `tier` field: `automated` charges a flat £49.99 in full; the existing `architectural` path (50% deposit of the computed fee) is unchanged.
- `/api/checkout/webhook` reports the automated tier distinctly ("Paid in full, awaiting detailed brief. No architect review at this tier.").
- `/feasibility-confirmed` now reads a `tier` query param from Stripe's success URL (a UI hint only — payment is still confirmed exclusively by the webhook) and shows tier-appropriate next steps and copy.
- The detailed brief (`FeasibilityContext`) now carries a `tier` alongside the answers, set automatically when the confirmation page's "Complete Your Project Brief" button is pressed. It's included in the `/api/feasibility/submit` payload and forwarded to Kaan's automation API as an additional field, so his system can eventually decide between the automated-only pipeline and the full architect-reviewed one.

## Verified locally (dev server + browser)

- Full click-through of the £298+ calculator (180m² Residential → HMO, one building, one design option, no heritage): correctly priced at £348 with a £174 (50%) deposit shown, "Secure My Feasibility" fell back to `/contact` with the lead already posted (no Stripe key in this environment).
- £49.99 mini-checkout: same fallback behaviour, lead posted first.
- FAQ accordion "What isn't included in the fixed fee?" expands with the five-item bullet list.
- Team section renders all three people, Jodi's initials avatar included.
- `/feasibility-confirmed?tier=automated` renders the automated-specific copy; "Complete Your Project Brief" opens the detailed brief with the calculator's answers (floor area, contact details) pre-filled.
- No console errors during any of the above.
- Found and fixed one unrelated pre-existing bug in passing: the feasibility-package page's `<title>` tag read "Visibility Package" instead of "Feasibility Package".

## Decisions that need Ed's sign-off

1. **£49.99 is paid in full, not a deposit** (per the brief: "take the full £49.99 upfront (recommended)"), while the £298+ product takes a 50% deposit. Confirm this asymmetry is intended.
2. **What actually happens after an automated brief is submitted** — the automated analysis/report generation and the "prompt a free Expert Session with Jodi" step are outside this website's code; they depend on Kaan's automation system, which now receives a `tier` field but may not yet act on it. Flagging this the same way round 1 flagged the Jodi-notification gap: the plumbing to reach the automation is in place, the automation's own behaviour is not something this session can verify or build.
3. **Jodi's card has no photo.** Same blocker as the About page (round 1 doc): needs the photo from the team shoot.

## Still to do

- Section 04: case-study audit against source folders, web crops of sketches.
- Section 05: Completed Projects reorder to Ed's ten, photo-only thumbnails, videos.
- Section 06: Expertise overview page, Co-Living & Large HMO page, search-intent H1s, title/meta dedup, sector FAQs.
- Section 07: About page rewrite (blocked on photography/video).
- Section 08: Contact three routes with Jodi profile and Calendly (blocked on link).
- Section 10: tracking events, full CTA/state QA on desktop and mobile.
