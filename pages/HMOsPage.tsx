import React from 'react';
import { PageHero } from '../components/ui/PageHero';
import { Reveal } from '../components/animations/Reveal';
import { Button } from '../components/ui/Button';
import { useFeasibility } from '../components/feasibility/FeasibilityContext';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Testimonials } from '../sections/Testimonials';
import { FAQ } from '../sections/FAQ';

const considerations = [
  {
    title: "HMO licensing thresholds",
    desc: "Mandatory licensing applies to HMOs with 5+ occupants forming 2+ households. We check licensing requirements for the specific local authority and property type.",
  },
  {
    title: "Article 4 & density saturation",
    desc: "Many councils have Article 4 Directions removing permitted development rights for HMO conversion. We map local saturation levels and authority-specific policy stances.",
  },
  {
    title: "Room size & amenity standards",
    desc: "Local authority minimum room sizes, amenity space ratios, and kitchen/bathroom provision requirements vary significantly. We check your building against every relevant standard.",
  },
  {
    title: "Planning consent route",
    desc: "Sui generis HMOs (7+ occupants) require full planning consent. Smaller HMOs may fall within permitted development — we identify the correct route and any restrictions.",
  },
];

const whatWeDeliver = [
  { label: "Licensing assessment", detail: "Mandatory and additional HMO licensing requirements for the specific local authority, including fee estimates and timescales." },
  { label: "Density & saturation mapping", detail: "Local HMO concentration mapped against council thresholds to flag potential policy objections before you commit." },
  { label: "Room schedule", detail: "Optimised room layout showing maximum viable room count with compliant sizes, shared facilities, and circulation." },
  { label: "Planning route analysis", detail: "Permitted development eligibility, Article 4 exposure, and full planning requirements assessed in full." },
  { label: "Financial modelling", detail: "Gross rental income projections, yield analysis, and return on cost modelling against refurbishment and licensing costs." },
  { label: "Risk register", detail: "Key risks — policy, structural, licensing, and commercial — with probability ratings and recommended mitigations." },
];

const stats = [
  { value: "200+", label: "HMO feasibilities completed" },
  { value: "7+", label: "Years specialist experience" },
  { value: "5", label: "Working days to report" },
  { value: "£120M+", label: "GDV assessed" },
];

export const HMOsPage: React.FC = () => {
  const { openModal } = useFeasibility();

  return (
    <>
      <PageHero
        label="HMOs"
        heading="HMO feasibility that handles the complexity."
        description="Licensing, density, planning policy, and room standards — we check every variable so you know exactly what you're taking on before you buy."
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
                <p className="text-xs uppercase tracking-[0.2em] text-thistle-black/40 font-semibold mb-fl-5">Why HMOs Are Different</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black mb-fl-5">
                  More variables. More risk if you get it wrong.
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="text-sm text-thistle-black/60 leading-relaxed mb-fl-4">
                  HMO development involves a web of overlapping regulations — national planning policy, local Article 4 Directions, mandatory and additional licensing regimes, and minimum room standards that differ borough by borough.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-sm text-thistle-black/60 leading-relaxed">
                  Developers who skip a thorough feasibility often discover late in the process that the room count isn't licensable, the council won't support the density, or the rooms don't meet minimum size standards. We surface all of this upfront.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1600&auto=format&fit=crop"
                  alt="HMO interior"
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

      {/* Key Considerations */}
      <section className="py-fl-section px-fl-margin bg-thistle-black text-white">
        <div className="max-w-[1360px] mx-auto">
          <div className="mb-fl-8">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.2em] text-white/30 font-semibold mb-fl-5">Key Considerations</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight">
                What trips up HMO developers.
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-fl-4">
            {considerations.map((item, i) => (
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

      {/* What We Deliver */}
      <section className="py-fl-section px-fl-margin bg-thistle-white">
        <div className="max-w-[1360px] mx-auto">
          <div className="mb-fl-8">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.2em] text-thistle-black/40 font-semibold mb-fl-5">Our Analysis</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black">
                What's in your HMO feasibility.
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-thistle-black/[0.06] rounded-2xl overflow-hidden">
            {whatWeDeliver.map((item, i) => (
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
              Assess your HMO opportunity.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-sm text-white/50 leading-relaxed max-w-md mx-auto mb-fl-6">
              Submit your property details and get a complete HMO feasibility report in 5 working days.
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
