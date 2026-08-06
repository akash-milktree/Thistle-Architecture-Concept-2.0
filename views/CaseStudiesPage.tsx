"use client";

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PageHero } from '../components/ui/PageHero';
import { Reveal } from '../components/animations/Reveal';
import { feasibilityStudies, completedProjects } from '../data/caseStudiesData';
import { CaseCard } from '../sections/CaseStudies';

type View = 'feasibility' | 'projects';

const TABS: { key: View; label: string; blurb: string }[] = [
  {
    key: 'feasibility',
    label: 'Feasibility Studies',
    blurb: 'Buildings we have tested for developers: the question asked, the analysis run, and the answer given.',
  },
  {
    key: 'projects',
    label: 'Completed Projects',
    blurb: 'Conversions and schemes delivered through to completion across the Thistle Group.',
  },
];

// Blog-like hub: one page, two categories, switchable like the blog filters.
export const CaseStudiesPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // The URL is the single source of truth for which tab is open.
  //
  // This used to be local state seeded once from window.location in a mount
  // effect. That broke the nav dropdown: going from /case-studies?view=projects
  // to /case-studies is a client-side navigation on the same route, so the
  // component never remounted, the effect never re-ran, and the tab stayed put.
  // Ed reported it twice before it was reproduced. Deriving straight from the
  // search params means the tab always matches the URL, and back/forward work.
  const view: View = searchParams.get('view') === 'projects' ? 'projects' : 'feasibility';

  const setView = (next: View) => {
    // scroll: false keeps the page still; the tabs sit above the grid, so
    // jumping to the top on every switch would be disorienting.
    router.push(next === 'projects' ? '/case-studies?view=projects' : '/case-studies?view=feasibility', {
      scroll: false,
    });
  };

  const items = view === 'feasibility' ? feasibilityStudies : completedProjects;
  const active = TABS.find((t) => t.key === view)!;

  return (
    <>
      <PageHero
        label="Our Work"
        heading="Studies And Schemes, Side By Side."
        description="Every feasibility we publish and every project the group has delivered, in one place. Pick a category to browse."
      />

      {/* Category tabs */}
      <section className="px-fl-margin bg-thistle-white pb-fl-6">
        <div className="max-w-[1360px] mx-auto">
          <div className="flex flex-wrap gap-fl-2 mb-fl-4">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setView(tab.key)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-colors ${
                  view === tab.key
                    ? 'bg-thistle-black text-white border-thistle-black'
                    : 'bg-white text-thistle-black/60 border-thistle-black/[0.08] hover:border-thistle-black/25'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <p className="text-fluid-sm text-thistle-black/55 max-w-xl">{active.blurb}</p>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-fl-section px-fl-margin bg-thistle-white">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fl-5">
            {items.map((item, i) => (
              <Reveal key={`${view}-${item.slug}`} delay={Math.min(i * 0.06, 0.3)}>
                <CaseCard item={item} />
              </Reveal>
            ))}
          </div>
          {view === 'projects' && (
            <p className="text-xs text-thistle-black/40 mt-fl-6 max-w-md">
              Some of these were delivered by HMO Designers, our sister practice within the Thistle Group. Each one says so on its own page.
            </p>
          )}
        </div>
      </section>
    </>
  );
};
