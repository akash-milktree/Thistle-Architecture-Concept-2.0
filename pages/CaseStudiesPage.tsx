import React from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/ui/PageHero';
import { Reveal } from '../components/animations/Reveal';
import { Button } from '../components/ui/Button';
import { useFeasibility } from '../components/feasibility/FeasibilityContext';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { caseStudies } from '../data/caseStudiesData';

export const CaseStudiesPage: React.FC = () => {
  const { openModal } = useFeasibility();

  return (
    <>
      <PageHero
        label="Case Studies"
        heading="Proof, not inspiration."
        description="Real buildings, real constraints, real results. Every case study follows the same structure: the problem, our approach, and the commercial impact."
      />

      {/* Case Study Grid */}
      <section className="py-fl-section px-fl-margin bg-thistle-white">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-fl-5">
            {caseStudies.map((item, i) => (
              <Reveal key={item.slug} delay={i * 0.1}>
                <Link to={`/case-studies/${item.slug}`}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-thistle-black/[0.06] hover:border-thistle-black/[0.12] hover:shadow-xl hover:shadow-thistle-black/[0.04] transition-all duration-500"
                  >
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <motion.img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.04 }}
                        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-xl border border-white/10 text-[10px] uppercase tracking-widest text-white/80 font-medium">
                          {item.tag}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-fl-5">
                        <div className="flex gap-fl-5">
                          {item.stats.map((stat, j) => (
                            <div key={j} className="flex flex-col">
                              <span className="text-fluid-h4 font-medium text-white tracking-tight">{stat.value}</span>
                              <span className="text-[10px] uppercase tracking-widest text-white/50 mt-0.5">{stat.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="p-fl-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-fluid-h5 font-medium tracking-tight mb-fl-1 group-hover:text-thistle-black transition-colors">{item.title}</h3>
                          <p className="text-xs text-thistle-black/40 uppercase tracking-wider mb-fl-4">{item.location}</p>
                          <p className="text-fluid-sm text-thistle-black/50 leading-relaxed max-w-md">{item.desc}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-thistle-black/10 flex items-center justify-center flex-shrink-0 ml-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                          <ArrowUpRight size={16} className="text-thistle-black/60" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-fl-section-sm px-fl-margin bg-thistle-black text-white">
        <div className="max-w-[1360px] mx-auto text-center">
          <Reveal>
            <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight mb-fl-5">
              Have a building in mind?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-fluid-sm text-white/50 leading-relaxed max-w-md mx-auto mb-fl-6">
              Submit your property details and find out if it's viable — in 5 days.
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
