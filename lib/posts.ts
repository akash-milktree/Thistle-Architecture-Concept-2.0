import { cache } from 'react';
import client from '@/tina/__generated__/client';
import { blogPosts, categorySlug, type BlogCategory, type BlogPost } from '@/data/blogData';
import { str, arr, normalizeImage } from '@/lib/tina';

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * The articles, read from the CMS rather than from data/blogData.ts.
 *
 * This is what lets an editor publish an article. Writing one was already
 * possible — the fields have been editable since the migration — but only for
 * an article that already existed, because the SET lived in code: the routes,
 * the /blog listing, the category pages and the sitemap all read the
 * TypeScript module. A document created in Tina alone got no route at all.
 *
 * Order is by date, newest first, which is what the module did. Every other
 * ordering on this site is an explicit field; here the date IS the order, so
 * there is nothing extra for an editor to keep in step.
 */

/**
 * Sort key for a date typed into a form.
 *
 * Dates are free text ("July 16, 2024") because that is how they were written
 * when the articles were migrated from the old journal. A value Date cannot
 * read gives NaN, and NaN in a comparator does not sort — it silently leaves
 * the list in whatever order it arrived. So an unreadable date sorts last
 * rather than scrambling everything around it, and the article still publishes.
 */
const dateKey = (value: string): number => {
  const t = new Date(value).getTime();
  return Number.isNaN(t) ? -Infinity : t;
};

export const getPosts = cache(async (): Promise<BlogPost[]> => {
  const nodes: any[] = [];
  let after: string | undefined;

  // Tina pages at 50 and there are 14, so this goes round once — but being
  // truncated here would drop articles off the listing and out of the sitemap
  // with nothing to notice.
  for (;;) {
    const { data } = await client.queries.postConnection({ after });
    const conn = data.postConnection;
    for (const edge of conn?.edges ?? []) if (edge?.node) nodes.push(edge.node);
    if (!conn?.pageInfo?.hasNextPage) break;
    after = conn.pageInfo.endCursor ?? undefined;
  }

  return nodes
    .map((n): BlogPost => {
      // The filename is the slug; no separate field can disagree with the URL.
      const slug = str(n._sys?.filename);
      // An article that shipped in code keeps that record as its fallback, so a
      // field an editor clears leaves the page reading properly. A CMS-only
      // article has no fallback, which is fine — it has nothing to fall back to.
      const fallback = blogPosts.find((p) => p.slug === slug);

      return {
        slug,
        title: str(n.title) || fallback?.title || '',
        metaTitle: str(n.metaTitle) || fallback?.metaTitle || undefined,
        excerpt: str(n.excerpt) || fallback?.excerpt || '',
        content: arr<string>(n.content).length ? arr<string>(n.content).map(str) : (fallback?.content ?? []),
        image: normalizeImage(n.image, fallback?.image ?? ''),
        date: str(n.date) || fallback?.date || '',
        updated: str(n.updated) || fallback?.updated || undefined,
        readTime: str(n.readTime) || fallback?.readTime || '',
        category: (str(n.category) || fallback?.category || 'News') as BlogCategory,
        author: {
          name: str(n.author?.name) || fallback?.author.name || '',
          role: str(n.author?.role) || fallback?.author.role || '',
          initials: str(n.author?.initials) || fallback?.author.initials || '',
        },
      };
    })
    .sort((a, b) => dateKey(b.date) - dateKey(a.date));
});

/**
 * The categories that actually have an article, most-recently-posted first.
 *
 * Only these get a /blog/category/<slug> route. A category with nothing in it
 * would be an indexable page with an empty list on it, which is the thin
 * content the category URLs were introduced to avoid.
 */
export const getPostCategories = cache(async (): Promise<BlogCategory[]> =>
  Array.from(new Set((await getPosts()).map((p) => p.category)))
);

/** The articles in one category, in the same order the listing shows them. */
export const getPostsInCategory = cache(async (c: BlogCategory): Promise<BlogPost[]> =>
  (await getPosts()).filter((p) => p.category === c)
);

/** Resolve a /blog/category/<slug> URL back to the category it names. */
export const getCategoryFromSlug = cache(async (slug: string): Promise<BlogCategory | undefined> =>
  (await getPostCategories()).find((c) => categorySlug(c) === slug)
);
