# Process Redesign + Site-Wide Title Case + Inline CTA Upgrade

**Date:** 2026-04-18
**Status:** Pending user approval
**Files touched:** `sections/Process.tsx`, `components/ui/InlineCTA.tsx`, plus 14 files for Title Case heading edits across `sections/` and `views/`

---

## Problem

User audit of the Process section flagged three issues. Two of them (Title Case and CTA button visibility) generalise across the whole site:

1. **Process section boxes look "too small" with too little content.** Each card has 3 to 5 words of description. Boxes feel sparse and the row of 4 doesn't read as a confident product layout. Symmetry is also imperfect: card 2 wraps to two lines while others wrap to one, so heights vary slightly.
2. **Section headings are sentence case** ("From submission to clarity.") but should match the hero pattern of strict Title Case ("From Submission To Clarity.") site-wide.
3. **The "Start your feasibility" CTA below the Process steps is a small green text link** rendered by the `InlineCTA` component. It looks decorative, not actionable. The user wants it sized like the navbar Start Feasibility button so it reads as a real CTA. Same component is used in three other sections (Benefits, DataSources, FeasibilityEngine), so they all share the visibility problem.

## Goals

- Process boxes sit in a clean 2x2 grid at desktop, with richer descriptions that fill the cards. Heights symmetric.
- All section headings (homepage sections + page hero H1s + view-page H2s) read in strict Title Case, matching the hero.
- All four `InlineCTA` usages render as proper buttons matching the navbar Start Feasibility style: small size, green background, pure black text, semibold weight, ArrowUpRight icon.

## Non-Goals

- Don't touch eyebrow micro-labels above headings (e.g., "How It Works", "Testimonials", "FAQs"). They use their own case conventions.
- Don't touch data-driven headings: blog post titles, case study titles. They come from data and may already mix cases on purpose.
- Don't touch Cookie Policy or Privacy Policy headings. Already Title Case.
- Don't redesign the card chrome inside Process (icon, number, title, description block stays as is).
- Don't add new lucide icons.

## Approach

### Change 1: Process section redesign

**Layout:** Switch grid from `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` to `grid-cols-1 md:grid-cols-2`. Becomes a clean 2x2 at md and up. Single column on mobile.

**Connector line:** The current desktop-only horizontal connector between cards (visible at `lg:` breakpoint) does not map to a 2x2 grid. Remove it.

**Card chrome:** Unchanged. Icon plus step number on top, title, then description.

**Symmetric heights:** Already handled by `h-full flex flex-col` on each card. In a 2x2 grid the two cards in each row will stretch to the taller one.

**Step description rewrites** (Grade 7 UK English, no em dashes):

```ts
const steps = [
  {
    num: "01",
    title: "Submit Property",
    desc: "Share your property's address with a few basic details: size, floor count, and current use. Takes under two minutes.",
    icon: Upload,
  },
  {
    num: "02",
    title: "Automated Analysis",
    desc: "Our system checks planning history, site constraints, density data, and comparable schemes in your local authority.",
    icon: Cpu,
  },
  {
    num: "03",
    title: "Architect Review",
    desc: "A senior architect reviews the data, adds commercial insight, and refines the layout to maximise units and returns.",
    icon: UserCheck,
  },
  {
    num: "04",
    title: "Feasibility Delivered",
    desc: "You receive a full report with optimised layouts, financial viability, and a clear Go/No-Go recommendation, all within five days.",
    icon: FileCheck,
  }
];
```

These descriptions sit in the 25 to 35 word range, which gives each card visual weight and keeps the 2x2 grid balanced.

### Change 2: Title Case for all section headings

**Strict Title Case rule:** capitalise the first letter of every word. Matches the hero pattern ("From Building To Viable Conversion In 5 Days."). This style capitalises short words like "to", "in", "of", "for" too.

**Homepage section H2s (10 strings):**

| File | Before | After |
|---|---|---|
| sections/Process.tsx | "From submission to clarity." | "From Submission To Clarity." |
| sections/FeasibilityEngine.tsx | "Six data layers. One clear answer." (with `<span>` on second sentence) | "Six Data Layers. One Clear Answer." (preserve span wrapping the second sentence) |
| sections/Benefits.tsx | "Every deliverable links to a decision." | "Every Deliverable Links To A Decision." |
| sections/Difference.tsx | "Not another architecture practice." | "Not Another Architecture Practice." |
| sections/CaseStudies.tsx | "Proof, not inspiration." (with `<span>` on second part) | "Proof, Not Inspiration." (preserve span) |
| sections/DataSources.tsx | "Powered by 15+ authoritative data sources." | "Powered By 15+ Authoritative Data Sources." |
| sections/Testimonials.tsx | "Hear from our clients." | "Hear From Our Clients." |
| sections/CTABlock.tsx | "Get your feasibility in 5 days." | "Get Your Feasibility In 5 Days." |
| sections/FAQ.tsx | "Answering your questions." | "Answering Your Questions." |
| sections/Footer.tsx | "Make faster<br />decisions." | "Make Faster<br />Decisions." |
| sections/Team.tsx | "Real architects. Real experience." | "Real Architects. Real Experience." |

**Page hero H1s passed via `heading` prop (5 strings):**

