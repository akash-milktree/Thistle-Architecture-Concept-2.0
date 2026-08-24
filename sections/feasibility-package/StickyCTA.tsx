"use client";

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
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
          <div className="leading-tight">
            <span className="block text-[10px] uppercase tracking-wider text-white/50 font-semibold">Fixed fee, from</span>
            <span className="block text-base font-semibold">{pricingFrom} inc. VAT</span>
          </div>
          <Link
            href="/pricing#calculator"
            className="inline-flex items-center gap-1.5 text-sm font-medium px-5 py-2.5 rounded-full bg-thistle-green text-thistle-black"
          >
            Get Your Instant Fixed Fee
            <ArrowUpRight size={15} />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
