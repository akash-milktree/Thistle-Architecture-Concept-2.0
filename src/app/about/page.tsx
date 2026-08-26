import type { Metadata } from 'next';
import { AboutPage } from '@/views/AboutPage';
import client from '@/tina/__generated__/client';

export async function generateMetadata(): Promise<Metadata> {
  // The search listing is editable too, so it is read from the same document
  // as the page copy. The values in code stay as the fallback for a field an
  // editor has cleared, which keeps a blank box out of Google.
  //
  // metaTitle stays a plain string, not `{ absolute: ... }`: layout.tsx's
  // template appends "| Thistle Architecture", and this page has always
  // relied on that. The field description tells the editor to type the page
  // name only, for the same reason.
  const about = await client.queries.about({ relativePath: 'index.json' });
  const a = about.data.about;

  return {
    title: a?.metaTitle || 'About',
    description:
      a?.metaDescription ||
      'Meet the team behind Thistle Architecture, commercial conversion specialists delivering data-driven feasibility across the UK.',
    alternates: { canonical: '/about' },
  };
}

export default async function Page() {
  // The raw query, variables and data are all handed down, not just the data:
  // useTina needs the query to re-run it against the editor's live values.
  const [settings, reviews, about] = await Promise.all([
    client.queries.settings({ relativePath: 'index.json' }),
    client.queries.reviewConnection(),
    client.queries.about({ relativePath: 'index.json' }),
  ]);

  return (
    <AboutPage
      settings={{ query: settings.query, variables: settings.variables, data: settings.data }}
      reviews={{ query: reviews.query, variables: reviews.variables, data: reviews.data }}
      page={{ query: about.query, variables: about.variables, data: about.data }}
    />
  );
}
