import type { Metadata } from 'next';
import { BlogPage } from '@/views/BlogPage';
import client from '@/tina/__generated__/client';
import { getPosts } from '@/lib/posts';

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
  const listing = await client.queries.listings({ relativePath: 'blog.json' });
  const l = listing.data.listings;

  return {
    title: l?.metaTitle || 'Blog',
    description:
      l?.metaDescription ||
      'Insights, guides, and industry updates on commercial conversions, planning, and property feasibility.',
    alternates: { canonical: '/blog' },
  };
}

export default async function Page() {
  // The raw query, variables and data are all handed down, not just the data:
  // useTina needs the query to re-run it against the editor's live values.
  //
  // The articles come down as the whole connection rather than as a mapped
  // list, because the field ids have to be read with f() from lib/tina-fields,
  // which is a client module — calling it here would be calling a client
  // function on the server. The view merges each document onto the record in
  // code by slug.
  //
  // `articles` is the SET — which articles exist and in what order — and comes
  // from the CMS so one an editor publishes appears here. The connection beside
  // it is the same documents again, carried raw purely so the view can read
  // field ids off them with f().
  const [listing, posts, articles] = await Promise.all([
    client.queries.listings({ relativePath: 'blog.json' }),
    client.queries.postConnection(),
    getPosts(),
  ]);

  return (
    <BlogPage
      posts={articles}
      page={{ query: listing.query, variables: listing.variables, data: listing.data }}
      postsQuery={{ query: posts.query, variables: posts.variables, data: posts.data }}
    />
  );
}
