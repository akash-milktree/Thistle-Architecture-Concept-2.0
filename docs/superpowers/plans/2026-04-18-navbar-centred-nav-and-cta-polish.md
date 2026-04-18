# Navbar Centred Nav + CTA Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Centre-align the navbar menu items, give the navbar CTA a pink hover state, and add the missing arrow icon to it. Also verify the previously-built hero/metrics-strip work matches its approved spec, then commit both pieces of work.

**Architecture:** Single-file edit to `components/ui/Navbar.tsx`. Layout change uses CSS Grid (`grid grid-cols-3`) to split the navbar into logo (left), nav links (centre), and CTA + mobile toggle (right). CTA changes are two prop tweaks on the existing `<Button>` component (add `icon`, swap hover Tailwind classes from `thistle-black` → `thistle-pink`). No new files, no logic changes, no test framework involved (project has no unit tests).

**Tech Stack:** Next.js 16 App Router, React 18, Tailwind CSS 3.4, lucide-react icons, framer-motion (already imported). Verification via `npm run build` (type-check + lint) + Vercel preview server screenshots.

**Reference specs (both approved 2026-04-18):**
- `docs/superpowers/specs/2026-04-18-navbar-centred-nav-and-cta-polish-design.md` — navbar work (this plan implements)
- `docs/superpowers/specs/2026-04-18-hero-metrics-strip-redesign-design.md` — hero work (already implemented, this plan verifies + commits)

---

### Task 1: Add `ArrowUpRight` to lucide-react import

**Files:**
- Modify: `components/ui/Navbar.tsx:10`

- [ ] **Step 1: Edit the lucide-react import to include `ArrowUpRight`**

Current:
```ts
import { Menu, X } from 'lucide-react';
```

New:
```ts
import { ArrowUpRight, Menu, X } from 'lucide-react';
```

- [ ] **Step 2: Verify no TS errors**

Run: `npx tsc --noEmit` from project root.
Expected: completes without errors mentioning `Navbar.tsx`.

---

### Task 2: Restructure navbar inner container to 3-column grid

**Files:**
- Modify: `components/ui/Navbar.tsx:60-104`

- [ ] **Step 1: Replace the inner container's flex layout with grid**

Find this block (currently lines 60–104 — the entire inner `<div className="max-w-[1360px]...">` and its children, but NOT the outer `<motion.nav>` wrapper):

```tsx
<div className="max-w-[1360px] w-full mx-auto flex items-center justify-between relative z-50">
  <div className="flex items-center gap-8">
    <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
      <ThistleLogo
        variant="full"
        color="light"
        className="h-11 w-auto transition-all duration-300"
      />
    </Link>

    <div className="hidden md:flex items-center gap-fl-6 text-fluid-sm font-medium text-white/80">
      {navLinks.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          className={`transition-colors hover:text-white ${pathname.startsWith(link.path) ? 'text-white' : ''}`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  </div>

  <div className="flex items-center gap-4">
    <div className="hidden md:block">
      <Button
        size="sm"
        variant="primary"
        className="!bg-white !text-thistle-black !border-white hover:!bg-thistle-black hover:!text-white hover:!border-thistle-black"
        onClick={openModal}
      >
        Start Feasibility
      </Button>
    </div>

    {/* Mobile Menu Toggle */}
    <button
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      className="md:hidden p-2 -mr-2 text-white transition-colors"
      aria-label="Toggle menu"
    >
      {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  </div>
</div>
```

Replace with:

```tsx
<div className="max-w-[1360px] w-full mx-auto grid grid-cols-3 items-center relative z-50">
  {/* Left: Logo */}
  <div className="flex items-center">
    <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
      <ThistleLogo
        variant="full"
        color="light"
        className="h-11 w-auto transition-all duration-300"
      />
    </Link>
  </div>

  {/* Centre: Nav Links */}
  <div className="hidden md:flex items-center justify-center gap-fl-6 text-fluid-sm font-medium text-white/80">
    {navLinks.map((link) => (
      <Link
        key={link.path}
        href={link.path}
        className={`transition-colors hover:text-white ${pathname.startsWith(link.path) ? 'text-white' : ''}`}
      >
        {link.label}
      </Link>
    ))}
  </div>

  {/* Right: CTA + Mobile Toggle */}
  <div className="flex items-center justify-end gap-4">
    <div className="hidden md:block">
      <Button
        size="sm"
        variant="primary"
        icon={<ArrowUpRight size={16} />}
        className="!bg-white !text-thistle-black !border-white hover:!bg-thistle-pink hover:!text-thistle-black hover:!border-thistle-pink"
        onClick={openModal}
      >
        Start Feasibility
      </Button>
    </div>

    {/* Mobile Menu Toggle */}
    <button
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      className="md:hidden p-2 -mr-2 text-white transition-colors"
      aria-label="Toggle menu"
    >
      {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  </div>
</div>
```

