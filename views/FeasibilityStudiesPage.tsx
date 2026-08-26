"use client";

import React from 'react';
import { useTina } from 'tinacms/dist/react';
import { PageHero } from '../components/ui/PageHero';
import { Reveal } from '../components/animations/Reveal';
import { feasibilityStudies, type CaseStudy } from '../data/caseStudiesData';
import { CaseCard } from '../sections/CaseStudies';
import { WorkTabs } from '../components/ui/WorkTabs';
import { f, type TinaQuery, EMPTY_QUERY } from '../lib/tina-fields';
import { str, pruneEmpty } from '../lib/tina';

// The standing copy, kept in code as the fallback so the page renders exactly
// as before when it is mounted without a CMS query, and so a field an editor
// has cleared leaves the page reading properly rather than blank. Same merge as
// sections/Footer.tsx.
const COPY_FALLBACK = {
  label: 'Our Work',
  heading: 'Feasibility Studies.',
  description: 'Buildings we have tested for developers: the question asked, the analysis run, and the answer given.',
};

interface FeasibilityStudiesPageProps {
  /**
   * This page's own copy, from content/listings/feasibility-studies.json,
   * passed straight through from the server page so useTina can re-run it live
   * inside the editor. Optional so the page still renders without it.
   */
  page?: TinaQuery;
  /**
   * The studies to list. Defaults to the data module, so a page that passes
   * nothing renders exactly as before.
   *
   * THIS IS THE HOOK-IN POINT for the case studies collection. When the studies
   * are in Tina, the server page fetches the connection and passes the mapped
   * records here; each one goes straight to CaseCard, so once CaseCard carries
   * a per-record `tina` bag (the way sections/Testimonials.tsx does for
   * ReviewItem) the ids ride along on the item with no change in this file.
   * CaseCard is shared with the homepage and is not edited here.
   */
  items?: CaseStudy[];
}

// Feasibility studies, on their own page. This and Completed Projects used to be
// two tabs on one /case-studies page switched by a ?view= param. Ed asked for
// separate pages so each has its own URL and can be linked to directly.
export const FeasibilityStudiesPage: React.FC<FeasibilityStudiesPageProps> = ({
  page,
  items = feasibilityStudies,
}) => {
  // useTina returns the server data verbatim on the public site and swaps in
  // the live form values inside the editor. Passing a null-ish query is not
  // allowed, and hooks cannot be called conditionally, so it runs against a
  // stub when the prop is absent and the result is discarded below.
  const { data: live } = useTina(page ?? EMPTY_QUERY);
  const cms = page ? (live as any)?.listings : undefined;

  // Spread over the fallbacks with pruneEmpty, exactly as the footer does: a
  // field the editor has cleared comes back as '' and would otherwise blank the
  // page, so an empty field simply leaves the standing copy in place.
  const copy = { ...COPY_FALLBACK, ...pruneEmpty({
    label: str(cms?.hero?.label),
    heading: str(cms?.hero?.heading),
    description: str(cms?.hero?.description),
  }) };

  return (
    <>
      <PageHero
        label={copy.label}
        heading={copy.heading}
        description={copy.description}
        // Unlike the blog index, nothing is appended to this paragraph, so the
        // <p> renders exactly the field and can carry its marker.
        tina={{
          label: f(cms?.hero, 'label'),
          heading: f(cms?.hero, 'heading'),
          description: f(cms?.hero, 'description'),
        }}
      />

      <section className="px-fl-margin bg-thistle-white pb-fl-6">
        <div className="max-w-[1360px] mx-auto">
          {/* The two tab labels are shared with Completed Projects and repeat
              the Our Work menu, so they stay in code with the rest of the
              navigation rather than being editable twice. */}
          <WorkTabs active="feasibility" />
        </div>
      </section>

      <section className="pb-fl-section px-fl-margin bg-thistle-white">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fl-5">
            {items.map((item, i) => (
              <Reveal key={item.slug} delay={Math.min(i * 0.06, 0.3)}>
                <CaseCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
