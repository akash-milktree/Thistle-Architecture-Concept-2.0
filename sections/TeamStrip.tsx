"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../components/animations/Reveal';

const team = [
  { name: "Edward Kercher", role: "Founder & Director", image: "/images/team/ed.jpg" },
  { name: "Kaan", role: "Design Lead", image: "/images/team/kaan.jpg" },
  { name: "Jan", role: "Interior Designer", image: "/images/team/jan.jpg" },
  { name: "Onaiza", role: "Client Support", image: "/images/team/onaiza.jpg" },
];

// Compact team introduction on the homepage, linking to the About page.
export const TeamStrip: React.FC = () => (
  <section className="bg-thistle-white py-fl-section px-fl-margin">
    <div className="max-w-[1360px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-fl-8 items-center">
        <Reveal>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-4">The Team</p>
            <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black mb-fl-5">
              Architects Who<br /><span className="text-thistle-green">Develop Buildings Too.</span>
            </h2>
            <p className="text-fluid-base text-thistle-black/80 leading-relaxed mb-fl-5 max-w-md">
              A small team with skin in the game. The people who test your building's feasibility are the same people who design it, and they invest in the same kinds of schemes themselves.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-thistle-green hover:text-thistle-black transition-colors"
            >
              Meet the whole team
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-fl-4">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={0.1 + i * 0.06}>
              <div className="rounded-2xl overflow-hidden bg-white border border-thistle-black/[0.06]">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={member.image}
                    alt={`${member.name}, ${member.role} at Thistle Architecture`}
                    fill
                    sizes="(max-width: 1024px) 45vw, 300px"
                    className="object-cover"
                  />
                </div>
                <div className="px-fl-4 py-fl-3">
                  <span className="block text-sm font-medium text-thistle-black leading-tight">{member.name}</span>
                  <span className="block text-[10px] uppercase tracking-wider text-thistle-green font-semibold mt-0.5">{member.role}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);
