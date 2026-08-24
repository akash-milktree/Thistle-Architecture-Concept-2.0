import type { Metadata } from 'next';
import { FeasibilityConfirmedPage } from '@/views/FeasibilityConfirmedPage';

// Not indexed: it is the tail of a paid transaction, has no value in search,
// and should never be a landing page.
export const metadata: Metadata = {
  title: 'Feasibility booked',
  robots: { index: false, follow: false },
};

// tier is a UI hint only, read from Stripe's success_url, not a payment
// confirmation: it only selects which copy and next-step list to show. The
// page still never treats being visited as proof of payment; that is the
// webhook's job alone. Anyone could add ?tier=automated to this URL and see
// nothing more than the automated copy on a page that assumes payment
// succeeded either way, same as before this param existed.
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ tier?: string }>;
}) {
  const { tier } = await searchParams;
  return <FeasibilityConfirmedPage tier={tier === 'automated' ? 'automated' : 'architectural'} />;
}
