import React from 'react';
import { Reveal } from '../components/animations/Reveal';
import { ImageMarquee } from '../components/ui/ImageMarquee';

const stats = [
  { value: "200+", label: "Feasibility reports completed" },
  { value: "5", label: "Working days to delivery" },
  { value: "7+", label: "Years specialist experience" },
  { value: "£120M+", label: "GDV assessed" },
];

export const Intro: React.FC = () => {
  return (
    <section className="bg-thistle-white pt-fl-section pb-0">
      {/* Top: Label + Heading / Description */}
      <div className="px-fl-margin max-w-[1360px] mx-auto mb-fl-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-thistle-black/50 font-semibold mb-fl-5">About us</p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-fl-6 items-start">
          {/* Left: Large heading */}
          <Reveal delay={0.1}>
            <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black">
              Specialists in conversions, HMOs, and high-end residential.
            </h2>
          </Reveal>

          {/* Right: Description */}
          <Reveal delay={0.2}>
            <p className="text-fluid-sm text-thistle-black/70 leading-relaxed lg:pt-2 max-w-lg">
              We work exclusively on existing buildings — commercial conversions, HMO projects, and high-end residential schemes. Our data-driven approach combines automated desk studies with architect-led reviews, so developers get clear, actionable answers within days, not weeks.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Image Marquee */}
      <div className="mb-fl-8">
        <Reveal width="100%">
          <ImageMarquee />
        </Reveal>
      </div>

      {/* Stats Row */}
      <div className="px-fl-margin max-w-[1360px] mx-auto pb-fl-section">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-fl-6 border-t border-thistle-black/10 pt-10">
          {stats.map((stat, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="flex flex-col">
                <span className="text-fluid-h2 font-medium tracking-tight text-thistle-black leading-none mb-2">
                  {stat.value}
                </span>
                <span className="text-fluid-sm text-thistle-black/60 font-normal">
                  {stat.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
