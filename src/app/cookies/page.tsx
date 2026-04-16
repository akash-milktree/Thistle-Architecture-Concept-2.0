import type { Metadata } from 'next';
import { CookiesPage } from '@/views/CookiesPage';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Thistle Architecture cookie policy.',
};

export default function Page() {
  return <CookiesPage />;
}
