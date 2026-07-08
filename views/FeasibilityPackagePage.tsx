"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { Reveal } from '../components/animations/Reveal';
import { Button } from '../components/ui/Button';
import { useFeasibility } from '../components/feasibility/FeasibilityContext';
import { pricingFrom } from '../data/feasibilityPackageData';
import { caseStudies } from '../data/caseStudiesData';
import { Testimonials } from '../sections/Testimonials';
import { DeveloperLogos } from '../sections/DeveloperLogos';
import { FeasibilityEngine } from '../sections/FeasibilityEngine';
import { SampleReport } from '../sections/feasibility-package/SampleReport';
import { PackageFAQ } from '../sections/feasibility-package/PackageFAQ';
import { PackagePricing } from '../sections/feasibility-package/PackagePricing';
import { DeliverableShowcase } from '../sections/feasibility-package/DeliverableShowcase';
import { PackageTeam } from '../sections/feasibility-package/PackageTeam';
import { HowItWorks } from '../sections/feasibility-package/HowItWorks';
import { StickyCTA } from '../sections/feasibility-package/StickyCTA';

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

      {/* The six deliverables, compact selector */}
      <DeliverableShowcase />

      {/* What's included in data analysis */}
      <FeasibilityEngine />

      {/* Who you're working with */}
      <PackageTeam />

      <SampleReport />

      <PackagePricing />

      {/* Case study highlight */}
      <section className="bg-thistle-white py-fl-section px-fl-margin">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-fl-8 items-center">
            <Reveal>
              <div className={`relative aspect-[4/3] rounded-2xl border border-thistle-black/[0.06] overflow-hidden ${highlight.image.startsWith('/images/projects/') ? 'bg-white' : 'bg-thistle-white/60'}`}>
                <Image
                  src={highlight.image}
                  alt={highlight.title}
                  fill
                  sizes="(max-width: 1024px) 90vw, 620px"
                  className={highlight.image.startsWith('/images/projects/') ? 'object-contain p-3' : 'object-cover'}
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-4">The Proof</p>
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

      <Testimonials eyebrow="The Clients" />

      <PackageFAQ />

      <StickyCTA />
    </>
  );
};
