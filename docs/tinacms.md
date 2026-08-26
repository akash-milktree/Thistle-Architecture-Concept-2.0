# TinaCMS — setup, running it, and deploying it

Editorial copy across the site is edited through TinaCMS with visual (click-to-edit) editing: open
`/admin`, click text on the live preview, and that field focuses in the sidebar.

This document is for whoever maintains the site. It records what was set up, the decisions that
are not obvious from the code, and the two or three things that will waste a day if you do not
know them.

---

## Running it locally

```bash
npm run dev
```

That runs `tinacms dev -c "next dev"`: the site on `:3000`, Tina's content API on `:4001`, and the
editor at `http://localhost:3000/admin`.

Locally Tina runs in **local mode** — no login, and edits are written straight to `content/**.json`
on disk. That is deliberate: you can edit, see the diff in git, and commit it like any other
change. Cloud mode is only used on deployed environments.

`npm run dev:next` starts Next on its own, without Tina. The site renders fine (every component
keeps its previous copy as a fallback), but `/admin` will not work and pages will fail to
prerender if they are rebuilt, because the content API is not running.

### When you change `tina/config.ts` or any collection

**Restart the dev server.** The schema is compiled at startup and a running server will not pick up
a new or renamed field. If the editor complains about a schema mismatch, this is almost always why.

### Windows: ports stuck after a crash

The Tina CLI spawns a datalayer server on `:9000` that can outlive an interrupted run and then
holds the port against the next one (`Tina Dev server is already in use`).

```bash
Get-NetTCPConnection -LocalPort 3000,4001,9000 -State Listen | %{ Stop-Process -Id $_.OwningProcess -Force }
```

---

## Building

```bash
npm run build:local
```

Use this for a full production build on your machine. It starts the Tina content API, waits for it,
runs `next build` against it, and cleans up the process tree afterwards.

You cannot just run `next build`. Pages that read from the CMS call the content API while
prerendering, and with nothing listening on `:4001` the export fails with `ECONNREFUSED`.

`npm run build` is the **deploy** command (`tinacms build && next build`). It needs TinaCloud
credentials — `tinacms build` performs a cloud auth check and exits non-zero without them, **even
with `--local`**. That is why `build:local` exists as the credential-free path.

---

## Deploying

`NEXT_PUBLIC_TINA_CLIENT_ID` and `TINA_TOKEN` must be set in Vercel for both Production and
Preview, from the project at app.tina.io with the GitHub repo connected.

Two things that catch people out:

- **`tina/config.ts` reads `VERCEL_GIT_COMMIT_REF`**, so a preview deployment edits *its own
  branch* and production edits `main`. A branch has to be indexed in TinaCloud before its preview
  will work.
- **A schema change needs a reindex** of the branch in TinaCloud. Adding `ui.router` does not
  (that is editor UI, not content), but adding or renaming a field does.

`content/**` is committed and is the source of truth. `tina/__generated__` and `public/admin` are
build output and are gitignored — `tinacms build` regenerates both. `tina/tina-lock.json` **is**
committed; TinaCloud needs it.

---

## Decisions worth knowing

### React is pinned at 18.3.1, not 18.2.0

`@tinacms/cli` and `@tinacms/app` both require `react >=18.3.1`. `tinacms` itself declares a
permissive `>=16.14.0`, so checking that package alone reports success and hides the problem.

Do **not** resolve a peer conflict here with `--legacy-peer-deps`: `@tinacms/app` lists React as a
*direct* dependency, so npm nests a second copy while the root stays behind. Two Reacts in one tree
shows up as invalid-hook-call failures inside the admin SPA rather than as an install error.

No React 19 migration is needed. 18.3.1 is a patch release inside React 18.

### Media is repo-based, and uploads go to their own folder

`tina/config.ts` sets `media.tina` with `mediaRoot: 'images/uploads'`, so uploads land in the repo
and content stores a relative `/images/uploads/...` path.

This is not a stylistic preference. **Rendering keys off the image path**: case-study images are
laid out `object-contain` on white when they are architectural drawings and `object-cover` on tint
when they are photographs. An absolute CDN URL fails that test silently and crops every drawing —
no 404, no error. Keeping paths relative avoids the whole class of problem.

`mediaRoot` deliberately points at a *new* folder rather than `public/images`. The rest of that
tree is a curated, hand-optimised 50MB set; exposing it in the media browser would let an editor
overwrite a prepared drawing and would show them 54 unreferenced orphan files.

`assets.tina.io` is allowlisted in `next.config.ts` `images.remotePatterns` for one reason only:
while the editor is open, TinaCloud serves a just-uploaded file from its CDN before the save
round-trips to git. Committed content should never point there. `normalizeImage()` in `lib/tina.ts`
maps any such URL back to a repo path — it is the **only** copy, so import it rather than writing
another.

