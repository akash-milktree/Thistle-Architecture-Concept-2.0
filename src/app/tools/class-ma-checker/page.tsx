import type { Metadata } from 'next';
import { ClassMACheckerPage } from '@/views/tools/ClassMACheckerPage';
import { getToolBySlug } from '@/data/toolsData';

const tool = getToolBySlug('class-ma-checker');

const CANONICAL = '/tools/class-ma-checker';

// metaTitle already ends in "| Thistle Architecture"; `absolute` stops
// layout.tsx's title template appending the suffix a second time.
export const metadata: Metadata = tool
  ? { title: { absolute: tool.metaTitle }, description: tool.metaDescription, alternates: { canonical: CANONICAL } }
  : { title: { absolute: 'Class MA Eligibility Checker | Thistle Architecture' }, alternates: { canonical: CANONICAL } };

export default function Page() {
  return <ClassMACheckerPage />;
}
