"use client";

import React from 'react';
import { seedViews, seedFor } from './blogViewSeeds';

// The seeds themselves live in blogViewSeeds.ts, which carries no "use client"
// directive so the API route can read them on the server. Re-exported here so
// existing imports keep working and there is one obvious place to look.
export { seedViews, seedFor };

/**
 * Live view counts for a list of posts, keyed by slug.
 *
 * Starts from the seeds so cards render a real number on first paint rather
 * than flashing zero, then swaps in the live totals once /api/views answers.
 * If that call fails the seeds simply stay, which is the right failure: an
 * article that was read 907 times should never advertise itself as unread.
 */
export const useViewCounts = (): Record<string, number> => {
  const [counts, setCounts] = React.useState<Record<string, number>>(seedViews);
  React.useEffect(() => {
    let alive = true;
    fetch('/api/views')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (alive && d && typeof d === 'object') setCounts({ ...seedViews, ...d }); })
      .catch(() => {});
    return () => { alive = false; };
  }, []);
  return counts;
};
