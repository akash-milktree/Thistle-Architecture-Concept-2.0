# Navbar — Centred Nav + CTA Polish — Design Spec

**Date:** 2026-04-18
**Status:** Approved approach (Approach 1 — grid layout); pending implementation
**Files touched:** `components/ui/Navbar.tsx`

---

## Problem

Three small navbar issues:

1. **Nav menu items are left-grouped with the logo**, not visually centred. Current structure flexes the logo and nav links together as one left group, with the CTA on the right (`justify-between`). The user wants the nav links visually centred in the navbar bar.
2. **CTA hover state isn't on-brand.** Current hover flips the white button to dark `thistle-black` with white text. The user wants the hover to be `thistle-pink` (`#DAAEBB`), matching the brand's secondary accent and creating a softer, warmer interaction.
3. **CTA is missing the arrow icon.** Every other "Start Feasibility" CTA on the site uses `<ArrowUpRight />` — the navbar CTA is plain text, breaking visual consistency.

## Goals

- Nav links (`Visibility Package`, `How It Works`, `Our Work`, `About`) sit visually centred in the navbar at desktop sizes.
- CTA hover background is `thistle-pink`; text and arrow stay `thistle-black` for legibility on the soft pink (contrast ratio is fine — pink #DAAEBB against thistle-black #2F3B36).
- CTA carries the same `<ArrowUpRight size={16} />` icon as every other Start Feasibility CTA, sized to match the `sm` button.
- Mobile behaviour unchanged (hamburger menu).

## Non-Goals

- Don't change the navbar's dark background, fixed positioning, scroll-hide behaviour, or mobile menu.
- Don't change the nav link list, copy, or routes.
- Don't touch other CTAs across the site.

## Approach (Approach 1 — 3-column grid)

### Layout change

Replace the current flex structure:
```jsx
<div className="...flex items-center justify-between...">
  <div className="flex items-center gap-8">
    <Link>logo</Link>
    <div className="hidden md:flex ...">nav links</div>
  </div>
  <div className="flex items-center gap-4">
    <Button>Start Feasibility</Button>
    <button>mobile toggle</button>
  </div>
</div>
```

With a 3-column grid:
```jsx
<div className="...grid grid-cols-3 items-center...">
  <div className="flex items-center">
    <Link>logo</Link>
  </div>
  <div className="hidden md:flex items-center justify-center gap-fl-6 ...">
    nav links
  </div>
  <div className="flex items-center justify-end gap-4">
    <Button>Start Feasibility</Button>
    <button>mobile toggle</button>
  </div>
</div>
```

The middle column stays mathematically centred (true centre of the 1360px container), independent of logo or CTA width changes. On mobile the middle column is hidden via `hidden md:flex` — grid still works, the middle col simply collapses to its content (none).

### CTA hover + icon change

Current Button props:
```jsx
<Button
  size="sm"
  variant="primary"
  className="!bg-white !text-thistle-black !border-white hover:!bg-thistle-black hover:!text-white hover:!border-thistle-black"
  onClick={openModal}
>
  Start Feasibility
</Button>
```

New Button props:
```jsx
<Button
  size="sm"
  variant="primary"
  icon={<ArrowUpRight size={16} />}
  className="!bg-white !text-thistle-black !border-white hover:!bg-thistle-pink hover:!text-thistle-black hover:!border-thistle-pink"
  onClick={openModal}
>
  Start Feasibility
</Button>
```

Two changes only:
- Add `icon={<ArrowUpRight size={16} />}` (the Button component already supports the `icon` prop and renders it after children with `ml-2` spacing).
- Hover override: `hover:!bg-thistle-pink hover:!text-thistle-black hover:!border-thistle-pink` (text stays `thistle-black` matching the default state for legibility on the soft pink — the only thing changing is the background and border to pink).

`ArrowUpRight` is already imported at the top of `Navbar.tsx`? — **needs to be added** to the lucide-react import. Currently only `Menu, X` are imported from lucide.

## Acceptance criteria

1. At desktop (≥md breakpoint), the nav links sit visually centred in the navbar bar (true horizontal centre of the 1360px-max container).
2. Logo is left-aligned at the left edge of the container; CTA + mobile toggle are right-aligned.
3. CTA button has the `ArrowUpRight` icon visible to the right of "Start Feasibility" (with `ml-2` spacing per Button component default).
4. Hovering the CTA: background becomes `thistle-pink` (`#DAAEBB`), border matches, text and arrow stay `thistle-black`.
5. Mobile (<md): nav links remain hidden, hamburger toggle still works, mobile menu unchanged.
6. No console errors; navbar still hides on scroll-down past 150px and shows on scroll-up.
7. Logo and CTA don't visually move horizontally vs. the prior layout.

## Risks / things to watch

- **Grid column overflow at narrow desktop widths.** At desktop widths ≥1024px, columns are ~340px each (1024 / 3). Logo takes ~180px, CTA + toggle ~140px — both fit in their columns. Centre column has ample room for 4 nav links (~360px). At widths between 1024px and the md breakpoint (768px), this still holds. No expected overflow.
- **Pink contrast on hover.** `#DAAEBB` (pink) against `#2F3B36` (thistle-black) text/icon: WCAG AA contrast ratio is roughly 5.2:1 — passes for normal text. Acceptable.
- **The `icon` prop and the existing `className` work together.** Button component places `icon` inside a `<span className="ml-2">` after children. Existing className overrides only affect the button itself, not the icon span. Should render correctly.
