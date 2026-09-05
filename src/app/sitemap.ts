import type { MetadataRoute } from 'next';
import { categorySlug } from '@/data/blogData';
import { getPosts, getPostCategories } from '@/lib/posts';
import { getCaseStudies } from '@/lib/caseStudies';
import { conversions, conversionPath } from '@/data/conversionsData';

const BASE = 'https://www.thistlearchitecture.co.uk';

// Written when the password gate came off. /case-studies is left out on purpose:
// it used to redirect to the feasibility listing; since item 95 it is the Our
// Work hub, a real page, so it is listed. /team-review is an internal review page.
const staticPaths = [
  '/', '/pricing', '/feasibility-package', '/case-studies', '/case-studies/feasibility-studies',
  '/case-studies/completed-projects', '/about', '/blog', '/contact', '/conversions',
  '/tools/class-ma-checker', '/tools/gdv-calculator', '/tools/hmo-calculator',
  '/privacy', '/terms', '/cookies',
];

// async now: the case studies come from the CMS rather than a static module, so
// a study an editor adds is in the sitemap without a developer touching this.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [caseStudies, blogPosts, blogCategories] = await Promise.all([
    getCaseStudies(),
    getPosts(),
    getPostCategories(),
  ]);

  return [
    ...staticPaths.map((p) => ({
      url: `${BASE}${p}`,
      changeFrequency: 'monthly' as const,
      priority: p === '/' ? 1 : 0.8,
    })),
    ...conversions.map((c) => ({
      url: `${BASE}${conversionPath(c.slug)}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...caseStudies.map((c) => ({
      url: `${BASE}/case-studies/${c.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    // Added when the categories got real URLs. Only categories with posts are
    // in blogCategories, so this never lists an empty page.
    ...blogCategories.map((c) => ({
      url: `${BASE}/blog/category/${categorySlug(c)}`,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
    ...blogPosts.map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: new Date(p.updated ?? p.date),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
