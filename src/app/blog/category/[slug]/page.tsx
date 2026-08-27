import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { categoryMeta, categorySlug } from '@/data/blogData';
import { getCategoryFromSlug, getPostCategories, getPostsInCategory } from '@/lib/posts';
import { BlogPage } from '@/views/BlogPage';
import client from '@/tina/__generated__/client';

// One route per category that actually has posts. The SEO audit flagged that
// the filters on /blog were client-side state, so no category had its own URL,
// title, description or H1, and none could be indexed or linked to.
//
// blogCategories is derived from the posts rather than from the BlogCategory
// union, so a category with nothing in it never gets a page.
export async function generateStaticParams() {
  return (await getPostCategories()).map((c) => ({ slug: categorySlug(c) }));
}

// Anything outside the list above is a 404, not a soft 404 showing an empty
// listing under a generic title. Same reasoning as the blog and case study
// routes.
export const dynamicParams = false;

// Deliberately unchanged, and deliberately not reading from Tina. The title and
// description for each category come from categoryMeta in data/blogData.ts,
// written one per category so each page says something rather than repeating a
// template. They belong with the posts they describe, so they move into the CMS
// with the posts, not with the listing chrome.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryFromSlug(slug);
  if (!category) return {};
  const meta = categoryMeta[category];
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/blog/category/${slug}` },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryFromSlug(slug);
  if (!category) notFound();

  const meta = categoryMeta[category];
  const posts = await getPostsInCategory(category);
  const count = posts.length;

  // The blog index document, on a category page, because the two share their
  // chrome: the eyebrow above the heading and the first category chip are the
  // same strings here as on /blog and are edited in one place. The heading and
  // intro below override what that document holds, so the view leaves their
  // markers off on this route.
  const listing = await client.queries.listings({ relativePath: 'blog.json' });

  return (
    <BlogPage
      posts={posts}
      category={category}
      heading={meta.title}
      description={`${meta.description} ${count} ${count === 1 ? 'article' : 'articles'}.`}
      page={{ query: listing.query, variables: listing.variables, data: listing.data }}
    />
  );
}
