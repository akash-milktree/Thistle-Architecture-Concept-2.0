import type { MetadataRoute } from 'next';
import { blogPosts, blogCategories, categorySlug } from '@/data/blogData';
import { getCaseStudies } from '@/lib/caseStudies';
import { conversions } from '@/data/conversionsData';

const BASE = 'https://www.thistlearchitecture.co.uk';

// Written when the password gate came off. /case-studies is left out on purpose:
// it only redirects to the feasibility listing, and pointing crawlers at a
// redirect wastes the crawl. /team-review is an internal review page.
const staticPaths = [
  '/', '/pricing', '/feasibility-package', '/case-studies/feasibility-studies',
  '/case-studies/completed-projects', '/about', '/blog', '/contact', '/conversions',
  '/tools/class-ma-checker', '/tools/gdv-calculator', '/tools/hmo-calculator',
  '/privacy', '/terms', '/cookies',
];

// async now: the case studies come from the CMS rather than a static module, so
// a study an editor adds is in the sitemap without a developer touching this.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const caseStudies = await getCaseStudies();

  return [
    ...staticPaths.map((p) => ({
      url: `${BASE}${p}`,
      changeFrequency: 'monthly' as const,
      priority: p === '/' ? 1 : 0.8,
    })),
    ...conversions.map((c) => ({
      url: `${BASE}/conversions/${c.slug}`,
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
