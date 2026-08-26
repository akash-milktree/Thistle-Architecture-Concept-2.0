import type { Metadata } from 'next';
import { ExpertiseOverviewPage } from '@/views/ExpertiseOverviewPage';
import client from '@/tina/__generated__/client';

export async function generateMetadata(): Promise<Metadata> {
  // The search listing is editable too, so it is read from the same document as
  // the page copy. The values in code stay as the fallback for a field an
  // editor has cleared, which keeps a blank box out of Google.
  //
  // metaTitle stays a plain string, not `{ absolute: ... }`: layout.tsx's
  // template appends "| Thistle Architecture", and this page has always relied
  // on that. The sector pages are the other way round — their titles already
  // carry the suffix — which is why only they opt out of the template.
  const index = await client.queries.conversionsIndex({ relativePath: 'index.json' });
  const p = index.data.conversionsIndex;

  return {
    title: p?.metaTitle || 'Expertise',
    description:
      p?.metaDescription ||
      'Feasibility-first architecture across commercial to residential, HMO, co-living and large HMO, mixed-use, and high-end residential.',
    alternates: { canonical: '/conversions' },
  };
}

export default async function Page() {
  // The raw query, variables and data are all handed down, not just the data:
  // useTina needs the query to re-run it against the editor's live values.
  //
  // The connection is fetched here as well as the singleton because the cards
  // are the five sectors' own headers, so renaming a sector renames its card.
  const [index, sectors] = await Promise.all([
    client.queries.conversionsIndex({ relativePath: 'index.json' }),
    client.queries.conversionConnection(),
  ]);

  return (
    <ExpertiseOverviewPage
      page={{ query: index.query, variables: index.variables, data: index.data }}
      sectors={{ query: sectors.query, variables: sectors.variables, data: sectors.data }}
    />
  );
}
