"use client";

import React from 'react';
import Link from 'next/link';
import { Reveal } from '../components/animations/Reveal';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { caseStudies, type CaseStudy } from '../data/caseStudiesData';

const displayCases = caseStudies.slice(0, 3);

// Mini before/after unit visualisation
const UnitComparison: React.FC<{ before: string; after: string; noGo?: boolean }> = ({ before, after, noGo }) => (
  <div className="flex items-center gap-3 text-thistle-black">
    <div className="text-right">
      <div className="text-[9px] uppercase tracking-wider text-thistle-black/40 font-semibold mb-0.5">Before</div>
      <div className="text-base font-semibold leading-none">{before}</div>
      <div className="text-[9px] text-thistle-black/40 mt-0.5">units</div>
    </div>
    <ArrowRight size={14} className="text-thistle-black/30" />
    <div>
      <div className="text-[9px] uppercase tracking-wider text-thistle-green font-semibold mb-0.5">After</div>
      <div className={`text-base font-semibold leading-none ${noGo ? 'text-thistle-black/40' : 'text-thistle-green'}`}>{after}</div>
      <div className="text-[9px] text-thistle-black/40 mt-0.5">units</div>
    </div>
  </div>
);

const CaseCard: React.FC<{ item: CaseStudy }> = ({ item }) => {
  const isNoGo = item.recommendation === "No-Go";
  return (
    <Link href={`/case-studies/${item.slug}`} className="block h-full">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-thistle-black/[0.06] hover:border-thistle-black/[0.12] hover:shadow-xl hover:shadow-thistle-black/[0.04] transition-all duration-500 h-full flex flex-col"
      >
        {/* Image */}
        <div className="aspect-[16/9] overflow-hidden relative">
          <motion.img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />

          {/* Tag badge + recommendation */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="px-3 py-1.5 rounded-full bg-black/35 backdrop-blur-xl border border-white/10 text-[10px] uppercase tracking-widest text-white/85 font-medium">
              {item.tag}
            </span>
            <span className={`px-3 py-1.5 rounded-full backdrop-blur-xl border text-[10px] uppercase tracking-widest font-semibold ${
              isNoGo
                ? 'bg-red-500/20 border-red-300/30 text-red-100'
                : 'bg-thistle-green/30 border-thistle-green/40 text-white'
            }`}>
              {item.recommendation}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-fl-5 flex flex-col flex-1">
          <h3 className="text-fluid-h5 font-medium tracking-tight mb-fl-1 text-thistle-black">{item.title}</h3>
          <p className="text-[11px] text-thistle-black/40 uppercase tracking-wider mb-fl-4">{item.location}</p>

          {/* Financial table */}
          <div className="grid grid-cols-3 gap-3 py-fl-4 border-y border-thistle-black/[0.06] mb-fl-4">
            <div>
              <div className="text-[9px] uppercase tracking-wider text-thistle-black/40 font-semibold mb-1">Purchase</div>
              <div className="text-fluid-sm font-semibold text-thistle-black">{item.purchasePrice}</div>
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-wider text-thistle-black/40 font-semibold mb-1">
                {isNoGo ? 'Risk avoided' : 'Projected GDV'}
              </div>
              <div className={`text-fluid-sm font-semibold ${isNoGo ? 'text-thistle-black' : 'text-thistle-black'}`}>
                {isNoGo ? item.riskAvoided : item.projectedGDV}
              </div>
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-wider text-thistle-green font-semibold mb-1">
                {isNoGo ? 'Outcome' : 'GDV uplift'}
              </div>
              <div className="text-fluid-sm font-semibold text-thistle-green">
                {isNoGo ? 'De-risked' : item.gdvUpliftPct}
              </div>
            </div>
          </div>

          {/* Units before/after (only if Go) */}
          {!isNoGo && (
            <div className="mb-fl-4">
              <UnitComparison before={item.unitsBefore} after={item.unitsAfter} />
            </div>
          )}

          <p className="text-fluid-base text-thistle-black/80 leading-relaxed mt-auto">
            {item.desc}
          </p>

          <div className="flex items-center justify-between mt-fl-4 pt-fl-3 border-t border-thistle-black/[0.06]">
            <span className="text-[11px] uppercase tracking-wider text-thistle-black/40 font-semibold">Read case study</span>
            <div className="w-8 h-8 rounded-full border border-thistle-black/[0.1] flex items-center justify-center group-hover:bg-thistle-black group-hover:border-thistle-black transition-colors">
              <ArrowUpRight size={14} className="text-thistle-black/60 group-hover:text-white transition-colors" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export const CaseStudies: React.FC = () => {
  return (
    <section className="py-fl-section px-fl-margin bg-thistle-white">
      <div className="max-w-[1360px] mx-auto">
        {/* Header — centered like other sections */}
        <div className="text-center mb-fl-8 max-w-2xl mx-auto">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-4">Case Studies</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-fluid-h2 font-medium tracking-tight text-thistle-black">
              Proof, <span className="text-thistle-green">Not Inspiration.</span>
            </h2>
          </Reveal>
        </div>

        {/* Case Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fl-5">
          {displayCases.map((item, i) => (
            <Reveal key={item.slug} delay={i * 0.1}>
              <CaseCard item={item} />
            </Reveal>
          ))}
        </div>

        {/* View All CTA */}
        <Reveal delay={0.4}>
          <div className="flex justify-center mt-fl-7">
            <Link href="/case-studies">
              <Button
                size="md"
                variant="primary"
                icon={<ArrowUpRight size={16} />}
              >
                View All Case Studies
              </Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
