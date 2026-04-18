# Hero + Metrics Strip Redesign — Design Spec

**Date:** 2026-04-18
**Status:** Implemented (Approach A chosen after A/B prototype comparison)
**Files touched:** `sections/Hero.tsx`, `views/HomePage.tsx`, `sections/MetricsStrip.tsx` (deleted)

---

## Problem

Two issues with the homepage hero area as it stood after the previous round of changes:

1. **Vertical balance felt off.** The hero content sat too high in the viewport — there was very little space above the headline (between the navbar and "From building...") and noticeably more space below the right-side card before the metrics strip. Cause: the navbar is `fixed top-0` and overlays the hero; the inner flex math centred content within the full section height, ignoring the navbar overlap, so the visual centre landed below the perceived viewport centre.

2. **Insufficient visual break between the hero and "How It Works."** The hero (`bg-thistle-white`), the metrics strip (`bg-thistle-white`), and the Process section (`bg-thistle-white`) were all the same cream colour. The metrics strip just blended in and the eye had no clear demarcation between hero and the next section.

3. **Strip carried a tagline that the user didn't want.** "83% faster on average than traditional feasibility processes" sat above the three metrics in small grey text — fine on its own but it functioned as a faux subtitle for a section that the brief explicitly defines as bare metrics ("Section 2: Key Metrics Strip" — content list is the three metrics only, the 83% line is "Supporting Logic (for dev context only)").

## Goals

- Visually centre the hero content between the navbar bottom and the strip top (correcting for navbar overlay).
- Make the metrics strip visually distinct so it acts as a hard break between the cream hero and the cream Process section.
- Strip carries only the three metrics — no tagline, no eyebrow.
- Stay within the brief's colour palette, including its allowance for "occasional contrast sections only" (dark bg).

## Non-Goals

- Don't introduce new metrics, copy changes, or layout reshuffles beyond what's in this spec.
- Don't change the rest of the homepage flow — Hero → Process → Feasibility Engine → … remains.
- Don't touch the Footer's Final CTA (already correct per the brief).

## Approach (Approach A — In-section dark strip)

Two approaches were prototyped live for visual comparison: **A** (strip stays inside the Hero `<section>`, dark bg) and **B** (strip extracted into its own `<MetricsStrip>` section). User picked A after seeing both running.

### Why A over B

A keeps the strip *visually tied* to the hero — at desktop viewport heights the strip's top edge is visible at the bottom of the fold, signalling "there's more below" without forcing a scroll. With B, the hero filled the full viewport and the strip sat just below the fold, requiring a scroll to register. Approach A reads as one cohesive hero block with a built-in credibility band; B felt structurally cleaner but visually disconnected the strip from the hero.

### Implementation details

**`sections/Hero.tsx`:**
- Section wrapper changes from `min-h-screen bg-thistle-white` to `min-h-screen bg-thistle-white flex flex-col lg:pt-20`. The `flex flex-col` lets the inner two-column content area expand via `flex-1` while the strip sits below it. The `lg:pt-20` (80px) approximates the navbar height (~84px = `py-5` + `h-11` logo) so content centres correctly within the visible viewport rather than the full section.
- Inner two-column container changes from `min-h-screen flex flex-col lg:flex-row` to `flex flex-col lg:flex-row flex-1 w-full` — `flex-1` lets it fill the available vertical space between the section's top padding and the strip.
- Right-column `lg:h-screen` becomes `lg:h-auto` so the column stretches with the parent rather than forcing its own viewport height.
- Strip is a `<div>` at the end of the section with:
  - `bg-thistle-black text-white`
  - 3-column grid of metrics, vertical dividers between metrics use `md:border-l md:border-white/[0.1]`
  - Each metric: large value (`text-fluid-h3 text-white`), label (`text-sm text-white/70`), detail (`text-xs text-white/40`)
  - No tagline above the grid
  - Reveal animations preserved with stagger (`delay={i * 0.08}`)

**`views/HomePage.tsx`:**
- No structural changes from current state. Order stays: Hero → Process → FeasibilityEngine → Benefits → Difference → CaseStudies → DataSources → Testimonials → CTABlock → FAQ. (Footer outside HomePage owns the Final CTA.)

**`sections/MetricsStrip.tsx`:**
- Deleted. It was created as the Approach B prototype and is unused under Approach A.

## Component behaviour

| Viewport | Hero behaviour | Strip behaviour |
|---|---|---|
| Mobile (<lg) | Single column stack; left content uses `pt-fl-section` to clear navbar; right card is `h-[50vh]` | Strip stacks below content, full width |
| Desktop (≥lg) | Two-column layout, content centred vertically within the area between navbar and strip (corrected via `lg:pt-20`) | Strip pinned to bottom of section, dark contrast band |

## Acceptance criteria

1. At desktop 1280×800 viewport, hero content (badge → headline → subtext → CTA) appears with roughly equal vertical space above and below it within the visible area between the navbar bottom and the strip top.
2. Metrics strip background is `bg-thistle-black` (rgb 47, 59, 54).
3. Strip text uses white tones (white, white/70, white/40) — readable on the dark bg.
4. The 83%/tagline line is gone from the strip.
5. Strip's three metrics are present: 98.5% / 20–35% / 86%, each with label and detail line.
6. Vertical dividers between metrics on `md:` breakpoints and up.
7. No console errors on the homepage.
8. The order of sections after Hero is unchanged: Process is the next section.
9. `sections/MetricsStrip.tsx` does not exist.

## Risks / things to watch

- **Navbar height drift.** `lg:pt-20` (80px) is hardcoded close to the navbar's actual height (~84px). If the navbar height changes meaningfully (e.g., logo size or padding tweaks), the hero centring will drift. Acceptable for now — flag if navbar height is later refactored.
- **Mixed bg in one `<section>`.** The single Hero section now contains both light and dark backgrounds. Future maintainers should know the dark band is intentional and not a leaked style.
- **Mobile spacing.** On mobile, content stacks; the strip sits below the right-column card. The existing `pt-fl-section` on the left column already handles navbar clearance. No changes needed but worth a manual mobile sanity check.