What changed (consolidated, since this single replacement carries all 3 spec acceptance criteria for the CTA in addition to the layout change):
- `flex items-center justify-between` → `grid grid-cols-3 items-center`
- Logo wrapped in its own column div instead of being grouped with nav links
- Nav links container gets `justify-center` (centres them within their column)
- CTA + mobile toggle wrapped with `justify-end` (right-aligns them within their column)
- `<Button>` gains `icon={<ArrowUpRight size={16} />}` prop
- `<Button>` className hover classes change: `hover:!bg-thistle-black hover:!text-white hover:!border-thistle-black` → `hover:!bg-thistle-pink hover:!text-thistle-black hover:!border-thistle-pink`

- [ ] **Step 2: Verify no TS errors**

Run: `npx tsc --noEmit`
Expected: completes without errors.

---

### Task 3: Reload preview and verify navbar visually

**Files:**
- None modified

- [ ] **Step 1: Reload the running preview**

Use the Vercel preview MCP: `mcp__Claude_Preview__preview_eval` with `serverId` from `mcp__Claude_Preview__preview_list`, expression: `window.location.reload()`.
Wait ~2 seconds for Reveal animations.

- [ ] **Step 2: Check console for errors**

Use `mcp__Claude_Preview__preview_console_logs` with `level: "error"`.
Expected: "No console logs."

- [ ] **Step 3: Capture screenshot at desktop size (1280×800)**

If viewport isn't already 1280×800: `mcp__Claude_Preview__preview_resize` with `width: 1280, height: 800`.
Then `mcp__Claude_Preview__preview_screenshot`.
Expected: navbar shows logo on left, "Visibility Package | How It Works | Our Work | About" centred, "Start Feasibility ↗" button on right.

- [ ] **Step 4: Verify CTA hover via DOM inspection**

Use `mcp__Claude_Preview__preview_inspect` with selector `nav button[class*="!bg-white"]` and styles `["backgroundColor", "color"]`.
Expected: `backgroundColor: rgb(255, 255, 255)`, `color: rgb(47, 59, 54)` in default state.

