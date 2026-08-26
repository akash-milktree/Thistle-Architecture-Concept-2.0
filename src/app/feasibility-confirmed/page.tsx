import type { Metadata } from 'next';
import { FeasibilityConfirmedPage } from '@/views/FeasibilityConfirmedPage';
import client from '@/tina/__generated__/client';

// Not indexed: it is the tail of a paid transaction, has no value in search,
// and should never be a landing page. `robots` stays in code for that reason —
// it is a decision about the page, not copy, and there is nothing to gain from
// letting it be switched on by accident.
//
// This was a static `metadata` export. It has to run now, because the tab title
// is editable alongside the page copy and a static export cannot await. There
// is still no description, because a page hidden from search has nothing to
// describe.
export async function generateMetadata(): Promise<Metadata> {
  const confirmed = await client.queries.feasibilityPackage({ relativePath: 'confirmed.json' });

  return {
    title: confirmed.data.feasibilityPackage?.metaTitle || 'Feasibility booked',
    robots: { index: false, follow: false },
  };
}

// tier is a UI hint only, read from Stripe's success_url, not a payment
// confirmation: it only selects which copy and next-step list to show. The
// page still never treats being visited as proof of payment; that is the
// webhook's job alone. Anyone could add ?tier=automated to this URL and see
// nothing more than the automated copy on a page that assumes payment
// succeeded either way, same as before this param existed. Both sets of copy
// now come from the CMS, which changes none of that: code still picks.
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ tier?: string }>;
}) {
  // The raw query, variables and data are all handed down, not just the data:
  // useTina needs the query to re-run it against the editor's live values.
  const [{ tier }, confirmed] = await Promise.all([
    searchParams,
    client.queries.feasibilityPackage({ relativePath: 'confirmed.json' }),
  ]);

  return (
    <FeasibilityConfirmedPage
      tier={tier === 'automated' ? 'automated' : 'architectural'}
      page={{ query: confirmed.query, variables: confirmed.variables, data: confirmed.data }}
    />
  );
}
