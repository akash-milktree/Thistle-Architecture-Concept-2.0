"use client";

import React from 'react';
import { Reveal } from '../components/animations/Reveal';
import { Clock, AlertTriangle, PoundSterling } from 'lucide-react';

const painPoints = [
  {
    icon: Clock,
    title: "2–6 weeks to an answer",
    body: "Traditional feasibility takes too long for modern acquisition timelines.",
  },
  {
    icon: AlertTriangle,
    title: "Opinion, not evidence",
    body: "Refusal risk stays hidden until you've already committed time and capital.",
  },
  {
    icon: PoundSterling,
    title: "Thousands sunk up-front",
    body: "You pay for the feasibility before you know the scheme pencils out.",
  },
];

export const Problem: React.FC = () => {
  return (
    <section className="bg-thistle-white py-fl-section-sm px-fl-margin">
      <div className="max-w-[1360px] mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-thistle-black/40 font-semibold text-center mb-fl-4">The problem</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-fluid-h3 font-medium tracking-tight text-thistle-black text-center max-w-2xl mx-auto mb-fl-8 leading-tight">
            Feasibility shouldn't cost you weeks and budget before you know the deal works.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-fl-5 max-w-4xl mx-auto">
          {painPoints.map((point, i) => (
            <Reveal key={i} delay={0.15 + i * 0.08}>
              <div className="flex flex-col items-start gap-fl-3">
                <div className="w-10 h-10 rounded-lg bg-thistle-black/[0.04] flex items-center justify-center">
                  <point.icon size={18} className="text-thistle-black/50" strokeWidth={1.5} />
                </div>
                <h3 className="text-fluid-h6 font-medium tracking-tight text-thistle-black">{point.title}</h3>
                <p className="text-fluid-sm text-thistle-black/55 leading-relaxed">{point.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
