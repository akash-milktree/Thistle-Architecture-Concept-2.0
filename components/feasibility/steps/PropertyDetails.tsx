import React from 'react';
import { useFeasibility } from '../FeasibilityContext';

const buildingTypes = ['Office', 'Retail', 'Mixed-Use', 'Industrial', 'Other'];

export const PropertyDetails: React.FC = () => {
  const { formData, updateFormData } = useFeasibility();

  const inputClass = "w-full border border-thistle-black/10 rounded-xl px-4 py-3 text-sm bg-white focus:border-thistle-pink focus:ring-1 focus:ring-thistle-pink/20 outline-none transition-colors placeholder:text-thistle-black/25";

  return (
    <div>
      <h3 className="text-fluid-h5 font-medium tracking-tight text-thistle-black mb-fl-1">Tell us about the building.</h3>
      <p className="text-fluid-sm text-thistle-black/40 mb-fl-5">We'll use this to scope your feasibility study.</p>

      <div className="flex flex-col gap-fl-4">
        <div>
          <label className="text-xs font-medium text-thistle-black/50 mb-fl-2 block">Property Address</label>
          <input
            type="text"
            placeholder="e.g. 42 High Street, Croydon CR0 1NA"
            value={formData.address}
            onChange={(e) => updateFormData({ address: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-xs font-medium text-thistle-black/50 mb-fl-2 block">Building Type</label>
          <div className="grid grid-cols-3 gap-fl-2">
            {buildingTypes.map((type) => (
              <button
                key={type}
                onClick={() => updateFormData({ buildingType: type })}
                className={`px-3 py-2.5 rounded-xl text-xs font-medium border transition-colors ${
                  formData.buildingType === type
                    ? 'border-thistle-pink bg-thistle-pink/5 text-thistle-black'
                    : 'border-thistle-black/[0.06] text-thistle-black/50 hover:border-thistle-black/15'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-fl-3">
          <div>
            <label className="text-xs font-medium text-thistle-black/50 mb-fl-2 block">Approx. Floor Area (sqft)</label>
            <input
              type="text"
              placeholder="e.g. 8,000"
              value={formData.approximateFloorArea}
              onChange={(e) => updateFormData({ approximateFloorArea: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-thistle-black/50 mb-fl-2 block">Number of Floors</label>
            <input
              type="text"
              placeholder="e.g. 3"
              value={formData.numberOfFloors}
              onChange={(e) => updateFormData({ numberOfFloors: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        <label className="flex items-center gap-fl-3 cursor-pointer">
          <div
            onClick={() => updateFormData({ hasFloorPlans: !formData.hasFloorPlans })}
            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
              formData.hasFloorPlans
                ? 'bg-thistle-green border-thistle-green'
                : 'border-thistle-black/15'
            }`}
          >
            {formData.hasFloorPlans && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <span className="text-fluid-sm text-thistle-black/60">I have existing floor plans available</span>
        </label>
      </div>
    </div>
  );
};
