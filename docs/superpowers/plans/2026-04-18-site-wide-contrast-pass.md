# Site-Wide Contrast Pass + Hero Typography Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply WCAG-aware contrast bumps across the entire site (10 green CTAs, ~25 body-text paragraphs, full footer text pass) and complete the hero typography polish (Title Case headline, full-opacity subtext, contrast-passing CTA, full-white metrics-strip label).

**Architecture:** Pure className edits across 18 files. No new components, no logic changes, no new dependencies. Each change is a mechanical find-and-replace in a Tailwind class string. Verification = `npm run build` + browser preview spot-checks.

**Tech Stack:** Next.js 16 App Router, Tailwind CSS 3.4. No test framework — verification via `next build` (TS + lint) + Vercel preview server.

**Reference spec:** `docs/superpowers/specs/2026-04-18-site-wide-contrast-pass-design.md`

---

### Task 1: Hero.tsx — title case, subtext opacity, CTA contrast, metrics strip label

**Files:**
- Modify: `sections/Hero.tsx`

- [ ] **Step 1: Change hero title to Title Case**

Replace at `sections/Hero.tsx:38`:
```tsx
// before
              From building to viable conversion<span className="text-thistle-green"> in 5 days.</span>
// after
              From Building To Viable Conversion<span className="text-thistle-green"> In 5 Days.</span>
```

- [ ] **Step 2: Bump first subtext paragraph to full opacity**

Replace at `sections/Hero.tsx:43`:
```tsx
// before
            <p className="text-fluid-base text-thistle-black/60 leading-relaxed font-light mb-fl-4 max-w-md">
// after
            <p className="text-fluid-base text-thistle-black leading-relaxed font-light mb-fl-4 max-w-md">
```

- [ ] **Step 3: Bump second subtext paragraph to full opacity**

Replace at `sections/Hero.tsx:49`:
```tsx
// before
            <p className="text-fluid-base text-thistle-black/60 leading-relaxed font-light mb-fl-7 max-w-md">
// after
            <p className="text-fluid-base text-thistle-black leading-relaxed font-light mb-fl-7 max-w-md">
```

- [ ] **Step 4: Apply CTA contrast fix on hero button**

Replace at `sections/Hero.tsx:56`:
```tsx
// before
              <Button size="lg" variant="primary" icon={<ArrowUpRight size={18} />} onClick={openModal} className="!bg-thistle-green !text-thistle-black !border-thistle-green hover:!bg-thistle-green/80">
// after
              <Button size="lg" variant="primary" icon={<ArrowUpRight size={18} />} onClick={openModal} className="!bg-thistle-green !text-black !font-semibold !border-thistle-green hover:!bg-thistle-green/80">
```

- [ ] **Step 5: Bump metrics strip label opacity to full white**

Replace in metrics strip section of `sections/Hero.tsx`:
```tsx
// before
                  <span className="text-sm font-medium text-white/70 block mb-0.5">
// after
                  <span className="text-sm font-medium text-white block mb-0.5">
```

---

### Task 2: Apply identical CTA contrast fix to 9 other green CTAs

**Files:**
- Modify: `sections/CTABlock.tsx`
- Modify: `sections/Footer.tsx`
- Modify: `views/HowItWorksPage.tsx`
- Modify: `views/FeasibilityPackagePage.tsx` (×2 instances)
- Modify: `views/CaseStudiesPage.tsx`
- Modify: `views/AboutPage.tsx`
- Modify: `views/CaseStudyDetailPage.tsx`
- Modify: `views/BlogPostPage.tsx`

**Mechanical transformation for every instance:**
- find: `!bg-thistle-green !text-thistle-black !border-thistle-green`
- replace with: `!bg-thistle-green !text-black !font-semibold !border-thistle-green`

The rest of each Button's className is preserved verbatim.

- [ ] **Step 1: `sections/CTABlock.tsx:31`**

```tsx
// before
            className="!bg-thistle-green !text-thistle-black !border-thistle-green hover:!bg-thistle-green/80"
// after
            className="!bg-thistle-green !text-black !font-semibold !border-thistle-green hover:!bg-thistle-green/80"
```

- [ ] **Step 2: `sections/Footer.tsx:52`**

