import type { Metadata } from 'next';
import { HMOCalculatorPage } from '@/views/tools/HMOCalculatorPage';
import { getToolBySlug } from '@/data/toolsData';

const tool = getToolBySlug('hmo-calculator');

export const metadata: Metadata = tool
  ? { title: tool.metaTitle, description: tool.metaDescription }
  : { title: 'HMO Valuation Calculator | Thistle Architecture' };

export default function Page() {
  return <HMOCalculatorPage />;
}
