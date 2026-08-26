import type { Metadata } from 'next';
import { FeasibilityPackagePage } from '@/views/FeasibilityPackagePage';
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
  const pkg = await client.queries.feasibilityPackage({ relativePath: 'package.json' });
  const doc = pkg.data.feasibilityPackage;

  // The collection uses templates, because /feasibility-package and
  // /feasibility-confirmed share almost no copy. That makes the document type a
  // union of the two shapes, and only a field both templates carry can be read
  // straight off it. The search description belongs to this page's template
  // alone, so it is narrowed with `in` rather than cast away.
  const metaDescription = doc && 'metaDescription' in doc ? doc.metaDescription : undefined;

  return {
    title: doc?.metaTitle || 'Feasibility Package',
    description:
      metaDescription ||
      'Get complete clarity on your property\'s development potential with our comprehensive feasibility package.',
    alternates: { canonical: '/feasibility-package' },
  };
}

export default async function Page() {
  // The raw query, variables and data are all handed down, not just the data:
  // useTina needs the query to re-run it against the editor's live values.
  //
  // Settings and the reviews come down as well as the page's own document,
  // because the reviews band takes its supporting line and link label from the
  // site-wide settings rather than from this page.
  const [pkg, settings, reviews] = await Promise.all([
    client.queries.feasibilityPackage({ relativePath: 'package.json' }),
    client.queries.settings({ relativePath: 'index.json' }),
    client.queries.reviewConnection(),
  ]);

  return (
    <FeasibilityPackagePage
      page={{ query: pkg.query, variables: pkg.variables, data: pkg.data }}
      settings={{ query: settings.query, variables: settings.variables, data: settings.data }}
      reviews={{ query: reviews.query, variables: reviews.variables, data: reviews.data }}
    />
  );
}
