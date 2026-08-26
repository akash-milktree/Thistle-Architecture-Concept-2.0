"use client";

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useFeasibility } from '../../components/feasibility/FeasibilityContext';
import { pricingFrom } from '../../data/feasibilityPackageData';

// Mobile-only sticky bar that appears once the hero has scrolled past.
export const StickyCTA: React.FC = () => {
  const { isOpen } = useFeasibility();
  const [visible, setVisible] = useState(false);

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
            <span className="block text-[10px] uppercase tracking-wider text-white/50 font-semibold whitespace-nowrap">Fixed fee, from</span>
            <span className="block text-base font-semibold whitespace-nowrap">{pricingFrom} inc. VAT</span>
          </div>
          <a
            href="#instant-quote"
            className="inline-flex min-w-0 items-center justify-center gap-1.5 text-sm font-medium px-3.5 sm:px-5 py-2.5 rounded-full bg-thistle-green text-thistle-black text-center"
          >
            Get Your Instant Fixed Fee
            <ArrowUpRight size={15} className="shrink-0" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
