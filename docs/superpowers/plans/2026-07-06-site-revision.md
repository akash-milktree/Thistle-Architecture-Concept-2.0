# Thistle Site Revision Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the July 2026 site revision per `docs/superpowers/specs/2026-07-06-site-revision-design.md`: de-sales the site, rebuild the feasibility package page as a CRO landing page, add real imagery everywhere, rebuild blog/about/case studies, merge conversions, and finish with a cohesion pass.

**Architecture:** Next.js 16 App Router marketing site. Views live in `views/`, homepage sections in `sections/`, shared UI in `components/ui/`, data in `data/`. All CTAs outside `/feasibility-package` become links to that page (tier 1); only the package page opens the full-page form (tier 2). Real assets come from `03 new website/` (note: the folder on disk is lowercase `03 new website`).

**Tech Stack:** Next.js 16, React 18, Tailwind 3.4, framer-motion 11, Higgsfield MCP for generated imagery, `sips`/`pdftoppm` for PDF conversion.

**Verification model:** This repo has no unit test suite. Every phase ends with `npm run build` (must pass with zero type errors) and a visual check on the dev server. The final phase runs `scripts/responsive-sweep.mjs` at all five viewports. TDD steps are therefore build-verify steps.

**Commits:** Per Akash's standing preference, DO NOT commit until he approves. Each phase ends with a checkpoint step that stages nothing and instead records completion. Commit candidates are marked so approval can turn them into commits quickly.

---

## Phase 0: Asset pipeline

### Task 0.1: Create image directories and convert team photos

**Files:**
- Create: `public/images/team/*` (processed photos)
- Create: `public/images/LICENCES.md`

- [ ] **Step 1: Make directories**

```bash
cd "/Users/ak_mac_mini/Downloads/Projects/thistle live"
mkdir -p public/images/team public/images/projects public/images/generated public/images/site
```

- [ ] **Step 2: Convert and resize team photos (max 1200px, JPEG quality 85)**

```bash
S="03 new website/Team Photos"
sips -Z 1200 -s format jpeg -s formatOptions 85 "$S/Ed/P2300733.jpg" --out public/images/team/ed.jpg
sips -Z 1200 -s format jpeg -s formatOptions 85 "$S/Kaan/WhatsApp Image 2024-06-10 at 15.18.50_40dea8e4.jpg" --out public/images/team/kaan.jpg
sips -Z 1200 -s format jpeg -s formatOptions 85 "$S/Jan/MicrosoftTeams-image (18).png" --out public/images/team/jan.jpg
sips -Z 1200 -s format jpeg -s formatOptions 85 "$S/Nick/Nick.png" --out public/images/team/nick.jpg
sips -Z 1200 -s format jpeg -s formatOptions 85 "$S/Onaiza/IMG_5157-min.jpg" --out public/images/team/onaiza.jpg
```

Check both Jan photos (`(18)` and `(19)`) with the Read tool first and keep the better headshot.

- [ ] **Step 3: Verify output**

```bash
ls -la public/images/team/ && sips -g pixelWidth -g pixelHeight public/images/team/*.jpg
```
Expected: five JPEGs, longest edge 1200px or less.

### Task 0.2: Convert project sketch PDFs to web images

**Files:**
- Create: `public/images/projects/*.png`

- [ ] **Step 1: Pick converter**

```bash
which pdftoppm || echo "use sips"
```
If pdftoppm exists use it (better quality, page selection). Otherwise `sips` converts page 1 only, which is fine for sketches.

- [ ] **Step 2: Convert the case-study and deliverable sketches**

With pdftoppm (preferred), for each source below run:

```bash
F="03 new website/Feasibility Examples"
pdftoppm -png -r 150 -f 1 -l 1 "$F/St Johns - Large HMO/St Johns - SK001 (1).pdf" public/images/projects/st-johns-sk001
pdftoppm -png -r 150 -f 1 -l 1 "$F/St Johns - Large HMO/Client Information/PL01 Exisiting Floor Plans.pdf" public/images/projects/st-johns-existing
pdftoppm -png -r 150 -f 1 -l 1 "$F/St Johns - Large HMO/Client Information/PL02 Proposed Floor Plans.pdf" public/images/projects/st-johns-proposed
pdftoppm -png -r 150 -f 1 -l 1 "$F/Harpenden Police Station - Police Station to Flats/Harpenden Police Station – Sketches (Flats).pdf" public/images/projects/harpenden-sketch
pdftoppm -png -r 150 -f 1 -l 1 "$F/Greyfriars, Kings Lyn - Co Living - HMO and Office - Mixed Use/Option 2 - Residential with Extention.pdf" public/images/projects/greyfriars-option2
pdftoppm -png -r 150 -f 1 -l 1 "$F/Greyfriars, Kings Lyn - Co Living - HMO and Office - Mixed Use/Option 4 - HMO with Extention.pdf" public/images/projects/greyfriars-option4
pdftoppm -png -r 150 -f 1 -l 1 "$F/Axis House - Office to High-end Houses/Axis House - Sketch Proposal 3 - Elevation.pdf" public/images/projects/axis-house-elevation
pdftoppm -png -r 150 -f 1 -l 1 "$F/Axis House - Office to High-end Houses/Axis House - Sketch Proposal 2 - Plans.pdf" public/images/projects/axis-house-plans
pdftoppm -png -r 150 -f 1 -l 1 "$F/Southgate Winchester - Listed Building to - HMO-/HD0070 - Proposed Sketches.pdf" public/images/projects/southgate-sketch
pdftoppm -png -r 150 -f 1 -l 1 "$F/Beechmount Manchester - Feasibilitty of existing - HMO -/Beech Mount - Draft SK001.Rev A [93].pdf" public/images/projects/beechmount-sk001
pdftoppm -png -r 150 -f 1 -l 1 "$F/Highbury Buildings - Co-living Space Design Portsmouth - Mixed Commercial, HMO & Shop/SK003 - Highbury 10 Bed HMO Layout [14].pdf" public/images/projects/highbury-sk003
pdftoppm -png -r 150 -f 1 -l 1 "$F/Stanmore Winchester - House Extension - Resi -/SK - 001 - Option A.pdf" public/images/projects/stanmore-option-a
```

