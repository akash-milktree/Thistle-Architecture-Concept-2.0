"use client";

import React from 'react';
import { Home, Users, Building2, MoreHorizontal, type LucideIcon } from 'lucide-react';
import { useFeasibility } from '../FeasibilityContext';
import { PROPERTY_TYPES, PROPERTY_TYPE_SUB, type PropertyType } from '../feasibility';
import { Field, Adorned, inputClass } from '../FormBits';

const typeIcons: Record<PropertyType, LucideIcon> = {
  Residential: Home,
  'Existing HMO': Users,
  Commercial: Building2,
  Other: MoreHorizontal,
};

export const PropertyBasics: React.FC = () => {
  const { answers, setAnswer, errors } = useFeasibility();

  return (
    <div className="grid gap-5">
      <Field plain label="What type of property is this?" error={errors.propertyType}>
        <div className="grid grid-cols-2 gap-3" role="group" aria-label="Property type">
          {PROPERTY_TYPES.map((t) => {
            const selected = answers.propertyType === t;
            const Icon = typeIcons[t];
            return (
              <button
                key={t}
                type="button"
                aria-pressed={selected}
                onClick={() => setAnswer('propertyType', t)}
                className={`rounded-xl border p-4 text-left transition-colors ${
                  selected
                    ? 'border-thistle-green bg-thistle-green/10'
                    : 'border-thistle-black/10 bg-white hover:border-thistle-black/30'
                }`}
              >
                <Icon size={20} strokeWidth={1.6} className={selected ? 'text-thistle-green' : 'text-thistle-black/50'} />
                <span className="mt-3 block text-sm font-semibold text-thistle-black">{t}</span>
                <span className="mt-0.5 block text-xs text-thistle-black/50">{PROPERTY_TYPE_SUB[t]}</span>
              </button>
            );
          })}
        </div>
      </Field>

      <Field label="Property address" error={errors.address1}>
        <input
          className={inputClass}
          placeholder="Address line 1"
          value={answers.address1}
          onChange={(e) => setAnswer('address1', e.target.value)}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Town / city">
          <input className={inputClass} value={answers.city} onChange={(e) => setAnswer('city', e.target.value)} />
        </Field>
        <Field label="County">
          <input className={inputClass} value={answers.county} onChange={(e) => setAnswer('county', e.target.value)} />
        </Field>
        <Field label="Postcode" error={errors.postcode}>
          <input
            className={inputClass}
            placeholder="e.g. CR0 1NA"
            value={answers.postcode}
            onChange={(e) => setAnswer('postcode', e.target.value)}
          />
        </Field>
      </div>

      <Field label="Current estimated value" error={errors.estimatedValue}>
        <Adorned prefix="£">
          <input
            type="number"
            inputMode="numeric"
            className={`${inputClass} pl-8`}
            placeholder="250000"
            value={answers.estimatedValue}
            onChange={(e) => setAnswer('estimatedValue', e.target.value)}
          />
        </Adorned>
      </Field>

      <Field label="Rightmove link (optional)">
        <input
          className={inputClass}
          placeholder="Paste link here"
          value={answers.rightmoveLink}
          onChange={(e) => setAnswer('rightmoveLink', e.target.value)}
        />
      </Field>
    </div>
  );
};
