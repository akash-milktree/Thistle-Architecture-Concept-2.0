"use client";

import React from 'react';
import { Reveal } from '../components/animations/Reveal';
import { X, Check, Clock } from 'lucide-react';

const traditional = [
  "2 to 6 week feasibility",
  "Opinion-led advice",
  "High upfront cost",
  "Unclear outcomes",
  "Localised capability",
];

const thistle = [
  "5-day guaranteed turnaround",
  "Backed by 15+ data sources",
  "Fixed fee, scoped up front",
  "A clear Go or No-Go",
  "One national system",
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

        {/* Two panels: the choice, not a spreadsheet */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-fl-5 items-stretch">
          <Reveal>
            <div className="h-full rounded-2xl bg-thistle-white/70 border border-thistle-black/[0.08] p-fl-6">
              <div className="flex items-center gap-3 mb-fl-5 pb-fl-4 border-b border-thistle-black/[0.06]">
                <div className="w-9 h-9 rounded-lg bg-thistle-black/[0.04] flex items-center justify-center">
                  <Clock size={18} className="text-thistle-black/40" />
                </div>
                <span className="text-xs font-semibold tracking-[0.15em] text-thistle-black/45 uppercase">The Traditional Route</span>
              </div>
              <ul className="space-y-fl-4">
                {traditional.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                      <X size={12} className="text-red-400" />
                    </div>
                    <span className="text-fluid-base text-thistle-black/60">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative h-full rounded-2xl bg-white border-2 border-thistle-green/40 p-fl-6 shadow-xl shadow-thistle-green/[0.08]">
              <span className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-thistle-green text-thistle-black text-[10px] uppercase tracking-widest font-semibold">
                5 days
              </span>
              <div className="flex items-center gap-3 mb-fl-5 pb-fl-4 border-b border-thistle-green/15">
                <div className="w-9 h-9 rounded-lg bg-thistle-green/10 flex items-center justify-center">
                  <Check size={18} className="text-thistle-green" />
                </div>
                <span className="text-xs font-semibold tracking-[0.15em] text-thistle-green uppercase">The Thistle Way</span>
              </div>
              <ul className="space-y-fl-4">
                {thistle.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-thistle-green/15 flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-thistle-green" />
                    </div>
                    <span className="text-fluid-base font-medium text-thistle-black">{item}</span>
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
