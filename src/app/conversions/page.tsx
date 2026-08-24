import type { Metadata } from 'next';
import { ExpertiseOverviewPage } from '@/views/ExpertiseOverviewPage';

export const metadata: Metadata = {
  title: 'Expertise',
  description: 'Feasibility-first architecture across commercial to residential, HMO, co-living and large HMO, mixed-use, and high-end residential.',
  alternates: { canonical: '/conversions' },
};

export default function Page() {
  return <ExpertiseOverviewPage />;
}
