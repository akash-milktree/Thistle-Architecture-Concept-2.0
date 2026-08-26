"use client";

import React from 'react';
import Image from 'next/image';
import { useTina } from 'tinacms/dist/react';
import { f, type TinaQuery, EMPTY_QUERY } from '../lib/tina-fields';
import { str, arr, pruneEmpty } from '../lib/tina';

/* eslint-disable @typescript-eslint/no-explicit-any */

// Internal review page, NOT linked from the site nav. Compares three options for
// each team headshot so Akash and Ed can pick before anything replaces the real
// /about photos. Deliberately excluded from search engines — the robots rule
// stays in src/app/team-review/page.tsx.
//
// The copy below is now a fallback rather than the page's only wording: the
// same strings also live in content/team-review/index.json, seeded byte-for-byte
// from what was here. They stay in code so the page renders unchanged if it is
// ever mounted without a CMS query.

interface Person {
  slug: string;
  name: string;
  /** CMS field ids for this one person. Per-item, never per-list. */
  tina?: Partial<Record<'name', string>>;
}

interface Column {
  key: string;
  label: string;
  note: string;
  tina?: Partial<Record<'label' | 'note', string>>;
}

// The rows and the columns are fixed by what exists in public/images/team-review/:
// every photo path is built by interpolation below, 5 slugs x 3 keys = 15 files.
// So the identity of each row lives here, in code, and the CMS supplies only the
// wording, matched back on slug/key. A row typed into the CMS that matches
// nothing here is ignored rather than rendered as a broken image.
const PEOPLE: Person[] = [
  { slug: 'ed', name: 'Edward Kercher' },
  { slug: 'kaan', name: 'Kaan' },
  { slug: 'jan', name: 'Jan' },
  { slug: 'adouj', name: 'Adouj Abu Saadeh' },
  { slug: 'beverley', name: 'Beverley Gibbs' },
];

const COLUMNS: Column[] = [
  {
    key: 'current',
    label: 'A. Current',
    note: 'What is live now: the original supplied photos, inconsistent framing and backgrounds.',
  },
  {
    key: 'real',
    label: 'B. Cleaned real photo',
    note: 'Their actual face, cut out and placed on one matched studio grey, uniform framing. Genuinely them.',
  },
  {
    key: 'ai',
    label: 'C. AI-generated',
    note: 'A synthetic studio headshot generated from their photo. Polished, but a regenerated likeness, not a real photo. Needs each person’s consent before publishing.',
  },
];

const COPY_FALLBACK = {
  eyebrow: 'Internal review, not public',
  heading: 'Team photo options',
  intro:
    'Three options for each person, side by side. Column B keeps their real face and just makes the set consistent. Column C is an AI-generated headshot, which looks the most polished but is a synthetic likeness rather than a real photograph, so it should only go live if each person is happy with it.',
  note: 'Nothing here is live on the site. The real About page still shows the current photos (column A).',
};

interface TeamReviewPageProps {
  /**
   * This page's own copy, from the `teamReview` singleton. The raw query,
   * variables and data are all passed through from the server page, not just
   * the data: useTina needs the query to re-run it against the editor's live
   * values. Optional so the page still renders if it is mounted without it.
   */
  page?: TinaQuery;
}

export const TeamReviewPage: React.FC<TeamReviewPageProps> = ({ page }) => {
  // useTina returns the server data verbatim on the public site and swaps in
  // the live form values inside the editor. Passing a null-ish query is not
  // allowed, so the hook runs against the shared stub when the prop is absent.
  const { data: livePage } = useTina(page ?? EMPTY_QUERY);
  const t = page ? (livePage as any)?.teamReview : undefined;

  // pruneEmpty, as everywhere else on the site: a field the editor has cleared
  // comes back as '' and would otherwise blank the page, so an empty field
  // simply leaves the standing copy in place.
  const copy = { ...COPY_FALLBACK, ...pruneEmpty({
    eyebrow: str(t?.eyebrow),
    heading: str(t?.heading),
    intro: str(t?.intro),
    note: str(t?.note),
  }) };

  // Matched on the identifier rather than taken wholesale, so the set of rows
  // stays tied to the image files. Each row carries its own field ids: an id
  // taken from the list itself would open an empty form instead of the row that
  // was clicked.
  const cmsColumns = arr<any>(t?.columns);
  const columns: Column[] = COLUMNS.map((c) => {
    const row = cmsColumns.find((x) => str(x?.key) === c.key);
    return {
      ...c,
      ...pruneEmpty({ label: str(row?.label), note: str(row?.note) }),
      tina: { label: f(row, 'label'), note: f(row, 'note') },
    };
  });

  const cmsPeople = arr<any>(t?.people);
  const people: Person[] = PEOPLE.map((p) => {
    const row = cmsPeople.find((x) => str(x?.slug) === p.slug);
    return {
      ...p,
      ...pruneEmpty({ name: str(row?.name) }),
      tina: { name: f(row, 'name') },
    };
  });

  return (
    <main className="bg-thistle-white min-h-screen px-fl-margin py-fl-section">
      <div className="max-w-[1360px] mx-auto">
        <p data-tina-field={f(t, 'eyebrow')} className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-3">{copy.eyebrow}</p>
        <h1 data-tina-field={f(t, 'heading')} className="text-fluid-h2 font-medium tracking-tight text-thistle-black mb-fl-4">{copy.heading}</h1>
        <p data-tina-field={f(t, 'intro')} className="text-fluid-base text-thistle-black/70 leading-relaxed max-w-3xl mb-fl-4">
          {copy.intro}
        </p>
        <p data-tina-field={f(t, 'note')} className="text-fluid-sm text-thistle-black/50 max-w-3xl mb-fl-8">
          {copy.note}
        </p>

        {/* Column key */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-fl-4 mb-fl-8">
          {columns.map((c) => (
            <div key={c.key} className="rounded-xl border border-thistle-black/[0.08] bg-white p-fl-5">
              <p data-tina-field={c.tina?.label} className="text-fluid-h6 font-semibold text-thistle-black mb-fl-2">{c.label}</p>
              <p data-tina-field={c.tina?.note} className="text-fluid-sm text-thistle-black/60 leading-relaxed">{c.note}</p>
            </div>
          ))}
        </div>

        <div className="space-y-fl-8">
          {people.map((p) => (
            <div key={p.slug}>
              <h2 data-tina-field={p.tina?.name} className="text-fluid-h5 font-medium tracking-tight text-thistle-black mb-fl-4">{p.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-fl-5">
                {columns.map((c) => (
                  <figure key={c.key} className="m-0">
                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-white border border-thistle-black/[0.08]">
                      {/* The path is a naming convention, not content: the 15
                          files are named <slug>-<key>.jpg. There is nothing an
                          editor could usefully change, so it is not a field. */}
                      <Image
                        src={`/images/team-review/${p.slug}-${c.key}.jpg`}
                        alt={`${p.name}, ${c.label} option`}
                        fill
                        sizes="(max-width: 640px) 90vw, 420px"
                        className="object-cover"
                      />
                    </div>
                    {/* Prints the column heading, so it is marked as that same
                        field: clicking any caption opens the column it belongs
                        to, which is where the wording is edited. */}
                    <figcaption data-tina-field={c.tina?.label} className="mt-fl-2 text-[11px] uppercase tracking-wider text-thistle-black/45 font-semibold">
                      {c.label}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