```tsx
// before
              className="!bg-thistle-green !text-thistle-black !border-thistle-green hover:!bg-thistle-green/80 hover:!border-thistle-green/80"
// after
              className="!bg-thistle-green !text-black !font-semibold !border-thistle-green hover:!bg-thistle-green/80 hover:!border-thistle-green/80"
```

- [ ] **Step 3: `views/HowItWorksPage.tsx:71`**

```tsx
// before
        <Button variant="glass" icon={<ArrowUpRight size={16} />} onClick={openModal} className="!bg-thistle-green !text-thistle-black !border-thistle-green hover:!bg-thistle-green/80 hover:!border-thistle-green/80">
// after
        <Button variant="glass" icon={<ArrowUpRight size={16} />} onClick={openModal} className="!bg-thistle-green !text-black !font-semibold !border-thistle-green hover:!bg-thistle-green/80 hover:!border-thistle-green/80">
```

- [ ] **Step 4: `views/FeasibilityPackagePage.tsx:159`**

```tsx
// before
          className="!bg-thistle-green !text-thistle-black !border-thistle-green hover:!bg-thistle-green/80 hover:!border-thistle-green/80"
// after
          className="!bg-thistle-green !text-black !font-semibold !border-thistle-green hover:!bg-thistle-green/80 hover:!border-thistle-green/80"
```

If the file has the same exact string at line 365 too, the Edit tool will need disambiguation; pass `replace_all: true` for this file or read enough surrounding context to disambiguate. After the edit, run `grep '!text-thistle-black !border-thistle-green' views/FeasibilityPackagePage.tsx` and expect 0 results.

- [ ] **Step 5: `views/CaseStudiesPage.tsx:95`**

```tsx
// before
            <Button variant="glass" size="lg" icon={<ArrowUpRight size={18} />} onClick={openModal} className="!bg-thistle-green !text-thistle-black !border-thistle-green hover:!bg-thistle-green/80 hover:!border-thistle-green/80">
// after
            <Button variant="glass" size="lg" icon={<ArrowUpRight size={18} />} onClick={openModal} className="!bg-thistle-green !text-black !font-semibold !border-thistle-green hover:!bg-thistle-green/80 hover:!border-thistle-green/80">
```

- [ ] **Step 6: `views/AboutPage.tsx:107`**

```tsx
// before
            <Button variant="glass" size="lg" icon={<ArrowUpRight size={18} />} onClick={openModal} className="!bg-thistle-green !text-thistle-black !border-thistle-green hover:!bg-thistle-green/80 hover:!border-thistle-green/80">
// after
            <Button variant="glass" size="lg" icon={<ArrowUpRight size={18} />} onClick={openModal} className="!bg-thistle-green !text-black !font-semibold !border-thistle-green hover:!bg-thistle-green/80 hover:!border-thistle-green/80">
```

- [ ] **Step 7: `views/CaseStudyDetailPage.tsx:161`**

```tsx
// before
            <Button variant="glass" size="lg" icon={<ArrowUpRight size={18} />} onClick={openModal} className="!bg-thistle-green !text-thistle-black !border-thistle-green hover:!bg-thistle-green/80 hover:!border-thistle-green/80">
// after
            <Button variant="glass" size="lg" icon={<ArrowUpRight size={18} />} onClick={openModal} className="!bg-thistle-green !text-black !font-semibold !border-thistle-green hover:!bg-thistle-green/80 hover:!border-thistle-green/80">
```

- [ ] **Step 8: `views/BlogPostPage.tsx:143`**

```tsx
// before
            <Button variant="glass" size="lg" icon={<ArrowUpRight size={18} />} onClick={openModal} className="!bg-thistle-green !text-thistle-black !border-thistle-green hover:!bg-thistle-green/80 hover:!border-thistle-green/80">
// after
            <Button variant="glass" size="lg" icon={<ArrowUpRight size={18} />} onClick={openModal} className="!bg-thistle-green !text-black !font-semibold !border-thistle-green hover:!bg-thistle-green/80 hover:!border-thistle-green/80">
```

- [ ] **Step 9: Verify all CTAs migrated**

