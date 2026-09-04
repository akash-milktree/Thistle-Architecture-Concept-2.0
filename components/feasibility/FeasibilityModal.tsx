"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import { useFeasibility, FEASIBILITY_STEPS, type FeasibilityStep } from './FeasibilityContext';
import { validatePropertyBasics, validateSizePlans, validateDetails } from './feasibility';
import { PropertyBasics } from './steps/PropertyBasics';
import { SizePlans } from './steps/SizePlans';
import { ContactDetails } from './steps/ContactDetails';
import { ThistleLogo } from '../ui/ThistleLogo';

// Full-page takeover form. Structure follows the HMO Designers feasibility flow
// (slim top progress bar, one section per screen, centred step header, gated
// Continue); colours and type are Thistle's. A Stripe payment step slots in
// after "details" when payments are switched on.

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

type Status = 'idle' | 'submitting' | 'success' | 'error';

export const FeasibilityModal: React.FC = () => {
  const { isOpen, closeModal, step, setStep, answers, files, errors, setErrors, tier } = useFeasibility();
  const [status, setStatus] = useState<Status>('idle');
  const [uploading, setUploading] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
      setStatus('idle');
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeModal]);

  // On each step change: reset the overlay scroll (it keeps the previous step's
  // offset otherwise) and move focus to the heading without re-scrolling it.
  useEffect(() => {
    if (!isOpen) return;
    scrollRef.current?.scrollTo({ top: 0 });
    headingRef.current?.focus({ preventScroll: true });
  }, [step, isOpen]);

  const activeIndex = FEASIBILITY_STEPS.findIndex((s) => s.key === step);
  const active = FEASIBILITY_STEPS[activeIndex];
  const progress = ((activeIndex + 1) / FEASIBILITY_STEPS.length) * 100;

  // Continue stays clickable when invalid (clicking surfaces the field errors),
  // but reads as dimmed until the step validates.
  const stepValid =
    step === 'property'
      ? Object.keys(validatePropertyBasics(answers)).length === 0
      : step === 'size'
        ? Object.keys(validateSizePlans(answers, !!files.floorPlan)).length === 0
        : Object.keys(validateDetails(answers)).length === 0;

  function goNext() {
    if (step === 'property') {
      const e = validatePropertyBasics(answers);
      if (Object.keys(e).length) return setErrors(e as Record<string, string>);
      setStep('size');
    } else if (step === 'size') {
      const e = validateSizePlans(answers, !!files.floorPlan);
      if (Object.keys(e).length) return setErrors(e as Record<string, string>);
      setStep('details');
    }
  }

  function goBack() {
    if (step === 'size') setStep('property');
    if (step === 'details') setStep('size');
  }

  async function submit() {
    const e = validateDetails(answers);
    if (Object.keys(e).length) return setErrors(e as Record<string, string>);
    setStatus('submitting');
    try {
      const res = await fetch('/api/feasibility/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, files, tier }),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  const isLast = activeIndex === FEASIBILITY_STEPS.length - 1;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          ref={scrollRef}
          className="fixed inset-0 z-[60] overflow-y-auto bg-thistle-white"
          role="dialog"
          aria-modal="true"
          aria-label="Book a feasibility study"
        >
          {/* Slim accent progress bar pinned to the top edge */}
          <div className="fixed inset-x-0 top-0 z-20 h-1 bg-thistle-black/[0.08]">
            <div
              className="h-full bg-thistle-green transition-all duration-500 ease-out"
              style={{ width: status === 'success' ? '100%' : `${progress}%` }}
            />
          </div>

          {/* Brand + close */}
          <div className="sticky top-0 z-10 flex items-center justify-between bg-thistle-white/90 px-6 py-5 backdrop-blur md:px-10">
            <ThistleLogo variant="full" color="dark" className="h-8 w-auto md:h-9" />
            <button
              onClick={closeModal}
              aria-label="Close form"
              className="rounded-full border border-thistle-black/10 p-2.5 text-thistle-black/50 transition-colors hover:border-thistle-black/30 hover:text-thistle-black"
            >
              <X size={16} />
            </button>
          </div>

          <div className="mx-auto w-full max-w-[27rem] px-6 pb-20 pt-4 md:pt-10">
            {status === 'success' ? (
              <div className="flex flex-col items-center pt-16 text-center md:pt-20">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-thistle-green/15">
                  <CheckCircle2 size={30} className="text-thistle-green" />
                </div>
                <h2 className="text-3xl font-light leading-[1.05] tracking-[-0.02em] text-thistle-black md:text-4xl">
                  Thanks, we have your details
                </h2>
                <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-thistle-black/60">
                  {tier === 'automated'
                    ? 'Your brief is with us. Your automated analysis is generated from it directly, and the report lands in your inbox once it is ready.'
                    : 'Your enquiry and floor plans are with our design team. We will come back to you within one working day to confirm scope and start your feasibility.'}
                </p>
                <button
                  onClick={closeModal}
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-thistle-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-thistle-green hover:text-thistle-black"
                >
                  Close
                </button>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  {/* Centred step header */}
                  <div className="text-center">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-thistle-black/40">
                      Step {activeIndex + 1} of {FEASIBILITY_STEPS.length}
                    </p>
                    <h2
                      ref={headingRef}
                      tabIndex={-1}
                      className="mt-4 text-4xl font-light leading-[1.05] tracking-[-0.02em] text-thistle-black outline-none md:text-[2.75rem]"
                    >
                      {active.title}
                    </h2>
                    <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-thistle-black/60">{active.lede}</p>
                  </div>

                  <div className="mt-10">
                    {step === 'property' && <PropertyBasics />}
                    {step === 'size' && <SizePlans onUploadingChange={setUploading} />}
                    {step === 'details' && <ContactDetails />}

                    {/* Navigation */}
                    <div className="mt-6 flex items-center justify-between gap-3">
                      {activeIndex > 0 ? (
                        <button
                          type="button"
                          onClick={goBack}
                          className="rounded-full border border-thistle-black/10 px-6 py-3 text-sm font-medium text-thistle-black/60 transition-colors hover:border-thistle-black/30 hover:text-thistle-black"
                        >
                          Back
                        </button>
                      ) : (
                        <span />
                      )}
                      <button
                        type="button"
                        onClick={isLast ? submit : goNext}
                        disabled={uploading || status === 'submitting'}
                        className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors ${
                          isLast
                            ? 'bg-thistle-green text-thistle-black hover:bg-thistle-green/80'
                            : 'bg-thistle-black text-white hover:bg-thistle-green hover:text-thistle-black'
                        } ${!stepValid || uploading ? 'opacity-40' : ''}`}
                      >
                        {status === 'submitting'
                          ? 'Submitting…'
                          : uploading
                            ? 'Uploading…'
                            : isLast
                              ? 'Submit enquiry'
                              : 'Continue'}
                      </button>
                    </div>

                    {status === 'error' && (
                      <p aria-live="polite" className="mt-4 text-center text-xs text-red-700">
                        Something went wrong. Please try again, or email hello@thistlearchitecture.co.uk.
                      </p>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
