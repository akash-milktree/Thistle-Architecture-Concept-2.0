"use client";

import React from 'react';
import Image from 'next/image';
import { Reveal } from '../components/animations/Reveal';

// Developer / client logos. The first five came from hmochecker.co.uk, the
// shared partner set; the rest were supplied by Ed on 2026-08-10.
//
// Every logo arrived with its own background baked in: dark navy, mid grey,
// black, beige, white. Left alone on one strip they read as a row of mismatched
// rectangles rather than a set. So each has been cut out to transparency and is
// placed on one of two tiles, and `tone` picks which. Marks drawn in white or
// gold only work on the dark tile; everything else goes on the light one.
//
// `key` is the identity the CMS attaches its wording to, and it matches the
// image filename. The file path and the tone stay here: the tone is a design
// decision about the artwork, not copy, and a wrong path is a missing logo.
type Tone = 'light' | 'dark';
const developers: { key: string; name: string; src: string; tone: Tone }[] = [
  { key: "poppadoms", name: "Property & Poppadoms", src: "/logos/developers/poppadoms.png", tone: 'dark' },
  { key: "academy", name: "HMO Academy", src: "/logos/developers/academy.png", tone: 'light' },
  { key: "brentor-group", name: "Brentor Group", src: "/logos/developers/brentor-group.png", tone: 'dark' },
  { key: "frame-4", name: "Frame 4", src: "/logos/developers/frame-4.png", tone: 'dark' },
  { key: "dnb-homes", name: "DNB Homes", src: "/logos/developers/dnb-homes.png", tone: 'dark' },
  // Ed's list called this one Goldengate; its own logo reads Goldgate, so the
  // logo wins until he says otherwise.
  { key: "goldgate", name: "Goldgate Properties", src: "/logos/developers/goldgate.png", tone: 'light' },
  { key: "freedom-homes", name: "Freedom Homes", src: "/logos/developers/freedom-homes.png", tone: 'dark' },
  { key: "ajito", name: "Ajito Property Group", src: "/logos/developers/ajito.png", tone: 'light' },
  { key: "zero-in", name: "Zero In Developments", src: "/logos/developers/zero-in.png", tone: 'light' },
  { key: "highfield", name: "Highfield Professional Solutions", src: "/logos/developers/highfield.png", tone: 'light' },
  { key: "black-flamingo", name: "Black Flamingo Homes", src: "/logos/developers/black-flamingo.png", tone: 'light' },
];

/**
 * CMS wording for one logo, matched to the list above by `key`.
 *
 * There is no field id on any of this and no data-tina-field in the markup,
 * because none of it is visible: the tile renders a picture, and the name is
 * only ever read by a screen reader or a crawler. It is edited from the form.
 */
export interface DeveloperLogoCopy {
  key: string;
  name?: string;
  alt?: string;
}

interface DeveloperLogosProps {
  /** The strip label above the marquee. */
  label?: string;
  /** Per-logo wording from the CMS. Anything missing keeps the value above. */
  logos?: DeveloperLogoCopy[];
  tina?: { label?: string };
}

const LABEL_FALLBACK = 'Trusted by developers across the UK';

/** A logo with its wording already resolved against the CMS. */
type ResolvedLogo = { key: string; src: string; tone: Tone; alt: string };

// Spacing is a right margin on the tile rather than a gap on the track. Every
// child is then exactly the same width, so sliding the track half its length
// lands precisely on the start of the duplicate and the loop has no jump. A gap
// would leave one extra gap unaccounted for and the seam would drift.
const Tile: React.FC<{ d: ResolvedLogo; ariaHidden?: boolean }> = ({ d, ariaHidden }) => (
  <div
    aria-hidden={ariaHidden}
    // Smaller tiles on phones. At the desktop size only one and a half fit a
    // 390px screen, which stops reading as a run of logos and starts reading as
    // a slideshow of one.
    className={`shrink-0 h-[84px] w-[164px] sm:h-[104px] sm:w-[220px] mr-fl-4 rounded-xl flex items-center justify-center px-fl-4 sm:px-fl-5 ${
      d.tone === 'dark' ? 'bg-thistle-black' : 'bg-thistle-black/[0.045]'
    }`}
  >
    <Image
      src={d.src}
      alt={d.alt}
      width={220}
      height={104}
      unoptimized
      // Eager on purpose. Lazy loading keys off the viewport, and a marquee
      // moves tiles through it under transform, so the ones that start off
      // screen were still undecoded once the track reached them. Eleven files
      // at half a megabyte total is cheap enough to just load.
      loading="eager"
      // Full colour and full strength. Ed asked for no dimming, so there is no
      // opacity or hover state here on purpose.
      className="max-h-11 sm:max-h-14 w-auto max-w-[120px] sm:max-w-[160px] object-contain"
    />
  </div>
);

// Trust strip under the hero. It runs as a marquee because eleven logos at a
// readable size do not fit a row, and wrapping them left a short second line of
// stragglers. Scrolling keeps it to one band whatever the screen width, and
// gives every logo the same amount of room.
export const DeveloperLogos: React.FC<DeveloperLogosProps> = ({ label, logos, tina }) => {
  // Keyed merge rather than a wholesale replacement, so the CMS supplies only
  // the wording and the picture, the tone and the running order stay in code.
  const copy: Record<string, DeveloperLogoCopy> = {};
  for (const l of logos ?? []) {
    if (l?.key) copy[l.key] = l;
  }

  const resolved: ResolvedLogo[] = developers.map((d) => {
    const c = copy[d.key];
    return {
      key: d.key,
      src: d.src,
      tone: d.tone,
      // A dedicated description wins, then the edited name, then the name here.
      alt: c?.alt || c?.name || d.name,
    };
  });

  return (
    <section className="bg-white py-fl-7 overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-fl-margin">
        <Reveal>
          <p
            className="text-[11px] uppercase tracking-[0.25em] text-thistle-black/45 font-semibold text-center"
            data-tina-field={tina?.label}
          >
            {label || LABEL_FALLBACK}
          </p>
        </Reveal>
      </div>

      {/* Full bleed, so the track runs off both edges instead of stopping at the
          content gutter and looking like it has hit a wall. The mask fades the
          logos out at each end rather than cutting them mid-tile. */}
      {/* Spacing lives here rather than as a margin under the label. The label
          sits alone in a container with no vertical padding, so a margin on it
          collapses straight out and leaves the two touching, which the reveal
          animation then makes obvious by starting the label 30px lower. */}
      <div
        className="relative mt-fl-6"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        {/* The list is rendered twice and the track slides exactly half its
            width before repeating, which is what makes the loop seamless.
            The second pass is hidden from screen readers so each name is
            announced once. Without motion the animation never starts and the
            strip is a static row that can still be scrolled by hand.
            React's key is the code-side identity, not the name, so renaming a
            company in the CMS does not remount its tile mid-scroll. */}
        <div className="flex w-max overflow-x-auto motion-safe:overflow-x-visible motion-safe:animate-[logo-marquee_46s_linear_infinite] motion-safe:hover:[animation-play-state:paused]">
          {resolved.map((d) => (
            <Tile key={d.key} d={d} />
          ))}
          {resolved.map((d) => (
            <Tile key={`${d.key}-copy`} d={d} ariaHidden />
          ))}
        </div>
      </div>
    </section>
  );
};
