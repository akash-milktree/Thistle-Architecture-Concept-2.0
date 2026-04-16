import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { PageShell } from '@/layouts/PageShell';

export const metadata: Metadata = {
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
