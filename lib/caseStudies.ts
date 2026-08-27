import { cache } from 'react';
import client from '@/tina/__generated__/client';
import { caseStudies, type CaseStudy, type ConversionType } from '@/data/caseStudiesData';
import { str, num, arr, normalizeImage } from '@/lib/tina';

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * The case studies, read from the CMS rather than from data/caseStudiesData.ts.
 *
 * This is what lets an editor add a case study. Creating a document already
 * produced a detail page — /case-studies/[slug] builds its params from the Tina
 * connection — but nothing linked to it, because the two listing pages and the
 * sitemap were still reading the TypeScript module, which only a developer can
 * add to. A new study appeared at its URL and was reachable from nowhere.
 *
 * Ordering is explicit and not incidental. The listings used to take their
 * order from array position in the module; a connection returns documents in
 * filename order, so switching source without an `order` field would have
 * quietly reshuffled both pages. Every existing study was seeded with its
 * current position, so the order on the page is unchanged.
 *
 * Server-only: it uses the generated client, which client components cannot
 * call. Cached per request so a page rendering both the listing and the sitemap
 * does not fetch twice.
 */
export const getCaseStudies = cache(async (): Promise<CaseStudy[]> => {
  const nodes: any[] = [];
  let after: string | undefined;

  // Tina returns 50 documents at a time. There are 35 today, so this goes round
  // once — but it loops, because being silently truncated here would drop case
  // studies off the listings and out of the sitemap with nothing to notice.
  for (;;) {
    const { data } = await client.queries.caseStudyConnection({ after });
    const connection = data.caseStudyConnection;
    for (const edge of connection?.edges ?? []) {
      if (edge?.node) nodes.push(edge.node);
    }
    if (!connection?.pageInfo?.hasNextPage) break;
    after = connection.pageInfo.endCursor ?? undefined;
  }

  return nodes
    .map((n): CaseStudy => {
      // The filename is the slug; there is no separate field that could disagree
      // with the URL the page is served at.
      const slug = str(n._sys?.filename);

      // Same fallback the detail page uses: a study whose image field is empty
      // shows the picture from code rather than an empty frame. It only bites a
      // document seeded without one, but an image is the whole of a card.
      const fallback = caseStudies.find((c) => c.slug === slug);

      return {
        slug,
        kind: (str(n.kind) === 'project' ? 'project' : 'feasibility') as CaseStudy['kind'],
        title: str(n.title),
        location: str(n.location),
        image: normalizeImage(n.image, fallback?.image ?? ''),
        // Carried, not dropped. The homepage band fits the picture with
        // isDrawing(), which falls back to testing for the '/images/projects/'
        // prefix, and an image an editor uploads lands in '/images/uploads/',
        // fails that test and starts cropping a drawing. The explicit kind is
        // what stops that; see components/case-study/imageFit.ts.
        imageKind: str(n.image?.kind) || undefined,
        tag: str(n.tag),
        desc: str(n.desc),
        buildingType: str(n.buildingType),
        // The grouped paths below are the Create-form regrouping: these fifteen
        // fields moved into listing/facts/writeup/seo so the form opens on the
        // seven things every study needs rather than twenty-five flat ones.
        stats: arr<any>(n.facts?.stats).map((s) => ({ label: str(s?.label), value: str(s?.value) })),
        // normalizeImage unwraps the { src, kind } object itself, so this
        // takes either shape.
        galleryImages: arr<any>(n.galleryImages).map((g) => normalizeImage(g)),
        conversionTypes: arr<string>(n.listing?.conversionTypes) as ConversionType[],
        recommendation: (str(n.listing?.recommendation) || undefined) as CaseStudy['recommendation'],
        status: (str(n.listing?.status) || undefined) as CaseStudy['status'],
        challenge: str(n.writeup?.challenge) || undefined,
        approach: str(n.writeup?.approach) || undefined,
        outcome: str(n.writeup?.outcome) || undefined,
        floorArea: str(n.floorArea) || undefined,
        planningRoute: str(n.facts?.planningRoute) || undefined,
        completionDate: str(n.facts?.completionDate) || undefined,
        // Carried so the sort below can use it; not part of the rendered card.
        order: num(n.listing?.order, Number.MAX_SAFE_INTEGER),
      } as CaseStudy & { order: number };
    })
    .sort((a, b) => (a as any).order - (b as any).order);
});

/** Completed projects, in the order the listing shows them. */
export const getCompletedProjects = cache(async () =>
  (await getCaseStudies()).filter((c) => c.kind === 'project')
);

/** Feasibility studies, in the order the listing shows them. */
export const getFeasibilityStudies = cache(async () =>
  (await getCaseStudies()).filter((c) => c.kind === 'feasibility')
);

/**
 * Turn a Tina reference into the slug of the case study it points at.
 *
 * A reference has two shapes depending on where it is read, and both turn up:
 *
 *  - Through the generated client it is a RESOLVED DOCUMENT. Tina inlines the
 *    whole referenced record, including `_sys`, so the slug is `_sys.filename`.
 *    This is the shape every server page sees, and assuming the other one is
 *    why the first version of this silently fell back to the code defaults on
 *    every page — the value was right in the CMS and never reached the page.
 *  - On disk, and in a raw JSON read, it is the PATH string
 *    'content/case-studies/axis-house.json'.
 *
 * The filename is the slug, so both reduce to the same thing.
 */
export const slugFromRef = (ref: unknown): string => {
  if (typeof ref === 'string') return ref.split('/').pop()?.replace(/\.json$/, '') ?? '';
  const sys = (ref as any)?._sys;
  if (sys?.filename) return String(sys.filename);
  // Some shapes carry the path but not _sys.
  const path = (ref as any)?._sys?.relativePath ?? (ref as any)?.id;
  return typeof path === 'string' ? path.split('/').pop()?.replace(/\.json$/, '') ?? '' : '';
};

/** Resolve one reference to its case study. */
export const getCaseStudyByRef = async (ref: unknown): Promise<CaseStudy | undefined> => {
  const slug = slugFromRef(ref);
  if (!slug) return undefined;
  return (await getCaseStudies()).find((c) => c.slug === slug);
};

/** Resolve a list of references, dropping any that no longer point anywhere. */
export const getCaseStudiesByRefs = async (refs: readonly unknown[]): Promise<CaseStudy[]> => {
  const all = await getCaseStudies();
  return refs
    .map((r) => all.find((c) => c.slug === slugFromRef(r)))
    .filter((c): c is CaseStudy => !!c);
};
