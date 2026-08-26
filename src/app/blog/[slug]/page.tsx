import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blogData';
import { BlogPostPage } from '@/views/BlogPostPage';
import { normalizeImage } from '@/lib/tina';
import client from '@/tina/__generated__/client';

// The article set still lives in code, so the routes still come from it. A
// document created in Tina alone would have no route here, which is why
// tina/collections/post.ts has create and delete switched off — see the note
// at the top of that file.
export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

// Only the slugs above exist. Without this, any other slug still matched this
// route and answered 200 with an "Article not found" body under the generic
// title "Blog Post": a soft 404, which search engines treat as a real page and
// keep indexed. That mattered the moment posts were removed, because all eleven
// deleted URLs kept returning 200.
export const dynamicParams = false;

// A date as typed by an editor, turned into the ISO form schema.org wants.
//
// `date` is a CMS field now, and a value new Date() cannot read gives NaN,
// which makes toISOString() throw — a typo in a form would take the whole
// article down at build time. Falls back to the date in code, which is known
// to parse because it is what the article shipped with.
const isoDate = (value: string, fallback: string): string => {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date(fallback).toISOString() : parsed.toISOString();
};

// params is a Promise in Next 16, so it has to be awaited. It was read
// synchronously here, which meant params.slug was always undefined on the
// server: every article rendered the fallback title "Blog Post" with the
// generic description, and the Article JSON-LD was never emitted. The page
// still looked right because the client component read the slug from
// useParams, so the fault only ever showed in the markup search engines read.
// That is also why the component takes its article as a prop now.
// The case-studies route already did this correctly.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  // The search listing is editable alongside the article, so it is read from
  // the same document as the copy, with the record in code as the fallback for
  // a field an editor has cleared. Skipped entirely when there is no such
  // article, which is what the old behaviour was.
  const doc = post ? (await client.queries.post({ relativePath: `${slug}.json` })).data.post : null;

  // metaTitle is the exact tag the article was briefed with; absolute stops
  // the layout template appending "| Thistle Architecture" on top of it.
  const metaTitle = doc?.metaTitle || post?.metaTitle;

  return {
    title: metaTitle ? { absolute: metaTitle } : (doc?.title || post?.title || 'Blog Post'),
    description: doc?.excerpt || post?.excerpt || 'Thistle Architecture blog post.',
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  // Belt and braces alongside dynamicParams: a real 404 status, not a page that
  // says "not found" while the response says everything is fine. It also means
  // the view below can take a guaranteed article rather than looking one up
  // from the URL itself.
  if (!post) notFound();

  // The raw query, variables and data are all handed down, not just the data:
  // useTina needs the query to re-run it against the editor's live values.
  const article = await client.queries.post({ relativePath: `${slug}.json` });
  const doc = article.data.post;

  // Built from the same merged values the page renders, so the structured data
  // and the visible article cannot say different things.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: doc?.title || post.title,
    description: doc?.excerpt || post.excerpt,
    image: normalizeImage(doc?.image, post.image),
    datePublished: isoDate(doc?.date || post.date, post.date),
    dateModified: isoDate(doc?.updated || post.updated || doc?.date || post.date, post.updated ?? post.date),
    author: {
      '@type': 'Person',
      name: doc?.author?.name || post.author.name,
      jobTitle: doc?.author?.role || post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Thistle Architecture',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostPage
        post={post}
        page={{ query: article.query, variables: article.variables, data: article.data }}
      />
    </>
  );
}
