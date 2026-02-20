import React from 'react';
import { PageHero } from '../components/ui/PageHero';
import { Reveal } from '../components/animations/Reveal';
import { Button } from '../components/ui/Button';
import { useFeasibility } from '../components/feasibility/FeasibilityContext';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Testimonials } from '../sections/Testimonials';
import { FAQ } from '../sections/FAQ';

const deliverables = [
  {
    num: "01",
    title: "15-Minute Expert Session",
    desc: "A focused conversation with a senior architect before we begin — to understand your objectives, confirm assumptions, and scope the study correctly.",
    detail: "Day 1",
  },
  {
    num: "02",
    title: "Full Feasibility Report",
    desc: "A comprehensive document covering planning constraints, structural considerations, unit mix options, financial viability, and risk — everything you need to make a confident acquisition decision.",
    detail: "Day 5",
  },
  {
    num: "03",
    title: "Architectural Sketch Schemes",
    desc: "2 to 3 layout options drawn by a qualified architect, showing how the building can be configured. Each scheme is tested against space standards, planning constraints, and commercial viability.",
    detail: "Day 3–4",
  },
  {
    num: "04",
    title: "1-Hour Architect Meeting",
    desc: "A structured walkthrough of the report with the architect who produced it — so you can ask questions, probe assumptions, and leave with complete clarity on the recommendation.",
    detail: "Day 5",
  },
  {
    num: "05",
    title: "Financial Analysis",
    desc: "GDV projections, build cost benchmarks, margin analysis, and return on cost modelling — calibrated against comparable sales and local market data.",
    detail: "Included",
  },
  {
    num: "06",
    title: "Fee Proposal & Project Roadmap",
    desc: "If the site is viable, you receive a fixed-fee proposal for the full architectural scope — with a clear programme showing exactly what happens next and when.",
    detail: "Included",
  },
];

const dataChecks = [
  "Planning portal history & prior decisions",
  "Local plan constraints & allocations",
  "Class MA / Article 4 Direction exposure",
  "Environment Agency flood zones",
  "Conservation area & listed building checks",
  "HMO density & licensing thresholds",
  "Daylight & sunlight (BRE methodology)",
  "Noise mapping & environmental constraints",
  "Structural & services suitability",
  "NDSS space standard compliance",
  "GDV & build cost modelling",
  "Risk register with cost implications",
];

const process = [
  {
    num: "01",
    title: "Submit property details",
    desc: "Upload floor plans, address, and your target unit mix. Takes around 10 minutes.",
    detail: "Day 1 · 10 min",
  },
  {
    num: "02",
    title: "Automated desk study",
    desc: "We cross-reference 15+ data sources — planning policy, flood risk, Article 4, daylight, and more.",
    detail: "Day 1–2",
  },
  {
    num: "03",
    title: "Architect review",
    desc: "A senior architect reviews the data, produces sketch layouts, and validates commercial assumptions.",
    detail: "Day 3–4",
  },
  {
    num: "04",
    title: "Feasibility delivered",
    desc: "Your full report, sketch schemes, financial analysis, and architect meeting — ready in 5 days.",
    detail: "Day 5",
  },
];

