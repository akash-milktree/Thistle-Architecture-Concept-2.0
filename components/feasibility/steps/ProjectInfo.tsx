import React from 'react';
import { useFeasibility } from '../FeasibilityContext';

const planningRoutes = ['Class MA', 'Class O', 'Full Planning', 'Not Sure'];
const timelines = ['ASAP', '1-3 months', '3-6 months', 'Just exploring'];

export const ProjectInfo: React.FC = () => {
  const { formData, updateFormData } = useFeasibility();

  const inputClass = "w-full border border-thistle-black/10 rounded-xl px-4 py-3 text-sm bg-white focus:border-thistle-pink focus:ring-1 focus:ring-thistle-pink/20 outline-none transition-colors placeholder:text-thistle-black/25";

  return (
    <div>
      <h3 className="text-fluid-h5 font-medium tracking-tight text-thistle-black mb-fl-1">What are you looking to achieve?</h3>
      <p className="text-fluid-sm text-thistle-black/40 mb-fl-5">This helps us tailor the feasibility scope.</p>

      <div className="flex flex-col gap-fl-4">
        <div>
          <label className="text-xs font-medium text-thistle-black/50 mb-fl-2 block">Target Unit Mix</label>
          <input
            type="text"
            placeholder="e.g. 6-8 one-bed apartments"
            value={formData.targetUnitMix}
            onChange={(e) => updateFormData({ targetUnitMix: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-xs font-medium text-thistle-black/50 mb-fl-2 block">Planning Route</label>
          <div className="grid grid-cols-2 gap-fl-2">
            {planningRoutes.map((route) => (
              <button
                key={route}
                onClick={() => updateFormData({ planningRoute: route })}
                className={`px-3 py-2.5 rounded-xl text-xs font-medium border transition-colors ${
                  formData.planningRoute === route
                    ? 'border-thistle-pink bg-thistle-pink/5 text-thistle-black'
                    : 'border-thistle-black/[0.06] text-thistle-black/50 hover:border-thistle-black/15'
                }`}
              >
                {route}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-thistle-black/50 mb-fl-2 block">Timeline</label>
          <div className="grid grid-cols-2 gap-fl-2">
            {timelines.map((t) => (
              <button
                key={t}
                onClick={() => updateFormData({ timeline: t })}
                className={`px-3 py-2.5 rounded-xl text-xs font-medium border transition-colors ${
                  formData.timeline === t
                    ? 'border-thistle-pink bg-thistle-pink/5 text-thistle-black'
                    : 'border-thistle-black/[0.06] text-thistle-black/50 hover:border-thistle-black/15'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-thistle-black/50 mb-fl-2 block">Additional Notes (optional)</label>
          <textarea
            placeholder="Anything else we should know about the building or project..."
            value={formData.additionalNotes}
            onChange={(e) => updateFormData({ additionalNotes: e.target.value })}
            rows={3}
            className={inputClass + " resize-none"}
          />
        </div>
      </div>
    </div>
  );
};
