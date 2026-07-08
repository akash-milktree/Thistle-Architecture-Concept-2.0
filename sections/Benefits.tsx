"use client";

import React from 'react';
import Image from 'next/image';
import { Reveal } from '../components/animations/Reveal';
import { Clock, PoundSterling, Compass, type LucideIcon } from 'lucide-react';
import { InlineCTA } from '../components/ui/InlineCTA';

interface Pillar {
  icon: LucideIcon;
  title: string;
  body: string;
}

const pillars: Pillar[] = [
  {
    icon: Clock,
    title: "Time",
    body: "A guaranteed feasibility in 5 days, not 5 weeks. We compress the slow upfront stage so you can move on a deal while it's still on the table.",
  },
  {
    icon: PoundSterling,
    title: "Fair Entry Cost",
    body: "A fixed, accessible fee for the full feasibility. No retainers, no scope creep, and no commitment to a long architectural appointment before you know the scheme stacks up.",
  },
  {
    icon: Compass,
    title: "Clarity",
    body: "Every report ends with a clear Go or No-Go, backed by data, layouts, and an architect's review. You leave with a decision, not a maybe.",
  },
];

export const Benefits: React.FC = () => {
  return (
    <section className="bg-thistle-white py-fl-section px-fl-margin">
      <div className="max-w-[1360px] mx-auto">
        {/* Header */}
        <div className="text-center mb-fl-8 max-w-2xl mx-auto">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-4">The Benefits</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black mb-fl-4">
              Why Developers<br /><span className="text-thistle-green">Use Thistle.</span>
            </h2>
          </Reveal>
        </div>

        {/* Photo + three equal rows */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-fl-5 mb-fl-7 lg:items-stretch">
          <Reveal fullHeight className="h-full lg:col-span-2">
            <div className="relative h-72 lg:h-full min-h-[288px] rounded-2xl overflow-hidden border border-thistle-black/[0.06]">
              <Image
                src="/images/generated/site-visit.jpg"
                alt="Two people reviewing a feasibility document outside a vacant office building"
                fill
                sizes="(max-width: 1024px) 90vw, 640px"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-thistle-black/70 to-transparent p-fl-5 pt-fl-8">
                <p className="text-sm text-white/95 max-w-sm leading-snug">
                  Built for the decisions developers actually face: bid, negotiate, or walk away.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-fl-4 h-full lg:col-span-3">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={0.1 + i * 0.08} fullHeight className="flex-1">
                  <div className="h-full rounded-2xl bg-white border border-thistle-black/[0.06] p-fl-5 flex items-start gap-fl-4">
                    <div className="w-11 h-11 rounded-xl bg-thistle-green/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={22} className="text-thistle-green" />
                    </div>
                    <div>
                      <h3 className="text-fluid-h6 font-medium tracking-tight text-thistle-black mb-1.5">{p.title}</h3>
                      <p className="text-fluid-sm text-thistle-black/70 leading-relaxed">{p.body}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal delay={0.4}>
          <InlineCTA />
        </Reveal>
      </div>
    </section>
  );
};
