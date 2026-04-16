import type { Metadata } from 'next';
import { HowItWorksPage } from '@/views/HowItWorksPage';

export const metadata: Metadata = {
  title: 'How It Works',
  description: 'Our proven 4-step process for delivering data-driven feasibility studies across the UK.',
};

export default function Page() {
  return <HowItWorksPage />;
}
