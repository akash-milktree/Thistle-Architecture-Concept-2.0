"use client";

import React from 'react';
import { Reveal } from '../components/animations/Reveal';
import { TrendingUp, Clock, Target } from 'lucide-react';
import { InlineCTA } from '../components/ui/InlineCTA';

const metrics = [
  { value: "98.5%", label: "Planning success rate", icon: Target, detail: "Across all submitted schemes" },
  { value: "20–35%", label: "Improvement in scheme efficiency", icon: TrendingUp, detail: "ROI potential vs unoptimised layouts" },
  { value: "86%", label: "Faster than traditional routes", icon: Clock, detail: "5 days vs 2–6 week industry average" },
];

export const Intro: React.FC = () => {
  return (
    <section className="bg-white py-fl-section-sm">
      <div className="px-fl-margin max-w-[1360px] mx-auto">
        <Reveal>
          <p className="text-center text-fluid-sm text-thistle-black/50 font-medium mb-fl-7">
            83% faster on average than traditional feasibility processes
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-fl-5">
          {metrics.map((metric, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="relative bg-thistle-white rounded-xl border border-thistle-black/[0.06] p-fl-6 text-center hover:border-thistle-green/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-thistle-green/10 flex items-center justify-center mx-auto mb-fl-4">
                  <metric.icon size={20} className="text-thistle-green" />
                </div>
                <span className="text-fluid-h3 font-semibold tracking-tight text-thistle-black block mb-1">
                  {metric.value}
                </span>
                <span className="text-fluid-sm font-medium text-thistle-black/70 block mb-2">
                  {metric.label}
                </span>
                <span className="text-xs text-thistle-black/40">
                  {metric.detail}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div className="mt-fl-7">
            <InlineCTA label="Start your feasibility" />
          </div>
        </Reveal>
      </div>
    </section>
  );
};
