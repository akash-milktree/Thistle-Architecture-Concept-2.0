/**
 * How a case study image is fitted to its frame: whole on white (an
 * architectural drawing) or filling the frame and cropped if need be (a
 * photograph).
 *
 * This used to be `src.startsWith('/images/projects/')`, written inline in
 * views/CaseStudyDetailPage.tsx and sections/ExampleProjects.tsx. That test was
 * safe only while every image path was written by hand. It is not any more:
 * the CMS uploads to /images/uploads/ (tina/config.ts), which does not match
 * the prefix, so the moment an editor replaced a drawing through the media
 * picker the drawing started rendering cropped — no 404, no build error, no
 * console warning. A silent visual regression on the one thing a feasibility
 * page exists to show.
 *
 * So the answer is now carried on the image itself, as an explicit `kind` an
 * editor sets in the form, and the path test survives only as the fallback for
 * an image that has no kind — every value in data/caseStudiesData.ts, which is
 * still the fallback the components render from when there is no CMS query.
 *
 * WORTH KNOWING: all 173 seeded values are 'drawing', because all 173 paths in
 * the data module are under /images/projects/ — the photographs included. The
 * seed was derived from the prefix precisely so that nothing moved on the way
 * into the CMS, which means the 'photo' branch is currently unused for case
 * studies rather than merely rare. Reclassifying the real photographs is a
 * visible change to the page and belongs with Ed, not in a migration.
 *
 * This is the only copy. Import it; do not reimplement the prefix test.
 * sections/feasibility-package/DeliverableShowcase.tsx still has two inline
 * copies of it against its own hardcoded paths.
 */

/** Drawings must never be crop-covered; photography can fill its frame. */
export const isDrawing = (src: string, kind?: string | null): boolean =>
  kind === 'drawing' || (kind !== 'photo' && src.startsWith('/images/projects/'));
