"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useTina } from 'tinacms/dist/react';
import { PageHero } from '../components/ui/PageHero';
import { Reveal } from '../components/animations/Reveal';
import { conversions } from '../data/conversionsData';
import { f, type TinaQuery, EMPTY_QUERY } from '../lib/tina-fields';
import { str, arr, pruneEmpty } from '../lib/tina';

// Ed's August 2026 final brief, section 06: "If the parent navigation item is
// retained, make it a simple Expertise overview rather than effectively
// dropping users straight into Commercial-to-Residential." This is that
// overview: a card per sector, driven by the sector records themselves so a new
// sector (like Co-Living & Large HMO) appears here automatically, and so a
// sector renamed on its own page is renamed here too.
//
// This page's own header lives in the Expertise Overview document; the cards
// belong to the five sectors and are edited on their own pages.

const HERO_FALLBACK = {
  label: 'Expertise',
  heading: 'Feasibility, By Sector.',
  description:
    'The same feasibility-first approach, applied to the risks and planning routes specific to each type of scheme.',
};

interface ExpertiseOverviewPageProps {
  /** This page's own copy, from the `conversionsIndex` singleton. */
  page?: TinaQuery;
  /** All five sector records, for the cards. */
  sectors?: TinaQuery;
}

export const ExpertiseOverviewPage: React.FC<ExpertiseOverviewPageProps> = ({ page, sectors }) => {
  // useTina cannot be called conditionally, so the hooks run against the shared
  // stub when the props are absent and the results are discarded below.
  const { data: livePage } = useTina(page ?? EMPTY_QUERY);
  const { data: liveSectors } = useTina(sectors ?? EMPTY_QUERY);

  const p = page ? (livePage as any)?.conversionsIndex : undefined;

  const hero = { ...HERO_FALLBACK, ...pruneEmpty({
    label: str(p?.hero?.label),
    heading: str(p?.hero?.heading),
    description: str(p?.hero?.description),
  }) };

  // The cards are built by walking the records in code and picking up each
  // one's CMS document by slug, rather than by walking the CMS connection.
  // Two reasons: the connection comes back in filename order, which is not the
  // order these are meant to read in, and the order of the five is layout
  // rather than copy so it stays in code. A sector with no document yet simply
  // keeps its standing copy.
  const nodes = new Map<string, any>(
    arr<any>((liveSectors as any)?.conversionConnection?.edges)
      .map((e: any) => e?.node)
      .filter(Boolean)
      .map((n: any) => [str(n?._sys?.filename), n] as [string, any])
      .filter(([slug]) => !!slug),
  );
  const cards = conversions.map((x) => {
    const n = nodes.get(x.slug);
    return {
      slug: x.slug,
      label: x.label,
      heading: x.heroHeading,
      description: x.heroDescription,
      ...pruneEmpty({
        label: str(n?.hero?.label),
        heading: str(n?.hero?.heading),
        description: str(n?.hero?.description),
      }),
      tina: {
        label: f(n?.hero, 'label'),
        heading: f(n?.hero, 'heading'),
        description: f(n?.hero, 'description'),
      },
    };
  });

  return (
    <>
      <PageHero
        label={hero.label}
        heading={hero.heading}
        description={hero.description}
        tina={{
          label: f(p?.hero, 'label'),
          heading: f(p?.hero, 'heading'),
          description: f(p?.hero, 'description'),
        }}
      />

      <section className="px-fl-margin py-fl-section bg-thistle-white">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-fl-5">
          {cards.map((c, i) => (
            <Reveal key={c.slug} delay={Math.min(i * 0.06, 0.3)} fullHeight>
              <Link href={`/conversions/${c.slug}`} className="block h-full group">
                {/* Each marker sits on the element rendering that one field,
                    never on the card: the card is a wrapper, and a marker there
                    would capture every click inside it. Clicking a marked line
                    in the editor opens that sector's own form instead of
                    following the link, which is what you want while editing. */}
                <div className="h-full flex flex-col rounded-2xl border border-thistle-black/[0.06] bg-white p-fl-7 transition-colors duration-300 group-hover:border-thistle-green/30">
                  <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-3" data-tina-field={c.tina.label}>{c.label}</p>
                  <h2 className="text-fluid-h4 font-medium tracking-tight leading-tight text-thistle-black mb-fl-3" data-tina-field={c.tina.heading}>
                    {c.heading}
                  </h2>
                  <p className="text-fluid-sm text-thistle-black/60 leading-relaxed flex-1 mb-fl-5" data-tina-field={c.tina.description}>
                    {c.description}
                  </p>
                  {/* No marker: this line is assembled from the sector name
                      rather than being a field of its own. */}
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-thistle-black group-hover:text-thistle-green transition-colors">
                    Explore {c.label}
                    <ArrowUpRight size={15} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
};
