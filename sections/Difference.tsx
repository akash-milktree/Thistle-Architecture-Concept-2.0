"use client";

import React from 'react';
import { Reveal } from '../components/animations/Reveal';
import { X, Check } from 'lucide-react';

const comparisons = [
  { traditional: "2–6 week feasibility", thistle: "5 days" },
  { traditional: "Opinion-led", thistle: "Data-backed" },
  { traditional: "High upfront cost", thistle: "Low entry cost" },
  { traditional: "Unclear outcomes", thistle: "Go/No-Go clarity" },
  { traditional: "Localised capability", thistle: "National system" },
];

export const Difference: React.FC = () => {
  return (
    <section className="bg-white py-fl-section px-fl-margin">
      <div className="max-w-[1000px] mx-auto">
        {/* Header */}
        <div className="text-center mb-fl-8">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-4">Why Thistle</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black">
              Not Another Architecture Practice.
            </h2>
          </Reveal>
        </div>

        {/* Comparison table */}
        <Reveal delay={0.2}>
          <div className="rounded-2xl border border-thistle-black/[0.06] overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-2 bg-thistle-white">
              <div className="px-fl-6 py-fl-4 border-r border-thistle-black/[0.06]">
                <span className="text-xs font-semibold tracking-wide text-thistle-black/40 uppercase">Traditional Architect</span>
              </div>
              <div className="px-fl-6 py-fl-4">
                <span className="text-xs font-semibold tracking-wide text-thistle-green uppercase">Thistle</span>
              </div>
            </div>

            {/* Table rows */}
            {comparisons.map((row, i) => (
              <div key={i} className="grid grid-cols-2 border-t border-thistle-black/[0.06]">
                <div className="px-fl-6 py-fl-5 border-r border-thistle-black/[0.06] flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                    <X size={12} className="text-red-400" />
                  </div>
                  <span className="text-fluid-base text-thistle-black/80">{row.traditional}</span>
                </div>
                <div className="px-fl-6 py-fl-5 flex items-center gap-3 bg-thistle-green/[0.03]">
                  <div className="w-6 h-6 rounded-full bg-thistle-green/15 flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-thistle-green" />
                  </div>
                  <span className="text-fluid-base font-medium text-thistle-black">{row.thistle}</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
