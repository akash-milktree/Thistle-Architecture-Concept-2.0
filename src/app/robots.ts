import type { MetadataRoute } from 'next';

// The password gate served a robots.txt of "Disallow: /" while the site was
// held back. Removing the gate removes that too, so this replaces it with an
// explicit permission rather than leaving no robots.txt at all: the switch from
// blocked to open should be deliberate and visible, not an absence.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // /admin is the CMS editor, a static SPA with no content of its own. It
      // is not in the sitemap, but a crawler can still reach a URL it finds
      // anywhere, and an indexed admin URL is noise at best. Disallowing it
      // keeps the crawlable surface exactly the set of real pages.
      disallow: '/admin',
    },
    sitemap: 'https://www.thistlearchitecture.co.uk/sitemap.xml',
  };
}
