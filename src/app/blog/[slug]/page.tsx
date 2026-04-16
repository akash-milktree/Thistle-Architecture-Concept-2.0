import type { Metadata } from 'next';
import { blogPosts } from '@/data/blogData';
import { BlogPostPage } from '@/views/BlogPostPage';

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  return {
    title: post?.title ?? 'Blog Post',
    description: post?.excerpt ?? 'Thistle Architecture blog post.',
  };
}

export default function Page() {
  return <BlogPostPage />;
}