Run a grep across the codebase:
```bash
cd "/Users/ak_mac_mini/Downloads/Projects/thistle live" && grep -rn "!text-thistle-black !border-thistle-green" --include="*.tsx" .
```
Expected: zero matches. If anything matches, repeat the find-replace on that file.

---

### Task 3: Body text contrast bumps — homepage sections (light bg)

**Files:**
- Modify: `sections/Process.tsx`
- Modify: `sections/Benefits.tsx`
- Modify: `sections/Difference.tsx`
- Modify: `sections/CaseStudies.tsx`
- Modify: `sections/FAQ.tsx`
- Modify: `sections/Testimonials.tsx`

For each line, the change is to replace `text-thistle-black/<old>` with `text-thistle-black/80` in the className string. Surrounding classes stay verbatim.

- [ ] **Step 1: `sections/Process.tsx:74` — step description**

```tsx
// before
                <p className="text-fluid-sm text-thistle-black/50 leading-relaxed">{step.desc}</p>
// after
                <p className="text-fluid-sm text-thistle-black/80 leading-relaxed">{step.desc}</p>
```

- [ ] **Step 2: `sections/Benefits.tsx:63` — section subtext**

```tsx
// before
            <p className="text-fluid-sm text-thistle-black/60 leading-relaxed">
// after
            <p className="text-fluid-sm text-thistle-black/80 leading-relaxed">
```

- [ ] **Step 3: `sections/Benefits.tsx:85` — item description**

```tsx
// before
                <p className="text-fluid-sm text-thistle-black/50 leading-relaxed">{item.desc}</p>
// after
                <p className="text-fluid-sm text-thistle-black/80 leading-relaxed">{item.desc}</p>
```

- [ ] **Step 4: `sections/Difference.tsx:51` — Traditional cell text**

```tsx
// before
                  <span className="text-fluid-sm text-thistle-black/50">{row.traditional}</span>
// after
                  <span className="text-fluid-sm text-thistle-black/80">{row.traditional}</span>
```

- [ ] **Step 5: `sections/CaseStudies.tsx:100` — case study excerpt**

```tsx
// before
          <p className="text-fluid-sm text-thistle-black/50 leading-relaxed mt-auto">
// after
          <p className="text-fluid-sm text-thistle-black/80 leading-relaxed mt-auto">
```

- [ ] **Step 6: `sections/FAQ.tsx:60` — section intro**

```tsx
// before
              <p className="text-fluid-sm text-thistle-black/50 leading-relaxed mb-fl-6 max-w-sm">
// after
              <p className="text-fluid-sm text-thistle-black/80 leading-relaxed mb-fl-6 max-w-sm">
```

- [ ] **Step 7: `sections/FAQ.tsx:115` — answer body**

```tsx
// before
                        <p className="text-fluid-sm text-thistle-black/50 leading-relaxed px-fl-5 pb-fl-4">
// after
                        <p className="text-fluid-sm text-thistle-black/80 leading-relaxed px-fl-5 pb-fl-4">
```

- [ ] **Step 8: `sections/Testimonials.tsx:104` — quote body**

```tsx
// before
    <p className="text-fluid-sm text-thistle-black/70 leading-relaxed mb-fl-5">
// after
    <p className="text-fluid-sm text-thistle-black/80 leading-relaxed mb-fl-5">
```

- [ ] **Step 9: `sections/Testimonials.tsx:137` — section subtext**

```tsx
// before
            <p className="text-fluid-sm text-thistle-black/60 leading-relaxed max-w-xl mx-auto">
// after
            <p className="text-fluid-sm text-thistle-black/80 leading-relaxed max-w-xl mx-auto">
```

---

### Task 4: Body text contrast bumps — sections on dark bg (CTABlock)

**Files:**
- Modify: `sections/CTABlock.tsx`

- [ ] **Step 1: `sections/CTABlock.tsx:21` — CTA section subtext**

```tsx
// before
          <p className="text-fluid-sm text-white/50 leading-relaxed mb-fl-7 max-w-md mx-auto">
// after
          <p className="text-fluid-sm text-white/80 leading-relaxed mb-fl-7 max-w-md mx-auto">
```

---

### Task 5: Body text contrast bumps — view pages

