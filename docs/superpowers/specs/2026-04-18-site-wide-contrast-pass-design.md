# Site-Wide Contrast Pass + Hero Typography Polish — Design Spec

**Date:** 2026-04-18
**Status:** Pending user approval
**Files touched:** `sections/Hero.tsx`, `sections/Process.tsx`, `sections/Benefits.tsx`, `sections/Difference.tsx`, `sections/CaseStudies.tsx`, `sections/FAQ.tsx`, `sections/Testimonials.tsx`, `sections/CTABlock.tsx`, `sections/Footer.tsx`, `views/HowItWorksPage.tsx`, `views/FeasibilityPackagePage.tsx`, `views/AboutPage.tsx`, `views/CaseStudiesPage.tsx`, `views/CaseStudyDetailPage.tsx`, `views/BlogPage.tsx`, `views/BlogPostPage.tsx`, `views/PrivacyPage.tsx`, `views/TermsPage.tsx`

---

## Problem

User audit triggered by the hero subtext + CTA looking dull/low-contrast. Once the WCAG contrast analysis was confirmed valuable, scope expanded to apply the same lens site-wide. Specific findings:

1. **Hero CTA fails WCAG AA Normal text contrast** (3.76:1 thistle-black on thistle-green; AA requires 4.5:1). Same Button styling pattern is used by **10 CTAs across the site**, so they all share the issue.
2. **Hero subtext** uses `text-thistle-black/60` + `font-light`, producing a thin grey paragraph that's hard to read.
3. **Hero title** is currently sentence case ("From building to viable conversion in 5 days.") — user wants Title Case.
4. **Metrics strip label** ("Planning success rate") is `text-white/70` — user wants it equal-weight with the value (full white) while keeping the detail line muted as deliberate tertiary hierarchy.
5. **Body paragraphs across the site** (descriptions, excerpts, FAQ answers, testimonial quotes, page subtexts) use `text-thistle-black/50` or `text-thistle-black/60` — at these opacities the blended colour fails AA Normal contrast against the cream `bg-thistle-white`.
6. **Footer text** (lead paragraph, email link, nav/legal eyebrows + links, copyright, social links) uses very low white opacities (`/20`, `/25`, `/40`) — fails AA Normal even on dark bg.

## Goals

- Every primary user-facing text element passes WCAG AA Normal (4.5:1 contrast) where the colour scheme reasonably allows.
- Preserve intentional visual hierarchy where it serves the design (eyebrows, in-mockup chrome, the third-tier metric detail line).
- Hero header swapped to Title Case.
- Specific design polish for the metrics strip label per user note.
- All 10 site-wide green CTAs fixed in lockstep so the brand stays consistent.

## Non-Goals

- Don't touch decorative in-mockup text inside `FeasibilityEngine` (Planning history mockup, Constraint layers, HMO saturation, Comparable schemes, Financial summary, Optimised layout) or the before/after stat labels in `CaseStudies` mockup cards. These are intentional product-UI density cues.
- Don't touch eyebrow micro-labels (`text-xs uppercase tracking-[0.2em] text-thistle-black/40 font-semibold`) used as section pre-titles. They're meant to be muted.
- Don't touch form field labels, helper text, or chrome inside `FeasibilityModal` steps — those are form ergonomics, not reading content. Defer to a separate pass if needed.
- Don't change Button component default variants — apply CTA contrast fix via the existing per-instance `className` overrides only.
- Don't introduce new brand colours.

## Approach

### Principle

"Primary content should pass WCAG AA Normal (4.5:1). Secondary chrome and decorative micro-text can stay subtler."

### Specific changes

#### 1. Hero (`sections/Hero.tsx`)

**Title (line 38):** Change to Title Case.
```tsx
// before
From building to viable conversion<span className="text-thistle-green"> in 5 days.</span>

// after
From Building To Viable Conversion<span className="text-thistle-green"> In 5 Days.</span>
```

**Subtext paragraphs (lines 43, 49):** Bump opacity to full.
```tsx
// before (both <p>):
className="text-fluid-base text-thistle-black/60 leading-relaxed font-light mb-fl-X max-w-md"

// after (both <p>):
className="text-fluid-base text-thistle-black leading-relaxed font-light mb-fl-X max-w-md"
```
Keeping `font-light` preserves the elegant typographic feel; the opacity bump alone restores contrast.

