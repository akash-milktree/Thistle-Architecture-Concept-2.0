import type { Metadata } from 'next';
import { Suspense } from 'react';
import { FeasibilityStudiesPage } from '@/views/FeasibilityStudiesPage';

export const metadata: Metadata = {
  title: 'Feasibility Studies',
  description: 'Buildings Thistle Architecture has tested for developers: the question asked, the analysis run, and the answer given.',
  alternates: { canonical: '/case-studies/feasibility-studies' },
};

export default function Page() {
  return (
    <Suspense>
      <FeasibilityStudiesPage />
    </Suspense>
  );
}
