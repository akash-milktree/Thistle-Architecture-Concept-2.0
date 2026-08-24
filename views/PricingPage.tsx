"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';
import { PageHero } from '../components/ui/PageHero';
import { Reveal } from '../components/animations/Reveal';
import { FeasibilityCalculator } from '../sections/pricing/FeasibilityCalculator';
import { Testimonials } from '../sections/Testimonials';
import {
  PRODUCTS,
  FEE_FACTORS,
  AUTOMATED_CONTENTS,
  AUTOMATED_BOUNDARY,
} from '../data/pricingData';
import { reviews, REVIEWS_URL } from '../data/reviewsData';

// Built from Ed's Pricing & Feasibility Calculator Brief, August 2026, and
// revised against his final update brief later that month.
//
// The brief's UX principle drives the page order: "the website should never
// feel like contact us for a quote". So the four products come first, the
// calculator sits immediately under them, and the final brief's second rule
// governs what comes after: show the customer exactly what they pay, do not
// publish the pricing engine. The fee tables that used to spell out every
// addition are gone; what remains is the list of factors that move the fee.

// The final brief asks for a strong "avoided a bad purchase" review placed
// high on the page. Maywood is exactly that story, and it is pinned rather
// than searched for so an edit to reviewsData cannot quietly swap in a
// less relevant one.
const featuredReview = reviews.find((r) => r.author === 'Maywood Group');

