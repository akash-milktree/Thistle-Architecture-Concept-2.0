import React from 'react';
import { useFeasibility } from '../FeasibilityContext';

export const ContactDetails: React.FC = () => {
  const { formData, updateFormData } = useFeasibility();

  const inputClass = "w-full border border-thistle-black/10 rounded-xl px-4 py-3 text-sm bg-white focus:border-thistle-pink focus:ring-1 focus:ring-thistle-pink/20 outline-none transition-colors placeholder:text-thistle-black/25";

  return (
    <div>
      <h3 className="text-fluid-h5 font-medium tracking-tight text-thistle-black mb-fl-1">How can we reach you?</h3>
      <p className="text-fluid-sm text-thistle-black/40 mb-fl-5">We'll send your scope and fixed fee within 24 hours.</p>

      <div className="flex flex-col gap-fl-4">
        <div>
          <label className="text-xs font-medium text-thistle-black/50 mb-fl-2 block">Full Name</label>
          <input
            type="text"
            placeholder="e.g. James Whitfield"
            value={formData.fullName}
            onChange={(e) => updateFormData({ fullName: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-xs font-medium text-thistle-black/50 mb-fl-2 block">Email Address</label>
          <input
            type="email"
            placeholder="e.g. james@northgate.co.uk"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-xs font-medium text-thistle-black/50 mb-fl-2 block">Phone Number</label>
          <input
            type="tel"
            placeholder="e.g. 07700 900 123"
            value={formData.phone}
            onChange={(e) => updateFormData({ phone: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-xs font-medium text-thistle-black/50 mb-fl-2 block">Company (optional)</label>
          <input
            type="text"
            placeholder="e.g. Northgate Developments"
            value={formData.company}
            onChange={(e) => updateFormData({ company: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>
    </div>
  );
};
