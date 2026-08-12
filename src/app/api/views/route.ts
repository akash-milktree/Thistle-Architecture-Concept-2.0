import { NextResponse } from 'next/server';
import { put, list } from '@vercel/blob';
import { seedViews } from '@/data/blogViews';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Blog view counter. The old Wix site showed view counts and Ed wants them to
// carry on rather than restart, so each post starts from the number it had
// there (data/blogViews.ts) and this adds live views on top.
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

export async function GET() {
  const counts = await readCounts();
  const out: Counts = {};
  for (const slug of Object.keys(seedViews)) out[slug] = total(counts, slug);
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
  if (!slug || !(slug in seedViews)) {
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
