import type { Metadata } from 'next';
import { TermsPage } from '@/views/TermsPage';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Thistle Architecture terms of service.',
  alternates: { canonical: '/terms' },
};

export default function Page() {
  return <TermsPage />;
}
