"use client";

import React from 'react';
import { Reveal } from '../../components/animations/Reveal';
import { howItWorksSteps } from '../../data/howItWorksData';

// The five-step process, absorbed from the old How It Works page.
// Vertical timeline: number and duration on the left, narrative on the right.
export const HowItWorks: React.FC = () => (
  <section id="how-it-works" className="bg-thistle-white py-fl-section px-fl-margin scroll-mt-24">
    <div className="max-w-[1360px] mx-auto">
      <div className="text-center mb-fl-8 max-w-2xl mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-4">The Process</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black">
            Five Days,<br /><span className="text-thistle-green">Five Steps.</span>
          </h2>
        </Reveal>
      </div>

      <div className="max-w-3xl mx-auto">
        {howItWorksSteps.map((step, i) => {
          const isFinal = i === howItWorksSteps.length - 1;
          return (
            <Reveal key={step.num} delay={i * 0.06}>
              <div className="relative flex gap-fl-6 pb-fl-7">
                {/* Rail */}
                {!isFinal && (
                  <div className="absolute left-[22px] top-12 bottom-0 w-px bg-thistle-black/[0.08]" />
                )}
                <div className={`relative z-10 w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center text-lg font-semibold tabular-nums ${
                  isFinal ? 'bg-thistle-green text-white' : 'bg-thistle-green/10 text-thistle-green'
                }`}>
                  {step.num}
                </div>
                <div className="pt-1.5">
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-thistle-green font-semibold mb-1">
                    {step.durationLabel}
                  </span>
                  <h3 className="text-fluid-h5 font-medium tracking-tight text-thistle-black mb-fl-2">{step.title}</h3>
                  <p className="text-fluid-base text-thistle-black/80 leading-relaxed mb-fl-2">{step.lead}</p>
                  <p className="text-fluid-sm text-thistle-black/55 leading-relaxed">{step.detail}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);
