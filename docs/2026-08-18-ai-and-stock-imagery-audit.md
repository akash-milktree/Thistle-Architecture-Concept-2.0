# AI and stock imagery on the site: what is actually there

Ed asked why there are still AI images on the website, and whether some are
stock. This is the audit, before any changes.

Checked three ways rather than by eye alone: the commit that introduced the
files, `public/images/LICENCES.md`, and where each file is referenced in code.

## The short answer

**Four AI-generated images are live, across three pages.** Eight more sit in the
repo unused. One stock photo is live, in the footer of every page. Everything
else on the site is real: Ed's own photography, client drawings, or the drone
footage.

## Confirmed AI generated

`public/images/generated/` was added in commit `f50cb7e`, whose message says
plainly: **"added Higgsfield-generated on-brand photography"**. `LICENCES.md`
agrees:

| File | Source | Licence |
|---|---|---|
| `generated/*.jpg` | Higgsfield (AI generated for this project) | Generated, owned |

Twelve files. **Four are in use:**

| Page | File | Where it appears |
|---|---|---|
| `/feasibility-package` | `package-hero.jpg` | **Full-bleed hero, top of the page** |
| `/about` | `site-visit.jpg` | "Who we are" section |
| `/conversions/hmo` | `layer-density.jpg` | HMO Checker section |
| `/conversions/commercial-to-residential` | `office-exterior.jpg` | Extra section, used as the fallback when no image is set |

The other eight are unused and can simply be deleted: `desk-plans`,
`layer-comparables`, `layer-gdv`, `layer-layout`, `layer-planning`,
`layer-policy`, `report-hands`, `terrace-scaffold`.

**The two most visible are the worst.** `package-hero` is the hero of the
feasibility page, which is the page the whole funnel points at. And
`layer-density` does not survive a close look at all: it is meant to be a
top-down aerial of terraced streets and is actually an incoherent repeating
texture of building facades. `site-visit` has the classic tell of mangled hands
on the drawing the two figures are holding.

## Confirmed stock

| File | Source | Licence | Where |
|---|---|---|---|
| `site/cta-band.webp` | Pexels photo 13266684 | Pexels License, free to use, no attribution required | Footer CTA band on **every page**, plus the hero of the buying-vs-building post |

It is a real photograph and properly licensed, so it is not a legal problem. It
is a brand question: whether a generic stock rooftop belongs on every page of an
architecture practice's site.

## Everything else is real

| Folder | What it is |
|---|---|
| `team/` | Client supplied, Ed's own photos of the team |
| `projects/` | Client supplied drawings and project photography |
| `blog/` and `blog/inline/` | Ed's own originals, recovered from the Wix archive |
| `deliverables/` | Screenshots of real feasibility report pages |
| `site/hero-winchester.jpg` | Frame from the client's own drone footage |

## This has come up before

Commit `08ee4b3`, 12 August, records the same complaint about the blog:

> Ed said the blog images were wrong and that he had never seen them: they were
> generated stock rather than the pictures from the original site.

That was fixed. All ten Wix-era posts were restored to Ed's own photography,
pulled from archived snapshots. **No blog post is on an AI image today.**

What was not covered then is what Ed is seeing now: the four non-blog placements
above. So this is the same issue, in the part of the site that round missed.

## What replacing them needs

Nothing in the repo is a good substitute. The unused real assets are blog inline
images and a sample report page, none of which suit a hero or an about-page
section.

Three options, in order of preference:

1. **Real photography from Ed.** Best answer, and consistent with how the blog
   images were fixed. Needs: a site visit or two, the team on site, and a
   street-level shot of a commercial building. Ed may already have these.
2. **Repurpose existing project photography.** We hold real photography for
   several completed projects. Weaker for the About page, which wants people
   rather than buildings, but workable for the conversion pages.
3. **Redesign the sections without a photograph.** The feasibility hero could
   carry type and the drone footage already used on the homepage. This removes
   the problem rather than solving it, but it is honest and needs nothing from
   Ed.

## Open questions

- **Ed:** can you supply real photography for the four placements, or should we
  redesign around what we have?
- **Ed:** the Pexels rooftop in the footer, keep or replace? It is licensed and
  fine, just generic.
- Whichever way it goes, delete the eight unused generated files.
