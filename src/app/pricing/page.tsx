import type { Metadata } from 'next';
import { PricingPage } from '@/views/PricingPage';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Fixed-fee feasibility pricing: a £15.99 HMO check, a £49.99 automated site appraisal, and architect-led feasibility from £298. Get your price on screen in about a minute.',
  alternates: { canonical: '/pricing' },
};

export default function Page() {
  return <PricingPage />;
}
