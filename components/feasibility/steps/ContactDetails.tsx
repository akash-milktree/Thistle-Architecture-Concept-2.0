"use client";

import React from 'react';
import { useFeasibility } from '../FeasibilityContext';
import { Field, inputClass } from '../FormBits';

export const ContactDetails: React.FC = () => {
  const { answers, setAnswer, errors } = useFeasibility();

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First name" error={errors.firstName}>
          <input className={inputClass} value={answers.firstName} onChange={(e) => setAnswer('firstName', e.target.value)} />
        </Field>
        <Field label="Last name" error={errors.lastName}>
          <input className={inputClass} value={answers.lastName} onChange={(e) => setAnswer('lastName', e.target.value)} />
        </Field>
      </div>

      <Field label="Email" error={errors.email}>
        <input
          type="email"
          className={inputClass}
          placeholder="you@example.com"
          value={answers.email}
          onChange={(e) => setAnswer('email', e.target.value)}
        />
      </Field>

      <Field label="Phone" error={errors.phone}>
        <input
          type="tel"
          className={inputClass}
          placeholder="07700 900000"
          value={answers.phone}
          onChange={(e) => setAnswer('phone', e.target.value)}
        />
      </Field>

      {/* Reassurance before the ask, mirrors the HMO Designers details step. */}
      <div className="rounded-xl border border-thistle-black/10 bg-white/60 px-4 py-3.5">
        <p className="text-sm text-thistle-black">Prepared by our architects</p>
        <p className="mt-1 text-xs leading-relaxed text-thistle-black/50">
          Your feasibility is prepared by the team behind hundreds of UK conversions. No obligation. Response within one working day.
        </p>
      </div>
    </div>
  );
};
