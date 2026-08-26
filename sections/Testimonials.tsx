"use client";

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../components/animations/Reveal';
import { reviews as fallbackReviews, REVIEWS_URL, type Review } from '../data/reviewsData';

/**
 * A review plus the CMS field ids for its own editable fields.
 *
 * The ids are per-item, not per-list: `tinaField(reviews[2], 'quote')` resolves
 * to that one review's quote, so clicking it in the editor opens that record
 * rather than an empty form.
 */
export type ReviewItem = Review & {
  tina?: { title?: string; quote?: string; author?: string; date?: string };
};

// This section used to run ten invented testimonials past each other in two
// infinite marquees. The names and companies were all made up.
//
// Five real reviews cannot fill a marquee, and should not try to: a loop of
// five is visibly a loop, and scrolling text away from a reader is the wrong
// treatment for the only genuine proof on the page. So the layout changed with
// the content. One review is given room as a pull quote, the rest sit still and
// can be read.

const Stars: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex gap-0.5 ${className}`} aria-label="Rated 5 out of 5">
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill="currentColor" className="text-thistle-green" aria-hidden="true">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

// Attribution is deliberately explicit on every card. The reason these replaced
// the invented set is that a reader can go and check them, which only works if
// the source is named and linked.
const Attribution: React.FC<{ review: ReviewItem }> = ({ review }) => (
  <div className="flex items-baseline gap-fl-2 flex-wrap">
    <span className="text-fluid-sm font-medium text-thistle-black" data-tina-field={review.tina?.author}>
      {review.author}
    </span>
    <span className="text-xs text-thistle-black/40">
      {/* Only the date carries the marker, not the " · via Trustpilot" that
          follows it, so clicking the date edits the date and clicking the link
          still opens Trustpilot. */}
      <span data-tina-field={review.tina?.date}>{review.date}</span> · via{' '}
      <a
        href={REVIEWS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 hover:text-thistle-black transition-colors"
      >
        Trustpilot
      </a>
    </span>
  </div>
);

const ReviewCard: React.FC<{ review: ReviewItem }> = ({ review }) => (
  <figure className="h-full flex flex-col bg-thistle-white/70 border border-thistle-black/[0.06] rounded-2xl p-fl-5">
    <Stars className="mb-fl-3" />
    {review.title && (
      <figcaption className="text-fluid-sm font-semibold text-thistle-black mb-fl-2" data-tina-field={review.tina?.title}>
        {review.title}
      </figcaption>
    )}
    <blockquote
      className="text-fluid-sm text-thistle-black/70 leading-[1.75] mb-fl-4 flex-1"
      data-tina-field={review.tina?.quote}
    >
      {review.quote}
    </blockquote>
    <div className="pt-fl-4 border-t border-thistle-black/[0.06]">
      <Attribution review={review} />
    </div>
  </figure>
);

interface TestimonialsProps {
  eyebrow?: string;
  heading?: string;
  /** Lead with a specific review, so a page can front the most relevant one. */
  featuredAuthor?: string;
  /**
   * Supporting line under the heading. Falls back to the standing line, which
   * is a checkable factual claim rather than a score — see the note below.
   */
  lede?: string;
  /** Label on the link out to the full Trustpilot profile. */
  linkLabel?: string;
  /**
   * The reviews to render. Defaults to the data module so that pages not yet
   * reading from the CMS render exactly as before.
   */
  reviews?: ReviewItem[];
  /** CMS field ids for this section's own copy. */
  tina?: { eyebrow?: string; heading?: string; lede?: string; linkLabel?: string };
}

export const Testimonials: React.FC<TestimonialsProps> = ({
  eyebrow = 'Client Reviews',
  heading = 'What Clients Say.',
  featuredAuthor,
  lede = 'Every review on our Trustpilot profile is five star.',
  linkLabel = 'Read them all',
  // Widened explicitly: the fallback is a plain Review[] with no field ids, and
  // without this the binding is inferred as the union and loses `tina`.
  reviews = fallbackReviews as ReviewItem[],
  tina,
}) => {
  const featured = reviews.find((r) => r.author === featuredAuthor) ?? reviews[0];
  const rest = reviews.filter((r) => r !== featured);

  return (
    <section className="py-fl-section bg-white px-fl-margin">
      <div className="max-w-[1360px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-fl-8">
          <Reveal>
            <p
              className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-4"
              data-tina-field={tina?.eyebrow}
            >
              {eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black mb-fl-4"
              data-tina-field={tina?.heading}
            >
              {heading}
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            {/* Stated this way on purpose. Trustpilot's own TrustScore is a
                weighted figure that reads lower than the reviews themselves, so
                quoting it would understate, and quoting an average would need a
                caveat. That every review is five star is simply true and can be
                checked on the link. */}
            <p className="text-fluid-sm text-thistle-black/60 leading-relaxed">
              <span data-tina-field={tina?.lede}>{lede}</span>{' '}
              <a
                href={REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-thistle-green underline underline-offset-2 hover:text-thistle-black transition-colors inline-flex items-center gap-0.5"
                data-tina-field={tina?.linkLabel}
              >
                {linkLabel} <ArrowUpRight size={13} />
              </a>
            </p>
          </Reveal>
        </div>

        {/* The featured review gets the space a pull quote gets. */}
        <Reveal delay={0.1}>
          <figure className="max-w-3xl mx-auto text-center mb-fl-8">
            <Stars className="justify-center mb-fl-4" />
            <blockquote
              className="text-fluid-h5 font-medium tracking-tight text-thistle-black leading-[1.5] mb-fl-5"
              data-tina-field={featured?.tina?.quote}
            >
              {featured.quote}
            </blockquote>
            <div className="flex justify-center">
              <Attribution review={featured} />
            </div>
          </figure>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-fl-4 items-stretch">
          {rest.map((review, i) => (
            <Reveal key={review.author} delay={Math.min(i * 0.06, 0.24)}>
              <ReviewCard review={review} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// A single review, for dropping into a page next to related content rather
// than running the whole set again.
export const ReviewQuote: React.FC<{ review: ReviewItem; className?: string }> = ({ review, className = '' }) => (
  <figure className={`rounded-2xl border border-thistle-black/[0.08] bg-thistle-white/70 p-fl-6 ${className}`}>
    <Stars className="mb-fl-3" />
    <blockquote className="text-fluid-base text-thistle-black/80 leading-relaxed mb-fl-4" data-tina-field={review.tina?.quote}>
      {review.quote}
    </blockquote>
    <Attribution review={review} />
  </figure>
);
