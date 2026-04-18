"use client";

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from './Button';
import { useFeasibility } from '../feasibility/FeasibilityContext';

interface InlineCTAProps {
  label?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

/**
 * Inline CTA used between sections to keep conversion scent.
 * Dark button with white text that turns green on hover, matching
 * the Button component's default primary variant.
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
      <Button
        size="md"
        variant="primary"
        icon={<ArrowUpRight size={16} />}
        onClick={openModal}
      >
        {label}
      </Button>
    </div>
  );
};
