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
  AREA_BANDS,
  COMPLEXITY_UPLIFTS,
  AUTOMATED_CONTENTS,
  AUTOMATED_BOUNDARY,
} from '../data/pricingData';

// Built from Ed's Pricing & Feasibility Calculator Brief, August 2026.
//
// The brief's UX principle drives the page order: "the website should never
// feel like contact us for a quote". So the four products come first, the
// calculator sits immediately under them rather than on a separate page, and
// the fee tables are below as the reasoning behind the number rather than
// something a buyer has to work through to get one.

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
              className={`h-full flex flex-col rounded-2xl border p-fl-6 ${
                p.id === 'architectural-feasibility'
                  ? 'border-thistle-green/30 bg-thistle-green/[0.06]'
                  : 'border-thistle-black/[0.06] bg-white'
              }`}
            >
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
      </div>
    </section>

    {/* How the fee is built */}
    <section className="px-fl-margin py-fl-section bg-thistle-white">
      <div className="max-w-[1000px] mx-auto">
        <Reveal>
          <h2 className="text-fluid-h3 font-medium tracking-tight text-thistle-black mb-fl-2 text-center">
            How The Fee Is Built.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-fluid-sm text-thistle-black/60 text-center max-w-xl mx-auto mb-fl-8">
            Published in full, so the number the calculator gives you is one you can check yourself.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-fl-6">
          <Reveal delay={0.15}>
            <div className="rounded-2xl border border-thistle-black/[0.08] bg-white overflow-hidden h-full">
              <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-thistle-black/50 px-fl-5 py-fl-4 border-b border-thistle-black/[0.06]">
                By floor area
              </p>
              <table className="w-full text-left">
                <tbody>
                  {AREA_BANDS.map((b) => (
                    <tr key={b.label} className="border-b border-thistle-black/[0.05] last:border-0">
                      <th scope="row" className="px-fl-5 py-fl-3 text-fluid-sm font-normal text-thistle-black/70">
                        {b.label}
                      </th>
                      <td className="px-fl-5 py-fl-3 text-fluid-sm font-medium text-thistle-black text-right">
                        {b.fee ? `£${b.fee}` : 'Expert Session'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="rounded-2xl border border-thistle-black/[0.08] bg-white overflow-hidden h-full">
              <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-thistle-black/50 px-fl-5 py-fl-4 border-b border-thistle-black/[0.06]">
                Complexity
              </p>
              <table className="w-full text-left">
                <tbody>
                  {COMPLEXITY_UPLIFTS.map((c) => (
                    <tr key={c.label} className="border-b border-thistle-black/[0.05] last:border-0">
                      <th scope="row" className="px-fl-5 py-fl-3 text-fluid-sm font-normal text-thistle-black/70">
                        {c.label}
                      </th>
                      <td className="px-fl-5 py-fl-3 text-fluid-sm font-medium text-thistle-black text-right whitespace-nowrap">
                        {c.uplift === 0 ? 'No uplift' : `+£${c.uplift}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.25}>
          <p className="text-xs text-thistle-black/50 leading-relaxed mt-fl-5 max-w-2xl mx-auto text-center">
            A Grade II listing replaces the Conservation Area uplift rather than adding to it. Where three or more
            of these apply, we stop pricing automatically and talk to you first.
          </p>
        </Reveal>
      </div>
    </section>

    {/* What the £49.99 covers */}
    <section className="px-fl-margin py-fl-section bg-white">
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
