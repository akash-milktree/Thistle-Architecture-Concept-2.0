import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/animations/Reveal';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { caseStudies } from '../data/caseStudiesData';

const displayCases = caseStudies.slice(0, 2);

export const CaseStudies: React.FC = () => {
  return (
    <section className="py-fl-section px-fl-margin bg-thistle-white">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-fl-8 gap-fl-5">
          <div>
            <Reveal>
              <p className="text-xs uppercase tracking-[0.2em] text-thistle-gray font-semibold mb-fl-5">Case Studies</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-fluid-h2 font-medium tracking-tight">
                Proof, <span className="text-thistle-black/25">not inspiration.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <Link to="/case-studies" className="text-sm text-thistle-black/40 hover:text-thistle-black transition-colors font-medium tracking-tight flex items-center gap-1 group">
              View all cases
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </Reveal>
        </div>

        {/* Case Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-fl-5">
          {displayCases.map((item, i) => (
            <Reveal key={item.slug} delay={i * 0.15}>
              <Link to={`/case-studies/${item.slug}`} className="block">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-thistle-black/[0.06] hover:border-thistle-black/[0.12] hover:shadow-xl hover:shadow-thistle-black/[0.04] transition-all duration-500"
                >
                  {/* Image */}
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                    {/* Tag badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-xl border border-white/10 text-[10px] uppercase tracking-widest text-white/80 font-medium">
                        {item.tag}
                      </span>
                    </div>

                    {/* Stats row on image */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
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

                  {/* Content */}
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
  );
};