- [ ] **Step 3: Convert sample report pages (St Johns feasibility doc, pages 1 to 3)**

```bash
pdftoppm -png -r 150 -f 1 -l 3 "$F/St Johns - Large HMO/Documents/TH00177 - Feasibility Overview - 4 St Johns.pdf" public/images/projects/sample-report
```

- [ ] **Step 4: Visually inspect every PNG with the Read tool.** Discard/replace any that render as blank or unreadable. Record which images exist for later tasks.

- [ ] **Step 5: Copy the sample PDF for the gated download**

```bash
cp "$F/St Johns - Large HMO/Documents/TH00177 - Feasibility Overview - 4 St Johns.pdf" "public/sample doc/thistle-sample-feasibility.pdf"
```
Note in `docs/case-study-confirmations.md` (Task 5.3) that Ed must approve publishing this document, or supply an anonymised version.

### Task 0.3: Hero drone shot and Higgsfield imagery

**Files:**
- Create: `public/images/site/hero-drone.jpg`, `public/images/site/cta-band.jpg`, `public/images/generated/*.jpg`
- Create: `public/images/LICENCES.md`

- [ ] **Step 1: Source the licence-free drone shot.** Search Unsplash for a UK residential aerial (terraced streets or suburban rooftops, muted tones, space for centred white text). Download full-res with curl into `public/images/site/hero-drone.jpg`. Also pick a second aerial for the footer CTA band as `public/images/site/cta-band.jpg`.

- [ ] **Step 2: Record licences**

```markdown
# public/images/LICENCES.md
| File | Source | Author | Licence | URL |
|---|---|---|---|---|
| site/hero-drone.jpg | Unsplash | <author> | Unsplash License | <url> |
| site/cta-band.jpg | Unsplash | <author> | Unsplash License | <url> |
```
(Fill in real values at download time; this table must not ship with angle-bracket placeholders.)

- [ ] **Step 3: Generate Higgsfield imagery.** Use the Higgsfield MCP `generate_image` tool. Art direction for every prompt: photorealistic, muted sage green and off-white palette matching #8F9952 and #EDEDE9, soft overcast UK light, no text, no people's faces in close-up. Generate, then download each result into `public/images/generated/`:

1. `package-hero.jpg`: aerial dusk photograph of a UK market-town high street, brick commercial buildings with flats above, calm and premium.
2. `desk-plans.jpg`: architect's desk from above with printed floor plans, scale ruler and pencil, sage green folder.
3. `site-visit.jpg`: two people in hi-vis reviewing a document outside a vacant UK office building, shot from behind.
4. `office-exterior.jpg`: empty 1980s UK office building exterior with To Let board, overcast.
5. `terrace-scaffold.jpg`: UK terraced house mid-renovation with neat scaffolding.
6. `report-hands.jpg`: hands holding a printed bound feasibility report, shallow depth of field.

- [ ] **Step 4: Review each generated image with the Read tool.** Regenerate any with artefacts, wrong palette, or embedded text. Add rows to LICENCES.md marked "Generated (Higgsfield), owned".

- [ ] **Step 5: Checkpoint.** All assets exist and are inspected. (Commit candidate: "chore(assets): real project imagery, team photos, generated art".)

---

## Phase 1: CTA architecture plumbing

### Task 1.1: Lead submission API route

**Files:**
- Create: `src/app/api/leads/route.ts`

- [ ] **Step 1: Write the route**

```ts
import { NextResponse } from 'next/server';

// Forwards lead payloads to the CRM webhook when configured.
// LEAD_WEBHOOK_URL is the Milktree CRM inbound webhook (Akash to supply).
export async function POST(request: Request) {
  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid json' }, { status: 400 });
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        return NextResponse.json({ ok: false }, { status: 502 });
      }
    } catch {
      return NextResponse.json({ ok: false }, { status: 502 });
    }
  } else {
    console.log('[lead]', JSON.stringify(data));
  }
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 2: Verify**

```bash
npm run build
```
Expected: builds clean. Then on dev server:
```bash
curl -s -X POST http://localhost:3000/api/leads -H 'Content-Type: application/json' -d '{"source":"test"}'
```
Expected: `{"ok":true}`.

### Task 1.2: InlineCTA link mode and tier-1 default

**Files:**
- Modify: `components/ui/InlineCTA.tsx`

- [ ] **Step 1: Add `href` prop; when set, navigate instead of opening the form. New default label is the tier-1 copy.**

```tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { Button } from './Button';
import { useFeasibility } from '../feasibility/FeasibilityContext';

