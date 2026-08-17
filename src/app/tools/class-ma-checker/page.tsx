import type { Metadata } from 'next';
import { ClassMACheckerPage } from '@/views/tools/ClassMACheckerPage';
import { getToolBySlug } from '@/data/toolsData';

const tool = getToolBySlug('class-ma-checker');

const CANONICAL = '/tools/class-ma-checker';

export const metadata: Metadata = tool
  ? { title: tool.metaTitle, description: tool.metaDescription, alternates: { canonical: CANONICAL } }
  : { title: 'Class MA Eligibility Checker | Thistle Architecture', alternates: { canonical: CANONICAL } };

export default function Page() {
  return <ClassMACheckerPage />;
}
