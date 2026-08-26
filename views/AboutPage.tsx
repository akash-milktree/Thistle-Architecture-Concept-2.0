"use client";

import React from 'react';
import Image from 'next/image';
import { PageHero } from '../components/ui/PageHero';
import { Testimonials } from '../sections/Testimonials';
import { Reveal } from '../components/animations/Reveal';
import { motion } from 'framer-motion';

// Roster of six. Seyma joined on 2026-08-26: her caption had been ready for
// weeks and the only thing missing was a photograph, which the August studio
// shoot supplied. Onaiza is still off the page, with no photo and no presence
// on the client's live site.
//
// role and credentials are optional ON PURPOSE. No document anywhere gives job
// titles for Adouj or Beverley, and design.md forbids inventing team
// credentials, so their cards show name and photo until Ed confirms the titles.
//
// `contribution` replaces the old CV-style bullet lists, per Ed's August 2026
// final brief: "Rewrite profiles around what each person contributes to
// projects rather than CV-style bullet lists." One factual credential line is
// kept underneath where it exists, since dropping it entirely would be losing
// real, confirmed information for the sake of a format change.
interface TeamMember {
  name: string;
  role?: string;
  image: string;
  contribution?: string;
  credential?: string;
}

// Real photographs from the studio shoot on 23 August 2026, using the posed
// headshot set rather than the candid working shots: everyone faces the camera
// against the same background, so the six cards read as one set. They replaced
// AI-generated headshots, which were a likeness rather than a photograph and
// had put everyone in a suit instead of what they were actually wearing.
//
// Beverley is the exception. Only five people were photographed, so her card
// uses the photo she supplied. It is real but a plain snapshot rather than part
// of the set, and she should be included next time the photographer is in.
//
// The old AI set is still in public/images/team-review/ with the internal
// /team-review page, which compared the three options.
const team: TeamMember[] = [
  {
    name: "Edward Kercher",
    role: "Founder & Director",
    image: "/images/team/ed.jpg",
    contribution: "Sets the commercial and technical standard every feasibility is judged against, from £50,000 refurbishments to £20m construction management. Founded the Thistle Group, so the developer's perspective is built into how the practice works, not bolted on afterwards.",
    credential: "BA (Hons) Architectural Technology, CIAT Affiliate",
  },
  {
    name: "Kaan",
    role: "Design & Planning Lead",
    image: "/images/team/kaan.jpg",
    contribution: "Runs every feasibility from sketch scheme to sign-off, and is the architect most clients work with through planning. Five-plus years across residential and HMO projects, from deal sourcing through to submission.",
    credential: "BArch in Architecture",
  },
  {
    name: "Jan",
    role: "Interior Designer",
    image: "/images/team/jan.jpg",
    contribution: "Makes sure every scheme is finished to a demanding standard once the architecture is settled, drawing on 25 years across interior design, graphic design, and brand management.",
    credential: "HND Design, Associate CIPD",
  },
  {
    name: "Adouj Abu Saadeh",
    role: "Architectural Designer",
    image: "/images/team/adouj.jpg",
    contribution: "Brings international practice experience in Turkey, Azerbaijan, and the UAE to the design team, since moving to the UK.",
    credential: "BA Architecture, Bilkent University (High Honours, 2019); LEED Green Associate",
  },
  {
    // Caption supplied by Ed on WhatsApp; photo from the August 2026 studio
    // shoot, which is what had been blocking her going on the page.
    name: "Seyma",
    role: "Architectural Designer",
    image: "/images/team/seyma.jpg",
    contribution: "Takes projects from the first survey through design and into the planning and technical stages. Six-plus years across residential and HMO work, commercial surveying, design and planning in the UK.",
    credential: "BSc Architecture, MA Interior Design",
  },
  {
    name: "Beverley Gibbs",
    role: "Practice Manager",
    image: "/images/team/beverley.jpg",
    contribution: "Looks after the finance and admin that keeps every project on track behind the scenes, with over 20 years of practice and studio management experience.",
    credential: "BA (Hons)",
  },
];

// Ed's August 2026 final brief: "Keep '86% faster' only if the calculation is
// defensible; otherwise replace it with a factual proof point such as '500+
// conversions designed and built'." It's flagged unconfirmed in
// docs/case-study-confirmations.md and docs/dns-migration.md, so it's
// replaced here with the phrasing Ed used himself for the same kind of claim
// elsewhere in this brief (section 03), which doesn't depend on an unverified
// exact number.
const stats = [
  { value: "98.5%", label: "Planning success rate" },
  { value: "5 days", label: "Guaranteed turnaround" },
  { value: "Hundreds", label: "Of conversions designed nationwide" },
];

