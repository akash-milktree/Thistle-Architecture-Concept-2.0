"use client";

import React from 'react';
import Image from 'next/image';
import { Reveal } from '../components/animations/Reveal';
import { Building, PoundSterling } from 'lucide-react';
import { InlineCTA } from '../components/ui/InlineCTA';

const blocks = [
  {
    icon: Building,
    title: "Comparables & Precedent Analysis",
    body: "We benchmark your site against recent nearby conversions, achieved unit counts, sale values, and approved layouts. Real precedents, not assumptions, set the baseline for your scheme.",
    image: "/images/generated/terrace-scaffold.jpg",
    imageAlt: "A UK terraced house mid conversion behind scaffolding",
  },
  {
    icon: PoundSterling,
    title: "Financial Appraisal",
    body: "We assess not only the expected GDV of the scheme, but also the purchase price, build cost, and projected margin, so you can see whether the deal pencils before you commit capital.",
    image: "/images/generated/desk-plans.jpg",
    imageAlt: "Printed floor plans and schedules on an architect's desk",
  },
];

export const ArchitectReview: React.FC = () => {
  return (
    <section className="bg-white py-fl-section px-fl-margin">
      <div className="max-w-[1360px] mx-auto">
        {/* Header */}
        <div className="text-center mb-fl-section-sm max-w-2xl mx-auto">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-4">Next Stage</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black mb-fl-4">
              Architect-Led<br /><span className="text-thistle-green">Feasibility Review.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-fluid-base text-thistle-black/80 leading-relaxed">
              After the automated data-gathering stage, our architectural team reviews and interprets the planning, policy, site, and financial data to identify the key opportunities and risks for your scheme. This is the manual element, done by our team.
            </p>
          </Reveal>
        </div>

        {/* Sub-blocks, image-topped */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-fl-5 mb-fl-7">
          {blocks.map((b, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="bg-thistle-white/70 rounded-2xl border border-thistle-black/[0.06] overflow-hidden h-full flex flex-col">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={b.image}
                    alt={b.imageAlt}
                    fill
                    sizes="(max-width: 768px) 90vw, 640px"
                    className="object-cover"
                  />
                </div>
                <div className="p-fl-6 flex-1">
                  <div className="flex items-center gap-3 mb-fl-4">
                    <div className="w-10 h-10 rounded-lg bg-thistle-green/10 flex items-center justify-center flex-shrink-0">
                      <b.icon size={20} className="text-thistle-green" />
                    </div>
                    <h3 className="text-fluid-h5 font-medium tracking-tight text-thistle-black">{b.title}</h3>
                  </div>
                  <p className="text-fluid-base text-thistle-black/80 leading-relaxed">{b.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* The person behind the review */}
        <Reveal delay={0.2}>
          <div className="flex items-center justify-center gap-fl-4 mb-fl-7">
            <Image
              src="/images/team/kaan.jpg"
              alt="Kaan, Design Lead at Thistle Architecture"
              width={112}
              height={112}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-thistle-green/20 flex-shrink-0"
            />
            <div className="text-left">
              <span className="block text-sm font-semibold text-thistle-black leading-tight">Kaan, Design Lead</span>
              <span className="block text-xs text-thistle-black/60 leading-snug mt-0.5">BArch. Leads every feasibility from sketch scheme to sign-off.</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <InlineCTA />
        </Reveal>
      </div>
    </section>
  );
};
