import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { PageShell } from '@/layouts/PageShell';
import { Analytics } from '@/components/analytics/Analytics';
import { CookieBanner } from '@/components/analytics/CookieBanner';
import client from '@/tina/__generated__/client';

export const metadata: Metadata = {
  // Every canonical below is written as a path, which Next resolves against
  // this. Set once here so the live host is stated in one place.
  //
  // No canonical on the layout on purpose: page metadata inherits from the
  // layout, so a canonical here would silently point any page that forgot its
  // own at the homepage. Better that a missing one is missing than wrong.
  metadataBase: new URL('https://www.thistlearchitecture.co.uk'),
  title: {
    default: 'Thistle Architecture | Feasibility Solved',
    template: '%s | Thistle Architecture',
  },
  description: 'Data-driven feasibility for commercial conversions, HMOs, and high-end residential across the UK.',

  // Google Search Console, verified by meta tag.
  //
  // Ed asked for DNS verification, which is right for a Domain property: it
  // covers every subdomain and both protocols at once, and it is the only
  // method that does. It also needs a TXT record added at the registrar, which
  // is a person with the GoDaddy login rather than anything this repo can do.
  //
  // This is the second, faster route, for a URL-prefix property. It costs one
  // environment variable and no DNS, so verification is not blocked on a
  // registrar login if that turns out to be slow. Absent, the key is left off
  // the object entirely and no empty tag is rendered.
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // The navigation, closing CTA band and footer are the same on every route, so
  // they are fetched once here rather than by each page. Passing the raw query
  // down lets PageShell re-run it live inside the editor.
  const settings = await client.queries.settings({ relativePath: 'index.json' });

  return (
    <html lang="en" className={GeistSans.className}>
      <body>
          <Analytics />
          <PageShell
            settings={{ query: settings.query, variables: settings.variables, data: settings.data }}
          >
            {children}
          </PageShell>
          <CookieBanner />
      </body>
    </html>
  );
}
