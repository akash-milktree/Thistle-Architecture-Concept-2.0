# TinaCMS Visual (Click-to-Edit) Editing — Complete Setup Guide

A practical, battle-tested guide to adding TinaCMS **visual editing** (click any text on your
live page → the right field focuses in the sidebar) to a Next.js site.

Everything here was learned by shipping it end-to-end on a real production site
(Next.js 16 + React 19 + Tailwind), including the mistakes. **Read §3 and §11 before you start** —
they'll save you the two days that the gotchas cost.

---

## Contents

1. [What you're building (and the trade-off)](#1-what-youre-building-and-the-trade-off)
2. [How Tina's click-to-edit actually works](#2-how-tinas-click-to-edit-actually-works)
3. [The five gotchas that will bite you](#3-the-five-gotchas-that-will-bite-you)
4. [Install & scripts](#4-install--scripts)
5. [Schema + `ui.router` (so the editor can preview each page)](#5-schema--uirouter)
6. [The data layer (server) and the config/editorial split](#6-the-data-layer-and-the-configeditorial-split)
7. [The page pattern: server `page.tsx` → client `*-visual.tsx`](#7-the-page-pattern)
8. [Granular field markers (the core of click-to-edit)](#8-granular-field-markers)
9. [Lists & repeatable items](#9-lists--repeatable-items)
10. [Cross-collection sections (cards that edit their own document)](#10-cross-collection-sections)
11. [Images: the CDN trap](#11-images-the-cdn-trap)
12. [What NOT to make click-to-edit](#12-what-not-to-make-click-to-edit)
13. [Deployment: Tina Cloud + Vercel](#13-deployment-tina-cloud--vercel)
14. [Verification checklist](#14-verification-checklist)
15. [Troubleshooting](#15-troubleshooting)
16. [Performance impact (measured)](#16-performance-impact-measured)
17. [Rollout order](#17-rollout-order)

---

## 1. What you're building (and the trade-off)

TinaCMS gives you two editing experiences:

| | **Form-based** | **Visual (click-to-edit)** |
|---|---|---|
| Editing | Sidebar forms at `/admin` | Click text on the live preview → its field focuses |
| Page components | Stay **server** components | Content becomes **client**-hydrated (`useTina`) |
| Setup effort | Low | Moderate (this guide) |
| Client JS | Baseline | **~+3.5% First Load JS** (measured, see §16) |
| First paint / LCP | — | **Unchanged** (pages still prerender to static HTML) |

**The trade-off is real but small.** Click-to-edit requires the content to hydrate on the client,
so the section components move into the client bundle. First paint and runtime responsiveness are
unchanged; only time-to-interactive shifts by a few kilobytes (gzipped). For a marketing site this
is almost always worth it.

**Versions this was built against:**

```
tinacms      ^3.10.0
@tinacms/cli ^2.5.3
next         16.2.9   (App Router, Turbopack)
react        19.2.4
```

---

## 2. How Tina's click-to-edit actually works

Understanding this is the difference between "it mysteriously stopped working" and a five-minute
fix. Source: `node_modules/tinacms/dist/react.js` and `@tinacms/bridge/dist/metadata.js`.

**a) `useTina` attaches metadata to your data.**
`addMetadata()` walks the query result recursively — through **arrays and nested objects** — and
stamps every object with `_content_source: { queryId, path }`. This is why you can mark not just
the page document but **individual list items and connection nodes** (see §9, §10).

**b) `tinaField(obj, "field")` reads that metadata** and returns an id string like:

```
t5ypcv---home.hero.heading
└─ queryId ─┘└─── path ───┘
```

You render it as `data-tina-field={...}` on the element.

**c) In the editor iframe, Tina adds a capture-phase click listener** on `document`:

```js
// paraphrased from tinacms/dist/react.js
document.addEventListener("click", (e) => {
  let fieldName = e.target.getAttribute("data-tina-field");
  if (!fieldName) {
    const ancestor = e.target.closest("[data-tina-field], [data-tina-field-overlay]");
    fieldName = ancestor?.getAttribute("data-tina-field");
  }
  if (fieldName) {
    e.preventDefault();      // ← this is why marked links don't navigate in edit mode
    e.stopPropagation();
    parent.postMessage({ type: "field:selected", fieldName }, origin);
  }
}, true);
```

Two consequences you must internalise:

- **Resolution walks *up* the DOM** (`closest`). The marker on the *nearest ancestor* wins, so a
  marker on a wrapper `<div>` captures every click inside it.
- **A marked element does not navigate** in edit mode (`preventDefault`). This is a feature — use
  it to make cards editable instead of navigating away.

**d) Quick-edit auto-disables on unmarked pages.** After each data update Tina does:

```js
const anyTinaField = document.querySelector("[data-tina-field]");
parent.postMessage({ type: "quick-edit", value: !!anyTinaField }, origin);
```

> **This is the single most confusing behaviour.** If the preview navigates to a page with **zero**
> `data-tina-field` markers, Tina turns click-to-edit **off**. It does not turn itself back on until
> it lands on a marked page again. See gotcha #1.

---

## 3. The five gotchas that will bite you

Ranked by how much time they cost.

### #1 — "Click-to-edit works once, then stops"

**Cause:** you clicked an *unmarked* link (a card, a CTA, a nav item). The preview navigated to a
page with no markers → Tina disabled quick-edit (§2d).

**Fix:** two parts.
- **Mark every page** you can navigate to, so you never land on a marker-less page.
- **Mark navigable cards/buttons** whose *content* is editable. Because Tina calls `preventDefault()`
  on marked elements, a marked card **edits instead of navigating** — which is what you want.

### #2 — "Clicking a FAQ opens a blank Question/Answer form"

**Cause:** you marked the whole **list** (`tinaField(page, "faqs")`) instead of the individual item.
Tina can't tell *which* item you meant, so it opens an empty one.

**Fix:** mark each item's field: `tinaField(page.faqs[i], "q")` → resolves to `home.faqs.0.q`. See §9.

### #3 — "Images 404 / show placeholders in production but work locally"

**Cause:** in **cloud mode**, Tina Cloud serves `image` fields as CDN URLs. If your photos live in
the repo (`/public/images`) rather than Tina's media store, **those URLs 404**. Local mode returns
`/images/…` paths, so you never see it until you deploy. See §11 — this is the one that hit us in
production.

### #4 — "The build crashes with `Cannot read properties of null (reading 'useContext')`"

**Cause:** Tina's documented `tinacms build --local -c "next build"` runs `next build` as a **child**
process, which duplicates React. Prerendering any client component then explodes. (Next 16 / React 19.)

**Fix:** see §4 — run the Tina server in the background and `next build` as a **top-level** process.

### #5 — "The editor shows a GraphQL schema mismatch"

**Cause:** you changed `tina/config.ts` (added/removed a field).

**Fix:**
- **Locally:** restart the Tina dev server (it regenerates the client + types).
- **In Tina Cloud:** **reindex** the branch.

> Adding `ui.router` does **not** change the content schema — it's editor UI only. But any
> `tina/config.ts` edit still needs a local dev-server restart to be picked up.

---

## 4. Install & scripts

```bash
npm install tinacms @tinacms/cli
```

`package.json`:

```json
{
  "scripts": {
    "dev": "tinacms dev -c \"next dev\"",
    "build": "tinacms build && next build",
    "build:local": "node scripts/build-local.mjs",
    "start": "tinacms build && next start",
    "lint": "eslint"
  }
}
```

- `dev` → site on `:3000`, Tina GraphQL on `:4001`, editor at `/admin` in **local mode** (no login,
  writes JSON to `content/**` on disk).
- `build` → **production/cloud** mode. `next build` is top-level, so it works. Needs Tina Cloud creds.
- `build:local` → full production build **locally**, no cloud creds. Works around gotcha #4.

**`scripts/build-local.mjs`** — start the Tina server, wait for `:4001`, then run `next build` as
its own top-level process:

```js
import { spawn, execSync } from "node:child_process";

const isWin = process.platform === "win32";
const npx = isWin ? "npx.cmd" : "npx";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const serverReady = async () => {
  try {
    const r = await fetch("http://localhost:4001/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: "{ __typename }" }),
    });
    return r.ok;
  } catch { return false; }
};

const tina = spawn(npx, ["tinacms", "dev", "--noTelemetry"], { stdio: "inherit", shell: true });
const cleanup = () => {
  try {
    if (isWin && tina.pid) execSync(`taskkill /F /T /PID ${tina.pid}`, { stdio: "ignore" });
    else tina.kill("SIGKILL");
  } catch { /* ignore */ }
};
process.on("SIGINT", () => { cleanup(); process.exit(1); });

(async () => {
  let up = false;
  for (let i = 0; i < 60; i++) { if (await serverReady()) { up = true; break; } await wait(1000); }
  if (!up) { console.error("Tina local server did not come up on :4001"); cleanup(); process.exit(1); }
  const build = spawn(npx, ["next", "build"], { stdio: "inherit", shell: true });
  build.on("exit", (code) => { cleanup(); process.exit(code ?? 0); });
})();
```

**`next.config.ts`** — clean `/admin` URL + allow Tina's media CDN for `next/image`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { remotePatterns: [{ protocol: "https", hostname: "assets.tina.io" }] },
  async rewrites() {
    // Tina ships the editor as a static SPA at /admin/index.html
    return [{ source: "/admin", destination: "/admin/index.html" }];
  },
};
export default nextConfig;
```

**`.gitignore`**

```
tina/__generated__
public/admin
```

---

## 5. Schema + `ui.router`

`ui.router` maps a document → the URL the editor should preview. **Without it, clicking a document
in `/admin` shows a form with no live preview.** Add one to *every* collection you want visually
editable.

```ts
// tina/config.ts
import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";

export default defineConfig({
  branch,
  // Undefined locally → local mode (writes to disk, no login).
  // Set in prod → cloud mode (commits to GitHub via Tina Cloud).
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: { outputFolder: "admin", publicFolder: "public" },
  media: { tina: { mediaRoot: "images", publicFolder: "public" } },
  schema: {
    collections: [
      // Singleton page → a fixed URL
      {
        name: "home",
        label: "Home Page",
        path: "content/home",
        format: "json",
        ui: { allowedActions: { create: false, delete: false }, router: () => "/" },
        fields: [ /* … */ ],
      },

      // Repeatable docs → URL derived from the filename
      {
        name: "service",
        label: "Services",
        path: "content/services",
        format: "json",
        ui: { router: ({ document }) => `/services/${document._sys.filename}` },
        fields: [ /* … */ ],
      },

      // Legal pages living at the site root: /cookies, /privacy-policy, …
      {
        name: "legal",
        label: "Legal Pages",
        path: "content/legal",
        format: "json",
        ui: { router: ({ document }) => `/${document._sys.filename}` },
        fields: [ /* … */ ],
      },
    ],
  },
});
```

> **Rule:** make the content **filename equal the URL slug**. Then `document._sys.filename` is your
> router and you never have to reconcile two sources of truth.

**Sections whose headings are hardcoded aren't editable.** If your FAQ section renders a literal
`"Frequently asked questions"`, add real fields for it (`faqEyebrow`, `faqHeading`) — otherwise
editors will click it and nothing happens. Audit every visible string for a backing field.

---

## 6. The data layer and the config/editorial split

**Split your content before you write any Tina code.** This is the highest-leverage decision.

- **Config (stays in code, NOT editable):** deploy URL, analytics IDs, `tel:` href (often a tracked
  DNI number), company registration, opaque third-party deep links. Put these in `lib/config.ts`.
- **Editorial (goes into Tina):** all marketing copy, headings, images, FAQs, reviews, areas.

Why: high-fan-out leaf components (a `<Button>` used 12×) can keep importing plain constants
instead of prop-drilling CMS data through your whole tree.

Then build a **cached server data layer** that normalises Tina's nullable responses:

```ts
// lib/tina.ts
import { cache } from "react";
import client from "@/tina/__generated__/client";

const str = (v: unknown): string => (typeof v === "string" ? v : "");
const list = <T,>(v: readonly T[] | null | undefined): T[] => (Array.isArray(v) ? (v as T[]) : []);

export const getSettings = cache(async () => {
  const res = await client.queries.settings({ relativePath: "index.json" });
  const s = res.data.settings;
  return { name: str(s?.name), /* … */ };
});
```

Server components call these directly. **Client components receive data as props** — they cannot
call the server client.

---

## 7. The page pattern

Every visually-editable page becomes **two files**:

1. A thin **server** `page.tsx` that fetches the *raw* query (`query` + `variables` + `data`).
2. A **client** `*-visual.tsx` wrapper that calls `useTina` and marks fields.

Keep `generateMetadata`, `generateStaticParams`, `dynamicParams`, and JSON-LD in the **server** file.

```tsx
// app/page.tsx  (server)
import type { Metadata } from "next";
import client from "@/tina/__generated__/client";
import { HomeVisual } from "./home-visual";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default async function Home() {
  // Raw queries so the client can re-run them live inside the editor.
  const [home, settings, services] = await Promise.all([
    client.queries.home({ relativePath: "index.json" }),
    client.queries.settings({ relativePath: "index.json" }),
    client.queries.serviceConnection(),
  ]);

  return (
    <HomeVisual
      home={{ query: home.query, variables: home.variables, data: home.data }}
      settings={{ query: settings.query, variables: settings.variables, data: settings.data }}
      services={{ query: services.query, variables: services.variables, data: services.data }}
    />
  );
}
```

```tsx
// app/home-visual.tsx  (client)
"use client";
import { useTina, tinaField } from "tinacms/dist/react";
import { Hero } from "@/components/sections/Hero";

/* eslint-disable @typescript-eslint/no-explicit-any */
const str = (v: any): string => (typeof v === "string" ? v : "");
const arr = (v: any): any[] => (Array.isArray(v) ? v : []);

/** tinaField id, coerced to undefined so React omits the attribute when unavailable. */
const f = (obj: any, key: string): string | undefined => {
  try { return tinaField(obj, key) || undefined; } catch { return undefined; }
};

type Q = { query: string; variables: object; data: any };

export function HomeVisual({ home }: { home: Q }) {
  const { data: live } = useTina(home);   // returns initial data publicly, live data in the editor
  const h = live.home;

  return (
    <Hero
      eyebrow={str(h.hero?.eyebrow)}
      heading={str(h.hero?.heading)}
      lede={str(h.hero?.lede)}
      tina={{
        eyebrow: f(h.hero, "eyebrow"),
        heading: f(h.hero, "heading"),
        lede: f(h.hero, "lede"),
      }}
    />
  );
}
```

**Dynamic routes** keep working — fetch the raw doc by `relativePath` and keep the mapped getter for
JSON-LD / `notFound()`:

```tsx
export const dynamicParams = false;
export async function generateStaticParams() {
  return (await getServices()).map((s) => ({ slug: s.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mapped = await getService(slug);        // for JSON-LD + notFound
  if (!mapped) notFound();
  const raw = await client.queries.service({ relativePath: `${slug}.json` });
  return <ServiceDetailVisual service={{ query: raw.query, variables: raw.variables, data: raw.data }} />;
}
```

---

## 8. Granular field markers

> **The rule: put `data-tina-field` on the element that actually renders that field.**

A marker on a wrapper `<div>` captures every click inside it (§2c), so clicking the lede would focus
the heading. That "coarse" approach feels broken. Thread the ids down into your components.

Give shared components **optional** field-id props. Because React omits `undefined` attributes, every
page that doesn't pass them renders **byte-identically** — zero risk to your existing pages.

```tsx
// components/ui/Section.tsx
export function Eyebrow({ children, fieldId }: { children: React.ReactNode; fieldId?: string }) {
  return <p className="eyebrow" data-tina-field={fieldId}>{children}</p>;
}

export function SectionHeader({
  eyebrow, title, lede, fields,
}: {
  eyebrow?: string; title: React.ReactNode; lede?: React.ReactNode;
  fields?: { eyebrow?: string; title?: string; lede?: string };
}) {
  return (
    <div>
      {eyebrow && <Eyebrow fieldId={fields?.eyebrow}>{eyebrow}</Eyebrow>}
      <h2 data-tina-field={fields?.title}>{title}</h2>
      {lede && <p data-tina-field={fields?.lede}>{lede}</p>}
    </div>
  );
}
```

```tsx
// components/sections/Hero.tsx
export function Hero({ eyebrow, heading, lede, tina }: {
  eyebrow: string; heading: string; lede: string;
  tina?: { eyebrow?: string; heading?: string; lede?: string };
}) {
  return (
    <section>
      <Eyebrow fieldId={tina?.eyebrow}>{eyebrow}</Eyebrow>
      <h1 data-tina-field={tina?.heading}>{heading}</h1>
      <p data-tina-field={tina?.lede}>{lede}</p>
    </section>
  );
}
```

**Buttons and images** need the same treatment — forward the attribute:

```tsx
// Button: add to your props type so it flows through ...rest onto the <a>/<button>
type CommonProps = { "data-tina-field"?: string; /* … */ };

// Image wrapper: apply to the element that renders the photo
<div className="relative" data-tina-field={fieldId}><Image … /></div>
```

**Composed strings.** For `` `${service.eyebrow} · ${settings.region}` `` there is no single field.
Either (a) point the marker at the **primary** editable field (clicking it edits `service.eyebrow`),
or (b) leave it unmarked. Pick one convention and comment it. Never point a marker at a field the
element doesn't render — e.g. don't wrap `Last updated: {date}` in the `date` marker; wrap only the
value:

```tsx
<p>Last updated: <span data-tina-field={tina?.updated}>{updated}</span></p>
```

---

## 9. Lists & repeatable items

**Never mark the list itself** if the items are individually editable (gotcha #2). Because
`addMetadata` tags every array element, you can mark each one:

```tsx
// in the client wrapper: build a per-item id array
<FAQ
  items={arr(h.faqs).map((x: any) => ({ q: str(x?.q), a: str(x?.a) }))}
  itemFields={arr(h.faqs).map((x: any) => ({ q: f(x, "q"), a: f(x, "a") }))}
/>
```

```tsx
// components/sections/FAQ.tsx
export function FAQ({ items, itemFields }: {
  items: { q: string; a: string }[];
  itemFields?: { q?: string; a?: string }[];
}) {
  return (
    <>
      {items.map((item, i) => (
        <div key={i}>
          <button><span data-tina-field={itemFields?.[i]?.q}>{item.q}</span></button>
          <p data-tina-field={itemFields?.[i]?.a}>{item.a}</p>
        </div>
      ))}
    </>
  );
}
```

Clicking FAQ #3's question now resolves to `home.faqs.2.q` and drills straight into that item.

**When to mark the whole list instead:** when the items have no individually-clickable rendering
(e.g. a bullet list of plain strings). Then `data-tina-field={f(section, "points")}` on the `<ul>` is
correct — clicking any bullet opens the list editor.

---

## 10. Cross-collection sections

A "services grid" on the homepage renders documents from the **service** collection. You want
clicking a card to edit *that service*.

Since `addMetadata` tags connection nodes too, this just works — pass the connection query in and
`useTina` it:

```tsx
"use client";
import { useTina, tinaField } from "tinacms/dist/react";

export function ServicesGridVisual({ settings, services }: { settings: Q; services: Q }) {
  const { data: sData } = useTina(settings);   // section header lives on the settings doc
  const { data: svcData } = useTina(services); // the cards live on the service docs

  const head = sData?.settings?.sharedSections?.servicesGrid ?? {};
  const ordered = (svcData?.serviceConnection?.edges ?? [])
    .map((e: any) => e?.node).filter(Boolean)
    .sort((a: any, b: any) => (a?.order ?? 0) - (b?.order ?? 0));

  return (
    <section>
      <SectionHeader
        eyebrow={str(head.eyebrow)} title={str(head.title)} lede={str(head.lede)}
        fields={{ eyebrow: f(head, "eyebrow"), title: f(head, "title"), lede: f(head, "lede") }}
      />
      {ordered.map((s: any) => (
        <Link
          key={s.slug}
          href={`/services/${str(s.slug)}`}
          // marked → Tina preventDefault()s the click: edits instead of navigating
          data-tina-field={f(s, "navLabel")}
        >
          <h3 data-tina-field={f(s, "navLabel")}>{str(s.navLabel)}</h3>
          <p data-tina-field={f(s, "quote")}>{str(s.quote)}</p>
        </Link>
      ))}
    </section>
  );
}
```

Clicking a card focuses `Services › <that service> › Short label` in the sidebar and **does not
navigate** — because Tina `preventDefault()`s marked elements (§2c). That single line also cures
gotcha #1 for that card.

**Note:** the server component that fetched other collections can't do this (it isn't a client
component). Either convert it to a client variant like the above, or keep it server-rendered and
pass it in as a `ReactNode` "slot" — but then it stays non-editable and clicking it will navigate.

---

## 11. Images: the CDN trap

**This one shipped a broken production site.** Read it twice.

Your photos are committed to `/public/images` and served at `/images/…`. They are **not** in Tina's
media store. In **local mode**, Tina returns the raw stored value (`/images/hero.jpg`) so everything
works. In **cloud mode**, Tina Cloud rewrites `image` fields to its CDN:

```
https://assets.tina.io/<clientId>/<path>            ← current format
https://assets.tina.io/<id>/…/__file/<path>          ← older format
```

Both **404** for repo-committed files. Every image silently falls back to your placeholder.

**Fix: normalise any `assets.tina.io` URL back to the repo path.** Note the CDN path is relative to
your `mediaRoot`, so `/images/services/x.jpg` comes back as `…/<clientId>/services/x.jpg` — you
re-prepend `/images/`.

```ts
export function normalizeImage(v: unknown, fallback: string): string {
  const s = typeof v === "string" ? v.trim() : "";
  if (!s) return fallback;

  if (/^https?:\/\/assets\.tina\.io\//i.test(s)) {
    // Repo photos aren't in Tina's media store, so its CDN URLs 404 — map any
    // assets.tina.io URL (…/__file/<path> or <clientId>/<path>) back to /images/<path>.
    const file = s.match(/\/__file\/(.+)$/);
    const rest = (file ? file[1] : s.replace(/^https?:\/\/assets\.tina\.io\/[^/]+\//i, ""))
      .replace(/^\/+/, "")
      .replace(/^images\//, "");
    return `/images/${rest}`;
  }
  return s.startsWith("http") || s.startsWith("/") ? s : `/${s}`;
}
```

### Rules that make this survivable

1. **One copy only.** Export it from a single module and import it everywhere (server data layer
   *and* every client `*-visual.tsx`). We had five copies; fixing four of them and missing the fifth
   is exactly how this reaches production.
2. **Apply it to raw `useTina` data too.** The client wrappers receive the *un-normalised* value, so
   they must call it themselves — the server data layer's normalisation doesn't help them.
3. **You cannot reproduce this locally.** Local mode never emits CDN URLs. So **unit-test the
   normaliser** against real production URL samples:

```js
normalizeImage("https://assets.tina.io/abc/hero.jpg", "FB")            // → /images/hero.jpg
normalizeImage("https://assets.tina.io/abc/services/x.jpg", "FB")      // → /images/services/x.jpg
normalizeImage("https://assets.tina.io/x/__staging/main/__file/a.jpg") // → /images/a.jpg
normalizeImage("/images/hero.jpg", "FB")                              // → /images/hero.jpg (passthrough)
normalizeImage("", "FB")                                              // → FB
```

4. **After deploying, verify on the real site** — grep the HTML for `assets.tina.io` in `src=`
   attributes and curl the rendered image URLs expecting `200`:

```bash
curl -s https://your-site.com/ | grep -oE 'url=%2Fimages%2F[^"&]+' | sed 's/url=//; s/%2F/\//g' \
  | sort -u | while read p; do echo "$(curl -s -o /dev/null -w '%{http_code}' "https://your-site.com$p")  $p"; done
```

> Seeing `assets.tina.io` inside the serialized `useTina` **data** blob in your HTML is normal and
> harmless — that's the raw query result. What matters is that no `<img src>` points at it.

**If you'd rather editors upload images:** keep `remotePatterns` for `assets.tina.io` in
`next.config.ts` (as above) and *don't* normalise genuinely-uploaded media. The normaliser only
needs to catch paths that also exist in `/public/images`.

---

## 12. What NOT to make click-to-edit

Being selective is part of the design.

| Thing | Why | Do instead |
|---|---|---|
| **Multi-step forms / quote wizards** | Field labels are functional UI, not copy. Breaking them breaks conversions. | Leave entirely alone. |
| **`tel:` hrefs, analytics IDs** | Often swapped for tracked numbers at launch. An editor could silently break attribution. | Keep in `lib/config.ts`. |
| **Slugs** | Editing changes the live URL and breaks inbound links/SEO. | Editable in the form only, with a warning. |
| **Alt text, SEO title/description** | Not visible on the page, so there's nothing to click. | Editable in the sidebar form. |
| **Purely composed headings** | `"Surveys we provide in {area}"` maps to no single field. | Leave unmarked, or mark the interpolated field. |
| **`order` / `featured` flags** | Structural, not editorial. | Form only. |

---

## 13. Deployment: Tina Cloud + Vercel

1. At **app.tina.io**: create a project → connect the GitHub repo → authorize the GitHub app →
   set the tracked branch (usually `main`).
2. Copy the **Client ID** (public) and a **Read/Write Token** (secret).
3. **Vercel → Settings → Environment Variables** (Production *and* Preview):
   - `NEXT_PUBLIC_TINA_CLIENT_ID`
   - `TINA_TOKEN`
   Build command stays `npm run build` (`tinacms build && next build`).
4. Deploy. If the editor flags a schema mismatch, **reindex the branch** in Tina Cloud.
5. **Rotate the token** if it was ever pasted into a chat/ticket.

**Branch behaviour:** `tina/config.ts` reads `VERCEL_GIT_COMMIT_REF`, so preview deployments edit
*that branch* and production edits `main`. Preview branches get indexed automatically on push in most
setups; a schema change still wants an explicit reindex.

**What the production build actually needs:** it fetches content from Tina Cloud for the deployed
branch. A green build therefore proves your env vars *and* the branch index are working.

---

## 14. Verification checklist

Run all of these before you call it done.

```bash
# 1. Types
npx tsc --noEmit

# 2. Lint your own code (generated Tina types are @ts-nocheck by design)
npx eslint app components

# 3. Full production build — must prerender every static page
npm run build:local

# 4. Every route returns 200 and carries markers (dev server running)
for u in "" about contact services areas thank-you cookies; do
  code=$(curl -s -o /tmp/r.html -w "%{http_code}" "http://localhost:3000/$u")
  echo "/$u -> $code  markers=$(grep -o 'data-tina-field' /tmp/r.html | wc -l)"
done
```

Then **in the browser**:

- [ ] Open `/admin`, enter edit mode. The preview loads your page (proves `ui.router`).
- [ ] Click a **heading** → the *exact* field focuses (not the section).
- [ ] Click a **list item** (FAQ) → drills into *that* item, fields populated (not blank).
- [ ] Click a **card** → focuses that document's field, and **does not navigate**.
- [ ] Click a heading again afterwards → still works (quick-edit didn't disable).
- [ ] Type in a field → the preview updates **live**.
- [ ] Zero console errors on every route.
- [ ] **Forms still work** (quote/contact) and carry **zero** markers.
- [ ] After deploying: **images return 200** (§11), not placeholders.

---

## 15. Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Click-to-edit works once then stops | Preview navigated to a page with no `data-tina-field` → Tina disabled quick-edit | Mark every page; mark navigable cards (§3 #1) |
| Clicking a list item opens a blank form | You marked the list, not the item | Mark `tinaField(list[i], "field")` (§9) |
| Clicking the lede focuses the heading | Marker sits on a wrapper `<div>`; `closest()` walks up | Put the marker on the element that renders the field (§8) |
| Clicking a card navigates away | Card is unmarked | Add `data-tina-field` to the `<Link>` — Tina then `preventDefault()`s it (§10) |
| Editor shows a form but no live preview | Collection has no `ui.router` | Add one (§5) |
| `GraphQL schema mismatch` | `tina/config.ts` changed | Restart `tinacms dev` locally; **reindex** the branch in Tina Cloud |
| `Cannot read properties of null (reading 'useContext')` at build | `tinacms build -c "next build"` duplicates React | Use `scripts/build-local.mjs` (§4) |
| Build fails: `Missing clientId, token` | Cloud-mode build without env vars | Set them in Vercel, or use `build:local` |
| Images 404 / placeholders **only in production** | Tina Cloud rewrote `image` to a CDN URL that 404s | Normalise `assets.tina.io` → `/images/…` (§11) |
| Hardcoded heading isn't clickable | No CMS field backs it | Add the field to the schema (§5) |
| `/admin` returns 404 | Editor is a static SPA at `/admin/index.html` | Add the rewrite (§4) |
| Windows: ports 3000/4001 stuck after a crash | Orphaned node processes | `Get-NetTCPConnection -LocalPort 4001 -State Listen \| %{ Stop-Process -Id $_.OwningProcess -Force }` |

---

## 16. Performance impact (measured)

Measured by building the same site twice — server-component (form-based) vs client-hydrated
(visual editing):

| Metric | Form-based | Visual editing | Delta |
|---|---|---|---|
| **Homepage First Load JS** | ~811 KB | ~839 KB | **+28 KB (+3.5%)** uncompressed (~+8–10 KB gzipped) |
| Total JS, all routes | ~883 KB | ~1,087 KB | +204 KB (spread across per-page chunks) |
| Home HTML payload | 218 KB | 227 KB | +4.4% |
| List-page HTML (embeds all records) | 99 KB | 128 KB | +29% |
| Detail-page HTML | 145 KB | 130 KB | **−10%** |
| **First paint / LCP** | — | — | **Unchanged** (still prerendered static HTML) |
| **Runtime responsiveness** | — | — | **Unchanged** (`useTina` is inert on the public site) |

**Reading:** pages still prerender, so users see content at the same moment. Only *time to
interactive* shifts, by a few KB over the wire. `useTina` makes no network calls on the public site.
HTML payload is roughly a wash — list pages grow (they embed the records for editing), detail pages
often shrink.

---

## 17. Rollout order

Doing this in the wrong order creates avoidable rework.

1. **Split config vs editorial** (`lib/config.ts`). Do this first, before any Tina code.
2. **Schema + content migration.** Seed `content/**` from your existing data with a throwaway script
   so it's byte-accurate, then delete the script. Verify rendered output is **identical**.
3. **De-risk the toolchain.** Get `npm run dev` → `/admin` and `npm run build:local` green with a
   *single* field wired end-to-end, before touching the rest. This is your go/no-go gate.
4. **Add `ui.router` to every collection.**
5. **Shared foundation.** Add optional field-id props to leaves (`Eyebrow`, `SectionHeader`, image
   wrapper, `Button`) and build the **single** image normaliser.
6. **Cross-collection client variants** (services grid, areas band, trust bar, final CTA).
7. **Page by page:** server `page.tsx` + client `*-visual.tsx`, marking fields granularly.
8. **Verify** (§14), including a deployed check of images (§11).

**Two habits that prevent most bugs:**

- After each page, curl it and count markers. A page with **zero** markers is a quick-edit trap (§3 #1).
- Never duplicate the image normaliser. One export, imported everywhere.

---

*Written from a real Next.js 16 / React 19 production rollout — including the image bug that reached
production and the click-to-edit behaviour that only makes sense once you've read
`tinacms/dist/react.js`.*
