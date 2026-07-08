"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../../components/animations/Reveal';

const people = [
  {
    name: "Kaan",
    role: "Design Lead",
    line: "BArch. Runs every feasibility from sketch scheme to sign-off.",
    image: "/images/team/kaan.jpg",
  },
  {
    name: "Edward Kercher",
    role: "Founder & Director",
    line: "BA (Hons) AT, CIAT Affiliate. Develops and invests in these buildings himself.",
    image: "/images/team/ed.jpg",
  },
];

// Compact trust band: the people a buyer actually deals with.
export const PackageTeam: React.FC = () => (
  <section className="bg-white py-fl-section px-fl-margin">
    <div className="max-w-[1000px] mx-auto">
      <div className="text-center mb-fl-8 max-w-2xl mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-4">The People</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black">
            Who You&apos;re Working With.
          </h2>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-fl-5">
        {people.map((person, i) => (
          <Reveal key={person.name} delay={i * 0.08}>
            <div className="h-full flex items-center gap-fl-5 rounded-2xl bg-thistle-white/70 border border-thistle-black/[0.06] p-fl-5">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-full overflow-hidden ring-2 ring-thistle-green/20">
                <Image
                  src={person.image}
                  alt={`${person.name}, ${person.role} at Thistle Architecture`}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div>
                <span className="block text-fluid-h6 font-medium tracking-tight text-thistle-black">{person.name}</span>
                <span className="block text-[10px] uppercase tracking-wider text-thistle-green font-semibold mt-0.5 mb-fl-2">{person.role}</span>
                <p className="text-fluid-sm text-thistle-black/65 leading-snug">{person.line}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <p className="text-center mt-fl-6">
          <Link href="/about" className="inline-flex items-center gap-1.5 text-sm font-medium text-thistle-green hover:text-thistle-black transition-colors">
            Meet the whole team
            <ArrowUpRight size={15} />
          </Link>
        </p>
      </Reveal>
    </div>
  </section>
);
