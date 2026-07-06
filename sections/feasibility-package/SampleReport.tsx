"use client";

import React from 'react';
import Image from 'next/image';
import { Reveal } from '../../components/animations/Reveal';
import { SampleReportGate } from './SampleReportGate';

// Real pages from a live Thistle feasibility document (St Johns, Aylesbury).
const pages = [
  { src: "/images/projects/sample-report-1.png", label: "Page 01", title: "Summary and HMO strategy" },
  { src: "/images/projects/sample-report-2.png", label: "Page 02", title: "Design approach and amenity" },
  { src: "/images/projects/sample-report-3.png", label: "Page 03", title: "Constraints and key risks" },
];

export const SampleReport: React.FC = () => (
  <section className="bg-white py-fl-section px-fl-margin">
    <div className="max-w-[1360px] mx-auto">
      <div className="text-center mb-fl-8 max-w-2xl mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-4">What The Report Looks Like</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black">
            A Real Document.<br /><span className="text-thistle-green">Not A Brochure.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-fluid-base text-thistle-black/70 leading-relaxed mt-fl-4">
            These pages are from a real feasibility we delivered for a nine-bedroom HMO conversion in Aylesbury.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-fl-5 max-w-4xl mx-auto">
        {pages.map((page, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="bg-white rounded-2xl border border-thistle-black/[0.06] p-fl-3 shadow-sm">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-white">
                <Image
                  src={page.src}
                  alt={`Sample feasibility report, ${page.title}`}
                  fill
                  sizes="(max-width: 768px) 90vw, 300px"
                  className="object-cover object-top"
                />
              </div>
              <div className="flex items-center justify-between pt-fl-3 px-1">
                <span className="text-[10px] uppercase tracking-wider text-thistle-green font-semibold">{page.label}</span>
                <span className="text-[11px] text-thistle-black/50">{page.title}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <SampleReportGate />
    </div>
  </section>
);