export const PricingPage: React.FC = () => (
  <>
    <PageHero
      label="Pricing"
      heading="Know The Fee Before You Commit."
      description="Four ways to test a building, from a £15.99 automated check to an architect-led feasibility. Answer a few questions and the price is on screen, not in an email."
    />

    {/* The four products */}
    <section className="px-fl-margin pb-fl-section bg-thistle-white">
      <div className="max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-fl-4 items-stretch">
        {PRODUCTS.map((p, i) => (
          <Reveal key={p.id} delay={Math.min(i * 0.07, 0.28)} fullHeight>
            <div
              className={`relative h-full flex flex-col rounded-2xl border p-fl-6 ${
                p.id === 'architectural-feasibility'
                  ? 'border-thistle-green/40 bg-thistle-green/[0.06] shadow-lg shadow-thistle-green/[0.08]'
                  : 'border-thistle-black/[0.06] bg-white'
              }`}
            >
              {/* The final brief: the architect-led product is the visually
                  preferred option, labelled explicitly. */}
              {p.id === 'architectural-feasibility' && (
                <span className="absolute -top-3 left-fl-6 px-3 py-1 rounded-full bg-thistle-green text-thistle-black text-[10px] uppercase tracking-[0.16em] font-bold">
                  Recommended
                </span>
              )}
              <h2 className="text-fluid-h6 font-medium tracking-tight text-thistle-black">{p.name}</h2>
              <p className="text-fluid-h3 font-medium tracking-tight text-thistle-black my-fl-3 leading-none">
                {p.price}
              </p>
              <p className="text-fluid-sm font-medium text-thistle-black/80 mb-fl-2">{p.strapline}</p>
              <p className="text-fluid-sm text-thistle-black/55 leading-relaxed flex-1">{p.body}</p>
              {p.turnaround && (
                <p className="text-xs text-thistle-black/45 mt-fl-4 pt-fl-4 border-t border-thistle-black/[0.06]">
                  {p.turnaround}
                </p>
              )}
              <div className="mt-fl-5">
                {p.external ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-thistle-black hover:text-thistle-green transition-colors"
                  >
                    {p.cta} <ArrowUpRight size={15} />
                  </a>
                ) : (
                  <Link
                    href={p.href}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-thistle-black hover:text-thistle-green transition-colors"
                  >
                    {p.cta} <ArrowUpRight size={15} />
                  </Link>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      {/* The final brief's key line, stated once for the whole ladder. */}
      <p className="max-w-[1360px] mx-auto text-xs text-thistle-black/50 mt-fl-4">
        All fees include VAT.
      </p>
    </section>

    {/* The calculator, immediately under the products rather than a page away */}
    <section id="calculator" className="px-fl-margin py-fl-section bg-white scroll-mt-28">
      <div className="max-w-[880px] mx-auto">
        <div className="text-center mb-fl-8">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-4">
              Architectural Feasibility
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black mb-fl-4">
              Get Your Fixed Fee.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-fluid-base text-thistle-black/70 leading-relaxed max-w-xl mx-auto">
              Seven questions, about a minute. Straightforward projects get a price on screen. Anything larger or
              more involved routes to a free Expert Session, because a scope we have not seen is not one we will
              put a number on.
            </p>
          </Reveal>
        </div>
        <FeasibilityCalculator />

        {/* The "avoided a bad purchase" review, directly under the calculator
            where the buying decision actually happens. */}
        {featuredReview && (
          <Reveal delay={0.1}>
            <figure className="mt-fl-7 rounded-2xl border border-thistle-black/[0.08] bg-thistle-white p-fl-6">
              <div className="flex gap-0.5 mb-fl-3" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill="currentColor" className="text-thistle-green">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              {featuredReview.title && (
                <p className="text-fluid-base font-medium text-thistle-black mb-fl-2">{featuredReview.title}</p>
              )}
              <blockquote className="text-fluid-sm text-thistle-black/70 leading-relaxed">
                &ldquo;{featuredReview.quote}&rdquo;
              </blockquote>
              <figcaption className="text-xs text-thistle-black/45 mt-fl-3">
                {featuredReview.author},{' '}
                <a href={REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-thistle-black transition-colors">
                  verified review on Trustpilot
                </a>
              </figcaption>
            </figure>
          </Reveal>
        )}
      </div>
    </section>

    {/* What affects the fee. The final brief replaced the published formula
        with the factors alone: the customer sees exactly what they will pay in
        the calculator, without the engine behind it being public. */}
    <section className="px-fl-margin py-fl-section bg-thistle-white">
      <div className="max-w-[1000px] mx-auto">
        <Reveal>
          <h2 className="text-fluid-h3 font-medium tracking-tight text-thistle-black mb-fl-2 text-center">
            What Affects Your Fee.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-fluid-sm text-thistle-black/60 text-center max-w-xl mx-auto mb-fl-8">
            Every fee is fixed before you pay. These are the things that move it, and the calculator asks about
            each one, so the number you see is the number you pay.
          </p>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-fl-3">
          {FEE_FACTORS.map((f, i) => (
            <Reveal key={f} delay={Math.min(i * 0.05, 0.3)}>
              <span className="inline-flex items-center gap-2 rounded-full border border-thistle-black/[0.08] bg-white px-5 py-2.5 text-fluid-sm text-thistle-black/75">
                <Check size={14} className="text-thistle-green" />
                {f}
              </span>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.25}>
          <p className="text-xs text-thistle-black/50 leading-relaxed mt-fl-6 max-w-2xl mx-auto text-center">
            Where a project has several of these at once, we stop pricing automatically and talk to you first,
            through a free Expert Session.
          </p>
        </Reveal>
      </div>
    </section>

    {/* £49.99 vs £298+, stated explicitly per the final brief. */}
    <section className="px-fl-margin py-fl-section bg-white">
      <div className="max-w-[1000px] mx-auto">
        <Reveal>
          <h2 className="text-fluid-h3 font-medium tracking-tight text-thistle-black mb-fl-2 text-center">
            £49.99 Or From £298?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-fluid-sm text-thistle-black/60 text-center max-w-xl mx-auto mb-fl-8">
            Both start from the same data. The difference is what happens to it.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-fl-5">
          <Reveal delay={0.15} fullHeight>
            <div className="h-full rounded-2xl border border-thistle-black/[0.08] bg-thistle-white p-fl-6">
              <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-thistle-black/50 mb-fl-2">
                Automated Site Feasibility
              </p>
              <p className="text-fluid-h4 font-medium tracking-tight text-thistle-black mb-fl-3">£49.99</p>
              <p className="text-fluid-sm text-thistle-black/65 leading-relaxed">
                Data-led and fully automated. Planning, standards, indicative capacity, commercial context, risks
                and next steps, in around 30 minutes. No drawings, no architect.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2} fullHeight>
            <div className="h-full rounded-2xl border border-thistle-green/35 bg-thistle-green/[0.06] p-fl-6">
              <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-thistle-green mb-fl-2">
                Architectural Feasibility
              </p>
              <p className="text-fluid-h4 font-medium tracking-tight text-thistle-black mb-fl-3">From £298</p>
              <p className="text-fluid-sm text-thistle-black/65 leading-relaxed">
                Everything in the automated appraisal, plus an architect: planning interpretation, sketch and
                layout testing, and a professional recommendation you can act on.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    {/* What the £49.99 covers */}
    <section className="px-fl-margin py-fl-section bg-thistle-white">
      <div className="max-w-[1000px] mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-4">
            Automated Site Feasibility, £49.99
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-fluid-h3 font-medium tracking-tight text-thistle-black mb-fl-6">
            What You Get For £49.99.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-fl-8 gap-y-fl-3">
          {AUTOMATED_CONTENTS.map((item, i) => (
            <Reveal key={item} delay={Math.min(i * 0.03, 0.24)}>
              <div className="flex gap-fl-3 items-start">
                <Check size={15} className="text-thistle-green mt-1 shrink-0" />
                <span className="text-fluid-sm text-thistle-black/70 leading-relaxed">{item}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          {/* Ed asked for this boundary stated plainly rather than buried. */}
          <p className="text-fluid-sm text-thistle-black/55 leading-relaxed mt-fl-7 pt-fl-5 border-t border-thistle-black/[0.06] max-w-2xl">
            {AUTOMATED_BOUNDARY}
          </p>
        </Reveal>
      </div>
    </section>

    <Testimonials eyebrow="Client Reviews" heading="Priced Up Front." featuredAuthor="Maywood Group" />
  </>
);
