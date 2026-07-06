"use client";

import React from 'react';
import { useFeasibility } from '../FeasibilityContext';

// Review step: the user checks their details before submitting.
export const Confirmation: React.FC = () => {
  const { formData } = useFeasibility();

  return (
    <div>
      <h3 className="text-fluid-h5 font-medium tracking-tight text-thistle-black mb-fl-1">Check your details.</h3>
      <p className="text-fluid-sm text-thistle-black/40 mb-fl-5">
        Make sure everything looks right, then submit. We will come back to you within one working day.
      </p>

      <div className="bg-thistle-black/[0.02] border border-thistle-black/[0.06] rounded-xl p-5 text-left">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-fl-3 gap-x-6">
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
          {formData.approximateFloorArea && (
            <div>
              <span className="text-[10px] uppercase tracking-widest text-thistle-black/30 font-semibold block mb-0.5">Floor Area</span>
              <span className="text-fluid-sm text-thistle-black/70">{formData.approximateFloorArea} sqft</span>
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
          {formData.phone && (
            <div>
              <span className="text-[10px] uppercase tracking-widest text-thistle-black/30 font-semibold block mb-0.5">Phone</span>
              <span className="text-fluid-sm text-thistle-black/70">{formData.phone}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
