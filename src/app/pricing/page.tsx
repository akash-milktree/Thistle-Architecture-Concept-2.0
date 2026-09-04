import type { Metadata } from 'next';
import { PricingPage } from '@/views/PricingPage';
import client from '@/tina/__generated__/client';

export async function generateMetadata(): Promise<Metadata> {
  // The search listing is editable too, so it is read from the same document
  // as the page copy. The values in code stay as the fallback for a field an
  // editor has cleared, which keeps a blank box out of Google.
  //
  // metaTitle stays a plain string, not `{ absolute: ... }`: layout.tsx's
  // template appends "| Thistle Architecture", and this page has always relied
  // on that. The field description tells the editor to type the page name only.
  //
  // The description quotes all three headline prices. It is editable, but the
  // numbers in it are not the source of truth — see the note at the top of
  // views/PricingPage.tsx.
  const pricing = await client.queries.pricing({ relativePath: 'index.json' });
  const seo = pricing.data.pricing?.seo;

  return {
    title: seo?.metaTitle || 'Pricing',
    description:
      seo?.metaDescription ||
      'Fixed-fee feasibility pricing: a £15.99 HMO check, a £49.99 automated site appraisal, and design-led feasibility from £298. Get your price on screen in about a minute.',
    alternates: { canonical: '/pricing' },
  };
}

export default async function Page() {
  // The raw query, variables and data are all handed down, not just the data:
  // useTina needs the query to re-run it against the editor's live values.
  //
  // Settings comes down as well as the page's own document, because the reviews
  // band takes its supporting line and link label from the site-wide settings
  // rather than from this page.
  const [pricing, settings, reviews] = await Promise.all([
    client.queries.pricing({ relativePath: 'index.json' }),
    client.queries.settings({ relativePath: 'index.json' }),
    client.queries.reviewConnection(),
  ]);

  return (
    <PricingPage
      page={{ query: pricing.query, variables: pricing.variables, data: pricing.data }}
      settings={{ query: settings.query, variables: settings.variables, data: settings.data }}
      reviews={{ query: reviews.query, variables: reviews.variables, data: reviews.data }}
    />
  );
}
