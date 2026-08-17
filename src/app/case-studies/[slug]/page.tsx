import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { caseStudies } from '@/data/caseStudiesData';
import { CaseStudyDetailPage } from '@/views/CaseStudyDetailPage';

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  return {
    title: cs?.title ?? 'Case Study',
    description: cs?.desc ?? 'Thistle Architecture case study.',
    alternates: { canonical: `/case-studies/${slug}` },
  };
}

// An unknown slug used to render "Case study not found" with a 200, which is a
// soft 404: search engines index the URL as a real page. It matters now that
// bishopstoke and forest-home have been removed. Fail properly instead, the way
// /conversions/[type] already does.
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!caseStudies.some((c) => c.slug === slug)) notFound();
  return <CaseStudyDetailPage />;
}
