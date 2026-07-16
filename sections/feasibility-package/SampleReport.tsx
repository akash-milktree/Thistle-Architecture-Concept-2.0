"use client";

import React from 'react';
import Image from 'next/image';
import { Reveal } from '../../components/animations/Reveal';
import { SampleReportGate } from './SampleReportGate';

// Ed's video feedback 2026-07-08: show the complete set of documents a client
// receives, not three pages of one report. "So that they can see a complete
// project breakdown and all of the documents that they'll get instead of just
// the report." Previews are first pages of the real example pack in
// "03 New Website/Example Feasibility, to be emailed as example".
const documents = [
  {
    src: "/images/projects/doc-overview.png",
    label: "Document 01",
    title: "Feasibility Overview",
    body: "The whole picture: planning history and local comparables, planning risk, development potential, Building Regs, and the commercial position.",
  },
  {
    src: "/images/projects/doc-sketch-scheme.png",
    label: "Document 02",
    title: "Sketch Schemes",
    body: "One to two layout options drawn over your existing plans, with room sizes and the accommodation schedule.",
  },
  {
    src: "/images/projects/doc-planning-research.png",
    label: "Document 03",
    title: "Planning Research",
    body: "A risk level against every planning constraint on the site, from Article 4 to conservation and licensing.",
  },
  {
    src: "/images/projects/doc-space-standards.png",
    label: "Document 04",
    title: "Space Standards",
    body: "The space standards that apply in your specific area, with the hard numbers behind every room size in the scheme.",
  },
];

export const SampleReport: React.FC = () => (
  <section className="bg-thistle-white py-fl-section px-fl-margin">
    <div className="max-w-[1360px] mx-auto">
      <div className="text-center mb-fl-8 max-w-2xl mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-4">What You Receive</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black">
            Real Documents.<br /><span className="text-thistle-green">Not A Brochure.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-fluid-base text-thistle-black/70 leading-relaxed mt-fl-4">
            Not one report, but a complete set. These are the actual documents from a feasibility we delivered, covering
            the scheme, the planning position, and the standards it has to meet.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-fl-5 max-w-5xl mx-auto items-stretch">
        {documents.map((doc, i) => (
          <Reveal key={i} delay={i * 0.08} fullHeight>
            <div className="h-full flex flex-col bg-white rounded-2xl border border-thistle-black/[0.06] p-fl-3 shadow-sm">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-white border border-thistle-black/[0.04]">
                <Image
                  src={doc.src}
                  alt={`First page of the ${doc.title} document`}
                  fill
                  sizes="(max-width: 1024px) 45vw, 260px"
                  className="object-cover object-top"
                />
              </div>
              <div className="flex flex-col flex-1 pt-fl-4 px-1 pb-1">
                <span className="text-[10px] uppercase tracking-wider text-thistle-green font-semibold mb-1.5">{doc.label}</span>
                <h3 className="text-fluid-h6 font-medium tracking-tight text-thistle-black mb-fl-2">{doc.title}</h3>
                <p className="text-[12px] leading-relaxed text-thistle-black/55">{doc.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <SampleReportGate />
    </div>
  </section>
);
