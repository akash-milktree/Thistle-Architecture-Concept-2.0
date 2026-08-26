"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { Button } from './Button';
import { useFeasibility } from '../feasibility/FeasibilityContext';

interface InlineCTAProps {
  label?: string;
  /** Tier 1 (default): link to the feasibility package page.
   *  Pass href="" on the package page to open the form instead. */
  href?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  /** CMS field id for the label. The destination stays in code. */
  tinaLabel?: string;
}

/**
 * Inline CTA used between sections to keep conversion scent.
 * Tier 1 (default): the standard high-intent CTA from Ed's August 2026 brief,
 * "Get Your Fixed Fee", into the pricing calculator.
 * Tier 2: href="" opens the detailed brief form, which is now post-payment
 * only, so pass it deliberately or not at all.
 */
export const InlineCTA: React.FC<InlineCTAProps> = ({
  label = "Get Your Fixed Fee",
  href = "/pricing",
  align = "center",
  className = "",
  tinaLabel,
}) => {
  const router = useRouter();
  const { openModal } = useFeasibility();
  const alignCls = align === "center" ? "justify-center" : align === "right" ? "justify-end" : "justify-start";

  // A same-page anchor (used on the feasibility package page, which now hosts
  // its own calculator) goes through the browser's own hash navigation rather
  // than router.push, which is built for real path changes and is not
  // guaranteed to scroll a bare "#id" reliably.
  const go = () => {
    if (!href) return openModal();
    if (href.startsWith('#')) document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else router.push(href);
  };

  return (
    <div className={`flex ${alignCls} ${className}`}>
      <Button size="md" variant="primary" icon={<ArrowUpRight size={16} />} onClick={go} data-tina-field={tinaLabel}>
        {label}
      </Button>
    </div>
  );
};
