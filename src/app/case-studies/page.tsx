import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CaseStudiesPage } from '@/views/CaseStudiesPage';

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Explore our portfolio of successful commercial conversions, HMOs, and high-end residential projects.',
};

export default function Page() {
  // The view reads the ?view= param, which needs a Suspense boundary so the
  // rest of the page still prerenders statically instead of bailing to client
  // rendering. Fallback is null: the hero and grid paint in the same frame.
  return (
    <Suspense fallback={null}>
      <CaseStudiesPage />
    </Suspense>
  );
}