**Files:**
- Modify: `views/HowItWorksPage.tsx`
- Modify: `views/FeasibilityPackagePage.tsx`
- Modify: `views/AboutPage.tsx`
- Modify: `views/CaseStudiesPage.tsx`
- Modify: `views/CaseStudyDetailPage.tsx`
- Modify: `views/BlogPage.tsx`
- Modify: `views/PrivacyPage.tsx`
- Modify: `views/TermsPage.tsx`

- [ ] **Step 1: `views/HowItWorksPage.tsx:116` — step description**

```tsx
// before
                    <p className="text-sm text-thistle-black/50 leading-relaxed mb-fl-3">{step.desc}</p>
// after
                    <p className="text-sm text-thistle-black/80 leading-relaxed mb-fl-3">{step.desc}</p>
```

- [ ] **Step 2: `views/HowItWorksPage.tsx:194` — section subtext**

```tsx
// before
            <p className="text-sm text-thistle-black/50 leading-relaxed max-w-md mx-auto mb-fl-6">
// after
            <p className="text-sm text-thistle-black/80 leading-relaxed max-w-md mx-auto mb-fl-6">
```

- [ ] **Step 3: `views/HowItWorksPage.tsx:177` — dark-bg item desc**

```tsx
// before
                  <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
// after
                  <p className="text-sm text-white/80 leading-relaxed">{item.desc}</p>
```

- [ ] **Step 4: `views/FeasibilityPackagePage.tsx:242` — hero subtext (dark bg)**

```tsx
// before
              <p className="text-fluid-lg text-white/60 leading-relaxed mb-fl-7 max-w-2xl">
// after
              <p className="text-fluid-lg text-white/80 leading-relaxed mb-fl-7 max-w-2xl">
```

- [ ] **Step 5: `views/FeasibilityPackagePage.tsx:264` — included item span (dark bg)**

```tsx
// before
                    <span className="text-sm text-white/70">{item}</span>
// after
                    <span className="text-sm text-white/80">{item}</span>
```

- [ ] **Step 6: `views/FeasibilityPackagePage.tsx:322` — body para (light bg)**

```tsx
// before
                <p className="text-sm text-thistle-black/60 leading-relaxed">
// after
                <p className="text-sm text-thistle-black/80 leading-relaxed">
```

- [ ] **Step 7: `views/FeasibilityPackagePage.tsx:337` — check item span (light bg)**

```tsx
// before
                    <span className="text-sm text-thistle-black/70">{check}</span>
// after
                    <span className="text-sm text-thistle-black/80">{check}</span>
```

- [ ] **Step 8: `views/FeasibilityPackagePage.tsx:355` — section subtext (dark bg)**

```tsx
// before
            <p className="text-sm text-white/50 leading-relaxed max-w-md mx-auto mb-fl-6">
// after
            <p className="text-sm text-white/80 leading-relaxed max-w-md mx-auto mb-fl-6">
```

- [ ] **Step 9: `views/AboutPage.tsx:102` — section subtext (dark bg)**

```tsx
// before
            <p className="text-sm text-white/50 leading-relaxed max-w-md mx-auto mb-fl-6">
// after
            <p className="text-sm text-white/80 leading-relaxed max-w-md mx-auto mb-fl-6">
```

- [ ] **Step 10: `views/CaseStudiesPage.tsx:90` — hero subtext (dark bg)**

```tsx
// before
            <p className="text-fluid-sm text-white/50 leading-relaxed max-w-md mx-auto mb-fl-6">
// after
            <p className="text-fluid-sm text-white/80 leading-relaxed max-w-md mx-auto mb-fl-6">
```

- [ ] **Step 11: `views/CaseStudyDetailPage.tsx:48` — back link (dark bg)**

```tsx
// before
            <Link href="/case-studies" className="inline-flex items-center gap-2 text-fluid-sm text-white/50 hover:text-white/80 transition-colors mb-fl-5">
// after
            <Link href="/case-studies" className="inline-flex items-center gap-2 text-fluid-sm text-white/80 hover:text-white transition-colors mb-fl-5">
```

- [ ] **Step 12: `views/CaseStudyDetailPage.tsx:57` — location p (dark bg)**

