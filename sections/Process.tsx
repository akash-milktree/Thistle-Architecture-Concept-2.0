import React from 'react';
import { Reveal } from '../components/animations/Reveal';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { ArrowUpRight } from 'lucide-react';
import { useFeasibility } from '../components/feasibility/FeasibilityContext';

const steps = [
  {
    num: "01",
    title: "Submit Property Details",
    desc: "Upload floor plans, address, and your target unit mix. Our portal captures everything we need to start immediately.",
    detail: "10 min setup"
  },
  {
    num: "02",
    title: "Automated Desk Study",
    desc: "We run constraints checks against planning policy, flood risk, daylight exposure, and local Article 4 directives.",
    detail: "Day 1–2"
  },
  {
    num: "03",
    title: "Architect Review",
    desc: "A senior architect reviews the data, sketches the optimal layout, and solves complex spatial problems automation can't handle.",
    detail: "Day 3–4"
  },
  {
    num: "04",
    title: "Feasibility Delivered",
    desc: "A comprehensive report including GA plans, schedule of accommodation, risk register, and Go/No-Go recommendation.",
    detail: "Day 5"
  }
];

export const Process: React.FC = () => {
  const { openModal } = useFeasibility();

  return (
    <section className="bg-thistle-black text-white py-fl-section px-fl-margin overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-fl-section-sm gap-fl-6">
          <div>
            <Reveal>
              <p className="text-xs uppercase tracking-[0.2em] text-white/30 font-semibold mb-fl-5">How It Works</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight">
                5 days to clarity.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <Button variant="glass" icon={<ArrowUpRight size={16} />} onClick={openModal}>Start Feasibility</Button>
          </Reveal>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-fl-4 mb-fl-8">
          {steps.map((step, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-white/[0.05] border border-white/[0.10] rounded-xl p-fl-6 h-full flex flex-col justify-between min-h-[320px] group hover:border-thistle-pink/30 hover:bg-white/[0.08] transition-colors duration-500"
              >
                <div>
                  <div className="flex items-center justify-between mb-fl-6">
                    <span className="text-xs font-bold tracking-widest text-thistle-pink">{step.num}</span>
                    <span className="text-[10px] uppercase tracking-widest text-white/35 font-medium">{step.detail}</span>
                  </div>
                  <h3 className="text-fluid-h5 font-medium mb-fl-4 tracking-tight group-hover:text-white transition-colors">{step.title}</h3>
                  <p className="text-fluid-sm text-white/55 leading-relaxed group-hover:text-white/75 transition-colors">{step.desc}</p>
                </div>
                <div className="w-8 h-[2px] bg-white/10 mt-8 group-hover:bg-thistle-pink/40 group-hover:w-12 transition-all duration-500" />
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Deliverables — what's in the package */}
        <Reveal delay={0.2}>
          <div className="bg-white/[0.05] border border-white/[0.10] rounded-2xl p-fl-7">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-fl-7 items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-thistle-pink font-semibold mb-fl-4">What's included</p>
                <h3 className="text-fluid-h3 font-medium tracking-tight leading-tight mb-fl-4">
                  Your feasibility package.
                </h3>
                <p className="text-fluid-sm text-white/55 leading-relaxed max-w-sm">
                  Everything you need to make a confident acquisition decision — delivered in 5 working days.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-fl-3">
                {[
                  "15-minute expert session",
                  "Full feasibility report",
                  "2–3 architectural sketch schemes",
                  "1-hour architect meeting",
                  "Financial analysis of the site",
                  "Fee proposal & project roadmap",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-thistle-green/15 flex items-center justify-center flex-shrink-0">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="#8F9952" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-fluid-sm text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
