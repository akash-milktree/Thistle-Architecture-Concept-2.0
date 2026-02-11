import React from 'react';
import { StickyLabel } from '../components/ui/StickyLabel';
import { Reveal } from '../components/animations/Reveal';
import { ImageMarquee } from '../components/ui/ImageMarquee';

export const Intro: React.FC = () => {
  return (
    <section className="py-24 lg:pt-32 lg:pb-0 bg-thistle-white">
      {/* Content Container */}
      <div className="px-6 lg:px-12 max-w-[1600px] mx-auto mb-32">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
          <StickyLabel label="The Model" description="Not a traditional practice." />
          
          <div className="lg:w-3/4 space-y-24">
            <Reveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight leading-tight">
                We are a <span className="text-thistle-green">feasibility engine</span> built for developers who need speed, clarity, and risk reduction.
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-thistle-black/10 pt-12">
              <Reveal delay={0.1}>
                <div className="space-y-4">
                  <h3 className="text-xl font-medium">Existing Buildings Only</h3>
                  <p className="text-thistle-black/60 leading-relaxed">
                    We don't do new builds. We specialise entirely in the constraints and opportunities of existing commercial stock. We know Part O, Class MA, and structural limitations inside out.
                  </p>
                </div>
              </Reveal>
              
              <Reveal delay={0.2}>
                <div className="space-y-4">
                  <h3 className="text-xl font-medium">Product, Not Service</h3>
                  <p className="text-thistle-black/60 leading-relaxed">
                    Traditional architecture is slow and subjective. Thistle is structured and objective. You get a standardized, data-rich feasibility report that banks and investors understand.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="space-y-4">
                  <h3 className="text-xl font-medium">Commercially Led</h3>
                  <p className="text-thistle-black/60 leading-relaxed">
                    We don't just draw lines. We calculate usable square footage, efficiency ratios, and unit mixes that maximize GDV while minimizing construction complexity.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="space-y-4">
                  <h3 className="text-xl font-medium">Zero Fluff</h3>
                  <p className="text-thistle-black/60 leading-relaxed">
                    No mood boards. No lifestyle renders. Just the hard facts you need to bid with confidence or walk away from a bad deal.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
      
      {/* Marquee Carousel Full Width */}
      <Reveal width="100%">
        <ImageMarquee />
      </Reveal>
    </section>
  );
};