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
 * WORTH KNOWING: every one of the 219 values is 'drawing', set explicitly. An
 * audit of the actual image content found only 29 of the 198 distinct files are
 * genuine drawings; the other 169 are photographs, and 135 of those would be
 * framed differently if they were labelled as such — wide shots letterboxed
 * today would fill and crop, and the 19 portrait ones would change most.
 *
 * That was reviewed and the decision was to keep the pre-CMS appearance: the
 * site has always shown all of them whole-on-white, and changing 135 images at
 * once is a visible redesign of the case-study pages, not a migration. So the
 * values are pinned rather than corrected, and the page renders exactly as it
 * did before the CMS existed.
 *
 * Pinned explicitly, not left to the prefix fallback, because the fallback is
 * fragile: CMS uploads land in /images/uploads/, which fails the prefix test,
 * so a replaced image would silently start cropping. An explicit kind survives
 * that. Switching any image to 'photo' is a deliberate, per-image decision.
 *
 * This is the only copy. Import it; do not reimplement the prefix test.
 * sections/feasibility-package/DeliverableShowcase.tsx still has two inline
 * copies of it against its own hardcoded paths.
 */

/** Drawings must never be crop-covered; photography can fill its frame. */
export const isDrawing = (src: string, kind?: string | null): boolean =>
  kind === 'drawing' || (kind !== 'photo' && src.startsWith('/images/projects/'));
