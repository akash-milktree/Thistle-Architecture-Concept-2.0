import React from 'react';
import { Reveal } from '../components/animations/Reveal';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { ArrowUpRight } from 'lucide-react';
import { useFeasibility } from '../components/feasibility/FeasibilityContext';

const dataPoints = [
  { label: "Planning constraints", detail: "Class MA, Article 4, prior approval routes" },
  { label: "HMO density & licensing", detail: "Local authority thresholds and saturation mapping" },
  { label: "Flood & environmental risk", detail: "EA flood zones, ground risk, contamination flags" },
  { label: "Daylight & sunlight", detail: "BRE compliance checks at feasibility stage" },
  { label: "Financial analysis", detail: "GDV, build cost, margin and ROI modelling" },
  { label: "Risk rating", detail: "Go/No-Go with clear reasoning, not vague caveats" },
];

export const Difference: React.FC = () => {
  const { openModal } = useFeasibility();

  return (
    <section className="bg-thistle-black text-white py-fl-section px-fl-margin overflow-hidden">
      <div className="max-w-[1360px] mx-auto">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-fl-8 items-end mb-fl-8">
          <div>
            <Reveal>
              <p className="text-xs uppercase tracking-[0.2em] text-white/30 font-semibold mb-fl-5">Our Difference</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight">
                Feasibility-led.<br />
                <span className="text-thistle-pink">Backed by data.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="text-fluid-sm text-white/40 leading-relaxed max-w-lg">
              Most architects give you an opinion. We give you evidence. Every Thistle feasibility is built on structured data analysis — not guesswork — so you know exactly what you're dealing with before you commit a pound.
            </p>
          </Reveal>
        </div>

        {/* Data Points Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden mb-fl-8">
          {dataPoints.map((point, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <motion.div
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
                transition={{ duration: 0.2 }}
                className="bg-thistle-black p-fl-6 flex flex-col gap-fl-3 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-thistle-green flex-shrink-0" />
                  <span className="text-fluid-h6 font-medium text-white tracking-tight">{point.label}</span>
                </div>
                <p className="text-fluid-sm text-white/35 leading-relaxed pl-[18px] group-hover:text-white/50 transition-colors duration-300">
                  {point.detail}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Bottom: differentiator statement + CTA */}
        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-fl-5 pt-fl-6 border-t border-white/[0.06]">
            <p className="text-fluid-sm text-white/40 max-w-lg leading-relaxed">
              This isn't a report you'll file away. It's a decision-making tool — designed to speed up your pipeline and de-risk every acquisition.
            </p>
            <Button variant="glass" icon={<ArrowUpRight size={16} />} onClick={openModal}
              className="!bg-thistle-pink !border-thistle-pink !text-thistle-black hover:!bg-thistle-pink/80 hover:!border-thistle-pink/80 flex-shrink-0">
              Start Feasibility
            </Button>
          </div>
        </Reveal>

      </div>
    </section>
  );
};
