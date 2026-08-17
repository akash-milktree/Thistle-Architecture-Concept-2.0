import type { Metadata } from 'next';
import { HMOCalculatorPage } from '@/views/tools/HMOCalculatorPage';
import { getToolBySlug } from '@/data/toolsData';

const tool = getToolBySlug('hmo-calculator');

const CANONICAL = '/tools/hmo-calculator';

export const metadata: Metadata = tool
  ? { title: tool.metaTitle, description: tool.metaDescription, alternates: { canonical: CANONICAL } }
  : { title: 'HMO Valuation Calculator | Thistle Architecture', alternates: { canonical: CANONICAL } };

export default function Page() {
  return <HMOCalculatorPage />;
}
