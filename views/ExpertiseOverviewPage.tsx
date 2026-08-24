"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '../components/ui/PageHero';
import { Reveal } from '../components/animations/Reveal';
import { conversions } from '../data/conversionsData';

// Ed's August 2026 final brief, section 06: "If the parent navigation item is
// retained, make it a simple Expertise overview rather than effectively
// dropping users straight into Commercial-to-Residential." This is that
// overview: a card per sector, driven entirely by conversionsData so a new
// sector (like Co-Living & Large HMO) appears here automatically.
export const ExpertiseOverviewPage: React.FC = () => (
  <>
    <PageHero
      label="Expertise"
      heading="Feasibility, By Sector."
      description="The same feasibility-first approach, applied to the risks and planning routes specific to each type of scheme."
    />

    <section className="px-fl-margin py-fl-section bg-thistle-white">
      <div className="max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-fl-5">
        {conversions.map((c, i) => (
          <Reveal key={c.slug} delay={Math.min(i * 0.06, 0.3)} fullHeight>
            <Link href={`/conversions/${c.slug}`} className="block h-full group">
              <div className="h-full flex flex-col rounded-2xl border border-thistle-black/[0.06] bg-white p-fl-7 transition-colors duration-300 group-hover:border-thistle-green/30">
                <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-3">{c.label}</p>
                <h2 className="text-fluid-h4 font-medium tracking-tight leading-tight text-thistle-black mb-fl-3">
                  {c.heroHeading}
                </h2>
                <p className="text-fluid-sm text-thistle-black/60 leading-relaxed flex-1 mb-fl-5">
                  {c.heroDescription}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-thistle-black group-hover:text-thistle-green transition-colors">
                  Explore {c.label}
                  <ArrowUpRight size={15} />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  </>
);
