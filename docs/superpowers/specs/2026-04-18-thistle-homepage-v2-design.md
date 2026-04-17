# Thistle Architecture — Homepage v2 Design

**Date:** 2026-04-18
**Status:** Approved, ready for implementation
**Author:** Claude (with user direction)

## 1. Context

The client (Edward at Thistle Architecture) sent a "Website Redesign Brief — Phase 1: Homepage" PDF. An initial implementation pass satisfied the section skeleton but missed several substantive requirements and felt generic. This v2 redesign tightens brief compliance, lifts visual craft, and aligns specifically with the three reference sites the client named: **Resi + Searchland + Urbanist**.

### Positioning (non-negotiable, from brief)
Thistle = **developer-led, technology-enhanced feasibility platform with architectural delivery.**
- NOT a traditional architecture practice.
- NOT a design-led brand.
- System + service hybrid: the system drives speed and accuracy, architecture validates and delivers.

### Audience
Property developers, HMO investors, commercial-to-residential converters, land buyers, and deal sourcers. Tone must speak to decision-making, speed, risk reduction, and financial outcomes.

### Strategic direction
> Thistle = Resi's clarity + Searchland's data confidence + Urbanist's premium maturity.

Translated into decisions:
- **Resi** — confident short headlines, pill CTAs, feature rows that pair a message with a real product render.
- **Searchland** — alternating feature rows with product-preview graphics, bold metric callouts, logo marquee, audience-segmented value props.
- **Urbanist** — editorial voice, considered pacing, treats developers as intelligent professionals.
- **HMO Checker** — used ONLY for the Data Sources section's "Powered by [real logos]" pattern (per brief reference).

## 2. Scope

This redesign covers **only the homepage**. Other pages (About, Case Studies, Blog, legal) stay as-is but receive the brand color updates automatically because they share tokens.

### Brand tokens — no change
Per user direction (2026-04-18): retain `thistle-pink: #DAAEBB` and `thistle-green: #8F9952` for now. Do NOT change these in this pass.

## 3. Homepage section design

Current order is preserved. Changes are ranked by scope:

### 3.1 Hero — NO CHANGE
Per user direction, hero keeps its current headline, UI mock visual, and layout. Floating labels remain removed.

### 3.2 NEW: Problem section (insert between Hero and Metrics Strip)
**Objective:** satisfy brief's "problem → solution → proof → action" scroll flow.

**Design:**
- Light off-white background, continues from hero
- Tight eyebrow label: "The problem"
- 3-column pain-point grid with small muted icons (lucide-react):
  1. `Clock` icon — "Traditional feasibility takes 2–6 weeks."
  2. `AlertTriangle` icon — "Reports are opinion-led, not data-led. Refusal risk stays hidden."
  3. `PoundSterling` icon — "£thousands spent before you know if the deal pencils out."
- Max one sentence per point. No paragraphs.
- Component: `sections/Problem.tsx`

### 3.3 Metrics Strip — MINOR REFINEMENT
- Keep 3 metrics (98.5% / 20-35% / 86%).
- Tighten supporting copy.
- Add a small inline "Start Feasibility →" text-link below the metrics row for continuous CTA scent.

### 3.4 How It Works (Process) — MINOR REFINEMENT
Already matches brief (4 steps, horizontal, icons, card-based).
- Add inline "Start your feasibility →" text-link below the 4-step block.

### 3.5 Feasibility Engine — MAJOR REDESIGN
**Current:** 6 cards in a grid. Fails brief requirement of "diagram or flow graphic required."

**New:** 6 alternating feature rows (Searchland pattern).

**Per row:**
- Left column (on odd rows) / Right column (on even rows): eyebrow label + 2-line heading + 1-2 sentence description (tight, no paragraphs).
- Opposite column: custom SVG product-preview graphic specific to that data layer.

**Row-by-row graphics (all SVG, no external imagery):**
| # | Layer | Graphic concept |
|---|-------|----------------|
| 1 | Planning history & policy | Timeline with approval/refusal markers, a few annotation callouts |
| 2 | Local authority constraints | Map outline with Article 4 / conservation zone shading overlay |
| 3 | Density & housing analysis | Building silhouettes over a density heatmap |
| 4 | Comparable schemes | Stack of 3 comparable property cards with mini-metrics |
| 5 | GDV & viability | Small financial summary card (Purchase / Build / GDV / Margin %) |
| 6 | Spatial layout optimisation | Mini floor plan thumbnail (re-use OptionB approach from earlier) |

**Component:** `sections/FeasibilityEngine.tsx` (rewrite). Extract each graphic into small `components/engine/*.tsx` SVG components for clarity.

### 3.6 Deliverables — MINOR REFINEMENT
Already matches brief (6-card grid with outcome tags).
- Tighten card descriptions to 1-2 sentences max.
- Add single inline "See a sample report →" CTA below grid.

