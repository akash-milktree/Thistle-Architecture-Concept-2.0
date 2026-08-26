import type { Metadata } from 'next';
import { HomePage } from '@/views/HomePage';
import client from '@/tina/__generated__/client';

export async function generateMetadata(): Promise<Metadata> {
  // Title and description come from the root layout defaults, which are written
  // for the homepage anyway. This existed only for the canonical, and it still
  // sets nothing else unless an editor has typed something: an absent or
  // cleared CMS field leaves the key off the object entirely, so the layout's
  // default is inherited exactly as before rather than being overwritten with a
  // blank.
  //
  // metaTitle is set as `{ absolute }`, unlike the other pages. layout.tsx's
  // template appends "| Thistle Architecture" to a plain string, and the
  // homepage has never carried that suffix — its default is the whole title,
  // "Thistle Architecture | Feasibility Solved". The field description tells
  // the editor to type the complete title for the same reason.
  //
  // The canonical renders without a trailing slash. Next normalises it away
  // whether the value is written as '/' or as the full URL, because
  // trailingSlash is off, and an empty path and "/" are the same URL to every
  // crawler. Not worth fighting.
  const home = await client.queries.home({ relativePath: 'index.json' });
  const seo = home.data.home?.seo;
  const title = seo?.metaTitle || '';
  const description = seo?.metaDescription || '';

  return {
    ...(title ? { title: { absolute: title } } : {}),
    ...(description ? { description } : {}),
    alternates: { canonical: '/' },
  };
}

export default async function Page() {
  // The raw query, variables and data are all handed down, not just the data:
  // useTina needs the query to re-run it against the editor's live values.
  const home = await client.queries.home({ relativePath: 'index.json' });

  return <HomePage page={{ query: home.query, variables: home.variables, data: home.data }} />;
}
