"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useTina } from 'tinacms/dist/react';
import { PageHero } from '../components/ui/PageHero';
import { Reveal } from '../components/animations/Reveal';
import { Button } from '../components/ui/Button';
import { useRouter } from 'next/navigation';
import { FAQ } from '../sections/FAQ';
import { Opportunity, type OpportunityStat } from '../sections/conversions/Opportunity';
import { Challenges, type ChallengeItem } from '../sections/conversions/Challenges';
import { HowThistleSolves, type HighlightItem } from '../sections/conversions/HowThistleSolves';
import { RelatedCaseStudy } from '../sections/conversions/RelatedCaseStudy';
import { ReviewQuote, type ReviewItem } from '../sections/Testimonials';
import { reviewByAuthor } from '../data/reviewsData';
import { conversions, type Conversion, type ConversionFaq, conversionPath } from '../data/conversionsData';
import { f, type TinaQuery, EMPTY_QUERY } from '../lib/tina-fields';
import { str, arr, pruneEmpty, normalizeImage } from '../lib/tina';

// The copy for these five pages now lives in content/conversions/<slug>.json,
// seeded byte-for-byte from data/conversionsData.ts. The record in code stays
// as the fallback for every field, so the page renders unchanged if it is ever
// mounted without a CMS query, and it remains the source of the things that
// are structure rather than copy: which review and which case study a page
// shows, whether it has an extra band, and the order the five appear in.

// The band's own defaults, unchanged from when they were inline in the JSX:
// the extra section only carries a photograph where it needs a specific one.
const EXTRA_IMAGE_FALLBACK = '/images/projects/beauchamp2/exterior.jpg';
const EXTRA_IMAGE_ALT_FALLBACK = 'Beauchamp House, a period office building converted to flats';

// Wording shared by all five pages, so it lives once in the Expertise Overview
// document rather than five times over. These are the fallbacks for the two
// blocks this view renders itself; each section component carries its own.
const CLOSING_FALLBACK = {
  heading: 'Test This Building.',
  body: 'Submit your property and get a clear Go or No-Go in five days, for a fixed fee.',
  ctaLabel: 'Get Your Fixed Fee',
};
const OTHER_EXPERTISE_FALLBACK = 'Other Expertise';

interface ConversionPageProps {
  /**
   * The record in code. Still required: it is the fallback for every field and
   * the source of everything that is not copy.
   */
  conversion: Conversion;
  /**
   * Slug of the case study featured near the bottom, resolved on the server
   * from this sector's CMS reference. Falls back to the record in code.
   */
  relatedCaseStudySlug?: string;
  // The four below are raw CMS queries, passed straight through from the server
  // page so that useTina can re-run them live inside the editor. All optional,
  // so the page still renders if it is mounted without them.
  /** This sector's own document, from the `conversion` collection. */
  page?: TinaQuery;
  /** The Expertise Overview document, for the wording shared by all five. */
  overview?: TinaQuery;
  /** All five sectors, for the cross-links at the bottom of the page. */
  sectors?: TinaQuery;
  /** The Trustpilot reviews, for the one quoted on this page. */
  reviews?: TinaQuery;
}

