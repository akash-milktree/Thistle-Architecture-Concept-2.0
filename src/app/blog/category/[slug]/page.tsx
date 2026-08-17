import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  blogCategories,
  categoryMeta,
  categorySlug,
  getCategoryBySlug,
  postsInCategory,
} from '@/data/blogData';
import { BlogPage } from '@/views/BlogPage';

// One route per category that actually has posts. The SEO audit flagged that
// the filters on /blog were client-side state, so no category had its own URL,
// title, description or H1, and none could be indexed or linked to.
//
// blogCategories is derived from the posts rather than from the BlogCategory
// union, so a category with nothing in it never gets a page.
export function generateStaticParams() {
  return blogCategories.map((c) => ({ slug: categorySlug(c) }));
}

// Anything outside the list above is a 404, not a soft 404 showing an empty
// listing under a generic title. Same reasoning as the blog and case study
// routes.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
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
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const meta = categoryMeta[category];
  const count = postsInCategory(category).length;

  return (
    <BlogPage
      category={category}
      heading={meta.title}
      description={`${meta.description} ${count} ${count === 1 ? 'article' : 'articles'}.`}
    />
  );
}
