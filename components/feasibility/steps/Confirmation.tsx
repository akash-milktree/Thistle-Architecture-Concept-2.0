import React from 'react';
import { motion } from 'framer-motion';
import { useFeasibility } from '../FeasibilityContext';

export const Confirmation: React.FC = () => {
  const { formData } = useFeasibility();

  return (
    <div className="text-center">
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.1 }}
        className="w-16 h-16 rounded-full bg-thistle-green/15 flex items-center justify-center mx-auto mb-fl-5"
      >
        <motion.svg
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-thistle-green"
        >
          <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.div>

      <h3 className="text-fluid-h5 font-medium tracking-tight text-thistle-black mb-2">You're all set.</h3>
      <p className="text-fluid-sm text-thistle-black/40 leading-relaxed mb-fl-6">
        We'll review your submission and get back to you within 24 hours with a scope and fixed fee.
      </p>

      {/* Summary Card */}
      <div className="bg-thistle-black/[0.02] border border-thistle-black/[0.06] rounded-xl p-5 text-left">
        <div className="grid grid-cols-2 gap-y-fl-3 gap-x-6">
          {formData.address && (
            <div>
              <span className="text-[10px] uppercase tracking-widest text-thistle-black/30 font-semibold block mb-0.5">Property</span>
              <span className="text-fluid-sm text-thistle-black/70">{formData.address}</span>
            </div>
          )}
          {formData.buildingType && (
            <div>
              <span className="text-[10px] uppercase tracking-widest text-thistle-black/30 font-semibold block mb-0.5">Type</span>
              <span className="text-fluid-sm text-thistle-black/70">{formData.buildingType}</span>
            </div>
          )}
          {formData.planningRoute && (
            <div>
              <span className="text-[10px] uppercase tracking-widest text-thistle-black/30 font-semibold block mb-0.5">Planning</span>
              <span className="text-fluid-sm text-thistle-black/70">{formData.planningRoute}</span>
            </div>
          )}
          {formData.timeline && (
            <div>
              <span className="text-[10px] uppercase tracking-widest text-thistle-black/30 font-semibold block mb-0.5">Timeline</span>
              <span className="text-fluid-sm text-thistle-black/70">{formData.timeline}</span>
            </div>
          )}
          {formData.fullName && (
            <div>
              <span className="text-[10px] uppercase tracking-widest text-thistle-black/30 font-semibold block mb-0.5">Contact</span>
              <span className="text-fluid-sm text-thistle-black/70">{formData.fullName}</span>
            </div>
          )}
          {formData.email && (
            <div>
              <span className="text-[10px] uppercase tracking-widest text-thistle-black/30 font-semibold block mb-0.5">Email</span>
              <span className="text-fluid-sm text-thistle-black/70">{formData.email}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
