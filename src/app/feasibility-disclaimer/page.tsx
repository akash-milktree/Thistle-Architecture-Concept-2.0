import { cache } from 'react';
import type { Metadata } from 'next';
import { FeasibilityDisclaimerPage } from '@/views/FeasibilityDisclaimerPage';
import client from '@/tina/__generated__/client';
import { str } from '@/lib/tina';

// The document a client has to accept before they can pay for a feasibility.
//
// Ed's brief: "Lives at its own URL. Permanent — never moved or deleted." A
// client who accepted this needs to be able to come back to it years later, so
// treat this route as fixed. If the wording changes, that is a new version
// number on the same URL, not a new URL and not a redirect.
const load = cache(() => client.queries.legal({ relativePath: 'feasibility-disclaimer.json' }));

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await load();
  return {
    title: str(data.legal.metaTitle) || 'Feasibility Report: Basis and Limitations',
    description:
      str(data.legal.metaDescription) ||
      'What a Thistle Architecture feasibility report is, what it is not, and the limits of our responsibility for it.',
    alternates: { canonical: '/feasibility-disclaimer' },
  };
}

export default async function Page() {
  const legal = await load();

  return (
    <FeasibilityDisclaimerPage
      page={{ query: legal.query, variables: legal.variables, data: legal.data }}
    />
  );
}
