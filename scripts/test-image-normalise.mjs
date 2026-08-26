/**
 * Tests for normalizeImage() in lib/tina.ts.
 *
 * This exists because the failure it guards against cannot be reproduced
 * locally. In local mode Tina returns the stored value verbatim, so every path
 * looks right on a dev machine; only in cloud mode does TinaCloud serve image
 * fields as assets.tina.io URLs. The first version of this normaliser shipped
 * to production and 404'd every curated case-study image, because it assumed
 * every CDN path was relative to mediaRoot and re-prepended /images/uploads/ to
 * paths that had never been in the media store.
 *
 * So: the URL shapes below are the contract. Run this after touching the
 * normaliser or moving anything under public/images.
 *
 *   node --experimental-strip-types scripts/test-image-normalise.mjs
 */
import { normalizeImage } from '../lib/tina.ts';

const cases = [
  // --- curated, committed images. Not in the media store, so their CDN path
  // carries the real subdirectory and must keep it. This is the regression.
  ['https://assets.tina.io/abc123/projects/greyfriars-option2-1.webp', '/images/projects/greyfriars-option2-1.webp'],
  ['https://assets.tina.io/abc123/images/projects/x.jpg', '/images/projects/x.jpg'],
  ['https://assets.tina.io/abc123/team/ed.jpg', '/images/team/ed.jpg'],
  ['https://assets.tina.io/abc123/blog/post.jpg', '/images/blog/post.jpg'],
  ['https://assets.tina.io/abc123/site/hero.jpg', '/images/site/hero.jpg'],
  ['https://assets.tina.io/abc123/deliverables/d.jpg', '/images/deliverables/d.jpg'],
  ['https://assets.tina.io/abc123/team-review/a-b.jpg', '/images/team-review/a-b.jpg'],
  // older CDN shape, same rule
  ['https://assets.tina.io/x/__staging/main/__file/projects/a.jpg', '/images/projects/a.jpg'],

  // --- genuine editor uploads. Relative to mediaRoot (images/uploads), so they
  // arrive with no leading folder and need the upload root put back.
  ['https://assets.tina.io/abc123/new-photo.jpg', '/images/uploads/new-photo.jpg'],
  ['https://assets.tina.io/x/__staging/main/__file/new.jpg', '/images/uploads/new.jpg'],

  // --- passthrough: anything already relative, and genuinely remote media
  ['/images/projects/hero.jpg', '/images/projects/hero.jpg'],
  ['/images/uploads/a.jpg', '/images/uploads/a.jpg'],
  ['images/site/x.jpg', '/images/site/x.jpg'],
  ['https://player.vimeo.com/video/1', 'https://player.vimeo.com/video/1'],
];

let failed = 0;
for (const [input, want] of cases) {
  const got = normalizeImage(input, 'FALLBACK');
  if (got !== want) {
    failed++;
    console.error(`FAIL  ${input}\n  got:  ${got}\n  want: ${want}`);
  }
}

if (normalizeImage('', 'FALLBACK') !== 'FALLBACK') {
  failed++;
  console.error('FAIL  empty value should return the fallback');
}

if (failed) {
  console.error(`\n${failed} failing case(s).`);
  process.exit(1);
}
console.log(`normalizeImage: ${cases.length + 1} cases pass`);
