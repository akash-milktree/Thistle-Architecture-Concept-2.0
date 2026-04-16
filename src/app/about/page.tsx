import type { Metadata } from 'next';
import { AboutPage } from '@/views/AboutPage';

export const metadata: Metadata = {
  title: 'About',
  description: 'Meet the team behind Thistle Architecture — commercial conversion specialists delivering data-driven feasibility across the UK.',
};

export default function Page() {
  return <AboutPage />;
}
