"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '../components/ui/PageHero';
import { Reveal } from '../components/animations/Reveal';
import { Button } from '../components/ui/Button';
import { useRouter } from 'next/navigation';
import { FAQ } from '../sections/FAQ';
import { Opportunity } from '../sections/conversions/Opportunity';
import { Challenges } from '../sections/conversions/Challenges';
import { HowThistleSolves } from '../sections/conversions/HowThistleSolves';
import { RelatedCaseStudy } from '../sections/conversions/RelatedCaseStudy';
import { ReviewQuote } from '../sections/Testimonials';
import { reviewFor } from '../data/reviewsData';
import type { Conversion } from '../data/conversionsData';

interface ConversionPageProps {
  conversion: Conversion;
}

export const ConversionPage: React.FC<ConversionPageProps> = ({ conversion }) => {
  const router = useRouter();
  const hasExtra = !!conversion.extraSection;

  return (
    <>
      <PageHero
        label={conversion.label}
        heading={conversion.heroHeading}
        description={conversion.heroDescription}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-fl-4">
          <Button variant="primary" icon={<ArrowUpRight size={16} />} onClick={() => router.push('/pricing')}>
            Get Your Fixed Fee
          </Button>
          <Link href="/feasibility-package#how-it-works" className="text-sm text-thistle-black/70 hover:text-thistle-black transition-colors font-medium tracking-tight">
            How it works &rarr;
          </Link>
        </div>
      </PageHero>

      <Opportunity copy={conversion.opportunityCopy} stats={conversion.opportunityStats} />

      <Challenges typeLabel={conversion.label} challenges={conversion.challenges} />

      {conversion.extraSection && (
        <section id={conversion.extraSection.id} className="bg-white py-fl-section px-fl-margin scroll-mt-24">
          <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-fl-8 items-center">
            <Reveal>
              <div className="relative aspect-[4/3] rounded-2xl border border-thistle-black/[0.06] overflow-hidden">
                <Image
                  src={conversion.extraSection.image ?? '/images/projects/beauchamp2/exterior.jpg'}
                  alt={conversion.extraSection.imageAlt ?? 'Beauchamp House, a period office building converted to flats'}
                  fill
                  sizes="(max-width: 1024px) 90vw, 620px"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-4">{conversion.extraSection.eyebrow}</p>
                <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black mb-fl-5">
                  {conversion.extraSection.title}
                </h2>
                {conversion.extraSection.body.map((para, i) => (
                  <p key={i} className="text-fluid-base text-thistle-black/80 leading-relaxed mb-fl-4">
                    {para}
                  </p>
                ))}
                {conversion.extraSection.cta && (
                  <Link
                    href={conversion.extraSection.cta.href}
                    {...(conversion.extraSection.cta.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-thistle-green hover:text-thistle-black transition-colors"
                  >
                    {conversion.extraSection.cta.label}
                    <ArrowUpRight size={15} />
                  </Link>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <HowThistleSolves typeLabel={conversion.label} highlights={conversion.deliverableHighlights} tinted={hasExtra} />

      <RelatedCaseStudy slug={conversion.relatedCaseStudySlug} tinted={!hasExtra} />

      {/* One review, chosen for this conversion type, sitting between the
          case study and the ask: proof of the work, then proof from a client,
          then the request. */}
      {conversion.reviewTopic && (
        <section className={`px-fl-margin pb-fl-section ${hasExtra ? 'bg-white' : 'bg-thistle-white'}`}>
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <ReviewQuote review={reviewFor(conversion.reviewTopic)} />
            </Reveal>
          </div>
        </section>
      )}

      {/* Closing CTA */}
      <section className={`py-fl-section px-fl-margin ${hasExtra ? 'bg-thistle-white' : 'bg-white'}`}>
        <div className="max-w-[1360px] mx-auto text-center">
          <Reveal>
            <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black mb-fl-5">
              Test This Building.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-fluid-base text-thistle-black/80 leading-relaxed max-w-md mx-auto mb-fl-6">
              Submit your property and get a clear Go or No-Go in five days, for a fixed fee.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Button variant="primary" size="lg" icon={<ArrowUpRight size={18} />} onClick={() => router.push('/pricing')}>
              Get Your Fixed Fee
            </Button>
          </Reveal>
        </div>
      </section>

      <FAQ tinted={!hasExtra} />
    </>
  );
};