(Hover state can't be programmatically asserted via inspect; verify by hovering in the live preview manually if questioned.)

- [ ] **Step 5: Verify nav links are centred via DOM inspection**

Use `mcp__Claude_Preview__preview_eval` with expression:
```js
(() => {
  const navLinksContainer = document.querySelector('nav .grid > div:nth-child(2)');
  const r = navLinksContainer.getBoundingClientRect();
  const containerWidth = window.innerWidth;
  const linksCentre = (r.left + r.right) / 2;
  return { linksCentre, viewportCentre: containerWidth / 2, drift: Math.abs(linksCentre - containerWidth / 2) };
})()
```
Expected: `drift` < 50px (allowing for 1360px max-width container offsetting from true viewport centre at wider viewports).

---

### Task 4: Verify hero/metrics-strip work matches its spec

**Files:**
- None modified (verifying prior work)

- [ ] **Step 1: Confirm Hero.tsx contains the dark metrics strip**

Use Grep with pattern `bg-thistle-black text-white` and path `sections/Hero.tsx`.
Expected: 1+ match (the strip's `<div>` wrapper).

- [ ] **Step 2: Confirm `MetricsStrip.tsx` does NOT exist**

Use Glob with pattern `sections/MetricsStrip.tsx`.
Expected: 0 results.

- [ ] **Step 3: Confirm `Problem.tsx` and `Intro.tsx` do NOT exist**

Use Glob with pattern `sections/{Problem,Intro}.tsx`.
Expected: 0 results.

- [ ] **Step 4: Confirm HomePage.tsx renders sections in the brief-aligned order**

Read `views/HomePage.tsx`.
Expected order in JSX: Hero, Process, FeasibilityEngine, Benefits, Difference, CaseStudies, DataSources, Testimonials, CTABlock, FAQ. No Problem, no Intro, no MetricsStrip.

- [ ] **Step 5: Verify hero in preview**

Scroll preview to top: `mcp__Claude_Preview__preview_eval` with expression `window.scrollTo(0, 0); 'top'`.
Wait 1.5s for animations.
Screenshot via `mcp__Claude_Preview__preview_screenshot`.
Expected: Hero with text+card visible, dark metrics strip at the bottom of the viewport showing 98.5% / 20–35% / 86% with white vertical dividers between them, no "83% faster..." tagline above metrics.

---

### Task 5: Run production build to catch any type/lint regressions

**Files:**
- None modified

- [ ] **Step 1: Run next build**

Run: `cd "/Users/ak_mac_mini/Downloads/Projects/thistle live" && npm run build`
Expected: build completes successfully (`✓ Compiled successfully`), no TypeScript errors, no lint errors.

If build fails, diagnose the error, fix it inline, re-run.

---

### Task 6: Stage and commit both spec docs + both implementations

**Files:**
- Staged for commit:
  - `components/ui/Navbar.tsx` (modified)
  - `sections/Hero.tsx` (modified)
  - `views/HomePage.tsx` (modified)
  - `sections/Problem.tsx` (deleted)
  - `sections/Intro.tsx` (deleted)
  - `docs/superpowers/specs/2026-04-18-hero-metrics-strip-redesign-design.md` (new)
  - `docs/superpowers/specs/2026-04-18-navbar-centred-nav-and-cta-polish-design.md` (new)
  - `docs/superpowers/plans/2026-04-18-navbar-centred-nav-and-cta-polish.md` (new)

- [ ] **Step 1: Confirm git status reflects only intended changes**

Run: `git status` (without -uall flag).
Expected: only the files listed above appear as modified/deleted/new. `.claude/`, `awesome-design-md-main/`, and `public/` untracked items remain untracked (those existed before this work).

If anything unexpected shows, pause and ask the user.

- [ ] **Step 2: Stage the intended files explicitly**

Run:
```bash
cd "/Users/ak_mac_mini/Downloads/Projects/thistle live" && \
git add components/ui/Navbar.tsx sections/Hero.tsx views/HomePage.tsx \
        docs/superpowers/specs/2026-04-18-hero-metrics-strip-redesign-design.md \
        docs/superpowers/specs/2026-04-18-navbar-centred-nav-and-cta-polish-design.md \
        docs/superpowers/plans/2026-04-18-navbar-centred-nav-and-cta-polish.md && \
git rm sections/Problem.tsx sections/Intro.tsx
```

- [ ] **Step 3: Ask the user for explicit commit approval**

The system rule is: "Only create commits when requested by the user." Brainstorming approval covered the design, not the commit itself. Show the user the staged file list (`git status`) and ask: "Ready to commit hero spec + navbar spec + plan + code changes as one commit? Suggested message: 'feat: hero metrics strip + navbar centred layout per brief'."

Wait for "yes" before proceeding to step 4.

- [ ] **Step 4: Create the commit (only after approval)**

Run:
```bash
git commit -m "$(cat <<'EOF'
feat: hero metrics strip + navbar centred layout per brief

- Hero: integrate dark thistle-black metrics strip at bottom; remove standalone Problem & Intro sections
- Navbar: centre-align nav links via 3-col grid; add ArrowUpRight icon to CTA; switch CTA hover to thistle-pink
- Spec docs + implementation plan for both pieces of work

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 5: Verify commit succeeded**

Run: `git status`
Expected: working tree clean (apart from the pre-existing untracked items).
Run: `git log -1 --oneline`
Expected: shows the new commit.

---

## Self-Review

Per writing-plans skill:

**1. Spec coverage** — both specs cross-checked:

*Navbar spec acceptance criteria:*
- (1) Nav links centred at ≥md → Task 2 (`justify-center` in grid col 2), Task 3 step 5 (drift check)
- (2) Logo left, CTA right → Task 2 (grid cols 1 and 3 with `justify-end` on col 3)
- (3) CTA has ArrowUpRight icon → Task 1 (import) + Task 2 (icon prop)
- (4) CTA hover bg = thistle-pink, text/arrow = thistle-black → Task 2 (className change)
- (5) Mobile unchanged → Task 2 preserves `hidden md:flex` and the hamburger toggle
- (6) No console errors, scroll-hide works → Task 3 step 2 + manual hover check (out of scope for automated assertion)
- (7) Logo and CTA don't visually shift horizontally → grid columns at 33% width each leave them in similar positions; verified visually in Task 3 step 3

*Hero spec acceptance criteria:*
- (1) Vertical balance at 1280×800 → verified in Task 4 step 5
- (2) Strip bg = thistle-black → Task 4 step 1
- (3) Strip text white tones → already in Hero.tsx code (verified by passing reads earlier)
- (4) No tagline → verified in Task 4 step 5
- (5) 3 metrics present → verified in Task 4 step 5
- (6) Vertical dividers between metrics → already in Hero.tsx (`md:border-l md:border-white/[0.1]`)
- (7) No console errors → Task 3 step 2 covers
- (8) Section order unchanged → Task 4 step 4
- (9) MetricsStrip.tsx doesn't exist → Task 4 step 2

**2. Placeholder scan** — none found. All steps include exact commands or code blocks. No "TBD"/"TODO"/"appropriately handle" hand-waves.

**3. Type consistency** — `ArrowUpRight` import name matches usage in Task 2. `thistle-pink` is a valid Tailwind colour key (verified against `tailwind.config.ts`). Button component's `icon` prop accepts `React.ReactNode` (verified earlier).
