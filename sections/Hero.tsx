"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '../components/ui/Button';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../components/animations/Reveal';

const metrics = [
  { value: "98.5%", label: "Planning success rate", detail: "Across all submitted schemes" },
  { value: "5 days", label: "Guaranteed turn around", detail: "From submission to clear recommendation" },
  { value: "86%", label: "Faster than traditional routes", detail: "5 days vs 2 to 6 week industry average" },
];

export const Hero: React.FC = () => {
  const router = useRouter();
  return (
    <section className="relative flex flex-col">
      {/* Full-bleed drone shot with centred copy */}
      <div className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/site/hero-drone.jpg"
          alt="Aerial view of terraced homes across a UK town"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-thistle-black/60" />

        <div className="relative z-10 max-w-4xl mx-auto px-fl-margin text-center pt-28 pb-fl-section">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-fl-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-fl-6">
              <span className="inline-flex rounded-full h-2 w-2 bg-thistle-green" />
              <span className="text-sm font-medium text-white tracking-tight">Feasibility in 5 days, nationwide</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-fluid-h1 font-medium tracking-tighter leading-[1.05] text-white mb-fl-5">
              Nationwide Feasibility For<br />Building Conversions.
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-fluid-base text-white/85 leading-relaxed font-light mb-fl-7 max-w-xl mx-auto">
              Thistle helps developers test what an existing building can become. Data analysis and developer-led architecture, with a clear Go or No-Go recommendation in five days.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-fl-4">
              <Button
                size="lg"
                variant="primary"
                icon={<ArrowUpRight size={18} />}
                onClick={() => router.push('/feasibility-package')}
              >
                Book Your Feasibility
              </Button>
              <a href="#process" className="text-sm text-white/80 hover:text-white transition-colors font-medium tracking-tight">
                See how it works &rarr;
              </a>
            </div>
            <p className="text-xs text-white/60 mt-fl-4">No obligation. Response within one working day.</p>
          </Reveal>
        </div>
      </div>

      {/* Metrics Strip, dark contrast */}
      <div className="bg-thistle-black text-white">
        <div className="max-w-[1360px] mx-auto px-fl-margin py-fl-6">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {metrics.map((metric, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className={`flex flex-col items-center text-center px-fl-5 py-fl-3 ${
                  i > 0 ? 'md:border-l md:border-white/[0.1]' : ''
                }`}>
                  <span className="text-fluid-h3 font-semibold tracking-tight text-white block mb-1">
                    {metric.value}
                  </span>
                  <span className="text-sm font-medium text-white block mb-0.5">
                    {metric.label}
                  </span>
                  <span className="text-xs text-white/70">
                    {metric.detail}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