interface InlineCTAProps {
  label?: string;
  href?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

/**
 * Inline CTA used between sections to keep conversion scent.
 * Tier 1 (default): links to the feasibility package page.
 * Tier 2 (package page): omit href to open the full-page form.
 */
export const InlineCTA: React.FC<InlineCTAProps> = ({
  label = "Book Your Feasibility",
  href = "/feasibility-package",
  align = "center",
  className = "",
}) => {
  const router = useRouter();
  const { openModal } = useFeasibility();
  const alignCls = align === "center" ? "justify-center" : align === "right" ? "justify-end" : "justify-start";

  return (
    <div className={`flex ${alignCls} ${className}`}>
      <Button
        size="md"
        variant="primary"
        icon={<ArrowUpRight size={16} />}
        onClick={href ? () => router.push(href) : openModal}
      >
        {label}
      </Button>
    </div>
  );
};
```

Note: `href=""` (empty string) is the explicit opt-out that opens the form. On the package page pass `href=""` (or a dedicated `mode="form"` if cleaner at implementation, but keep one mechanism).

- [ ] **Step 2: Sweep every call site.** Find them:

```bash
grep -rn "InlineCTA" sections/ views/ --include="*.tsx" | grep -v "components/ui"
```

For each call site outside the package page: set `label="Book Your Feasibility"` (or rely on default) and remove any custom modal-flavoured label ("Start your feasibility", "Book your feasibility today"). Package-page call sites are handled in Phase 3.

- [ ] **Step 3: Navbar CTA.** In `components/ui/Navbar.tsx`, change the CTA button (desktop and mobile drawer) from `openModal` to a `Link` to `/feasibility-package`, label "Book Your Feasibility".

- [ ] **Step 4: Remaining tier-1 buttons.** Sweep other modal openers outside the package page:

```bash
grep -rln "openModal" sections/ views/ components/ --include="*.tsx"
```
Convert every non-package-page usage (FAQ sidebar button, CTABlock, Footer band button, PageHero CTAs on case studies/conversions/tools/blog views, ToolShell if present) to a link to `/feasibility-package` labelled "Book Your Feasibility". `views/FeasibilityPackagePage.tsx` and the form components keep `openModal`.

- [ ] **Step 5: Reassurance microcopy.** Under the Navbar-independent primary CTAs (hero, footer band, package hero), add: `No obligation. Response within one working day.` as small muted text. Add "confirm one-working-day claim" to the Ed confirmations doc (Task 5.3).

- [ ] **Step 6: Verify**

```bash
npm run build && grep -rn "Start Feasibility" sections/ views/ components/ --include="*.tsx"
```
Expected: build passes; "Start Feasibility" remains only in package-page components and the form itself.

### Task 1.3: Exit-intent popup scoping

**Files:**
- Modify: `layouts/PageShell.tsx:25`

- [ ] **Step 1: Gate by pathname**

```tsx
{pathname === '/feasibility-package' && <ExitIntentPopup />}
```

- [ ] **Step 2: Verify on dev server: popup logic absent on `/`, present on `/feasibility-package`.**

- [ ] **Step 3: Checkpoint.** (Commit candidate: "feat(cta): two-tier funnel plumbing, lead API, exit-intent scoping".)

---

## Phase 2: Homepage

### Task 2.1: Hero rewrite

**Files:**
- Modify: `sections/Hero.tsx` (full rewrite)
- Modify: `views/HomePage.tsx`

- [ ] **Step 1: Rewrite Hero.** Centre-aligned over the drone shot, report card and Kaan block deleted, metrics strip kept. Structure:

```tsx
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../components/ui/Button';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../components/animations/Reveal';

const metrics = [
  { value: "98.5%", label: "Planning success rate", detail: "Across all submitted schemes" },
  { value: "5 days", label: "Guaranteed turn around", detail: "From submission to clear recommendation" },
  { value: "86%", label: "Faster than traditional routes", detail: "5 days vs 2 to 6 week industry average" },
];

export const Hero: React.FC = () => (
  <section className="relative flex flex-col">
    <div className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      <Image
        src="/images/site/hero-drone.jpg"
        alt="Aerial view of homes across a UK town"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-thistle-black/60" />
      <div className="relative z-10 max-w-3xl mx-auto px-fl-margin text-center pt-28 pb-fl-section">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-fl-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-fl-6">
            <span className="inline-flex rounded-full h-2 w-2 bg-thistle-green" />
            <span className="text-sm font-medium text-white tracking-tight">Feasibility in 5 days, nationwide</span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="text-fluid-h1 font-medium tracking-tighter leading-[1.05] text-white mb-fl-5">
            Nationwide Feasibility For<br />Building Conversions.
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-fluid-base text-white/85 leading-relaxed font-light mb-fl-7 max-w-xl mx-auto">
            Thistle helps developers test what an existing building can become. Data analysis and developer-led architecture, with a clear Go or No-Go recommendation in five days.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-fl-4">
            <Link href="/feasibility-package">
              <Button size="lg" variant="primary" icon={<ArrowUpRight size={18} />}>
                Book Your Feasibility
              </Button>
            </Link>
            <a href="#process" className="text-sm text-white/80 hover:text-white transition-colors font-medium tracking-tight">
              See how it works &rarr;
            </a>
          </div>
          <p className="text-xs text-white/60 mt-fl-4">No obligation. Response within one working day.</p>
        </Reveal>
      </div>
    </div>

    {/* Metrics strip unchanged in content */}
    <div className="bg-thistle-black text-white">
      {/* keep existing metrics grid exactly as today */}
    </div>
  </section>
);
```

Keep the existing metrics-strip JSX verbatim from the current file (lines 170 to 193). If `<Link><Button/></Link>` nests a button in an anchor, use the router-push pattern from Task 1.2 instead.

- [ ] **Step 2: Add `id="process"` to the Process section wrapper in `sections/Process.tsx` so the hero anchor works.**

- [ ] **Step 3: Verify on dev server at 375px and 1440px: white text passes contrast on the overlay, no layout shift, anchor scrolls.**

### Task 2.2: Section moves and tone pass

**Files:**
- Modify: `views/HomePage.tsx`, `sections/Process.tsx`, `sections/ArchitectReview.tsx`, `sections/Benefits.tsx`, `sections/Footer.tsx`

- [ ] **Step 1: Remove FeasibilityEngine from the homepage.** In `views/HomePage.tsx` delete the import and `<FeasibilityEngine />` (it moves to the package page in Phase 3).

- [ ] **Step 2: Process retitle.** In `sections/Process.tsx`: eyebrow "Our Process", H2 "Our Five-Step Feasibility Process." Keep the five steps and layout.

- [ ] **Step 3: ArchitectReview softened plus human element.** Keep eyebrow "Next Stage". Add a photo block using `/images/team/kaan.jpg` with name "Kaan", role "Design Lead", credential "BArch. Leads every feasibility from sketch scheme to sign-off." Copy pass: factual statements only, no urgency phrasing. CTA already tier-1 from Task 1.2.

- [ ] **Step 4: Benefits to static cards.** H2 becomes "Why Developers Use Thistle." Replace the flip interaction: each card shows icon, title, and full body copy statically. Delete the flip state/handlers.

- [ ] **Step 5: Footer CTA band imagery.** In `sections/Footer.tsx`, behind the "Make Faster Decisions." band add `/images/site/cta-band.jpg` as a fill image with `bg-thistle-black/70` overlay; text stays white; keep heading and description copy.

- [ ] **Step 6: Difference heading check.** Read the section copy once; keep the table. If the heading reads salesy in context, change to "Thistle Compared To The Traditional Route." Otherwise leave.

- [ ] **Step 7: Verify**

```bash
npm run build
```
Then dev-server pass of the full homepage top to bottom at 375px and 1440px.

- [ ] **Step 8: Checkpoint.** (Commit candidate: "feat(home): business-tone homepage with drone hero and real imagery".)

---

## Phase 3: Feasibility package page and full-page form

### Task 3.1: Full-page form

**Files:**
- Modify: `components/feasibility/FeasibilityModal.tsx`
- Modify: `components/feasibility/steps/Confirmation.tsx`
- Modify: `components/feasibility/FeasibilityContext.tsx` (submit state only)

- [ ] **Step 1: Restyle the container as a full-screen takeover.** In `FeasibilityModal.tsx` replace the centred panel with a full-viewport surface:

```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.25 }}
  className="fixed inset-0 z-[60] bg-thistle-white overflow-y-auto"
