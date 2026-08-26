import type { Metadata } from 'next';
import { Suspense } from 'react';
import { FeasibilityStudiesPage } from '@/views/FeasibilityStudiesPage';
import client from '@/tina/__generated__/client';

export async function generateMetadata(): Promise<Metadata> {
  // This was a static `metadata` export. It has to run now, because the search
  // listing is editable alongside the page copy and a static export cannot
  // await. The values in code stay as the fallback for a field an editor has
  // cleared, which keeps a blank box out of Google, and the canonical stays in
  // code because it is the route, not copy.
  //
  // metaTitle stays a plain string, not `{ absolute: ... }`: layout.tsx's
  // template appends "| Thistle Architecture", and this page has always relied
  // on that. The field description tells the editor to type the page name only,
  // for the same reason.
  const listing = await client.queries.listings({ relativePath: 'feasibility-studies.json' });
  const l = listing.data.listings;

  return {
    title: l?.metaTitle || 'Feasibility Studies',
    description:
      l?.metaDescription ||
      'Buildings Thistle Architecture has tested for developers: the question asked, the analysis run, and the answer given.',
    alternates: { canonical: '/case-studies/feasibility-studies' },
  };
}

export default async function Page() {
  // The raw query, variables and data are all handed down, not just the data:
  // useTina needs the query to re-run it against the editor's live values.
  const listing = await client.queries.listings({ relativePath: 'feasibility-studies.json' });

  return (
    <Suspense>
      <FeasibilityStudiesPage
        page={{ query: listing.query, variables: listing.variables, data: listing.data }}
      />
    </Suspense>
  );
}