**Hero CTA (line 56):**
```tsx
// before
className="!bg-thistle-green !text-thistle-black !border-thistle-green hover:!bg-thistle-green/80"

// after
className="!bg-thistle-green !text-black !font-semibold !border-thistle-green hover:!bg-thistle-green/80"
```
Swaps `text-thistle-black` (#2F3B36) → pure `text-black` (#000) and adds `!font-semibold`. Math: contrast goes from 3.76:1 → ~6.84:1 (passes AA Normal); thicker stroke also improves perceived legibility.

#### 2. Metrics strip (`sections/Hero.tsx` ~line 158)

**Label:** `text-white/70` → `text-white` (full opacity). Detail (`text-white/40`) stays — explicitly preserved as the tertiary hierarchy tier the user called out as desirable.

#### 3. All site-wide green CTAs (10 files)

Apply the same className addition (`!text-black !font-semibold`) and swap `!text-thistle-black` → `!text-black` to:
- `sections/Hero.tsx:56` (covered above)
- `sections/CTABlock.tsx:31`
- `sections/Footer.tsx:52`
- `views/HowItWorksPage.tsx:71`
- `views/FeasibilityPackagePage.tsx:159`
- `views/FeasibilityPackagePage.tsx:365`
- `views/CaseStudiesPage.tsx:95`
- `views/AboutPage.tsx:107`
- `views/CaseStudyDetailPage.tsx:161`
- `views/BlogPostPage.tsx:143`

The exact transformation is identical for each: `!text-thistle-black` → `!text-black !font-semibold` (and the rest of the className stays).

#### 4. Body content text bumps (light bg sections)

Change body-paragraph opacities. Mechanical rule: where the element holds *primary readable content* (not eyebrows, not in-mockup chrome), bump `/50` and `/60` → `/80`.

| File:line | Element | Before | After |
|---|---|---|---|
| `sections/Process.tsx:74` | step description `<p>` | `text-thistle-black/50` | `text-thistle-black/80` |
| `sections/Benefits.tsx:63` | section subtext `<p>` | `text-thistle-black/60` | `text-thistle-black/80` |
| `sections/Benefits.tsx:85` | item description `<p>` | `text-thistle-black/50` | `text-thistle-black/80` |
| `sections/Difference.tsx:51` | "Traditional" cell text `<span>` | `text-thistle-black/50` | `text-thistle-black/80` |
| `sections/CaseStudies.tsx:100` | case study excerpt `<p>` | `text-thistle-black/50` | `text-thistle-black/80` |
| `sections/FAQ.tsx:60` | section intro `<p>` | `text-thistle-black/50` | `text-thistle-black/80` |
| `sections/FAQ.tsx:115` | answer body `<p>` | `text-thistle-black/50` | `text-thistle-black/80` |
| `sections/Testimonials.tsx:104` | quote body `<p>` | `text-thistle-black/70` | `text-thistle-black/80` |
| `sections/Testimonials.tsx:137` | section subtext `<p>` | `text-thistle-black/60` | `text-thistle-black/80` |
| `views/HowItWorksPage.tsx:116` | step description `<p>` | `text-thistle-black/50` | `text-thistle-black/80` |
| `views/HowItWorksPage.tsx:194` | section subtext `<p>` | `text-thistle-black/50` | `text-thistle-black/80` |
| `views/FeasibilityPackagePage.tsx:322` | body `<p>` | `text-thistle-black/60` | `text-thistle-black/80` |
| `views/FeasibilityPackagePage.tsx:337` | check item `<span>` | `text-thistle-black/70` | `text-thistle-black/80` |
| `views/BlogPage.tsx:45` | featured excerpt `<p>` | `text-thistle-black/50` | `text-thistle-black/80` |
| `views/BlogPage.tsx:85` | post excerpt `<p>` | `text-thistle-black/50` | `text-thistle-black/80` |
| `views/TermsPage.tsx:47` | section body `<p>` | `text-thistle-black/50` | `text-thistle-black/80` |
| `views/PrivacyPage.tsx:47` | section body `<p>` | `text-thistle-black/50` | `text-thistle-black/80` |

#### 5. Body content text bumps (dark bg sections)

| File:line | Element | Before | After |
|---|---|---|---|
| `sections/CTABlock.tsx:21` | CTA section subtext `<p>` | `text-white/50` | `text-white/80` |
| `views/CaseStudiesPage.tsx:90` | hero subtext `<p>` | `text-white/50` | `text-white/80` |
| `views/FeasibilityPackagePage.tsx:242` | hero subtext `<p>` | `text-white/60` | `text-white/80` |
| `views/FeasibilityPackagePage.tsx:264` | included list item `<span>` | `text-white/70` | `text-white/80` |
| `views/FeasibilityPackagePage.tsx:355` | section subtext `<p>` | `text-white/50` | `text-white/80` |
| `views/AboutPage.tsx:102` | section subtext `<p>` | `text-white/50` | `text-white/80` |
| `views/CaseStudyDetailPage.tsx:48` | back link `<a>` | `text-white/50` | `text-white/80` (also bump hover from `text-white/80` → `text-white`) |
| `views/CaseStudyDetailPage.tsx:57` | location `<p>` | `text-white/50` | `text-white/80` |

#### 6. Footer text (`sections/Footer.tsx`) — full pass per user direction

| Line | Element | Before | After |
|---|---|---|---|
| 42 | Lead paragraph `<p>` ("Start with a free 15-min...") | `text-white/40` | `text-white/80` |
| 70 | Brand column subtext `<p>` ("Data-driven feasibility...") | `text-white/30` | `text-white/80` |
| 72 | Email link `<a>` | `text-white/50` | `text-white/80` |
| 79 | "Navigate" eyebrow `<p>` | `text-white/20` | `text-white/60` |
| 82 | Nav links `<Link>` | `text-white/40` | `text-white/80` |
| 91 | "Legal" eyebrow `<p>` | `text-white/20` | `text-white/60` |
| 94 | Legal links `<Link>` | `text-white/40` | `text-white/80` |
| 109 | Copyright `<span>` | `text-white/25` | `text-white/60` |
| 112 | LinkedIn link `<a>` | `text-white/25 hover:text-white/50` | `text-white/70 hover:text-white` |
| 113 | Instagram link `<a>` | `text-white/25 hover:text-white/50` | `text-white/70 hover:text-white` |

Hover states for nav/legal links (`hover:text-white`) stay as-is — already render at full white on hover. Social links explicitly updated above because their hover (`/50`) would regress below the new base (`/70`).

## Acceptance criteria

1. Hero title reads "From Building To Viable Conversion In 5 Days." with title-case capitalisation. The `<span className="text-thistle-green">` part still wraps "In 5 Days." (note capital I).
2. Hero subtext paragraphs render at full thistle-black opacity (no `/60` opacity blend).
3. Hero CTA renders pure black (#000) text in semibold weight on thistle-green bg. WCAG contrast ratio ≥ 6:1.
4. Metrics strip "Planning success rate" / "Improvement in scheme efficiency" / "Faster than traditional routes" labels render at full white. Detail lines remain at white/40.
5. All 10 green CTAs across the site render with `text-black font-semibold` (visually consistent).
6. All body paragraphs listed in §4–§5 above render at the new opacity. Spot check: Process step descriptions, FAQ answers, Testimonials quotes are all noticeably more readable.
7. Footer renders with all primary text (lead, email, nav, legal links) at /80 opacity; eyebrows ("Navigate", "Legal") at /60; copyright + social at /60–/70.
8. No console errors. `npm run build` passes (TypeScript + lint).
9. Eyebrows on section titles (e.g., "FAQs", "Testimonials" labels at `text-thistle-black/40 uppercase`) remain at /40 — explicitly NOT changed.
10. In-mockup text in `FeasibilityEngine` and `CaseStudies` before/after cards remains unchanged.

## Risks / things to watch

- **Visual weight shift on body text.** Bumping /50 and /60 to /80 makes paragraphs feel heavier. If the design starts to feel "shouty," partial dial-back to /70 may be appropriate, but /80 is the minimum for AA Normal so /70 should only be used if paired with weight bumps.
- **Footer eyebrows at /60 may now visually compete with body text at /80.** Acceptable — they're still smaller (`text-[10px]`) and uppercase-tracked, so the hierarchy reads via type treatment, not opacity.
- **Pure black text on thistle-green** may feel slightly harsher than the current muted thistle-black. This is the trade-off for WCAG-passing contrast. If user prefers a softer dark, fallback option: `!text-thistle-black !font-bold` (still fails AA mathematically but visually crisper than current).
- **Many files touched.** 18 files. The mechanical changes (find-replace style) reduce risk per file but increase the surface for accidental selector mismatches. Verification via `npm run build` + spot-check screenshots will catch issues.

## Out of scope (deferred for future spec if you want)

- FeasibilityModal form-step labels and helpers
- Decorative micro-text in product-mockup cards (FeasibilityEngine, CaseStudies cards)
- Eyebrow micro-labels (intentional muted hierarchy preserved)
- Updating the Button component's variant defaults (per-instance overrides used instead to avoid cascading regressions)