export const FeasibilityPackagePage: React.FC = () => {
  const { openModal } = useFeasibility();

  return (
    <>
      <PageHero
        label="Feasibility Package"
        heading="Everything you need to decide in 5 days."
        description="A structured feasibility study combining automated data analysis with architect-led design review — delivered with a clear Go/No-Go recommendation."
        variant="dark"
      >
        <Button
          variant="glass"
          icon={<ArrowUpRight size={16} />}
          onClick={openModal}
          className="!bg-thistle-green !text-thistle-black !border-thistle-green hover:!bg-thistle-green/80 hover:!border-thistle-green/80"
        >
          Start Feasibility
        </Button>
      </PageHero>

      {/* What's Included */}
      <section className="py-fl-section px-fl-margin bg-thistle-white">
        <div className="max-w-[1360px] mx-auto">
          <div className="mb-fl-8">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.2em] text-thistle-black/40 font-semibold mb-fl-5">What's Included</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black">
                Six deliverables. One fixed fee.
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fl-4">
            {deliverables.map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-thistle-black/[0.08] rounded-xl p-fl-6 h-full flex flex-col group hover:border-thistle-black/[0.15] hover:shadow-lg hover:shadow-thistle-black/[0.04] transition-all duration-500"
                >
                  <div className="flex items-center justify-between mb-fl-5">
                    <span className="text-xs font-bold tracking-widest text-thistle-green">{item.num}</span>
                    <span className="text-[10px] uppercase tracking-widest text-thistle-black/30 font-medium">{item.detail}</span>
                  </div>
                  <h3 className="text-fluid-h6 font-medium tracking-tight text-thistle-black mb-fl-3">{item.title}</h3>
                  <p className="text-sm text-thistle-black/55 leading-relaxed flex-1">{item.desc}</p>
                  <div className="w-8 h-[2px] bg-thistle-black/10 mt-fl-5 group-hover:bg-thistle-green/50 group-hover:w-12 transition-all duration-500" />
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-fl-section px-fl-margin bg-thistle-black text-white">
        <div className="max-w-[1360px] mx-auto">
          <div className="mb-fl-8">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.2em] text-white/30 font-semibold mb-fl-5">The Process</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight">
                Four steps. Five days.
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-fl-4">
            {process.map((step, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/[0.05] border border-white/[0.10] rounded-xl p-fl-6 h-full flex flex-col group hover:border-thistle-green/30 hover:bg-white/[0.08] transition-colors duration-500"
                >
                  <div className="flex items-center justify-between mb-fl-5">
                    <span className="text-xs font-bold tracking-widest text-thistle-pink">{step.num}</span>
                    <span className="text-[10px] uppercase tracking-widest text-white/35 font-medium">{step.detail}</span>
                  </div>
                  <h3 className="text-fluid-h6 font-medium tracking-tight mb-fl-3">{step.title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed flex-1">{step.desc}</p>
                  <div className="w-8 h-[2px] bg-white/10 mt-fl-5 group-hover:bg-thistle-pink/40 group-hover:w-12 transition-all duration-500" />
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Data Checks */}
      <section className="py-fl-section px-fl-margin bg-thistle-white">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-fl-8 items-start">
            <div>
              <Reveal>
                <p className="text-xs uppercase tracking-[0.2em] text-thistle-black/40 font-semibold mb-fl-5">What We Check</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black mb-fl-5">
                  15+ data sources. Every time.
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="text-sm text-thistle-black/60 leading-relaxed">
                  Every feasibility is built on a structured desk study that cross-references planning policy, environmental data, and market intelligence. This is the foundation that makes our Go/No-Go recommendations reliable.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dataChecks.map((check, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-thistle-green/15 flex items-center justify-center flex-shrink-0">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="#8F9952" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-sm text-thistle-black/70">{check}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* CTA */}
      <section className="py-fl-section-sm px-fl-margin bg-thistle-black text-white">
        <div className="max-w-[1360px] mx-auto text-center">
          <Reveal>
            <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight mb-fl-5">
              Get your feasibility in 5 days.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-sm text-white/50 leading-relaxed max-w-md mx-auto mb-fl-6">
              Submit your property details and we'll get back to you within 24 hours with a fixed fee and scope.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Button
              variant="glass"
              size="lg"
              icon={<ArrowUpRight size={18} />}
              onClick={openModal}
              className="!bg-thistle-green !text-thistle-black !border-thistle-green hover:!bg-thistle-green/80 hover:!border-thistle-green/80"
            >
              Start Feasibility
            </Button>
          </Reveal>
        </div>
      </section>

      <FAQ />
    </>
  );
};