// The five themes from Ed's August 2026 final brief, section 07: "Core
// themes: Feasibility First; Existing Buildings & Retrofit; Data-Informed
// Decisions; Developer-Led / Commercially Aware Design; One Team Through
// Delivery."
const themes = [
  { title: "Feasibility First", body: "Every project starts with the same question: does this actually work? We answer it with a fixed-fee feasibility before a single line is drawn." },
  { title: "Existing Buildings & Retrofit", body: "Most of what we do is testing and reusing what's already there, not building on a clean slate." },
  { title: "Data-Informed Decisions", body: "Planning history, policy, comparables and viability, checked before judgement is applied, not instead of it." },
  { title: "Developer-Led, Commercially Aware Design", body: "We design with the numbers in view throughout, not as a check at the end." },
  { title: "One Team Through Delivery", body: "The person who runs your feasibility is the architect you keep working with through planning and delivery." },
];

export const AboutPage: React.FC = () => {
  return (
    <>
      <PageHero
        label="About"
        heading="A Feasibility-First Architectural Practice."
        description="We analyse the data, so the answer is accurate and the wait is short. We work with developers and high-end residential clients on retrofit, conversion, and the reuse of existing buildings."
      />

      {/* Who we are / how we work. Ed's August 2026 final brief: "Make the
          page about Thistle Architecture as a practice, not primarily about
          the fact that the team buys and invests in buildings." The old
          headline led with "We Buy, Convert, And Invest In Buildings Too.";
          direct development experience is now supporting credibility in the
          closing paragraph, not the practice's main definition. */}
      <section className="py-fl-section px-fl-margin bg-white">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-fl-8 items-center mb-fl-8">
          <Reveal>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-thistle-black/[0.06]">
              {/* The practice, not a building. This section is "Who We Are", and
                  it ran on a strip-out shot of Beauchamp House, which says more
                  about the work than the people doing it. From the August 2026
                  studio shoot. */}
              <Image
                src="/images/site/team-at-work.jpg"
                alt="The Thistle Architecture team working together in the studio, reviewing plans on laptops and tablets"
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
                An Architecture Practice,<br /><span className="text-thistle-green">Built Around Feasibility.</span>
              </h2>
              <p className="text-fluid-base text-thistle-black/80 leading-relaxed mb-fl-4">
                Thistle Architecture tests whether a building can become something more valuable, then designs and delivers the answer. Every scheme starts with the numbers, the planning policy, and the existing structure, so you know whether a deal stacks up before you commit to it.
              </p>
              <p className="text-fluid-base text-thistle-black/80 leading-relaxed">
                Thistle Architecture is part of the Thistle Group, alongside HMO Designers and HMO Checker. Some of the team also develop and invest in the same kinds of buildings our clients buy, which sharpens the advice, but it supports the architecture, it doesn't replace it.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="max-w-[1360px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-fl-4">
          {themes.map((theme, i) => (
            <Reveal key={theme.title} delay={0.15 + Math.min(i * 0.05, 0.2)} fullHeight>
              <div className="h-full rounded-2xl bg-thistle-white/70 border border-thistle-black/[0.06] p-fl-5">
                <h3 className="text-fluid-sm font-semibold tracking-tight text-thistle-black mb-fl-2">{theme.title}</h3>
                <p className="text-fluid-sm text-thistle-black/60 leading-relaxed">{theme.body}</p>
              </div>
            </Reveal>
          ))}
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

          {/* 3 columns, not 4: the roster is 6, so three gives a clean 3+3.
              A 4-col grid would strand the last two on their own row. */}
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
                    {member.contribution && (
                      <p className="text-fluid-sm text-thistle-black/70 leading-relaxed mb-fl-2">{member.contribution}</p>
                    )}
                    {member.credential && (
                      <p className="text-xs text-thistle-black/40">{member.credential}</p>
                    )}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews sit after the team, so the names in them are people the
          reader has just met. Sunny Berhane leads: it is about repeat work with
          Edward and Kaan rather than a single project, which suits a page about
          the practice. */}
      <Testimonials
        eyebrow="Client Reviews"
        heading="Judged On The Outcome."
        featuredAuthor="Sunny Berhane"
      />

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
