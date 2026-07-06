# Thistle Architecture — Design System

The single source of truth for tokens, scale, and components. Extracted from the
shipped homepage code. When code and this document disagree, fix one of them — they
must not drift.

## Stack

- Next.js 16 App Router, React 18.
- Tailwind CSS v3.4, configured in `tailwind.config.ts` (NOT v4 `@theme`).
- Design tokens are CSS custom properties in `src/app/globals.css`, surfaced to
  Tailwind as named utilities in `tailwind.config.ts` under `theme.extend`.
- Motion: `framer-motion` v11.
- Font: Geist Sans, loaded in `src/app/layout.tsx` via `GeistSans.className`,
  mapped to the `font-sans` family via `var(--font-geist-sans)` in Tailwind config.

## Colour tokens

Defined in `tailwind.config.ts` as the `thistle` colour group. Use these names only.
Never use Tailwind default palette tokens (`text-red-500`, `bg-slate-100`).

| Token | Hex | Use |
|---|---|---|
| `thistle-black` | #2F3B36 | Body text, dark contrast sections |
| `thistle-white` | #EDEDE9 | Page background, light section surfaces |
| `thistle-green` | #8F9952 | Primary accent, CTAs, eyebrows, active states |
| `thistle-pink` | #DAAEBB | Secondary accent, `::selection`, occasional highlight |
| `thistle-gray` | #71776E | Tertiary text, muted labels |

Opacity steps (e.g. `text-thistle-black/80`, `border-thistle-black/[0.06]`) carry the
tonal range. Body copy on light backgrounds is `/80`; eyebrows and muted labels `/40`.

## Type scale

Fluid `clamp()` sizes, defined as CSS variables in `globals.css`, surfaced as
`text-fluid-*` utilities. Sized for a 320px to 1440px range.

| Utility | Variable | Role |
|---|---|---|
| `text-fluid-display` | `--font-display` | Oversized display only |
| `text-fluid-h1` | `--font-h1` | Page H1 |
| `text-fluid-h2` | `--font-h2` | Section H2 |
| `text-fluid-h3` | `--font-h3` | Sub-section / row title |
| `text-fluid-h4` | `--font-h4` | Card group title |
| `text-fluid-h5` | `--font-h5` | Card title |
| `text-fluid-h6` | `--font-h6` | Small heading (1rem fixed) |
| `text-fluid-lg` | `--font-text-lg` | Lead paragraph |
| `text-fluid-base` | `--font-text-base` | Body copy |
| `text-fluid-sm` | `--font-text-sm` | Small print (0.875rem fixed) |

Headings use `font-medium`, `tracking-tight` or `tracking-tighter`, and
`leading-tight`. Body copy uses `leading-relaxed`.

## Spacing scale

Fluid `clamp()` spacing, defined in `globals.css`, surfaced as `fl-*` utilities.

| Utility | Variable | Typical use |
|---|---|---|
| `fl-section-lg` | `--space-section-lg` | Largest section vertical rhythm |
| `fl-section` | `--space-section` | Default section vertical padding (`py-fl-section`) |
| `fl-section-sm` | `--space-section-sm` | Tighter section / inter-block gap |
| `fl-8` down to `fl-1` | `--space-8` to `--space-1` | Component-level gaps and padding |
| `fl-margin` | `--site-margin` | Site-wide horizontal page margin (`px-fl-margin`) |

Section pattern: every top-level section uses `py-fl-section px-fl-margin`, with an
inner `max-w-[1360px] mx-auto` wrapper.

## Motion

- Library: `framer-motion` v11.
- Primitive: `components/animations/Reveal.tsx` (`Reveal` wrapper, `useInView` +
  `useAnimation` fade-and-rise from `opacity: 0, y: 30`, staggered with a `delay` prop).
- Easing for all transitions: `[0.21, 0.47, 0.32, 0.98]`, duration 0.6s.
- Section graphics use `initial / whileInView` opacity-and-y transitions with the
  same easing `[0.21, 0.47, 0.32, 0.98]`.
- Hover: cards lift with `whileHover={{ y: -4 }}` (or `-3` / `-6`), 0.25 to 0.4s.

## Component inventory

The canonical set. New pages compose from these; do not invent parallel patterns.

