import { NextResponse } from 'next/server';
import { put, list } from '@vercel/blob';
import { seedViews } from '@/data/blogViewSeeds';
import { getPosts } from '@/lib/posts';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Blog view counter. The old Wix site showed view counts and Ed wants them to
// carry on rather than restart, so each post starts from the number it had
// there (data/blogViewSeeds.ts) and this adds live views on top.
//
// The seeds are imported from blogViewSeeds rather than blogViews: the latter
// is a "use client" module because of the hook it exports, and importing its
// data here meant the route got nothing across the boundary. Every GET returned
// an empty object and every POST was rejected as an unknown slug.
//
// Stored in Vercel Blob because it is the only storage this project has. Blob
// has no atomic increment, so this is a read, add, write. Two views landing in
// the same instant can cost one count. That is an acceptable trade on a
// practice blog, and the alternative is provisioning Redis for a number that
// nobody audits. If traffic ever makes it worth it, swap this for Upstash and
// the rest of the code does not change.
const STORE = 'blog-views.json';

type Counts = Record<string, number>;

// The blob URL is looked up rather than configured, so this needs no env var
// beyond the BLOB_READ_WRITE_TOKEN the project already has.
async function readCounts(): Promise<Counts> {
  try {
    const { blobs } = await list({ prefix: STORE, limit: 1 });
    if (!blobs.length) return {};
    const res = await fetch(blobs[0].url, { cache: 'no-store' });
    if (!res.ok) return {};
    return (await res.json()) as Counts;
  } catch {
    // No token, no blob yet, or Blob is down: fall back to the seeds alone.
    return {};
  }
}

async function writeCounts(counts: Counts) {
  await put(STORE, JSON.stringify(counts), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

/** Live total for a post: what it had on the old site, plus views since. */
const total = (counts: Counts, slug: string) => (seedViews[slug] ?? 0) + (counts[slug] ?? 0);

// The real article list, not the seed list. Anything published since the Wix
// migration has no seed to carry but is still a valid post, so keying off the
// seeds alone would leave new articles permanently uncountable.
//
// Read from the CMS for the same reason, now that articles can be published
// there: a list taken from code would have left anything an editor wrote
// uncountable in exactly the way this note warns about.
const knownSlugs = async () => new Set((await getPosts()).map((p) => p.slug));

export async function GET() {
  const [counts, slugs] = await Promise.all([readCounts(), knownSlugs()]);
  const out: Counts = {};
  for (const slug of slugs) out[slug] = total(counts, slug);
  return NextResponse.json(out, { headers: { 'Cache-Control': 'public, max-age=60' } });
}

export async function POST(request: Request) {
  let slug = '';
  try {
    ({ slug } = (await request.json()) as { slug?: string });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  // Only count posts we know about, so a junk slug cannot grow the store.
  if (!slug || !(await knownSlugs()).has(slug)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const counts = await readCounts();
  counts[slug] = (counts[slug] ?? 0) + 1;
  try {
    await writeCounts(counts);
  } catch {
    // Never fail the page over a counter.
    return NextResponse.json({ ok: true, views: total(counts, slug) });
  }
  return NextResponse.json({ ok: true, views: total(counts, slug) });
}