export const ConversionPage: React.FC<ConversionPageProps> = ({
  conversion,
  page,
  overview,
  sectors,
  reviews,
  relatedCaseStudySlug,
}) => {
  const router = useRouter();

  // useTina returns the server data verbatim on the public site and swaps in
  // the live form values inside the editor. Passing a null-ish query is not
  // allowed, so the hooks run against the shared stub when the props are
  // absent and the results are discarded below.
  const { data: livePage } = useTina(page ?? EMPTY_QUERY);
  const { data: liveOverview } = useTina(overview ?? EMPTY_QUERY);
  const { data: liveSectors } = useTina(sectors ?? EMPTY_QUERY);
  const { data: liveReviews } = useTina(reviews ?? EMPTY_QUERY);

  const c = page ? (livePage as any)?.conversion : undefined;
  const shared = overview ? (liveOverview as any)?.conversionsIndex?.shared : undefined;

  // Whether this page has an extra band stays a code decision: it also decides
  // how the pale and white bands alternate down the rest of the page, so it is
  // layout, not copy.
  const hasExtra = !!conversion.extraSection;

  // Spread over the fallbacks with pruneEmpty: a field an editor has cleared
  // comes back as '' and would otherwise blank the page, so an empty field
  // simply leaves the standing copy in place.
  const hero = {
    label: conversion.label,
    heading: conversion.heroHeading,
    description: conversion.heroDescription,
    ...pruneEmpty({
      label: str(c?.hero?.label),
      heading: str(c?.hero?.heading),
      description: str(c?.hero?.description),
    }),
  };

  const opportunityCopy = str(c?.opportunity?.copy) || conversion.opportunityCopy;

  const closing = { ...CLOSING_FALLBACK, ...pruneEmpty({
    heading: str(shared?.ctaHeading),
    body: str(shared?.ctaBody),
    ctaLabel: str(shared?.ctaLabel),
  }) };

  // Lists are all-or-nothing rather than merged item by item: the fallback
  // stands in only while there is no list at all, because an editor deleting
  // the fourth risk has to be able to delete it, not have it reappear. Each
  // item carries its own field ids so a click resolves to that item.
  const cmsStats = arr<any>(c?.opportunity?.stats);
  const stats: OpportunityStat[] = cmsStats.length
    ? cmsStats.map((s) => ({
        label: str(s?.label),
        value: str(s?.value),
        tina: { label: f(s, 'label'), value: f(s, 'value') },
      }))
    : conversion.opportunityStats;

  const cmsChallenges = arr<any>(c?.challenges);
  const challenges: ChallengeItem[] = cmsChallenges.length
    ? cmsChallenges.map((ch) => ({
        title: str(ch?.title),
        detail: str(ch?.detail),
        tina: { title: f(ch, 'title'), detail: f(ch, 'detail') },
      }))
    : conversion.challenges;

  const cmsHighlights = arr<any>(c?.deliverableHighlights);
  const highlights: HighlightItem[] = cmsHighlights.length
    ? cmsHighlights.map((h) => ({
        // A read-only join key in the editor, seeded from the record in code.
        // deliverableFor() simply finds nothing if it is ever something else,
        // and the card is dropped rather than pointing at the wrong one.
        deliverableId: str(h?.deliverableId),
        forThisType: str(h?.forThisType),
        tina: { forThisType: f(h, 'forThisType') },
      }))
    : conversion.deliverableHighlights;

  const cmsFaqs = arr<any>(c?.faqs);
  const faqs: ConversionFaq[] | undefined = cmsFaqs.length
    ? cmsFaqs.map((q) => ({ question: str(q?.question), answer: str(q?.answer) }))
    : conversion.faqs;

  // The extra band, where this page has one. Its anchor id and the destination
  // of its link stay in code; everything visible in it is editable.
  const cmsExtra = c?.extraSection;
  const cmsExtraBody = arr<any>(cmsExtra?.body);
  const extraBody: Array<{ text: string; field?: string }> = cmsExtraBody.length
    ? cmsExtraBody.map((p) => ({ text: str(p?.text), field: f(p, 'text') }))
    : (conversion.extraSection?.body ?? []).map((text) => ({ text }));
  const extra = conversion.extraSection
    ? {
        ...conversion.extraSection,
        ...pruneEmpty({
          eyebrow: str(cmsExtra?.eyebrow),
          title: str(cmsExtra?.title),
        }),
        image: normalizeImage(cmsExtra?.image, conversion.extraSection.image ?? EXTRA_IMAGE_FALLBACK),
        imageAlt:
          str(cmsExtra?.imageAlt) || conversion.extraSection.imageAlt || EXTRA_IMAGE_ALT_FALLBACK,
        ctaLabel: str(cmsExtra?.ctaLabel) || conversion.extraSection.cta?.label || '',
      }
    : undefined;

  // Which review appears here is chosen in code: reviewAuthor names a record
  // rather than saying anything. The words are then taken from that review's
  // own CMS document, matched on the author, so the quote on the page is the
  // live one and can be clicked to edit, and so there is still exactly one
  // place a review is worded.
  const codeReview = conversion.reviewAuthor ? reviewByAuthor(conversion.reviewAuthor) : undefined;
  const cmsReview = codeReview && reviews
    ? arr<any>((liveReviews as any)?.reviewConnection?.edges)
        .map((e: any) => e?.node)
        .find((n: any) => str(n?.author) === codeReview.author)
    : undefined;
  const review: ReviewItem | undefined = codeReview
    ? {
        ...codeReview,
        ...pruneEmpty({
          author: str(cmsReview?.author),
          title: str(cmsReview?.title),
          quote: str(cmsReview?.quote),
          date: str(cmsReview?.date),
        }),
        tina: {
          author: f(cmsReview, 'author'),
          title: f(cmsReview, 'title'),
          quote: f(cmsReview, 'quote'),
          date: f(cmsReview, 'date'),
        },
      }
    : undefined;

  // Two-way linking between Expertise pages, per Ed's August 2026 final
  // brief. Not the current page, so a reader always sees genuine alternatives.
  //
  // Membership and order stay in code; only the names are read from the CMS,
  // so renaming a sector renames it here too rather than leaving these chips
  // saying something the sector's own page no longer says. The same chips on
  // a case study page (views/CaseStudyDetailPage.tsx) still use the name in
  // code — worth bringing into line when that page moves to the CMS.
  const cmsNames = new Map<string, string>(
    arr<any>((liveSectors as any)?.conversionConnection?.edges)
      .map((e: any) => e?.node)
      .filter(Boolean)
      .map((n: any) => [str(n?._sys?.filename), str(n?.hero?.label)] as [string, string])
      .filter(([slug, label]) => !!slug && !!label),
  );
  const otherExpertise = conversions
    .filter((x) => x.slug !== conversion.slug)
    .map((x) => ({ slug: x.slug, label: cmsNames.get(x.slug) || x.label }));

  return (
    <>
      <PageHero
        label={hero.label}
        heading={hero.heading}
        description={hero.description}
        tina={{
          label: f(c?.hero, 'label'),
          heading: f(c?.hero, 'heading'),
          description: f(c?.hero, 'description'),
        }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-fl-4">
          <Button variant="primary" icon={<ArrowUpRight size={16} />} onClick={() => router.push('/pricing#calculator')} data-tina-field={f(shared, 'ctaLabel')}>
            {closing.ctaLabel}
          </Button>
          {/* Wayfinding to another page rather than a claim about the work, so
              this one stays in code. */}
          <Link href="/feasibility-package#how-it-works" className="text-sm text-thistle-black/70 hover:text-thistle-black transition-colors font-medium tracking-tight">
            How it works &rarr;
          </Link>
        </div>
      </PageHero>

      <Opportunity
        copy={opportunityCopy}
        stats={stats}
        eyebrow={str(shared?.opportunityEyebrow) || undefined}
        tina={{ eyebrow: f(shared, 'opportunityEyebrow'), copy: f(c?.opportunity, 'copy') }}
      />

      <Challenges
        typeLabel={hero.label}
        challenges={challenges}
        eyebrow={str(shared?.challengesEyebrow) || undefined}
        heading={str(shared?.challengesHeading) || undefined}
        tina={{
          eyebrow: f(shared, 'challengesEyebrow'),
          heading: f(shared, 'challengesHeading'),
          typeLabel: f(c?.hero, 'label'),
        }}
      />

      {extra && (
        <section id={extra.id} className="bg-white py-fl-section px-fl-margin scroll-mt-24">
          <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-fl-8 items-center">
            <Reveal>
              <div className="relative aspect-[4/3] rounded-2xl border border-thistle-black/[0.06] overflow-hidden">
                {/* The marker goes on the image itself, not the rounded frame
                    around it: the frame is a wrapper, and a marker there would
                    swallow every click inside it. */}
                <Image
                  src={extra.image}
                  alt={extra.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 90vw, 620px"
                  className="object-cover"
                  data-tina-field={f(cmsExtra, 'image')}
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-4" data-tina-field={f(cmsExtra, 'eyebrow')}>{extra.eyebrow}</p>
                <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black mb-fl-5" data-tina-field={f(cmsExtra, 'title')}>
                  {extra.title}
                </h2>
                {/* Keyed by position, not by text: the paragraph is a live form
                    value in the editor, so keying on it remounts as you type. */}
                {extraBody.map((para, i) => (
                  <p key={i} className="text-fluid-base text-thistle-black/80 leading-relaxed mb-fl-4" data-tina-field={para.field}>
                    {para.text}
                  </p>
                ))}
                {conversion.extraSection?.cta && (
                  <Link
                    href={conversion.extraSection.cta.href}
                    {...(conversion.extraSection.cta.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-thistle-green hover:text-thistle-black transition-colors"
                    data-tina-field={f(cmsExtra, 'ctaLabel')}
                  >
                    {extra.ctaLabel}
                    <ArrowUpRight size={15} />
                  </Link>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <HowThistleSolves
        typeLabel={hero.label}
        highlights={highlights}
        tinted={hasExtra}
        eyebrow={str(shared?.solveEyebrow) || undefined}
        heading={str(shared?.solveHeading) || undefined}
        tina={{
          eyebrow: f(shared, 'solveEyebrow'),
          heading: f(shared, 'solveHeading'),
          typeLabel: f(c?.hero, 'label'),
        }}
      />

      <RelatedCaseStudy
        slug={relatedCaseStudySlug ?? conversion.relatedCaseStudySlug}
        tinted={!hasExtra}
        /* Built from this page's own label, not shared copy. The shared
           eyebrow had been set to "HMO Feasibility Case Study" and was showing
           on all five pages, including mixed use and high-end residential
           (item 74 of Ed's September 2026 list). */
        eyebrow={`${hero.label} Case Study`}
        heading={str(shared?.caseStudyHeading) || undefined}
        note={str(c?.relatedCaseStudyNote) || conversion.relatedCaseStudyNote}
        tina={{ eyebrow: f(c?.hero, 'label'), heading: f(shared, 'caseStudyHeading'), note: f(c, 'relatedCaseStudyNote') }}
      />

      {/* One review, chosen for this conversion type, sitting between the
          case study and the ask: proof of the work, then proof from a client,
          then the request. */}
      {review && (
        <section className={`px-fl-margin pb-fl-section ${hasExtra ? 'bg-white' : 'bg-thistle-white'}`}>
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <ReviewQuote review={review} />
            </Reveal>
          </div>
        </section>
      )}

      {/* Closing CTA */}
      <section className={`py-fl-section px-fl-margin ${hasExtra ? 'bg-thistle-white' : 'bg-white'}`}>
        <div className="max-w-[1360px] mx-auto text-center">
          <Reveal>
            <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black mb-fl-5" data-tina-field={f(shared, 'ctaHeading')}>
              {closing.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-fluid-base text-thistle-black/80 leading-relaxed max-w-md mx-auto mb-fl-6" data-tina-field={f(shared, 'ctaBody')}>
              {closing.body}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Button variant="primary" size="lg" icon={<ArrowUpRight size={18} />} onClick={() => router.push('/pricing#calculator')} data-tina-field={f(shared, 'ctaLabel')}>
              {closing.ctaLabel}
            </Button>
          </Reveal>
        </div>
      </section>

      {/* The accordion is shared with the home and feasibility pages, so the
          questions are editable in the sector's form but carry no click-to-edit
          marker yet. */}
      <FAQ tinted={!hasExtra} faqs={faqs} />

      {/* Other Expertise pages, so the site's five sectors link to each other
          rather than each being a dead end. */}
      <section className={`py-fl-8 px-fl-margin ${hasExtra ? 'bg-white' : 'bg-thistle-white'}`}>
        <div className="max-w-[1360px] mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-thistle-black/40 font-semibold mb-fl-4" data-tina-field={f(shared, 'otherExpertiseEyebrow')}>
            {str(shared?.otherExpertiseEyebrow) || OTHER_EXPERTISE_FALLBACK}
          </p>
          <div className="flex flex-wrap gap-fl-3">
            {/* No markers on the chips: each one is another page's name, and
                marking it would both edit a page you are not looking at and
                cancel the click that was meant to take you there. */}
            {otherExpertise.map((x) => (
              <Link
                key={x.slug}
                href={conversionPath(x.slug)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-thistle-black/[0.08] bg-white text-sm font-medium text-thistle-black hover:border-thistle-green/40 hover:text-thistle-green transition-colors"
              >
                {x.label}
                <ArrowUpRight size={14} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
