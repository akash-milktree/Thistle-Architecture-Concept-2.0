import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getConversion, conversionPath } from '@/data/conversionsData';
import { ConversionPage } from '@/views/ConversionPage';
import client from '@/tina/__generated__/client';
import { slugFromRef } from '@/lib/caseStudies';

/**
 * The sector's own CMS document, or null if it has none.
 *
 * The Tina client throws for a relativePath with no file behind it, which on
 * this route is the ordinary case rather than an exception: dynamicParams is
 * left at its default, so any /conversions/<anything> URL reaches this file.
 * Nothing here decides whether the page exists — getConversion does that below,
 * exactly as before — so a missing document just means "render from the copy in
 * code".
 */
async function loadSector(type: string) {
  try {
    return await client.queries.conversion({ relativePath: `${type}.json` });
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  // The five slugs come from the CMS rather than from the data module, so the
  // set of pages built is the set of documents that exist. content/conversions
  // has create and delete disabled and its filenames are read-only, so it stays
  // the same five as the records in code; if it ever did not, an extra document
  // would build a page that getConversion() below still sends to notFound(),
  // which is the safe direction for it to fail in.
  const sectors = await client.queries.conversionConnection();
  return (sectors.data.conversionConnection.edges ?? [])
    .map((edge) => edge?.node?._sys.filename)
    .filter((filename): filename is string => !!filename)
    .map((type) => ({ type }));
}

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }): Promise<Metadata> {
  const { type } = await params;
  const fallback = getConversion(type);
  const sector = await loadSector(type);
  const c = sector?.data.conversion;

  // metaTitle already ends in "| Thistle Architecture", and layout.tsx's
  // title template appends that suffix again to any plain string, which was
  // rendering every conversion page's tab title as "... | Thistle
  // Architecture | Thistle Architecture". `absolute` opts out of the
  // template, same fix as the blog post page. The field description says to
  // keep the suffix when editing, for the same reason.
  const title = c?.metaTitle || fallback?.metaTitle || 'Conversion Feasibility | Thistle Architecture';
  return {
    title: { absolute: title },
    description:
      c?.metaDescription ||
      fallback?.metaDescription ||
      'Data-driven feasibility for residential conversions across the UK.',
    // conversionPath, not the folder this file sits in: high-end residential
    // is served at /expertise/ through a rewrite and must say so.
    alternates: { canonical: conversionPath(type) },
  };
}

export default async function Page({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;

  // Still the record in code that decides whether this page exists. It carries
  // everything that is structure rather than copy — which review and which case
  // study the page shows, whether it has an extra band — so a URL with no
  // record behind it has no page to render even if a document turned up.
  const conversion = getConversion(type);
  if (!conversion) notFound();

  // The raw query, variables and data are all handed down, not just the data:
  // useTina needs the query to re-run it against the editor's live values.
  const [sector, overview, sectors, reviews] = await Promise.all([
    loadSector(type),
    client.queries.conversionsIndex({ relativePath: 'index.json' }),
    client.queries.conversionConnection(),
    client.queries.reviewConnection(),
  ]);

  // Which study is featured is chosen on this sector's own CMS document, as a
  // reference. Falls back to the slug in the data module so a sector that has
  // not been given one still shows what it showed before.
  const relatedSlug =
    slugFromRef((sector?.data as any)?.conversion?.relatedCaseStudy) ||
    conversion.relatedCaseStudySlug;

  return (
    <ConversionPage
      conversion={conversion}
      relatedCaseStudySlug={relatedSlug}
      page={sector ? { query: sector.query, variables: sector.variables, data: sector.data } : undefined}
      overview={{ query: overview.query, variables: overview.variables, data: overview.data }}
      sectors={{ query: sectors.query, variables: sectors.variables, data: sectors.data }}
      reviews={{ query: reviews.query, variables: reviews.variables, data: reviews.data }}
    />
  );
}
