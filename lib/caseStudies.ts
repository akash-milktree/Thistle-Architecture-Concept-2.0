import { cache } from 'react';
import client from '@/tina/__generated__/client';
import type { CaseStudy, ConversionType } from '@/data/caseStudiesData';
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
    .map((n): CaseStudy => ({
      // The filename is the slug; there is no separate field that could disagree
      // with the URL the page is served at.
      slug: str(n._sys?.filename),
      kind: (str(n.kind) === 'project' ? 'project' : 'feasibility') as CaseStudy['kind'],
      title: str(n.title),
      location: str(n.location),
      image: normalizeImage(n.image),
      tag: str(n.tag),
      desc: str(n.desc),
      buildingType: str(n.buildingType),
      stats: arr<any>(n.stats).map((s) => ({ label: str(s?.label), value: str(s?.value) })),
      galleryImages: arr<any>(n.galleryImages).map((g) =>
        normalizeImage(typeof g === 'string' ? g : g?.src)
      ),
      conversionTypes: arr<string>(n.conversionTypes) as ConversionType[],
      recommendation: (str(n.recommendation) || undefined) as CaseStudy['recommendation'],
      status: (str(n.status) || undefined) as CaseStudy['status'],
      challenge: str(n.challenge) || undefined,
      approach: str(n.approach) || undefined,
      outcome: str(n.outcome) || undefined,
      floorArea: str(n.floorArea) || undefined,
      planningRoute: str(n.planningRoute) || undefined,
      completionDate: str(n.completionDate) || undefined,
      // Carried so the sort below can use it; not part of the rendered card.
      order: num(n.order, Number.MAX_SAFE_INTEGER),
    } as CaseStudy & { order: number }))
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
