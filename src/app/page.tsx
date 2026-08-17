import type { Metadata } from 'next';
import { HomePage } from '@/views/HomePage';

// Title and description come from the root layout defaults, which are written
// for the homepage anyway. This exists for the canonical.
// Title and description come from the root layout defaults, which are written
// for the homepage anyway. This exists for the canonical.
//
// This renders without a trailing slash. Next normalises it away whether the
// value is written as '/' or as the full URL, because trailingSlash is off, and
// an empty path and "/" are the same URL to every crawler. Not worth fighting.
export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function Page() {
  return <HomePage />;
}