### 3.7 Why Thistle Is Different (comparison table) — MINOR REFINEMENT
Already matches brief format.
- Polish typography weight / tracking.
- No structural change.

### 3.8 Case Studies — CONTENT & CARD UPDATE
Per brief, each case study must show:
- Purchase price
- Unit uplift
- GDV increase
- Before / After layouts

**Current data** (in `data/caseStudiesData.ts`): title, location, tag, unit count, floor area, planning route, dates. Missing the financial fields above.

**Action:**
- Extend `CaseStudy` interface with: `purchasePrice`, `projectedGDV`, `gdvUpliftPct`, `beforeLayout`, `afterLayout`.
- Fill existing 4 case studies with plausible placeholder values. Each marked with `// TODO: confirm with Edward`.
- Redesign card: image at top, financial mini-table (Purchase / GDV / Uplift %) prominent below, before/after layout thumbnail row (small SVG pair).
- Keep current unit count and floor area as secondary info.

### 3.9 Data Sources — MAJOR REDESIGN (only section where HMO Checker pattern is used)
**Current:** 15 text pills.
**New:** Logo grid of real data providers.

**Title:** "Powered by 15+ authoritative data sources."
**Subtitle:** "Every analysis cross-references the UK's most trusted planning, property and environmental databases. More data means fewer surprises."

**Logo set** — aim for 10-15 real logos plus styled text badges for any we can't source. Target list of UK government / industry data bodies:
- Ordnance Survey
- HM Land Registry
- Environment Agency
- Rightmove
- Historic England
- Royal Mail
- Companies House
- National Grid
- Ministry of Housing, Communities & Local Government
- London Datastore
- Natural England (fallback: text badge)
- Office for National Statistics (fallback: text badge)
- Planning Portal (fallback: text badge)

**Layout:** grayscale logos in a 2-row grid (5 logos per row), light off-white background. Hover subtly lifts opacity. Styled text badges for any sources without sourceable logos — same grid cell, text-only, muted.

### 3.10 Testimonials — MINOR REFINEMENT
No structural change.
- Tighten quote typography.
- Add a small muted "Company" line under each attribution.

### 3.11 Primary CTA Block — MINOR REFINEMENT
Already matches brief. Polish typography and spacing.

### 3.12 FAQ — ALREADY UPDATED
Questions already rewritten for developer focus in prior pass. Minor tone polish only.

### 3.13 Footer Final CTA — NO CHANGE
Already says "Make faster decisions." + "Start Feasibility."

## 4. Global changes

### 4.1 Inline CTAs throughout
Per brief UX requirement ("CTA must appear consistently throughout"), add subtle inline text-link CTAs after each middle section:
- After Metrics Strip
- After Process
- After Deliverables
- After Case Studies
- After Data Sources

All link to the same `openModal()` action. Small, not shouty — they keep conversion scent without cluttering.

### 4.2 Copy tightening pass
Per brief UX requirement ("avoid large blocks of text"), audit every section for paragraphs over 2 sentences. Trim aggressively.

### 4.3 Typography refinement
No font change (Geist stays). Apply Cursor-style discipline:
- Tighter negative letter-spacing on display headings
- Restrained weight usage (one weight per scale level)
- Small-caps eyebrow labels stay consistent

## 5. Implementation order

1. **NEW Problem section** — small isolated new component
2. **Feasibility Engine redesign** — biggest visual lift
3. **Data Sources redesign** — second biggest, needs logo assets
4. **Case Studies card + data update** — content-heavy
5. **Inline CTAs across middle sections** — quick batch update
6. **Copy tightening pass** — global sweep
7. **Typography refinement** — global polish
8. **Visual QA pass in Chrome** — verify every section renders as intended

## 6. Acceptance criteria

- All 12 brief sections present and match brief intent
- New Problem section inserted; "problem → solution → proof → action" flow readable
- Feasibility Engine has 6 alternating rows with product-preview SVG graphics
- Data Sources uses real provider logos
- Case Studies show purchase price, GDV, uplift %, before/after
- Inline CTAs appear in middle sections
- No paragraph is longer than 2 sentences
- `npm run build` passes without errors
- Visual QA pass confirms no layout breaks, no overlap issues, navbar contrast against all sections

## 7. Risks / open items

- **Case study data is placeholder** — must be flagged to Edward and replaced before final launch.
- **Data source logos** — some may need fallback styled text if logos are unclear/unavailable.
- **Visual craft is subjective** — "Resi + Searchland + Urbanist" synthesis is interpretive; if the result feels wrong, iterate.

## 8. Not in scope

- Other page redesigns (About, Case Studies detail, Blog, legal)
- Animation/motion overhaul beyond existing Reveal system
- Mobile responsive review beyond default Tailwind breakpoints
- Brand color changes (user explicitly held back on this)
