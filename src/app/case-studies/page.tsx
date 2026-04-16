import type { Metadata } from 'next';
import { CaseStudiesPage } from '@/views/CaseStudiesPage';

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Explore our portfolio of successful commercial conversions, HMOs, and high-end residential projects.',
};

export default function Page() {
  return <CaseStudiesPage />;
}
