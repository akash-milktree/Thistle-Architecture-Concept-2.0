import type { Metadata } from 'next';
import { PrivacyPage } from '@/views/PrivacyPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Thistle Architecture privacy policy.',
  alternates: { canonical: '/privacy' },
};

export default function Page() {
  return <PrivacyPage />;
}