| File | Before | After |
|---|---|---|
| views/HowItWorksPage.tsx | "From enquiry to complete clarity." | "From Enquiry To Complete Clarity." |
| views/AboutPage.tsx | "Commercial conversion specialists." | "Commercial Conversion Specialists." |
| views/CaseStudiesPage.tsx | "Proof, not inspiration." | "Proof, Not Inspiration." |
| views/FeasibilityPackagePage.tsx | "Complete clarity before you commit." | "Complete Clarity Before You Commit." |
| views/TermsPage.tsx | "Terms of Service." | "Terms Of Service." |
| views/BlogPage.tsx | "Insights for developers." | "Insights For Developers." |

**View-page H2s (11 strings):**

| File | Before | After |
|---|---|---|
| views/HowItWorksPage.tsx | "Four steps. Five days." | "Four Steps. Five Days." |
| views/HowItWorksPage.tsx | "Everything in one report." | "Everything In One Report." |
| views/HowItWorksPage.tsx | "Ready to start?" | "Ready To Start?" |
| views/FeasibilityPackagePage.tsx | "Six deliverables. One fixed fee." | "Six Deliverables. One Fixed Fee." |
| views/FeasibilityPackagePage.tsx | "Feasibility across every sector." | "Feasibility Across Every Sector." |
| views/FeasibilityPackagePage.tsx | "Four steps. Complete clarity." | "Four Steps. Complete Clarity." |
| views/FeasibilityPackagePage.tsx | "15+ data sources. Every time." | "15+ Data Sources. Every Time." |
| views/FeasibilityPackagePage.tsx | "Get your feasibility report." | "Get Your Feasibility Report." |
| views/AboutPage.tsx | "Architecture meets commercial logic." | "Architecture Meets Commercial Logic." |
| views/AboutPage.tsx | "Work with us." | "Work With Us." |
| views/CaseStudiesPage.tsx | "Have a building in mind?" | "Have A Building In Mind?" |
| views/CaseStudyDetailPage.tsx | "Start your own feasibility." | "Start Your Own Feasibility." |
| views/BlogPostPage.tsx | "Ready to assess a building?" | "Ready To Assess A Building?" |

### Change 3: InlineCTA renders as a proper button

Rewrite the internals of `components/ui/InlineCTA.tsx`. Keep the same component name, same `label` and `align` and `className` props, same `openModal` behaviour. Change the render from a plain text link to the project's standard `Button` component:

```tsx
"use client";

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from './Button';
import { useFeasibility } from '../feasibility/FeasibilityContext';

interface InlineCTAProps {
  label?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

/**
 * Inline CTA used between sections to keep conversion scent.
 * Renders as the standard green CTA button matching the navbar style.
 */
export const InlineCTA: React.FC<InlineCTAProps> = ({
  label = "Start your feasibility",
  align = "center",
  className = "",
}) => {
  const { openModal } = useFeasibility();
  const alignCls = align === "center" ? "justify-center" : align === "right" ? "justify-end" : "justify-start";

  return (
    <div className={`flex ${alignCls} ${className}`}>
      <Button
        size="sm"
        variant="primary"
        icon={<ArrowUpRight size={16} />}
        onClick={openModal}
        className="!bg-thistle-green !text-black !font-semibold !border-thistle-green hover:!bg-thistle-green/80"
      >
        {label}
      </Button>
    </div>
  );
};
```

This single component change automatically upgrades all four call sites (Process, Benefits, DataSources, FeasibilityEngine) without touching them individually. The CTA styling matches the new green CTA standard from the prior contrast pass (pure black text, semibold weight) and the navbar size convention (sm).

## Acceptance criteria

1. Process section renders as a 2x2 grid at desktop (md and up), single column on mobile. No horizontal connector line between cards.
2. Each Process card contains the new longer description text. All four cards in the same row stretch to equal height.
3. All 27 section/page headings listed in the tables above render in strict Title Case in the live preview. Hero remains as is (already correct).
4. The four InlineCTA call sites render a green pill button with arrow icon, matching the navbar Start Feasibility size. Clicking opens the feasibility modal.
5. `npm run build` passes. No console errors. No TypeScript errors.
6. No em dashes appear in any of the new copy I write (Process descriptions, spec, plan, commit).
7. New copy uses UK spellings: "optimise", "maximise", "centre", "behaviour" where applicable.

## Risks / things to watch

- **Process cards may look bottom-heavy** if descriptions wrap to many lines on narrow desktop sizes. The 2x2 grid mitigates this. Will spot-check at 1280 wide and at 1024.
- **Title Case can feel "shouty"** for long headings. The hero already uses strict Title Case successfully, so the visual style is established.
- **Strict Title Case applied to "Of"** ("Terms Of Service.") may read slightly old-fashioned. Acceptable per the hero precedent ("From Building To Viable Conversion In 5 Days." capitalises "To" and "In"). If it later reads odd, easy to drop "Of" alone with a follow-up.
- **InlineCTA visual change is subtle but ripples**. Four sections suddenly have a button instead of a text link. Should feel more confident, but will visually verify each section after change.
- **Em dash discipline.** Self-check before submitting any text: search for the U+2014 character and replace.
