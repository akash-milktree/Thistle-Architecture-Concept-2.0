# Rebrand article: handover for the HTML designers

Date: 24 August 2026
Source: Scarlett's approved article PDF (Thistle_Rebrand_Article_Scarlett_Updated)
Live on Thistle: https://www.thistlearchitecture.co.uk/blog/hmo-designers-thistle-architecture-rebrand

## What this is

Scarlett's rebrand announcement is now published on the Thistle Architecture site. If the same article goes on the HMO Designers site (or anywhere else), follow this document so the two copies do not compete in search.

## The one rule that matters for SEO

The Thistle page is the canonical version. Any second copy of this article MUST include this tag in the page `<head>`:

```html
<link rel="canonical" href="https://www.thistlearchitecture.co.uk/blog/hmo-designers-thistle-architecture-rebrand" />
```

Without it, Google sees two near-identical pages and may rank neither. With it, all ranking value flows to the Thistle page, which is the goal of the rebrand.

If the platform cannot set a canonical tag (some Wix plans cannot), publish a short teaser instead: the first two paragraphs plus a "Read the full announcement" link to the Thistle URL. Do not publish the full article without the canonical.

## Page metadata (use exactly)

| Field | Value |
|---|---|
| Title tag | HMO Designers is now Thistle Architecture \| News Updates |
| URL slug | /hmo-designers-thistle-architecture-rebrand |
| Meta description | HMO Designers is evolving into Thistle Architecture - the same HMO expertise, a broader architectural service and new data-led feasibility tools for property developers. |
| H1 (on page) | HMO Designers is now a part of Thistle Architecture |

## HTML structure

- One `<h1>` only (the headline above).
- Every section heading below is an `<h2>`. No `<h3>`s are needed.
- The two tables are real `<table>` elements, not images. Wrap each in a horizontally scrollable container for mobile.
- All links to thistlearchitecture.co.uk are normal followed links (no `rel="nofollow"`). They should pass value to the new brand.
- The closing line ("HMO Designers built the specialist knowledge...") is a bold standout paragraph (`<p><strong>`), not a heading.

## Section order (h2s)

1. (intro, two paragraphs, no heading)
2. Why the change?
3. HMO Designers is not disappearing
4. Our wider focus: making more of existing buildings
5. Where HMO Checker fits in
6. One connected approach (contains the three-brand table)
7. A clearer route from data to design (contains the pricing table)
8. What comes next

## The copy

Use Scarlett's PDF verbatim. The exact published version (identical copy) can be lifted from the live Thistle page above, or from `data/blog/hmo-designers-thistle-architecture-rebrand.ts` in this repo. One correction we applied: the PDF spells "Jodie" once in the Expert Session row; the correct spelling used site-wide is "Jodi".

## Table 1: One connected approach

| Brand | Role |
|---|---|
| Thistle Architecture | The architectural practice: feasibility, planning, design and technical delivery across HMOs, co-living, conversions, apartments, mixed-use and residential projects. |
| HMO Designers | The specialist HMO expertise and reputation built over hundreds of projects - now forming part of the wider Thistle Architecture offer. |
| HMO Checker | The separate SaaS platform focused on helping investors and developers source and assess HMO opportunities using data. |

## Table 2: A clearer route from data to design

| Price | Service | What it covers |
|---|---|---|
| £15.99 | HMO Checker | Automated HMO property screening for investors assessing a potential HMO opportunity. |
| £49.99 | Automated Site Feasibility | A wider data-led site appraisal for existing buildings, including HMOs, including planning, standards, indicative capacity, commercial context, risks and recommended next steps. |
| From £298 | Architectural Feasibility | The automated analysis plus architectural review, a sketch scheme, development layout and a one-hour meeting with an architect. Target turnaround: five working days. |
| Bespoke | Expert Session | Larger, land-led or unusually complex opportunities are reviewed with Jodi first through a free Expert Session before a bespoke feasibility proposal is issued. |

## Internal links to include

Where the copy mentions these, link them to the Thistle site:

- "architectural feasibility study" → https://www.thistlearchitecture.co.uk/feasibility-package
- "projects we are delivering across the UK" → https://www.thistlearchitecture.co.uk/case-studies/completed-projects

## Checklist before going live

- [ ] Canonical tag points at the Thistle URL (or teaser-only version used)
- [ ] Title tag, meta description and slug match the table above exactly
- [ ] One h1, section headings as h2
- [ ] Both tables render as HTML tables and scroll on mobile
- [ ] Links to thistlearchitecture.co.uk are followed (no nofollow)
- [ ] "Jodi" spelling used
- [ ] Page checked on mobile and desktop after publishing
