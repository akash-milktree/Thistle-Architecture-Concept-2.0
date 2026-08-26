/**
 * Build the hero film's embed URL from whatever an editor put in the field.
 *
 * Only the video is editable; the parameters are not, and that is deliberate.
 * Each one is load-bearing:
 *   background=1  Vimeo's background mode — no controls, no chrome, no title
 *   muted=1       what iOS requires before it will autoplay at all
 *   dnt=1         turns Vimeo's tracking off, so the embed sets no cookies and
 *                 stays clear of what the cookie policy says the site does
 * Letting someone paste a whole URL would let all three be dropped without it
 * being visible on the page — the film would still play, and the site would
 * quietly be setting tracking cookies it says it does not set.
 *
 * Accepts a bare id, a vimeo.com/<id> link, or a player.vimeo.com/video/<id>
 * link, because those are what you get from Vimeo's own Share and Embed
 * buttons. An unlisted video's privacy hash (vimeo.com/<id>/<hash>) is carried
 * across as ?h=, or the embed 404s for anything not public.
 */
export const vimeoEmbed = (value: string): string | null => {
  const v = (value ?? '').trim();
  if (!v) return null;

  let id = '';
  let hash = '';

  const bare = v.match(/^(\d+)(?:[/?#](\w+))?$/);
  const link = v.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/(\w+))?/i);
  if (bare) { id = bare[1]; hash = bare[2] ?? ''; }
  else if (link) { id = link[1]; hash = link[2] ?? ''; }
  if (!id) return null;

  const q = new URLSearchParams({
    background: '1', autoplay: '1', loop: '1', muted: '1', autopause: '0', dnt: '1',
  });
  // The privacy hash also arrives as ?h= on some copied URLs.
  const fromQuery = v.match(/[?&]h=(\w+)/);
  if (!hash && fromQuery) hash = fromQuery[1];
  if (hash) q.set('h', hash);

  return `https://player.vimeo.com/video/${id}?${q.toString()}`;
};
