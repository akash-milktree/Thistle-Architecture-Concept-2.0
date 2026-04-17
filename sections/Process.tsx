"use client";

import React from 'react';
import { Reveal } from '../components/animations/Reveal';
import { motion } from 'framer-motion';
import { Upload, Cpu, UserCheck, FileCheck } from 'lucide-react';
import { InlineCTA } from '../components/ui/InlineCTA';

const steps = [
  {
    num: "01",
    title: "Submit Property",
    desc: "Address + basic inputs",
    icon: Upload,
  },
  {
    num: "02",
    title: "Automated Analysis",
    desc: "Planning, constraints, density, comparables",
    icon: Cpu,
  },
  {
    num: "03",
    title: "Architect Review",
    desc: "Validation and optimisation",
    icon: UserCheck,
  },
  {
    num: "04",
    title: "Feasibility Delivered",
    desc: "Report + layouts + Go/No-Go",
    icon: FileCheck,
  }
];

export const Process: React.FC = () => {
  return (
    <section className="bg-thistle-white py-fl-section px-fl-margin overflow-hidden">
      <div className="max-w-[1360px] mx-auto">
        {/* Header */}
        <div className="text-center mb-fl-8">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-4">How It Works</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black">
              From submission to clarity.
            </h2>
          </Reveal>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-fl-4 mb-fl-7">
          {steps.map((step, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="relative bg-white border border-thistle-black/[0.06] rounded-xl p-fl-6 h-full flex flex-col group hover:border-thistle-green/30 hover:shadow-lg hover:shadow-thistle-green/5 transition-all duration-300"
              >
                {/* Step connector line (not on last) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-[calc(var(--space-4)/2+1px)] w-[var(--space-4)] h-px bg-thistle-black/[0.08]" />
                )}

                <div className="flex items-center gap-3 mb-fl-5">
                  <div className="w-10 h-10 rounded-lg bg-thistle-green/10 flex items-center justify-center group-hover:bg-thistle-green/20 transition-colors">
                    <step.icon size={20} className="text-thistle-green" />
                  </div>
                  <span className="text-xs font-bold tracking-widest text-thistle-black/30">{step.num}</span>
                </div>

                <h3 className="text-fluid-h5 font-medium mb-fl-3 tracking-tight text-thistle-black">{step.title}</h3>
                <p className="text-fluid-sm text-thistle-black/50 leading-relaxed">{step.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.5}>
          <InlineCTA label="Start your feasibility" />
        </Reveal>
      </div>
    </section>
  );
};
