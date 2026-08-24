"use client";

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PageHero } from '../components/ui/PageHero';
import { Reveal } from '../components/animations/Reveal';
import { completedProjects, type ConversionType } from '../data/caseStudiesData';
import { CaseCard } from '../sections/CaseStudies';
import { WorkTabs } from '../components/ui/WorkTabs';

// Sub-tabs by conversion type, per Ed: all four types, and a project shows under
// every type it fits rather than being forced into one.
//
// Only types that actually have projects are offered. Two of the four have none
// yet, and an empty tab reads as a broken filter rather than an honest gap.
const TYPES: { key: ConversionType; label: string }[] = [
  { key: 'commercial-to-residential', label: 'Commercial to Residential' },
  { key: 'hmo', label: 'HMO' },
  { key: 'co-living-large-hmo', label: 'Co-Living & Large HMO' },
  { key: 'mixed-use-commercial', label: 'Mixed-Use Commercial' },
  { key: 'high-end-residential', label: 'High-End Residential' },
];

export const CompletedProjectsPage: React.FC = () => {
  const searchParams = useSearchParams();

  // The URL drives the filter, so a filtered view can be linked to and the back
  // button works. Same lesson as the tab bug Ed reported twice: state seeded
  // once from the URL goes stale on client-side navigation.
  const raw = searchParams.get('type');
  const active: ConversionType | 'all' =
    TYPES.some((t) => t.key === raw) ? (raw as ConversionType) : 'all';

  const countFor = (key: ConversionType) =>
    completedProjects.filter((p) => p.conversionTypes?.includes(key)).length;
  const available = TYPES.filter((t) => countFor(t.key) > 0);

  const items =
    active === 'all'
      ? completedProjects
      : completedProjects.filter((p) => p.conversionTypes?.includes(active));

  const chip = (isActive: boolean) =>
    `px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
      isActive
        ? 'bg-thistle-green text-thistle-black border-thistle-green'
        : 'bg-white text-thistle-black/60 border-thistle-black/[0.08] hover:border-thistle-black/25'
    }`;

  return (
    <>
      <PageHero
        label="Our Work"
        heading="Completed Projects."
        description="Conversions and schemes delivered through to completion across the Thistle Group."
      />

      <section className="px-fl-margin bg-thistle-white pb-fl-6">
        <div className="max-w-[1360px] mx-auto">
          <WorkTabs active="projects" />

          <div className="flex flex-wrap gap-fl-2 mt-fl-5">
            <Link href="/case-studies/completed-projects" scroll={false} className={chip(active === 'all')}>
              All <span className="opacity-50">{completedProjects.length}</span>
            </Link>
            {available.map((t) => (
              <Link
                key={t.key}
                href={`/case-studies/completed-projects?type=${t.key}`}
                scroll={false}
                className={chip(active === t.key)}
              >
                {t.label} <span className="opacity-50">{countFor(t.key)}</span>
              </Link>
            ))}
          </div>
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
          <p className="text-xs text-thistle-black/40 mt-fl-6 max-w-md">
            Some of these were delivered by HMO Designers, our sister practice within the Thistle Group. Each one says so on its own page.
          </p>
        </div>
      </section>
    </>
  );
};
