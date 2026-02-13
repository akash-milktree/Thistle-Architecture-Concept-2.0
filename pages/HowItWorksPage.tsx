import React from 'react';
import { PageHero } from '../components/ui/PageHero';
import { Reveal } from '../components/animations/Reveal';
import { Button } from '../components/ui/Button';
import { useFeasibility } from '../components/feasibility/FeasibilityContext';
import { motion } from 'framer-motion';
import { ArrowUpRight, Upload, Search, PenTool, FileCheck } from 'lucide-react';
import { FAQ } from '../sections/FAQ';

const steps = [
  {
    num: "01",
    icon: <Upload size={24} />,
    title: "Submit Property Details",
    detail: "10 min setup",
    desc: "Upload floor plans, address, and your target unit mix. Our portal captures everything we need to start immediately.",
    expanded: "You don't need detailed drawings — basic floor plans, an address, and your initial assumptions on unit count are enough. If you don't have floor plans, we can often source them from Land Registry or request them from the selling agent.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800",
  },
  {
    num: "02",
    icon: <Search size={24} />,
    title: "Automated Desk Study",
    detail: "Day 1–2",
    desc: "We run constraints checks against planning policy, flood risk, daylight exposure, and local Article 4 directives.",
    expanded: "Our automated systems cross-reference over 15 data sources including the local plan, planning portal history, Environment Agency flood maps, noise mapping, conservation area boundaries, and listed building registers. This surfaces constraints that manual research often misses.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
  },
  {
    num: "03",
    icon: <PenTool size={24} />,
    title: "Architect Review",
    detail: "Day 3–4",
    desc: "A senior architect reviews the data, sketches the optimal layout, and solves complex spatial problems automation can't handle.",
    expanded: "The architect pressure-tests the desk study findings against the physical building. They produce GA floor plans showing the proposed unit layout, calculate the efficiency ratio, and identify any structural or services challenges that could affect buildability or cost.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800",
  },
  {
    num: "04",
    icon: <FileCheck size={24} />,
    title: "Feasibility Delivered",
    detail: "Day 5",
    desc: "A comprehensive report including GA plans, schedule of accommodation, risk register, and Go/No-Go recommendation.",
    expanded: "Your report is a single, investor-ready document containing everything you need: GA floor plans, a detailed schedule of accommodation against NDSS standards, constraints analysis, risk register with cost implications, and an unambiguous Go or No-Go recommendation.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
  },
];

const deliverables = [
  { title: "GA Floor Plans", desc: "Proposed layouts showing unit positions, circulation, and core areas." },
  { title: "Schedule of Accommodation", desc: "Unit-by-unit breakdown with GIA, room counts, and NDSS compliance." },
  { title: "Constraints Analysis", desc: "Planning policy, flood risk, Article 4, conservation, and heritage assessment." },
  { title: "Risk Register", desc: "Structural, environmental, and commercial risks quantified with cost implications." },
  { title: "Go/No-Go Recommendation", desc: "A clear, unambiguous recommendation backed by evidence." },
  { title: "Efficiency Metrics", desc: "Net-to-gross ratios, GDV estimates, and commercial viability indicators." },
];

export const HowItWorksPage: React.FC = () => {
  const { openModal } = useFeasibility();

  return (
    <>
      <PageHero
        label="How It Works"
        heading="From enquiry to clarity in 5 days."
        description="A structured, data-driven process that gives developers the confidence to bid, exchange, or walk away — fast."
        variant="dark"
      >
        <Button variant="glass" icon={<ArrowUpRight size={16} />} onClick={openModal} className="!bg-thistle-green !text-thistle-black !border-thistle-green hover:!bg-thistle-green/80 hover:!border-thistle-green/80">
          Start Feasibility
        </Button>
      </PageHero>

      {/* Expanded Steps */}
      <section className="py-fl-section px-fl-margin bg-thistle-white">
        <div className="max-w-[1360px] mx-auto">
          <div className="mb-fl-8">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.2em] text-thistle-black/40 font-semibold mb-fl-5">The Process</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black">
                Four steps. Five days.
              </h2>
            </Reveal>
          </div>

          <div className="flex flex-col gap-fl-5">
            {steps.map((step, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-2xl border border-thistle-black/[0.06] bg-white hover:border-thistle-black/[0.1] transition-colors overflow-hidden">
                  <div className="lg:col-span-4 relative">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover min-h-[200px] lg:min-h-0"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-xl border border-white/10 text-[10px] uppercase tracking-widest text-white/80 font-bold">
                        {step.num}
                      </span>
                    </div>
                  </div>
                  <div className="lg:col-span-8 p-fl-6 flex flex-col justify-center">
                    <div className="flex items-start gap-fl-4 mb-fl-4">
                      <div className="w-10 h-10 rounded-xl bg-thistle-black/[0.03] flex items-center justify-center text-thistle-black/40 flex-shrink-0">
                        {step.icon}
                      </div>
                      <div>
                        <h3 className="text-fluid-h6 font-medium tracking-tight mb-0.5">{step.title}</h3>
                        <span className="text-xs text-thistle-black/30 uppercase tracking-widest">{step.detail}</span>
                      </div>
                    </div>
                    <p className="text-sm text-thistle-black/50 leading-relaxed mb-fl-3">{step.desc}</p>
                    <p className="text-sm text-thistle-black/35 leading-relaxed">{step.expanded}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Break */}
      <section className="px-fl-margin bg-thistle-white pb-fl-4">
        <div className="max-w-[1360px] mx-auto">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-fl-4">
              <div className="aspect-[16/10] rounded-2xl overflow-hidden">
                <motion.img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
                  alt="Modern commercial building interior"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                />
              </div>
              <div className="aspect-[16/10] rounded-2xl overflow-hidden">
                <motion.img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
                  alt="Commercial building exterior"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-fl-section px-fl-margin bg-thistle-black text-white">
        <div className="max-w-[1360px] mx-auto">
          <div className="mb-fl-8">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.2em] text-white/30 font-semibold mb-fl-5">What You Receive</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight">
                Everything in one report.
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fl-4">
            {deliverables.map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="p-fl-5 rounded-xl border border-white/[0.06] bg-white/[0.03] hover:border-white/[0.12] hover:bg-white/[0.05] transition-all duration-500"
                >
                  <h3 className="text-fluid-h6 font-medium tracking-tight mb-fl-2">{item.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-fl-section-sm px-fl-margin bg-thistle-white">
        <div className="max-w-[1360px] mx-auto text-center">
          <Reveal>
            <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black mb-fl-5">
              Ready to start?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-sm text-thistle-black/50 leading-relaxed max-w-md mx-auto mb-fl-6">
              Submit your property details and we'll get back to you within 24 hours with a scope and fixed fee.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Button variant="primary" size="lg" icon={<ArrowUpRight size={18} />} onClick={openModal}>
              Start Feasibility
            </Button>
          </Reveal>
        </div>
      </section>

      <FAQ />
    </>
  );
};
