import type { Metadata } from 'next';
import { GDVCalculatorPage } from '@/views/tools/GDVCalculatorPage';
import { getToolBySlug } from '@/data/toolsData';

const tool = getToolBySlug('gdv-calculator');

const CANONICAL = '/tools/gdv-calculator';

// metaTitle already ends in "| Thistle Architecture"; `absolute` stops
// layout.tsx's title template appending the suffix a second time.
export const metadata: Metadata = tool
  ? { title: { absolute: tool.metaTitle }, description: tool.metaDescription, alternates: { canonical: CANONICAL } }
  : { title: { absolute: 'GDV & Viability Calculator | Thistle Architecture' }, alternates: { canonical: CANONICAL } };

export default function Page() {
  return <GDVCalculatorPage />;
}
