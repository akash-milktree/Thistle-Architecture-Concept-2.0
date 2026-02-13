import React from 'react';
import { PageHero } from '../components/ui/PageHero';
import { Reveal } from '../components/animations/Reveal';
import { Button } from '../components/ui/Button';
import { useFeasibility } from '../components/feasibility/FeasibilityContext';
import { ArrowUpRight } from 'lucide-react';
import { Team } from '../sections/Team';
import { Testimonials } from '../sections/Testimonials';
import { ImageMarquee } from '../components/ui/ImageMarquee';

const stats = [
  { value: "7+", label: "Years experience" },
  { value: "200+", label: "Buildings assessed" },
  { value: "5", label: "Day turnaround" },
  { value: "98%", label: "Client retention" },
];

export const AboutPage: React.FC = () => {
  const { openModal } = useFeasibility();

  return (
    <>
      <PageHero
        label="About"
        heading="Commercial conversion specialists."
        description="We focus exclusively on existing commercial buildings — turning planning constraints into viable residential schemes through data-driven feasibility studies."
      />

      {/* Our Story */}
      <section className="py-fl-section px-fl-margin bg-thistle-white">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-fl-8 items-start">
            <div>
              <Reveal>
                <p className="text-xs uppercase tracking-[0.2em] text-thistle-black/40 font-semibold mb-fl-5">Our Approach</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black mb-fl-5">
                  Architecture meets commercial logic.
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="text-sm text-thistle-black/50 leading-relaxed mb-fl-5">
                  Traditional architecture practices treat feasibility as an afterthought — a quick sketch done before the 'real' design work begins. We treat it as the product. Because for developers, the feasibility stage is where the most important decisions are made.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-sm text-thistle-black/50 leading-relaxed">
                  Our approach combines automated data gathering with architect-led spatial analysis. The automation handles the research — planning policy, flood risk, daylight, services — while our architects solve the problems that software can't: complex layouts, structural constraints, and the nuances of building regulation compliance.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop"
                  alt="Architectural detail"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Image Marquee */}
      <Reveal width="100%">
        <ImageMarquee />
      </Reveal>

      {/* Stats */}
      <section className="py-fl-section px-fl-margin bg-thistle-white">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-fl-6 border-t border-thistle-black/10 pt-10">
            {stats.map((stat, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="flex flex-col">
                  <span className="text-fluid-h2 font-medium tracking-tight text-thistle-black leading-none mb-fl-2">{stat.value}</span>
                  <span className="text-sm text-thistle-black/40 font-normal">{stat.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Team />
      <Testimonials />

      {/* CTA Band */}
      <section className="py-fl-section-sm px-fl-margin bg-thistle-black text-white">
        <div className="max-w-[1360px] mx-auto text-center">
          <Reveal>
            <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight mb-fl-5">
              Work with us.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-sm text-white/50 leading-relaxed max-w-md mx-auto mb-fl-6">
              Submit your building and we'll tell you what's possible — in 5 days, for a fixed fee.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Button variant="glass" size="lg" icon={<ArrowUpRight size={18} />} onClick={openModal} className="!bg-thistle-green !text-thistle-black !border-thistle-green hover:!bg-thistle-green/80 hover:!border-thistle-green/80">
              Start Feasibility
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
};
