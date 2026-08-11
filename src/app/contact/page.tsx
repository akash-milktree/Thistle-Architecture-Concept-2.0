import type { Metadata } from 'next';
import { ContactPage } from '@/views/ContactPage';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Thistle Architecture about a commercial conversion, HMO, or high-end residential scheme. We reply within one working day.',
};

export default function Page() {
  return <ContactPage />;
}