>
  <div className="min-h-full flex flex-col max-w-2xl mx-auto px-fl-margin py-fl-7">
    {/* header row: Thistle wordmark left, close button right */}
    {/* progress bar: h-1 track, thistle-green fill, width = ((currentStep+1)/steps.length)*100% */}
    {/* step label + "Takes about 2 minutes" on step 0 */}
    {/* step content, then nav buttons pinned at the bottom of the column */}
  </div>
</motion.div>
```

Keep Escape-to-close, body scroll lock, and the step transition animations. Keep the existing step order (Property, Project, Contact, Confirm): address is already the first field of step 1. Verify that in `steps/PropertyDetails.tsx` the address input is first; move it to first if not.

- [ ] **Step 2: Real submission.** Add `status: 'idle' | 'submitting' | 'success' | 'error'` state (local to the modal or in context, implementer's choice, but keep the `openModal` API unchanged). In `Confirmation.tsx` replace the passive summary-close with a review list plus a Submit button:

```tsx
const submit = async () => {
  setStatus('submitting');
  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source: 'feasibility-form', ...formData }),
    });
    if (!res.ok) throw new Error('failed');
    setStatus('success');
  } catch {
    setStatus('error'); // keep formData intact so the user can retry
  }
};
```

Success state replaces the step content: "Thanks, we have your details. We will come back to you within one working day." plus a close button. Error state shows "Something went wrong. Please try again." above a Retry button; inputs are preserved.

- [ ] **Step 3: Per-step validation.** Continue is disabled until required fields of the current step are non-empty (step 1: address; step 3: fullName, valid email). Simple checks, no library.

- [ ] **Step 4: Verify.** Dev server: complete the form end to end, confirm `[lead]` logs on the server (no LEAD_WEBHOOK_URL locally), success state renders, Escape and close work, mobile 375px layout holds.

### Task 3.2: Package page rebuild

**Files:**
- Modify: `views/FeasibilityPackagePage.tsx` (full rewrite of section order)
- Create: `sections/feasibility-package/HowItWorks.tsx` (content moved from How It Works page)
- Create: `sections/feasibility-package/StickyCTA.tsx`
- Create: `sections/feasibility-package/SampleReportGate.tsx`
- Modify: `sections/FeasibilityEngine.tsx` (relocated usage, reskin pass)
- Modify: `sections/feasibility-package/deliverableGraphics.tsx` usage (replaced by images)
- Delete (Phase 6 does the route): content absorbed from `views/HowItWorksPage.tsx`, `sections/how-it-works/StepRow.tsx`, `data/howItWorksData.ts`

New section order (spec section 4):

1. Hero: H1 "Your Building, Answered In Five Days.", price anchor line "Fixed fee, from £1,800.", trust marker row (98.5% planning success, 5-day guarantee, response within one working day), CTA Button "Start Feasibility" (opens form), background `/images/generated/package-hero.jpg` with dark overlay.
2. Social proof strip: `DeveloperLogos` reused plus one pull-quote testimonial from `Testimonials` data.
3. `<HowItWorks />` with `id="how-it-works"`: the five steps as condensed StepRows (move `StepRow.tsx` and `stepGraphics.tsx` into `sections/feasibility-package/`, import step copy from `data/howItWorksData.ts` content inline or a trimmed local array).
4. `<FeasibilityEngine />` (moved from homepage): heading becomes eyebrow "The Analysis", H2 "What's Included In Data Analysis." Reskin any graphic that is a wall of text; the six data-viz SVGs stay.
5. Six deliverables: keep `DeliverableRow` alternating structure; `graphicSlot` becomes an `<Image>` per deliverable. Mapping (adjust to actual deliverable order in `data/feasibilityPackageData.ts`):
   - GA plans deliverable: `/images/projects/st-johns-proposed-1.png`
   - Accommodation schedule: `/images/generated/desk-plans.jpg`
   - Constraints: `/images/projects/greyfriars-option4-1.png`
   - Risk register: `/images/generated/report-hands.jpg`
   - Go/No-Go recommendation: `/images/projects/sample-report-1.png`
   - Efficiency/layout options: `/images/projects/axis-house-plans-1.png`
   Images inside a consistent frame: `rounded-2xl border border-thistle-black/[0.06] bg-white p-2`, fixed aspect `aspect-[4/3]`, `object-contain` for drawings, `object-cover` for photos.
6. `<SampleReport />` rebuilt: three real page thumbnails (`sample-report-1/2/3.png`) plus `<SampleReportGate />`: email input, on submit POST `/api/leads` with `{ source: 'sample-report', email }`, then reveal a download link to `/sample doc/thistle-sample-feasibility.pdf` (URL-encode the space or move/rename the file to `public/downloads/thistle-sample-feasibility.pdf`, preferred).
7. `<PricingAnchor />` then `<ScopeClarity />` adjacent.
8. `<TimelineBand />` (reskin only if visibly inconsistent).
9. Case study highlight: one card for St Johns (data from Phase 5; if Phase 5 not yet run, wire to `caseStudiesData` first entry, which Phase 5 makes St Johns).
10. Testimonials: strongest three, reuse existing card markup in a static 3-up grid.
11. `<PackageFAQ />`: rewrite answers to the objection list: cost, speed, accuracy, planning risk, what happens after feasibility.
12. Final CTA: "Ready When You Are." with form CTA and reassurance microcopy.

- [ ] **Step 1: Move and adapt HowItWorks section** (files above, `id="how-it-works"`).
- [ ] **Step 2: Rewrite `views/FeasibilityPackagePage.tsx`** to the section order above. All CTAs here use `openModal` and "Start Feasibility".
- [ ] **Step 3: Build `StickyCTA.tsx`**: fixed bottom bar, mobile only (`lg:hidden`), appears after 600px scroll (IntersectionObserver on the hero or a scroll listener), contains price line and "Start Feasibility" button. Ensure it does not overlap the exit popup or footer (hide when footer in view is acceptable to skip; keep simple).
- [ ] **Step 4: Build `SampleReportGate.tsx`** per item 6.
- [ ] **Step 5: Deliverable image swap** per item 5; delete `deliverableGraphics.tsx` imports from the page (file removal happens in Phase 6 cleanup).
- [ ] **Step 6: Verify**

```bash
npm run build
```
Dev pass: full page at 375px and 1440px, form opens from every CTA, sticky bar shows on mobile scroll, gate flow works, anchor `/feasibility-package#how-it-works` lands correctly.

