"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../components/animations/Reveal';

// Short practice introduction, directly under the hero and logo strip.
export const IntroBlock: React.FC = () => (
  <section className="bg-thistle-white py-fl-section-sm px-fl-margin">
    <div className="max-w-[840px] mx-auto text-center">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-4">The Practice</p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="text-fluid-h3 font-medium tracking-tight leading-tight text-thistle-black mb-fl-5">
          Retrofit Architecture, Run Like A Developer.
        </h2>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="text-fluid-base text-thistle-black/80 leading-relaxed mb-fl-4">
          Thistle is a feasibility-first architecture practice working with existing buildings across the UK. We are part of the Thistle Group, alongside HMO Designers and HMO Checker, and we develop and invest in the same kinds of buildings our clients buy.
        </p>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="text-fluid-base text-thistle-black/80 leading-relaxed mb-fl-5">
          Every project starts with the numbers and the planning position, so you know a scheme stacks up before design fees start. The same team then carries it through sketch, planning, and delivery.
        </p>
      </Reveal>
      <Reveal delay={0.25}>
        <Link
          href="/about"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-thistle-green hover:text-thistle-black transition-colors"
        >
          More about the practice
          <ArrowUpRight size={15} />
        </Link>
      </Reveal>
    </div>
  </section>
);
