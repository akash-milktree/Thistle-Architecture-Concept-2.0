/**
 * Tests for vimeoEmbed() in lib/vimeo.ts.
 *
 * The film's embed parameters are fixed in code rather than editable, and each
 * one earns its place: background=1 removes the player chrome, muted=1 is what
 * iOS requires before it will autoplay, and dnt=1 turns Vimeo's tracking off so
 * the embed sets no cookies — which is what the cookie policy says the site
 * does. A regression here would not look like anything on the page: the film
 * would still play while the site quietly set tracking cookies.
 *
 *   node --experimental-strip-types scripts/test-vimeo-embed.mjs
 */
import { vimeoEmbed } from '../lib/vimeo.ts';

const REQUIRED = ['background=1', 'autoplay=1', 'loop=1', 'muted=1', 'autopause=0', 'dnt=1'];

const cases = [
  // What Vimeo's own Share and Embed buttons hand you, plus a bare id.
  ['1217009975', 'bare id', null],
  ['https://vimeo.com/1217009975', 'share link', null],
  ['https://player.vimeo.com/video/1217009975', 'embed link', null],
  ['https://vimeo.com/1217009975?share=copy', 'share link with param', null],
  ['  1217009975  ', 'whitespace padded', null],
  // Unlisted videos carry a privacy hash; without it the embed 404s.
  ['https://vimeo.com/1217009975/a1b2c3d4e5', 'unlisted, hash in path', 'a1b2c3d4e5'],
  ['https://player.vimeo.com/video/1217009975?h=a1b2c3d4e5', 'unlisted, hash as query', 'a1b2c3d4e5'],
];

// These must yield no film at all, leaving the poster to carry the hero.
const empties = [['', 'empty'], ['not a video', 'free text'], ['https://youtube.com/watch?v=abc', 'wrong platform']];

let failed = 0;
for (const [input, label, hash] of cases) {
  const out = vimeoEmbed(input);
  if (!out || !out.startsWith('https://player.vimeo.com/video/1217009975?')) {
    failed++; console.error(`FAIL  ${label}: did not resolve to the video\n  got: ${out}`); continue;
  }
  const missing = REQUIRED.filter((p) => !out.includes(p));
  if (missing.length) { failed++; console.error(`FAIL  ${label}: missing ${missing.join(', ')}`); }
  if (hash && !out.includes(`h=${hash}`)) { failed++; console.error(`FAIL  ${label}: privacy hash dropped`); }
}
for (const [input, label] of empties) {
  if (vimeoEmbed(input) !== null) { failed++; console.error(`FAIL  ${label}: expected no film`); }
}

if (failed) { console.error(`\n${failed} failing case(s).`); process.exit(1); }
console.log(`vimeoEmbed: ${cases.length + empties.length} cases pass`);
