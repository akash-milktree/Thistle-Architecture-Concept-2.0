import type { Metadata } from 'next';
import { BlogPage } from '@/views/BlogPage';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights, guides, and industry updates on commercial conversions, planning, and property feasibility.',
  alternates: { canonical: '/blog' },
};

export default function Page() {
  return <BlogPage />;
}
