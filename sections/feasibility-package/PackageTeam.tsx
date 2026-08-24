"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../../components/animations/Reveal';

// Ed's August 2026 final brief, section 03: "Make Edward and Kaan part of the
// reason to buy the architect-led service", and add Jodi as the first point of
// contact for Expert Sessions. Bios follow his wording closely.
//
// Jodi has no photo yet (About page's own note: no photo in the client's Team
// Photos folder for her), so her card uses an initials avatar rather than
// inventing or borrowing one, same discipline the About page roster follows
// for anyone whose details are not yet confirmed.
const people = [
  {
    name: "Edward Kercher",
    role: "Founder & Director",
    line: "Commercial and technical experience from £50,000 refurbs to £20m construction management. Founder of HMO Designers and HMO Checker, and a developer himself, so the advice comes from someone who has taken the risk personally.",
    image: "/images/team/ed.jpg",
    initials: "EK",
  },
  {
    name: "Kaan",
    role: "Design & Planning Lead",
    line: "BArch. Runs every feasibility from sketch scheme to sign-off, with 5+ years across residential and HMO planning, from deal sourcing through to submission.",
    image: "/images/team/kaan.jpg",
    initials: "K",
  },
  {
    name: "Jodi",
    role: "Business Development & Expert Sessions",
    line: "A property sales background and strong HMO and developer knowledge. Jodi is the first point of contact for a free Expert Session: she helps you understand the opportunity, clarify your objectives, and choose the right feasibility route.",
    initials: "J",
  },
];

// Compact trust band: the people a buyer actually deals with.
export const PackageTeam: React.FC = () => (
  <section className="bg-white py-fl-section px-fl-margin">
    <div className="max-w-[1100px] mx-auto">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-fl-5">
        {people.map((person, i) => (
          <Reveal key={person.name} delay={i * 0.08} fullHeight>
            <div className="h-full flex flex-col items-center text-center gap-fl-4 rounded-2xl bg-thistle-white/70 border border-thistle-black/[0.06] p-fl-5">
              {person.image ? (
                <div className="relative w-20 h-20 flex-shrink-0 rounded-full overflow-hidden ring-2 ring-thistle-green/20">
                  <Image
                    src={person.image}
                    alt={`${person.name}, ${person.role} at Thistle Architecture`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div
                  className="w-20 h-20 flex-shrink-0 rounded-full bg-thistle-green/10 ring-2 ring-thistle-green/20 flex items-center justify-center text-lg font-bold text-thistle-green"
                  aria-hidden="true"
                >
                  {person.initials}
                </div>
              )}
              <div>
                <span className="block text-fluid-h6 font-medium tracking-tight text-thistle-black">{person.name}</span>
                <span className="block text-[10px] uppercase tracking-wider text-thistle-green font-semibold mt-0.5 mb-fl-2">{person.role}</span>
                <p className="text-fluid-sm text-thistle-black/65 leading-snug">{person.line}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Ed's August 2026 final brief: "Use concise credibility proof such as
          hundreds of conversions designed, nationwide project experience,
          planning success and core project types." Phrased generally rather
          than borrowing HMO Designers' own project-count figures, which are a
          different business's numbers. */}
      <Reveal delay={0.15}>
        <div className="flex flex-wrap items-center justify-center gap-x-fl-6 gap-y-fl-2 mt-fl-7 text-xs text-thistle-black/50">
          <span>Hundreds of conversions designed, nationwide</span>
          <span className="hidden sm:inline text-thistle-black/20">·</span>
          <span>98.5% planning success rate</span>
          <span className="hidden sm:inline text-thistle-black/20">·</span>
          <span>Commercial, HMO, co-living and high-end residential</span>
        </div>
      </Reveal>

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
