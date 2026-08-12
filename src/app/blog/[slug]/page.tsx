import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blogData';
import { BlogPostPage } from '@/views/BlogPostPage';

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

// Only the slugs above exist. Without this, any other slug still matched this
// route and answered 200 with an "Article not found" body under the generic
// title "Blog Post": a soft 404, which search engines treat as a real page and
// keep indexed. That mattered the moment posts were removed, because all eleven
// deleted URLs kept returning 200.
export const dynamicParams = false;

// params is a Promise in Next 16, so it has to be awaited. It was read
// synchronously here, which meant params.slug was always undefined on the
// server: every article rendered the fallback title "Blog Post" with the
// generic description, and the Article JSON-LD was never emitted. The page
// still looked right because the client component reads the slug from
// useParams, so the fault only ever showed in the markup search engines read.
// The case-studies route already did this correctly.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  return {
    title: post?.title ?? 'Blog Post',
    description: post?.excerpt ?? 'Thistle Architecture blog post.',
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  // Belt and braces alongside dynamicParams: a real 404 status, not a page that
  // says "not found" while the response says everything is fine.
  if (!post) notFound();

  const jsonLd = post
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        image: post.image,
        datePublished: new Date(post.date).toISOString(),
        dateModified: new Date(post.updated ?? post.date).toISOString(),
        author: {
          '@type': 'Person',
          name: post.author.name,
          jobTitle: post.author.role,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Thistle Architecture',
        },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <BlogPostPage />
    </>
  );
}