- [ ] **Step 7: Checkpoint.** (Commit candidate: "feat(package): CRO landing page with full-page form and real imagery".)

---

## Phase 4: Blog

### Task 4.1: Data model and renderer

**Files:**
- Modify: `data/blogData.ts`
- Modify: `views/BlogPostPage.tsx`
- Modify: `views/BlogPage.tsx`

- [ ] **Step 1: Extend the model**

```ts
export type BlogCategory =
  | 'Planning'
  | 'Permitted Development'
  | 'Feasibility'
  | 'HMO'
  | 'Investment'
  | 'News';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];   // "## " h2, "### " h3, "- " bullet, plain = paragraph
  image: string;
  date: string;
  updated?: string;
  readTime: string;
  category: BlogCategory;
  author: { name: string; role: string; initials: string };
}
```

Recategorise the three existing posts into the closest categories and replace their Unsplash `image` values with project/generated images.

- [ ] **Step 2: Renderer support.** In `BlogPostPage.tsx` render `### ` as `h3`, group consecutive `- ` lines into `<ul>`, keep `## ` as `h2` with a slugified `id` for anchors:

```tsx
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
```

- [ ] **Step 3: Jump-to contents.** Before the body, if the post has 3 or more `## ` blocks, render a "Jump to" list of anchor links using the same slugify.

