import type { Metadata } from 'next';
import { TeamReviewPage } from '@/views/TeamReviewPage';
import client from '@/tina/__generated__/client';

// Internal review page, NOT linked from the site nav. Compares three options for
// each team headshot so Akash and Ed can pick before anything replaces the real
// /about photos. Deliberately excluded from search engines.
export async function generateMetadata(): Promise<Metadata> {
  // The tab title is editable too, so it is read from the same document as the
  // page copy, with the value that was here left as the fallback for a field an
  // editor has cleared.
  //
  // robots stays in code: the page is internal, and whether it is hidden from
  // Google is not an editorial choice. metaTitle is a plain string, not
  // `{ absolute: ... }`, so layout.tsx's "| Thistle Architecture" template still
  // applies, as it always has here.
  const review = await client.queries.teamReview({ relativePath: 'index.json' });
  const t = review.data.teamReview;

  return {
    title: t?.metaTitle || 'Team photo options (internal review)',
    robots: { index: false, follow: false },
  };
}

export default async function Page() {
  // The raw query, variables and data are all handed down, not just the data:
  // useTina needs the query to re-run it against the editor's live values.
  const review = await client.queries.teamReview({ relativePath: 'index.json' });

  return (
    <TeamReviewPage
      page={{ query: review.query, variables: review.variables, data: review.data }}
    />
  );
}
