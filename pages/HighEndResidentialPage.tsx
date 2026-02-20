import React from 'react';
import { PageHero } from '../components/ui/PageHero';
import { Reveal } from '../components/animations/Reveal';
import { Button } from '../components/ui/Button';
import { useFeasibility } from '../components/feasibility/FeasibilityContext';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Testimonials } from '../sections/Testimonials';
import { FAQ } from '../sections/FAQ';

const approach = [
  {
    title: "Spatial quality first",
    desc: "High-end buyers have expectations that go beyond space standards. We model layouts that prioritise quality of space, natural light, and flow — not just compliant square footage.",
  },
  {
    title: "Planning strategy",
    desc: "Premium residential projects often involve conservation areas, listed buildings, or sensitive urban sites. We assess the planning constraints and identify the strategy most likely to succeed.",
  },
  {
    title: "Market-calibrated unit mix",
    desc: "We benchmark unit sizes and specifications against comparable sales in the local market to ensure the scheme is commercially positioned correctly.",
  },
  {
    title: "Daylight & sunlight compliance",
    desc: "BRE daylight and sunlight analysis at feasibility stage, so you know whether the planning committee will challenge the scheme before you invest in detailed design.",
  },
];

const whatWeAssess = [
  { label: "Conservation & heritage", detail: "Listed building consents, conservation area appraisals, and heritage impact assessments factored into feasibility from day one." },
  { label: "Planning policy context", detail: "Local plan housing policies, design guides, and any area-specific requirements that will shape the scheme." },
  { label: "Daylight & sunlight (BRE)", detail: "Overshadowing, sky factor, and VSC analysis to identify any constraints on massing or window placement early." },
  { label: "Unit mix & market positioning", detail: "Comparable sales analysis to calibrate the unit mix and specification level against what buyers will actually pay." },
  { label: "GDV & financial analysis", detail: "Revenue and cost modelling benchmarked against local comparable sales, with margin and return on cost projections." },
  { label: "Architectural sketch schemes", detail: "2–3 layout options showing how the building can be configured, tested against space standards and planning constraints." },
];

const stats = [
  { value: "200+", label: "Feasibility reports completed" },
  { value: "£120M+", label: "GDV assessed" },
  { value: "5", label: "Working days to report" },
  { value: "7+", label: "Years specialist experience" },
];

export const HighEndResidentialPage: React.FC = () => {
  const { openModal } = useFeasibility();

  return (
    <>
      <PageHero
        label="High-End Residential"
        heading="Feasibility built for premium residential projects."
        description="Conservation areas, listed buildings, and design-sensitive sites demand more rigorous analysis. We provide it — in 5 working days."
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

      {/* Intro */}
      <section className="py-fl-section px-fl-margin bg-thistle-white">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-fl-8 items-center">
            <div>
              <Reveal>
                <p className="text-xs uppercase tracking-[0.2em] text-thistle-black/40 font-semibold mb-fl-5">Our Approach</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black mb-fl-5">
                  Premium projects require premium analysis.
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="text-sm text-thistle-black/60 leading-relaxed mb-fl-4">
                  High-end residential development involves layers of complexity that standard feasibility tools miss. Heritage constraints, townscape sensitivities, and the need to position units correctly in a premium market all require a more considered approach.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-sm text-thistle-black/60 leading-relaxed">
                  We combine the rigour of automated data analysis with architect-led design thinking — so you get a feasibility that doesn't just tell you whether planning is achievable, but whether the scheme will actually work commercially and spatially.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop"
                  alt="High-end residential interior"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-fl-section-sm px-fl-margin bg-thistle-white border-y border-thistle-black/[0.06]">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-fl-6">
            {stats.map((stat, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="flex flex-col">
                  <span className="text-fluid-h2 font-medium tracking-tight text-thistle-black leading-none mb-2">{stat.value}</span>
                  <span className="text-sm text-thistle-black/50 font-normal">{stat.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-fl-section px-fl-margin bg-thistle-black text-white">
        <div className="max-w-[1360px] mx-auto">
          <div className="mb-fl-8">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.2em] text-white/30 font-semibold mb-fl-5">What Makes Us Different</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight">
                Designed for design-sensitive sites.
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-fl-4">
            {approach.map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/[0.05] border border-white/[0.10] rounded-xl p-fl-6 hover:border-thistle-pink/30 hover:bg-white/[0.07] transition-colors duration-500"
                >
                  <div className="flex items-center gap-3 mb-fl-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-thistle-pink flex-shrink-0" />
                    <h3 className="text-fluid-h6 font-medium tracking-tight">{item.title}</h3>
                  </div>
                  <p className="text-sm text-white/55 leading-relaxed pl-[18px]">{item.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What We Assess */}
      <section className="py-fl-section px-fl-margin bg-thistle-white">
        <div className="max-w-[1360px] mx-auto">
          <div className="mb-fl-8">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.2em] text-thistle-black/40 font-semibold mb-fl-5">Our Analysis</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black">
                Every angle covered.
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-thistle-black/[0.06] rounded-2xl overflow-hidden">
            {whatWeAssess.map((item, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <motion.div
                  whileHover={{ backgroundColor: 'rgba(9,9,11,0.03)' }}
                  transition={{ duration: 0.2 }}
                  className="bg-thistle-white p-fl-6 flex flex-col gap-fl-3 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-thistle-green flex-shrink-0" />
                    <span className="text-fluid-h6 font-medium text-thistle-black tracking-tight">{item.label}</span>
                  </div>
                  <p className="text-sm text-thistle-black/50 leading-relaxed pl-[18px] group-hover:text-thistle-black/70 transition-colors duration-300">
                    {item.detail}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* CTA */}
      <section className="py-fl-section-sm px-fl-margin bg-thistle-black text-white">
        <div className="max-w-[1360px] mx-auto text-center">
          <Reveal>
            <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight mb-fl-5">
              Start your residential feasibility.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-sm text-white/50 leading-relaxed max-w-md mx-auto mb-fl-6">
              Submit your property and receive a full feasibility report with architectural sketch schemes in 5 working days.
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
