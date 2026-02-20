import React from 'react';
import { PageHero } from '../components/ui/PageHero';
import { Reveal } from '../components/animations/Reveal';
import { Button } from '../components/ui/Button';
import { useFeasibility } from '../components/feasibility/FeasibilityContext';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Testimonials } from '../sections/Testimonials';
import { FAQ } from '../sections/FAQ';

const routes = [
  {
    title: "Class MA",
    desc: "Commercial, business and service uses to residential. The primary route for offices, retail, and mixed-use buildings under 1,500m².",
  },
  {
    title: "Class O",
    desc: "Office to residential under the older permitted development rights. Still applicable in certain local authority areas and legacy consent cases.",
  },
  {
    title: "Full Planning",
    desc: "Where permitted development isn't available or viable — we identify the strongest full planning strategy and the constraints that must be addressed.",
  },
  {
    title: "Change of Use",
    desc: "Retail, leisure, and light industrial buildings often require a change of use application. We assess viability and map the most efficient consent route.",
  },
];

const whatWeAnalyse = [
  { label: "Class MA & Article 4 exposure", detail: "We check whether the building falls within an Article 4 Direction that removes PD rights, saving you from pursuing a dead end." },
  { label: "Planning history", detail: "Prior application outcomes, appeal decisions, and local authority stance on conversion in that specific location." },
  { label: "Structural suitability", detail: "Floor-to-ceiling heights, structural grid, and building fabric assessed against residential space standards." },
  { label: "Unit mix optimisation", detail: "We model the optimal mix of studio, 1-bed, and 2-bed units to maximise GDV within space standard constraints." },
  { label: "Financial viability", detail: "GDV, build cost benchmarks, and margin analysis so you know whether the numbers work before you commit." },
  { label: "Infrastructure & services", detail: "Drainage, ventilation, and MEP considerations that frequently derail conversions late in the process." },
];

const stats = [
  { value: "200+", label: "Conversion feasibilities completed" },
  { value: "£120M+", label: "GDV assessed" },
  { value: "5", label: "Working days to report" },
  { value: "7+", label: "Years specialist experience" },
];

export const CommercialConversionsPage: React.FC = () => {
  const { openModal } = useFeasibility();

  return (
    <>
      <PageHero
        label="Commercial Conversions"
        heading="Turn commercial buildings into viable residential schemes."
        description="Office blocks, retail units, mixed-use — we assess every conversion route and tell you exactly what's achievable before you exchange."
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
                <p className="text-xs uppercase tracking-[0.2em] text-thistle-black/40 font-semibold mb-fl-5">The Opportunity</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black mb-fl-5">
                  The most complex conversions demand the sharpest analysis.
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="text-sm text-thistle-black/60 leading-relaxed mb-fl-4">
                  Commercial-to-residential conversions offer some of the best margins in residential development — but they carry planning, structural, and financial risks that catch underprepared developers out.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-sm text-thistle-black/60 leading-relaxed">
                  Our feasibility process is built specifically for conversion projects. We combine automated constraints analysis with architect-led spatial review to give you a clear, evidence-based Go/No-Go in 5 working days.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop"
                  alt="Commercial building exterior"
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

      {/* Consent Routes */}
      <section className="py-fl-section px-fl-margin bg-thistle-black text-white">
        <div className="max-w-[1360px] mx-auto">
          <div className="mb-fl-8">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.2em] text-white/30 font-semibold mb-fl-5">Consent Routes</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight">
                We know every route to consent.
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-fl-4">
            {routes.map((route, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/[0.05] border border-white/[0.10] rounded-xl p-fl-6 hover:border-thistle-green/30 hover:bg-white/[0.07] transition-colors duration-500"
                >
                  <div className="flex items-center gap-3 mb-fl-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-thistle-green flex-shrink-0" />
                    <h3 className="text-fluid-h6 font-medium tracking-tight">{route.title}</h3>
                  </div>
                  <p className="text-sm text-white/55 leading-relaxed pl-[18px]">{route.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What We Analyse */}
      <section className="py-fl-section px-fl-margin bg-thistle-white">
        <div className="max-w-[1360px] mx-auto">
          <div className="mb-fl-8">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.2em] text-thistle-black/40 font-semibold mb-fl-5">Our Analysis</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black">
                What we assess on every conversion.
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-thistle-black/[0.06] rounded-2xl overflow-hidden">
            {whatWeAnalyse.map((item, i) => (
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
              Ready to assess your building?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-sm text-white/50 leading-relaxed max-w-md mx-auto mb-fl-6">
              Submit your property and get a structured feasibility report with a clear Go/No-Go in 5 working days.
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
