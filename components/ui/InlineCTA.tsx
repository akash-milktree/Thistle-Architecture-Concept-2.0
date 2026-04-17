"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useFeasibility } from '../feasibility/FeasibilityContext';

interface InlineCTAProps {
  label?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

/**
 * Subtle inline text-link CTA used between sections to keep
 * conversion scent without cluttering layouts with full buttons.
 */
export const InlineCTA: React.FC<InlineCTAProps> = ({
  label = "Start your feasibility",
  align = "center",
  className = "",
}) => {
  const { openModal } = useFeasibility();
  const alignCls = align === "center" ? "justify-center" : align === "right" ? "justify-end" : "justify-start";

  return (
    <div className={`flex ${alignCls} ${className}`}>
      <button
        onClick={openModal}
        className="group inline-flex items-center gap-2 text-fluid-sm font-medium text-thistle-green hover:text-thistle-black transition-colors"
      >
        <span>{label}</span>
        <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" strokeWidth={2} />
      </button>
    </div>
  );
};
