"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '../components/ui/Button';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../components/animations/Reveal';

const metrics = [
  { value: "98.5%", label: "Planning success rate", detail: "Across all submitted schemes" },
  { value: "5 days", label: "Guaranteed turn around", detail: "Submission to recommendation" },
  { value: "86%", label: "Faster than traditional routes", detail: "5 days vs 2 to 6 weeks" },
];

export const Hero: React.FC = () => {
  const router = useRouter();
  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden">
      {/* Media: image always, video takes over on larger screens when motion is allowed */}
      <Image
        src="/images/site/hero-drone.jpg"
        alt="Aerial view of terraced homes across a UK town"
        fill
        priority
        className="object-cover"
      />
      <video
        className="absolute inset-0 w-full h-full object-cover hidden sm:motion-safe:block"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/site/hero-drone.jpg"
        aria-hidden="true"
      >
        <source src="/videos/hero-drone.mp4" type="video/mp4" />
      </video>

      {/* Readability overlays: heavier on the left where the copy sits, plus a bottom wash for the stat band */}
      <div className="absolute inset-0 bg-gradient-to-r from-thistle-black/85 via-thistle-black/55 to-thistle-black/25" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-thistle-black/75 to-transparent" />

      {/* Copy block */}
      <div className="relative z-10 flex-1 flex items-center w-full">
        <div className="max-w-[1360px] mx-auto w-full px-fl-margin pt-36 sm:pt-32 pb-fl-7">
          <div className="max-w-4xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-fl-4 py-2 rounded-full bg-white/10 border border-white/25 backdrop-blur-sm mb-fl-6">
                <span className="inline-flex rounded-full h-2 w-2 bg-thistle-green" />
                <span className="text-sm font-medium text-white tracking-tight">Feasibility-first architecture</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-[clamp(2.6rem,5.2vw,4.6rem)] font-medium tracking-tighter leading-[1.05] text-white mb-fl-5">
                Nationwide Developer-Led<br />Retrofit Architecture.
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-fluid-base text-white/90 leading-relaxed font-light mb-fl-7 max-w-xl">
                Thistle is a feasibility-first architecture practice for existing buildings. We test what a building can become, give you a clear Go or No-Go in five days, then design and deliver the conversion.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-fl-4">
                <Button
                  size="lg"
                  variant="primary"
                  icon={<ArrowUpRight size={18} />}
                  onClick={() => router.push('/feasibility-package')}
                  className="!bg-thistle-green !text-thistle-black !border-thistle-green hover:!bg-thistle-green/85 hover:!border-thistle-green/85"
                >
                  Book Your Feasibility
                </Button>
                <a
                  href="#process"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/40 text-white text-sm font-medium hover:bg-white/10 hover:border-white/60 transition-colors"
                >
                  See how it works
                </a>
              </div>
              <p className="text-sm text-white/90 mt-fl-4">No obligation. Response within one working day.</p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Impact numbers, part of the hero */}
      <div className="relative z-10 w-full px-fl-margin pb-fl-6">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-fl-3">
          {metrics.map((metric, i) => (
            <Reveal key={i} delay={0.35 + i * 0.08}>
              <div className="rounded-xl bg-white/10 backdrop-blur-md border border-white/15 px-fl-5 py-fl-4">
                <span className="block text-fluid-h4 font-semibold tracking-tight text-white leading-none mb-1.5">
                  {metric.value}
                </span>
                <span className="block text-sm font-medium text-white/95 leading-tight">{metric.label}</span>
                <span className="block text-xs text-white/70 mt-0.5">{metric.detail}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