- [ ] **Step 4: Mid-article CTA box.** After roughly 40 percent of the content blocks (index `Math.floor(content.length * 0.4)`), insert a bordered box: heading "Thinking about a conversion?", one line "Get a clear Go or No-Go on your building in five days.", tier-1 button. Component inline in `BlogPostPage.tsx`.

- [ ] **Step 5: Article JSON-LD.** In `src/app/blog/[slug]/page.tsx` add a `<script type="application/ld+json">` with Article schema (headline, datePublished, dateModified, author name, image, publisher "Thistle Architecture").

- [ ] **Step 6: Archive rebuild.** In `BlogPage.tsx`: header "Blog" with tagline and article count ("N articles"); category filter buttons rendered only for categories with at least one post, plus "All"; client-side filter state; card grid (image, category tag, title; drop excerpt/author from cards to match the HMO Designers pattern); featured-post block stays for the newest post.

- [ ] **Step 7: Verify:** build passes; filters work; TOC anchors scroll; JSON-LD validates (paste into a validator or eyeball the JSON).

### Task 4.2: Eight SEO articles

**Files:**
- Modify: `data/blogData.ts` (append 8 posts)

Rules for every article: Grade 7 UK English, no em or en dashes, 1,200 to 1,800 words, short paragraphs, at least one bulleted list, H2 sections matching the outline, an FAQ H2 with three question H3s, one internal link to a tool or the feasibility package page and one to another article, factual and current for 2026 (verify any regulation claims via web search during writing; Class MA prior-approval rules changed in 2024, do not state stale size limits).

- [ ] **Step 1 to 8: Write one post per step**, appending to `blogPosts`:

1. `office-to-residential-conversion-guide` "Office To Residential Conversion: The 2026 Guide" (Permitted Development). Outline: Why offices convert well / Routes: Class MA vs full planning / Prior approval matters / Costs and timescales / Common blockers / FAQ. Image: `/images/generated/office-exterior.jpg`.
2. `class-ma-explained` "Class MA Explained: Commercial To Residential Without Full Planning" (Permitted Development). Outline: What Class MA is / What qualifies / Prior approval matters checklist / What Class MA does not cover / How to check a building fast (link Class MA Checker) / FAQ. Image: `/images/projects/greyfriars-option2-1.png`.
3. `commercial-conversion-costs` "How Much Does A Commercial To Residential Conversion Cost?" (Investment). Outline: Cost drivers / Typical ranges by building type / The hidden costs (building regs upgrades, acoustics, fire) / Budgeting rules of thumb / Worked example / FAQ. Image: `/images/generated/terrace-scaffold.jpg`.
4. `what-is-a-feasibility-study` "What Is A Feasibility Study, And When Do You Need One?" (Feasibility). Outline: What it covers / When to commission one / What good looks like (use the six deliverables) / Feasibility vs appraisal / What it saves you / FAQ. Image: `/images/projects/sample-report-1.png`.
5. `hmo-feasibility` "HMO Feasibility: Will Your Building Work As An HMO?" (HMO). Outline: What makes a building HMO-viable / Room sizes and amenity space / Article 4 and Sui Generis / Planning risk lessons (draw on the St Johns example: amenity distribution, refusal patterns) / FAQ. Image: `/images/projects/st-johns-proposed-1.png`.
6. `how-to-calculate-gdv` "How To Calculate GDV, With Worked Examples" (Investment). Outline: GDV defined / The formula / Comparables done properly / Worked example / GDV mistakes / Try the GDV Calculator (link) / FAQ. Image: `/images/generated/desk-plans.jpg`.
7. `article-4-directions` "Article 4 Directions: What They Block And How To Check" (Planning). Outline: What Article 4 does / Where they apply / Impact on Class MA and HMOs / How to check a property / What to do if affected / FAQ. Image: `/images/generated/site-visit.jpg`.
8. `why-conversion-schemes-get-refused` "The Top Reasons Conversion Schemes Get Refused" (Planning). Outline: Undersized rooms and amenity / Noise and acoustics / Fire and escape / Overdevelopment / Heritage and Article 4 / How feasibility de-risks all five / FAQ. Image: `/images/projects/harpenden-sketch-1.png`.

- [ ] **Step 9: Verify:** build passes; each post renders with TOC, lists, FAQ, CTA box; read one post aloud for tone (business, plain, no hype).

