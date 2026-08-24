import type { Metadata } from 'next';
import { HMOCalculatorPage } from '@/views/tools/HMOCalculatorPage';
import { getToolBySlug } from '@/data/toolsData';

const tool = getToolBySlug('hmo-calculator');

const CANONICAL = '/tools/hmo-calculator';

// metaTitle already ends in "| Thistle Architecture"; `absolute` stops
// layout.tsx's title template appending the suffix a second time.
export const metadata: Metadata = tool
  ? { title: { absolute: tool.metaTitle }, description: tool.metaDescription, alternates: { canonical: CANONICAL } }
  : { title: { absolute: 'HMO Valuation Calculator | Thistle Architecture' }, alternates: { canonical: CANONICAL } };

export default function Page() {
  return <HMOCalculatorPage />;
}
