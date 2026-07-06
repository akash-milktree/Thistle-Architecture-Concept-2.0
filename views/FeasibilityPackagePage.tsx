"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { Reveal } from '../components/animations/Reveal';
import { Button } from '../components/ui/Button';
import { useFeasibility } from '../components/feasibility/FeasibilityContext';
import { deliverables } from '../data/howItWorksData';
import {
  pricingFrom,
  pricingCaption,
  deliverableDetail,
} from '../data/feasibilityPackageData';
import { caseStudies } from '../data/caseStudiesData';
import { testimonialHighlights } from '../sections/Testimonials';
import { DeveloperLogos } from '../sections/DeveloperLogos';
import { FeasibilityEngine } from '../sections/FeasibilityEngine';
import { PricingAnchor } from '../sections/feasibility-package/PricingAnchor';
import { DeliverableRow } from '../sections/feasibility-package/DeliverableRow';
import { SampleReport } from '../sections/feasibility-package/SampleReport';
import { TimelineBand } from '../sections/feasibility-package/TimelineBand';
import { ScopeClarity } from '../sections/feasibility-package/ScopeClarity';
import { PackageFAQ } from '../sections/feasibility-package/PackageFAQ';
import { HowItWorks } from '../sections/feasibility-package/HowItWorks';
import { StickyCTA } from '../sections/feasibility-package/StickyCTA';

// Real imagery per deliverable: Thistle drawings where the deliverable is a
// drawing, photography where it is a document or a judgement.
const deliverableImages: { src: string; alt: string; fit: 'contain' | 'cover' }[] = [
  { src: "/images/projects/st-johns-sk001-1.png", alt: "Proposed GA floor plans for a nine-bedroom HMO conversion", fit: "contain" },
  { src: "/images/generated/desk-plans.jpg", alt: "Printed floor plans and schedules on an architect's desk", fit: "cover" },
  { src: "/images/projects/greyfriars-option4-1.png", alt: "Colour-coded feasibility sketch showing constraints and shared spaces", fit: "contain" },
  { src: "/images/generated/report-hands.jpg", alt: "A bound feasibility report held in two hands", fit: "cover" },
  { src: "/images/projects/sample-report-1.png", alt: "The first page of a real Thistle feasibility document", fit: "contain" },
  { src: "/images/projects/axis-house-plans-1.png", alt: "Sketch scheme options testing unit mix and layout efficiency", fit: "contain" },
];

const trustMarkers = [
  { icon: CheckCircle2, label: "98.5% planning success rate" },
  { icon: Clock, label: "5-day guaranteed turnaround" },
  { icon: ShieldCheck, label: "Fixed fee, scoped up front" },
];