- [ ] **Step 10: Checkpoint.** (Commit candidate: "feat(blog): HMO Designers-style blog with eight SEO articles".)

---

## Phase 5: About/Team and case studies

### Task 5.1: About page

**Files:**
- Modify: `views/AboutPage.tsx`
- Modify: `sections/Team.tsx` (or inline team grid in the view, follow whichever the current code favours)

- [ ] **Step 1: Reconcile team data.** Read the current `sections/Team.tsx` names/roles. Build the team array from real photos: Ed Kercher (Founder, "BA (Hons) AT, CIAT Affiliate"), Kaan (Design Lead, "BArch"), Jan, Nick, Onaiza with roles from the current Team section where they exist. Any unknown role goes into the confirmations doc (Task 5.3) and ships with the safest true title from existing site copy.

- [ ] **Step 2: Rebuild AboutPage** to the HMO Designers pattern: PageHero intro (business tone) / "Who we are" block with the personal-experience angle ("We develop and invest in these buildings ourselves") / stats row reusing the homepage metric values / team grid with `/images/team/*.jpg` photos (consistent aspect-[4/5], object-cover, same treatment), name, role, credential bullets / NO "Work With Us" band; the page ends at the footer.

- [ ] **Step 3: Verify:** build passes; photos crop acceptably at all five viewports; no dual CTA anywhere on the page.

### Task 5.2: Case studies rebuild

**Files:**
- Modify: `data/caseStudiesData.ts` (full replacement of entries; financial fields become optional)
- Modify: `views/CaseStudyDetailPage.tsx` (handle optional fields)
- Modify: `sections/CaseStudies.tsx` (verify cards render with new data)

- [ ] **Step 1: Make financial fields optional** in the case-study type: `purchasePrice?`, `projectedGDV?`, `gdvUpliftPct?`, `riskAvoided?`. Detail page renders those rows only when present.

- [ ] **Step 2: Extract facts.** Read `03 new website/Finished Projects/Commercial/Harpenden Police Station/Agent/Harpenden Police Station Planning Appraisal Nov25.pdf` (planning facts only) and re-use the St Johns feasibility document facts already captured in the spec. Do not invent numbers.

- [ ] **Step 3: Replace the four fabricated studies** with real entries:

1. `st-johns-aylesbury`: 4 St John's Street, Aylesbury. Large HMO, 9-bed Sui Generis. Facts: 9 en-suite rooms of 12 to 16 sqm, 25 sqm communal amenity split across floors, no Article 4 (6-bed fallback under PD), room rates £800 to £850 pcm locally, Go with a planning-safe 8-bed fallback. Images: `st-johns-existing-1.png`, `st-johns-proposed-1.png`, `st-johns-sk001-1.png`.
2. `harpenden-police-station`: Police station to flats. Facts from the appraisal PDF only; images `harpenden-sketch-1.png`.
3. `greyfriars-kings-lynn`: Office to residential/HMO mixed use, King's Lynn. Present as an options study (Option 2 residential vs Option 4 HMO with extension). Images: both greyfriars PNGs.
4. `axis-house`: Office to high-end houses. Present as sketch-scheme feasibility with three tested options. Images: axis-house PNGs.
5. `southgate-winchester` (short entry): listed building to HMO; image southgate PNG.
6. `beechmount-manchester` (short entry): existing HMO feasibility; image beechmount PNG.

Stats cells use factual non-financial values (units, options tested, planning route, turnaround). Narrative fields (challenge, approach, outcome) written from the documents, hedged where the outcome is not documented ("taken to sketch scheme stage").

- [ ] **Step 4: Homepage cards check.** `sections/CaseStudies.tsx` shows the first three entries; confirm order puts St Johns, Harpenden, Greyfriars first.

- [ ] **Step 5: Verify:** build passes (static params regenerate for new slugs); detail pages render with drawings; no Unsplash URLs remain:

```bash
grep -rn "unsplash" data/ sections/ views/ --include="*.ts*"
```
Expected: no matches (also remove the Unsplash remotePattern from `next.config.ts` once clear).

### Task 5.3: Confirmations doc for Ed

**Files:**
- Create: `docs/case-study-confirmations.md`

