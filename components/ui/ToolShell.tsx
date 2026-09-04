"use client";

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from './PageHero';
import { Reveal } from '../animations/Reveal';
import { Button } from './Button';
import { useRouter } from 'next/navigation';
import { pruneEmpty } from '../../lib/tina';
import type { Tool } from '../../data/toolsData';

interface ToolClosing {
  heading: string;
  headingAccent: string;
  body: string;
}

interface ToolShellProps {
  tool: Tool;
  /** Hero eyebrow. Defaults to the tool's own name in data/toolsData.ts. */
  heroLabel?: string;
  heroHeading: string;
  heroDescription: string;
  disclaimer: string;
  /**
   * Label on the closing button. The same value is handed to the button inside
   * the tool itself, so the two cannot end up saying different things.
   */
  ctaLabel?: string;
  /** CMS copy for the closing band. Falls back to the standing copy below. */
  closing?: Partial<ToolClosing>;
  /** CMS field ids for the copy this shell renders. */
  tina?: {
    label?: string;
    heading?: string;
    description?: string;
    disclaimer?: string;
    ctaLabel?: string;
    closing?: Partial<Record<keyof ToolClosing, string>>;
  };
  children: React.ReactNode;
}

// The closing band's words live here rather than in each view because the band
// belongs to the shell, not to any one tool: all three pages end the same way.
// They stay in code as the fallback, merged with pruneEmpty exactly as the
// footer does, so a field an editor has cleared leaves the standing copy up
// instead of blanking the band.
const CLOSING_FALLBACK: ToolClosing = {
  heading: 'The Tool Is A Hint.',
  headingAccent: 'The Feasibility Is The Answer.',
  body: 'Get a real, design-led feasibility on the building in five days. Fixed fee, clear Go or No-Go.',
};

// Shared page shell for any tool. Wraps the PageHero, the tool body, a small
// disclaimer line, and a closing "Start Feasibility" CTA so every tool page
// has the same conversion frame.
export const ToolShell: React.FC<ToolShellProps> = ({
  tool,
  heroLabel,
  heroHeading,
  heroDescription,
  disclaimer,
  ctaLabel = 'Get Your Fixed Fee',
  closing,
  tina,
  children,
}) => {
  const router = useRouter();
  const c: ToolClosing = { ...CLOSING_FALLBACK, ...pruneEmpty(closing) };
  return (
    <>
      <PageHero
        label={heroLabel ?? tool.label}
        heading={heroHeading}
        description={heroDescription}
        tina={{ label: tina?.label, heading: tina?.heading, description: tina?.description }}
      />

      {children}

      <section className="bg-thistle-white px-fl-margin py-fl-7">
        <div className="max-w-[1000px] mx-auto">
          {/* The marker is on the paragraph that prints the disclaimer, not on
              the band around it: a marker on the section would swallow clicks
              meant for anything inside it. */}
          <p
            className="text-fluid-sm text-thistle-black/55 leading-relaxed text-center"
            data-tina-field={tina?.disclaimer}
          >
            {disclaimer}
          </p>
        </div>
      </section>

      <section className="py-fl-section px-fl-margin bg-white">
        <div className="max-w-[1360px] mx-auto text-center">
          <Reveal>
            {/* Two fields, two markers. The h2 holds the first line and carries
                `heading`; the green span holds the second and carries its own,
                so closest() finds the span first for a click on the green
                words. */}
            <h2
              className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black mb-fl-5"
              data-tina-field={tina?.closing?.heading}
            >
              {c.heading}<br /><span className="text-thistle-green" data-tina-field={tina?.closing?.headingAccent}>{c.headingAccent}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p
              className="text-fluid-base text-thistle-black/80 leading-relaxed max-w-md mx-auto mb-fl-6"
              data-tina-field={tina?.closing?.body}
            >
              {c.body}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowUpRight size={18} />}
              onClick={() => router.push('/pricing')}
              data-tina-field={tina?.ctaLabel}
            >
              {ctaLabel}
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
};