> **Known gap.** `scripts/optimise-media.mjs` enforces the size and format budget on
> `public/images` (3840px cap, optimise over 200KB, WebP over 500KB). It is macOS-only — it shells
> out to Clop and `sips` — and is run by hand, so anything uploaded through the CMS bypasses it
> entirely. Porting it to `sharp` and running it over `public/images/uploads` in CI is the fix.

### What is deliberately *not* editable

Editorial copy is editable everywhere. Configuration and functional UI stay in code, because an
edit to one of these breaks something without it being visible on the page:

| | Why |
|---|---|
| Calculator formulas, rates, thresholds | An editor could silently produce a wrong valuation |
| Form labels, placeholders, validation, button states | Functional UI — breaking it breaks lead capture |
| Route paths and slugs | Blog and case-study slugs are `source` values in the ~50 redirects in `next.config.ts`; renaming one breaks inbound SEO links |
| Analytics IDs, the Vimeo id, the Trustpilot URL | Configuration |
| `order` / `featured` flags, lookup keys | Structural, not editorial |

Contact details **are** editable, and the displayed text and the `mailto:`/`tel:` href are derived
from one field so they cannot drift apart. If the phone number is ever swapped for a call-tracking
number, move it back into code.

Lookup keys that must exist in the sidebar are rendered read-only by `joinKeyField()`
(`tina/fields.tsx`). Changing one would not error — it would silently stop that row's edits from
applying, which reads as "my edit didn't save".

### Trustpilot reviews

`content/reviews/*.json` holds five real, published, attributed reviews. The quotes are verbatim
excerpts. Editing the wording publishes a fabricated quote under a real person's name, so the field
descriptions say so where an editor will read them.

---

## What is in the CMS

15 collections, 77 documents.

| Collection | Documents | Covers |
|---|---|---|
| `settings` | 1 | Nav labels, closing CTA band, footer, contact details — appears on every page |
| `home` | 1 | Hero, logo strip, example projects, process |
| `about` | 1 | Hero, intro, themes, stats, the six-person team, closing |
| `feasibilityPackage` | 2 | The package page and the post-payment confirmation page |
| `pricing` | 1 | Hero, products, inclusions, FAQs |
| `contact` | 1 | Hero, the three enquiry routes, the expert-session card |
| `conversionsIndex` | 1 | The /conversions overview |
| `conversion` | 5 | One per sector page |
| `listings` | 3 | Blog index and the two case-study index pages |
| `caseStudy` | 35 | Feasibility studies and completed projects |
| `post` | 14 | Blog articles |
| `tool` | 3 | Copy around the three calculators (not their maths) |
| `legal` | 3 | Terms, privacy, cookies |
| `reviews` | 5 | The Trustpilot reviews |
| `teamReview` | 1 | The internal photography comparison page |

## How the code is arranged

Every editable page is two halves:

- **`src/app/**/page.tsx` — server.** Fetches the raw `{ query, variables, data }` and passes it
  down. Keeps `metadata` / `generateMetadata`, `generateStaticParams`, `dynamicParams`, `notFound()`
  and JSON-LD.
- **`views/*Page.tsx` — client.** Calls `useTina`, which returns the server data verbatim on the
  public site and the live form values inside the editor, then maps it onto section props.

Sections take their copy as props with the previous hardcoded strings kept as a fallback const,
merged with `pruneEmpty()`. A component rendered without CMS props is byte-identical to before, so
nothing half-migrated can render blank.

Field markers follow two rules that account for most click-to-edit bugs:

1. **Put `data-tina-field` on the element that renders that field**, never on a wrapper. Tina
   resolves a click by walking *up* the DOM with `closest()`, so a marker on a wrapper captures
   every click inside it and the wrong field opens.
2. **Mark each list item, not the list.** `f(items[i], 'title')`, never `f(page, 'items')` —
   marking the list gives Tina no way to know which item you meant, so it opens an empty form.

A page with **zero** markers is a trap: Tina switches click-to-edit off when the preview lands on
one, and does not switch it back on until it reaches a marked page. The global chrome (nav, closing
CTA, footer) is CMS-driven from `content/settings/index.json` through `layouts/PageShell.tsx`,
which puts markers on every route and makes that unreachable.

`useTina` must be called unconditionally — hooks cannot be conditional — so views call it with the
shared `EMPTY_QUERY` constant when their prop is absent. Import that constant; do **not** build an
empty query object in the component body. `useTina` memoises on the identity of `data` and calls
`setData` from an effect keyed on it, so a fresh `{}` each render makes that effect fire every
render, and anything else triggering a re-render turns it into an unbounded loop.
