"use client";

import React from 'react';
import Image from 'next/image';
import { Reveal } from '../components/animations/Reveal';

// Developer / client logos. The first five came from hmochecker.co.uk, the
// shared partner set. The rest were supplied by Ed on 2026-08-10.
// Each has been trimmed to its own edges so they sit on a common baseline
// rather than floating inside whatever padding the source file had.
const developers = [
  { name: "Property & Poppadoms", src: "/logos/developers/poppadoms.jpeg" },
  { name: "HMO Academy", src: "/logos/developers/academy.png" },
  { name: "Brentor Group", src: "/logos/developers/brentor-group.jpeg" },
  { name: "Frame 4", src: "/logos/developers/frame-4.png" },
  { name: "DNB Homes", src: "/logos/developers/dnb-homes.webp" },
  // Ed's list called this one Goldengate; its own logo reads Goldgate, so the
  // logo wins until he says otherwise.
  { name: "Goldgate Properties", src: "/logos/developers/goldgate.png" },
  { name: "Freedom Homes", src: "/logos/developers/freedom-homes.png" },
  { name: "Ajito Property Group", src: "/logos/developers/ajito.png" },
  { name: "Zero In Developments", src: "/logos/developers/zero-in.png" },
  { name: "Highfield Professional Solutions", src: "/logos/developers/highfield.png" },
  { name: "Black Flamingo Homes", src: "/logos/developers/black-flamingo.png" },
];

// Quiet trust strip directly under the hero. No card tiles, no divider;
// it reads as a footnote to the hero rather than a section of its own.
export const DeveloperLogos: React.FC = () => {
  return (
    <section className="bg-white py-fl-6 px-fl-margin">
      <div className="max-w-[1360px] mx-auto">
        <Reveal>
          {/* Label above rather than alongside. It used to sit to the left,
              which worked with five logos. Eleven need the full width, and
              side by side they wrapped to a second row of two stragglers. */}
          <div className="flex flex-col items-center gap-fl-5">
            <p className="text-[11px] uppercase tracking-[0.25em] text-thistle-black/45 font-semibold whitespace-nowrap">
              Trusted by developers across the UK
            </p>
            {/* Centred rather than justify-between: with eleven logos the row
                wraps, and spreading a short second row edge to edge leaves
                gaps wide enough to read as a mistake. */}
            <div className="flex flex-wrap items-center justify-center gap-x-fl-6 gap-y-fl-5 flex-1">
              {developers.map((d, i) => (
                <Image
                  key={i}
                  src={d.src}
                  alt={d.name}
                  width={140}
                  height={48}
                  unoptimized
                  // Capped on width as well as height. These come in at wildly
                  // different aspect ratios, and the widest wordmark is seven
                  // times the width of the squarest badge at a common height,
                  // which makes it read as the headline act rather than one of
                  // eleven equals.
                  className="h-10 w-auto max-w-[130px] object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