export const FeasibilityPackagePage: React.FC = () => {
  const { openModal } = useFeasibility();
  const highlight = caseStudies[0];

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/generated/package-hero.jpg"
          alt="Elevated dusk view along a UK market town high street"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-thistle-black/65" />
        <div className="relative z-10 max-w-4xl mx-auto px-fl-margin text-center pt-28 pb-fl-section">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-5">The Feasibility Package</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-fluid-h1 font-medium tracking-tighter leading-[1.05] text-white mb-fl-5">
              Your Building, Answered<br />In Five Days.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-fluid-base text-white/85 leading-relaxed font-light mb-fl-6 max-w-xl mx-auto">
              One package, one fixed fee from {pricingFrom}. Six deliverables and a clear Go or No-Go on whether your building is worth taking forward.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <Button size="lg" variant="primary" icon={<ArrowUpRight size={18} />} onClick={openModal}>
              Start Feasibility
            </Button>
            <p className="text-xs text-white/60 mt-fl-4">No obligation. Response within one working day.</p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-fl-4 sm:gap-fl-7 mt-fl-7">
              {trustMarkers.map((m, i) => (
                <div key={i} className="flex items-center gap-2 text-white/85">
                  <m.icon size={16} className="text-thistle-green" />
                  <span className="text-sm font-medium">{m.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Social proof strip */}
      <DeveloperLogos />

      {/* How it works, absorbed from the old page */}
      <HowItWorks />

      {/* What's included in data analysis, moved from the homepage */}
      <FeasibilityEngine />

      {/* The six deliverables, with real imagery */}
      <section className="bg-white py-fl-section px-fl-margin">
        <div className="max-w-[1360px] mx-auto">
          <div className="text-center mb-fl-section-sm max-w-2xl mx-auto">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-4">What You Get</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black">
                Six Deliverables.<br /><span className="text-thistle-green">One Decision.</span>
              </h2>
            </Reveal>
          </div>

          <div className="space-y-fl-section-sm">
            {deliverables.map((deliverable, i) => {
              const detail = deliverableDetail[i];
              const img = deliverableImages[i];
              const num = String(i + 1).padStart(2, '0');
              return (
                <DeliverableRow
                  key={num}
                  num={num}
                  deliverable={deliverable}
                  detail={detail}
                  reversed={i % 2 !== 0}
                  graphicSlot={
                    <div className="relative aspect-[4/3] rounded-2xl border border-thistle-black/[0.06] bg-thistle-white/60 overflow-hidden">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 1024px) 90vw, 620px"
                        className={img.fit === 'contain' ? 'object-contain p-3' : 'object-cover'}
                      />
                    </div>
                  }
                />
              );
            })}
          </div>
        </div>
      </section>

      <SampleReport />

      <PricingAnchor priceFrom={pricingFrom} caption={pricingCaption} />

      <ScopeClarity />

      <TimelineBand />

      {/* Case study highlight */}
      <section className="bg-white py-fl-section px-fl-margin">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-fl-8 items-center">
            <Reveal>
              <div className="relative aspect-[4/3] rounded-2xl border border-thistle-black/[0.06] bg-thistle-white/60 overflow-hidden">
                <Image
                  src={highlight.image}
                  alt={highlight.title}
                  fill
                  sizes="(max-width: 1024px) 90vw, 620px"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-4">Recent Feasibility</p>
                <h2 className="text-fluid-h3 font-medium tracking-tight leading-tight text-thistle-black mb-fl-4">
                  {highlight.title}
                </h2>
                <p className="text-fluid-base text-thistle-black/80 leading-relaxed mb-fl-5 max-w-md">
                  {highlight.desc}
                </p>
                <Link
                  href={`/case-studies/${highlight.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-thistle-green hover:text-thistle-black transition-colors"
                >
                  Read the case study
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Testimonials, static 3-up */}
      <section className="bg-thistle-white py-fl-section px-fl-margin">
        <div className="max-w-[1360px] mx-auto">
          <div className="text-center mb-fl-8">
            <Reveal>
              <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black">
                Hear From Our Clients.
              </h2>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-fl-4">
            {testimonialHighlights.slice(0, 3).map((t, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="bg-white rounded-2xl border border-thistle-black/[0.06] p-fl-6 h-full flex flex-col">
                  <p className="text-fluid-base text-thistle-black/80 leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3 mt-fl-5">
                    <div className="w-9 h-9 rounded-full bg-thistle-green/10 flex items-center justify-center text-xs font-semibold text-thistle-green">
                      {t.initials}
                    </div>
                    <div>
                      <span className="block text-sm font-medium text-thistle-black leading-tight">{t.name}</span>
                      <span className="block text-xs text-thistle-black/50">{t.role}, {t.company}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PackageFAQ />

      {/* Closing CTA */}
      <section className="py-fl-section px-fl-margin bg-white">
        <div className="max-w-[1360px] mx-auto text-center">
          <Reveal>
            <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black mb-fl-5">
              Ready When You Are.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-fluid-base text-thistle-black/80 leading-relaxed max-w-md mx-auto mb-fl-6">
              Submit your building, get a clear answer in five days, for a fixed fee.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Button variant="primary" size="lg" icon={<ArrowUpRight size={18} />} onClick={openModal}>
              Start Feasibility
            </Button>
            <p className="text-xs text-thistle-black/50 mt-fl-4">No obligation. Response within one working day.</p>
          </Reveal>
        </div>
      </section>

      <StickyCTA />
    </>
  );
};
