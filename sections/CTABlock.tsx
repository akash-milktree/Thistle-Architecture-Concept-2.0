"use client";

import React from 'react';
import { Reveal } from '../components/animations/Reveal';
import { Button } from '../components/ui/Button';
import { ArrowUpRight } from 'lucide-react';
import { useFeasibility } from '../components/feasibility/FeasibilityContext';

export const CTABlock: React.FC = () => {
  const { openModal } = useFeasibility();

  return (
    <section className="bg-thistle-black py-fl-section px-fl-margin">
      <div className="max-w-[800px] mx-auto text-center">
        <Reveal>
          <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-white mb-fl-4">
            Get Your Feasibility In 5 Days.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-fluid-sm text-white/80 leading-relaxed mb-fl-7 max-w-md mx-auto">
            Submit your property details and receive initial insight within 24 hours.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <Button
            size="lg"
            variant="primary"
            icon={<ArrowUpRight size={18} />}
            onClick={openModal}
            className="!bg-thistle-green !text-black !border-thistle-green hover:!bg-thistle-green/80"
          >
            Start Feasibility
          </Button>
        </Reveal>
      </div>
    </section>
  );
};
