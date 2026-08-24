"use client";

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { Reveal } from '../components/animations/Reveal';
import { Button } from '../components/ui/Button';
import { Testimonials } from '../sections/Testimonials';
import { DeveloperLogos } from '../sections/DeveloperLogos';
import { FeasibilityEngine } from '../sections/FeasibilityEngine';
import { PackageFAQ } from '../sections/feasibility-package/PackageFAQ';
import { PackageEntry } from '../sections/feasibility-package/PackageEntry';
import { DeliverableShowcase } from '../sections/feasibility-package/DeliverableShowcase';
import { PackageTeam } from '../sections/feasibility-package/PackageTeam';
import { HowItWorks } from '../sections/feasibility-package/HowItWorks';
import { StickyCTA } from '../sections/feasibility-package/StickyCTA';
import { TrustpilotBadge } from '../components/ui/TrustpilotBadge';

const trustMarkers = [
  { icon: CheckCircle2, label: "98.5% planning success rate" },
  { icon: Clock, label: "5-day guaranteed turnaround" },
  { icon: ShieldCheck, label: "Fixed fee, scoped up front" },
];

export const FeasibilityPackagePage: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/projects/bereweeke/complete-front.jpg"
          alt="Bereweeke Avenue completed, a brick house with a tiled roof"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-thistle-black/65" />
        <div className="relative z-10 max-w-5xl mx-auto px-fl-margin text-center pt-28 pb-fl-section">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-5">The Feasibility Package</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-fluid-h1 font-medium tracking-tighter leading-[1.05] text-white mb-fl-5">
              Your Building, Answered<br />In Five Days.
            </h1>
          </Reveal>
          {/* Ed's August 2026 final brief: "Replace 'from £298' as the headline
              starting price with: 'Feasibility from £49.99' and immediately
              below 'Architect-led feasibility from £298'." */}
          <Reveal delay={0.2}>
            <p className="text-fluid-h5 font-medium tracking-tight text-white mb-fl-2">
              Feasibility from £49.99.
            </p>
            <p className="text-fluid-base text-white/70 mb-fl-4">
              Architect-led feasibility from £298.
            </p>
            <p className="text-fluid-base text-white/85 leading-relaxed font-light mb-fl-6 max-w-xl mx-auto">
              Five deliverables and a clear Go or No-Go on whether your building is worth taking forward.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <a href="#instant-quote">
              <Button size="lg" variant="primary" icon={<ArrowUpRight size={18} />}>
                Get Your Instant Fixed Fee
              </Button>
            </a>
            <p className="text-xs text-white/60 mt-fl-4">No obligation. Response within one working day.</p>
            <TrustpilotBadge tone="light" className="mt-fl-5" />
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

      {/* Product choice + the shared pricing calculator, near the top per the
          brief: "the website should never feel like contact us for a quote". */}
      <PackageEntry />

      {/* How it works, updated for the pay-first journey */}
      <HowItWorks />

      {/* "What You Actually Receive": the deliverables selector, the real
          sample report, and the nine-bed HMO "see it in practice" example, all
          merged into one section per the brief. */}
      <DeliverableShowcase />

      {/* What's included in data analysis */}
      <FeasibilityEngine />

      {/* Who you're working with */}
      <PackageTeam />

      {/* Maywood Group leads here because their review is literally about
          booking a feasibility before committing to a purchase, and about the
          study returning an answer they did not want. That is a better argument
          for the product than any wording of ours. */}
      <Testimonials eyebrow="The Clients" featuredAuthor="Maywood Group" />

      <PackageFAQ />

      <StickyCTA />
    </>
  );
};
