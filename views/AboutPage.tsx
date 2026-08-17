"use client";

import React from 'react';
import Image from 'next/image';
import { PageHero } from '../components/ui/PageHero';
import { Reveal } from '../components/animations/Reveal';
import { motion } from 'framer-motion';

// Roster matched to the photos in the client's "03 New Website/Team Photos"
// folder (Akash, 2026-07-16). Onaiza was removed: no photo in the new folder and
// not on the client's live site. Seyma's folder is empty, so she cannot be added
// until a photo arrives.
//
// role and credentials are optional ON PURPOSE. No document anywhere gives job
// titles for Adouj or Beverley, and design.md forbids inventing team
// credentials, so their cards show name and photo until Ed confirms the titles.
interface TeamMember {
  name: string;
  role?: string;
  image: string;
  credentials?: string[];
}

const team: TeamMember[] = [
  {
    name: "Edward Kercher",
    role: "Founder & Director",
    image: "/images/team/ed.jpg",
    credentials: [
      "BA (Hons) Architectural Technology, CIAT Affiliate",
      "Founder across the Thistle Group: Thistle Architecture, HMO Designers, HMO Checker",
      "Experience from £50,000 refurbs to £20m construction management",
    ],
  },
  {
    name: "Kaan",
    role: "Design Lead",
    image: "/images/team/kaan.jpg",
    credentials: [
      "BArch in Architecture",
      "Leads every feasibility from sketch scheme to sign-off",
      "5+ years across residential and HMO, from deal sourcing to planning",
    ],
  },
  {
    name: "Jan",
    role: "Interior Designer",
    image: "/images/team/jan.jpg",
    credentials: [
      "HND Design, Associate CIPD",
      "25 years across interior design, graphic design, and brand management",
      "Ensures every scheme is finished to a demanding standard",
    ],
  },
  {
    name: "Adouj Abu Saadeh",
    image: "/images/team/adouj.jpg",
  },
  {
    name: "Beverley Gibbs",
    image: "/images/team/beverley.jpg",
  },
];

const stats = [
  { value: "98.5%", label: "Planning success rate" },
  { value: "5 days", label: "Guaranteed turnaround" },
  { value: "86%", label: "Faster than traditional routes" },
];

export const AboutPage: React.FC = () => {
  return (
    <>
      <PageHero
        label="About"
        heading="A Feasibility-First Architectural Practice."
        description="We analyse the data, so the answer is accurate and the wait is short. We work with developers and high-end residential clients on retrofit, conversion, and the reuse of existing buildings."
      />

      {/* Who we are */}
      <section className="py-fl-section px-fl-margin bg-white">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-fl-8 items-center">
          <Reveal>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-thistle-black/[0.06]">
              <Image
                src="/images/projects/beauchamp2/stripout-1.jpg"
                alt="Beauchamp House stripped back to brick and joists during conversion"
                fill
                sizes="(max-width: 1024px) 90vw, 620px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-4">Who We Are</p>
              <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black mb-fl-5">
                We Buy, Convert, And<br /><span className="text-thistle-green">Invest In Buildings Too.</span>
              </h2>
              <p className="text-fluid-base text-thistle-black/80 leading-relaxed mb-fl-4">
                Thistle Architecture is part of the Thistle Group, alongside HMO Designers and HMO Checker. Between them, the team has designed hundreds of conversions and invests in the same kinds of buildings our clients buy.
              </p>
              <p className="text-fluid-base text-thistle-black/80 leading-relaxed">
                That changes how we work. Every scheme starts with the numbers, the planning policy, and the building, so you know whether a deal stacks up before you commit. The same person who runs your feasibility is the architect you keep working with through to planning.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats row */}
      <section className="py-fl-section-sm px-fl-margin bg-thistle-black text-white">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {stats.map((stat, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className={`flex flex-col items-center text-center px-fl-5 py-fl-3 ${i > 0 ? 'md:border-l md:border-white/[0.1]' : ''}`}>
                  <span className="text-fluid-h3 font-semibold tracking-tight text-white block mb-1">{stat.value}</span>
                  <span className="text-sm text-white/70">{stat.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-fl-section px-fl-margin bg-thistle-white">
        <div className="max-w-[1360px] mx-auto">
          <div className="text-center mb-fl-8 max-w-2xl mx-auto">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-4">The Team</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black">
                The People Behind<br /><span className="text-thistle-green">Every Feasibility.</span>
              </h2>
            </Reveal>
          </div>

          {/* 3 columns, not 4: the roster is 5 and a 4-col grid strands the last
              card alone on its own row. 3 gives 3+2, and 3+3 if Seyma joins. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-fl-5 items-stretch">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.08} fullHeight>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="h-full rounded-2xl overflow-hidden bg-white border border-thistle-black/[0.06] hover:border-thistle-black/[0.12] hover:shadow-xl hover:shadow-thistle-black/[0.04] transition-all duration-500"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-thistle-white/60">
                    <Image
                      src={member.image}
                      alt={member.role ? `${member.name}, ${member.role} at Thistle Architecture` : `${member.name} at Thistle Architecture`}
                      fill
                      sizes="(max-width: 640px) 90vw, 320px"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-fl-5">
                    <h3 className="text-fluid-h5 font-medium tracking-tight text-thistle-black">{member.name}</h3>
                    {member.role && (
                      <p className="text-[11px] uppercase tracking-wider text-thistle-green font-semibold mt-fl-1 mb-fl-3">{member.role}</p>
                    )}
                    <ul className="space-y-1.5">
                      {(member.credentials ?? []).map((c, j) => (
                        <li key={j} className="text-fluid-sm text-thistle-black/60 leading-snug flex gap-2">
                          <span className="text-thistle-green mt-[3px] flex-shrink-0">·</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Approach statement */}
      <section className="py-fl-section px-fl-margin bg-white">
        <div className="max-w-[800px] mx-auto text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-4">How We Work</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black mb-fl-5">
              Data First, Then Drawings.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-fluid-base text-thistle-black/80 leading-relaxed">
              Most architects design first and worry about viability later. We do it the other way round. We analyse the data first, which makes the answer more accurate and cuts the time it takes to get it. The team that runs your feasibility stays with you through sketch scheme, planning, and delivery, so nothing is lost in handover.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
};
