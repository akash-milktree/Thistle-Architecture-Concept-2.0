"use client";

import React from 'react';
import { Reveal } from '../components/animations/Reveal';
import { motion } from 'framer-motion';
import { LayoutPanelLeft, FileSearch, PoundSterling, FileCheck, ShieldCheck, Users } from 'lucide-react';
import { InlineCTA } from '../components/ui/InlineCTA';

const deliverables = [
  {
    icon: LayoutPanelLeft,
    title: "Layout options",
    outcome: "Maximise unit yield",
    desc: "Multiple scheme options with unit mixes, floor areas, and efficiency ratios tested against space standards.",
  },
  {
    icon: FileSearch,
    title: "Planning insight",
    outcome: "Reduce refusal risk",
    desc: "Class MA, Article 4, and full planning route analysis with prior approval history and policy alignment.",
  },
  {
    icon: PoundSterling,
    title: "Financial appraisal",
    outcome: "Validate deal",
    desc: "GDV modelling, build cost estimates, margin analysis, and ROI projections to support your acquisition decision.",
  },
  {
    icon: FileCheck,
    title: "Pre-app package",
    outcome: "Accelerate delivery",
    desc: "GA plans, accommodation schedules, and supporting documentation ready for pre-application discussions.",
  },
  {
    icon: ShieldCheck,
    title: "Risk register",
    outcome: "De-risk investment",
    desc: "Structural, environmental, and commercial risks mapped with clear Go/No-Go reasoning for each factor.",
  },
  {
    icon: Users,
    title: "Architect review",
    outcome: "Expert validation",
    desc: "Every feasibility reviewed by a qualified architect who pressure-tests layouts and validates assumptions.",
  },
];

export const Benefits: React.FC = () => {
  return (
    <section className="bg-thistle-white py-fl-section px-fl-margin">
      <div className="max-w-[1360px] mx-auto">
        {/* Header */}
        <div className="text-center mb-fl-8 max-w-2xl mx-auto">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-4">What You Get</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black mb-fl-4">
              Every Deliverable Links To A Decision.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-fluid-base text-thistle-black/80 leading-relaxed">
              Everything a developer needs to assess an existing building, structured, fast, and commercially focused.
            </p>
          </Reveal>
        </div>

        {/* Deliverables grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fl-4 mb-fl-7">
          {deliverables.map((item, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-xl border border-thistle-black/[0.06] p-fl-6 group hover:border-thistle-green/25 hover:shadow-lg hover:shadow-thistle-green/5 transition-all duration-300 h-full"
              >
                <div className="flex items-center gap-3 mb-fl-5">
                  <div className="w-10 h-10 rounded-lg bg-thistle-green/10 flex items-center justify-center group-hover:bg-thistle-green/20 transition-colors">
                    <item.icon size={20} className="text-thistle-green" />
                  </div>
                  <span className="text-xs font-semibold tracking-wide text-thistle-green uppercase">{item.outcome}</span>
                </div>
                <h3 className="text-fluid-h5 font-medium tracking-tight text-thistle-black mb-fl-3">{item.title}</h3>
                <p className="text-fluid-base text-thistle-black/80 leading-relaxed">{item.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.6}>
          <InlineCTA label="See a sample feasibility report" />
        </Reveal>
      </div>
    </section>
  );
};
