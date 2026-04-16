"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import { Button } from './ui/Button';
import { useFeasibility } from './feasibility/FeasibilityContext';

export const ExitIntentPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { openModal, isOpen: isModalOpen } = useFeasibility();

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (
        e.clientY <= 0 &&
        !sessionStorage.getItem('exitShown') &&
        !isModalOpen
      ) {
        setIsVisible(true);
        sessionStorage.setItem('exitShown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [isModalOpen]);

  const handleClose = () => setIsVisible(false);

  const handleCTA = () => {
    setIsVisible(false);
    openModal();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-thistle-black/60 backdrop-blur-sm" />

          {/* Panel */}
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative bg-thistle-white rounded-2xl border border-thistle-black/[0.06] shadow-2xl max-w-md w-full p-fl-7"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-thistle-black/[0.05] transition-colors"
            >
              <X size={18} className="text-thistle-black/40" />
            </button>

            {/* Content */}
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-thistle-green/15 flex items-center justify-center mx-auto mb-fl-4">
                <span className="text-xl">&#128172;</span>
              </div>

              <h3 className="text-fluid-h5 font-medium tracking-tight text-thistle-black mb-fl-3">
                Before you go —
              </h3>
              <p className="text-fluid-sm text-thistle-black/50 leading-relaxed mb-fl-6 max-w-sm mx-auto">
                Book a free 15-minute expert session with a senior architect. No commitment, no payment — just clarity on your project.
              </p>

              <Button
                size="lg"
                variant="primary"
                icon={<ArrowUpRight size={16} />}
                className="w-full justify-center"
                onClick={handleCTA}
              >
                Book Free Expert Session
              </Button>

              <button
                onClick={handleClose}
                className="mt-fl-4 text-sm text-thistle-black/30 hover:text-thistle-black/50 transition-colors"
              >
                No thanks, I'll come back later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
