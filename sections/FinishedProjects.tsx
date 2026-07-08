"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../components/animations/Reveal';
import { Button } from '../components/ui/Button';
import { completedProjects } from '../data/caseStudiesData';

const display = completedProjects.slice(0, 3);

// Completed work, photo-led, linking through to the Our Work hub.
export const FinishedProjects: React.FC = () => (
  <section className="bg-white py-fl-section px-fl-margin">
    <div className="max-w-[1360px] mx-auto">
      <div className="text-center mb-fl-8 max-w-2xl mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-4">Completed Projects</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black">
            Recent Work.
          </h2>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-fl-5">
        {display.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.08}>
            <Link href={`/case-studies/${project.slug}`} className="block h-full">
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="group h-full rounded-2xl overflow-hidden bg-thistle-white/70 border border-thistle-black/[0.06] hover:border-thistle-black/[0.12] hover:shadow-xl hover:shadow-thistle-black/[0.04] transition-all duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 90vw, 430px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-full bg-black/35 backdrop-blur-xl border border-white/10 text-[10px] uppercase tracking-widest text-white/85 font-medium">
                      {project.tag}
                    </span>
                  </div>
                </div>
                <div className="p-fl-5 flex items-center justify-between gap-fl-3">
                  <div>
                    <h3 className="text-fluid-h5 font-medium tracking-tight text-thistle-black">{project.title}</h3>
                    <p className="text-[11px] text-thistle-black/40 uppercase tracking-wider mt-1">{project.location}</p>
                  </div>
                  <div className="w-8 h-8 flex-shrink-0 rounded-full border border-thistle-black/[0.1] flex items-center justify-center group-hover:bg-thistle-black group-hover:border-thistle-black transition-colors">
                    <ArrowUpRight size={14} className="text-thistle-black/60 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </motion.div>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3}>
        <div className="flex justify-center mt-fl-7">
          <Link href="/case-studies?view=projects">
            <Button size="md" variant="primary" icon={<ArrowUpRight size={16} />}>
              View All Projects
            </Button>
          </Link>
        </div>
      </Reveal>
    </div>
  </section>
);
