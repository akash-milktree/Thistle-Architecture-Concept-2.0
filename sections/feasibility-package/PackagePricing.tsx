"use client";

import React from 'react';
import { ArrowUpRight, Check, X } from 'lucide-react';
import { Reveal } from '../../components/animations/Reveal';
import { Button } from '../../components/ui/Button';
import { useFeasibility } from '../../components/feasibility/FeasibilityContext';
import { deliverables } from '../../data/howItWorksData';
import { pricingFrom, notIncluded } from '../../data/feasibilityPackageData';

// The pricing block: one fee, everything in, honest exclusions beside it.
// Replaces the old floating price band and the separate scope section.
export const PackagePricing: React.FC = () => {
  const { openModal } = useFeasibility();

  return (
    <section className="bg-white py-fl-section px-fl-margin">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-fl-8 max-w-2xl mx-auto">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-4">The Package</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black">
              One Fee.<br /><span className="text-thistle-green">Everything In.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-fl-5 items-stretch">
          {/* The offer */}
          <Reveal fullHeight className="lg:col-span-3 h-full">
            <div className="h-full rounded-2xl bg-white border-2 border-thistle-green/35 shadow-xl shadow-thistle-green/[0.07] p-fl-7 flex flex-col">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-fl-2">
                <span className="text-sm text-thistle-black/50 font-medium">Fixed fee, from</span>
                <span className="text-fluid-h1 font-medium tracking-tighter text-thistle-black leading-none">{pricingFrom}</span>
                <span className="text-sm text-thistle-black/50 font-medium">+ VAT</span>
              </div>
              <p className="text-fluid-sm text-thistle-black/60 leading-relaxed mb-fl-5">
                Scoped before you start. No hourly rates, no scope creep, and the fee is the same whether the answer is Go or No-Go.
              </p>

              <div className="border-t border-thistle-black/[0.06] pt-fl-5 mb-fl-6">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-thistle-black/40 font-semibold mb-fl-4">All five deliverables included</span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-fl-5 gap-y-fl-3">
                  {deliverables.map((d) => (
                    <li key={d.title} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-thistle-green/15 flex items-center justify-center flex-shrink-0">
                        <Check size={11} className="text-thistle-green" />
                      </div>
                      <span className="text-fluid-sm text-thistle-black/80">{d.title}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto">
                <Button variant="primary" size="lg" icon={<ArrowUpRight size={18} />} onClick={openModal}>
                  Start Feasibility
                </Button>
                <p className="text-xs text-thistle-black/50 mt-fl-3">No obligation. Response within one working day.</p>
              </div>
            </div>
          </Reveal>

          {/* Honest exclusions */}
          <Reveal fullHeight delay={0.1} className="lg:col-span-2 h-full">
            <div className="h-full rounded-2xl bg-thistle-white/70 border border-thistle-black/[0.06] p-fl-6">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-thistle-black/40 font-semibold mb-fl-2">Not included</span>
              <p className="text-fluid-sm text-thistle-black/55 leading-relaxed mb-fl-5">
                Honest scope from the start. We can quote separately if any of these are needed.
              </p>
              <ul className="space-y-fl-3">
                {notIncluded.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-thistle-black/[0.05] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X size={11} className="text-thistle-black/35" />
                    </div>
                    <span className="text-fluid-sm text-thistle-black/65 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
