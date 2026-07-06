"use client";

import React from 'react';
import Image from 'next/image';
import { Reveal } from '../components/animations/Reveal';

// Developer / client logos — sourced from hmochecker.co.uk, shared partner set.
const developers = [
  { name: "Property & Poppadoms", src: "/logos/developers/poppadoms.jpeg" },
  { name: "HMO Academy", src: "/logos/developers/academy.png" },
  { name: "Brentor Group", src: "/logos/developers/brentor-group.jpeg" },
  { name: "Frame 4", src: "/logos/developers/frame-4.png" },
  { name: "DNB Homes", src: "/logos/developers/dnb-homes.webp" },
];

// Quiet trust strip directly under the hero. No card tiles, no divider;
// it reads as a footnote to the hero rather than a section of its own.
export const DeveloperLogos: React.FC = () => {
  return (
    <section className="bg-white py-fl-6 px-fl-margin">
      <div className="max-w-[1360px] mx-auto">
        <Reveal>
          <div className="flex flex-col lg:flex-row items-center gap-fl-5 lg:gap-fl-7">
            <p className="text-[11px] uppercase tracking-[0.25em] text-thistle-black/45 font-semibold whitespace-nowrap">
              Trusted by developers across the UK
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-between gap-fl-6 flex-1">
              {developers.map((d, i) => (
                <Image
                  key={i}
                  src={d.src}
                  alt={d.name}
                  width={140}
                  height={48}
                  unoptimized
                  className="h-10 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
