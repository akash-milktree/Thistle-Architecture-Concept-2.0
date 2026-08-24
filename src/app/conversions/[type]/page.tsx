import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { conversions, getConversion } from '@/data/conversionsData';
import { ConversionPage } from '@/views/ConversionPage';

export function generateStaticParams() {
  return conversions.map((c) => ({ type: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }): Promise<Metadata> {
  const { type } = await params;
  const c = getConversion(type);
  // metaTitle already ends in "| Thistle Architecture", and layout.tsx's
  // title template appends that suffix again to any plain string, which was
  // rendering every conversion page's tab title as "... | Thistle
  // Architecture | Thistle Architecture". `absolute` opts out of the
  // template, same fix as the blog post page.
  const title = c?.metaTitle ?? 'Conversion Feasibility | Thistle Architecture';
  return {
    title: { absolute: title },
    description: c?.metaDescription ?? 'Data-driven feasibility for residential conversions across the UK.',
    alternates: { canonical: `/conversions/${type}` },
  };
}

export default async function Page({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const conversion = getConversion(type);
  if (!conversion) notFound();
  return <ConversionPage conversion={conversion} />;
}
