"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../../components/animations/Reveal';
import { caseStudies } from '../../data/caseStudiesData';

interface RelatedCaseStudyProps {
  tinted?: boolean;
  slug?: string;
  /**
   * The two lines above the card are the same on all five sector pages, so
   * they come from the Expertise Overview document rather than from each
   * sector's record. Which project is featured stays in code: it selects a
   * record rather than saying anything.
   */
  eyebrow?: string;
  heading?: string;
  tina?: Partial<Record<'eyebrow' | 'heading', string>>;
}

const EYEBROW_FALLBACK = 'A Real Project';
const HEADING_FALLBACK = 'We Have Done This Before.';

// A single case-study feature card looked up by slug. Returns null when the
// slug is missing or does not match any case so the page degrades cleanly.
export const RelatedCaseStudy: React.FC<RelatedCaseStudyProps> = ({
  slug,
  tinted = true,
  eyebrow = EYEBROW_FALLBACK,
  heading = HEADING_FALLBACK,
  tina,
}) => {
  if (!slug) return null;
  const item = caseStudies.find((c) => c.slug === slug);
  if (!item) return null;

  return (
    <section className={`${tinted ? 'bg-thistle-white' : 'bg-white'} py-fl-section px-fl-margin`}>
      <div className="max-w-[1360px] mx-auto">
        <div className="text-center mb-fl-8 max-w-2xl mx-auto">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-4" data-tina-field={tina?.eyebrow}>{eyebrow}</p>
          </Reveal>
          <Reveal delay={0.1}>
            {/* The card below carries no markers: everything in it is the case
                study's own record, which this page does not load. */}
            <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black" data-tina-field={tina?.heading}>
              {heading}
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <Link href={`/case-studies/${item.slug}`} className="block">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden bg-white border border-thistle-black/[0.06] hover:border-thistle-black/[0.12] hover:shadow-xl hover:shadow-thistle-black/[0.04] transition-all duration-500"
            >
              <div className="aspect-[4/3] lg:aspect-auto overflow-hidden relative">
                {/* This was a plain <img>, the only one left on the site. It
                    served the source file untouched, so a card sitting on four
                    conversion pages was shipping multi-megabyte PNGs: the St
                    John's sketch alone is 4.7MB raw against 56KB as the WebP
                    next/image serves at the same display size. */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 680px"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-xl border border-white/10 text-[10px] uppercase tracking-widest text-white/80 font-medium">
                    {item.tag}
                  </span>
                </div>
              </div>
              <div className="p-fl-7 flex flex-col justify-center">
                <h3 className="text-fluid-h3 font-medium tracking-tight text-thistle-black mb-fl-2">{item.title}</h3>
                <p className="text-fluid-sm text-thistle-black/50 uppercase tracking-wider mb-fl-5">{item.location}</p>
                <p className="text-fluid-base text-thistle-black/80 leading-relaxed mb-fl-5">{item.desc}</p>
                <span className="inline-flex items-center gap-2 text-fluid-sm text-thistle-black font-medium">
                  Read the full case study <ArrowUpRight size={16} />
                </span>
              </div>
            </motion.div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
};
