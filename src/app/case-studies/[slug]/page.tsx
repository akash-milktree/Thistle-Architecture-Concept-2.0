import type { Metadata } from 'next';
import { caseStudies } from '@/data/caseStudiesData';
import { CaseStudyDetailPage } from '@/views/CaseStudyDetailPage';

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const cs = caseStudies.find((c) => c.slug === params.slug);
  return {
    title: cs?.title ?? 'Case Study',
    description: cs?.desc ?? 'Thistle Architecture case study.',
  };
}

export default function Page() {
  return <CaseStudyDetailPage />;
}
