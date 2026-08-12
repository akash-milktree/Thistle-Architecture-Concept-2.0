import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CompletedProjectsPage } from '@/views/CompletedProjectsPage';

export const metadata: Metadata = {
  title: 'Completed Projects',
  description: 'Conversions and schemes delivered through to completion across the Thistle Group, filterable by conversion type.',
};

export default function Page() {
  return (
    <Suspense>
      <CompletedProjectsPage />
    </Suspense>
  );
}
