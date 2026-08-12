"use client";

import React from 'react';
import { PageHero } from '../components/ui/PageHero';
import { Reveal } from '../components/animations/Reveal';
import { feasibilityStudies } from '../data/caseStudiesData';
import { CaseCard } from '../sections/CaseStudies';
import { WorkTabs } from '../components/ui/WorkTabs';

// Feasibility studies, on their own page. This and Completed Projects used to be
// two tabs on one /case-studies page switched by a ?view= param. Ed asked for
// separate pages so each has its own URL and can be linked to directly.
export const FeasibilityStudiesPage: React.FC = () => (
  <>
    <PageHero
      label="Our Work"
      heading="Feasibility Studies."
      description="Buildings we have tested for developers: the question asked, the analysis run, and the answer given."
    />

    <section className="px-fl-margin bg-thistle-white pb-fl-6">
      <div className="max-w-[1360px] mx-auto">
        <WorkTabs active="feasibility" />
      </div>
    </section>

    <section className="pb-fl-section px-fl-margin bg-thistle-white">
      <div className="max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fl-5">
          {feasibilityStudies.map((item, i) => (
            <Reveal key={item.slug} delay={Math.min(i * 0.06, 0.3)}>
              <CaseCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  </>
);
