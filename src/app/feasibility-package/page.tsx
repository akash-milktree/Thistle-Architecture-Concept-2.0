import type { Metadata } from 'next';
import { FeasibilityPackagePage } from '@/views/FeasibilityPackagePage';

export const metadata: Metadata = {
  title: 'Visibility Package',
  description: 'Get complete clarity on your property\'s development potential with our comprehensive feasibility package.',
};

export default function Page() {
  return <FeasibilityPackagePage />;
}
