import type { Metadata } from 'next';
import { FeasibilityConfirmedPage } from '@/views/FeasibilityConfirmedPage';

// Not indexed: it is the tail of a paid transaction, has no value in search,
// and should never be a landing page.
export const metadata: Metadata = {
  title: 'Feasibility booked',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <FeasibilityConfirmedPage />;
}