```tsx
// before
            <p className="text-fluid-sm text-white/50">{caseStudy.location}</p>
// after
            <p className="text-fluid-sm text-white/80">{caseStudy.location}</p>
```

- [ ] **Step 13: `views/BlogPage.tsx:45` — featured excerpt**

```tsx
// before
                  <p className="text-fluid-sm text-thistle-black/50 leading-relaxed mb-fl-5">{featured.excerpt}</p>
// after
                  <p className="text-fluid-sm text-thistle-black/80 leading-relaxed mb-fl-5">{featured.excerpt}</p>
```

- [ ] **Step 14: `views/BlogPage.tsx:85` — post excerpt**

```tsx
// before
                      <p className="text-fluid-sm text-thistle-black/50 leading-relaxed mb-fl-4">{post.excerpt}</p>
// after
                      <p className="text-fluid-sm text-thistle-black/80 leading-relaxed mb-fl-4">{post.excerpt}</p>
```

- [ ] **Step 15: `views/TermsPage.tsx:47` — section body**

```tsx
// before
              <p className="text-fluid-sm text-thistle-black/50 leading-relaxed">{s.body}</p>
// after
              <p className="text-fluid-sm text-thistle-black/80 leading-relaxed">{s.body}</p>
```

- [ ] **Step 16: `views/PrivacyPage.tsx:47` — section body**

```tsx
// before
              <p className="text-fluid-sm text-thistle-black/50 leading-relaxed">{s.body}</p>
// after
              <p className="text-fluid-sm text-thistle-black/80 leading-relaxed">{s.body}</p>
```

---

### Task 6: Footer.tsx — full text contrast pass

**Files:**
- Modify: `sections/Footer.tsx`

