"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFeasibility } from './FeasibilityContext';
import { PropertyDetails } from './steps/PropertyDetails';
import { ProjectInfo } from './steps/ProjectInfo';
import { ContactDetails } from './steps/ContactDetails';
import { Confirmation } from './steps/Confirmation';
import { ThistleLogo } from '../ui/ThistleLogo';
import { X, CheckCircle2 } from 'lucide-react';

const steps = [
  { label: "Property", component: PropertyDetails },
  { label: "Project", component: ProjectInfo },
  { label: "Contact", component: ContactDetails },
  { label: "Review", component: Confirmation },
];

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

type Status = 'idle' | 'submitting' | 'success' | 'error';

export const FeasibilityModal: React.FC = () => {
  const { isOpen, closeModal, currentStep, setCurrentStep, formData } = useFeasibility();
  const [status, setStatus] = useState<Status>('idle');

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

  const StepComponent = steps[currentStep].component;

  // Per-step gating: address first, valid contact before review.
  const stepValid =
    currentStep === 0 ? formData.address.trim().length > 3 :
    currentStep === 2 ? formData.fullName.trim().length > 1 && emailOk(formData.email) :
    true;

  const goNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };
  const goBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const submit = async () => {
    setStatus('submitting');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: 'feasibility-form', ...formData }),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] bg-thistle-white overflow-y-auto"
        >
          <div className="min-h-full flex flex-col max-w-2xl mx-auto px-fl-margin py-fl-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-fl-7">
              <ThistleLogo variant="full" color="dark" className="h-9 w-auto" />
              <button
                onClick={closeModal}
                aria-label="Close form"
                className="w-9 h-9 rounded-full bg-thistle-black/[0.05] flex items-center justify-center text-thistle-black/40 hover:bg-thistle-black/[0.1] hover:text-thistle-black transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {status === 'success' ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-fl-8">
                <div className="w-16 h-16 rounded-full bg-thistle-green/15 flex items-center justify-center mb-fl-5">
                  <CheckCircle2 size={30} className="text-thistle-green" />
                </div>
                <h3 className="text-fluid-h4 font-medium tracking-tight text-thistle-black mb-fl-3">Thanks, we have your details.</h3>
                <p className="text-fluid-base text-thistle-black/60 leading-relaxed max-w-md mb-fl-6">
                  We will come back to you within one working day to confirm scope and start your feasibility.
                </p>
                <button
                  onClick={closeModal}
                  className="inline-flex items-center justify-center text-sm font-medium px-6 py-3 rounded-full bg-thistle-black text-white hover:bg-thistle-green hover:text-thistle-black transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                {/* Progress */}
                <div className="mb-fl-6">
                  <div className="h-1 w-full rounded-full bg-thistle-black/[0.06] overflow-hidden">
                    <div
                      className="h-full bg-thistle-green rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-thistle-black/30 font-semibold">
                      Step {currentStep + 1} of {steps.length}: {steps[currentStep].label}
                    </p>
                    {currentStep === 0 && (
                      <p className="text-[10px] uppercase tracking-[0.2em] text-thistle-green font-semibold">
                        Takes about 2 minutes
                      </p>
                    )}
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                    >
                      <StepComponent />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation */}
                <div className="pt-fl-6 flex items-center justify-between">
                  {currentStep > 0 ? (
                    <button
                      onClick={goBack}
                      className="text-sm text-thistle-black/40 hover:text-thistle-black transition-colors font-medium"
                    >
                      Back
                    </button>
                  ) : <div />}

                  <div className="flex flex-col items-end gap-2">
                    {status === 'error' && (
                      <p className="text-xs text-red-700">Something went wrong. Please try again.</p>
                    )}
                    {currentStep < steps.length - 1 ? (
                      <motion.button
                        whileHover={{ scale: stepValid ? 1.02 : 1 }}
                        whileTap={{ scale: stepValid ? 0.98 : 1 }}
                        onClick={goNext}
                        disabled={!stepValid}
                        className="inline-flex items-center justify-center text-sm font-medium px-6 py-3 rounded-full bg-thistle-black text-white hover:bg-thistle-green hover:text-thistle-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-thistle-black disabled:hover:text-white"
                      >
                        Continue
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={submit}
                        disabled={status === 'submitting'}
                        className="inline-flex items-center justify-center text-sm font-medium px-6 py-3 rounded-full bg-thistle-green text-thistle-black hover:bg-thistle-green/80 transition-colors disabled:opacity-60"
                      >
                        {status === 'submitting' ? 'Submitting…' : 'Submit'}
                      </motion.button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
