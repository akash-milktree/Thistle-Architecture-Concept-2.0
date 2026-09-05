import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { OurWorkPage } from '@/views/OurWorkPage';
import { getCompletedProjects, getFeasibilityStudies } from '@/lib/caseStudies';

// /case-studies used to redirect to the feasibility listing, so "Our Work" in
// the nav and "View All Our Work" on the homepage both landed on a page called
// Feasibility Studies (item 95 of Ed's September 2026 list). It is now the
// hub the label promises: the two listings, with a count and a cover for each.
//
// The old ?view= links are still honoured, so anything already shared lands in
// the right place.
export const metadata: Metadata = {
  title: 'Our Work',
  description:
    'Feasibility studies and completed projects by Thistle Architecture: HMOs, co-living, commercial conversions and high-end residential across the UK.',
  alternates: { canonical: '/case-studies' },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view } = await searchParams;
  if (view === 'projects') redirect('/case-studies/completed-projects');
  if (view === 'feasibility') redirect('/case-studies/feasibility-studies');

  const [studies, projects] = await Promise.all([getFeasibilityStudies(), getCompletedProjects()]);
  return <OurWorkPage studies={studies} projects={projects} />;
}