(Note: Footer's green CTA on line 52 already covered in Task 2, Step 2.)

- [ ] **Step 1: Lead paragraph (~line 42)**

```tsx
// before
            <p className="text-fluid-sm text-white/40 leading-relaxed max-w-md mx-auto mb-fl-7">
// after
            <p className="text-fluid-sm text-white/80 leading-relaxed max-w-md mx-auto mb-fl-7">
```

- [ ] **Step 2: Brand column subtext (~line 69)**

```tsx
// before
              <p className="text-fluid-sm text-white/30 leading-relaxed mb-fl-5">
// after
              <p className="text-fluid-sm text-white/80 leading-relaxed mb-fl-5">
```

- [ ] **Step 3: Email link (~line 72)**

```tsx
// before
              <a href="mailto:hello@thistlearchitecture.co.uk" className="text-fluid-sm text-white/50 hover:text-thistle-green transition-colors">
// after
              <a href="mailto:hello@thistlearchitecture.co.uk" className="text-fluid-sm text-white/80 hover:text-thistle-green transition-colors">
```

- [ ] **Step 4: "Navigate" eyebrow (~line 79)**

```tsx
// before
              <p className="text-[10px] uppercase tracking-widest text-white/20 font-semibold mb-fl-5">Navigate</p>
// after
              <p className="text-[10px] uppercase tracking-widest text-white/60 font-semibold mb-fl-5">Navigate</p>
```

- [ ] **Step 5: Nav links (~line 82) — use `replace_all: true` since both nav and legal links share the same className**

This step needs care: Footer.tsx has TWO sets of `<Link>` elements with the same className (`text-fluid-sm text-white/40 hover:text-white transition-colors`) — one set for nav, one for legal. Both should be bumped identically, so `replace_all` is correct.

```tsx
// before (appears 2x in file: line ~82 and ~94, identical)
                  <Link key={link.to} href={link.to} className="text-fluid-sm text-white/40 hover:text-white transition-colors">
// after (apply to both)
                  <Link key={link.to} href={link.to} className="text-fluid-sm text-white/80 hover:text-white transition-colors">
```

Use Edit with `replace_all: true`.

- [ ] **Step 6: "Legal" eyebrow (~line 91)**

```tsx
// before
              <p className="text-[10px] uppercase tracking-widest text-white/20 font-semibold mb-fl-5">Legal</p>
// after
              <p className="text-[10px] uppercase tracking-widest text-white/60 font-semibold mb-fl-5">Legal</p>
```

- [ ] **Step 7: Copyright (~line 109)**

```tsx
// before
            <span className="text-xs text-white/25">&copy; 2026 Thistle Architecture Ltd. Registered in England and Wales.</span>
// after
            <span className="text-xs text-white/60">&copy; 2026 Thistle Architecture Ltd. Registered in England and Wales.</span>
```

- [ ] **Step 8: LinkedIn social link (~line 112)**

```tsx
// before
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-xs text-white/25 hover:text-white/50 transition-colors">LinkedIn</a>
// after
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-xs text-white/70 hover:text-white transition-colors">LinkedIn</a>
```

- [ ] **Step 9: Instagram social link (~line 113)**

```tsx
// before
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xs text-white/25 hover:text-white/50 transition-colors">Instagram</a>
// after
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xs text-white/70 hover:text-white transition-colors">Instagram</a>
```

---

### Task 7: Build + verify

**Files:** none modified

- [ ] **Step 1: Run TypeScript + lint via next build**

Run: `cd "/Users/ak_mac_mini/Downloads/Projects/thistle live" && npm run build`
Expected: `✓ Compiled successfully`, no TypeScript errors, no lint errors.

If build fails, diagnose, fix the offending file, re-run. Common cause for failure here would be an Edit that left orphaned className syntax.

- [ ] **Step 2: Reload preview and check console**

Use `mcp__Claude_Preview__preview_eval` with `expression: "window.scrollTo(0, 0); window.location.reload(); 'reloading'"` then wait ~2s.
Then `mcp__Claude_Preview__preview_console_logs` with `level: "error"`.
Expected: "No console logs."

- [ ] **Step 3: Verify hero title is Title Case**

Use `mcp__Claude_Preview__preview_eval` with:
```js
document.querySelector('h1').textContent
```
Expected: `"From Building To Viable Conversion In 5 Days."`

- [ ] **Step 4: Capture hero screenshot (1280×800)**

If viewport not already 1280x800: `mcp__Claude_Preview__preview_resize` with `width: 1280, height: 800`.
Then `mcp__Claude_Preview__preview_screenshot`.
Expected: Title in Title Case, subtext darker than before, CTA shows bolder pure-black text on green, dark strip at bottom with bright "Planning success rate" label (not muted).

- [ ] **Step 5: Verify CTA contrast via inspect**

Use `mcp__Claude_Preview__preview_inspect` with selector `section button[class*="!bg-thistle-green"]` and styles `["color", "fontWeight"]`.
Expected: `color: rgb(0, 0, 0)` (pure black), `fontWeight: "600"` (semibold).

- [ ] **Step 6: Spot-check Process section body**

Use `mcp__Claude_Preview__preview_eval` to scroll to Process and check a step description's color:
```js
(() => { 
  const process = document.querySelectorAll('section')[1]; 
  process.scrollIntoView({ block: 'start', behavior: 'instant' }); 
  return new Promise(r => setTimeout(() => { 
    const desc = process.querySelector('p.text-fluid-sm'); 
    r({ text: desc?.textContent?.slice(0, 50), color: window.getComputedStyle(desc).color }); 
  }, 800));
})()
```
Expected: color shows roughly rgb(47, 59, 54) at 80% blend ≈ darker than before (the previous /50 would have been close to rgb(141, 148, 145)).

---

### Task 8: Stage and request commit approval

**Files staged:**
- All 18 modified `.tsx` files
- New spec doc: `docs/superpowers/specs/2026-04-18-site-wide-contrast-pass-design.md`
- New plan doc: `docs/superpowers/plans/2026-04-18-site-wide-contrast-pass.md`

- [ ] **Step 1: Confirm git status**

Run: `cd "/Users/ak_mac_mini/Downloads/Projects/thistle live" && git status`
Expected: only the 18 modified .tsx files + 2 new docs appear in changes. Pre-existing untracked items (`.claude/`, `awesome-design-md-main/`, `public/Website Amends.pdf`, `public/meeting notes/`, `public/sample doc/`) remain untracked.

If anything unexpected appears, pause and ask the user.

- [ ] **Step 2: Stage explicitly**

Run:
```bash
cd "/Users/ak_mac_mini/Downloads/Projects/thistle live" && \
git add sections/Hero.tsx sections/Process.tsx sections/Benefits.tsx \
        sections/Difference.tsx sections/CaseStudies.tsx sections/FAQ.tsx \
        sections/Testimonials.tsx sections/CTABlock.tsx sections/Footer.tsx \
        views/HowItWorksPage.tsx views/FeasibilityPackagePage.tsx \
        views/AboutPage.tsx views/CaseStudiesPage.tsx views/CaseStudyDetailPage.tsx \
        views/BlogPage.tsx views/BlogPostPage.tsx views/PrivacyPage.tsx views/TermsPage.tsx \
        docs/superpowers/specs/2026-04-18-site-wide-contrast-pass-design.md \
        docs/superpowers/plans/2026-04-18-site-wide-contrast-pass.md
```

- [ ] **Step 3: Show user the staged file list and ask for explicit commit approval**

Show output of `git status` to user. Suggested commit message:

```
chore(contrast): site-wide WCAG-pass + hero typography polish

- Hero: Title Case headline, full-opacity subtext, contrast-passing CTA (text-black + semibold)
- Metrics strip: full-white labels, tertiary detail kept muted
- All 10 green CTAs: text-black + font-semibold (3.76:1 → 6.84:1 contrast)
- Body text site-wide: bumped /50 and /60 paragraphs to /80 across sections + view pages
- Footer: full text pass — lead, email, eyebrows, nav/legal/copyright/social all readable
- Eyebrows and in-mockup chrome explicitly preserved as deliberate hierarchy
```

Wait for "yes" / explicit approval from user before Step 4.

- [ ] **Step 4: Commit (only after explicit approval)**

```bash
cd "/Users/ak_mac_mini/Downloads/Projects/thistle live" && \
git commit -m "$(cat <<'EOF'
chore(contrast): site-wide WCAG-pass + hero typography polish

- Hero: Title Case headline, full-opacity subtext, contrast-passing CTA (text-black + semibold)
- Metrics strip: full-white labels, tertiary detail kept muted
- All 10 green CTAs: text-black + font-semibold (3.76:1 → 6.84:1 contrast)
- Body text site-wide: bumped /50 and /60 paragraphs to /80 across sections + view pages
- Footer: full text pass — lead, email, eyebrows, nav/legal/copyright/social all readable
- Eyebrows and in-mockup chrome explicitly preserved as deliberate hierarchy

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 5: Verify commit succeeded**

Run: `git log -1 --oneline && git status`
Expected: new commit shows in log; working tree clean apart from pre-existing untracked items.

---

## Self-Review

**1. Spec coverage** — checked each spec acceptance criterion against tasks:
- (1) Hero title Title Case → Task 1 step 1 ✓
- (2) Hero subtext full opacity → Task 1 steps 2, 3 ✓
- (3) Hero CTA pure black + semibold ≥6:1 → Task 1 step 4, verified Task 7 step 5 ✓
- (4) Metrics strip label full white → Task 1 step 5 ✓
- (5) All 10 green CTAs consistent → Task 2 (9 instances) + Task 1 step 4 (Hero) ✓
- (6) Body paragraphs at /80 site-wide → Task 3 (sections light bg), Task 4 (CTABlock dark bg), Task 5 (view pages) ✓
- (7) Footer text pass → Task 6 ✓
- (8) Build passes + no console errors → Task 7 steps 1, 2 ✓
- (9) Eyebrows preserved → no task touches eyebrow opacities (only changes are explicitly listed) ✓
- (10) In-mockup chrome preserved → no task touches FeasibilityEngine or CaseStudies mockup classes ✓

**2. Placeholder scan** — no TBD/TODO/"appropriately handle" found. All steps include exact before/after code blocks.

**3. Type consistency** — all class strings preserve surrounding classes (e.g., `text-fluid-sm`, `leading-relaxed`, `mb-fl-X`). Tailwind opacity values used: `/60`, `/70`, `/80` — all valid Tailwind class fragments. Color names (`text-thistle-black`, `text-white`, `text-black`, `text-thistle-green`) all valid per `tailwind.config.ts`. The mechanical CTA replacement string is consistent across all 10 instances (Task 2 Step 9 verifies via grep that none are missed).
