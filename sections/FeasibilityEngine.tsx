"use client";

import React from 'react';
import Image from 'next/image';
import { Reveal } from '../components/animations/Reveal';
import { feasibilityLayers } from '../data/feasibilityLayers';
import { InlineCTA } from '../components/ui/InlineCTA';

// The six data layers, image-led. Photography replaced the old SVG
// data-visualisation mock-ups; each layer gets one bespoke image.
const layers = [
  {
    ...feasibilityLayers[0],
    body: "The planning history of your property and its surroundings: what has been approved, refused, or is pending nearby.",
    image: "/images/generated/layer-planning.jpg",
    alt: "Printed planning decision notices fanned out on a desk",
  },
  {
    ...feasibilityLayers[1],
    body: "The local and national policies, Building Regulations, and licensing requirements that decide whether your scheme is viable.",
    image: "/images/generated/layer-policy.jpg",
    alt: "A printed town map with zones marked in highlighter",
  },
  {
    ...feasibilityLayers[2],
    body: "Targeted checks on the constraints that bite: density caps, change-of-use restrictions, and local planning thresholds.",
    image: "/images/generated/layer-density.jpg",
    alt: "Top-down aerial of dense terraced housing streets",
  },
  {
    ...feasibilityLayers[3],
    body: "Nearby conversions, achieved unit counts, and actual sale values. Benchmarks sourced automatically, not guessed from memory.",
    image: "/images/generated/layer-comparables.jpg",
    alt: "A row of freshly converted terraced houses",
  },
  {
    ...feasibilityLayers[4],
    body: "Build cost modelling, margin analysis, and ROI projections. A clear view of whether the deal pencils before you commit.",
    image: "/images/generated/layer-gdv.jpg",
    alt: "A printed financial appraisal beside a calculator",
  },
  {
    ...feasibilityLayers[5],
    body: "Architect-led layout options that maximise unit yield against space standards, daylight, and circulation.",
    image: "/images/generated/layer-layout.jpg",
    alt: "An architect sketching a floor plan on tracing paper",
  },
];

export const FeasibilityEngine: React.FC = () => {
  return (
    <section className="bg-thistle-white py-fl-section px-fl-margin">
      <div className="max-w-[1360px] mx-auto">
        {/* Header */}
        <div className="text-center mb-fl-8 max-w-2xl mx-auto">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-4">The Analysis</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black mb-fl-4">
              What&apos;s Included<br /><span className="text-thistle-green">In Data Analysis.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-fluid-base text-thistle-black/80 leading-relaxed">
              Hundreds of data points cross-referenced across trusted sources, so our architects can focus on intelligent layouts and clear recommendations.
            </p>
          </Reveal>
        </div>

        {/* Six layers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fl-5 mb-fl-8">
          {layers.map((layer, i) => (
            <Reveal key={layer.eyebrow} delay={Math.min(i * 0.06, 0.3)}>
              <div className="h-full rounded-2xl overflow-hidden bg-white border border-thistle-black/[0.06]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={layer.image}
                    alt={layer.alt}
                    fill
                    sizes="(max-width: 768px) 90vw, 430px"
                    className="object-cover"
                  />
                </div>
                <div className="p-fl-5">
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-2">{layer.eyebrow}</span>
                  <h3 className="text-fluid-h6 font-medium tracking-tight text-thistle-black mb-fl-2">{layer.title}</h3>
                  <p className="text-fluid-sm text-thistle-black/65 leading-relaxed">{layer.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.35}>
          <InlineCTA href="" label="Start Feasibility" />
        </Reveal>
      </div>
    </section>
  );
};