- [ ] **Step 1: Write the doc** listing, per case study: every stated fact and its source document; every fact we could NOT verify; the empty `Photos/` folders (St Johns, Harpenden, 162 Millbrook, 81 Crecent, Bishopstoke, and all High End Resi projects) with a request to re-share; the sample-report publication approval; the one-working-day response claim; the 98.5 percent success and 86 percent faster metrics (already flagged "confirm accuracy" in Ed's own March brief); team roles for Jan, Nick, Onaiza; Seyma photo missing. Format as a checklist Akash can paste into an email.

- [ ] **Step 2: Checkpoint.** (Commit candidate: "feat(content): real case studies, About/Team rebuild, Ed confirmations doc".)

---

## Phase 6: Conversions merge, tools index removal, nav and redirects

### Task 6.1: Conversions merge

**Files:**
- Modify: `data/conversionsData.ts`
- Modify: `src/app/conversions/[type]/page.tsx` (generateStaticParams)

- [ ] **Step 1: Fold office content into commercial.** In `conversionsData.ts`, merge the strongest office-to-resi sections (Class MA mechanics, prior approval) into the `commercial-to-residential` entry as an additional content section titled "Office To Residential Under Class MA" with an internal anchor. Delete the `office-to-resi-class-ma` entry. Keep `hmo` unchanged apart from a tone read.

- [ ] **Step 2: Update `generateStaticParams`** to the two remaining types; confirm unknown slugs 404 (dynamic route with `notFound()` on missing data).

- [ ] **Step 3: Add real imagery** to both conversion pages where the template has image slots (use office-exterior/greyfriars for commercial; st-johns/highbury for HMO).

### Task 6.2: Route removals and redirects

**Files:**
- Delete: `src/app/how-it-works/page.tsx`, `views/HowItWorksPage.tsx`, `sections/how-it-works/` (after confirming Phase 3 moved StepRow/stepGraphics), `src/app/tools/page.tsx`, `views/ToolsIndexPage.tsx`, `sections/feasibility-package/deliverableGraphics.tsx` (now unused)
- Modify: `next.config.ts`

- [ ] **Step 1: Delete files listed above.** First confirm nothing still imports them:

```bash
grep -rn "HowItWorksPage\|ToolsIndexPage\|deliverableGraphicMap\|howItWorksData" src/ views/ sections/ components/ data/ --include="*.ts*"
```
Move any still-needed export before deleting.

- [ ] **Step 2: Add redirects** to the existing `redirects()` array in `next.config.ts`:

```ts
{ source: '/how-it-works', destination: '/feasibility-package#how-it-works', permanent: true },
{ source: '/tools', destination: '/tools/class-ma-checker', permanent: true },
{ source: '/conversions/office-to-resi-class-ma', destination: '/conversions/commercial-to-residential', permanent: true },
```

- [ ] **Step 3: Navbar and footer.** `components/ui/Navbar.tsx`: items become Feasibility Package, Case Studies, Conversions (dropdown: Commercial to Residential, HMO), Tools (dropdown: Class MA Checker, GDV Calculator), About, Blog; CTA per Task 1.2. `sections/Footer.tsx`: link columns updated to match (no Tools index, no How It Works, two conversions).

- [ ] **Step 4: Verify**

```bash
npm run build
```
Dev server: `/how-it-works`, `/tools`, `/conversions/office-to-resi-class-ma` all 301 to the right places; `/conversions/nonsense` 404s; nav and footer contain no dead links.

- [ ] **Step 5: Checkpoint.** (Commit candidate: "feat(ia): merged conversions, removed tools index and how-it-works, redirects".)

### Task 6.3: Soft email gate on the free tools

**Files:**
- Modify: `sections/tools/EligibilityChecker.tsx`
- Modify: `sections/tools/GDVCalculator.tsx`

- [ ] **Step 1: Add the gate.** In each tool, when the user requests their result: show the headline outcome immediately (eligible/not eligible summary, or the headline GDV figure), but blur or collapse the detailed breakdown behind an inline email form ("Enter your email to see the full breakdown"). On submit, POST `/api/leads` with `{ source: 'class-ma-checker' | 'gdv-calculator', email, ...inputSummary }`, then reveal the detail. Store a `localStorage` flag (`thistle-tool-unlocked`) so a returning user is not gated twice.

- [ ] **Step 2: Verify.** Dev server: run both tools end to end; gate appears once, unlock persists on reload, lead logs server-side. Tier-1 CTA below results is unchanged.

---

## Phase 7: design.md, cohesion pass, final verification

### Task 7.1: design.md update

**Files:**
- Modify: `design.md`

- [ ] **Step 1: Add/refresh sections:** Imagery system (the four-source priority order, frame treatment classes, `public/images/` layout, LICENCES.md rule); CTA canon (tier 1 "Book Your Feasibility" links to `/feasibility-package`; tier 2 "Start Feasibility" opens the form, package page only; reassurance microcopy string); Component inventory additions (full-page form, StickyCTA, SampleReportGate, HowItWorks section, blog card set, CTA box); Blog categories list; note that the exit popup is package-page only. Reconcile every existing claim in design.md against shipped code (component table paths, copy rules, quality bar).

### Task 7.2: Cohesion and responsive sweep

- [ ] **Step 1: Copy sweep.** Check every new string:

```bash
grep -rn "—\|–" sections/ views/ components/ data/ --include="*.ts*"
```
Expected: no em or en dashes anywhere. Also scan new copy for US spellings and hype verbs.

- [ ] **Step 2: Responsive sweep**

```bash
node scripts/responsive-sweep.mjs
```
All pages at mobile-375, tablet-768, laptop-1280, desktop-1440, desktop-1920 with `scrollWidth === clientWidth`. Fix any overflow before proceeding.

- [ ] **Step 3: Full-site screenshot pass** (dev server plus the screenshot tooling used by the sweep script or Chrome MCP): homepage, feasibility package, one blog post, blog archive, about, one case study, one conversion page, both tools. Save to `screenshots/2026-07-06-revision/`.

- [ ] **Step 4: CLS/image audit.** Every `<Image>` has proper sizing; hero images use `priority`; drawings use `object-contain` in fixed-aspect frames.

- [ ] **Step 5: Final report to Akash** with screenshots, the Ed confirmations doc, the LEAD_WEBHOOK_URL request, and the list of commit candidates awaiting his approval.
