/**
 * Shared helpers for reading TinaCMS data.
 *
 * Tina's generated types make almost every field nullable, because a document
 * on disk can always be missing a field the schema declares. Rather than
 * scatter `?? ''` through the components, everything is coerced here, once, on
 * the way out of a query.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

/** Coerce an unknown Tina value to a string. */
export const str = (v: unknown): string => (typeof v === 'string' ? v : '');

/** Coerce an unknown Tina value to a number. */
export const num = (v: unknown, fallback = 0): number =>
  typeof v === 'number' && Number.isFinite(v) ? v : fallback;

/** Coerce an unknown Tina value to an array, dropping nulls. */
export const arr = <T = any,>(v: unknown): T[] =>
  Array.isArray(v) ? (v.filter((x) => x != null) as T[]) : [];

/**
 * A phone number as typed by an editor ("0808 175 5405") turned into something
 * a handset can dial.
 *
 * The national trunk 0 becomes +44, which is what the hardcoded hrefs were
 * before the number became editable: dialling the national form fails for
 * anyone abroad, and this practice publishes to an audience that is not
 * reliably in the UK. A number already in international form is left alone, so
 * a non-UK number can still be entered in full.
 *
 * This is the ONLY copy. The number is one CMS field rendered in several
 * places, so a second implementation that drifts would have some links dialling
 * differently from others.
 */
export const telHref = (phone: string): string => {
  const digits = phone.replace(/[^\d+]/g, '');
  return `tel:${digits.startsWith('0') ? `+44${digits.slice(1)}` : digits}`;
};

/**
 * Drop keys whose value is undefined, null or an empty string.
 *
 * Used when spreading CMS values over a set of fallbacks. A field an editor has
 * never filled in comes back as null, and a field they have cleared comes back
 * as ''. Spreading either one raw would replace good standing copy with a blank
 * on the page; pruning first means an empty field simply leaves the fallback in
 * place.
 */
export const pruneEmpty = <T extends object>(o: T | undefined | null): Partial<T> => {
  if (!o) return {};
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(o)) {
    if (v !== undefined && v !== null && v !== '') out[k] = v;
  }
  return out as Partial<T>;
};

/**
 * The top-level folders under public/images that hold the curated, committed
 * image set — everything that predates the CMS. They are developer-managed and
 * deliberately outside the media store, so the editor cannot overwrite a
 * hand-optimised drawing.
 *
 * Keep this in step with public/images/ if a new folder is added there.
 */
const CURATED_IMAGE_DIRS = new Set(['blog', 'deliverables', 'projects', 'site', 'team', 'team-review']);

/**
 * Normalise an image value coming out of Tina back to a repo-relative path.
 *
 * Media is repo-based (tina/config.ts), so what is committed is already a
 * relative '/images/...' path and this is usually a passthrough. It matters in
 * exactly one window: while the editor is open, TinaCloud serves a
 * just-uploaded file from its own CDN and the live preview receives that
 * absolute URL before the save round-trips to git.
 *
 * That window is not cosmetic here. Rendering keys off the path — isDrawing()
 * tests `startsWith('/images/projects/')` to choose object-contain on white for
 * architectural drawings versus object-cover on tint for photography. An
 * absolute CDN URL fails that test silently and crops every drawing, with no
 * 404 and no console warning. So the URL is mapped back before it reaches any
 * component.
 *
 * The CDN path is relative to mediaRoot, so 'images/uploads/' is re-prepended.
 *
 * This is the only copy. Import it; do not reimplement it.
 */
export function normalizeImage(v: unknown, fallback = ''): string {
  const s = typeof v === 'string' ? v.trim() : '';
  if (!s) return fallback;

  if (/^https?:\/\/assets\.tina\.io\//i.test(s)) {
    // Two CDN shapes exist: a current '<clientId>/<path>' and an older
    // '…/__file/<path>'. Both reduce to a path.
    const viaFile = s.match(/\/__file\/(.+)$/);
    const rest = (viaFile ? viaFile[1] : s.replace(/^https?:\/\/assets\.tina\.io\/[^/]+\//i, ''))
      .replace(/^\/+/, '')
      .replace(/^images\//, '');

    // Where that path maps back to depends on which of two populations the
    // file belongs to, and getting this wrong 404s silently in production
    // (it did: /images/projects/... came back as /images/uploads/projects/...).
    //
    // The curated set was committed long before the CMS existed and lives
    // directly under /images/<dir>/. It is not in the media store, so a CDN
    // URL for one carries its real subdirectory and must keep it.
    //
    // Anything an editor uploads goes to mediaRoot (images/uploads), and its
    // CDN path is relative to that root, so it arrives with no leading
    // directory and needs the upload root put back.
    const head = rest.split('/')[0];
    return CURATED_IMAGE_DIRS.has(head) ? `/images/${rest}` : `/images/uploads/${rest}`;
  }

  if (s.startsWith('http://') || s.startsWith('https://')) return s;
  return s.startsWith('/') ? s : `/${s}`;
}
