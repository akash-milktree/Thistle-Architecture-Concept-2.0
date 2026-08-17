import type { Metadata } from 'next';
import { GDVCalculatorPage } from '@/views/tools/GDVCalculatorPage';
import { getToolBySlug } from '@/data/toolsData';

const tool = getToolBySlug('gdv-calculator');

const CANONICAL = '/tools/gdv-calculator';

export const metadata: Metadata = tool
  ? { title: tool.metaTitle, description: tool.metaDescription, alternates: { canonical: CANONICAL } }
  : { title: 'GDV & Viability Calculator | Thistle Architecture', alternates: { canonical: CANONICAL } };

export default function Page() {
  return <GDVCalculatorPage />;
}
