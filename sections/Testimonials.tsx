import React from 'react';
import { Reveal } from '../components/animations/Reveal';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 px-6 lg:px-12 bg-thistle-black/5">
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <div className="mb-12">
            <span className="text-xs uppercase tracking-widest text-thistle-gray font-semibold">
              Industry Trust
            </span>
          </div>
        </Reveal>
        
        <Reveal delay={0.2}>
          <blockquote className="text-2xl md:text-4xl font-light leading-tight tracking-tight mb-8">
            "Thistle gives us the confidence to bid on tight deadlines. Their reports are clearer and more commercially grounded than any traditional architect we've used."
          </blockquote>
          <cite className="not-italic text-sm font-medium text-thistle-black/70">
            — Marcus Cole, Director at Sterling Property Group
          </cite>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-16 flex flex-wrap justify-center gap-12 opacity-50 grayscale">
            {/* Logos represented as text for simplicity */}
            <span className="text-xl font-bold tracking-tighter">LANDSEC</span>
            <span className="text-xl font-bold tracking-tighter">CAPITAL&CENTRIC</span>
            <span className="text-xl font-bold tracking-tighter">URBAN SPLASH</span>
            <span className="text-xl font-bold tracking-tighter">DERWENT</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
};