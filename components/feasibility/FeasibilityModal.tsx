import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFeasibility } from './FeasibilityContext';
import { PropertyDetails } from './steps/PropertyDetails';
import { ProjectInfo } from './steps/ProjectInfo';
import { ContactDetails } from './steps/ContactDetails';
import { Confirmation } from './steps/Confirmation';
import { X } from 'lucide-react';

const steps = [
  { label: "Property", component: PropertyDetails },
  { label: "Project", component: ProjectInfo },
  { label: "Contact", component: ContactDetails },
  { label: "Confirm", component: Confirmation },
];

export const FeasibilityModal: React.FC = () => {
  const { isOpen, closeModal, currentStep, setCurrentStep } = useFeasibility();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeModal]);

  const StepComponent = steps[currentStep].component;

  const goNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };
  const goBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] flex items-center justify-center px-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-thistle-black/60 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative w-full max-w-[560px] bg-thistle-white rounded-2xl border border-thistle-black/[0.06] shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-thistle-black/[0.05] flex items-center justify-center text-thistle-black/40 hover:bg-thistle-black/[0.1] hover:text-thistle-black transition-colors"
            >
              <X size={16} />
            </button>

            {/* Step Indicator */}
            <div className="px-fl-6 pt-fl-6 pb-2">
              <div className="flex items-center gap-fl-2">
                {steps.map((step, i) => (
                  <React.Fragment key={i}>
                    <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                      i < currentStep ? 'bg-thistle-green' :
                      i === currentStep ? 'bg-thistle-pink' :
                      'bg-thistle-black/10'
                    }`} />
                    {i < steps.length - 1 && (
                      <div className={`flex-1 h-[1.5px] transition-colors duration-300 ${
                        i < currentStep ? 'bg-thistle-green' : 'bg-thistle-black/10'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-thistle-black/30 font-semibold mt-3">
                Step {currentStep + 1} of {steps.length} — {steps[currentStep].label}
              </p>
            </div>

            {/* Step Content */}
            <div className="px-fl-6 py-fl-5 min-h-[380px]">
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
            <div className="px-fl-6 pb-fl-6 flex items-center justify-between">
              {currentStep > 0 && currentStep < steps.length - 1 ? (
                <button
                  onClick={goBack}
                  className="text-sm text-thistle-black/40 hover:text-thistle-black transition-colors font-medium"
                >
                  Back
                </button>
              ) : <div />}

              {currentStep < steps.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={goNext}
                  className="inline-flex items-center justify-center text-sm font-medium px-6 py-3 rounded-full bg-thistle-black text-white hover:bg-thistle-green hover:text-thistle-black transition-colors"
                >
                  Continue
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={closeModal}
                  className="inline-flex items-center justify-center text-sm font-medium px-6 py-3 rounded-full bg-thistle-black text-white hover:bg-thistle-green hover:text-thistle-black transition-colors"
                >
                  Close
                </motion.button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
