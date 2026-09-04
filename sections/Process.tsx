"use client";

import React from 'react';
import { Reveal } from '../components/animations/Reveal';
import { motion } from 'framer-motion';
import { Upload, Cpu, Phone, PenTool, Video } from 'lucide-react';
import { InlineCTA } from '../components/ui/InlineCTA';
import { pruneEmpty } from '../lib/tina';

/** One step, plus the CMS field ids for that step's own three fields. */
export interface ProcessStep {
  num: string;
  title: string;
  desc: string;
  tina?: Partial<Record<'num' | 'title' | 'desc', string>>;
}

// The wording below is the fallback for the same five steps in the CMS. The
// icons are not in the CMS and are matched by position, so the first step gets
// the upload icon whatever it ends up being called. That is also how `isFinal`
// has always worked — the last step in the list is the wide green one — so the
// two agree.
const STEPS_FALLBACK: (ProcessStep & { icon: React.ElementType })[] = [
  {
    num: "01",
    title: "Upload Property Details",
    desc: "Share your property's address with a few basic details: size, floor count, and current use. Takes under two minutes.",
    icon: Upload,
  },
  {
    num: "02",
    title: "Project Data Gathering Session",
    desc: "An instant call with Jodi, our property expert, to gather the details we need and walk through your goals for the site. A short, focused conversation that keeps the five-day clock moving.",
    icon: Phone,
  },
  {
    num: "03",
    title: "Automated Analysis",
    desc: "Our system checks planning history, site constraints, density data, and comparable schemes in your local area. Automating the laborious part is what frees our design team to spend their time on the sketch scheme.",
    icon: Cpu,
  },
  {
    num: "04",
    title: "Sketch Scheme Stage",
    desc: "One of our designers will carry out the sketch scheme analysis to determine the best possible layout based on your brief, local comparables, local and national constraints, and the best commercial outcome.",
    icon: PenTool,
  },
  {
    num: "05",
    title: "Final Meeting",
    desc: "You'll be sent a video call link after uploading your information. We'll review the completed feasibility together after 5 days, so you can bid, walk away, or move into conveyancing with confidence.",
    icon: Video,
  }
];

const COPY_FALLBACK = {
  eyebrow: 'Our Process',
  // Two fields because the second line is picked out in green, which one
  // string with a newline in it cannot express.
  heading: 'Our Five-Step',
  headingAccent: 'Feasibility Process.',
  // Ed's August 2026 final brief: one short bridge after the five steps, so the
  // architecture side of the practice stays visible without a services section.
  bridge: "If it's a Go, we can take it forward: planning, design, technical, tender and construction, with the same team throughout.",
  ctaLabel: 'Get Your Fixed Fee',
};

interface ProcessProps {
  /** CMS copy for the section's own wording. Falls back per field. */
  copy?: Partial<typeof COPY_FALLBACK>;
  /** CMS steps. Falls back whole to STEPS_FALLBACK when empty or absent. */
  steps?: ProcessStep[];
  tina?: Partial<Record<keyof typeof COPY_FALLBACK, string>>;
}

export const Process: React.FC<ProcessProps> = ({ copy, steps, tina }) => {
  const c = { ...COPY_FALLBACK, ...pruneEmpty(copy) };
  // Whole-list fallback: an empty list means the section has not been filled
  // in, not that the editor wants five blank cards.
  const list: ProcessStep[] = steps && steps.length ? steps : STEPS_FALLBACK;

  return (
    <section id="process" className="bg-white py-fl-section px-fl-margin overflow-hidden scroll-mt-28">
      <div className="max-w-[1360px] mx-auto">
        {/* Header */}
        <div className="text-center mb-fl-8">
          <Reveal>
            <p
              className="text-sm uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-4"
              data-tina-field={tina?.eyebrow}
            >
              {c.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            {/* One marker per line rather than one on the h2. The two lines are
                separate fields, so a marker on the heading as a whole would
                open the first one wherever you clicked. */}
            <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black">
              <span data-tina-field={tina?.heading}>{c.heading}</span><br />
              <span className="text-thistle-green" data-tina-field={tina?.headingAccent}>{c.headingAccent}</span>
            </h2>
          </Reveal>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-fl-4 mb-fl-7">
          {list.map((step, i) => {
            const isFinal = i === list.length - 1;
            // Icons are code, matched by position. A sixth step added in the
            // CMS reuses the last icon rather than rendering nothing.
            const Icon = (STEPS_FALLBACK[i] ?? STEPS_FALLBACK[STEPS_FALLBACK.length - 1]).icon;
            return (
              <Reveal key={i} delay={i * 0.1} className={isFinal ? 'md:col-span-2' : ''}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className={`relative rounded-xl p-fl-6 h-full flex flex-col group transition-all duration-300 ${
                    isFinal
                      ? 'bg-thistle-green/10 border border-thistle-green/30 hover:border-thistle-green/50 hover:shadow-lg hover:shadow-thistle-green/10'
                      : 'bg-thistle-white/70 border border-thistle-black/[0.06] hover:border-thistle-green/30 hover:shadow-lg hover:shadow-thistle-green/5'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-fl-5">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                      isFinal
                        ? 'bg-thistle-green text-white'
                        : 'bg-thistle-green/10 text-thistle-green group-hover:bg-thistle-green/20'
                    }`}>
                      <Icon size={20} />
                    </div>
                    {/* Ed's video feedback 2026-07-08: step numbers must read clearly at a glance. */}
                    <span
                      className={`text-3xl font-semibold tracking-tight tabular-nums leading-none ${isFinal ? 'text-thistle-green' : 'text-thistle-black/35'}`}
                      data-tina-field={step.tina?.num}
                    >
                      {step.num}
                    </span>
                  </div>

                  <h3 className="text-fluid-h5 font-medium mb-fl-3 tracking-tight text-thistle-black" data-tina-field={step.tina?.title}>
                    {step.title}
                  </h3>
                  <p className="text-fluid-base text-thistle-black/80 leading-relaxed" data-tina-field={step.tina?.desc}>
                    {step.desc}
                  </p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.45}>
          <p
            className="text-fluid-base text-thistle-black/70 text-center max-w-2xl mx-auto mt-fl-7"
            data-tina-field={tina?.bridge}
          >
            {c.bridge}
          </p>
        </Reveal>

        <Reveal delay={0.5}>
          <InlineCTA className="mt-fl-6" label={c.ctaLabel} tinaLabel={tina?.ctaLabel} />
        </Reveal>
      </div>
    </section>
  );
};
