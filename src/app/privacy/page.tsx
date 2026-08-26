import { cache } from 'react';
import type { Metadata } from 'next';
import { PrivacyPage } from '@/views/PrivacyPage';
import client from '@/tina/__generated__/client';
import { str } from '@/lib/tina';

// generateMetadata and the page component are separate entry points and Next
// hands them nothing in common, so both need the document. cache() dedupes the
// two calls within a request without holding anything between requests, which
// a module-level variable would — and that would serve a stale document for as
// long as the server stayed up after an edit.
const load = cache(() => client.queries.legal({ relativePath: 'privacy.json' }));

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await load();
  return {
    // The values that were hardcoded here are kept as the fallback: an SEO
    // field left empty in the CMS should not publish an untitled page.
    title: str(data.legal.metaTitle) || 'Privacy Policy',
    description: str(data.legal.metaDescription) || 'Thistle Architecture privacy policy.',
    // Routing, not content. The canonical has to match the URL this file
    // serves, so it stays in code.
    alternates: { canonical: '/privacy' },
  };
}

export default async function Page() {
  // The raw query, variables and data are all handed down, not just the data:
  // useTina needs the query to re-run it against the editor's live values.
  const legal = await load();

  return <PrivacyPage page={{ query: legal.query, variables: legal.variables, data: legal.data }} />;
}
