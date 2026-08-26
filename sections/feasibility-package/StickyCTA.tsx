"use client";

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useFeasibility } from '../../components/feasibility/FeasibilityContext';
import { pricingFrom } from '../../data/feasibilityPackageData';
import { pruneEmpty } from '../../lib/tina';

// Now a fallback rather than this bar's only copy: the same two strings live in
// content/feasibility/package.json, seeded byte-for-byte from here.
//
// The price is NOT one of them. `{pricingFrom} inc. VAT` reads as the price of
// the product, and it is rendered straight from the constant that sits beside
// the pricing engine, so the bar cannot advertise a fee the site does not
// honour. Same line tina/collections/pricing.ts draws, for the same reason.
const FALLBACK = {
  label: 'Fixed fee, from',
  ctaLabel: 'Get Your Instant Fixed Fee',
};

interface StickyCTAProps {
  label?: string;
  ctaLabel?: string;
  /** CMS field ids for the two editable strings. The price and the destination stay in code. */
  tina?: Partial<Record<'label' | 'ctaLabel', string>>;
}

// Mobile-only sticky bar that appears once the hero has scrolled past.
export const StickyCTA: React.FC<StickyCTAProps> = ({ label, ctaLabel, tina }) => {
  const { isOpen } = useFeasibility();
  const [visible, setVisible] = useState(false);
  const copy = { ...FALLBACK, ...pruneEmpty({ label, ctaLabel }) };

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && !isOpen && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-thistle-black text-white px-fl-margin py-3 flex items-center justify-between gap-fl-4 shadow-[0_-4px_16px_rgba(0,0,0,0.15)]"
        >
          {/* At 320px both halves wrapped and the bar swelled to about 110px.
              The price is the short half, so it keeps its line and does not
              shrink; the button takes what is left with tighter padding on the
              narrowest phones. */}
          <div className="leading-tight shrink-0">
            <span className="block text-[10px] uppercase tracking-wider text-white/50 font-semibold whitespace-nowrap" data-tina-field={tina?.label}>{copy.label}</span>
            <span className="block text-base font-semibold whitespace-nowrap">{pricingFrom} inc. VAT</span>
          </div>
          <a
            href="#instant-quote"
            className="inline-flex min-w-0 items-center justify-center gap-1.5 text-sm font-medium px-3.5 sm:px-5 py-2.5 rounded-full bg-thistle-green text-thistle-black text-center"
            data-tina-field={tina?.ctaLabel}
          >
            {copy.ctaLabel}
            <ArrowUpRight size={15} className="shrink-0" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
