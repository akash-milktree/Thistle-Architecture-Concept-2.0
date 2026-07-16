"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '../../components/animations/Reveal';
import { deliverables } from '../../data/howItWorksData';
import { deliverableDetail } from '../../data/feasibilityPackageData';

// Real imagery per deliverable: Thistle drawings where the deliverable is a
// drawing, photography where it is a document or a judgement.
const images: { src: string; alt: string; fit: 'contain' | 'cover' }[] = [
  { src: "/images/projects/st-johns-sk001-1.png", alt: "A sketch scheme showing proposed layouts for a nine-bedroom HMO conversion", fit: "contain" },
  { src: "/images/generated/desk-plans.jpg", alt: "Printed floor plans and schedules on an architect's desk", fit: "cover" },
  { src: "/images/projects/greyfriars-option4-1.png", alt: "Colour-coded feasibility sketch showing constraints and shared spaces", fit: "contain" },
  { src: "/images/generated/report-hands.jpg", alt: "A bound feasibility report held in two hands", fit: "cover" },
  { src: "/images/projects/sample-report-1.png", alt: "The first page of a real Thistle feasibility document", fit: "contain" },
];

const Panel: React.FC<{ index: number; className?: string }> = ({ index, className = '' }) => {
  const img = images[index];
  return (
    <div className={`relative aspect-[4/3] rounded-2xl border border-thistle-black/[0.06] overflow-hidden ${img.fit === 'contain' ? 'bg-white' : 'bg-thistle-white/60'} ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="absolute inset-0"
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 1024px) 92vw, 700px"
            className={img.fit === 'contain' ? 'object-contain p-3' : 'object-cover'}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Compact selector: every deliverable in one viewport instead of a stack of
// full-height alternating rows. Desktop shows the active image beside the
// list; mobile expands the image inside the open item.
export const DeliverableShowcase: React.FC = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-white py-fl-section px-fl-margin">
      <div className="max-w-[1360px] mx-auto">
        <div className="text-center mb-fl-8 max-w-2xl mx-auto">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-4">The Deliverables</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black">
              Five Deliverables.<br /><span className="text-thistle-green">One Decision.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-fl-6 lg:items-start">
          {/* Selector list */}
          <div className="lg:col-span-5 flex flex-col gap-fl-2">
            {deliverables.map((d, i) => {
              const isActive = i === active;
              const detail = deliverableDetail[i];
              return (
                <Reveal key={d.title} delay={Math.min(i * 0.04, 0.2)}>
                  <button
                    onClick={() => setActive(i)}
                    aria-expanded={isActive}
                    className={`w-full text-left rounded-2xl border transition-all duration-300 ${
                      isActive
                        ? 'bg-thistle-white/70 border-thistle-green/30'
                        : 'bg-white border-thistle-black/[0.06] hover:border-thistle-black/20'
                    }`}
                  >
                    <div className="flex items-center gap-fl-4 px-fl-5 py-fl-4">
                      <span className={`text-sm font-semibold tabular-nums ${isActive ? 'text-thistle-green' : 'text-thistle-black/30'}`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className={`text-fluid-h6 font-medium tracking-tight ${isActive ? 'text-thistle-black' : 'text-thistle-black/70'}`}>
                        {d.title}
                      </span>
                    </div>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                          className="overflow-hidden"
                        >
                          <div className="px-fl-5 pb-fl-5">
                            <p className="text-fluid-sm text-thistle-black/75 leading-relaxed mb-fl-3">{d.desc}</p>
                            <p className="text-fluid-sm text-thistle-black/55 leading-relaxed">{detail.why}</p>
                            {/* Image inside the open item on small screens */}
                            <div className="lg:hidden mt-fl-4">
                              <Panel index={i} />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </Reveal>
              );
            })}
          </div>

          {/* Image panel, desktop only */}
          <div className="hidden lg:block lg:col-span-7 lg:sticky lg:top-28">
            <Reveal delay={0.1}>
              <Panel index={active} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