| Component | Path | Purpose |
|---|---|---|
| `Navbar` | `components/ui/Navbar.tsx` | Fixed dark top nav, 6 items with dropdowns, mobile drawer |
| `Footer` | `sections/Footer.tsx` | Photo-backed CTA band ("Make Faster Decisions."), link columns, contact details |
| `PageHero` | `components/ui/PageHero.tsx` | Shared inner-page hero (label, heading, description) |
| `Button` | `components/ui/Button.tsx` | Primary / variant button, renders as motion.button |
| `InlineCTA` | `components/ui/InlineCTA.tsx` | Mid-page CTA; tier 1 by default, `href=""` opens the form |
| `Reveal` | `components/animations/Reveal.tsx` | Scroll-reveal animation wrapper |
| `FeasibilityModal` + `useFeasibility` | `components/feasibility/` | Full-page multi-step form (4 steps, progress bar, submits to `/api/leads`) |
| `StickyCTA` | `sections/feasibility-package/StickyCTA.tsx` | Mobile-only sticky bar, feasibility page only |
| `SampleReportGate` | `sections/feasibility-package/SampleReportGate.tsx` | Email-gated sample report download |
| `ToolGate` | `components/ui/ToolGate.tsx` | Email soft-gate for tool detail; unlock persists in localStorage |
| `HowItWorks` | `sections/feasibility-package/HowItWorks.tsx` | Five-step timeline, `id="how-it-works"` (redirect target) |
| `ExitIntentPopup` | `components/ExitIntentPopup.tsx` | Rendered on `/feasibility-package` only (gated in PageShell) |

## CTA canon (two-tier funnel)

- **Tier 1, site-wide**: label "Book Your Feasibility", navigates to
  `/feasibility-package`. Every CTA outside the package page is tier 1.
- **Tier 2, package page only**: label "Start Feasibility", opens the
  full-page form via `useFeasibility().openModal`.
- Reassurance microcopy under primary CTAs: "No obligation. Response within
  one working day."
- Leads POST to `/api/leads` with a `source` field (`feasibility-form`,
  `sample-report`, `class-ma-checker`, `gdv-calculator`) and forward to the
  CRM via the `LEAD_WEBHOOK_URL` env var (server logs when unset).

## Imagery system

Priority order when choosing imagery for any section:

1. **Real drawings**, `public/images/projects/` (converted from client sketch
   PDFs at 150dpi). Render `object-contain` inside a fixed-aspect frame:
   `rounded-2xl border border-thistle-black/[0.06] bg-white` (or
   `bg-thistle-white/60`), padding 2 to 3.
2. **Real people**, `public/images/team/` (ed, kaan, jan, nick, onaiza).
   Team cards crop `aspect-[4/5] object-cover`.
3. **Generated photography** (Higgsfield), `public/images/generated/`. Muted
   sage/off-white palette, overcast UK light, no readable text. Render
   `object-cover`.
4. **Licence-free stock**, `public/images/site/` (hero drone shot, CTA band).
   Every stock or generated file is recorded in `public/images/LICENCES.md`.
5. **Video**, `public/videos/`. The homepage hero plays a muted looping
   image-to-video generated from the hero still (poster = the still), so the
   fallback is seamless. Video renders only at `sm:` and up and only when
   `motion-safe`; keep hero video files under ~2 MB (1600px, CRF 28,
   faststart, no audio).

Full-bleed image sections put the image in a `relative` wrapper with
`fill + object-cover` and a `bg-thistle-black/55` to `/75` overlay; text on
top is white. No Unsplash hotlinks anywhere.

## Blog

Categories (fixed union in `data/blogData.ts`): Planning, Permitted
Development, Feasibility, HMO, Investment, News. One post per file in
`data/blog/`. Content blocks: `## ` h2, `### ` h3, `- ` bullets, plain
paragraphs, inline `[text](/path)` links. Every post ends with an FAQ
section. Post pages emit Article JSON-LD.

## Copy rules

- UK English everywhere: body, headings, eyebrows, captions, button labels, alt
  text, meta tags. (organise, behaviour, centre, programme.)
- No em dashes or en dashes anywhere. Hyphen-minus only. Number ranges use "to"
  (5 to 7 years, not 5 to 7 with a dash).
- Reading level: Grade 7 UK English. Short paragraphs, plain words.
- No SaaS hype verbs ("supercharge", "unlock", "unleash").
- CTA labels follow the CTA canon above. The Contact page form is the one
  exception to the funnel pattern.
- No invented facts: every metric, testimonial, case-study figure, and team
  credential must trace to a client document or be listed in
  `docs/case-study-confirmations.md`.

## Quality bar

Every page is verified pixel-perfect responsive at mobile-375, tablet-768,
laptop-1280, desktop-1440, desktop-1920 using `scripts/responsive-sweep.mjs`, with
`document.body.scrollWidth === document.body.clientWidth` at every viewport.
