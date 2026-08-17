import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { PageShell } from '@/layouts/PageShell';

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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
          <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
