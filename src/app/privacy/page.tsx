import type { Metadata } from 'next';
import { PrivacyPage } from '@/views/PrivacyPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Thistle Architecture privacy policy.',
};

export default function Page() {
  return <PrivacyPage />;
}
