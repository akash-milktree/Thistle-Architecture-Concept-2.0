"use client";

import React, { useMemo, useState } from 'react';
import { ArrowUpRight, ArrowLeft, RotateCcw, Check, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '../../components/animations/Reveal';
import { Button } from '../../components/ui/Button';
import {
  getFeasibilityRoute,
  type ProjectInput,
  type HeritageGrade,
  type ProjectType,
} from '../../data/pricingData';

// The questionnaire from section 4 of Ed's pricing brief.
//
// The order matters and is his: address first, then the things that can stop
// pricing entirely, then the things that only adjust it. A hard stop is never
// shown as a price and then withdrawn, because the whole point of the routing
// is that Thistle never quotes a number for a scope it has not seen.

interface Answers {
  gia: string;
  giaUnknown: boolean;
  existingUse: string;
  proposedUse: string;
  buildings: string;
  newBuild: string;
  options: string;
  heritage: HeritageGrade;
  extension: boolean;
  specialConstraint: boolean;
  masterplan: boolean;
  info: string;
}

const EMPTY: Answers = {
  gia: '',
  giaUnknown: false,
  existingUse: '',
  proposedUse: '',
  buildings: '',
  newBuild: '',
  options: '',
  heritage: 'none',
  extension: false,
  specialConstraint: false,
  masterplan: false,
  info: '',
};

const EXISTING_USES = [
  { value: 'residential', label: 'Residential' },
  { value: 'hmo', label: 'HMO' },
  { value: 'office', label: 'Office' },
  { value: 'retail', label: 'Retail' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'hospitality', label: 'Hospitality' },
  { value: 'care', label: 'Care' },
  { value: 'mixed_use', label: 'Mixed use' },
  { value: 'other', label: 'Other' },
  { value: 'land', label: 'Land' },
];

const PROPOSED_USES = [
  { value: 'hmo', label: 'HMO' },
  { value: 'apartments', label: 'Apartments' },
  { value: 'residential_conversion', label: 'Residential conversion' },
  { value: 'mixed_use', label: 'Mixed use' },
  { value: 'extension', label: 'Extension' },
  { value: 'commercial_conversion', label: 'Commercial conversion' },
  { value: 'new_build', label: 'New build' },
  { value: 'not_sure', label: 'Not sure' },
];

/** Maps the questionnaire to the engine's input, per the brief's routing notes. */
function toProject(a: Answers): ProjectInput {
  const proposedIsStop = ['new_build', 'not_sure'].includes(a.proposedUse);
  let projectType: ProjectType = 'conversion';
  if (a.existingUse === 'land') projectType = 'vacant_land';
  else if (a.proposedUse === 'new_build' || a.newBuild === 'significant') projectType = 'new_build_development';
  else if (a.proposedUse === 'mixed_use') projectType = 'mixed_use';
  else if (a.proposedUse === 'extension') projectType = 'extension';

  return {
    gia: a.giaUnknown || !a.gia ? null : Number(a.gia),
    projectType,
    numberOfBuildings: a.buildings === '3plus' ? 3 : a.buildings === '2' ? 2 : 1,
    isMasterplan: a.masterplan,
    heritageGrade: a.heritage,
    // "1 preferred" is 1, "+1 alternative" is 2, "several" is 3+.
    numberOfDevelopmentStrategies: a.options === 'several' ? 3 : a.options === 'alternative' ? 2 : 1,
    sufficientExistingInformation: a.info === 'yes',
    proposedUseKnown: !!a.proposedUse && !proposedIsStop,
    mixedUse: a.proposedUse === 'mixed_use' || a.existingUse === 'mixed_use',
    significantExtension: a.extension,
    additionalDesignOption: a.options === 'alternative',
    specialPlanningConstraint: a.specialConstraint,
  };
}

const Field: React.FC<{ label: string; hint?: string; children: React.ReactNode }> = ({ label, hint, children }) => (
  <div className="mb-fl-5">
    <p className="text-fluid-sm font-medium text-thistle-black mb-fl-1">{label}</p>
    {hint && <p className="text-xs text-thistle-black/45 mb-fl-3">{hint}</p>}
    {children}
  </div>
);

const Choice: React.FC<{
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}> = ({ options, value, onChange }) => (
  <div className="flex flex-wrap gap-fl-2">
    {options.map((o) => (
      <button
        key={o.value}
        type="button"
        onClick={() => onChange(o.value)}
        aria-pressed={value === o.value}
        className={`px-4 py-2 rounded-full text-xs font-medium border transition-colors ${
          value === o.value
            ? 'bg-thistle-black text-white border-thistle-black'
            : 'bg-white text-thistle-black/60 border-thistle-black/[0.08] hover:border-thistle-black/25'
        }`}
      >
        {o.label}
      </button>
    ))}
  </div>
);

const Toggle: React.FC<{ label: string; checked: boolean; onChange: (v: boolean) => void }> = ({
  label,
  checked,
  onChange,
}) => (
  <label className="flex items-start gap-fl-3 cursor-pointer py-fl-2">
    <span
      className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
        checked ? 'bg-thistle-green border-thistle-green' : 'bg-white border-thistle-black/15'
      }`}
    >
      {checked && <Check size={13} className="text-white" strokeWidth={3} />}
    </span>
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="sr-only"
    />
    <span className="text-fluid-sm text-thistle-black/70 leading-snug">{label}</span>
  </label>
);

export const FeasibilityCalculator: React.FC = () => {
  const [a, setA] = useState<Answers>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [checkout, setCheckout] = useState<'idle' | 'working' | 'error'>('idle');

  const handleCheckout = async () => {
    setCheckout('working');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project: toProject(a) }),
      });
      const data = await res.json();
      if (data.route === 'payment' && data.url) {
        window.location.href = data.url;
        return;
      }
      // Either payment is not switched on yet, or the server disagreed and
      // routed this to an Expert Session. Both go to the enquiry form with the
      // answers intact rather than leaving the person on a dead button.
      window.location.href = '/feasibility-package#book';
    } catch {
      setCheckout('error');
    }
  };
  const set = <K extends keyof Answers>(k: K, v: Answers[K]) => setA((s) => ({ ...s, [k]: v }));

  const ready =
    (a.giaUnknown || !!a.gia) && !!a.existingUse && !!a.proposedUse && !!a.buildings && !!a.options && !!a.info;

  const result = useMemo(() => (submitted ? getFeasibilityRoute(toProject(a)) : null), [submitted, a]);

  if (result) {
    const instant = result.route === 'instant_payment';
    return (
      <Reveal>
        <div
          className={`rounded-2xl border p-fl-7 ${
            instant ? 'border-thistle-green/30 bg-thistle-green/[0.06]' : 'border-thistle-black/[0.08] bg-white'
          }`}
        >
          {instant ? (
            <>
              <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-thistle-green mb-fl-4">
                Your feasibility fee
              </p>
              <p className="text-fluid-display font-medium tracking-tight text-thistle-black leading-none mb-fl-4">
                £{result.price}
              </p>
              <p className="text-fluid-base text-thistle-black/80 leading-relaxed mb-fl-2 max-w-xl">
                A fixed fee, inclusive of everything in the Architectural Feasibility. Delivered in five working days.
              </p>
              {result.uplift > 0 && (
                <p className="text-xs text-thistle-black/50 mb-fl-6">
                  £{result.base} for the floor area, plus £{result.uplift} for the complexity you described.
                </p>
              )}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-fl-4">
                {/* Posts the answers, not the price. The server recalculates
                    and charges its own number, because the one on screen is a
                    value the customer controls. Until Stripe keys are set the
                    route answers "payment_unavailable" and this falls back to
                    the enquiry form rather than dropping someone who has
                    already reached a price. */}
                <Button
                  variant="primary"
                  icon={<ArrowUpRight size={16} />}
                  onClick={handleCheckout}
                  disabled={checkout === 'working'}
                >
                  {checkout === 'working' ? 'One moment…' : 'Continue'}
                </Button>
                <button
                  onClick={() => setSubmitted(false)}
                  className="inline-flex items-center gap-2 text-sm text-thistle-black/60 hover:text-thistle-black transition-colors font-medium"
                >
                  <ArrowLeft size={14} /> Change my answers
                </button>
              </div>
              {checkout === 'error' && (
                <p className="text-xs text-red-700 mt-fl-3" role="alert">
                  Something went wrong. Please try again, or book an Expert Session and we will pick it up.
                </p>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center gap-fl-3 mb-fl-4 text-thistle-black/60">
                <MessageSquare size={22} />
                <span className="text-[11px] uppercase tracking-[0.2em] font-semibold">Worth a conversation</span>
              </div>
              <h3 className="text-fluid-h3 font-medium tracking-tight leading-tight text-thistle-black mb-fl-4">
                This project needs a closer look.
              </h3>
              <p className="text-fluid-base text-thistle-black/80 leading-relaxed mb-fl-2 max-w-xl">
                {result.reason} Based on what you have told us, a short conversation before we define the
                feasibility scope will give you a better answer than an automatic price would.
              </p>
              <p className="text-xs text-thistle-black/50 mb-fl-6">
                Your answers are kept, so you will not be asked for them again.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-fl-4">
                {/* Button is a <button>, not a link, so navigation goes through
                    Link rather than an unsupported href prop. */}
                <Link href="/contact">
                  <Button variant="primary" icon={<ArrowUpRight size={16} />}>
                    Book a free Expert Session
                  </Button>
                </Link>
                <button
                  onClick={() => setSubmitted(false)}
                  className="inline-flex items-center gap-2 text-sm text-thistle-black/60 hover:text-thistle-black transition-colors font-medium"
                >
                  <ArrowLeft size={14} /> Change my answers
                </button>
              </div>
            </>
          )}
          <button
            onClick={() => { setA(EMPTY); setSubmitted(false); }}
            className="mt-fl-6 inline-flex items-center gap-2 text-xs text-thistle-black/40 hover:text-thistle-black transition-colors"
          >
            <RotateCcw size={12} /> Start over
          </button>
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal>
      <div className="rounded-2xl border border-thistle-black/[0.08] bg-white p-fl-7">
        <Field label="Roughly how big is the existing building?" hint="Gross internal area across all floors, in m².">
          <div className="flex flex-wrap items-center gap-fl-3">
            <input
              type="number"
              inputMode="numeric"
              min={1}
              value={a.gia}
              disabled={a.giaUnknown}
              onChange={(e) => set('gia', e.target.value)}
              placeholder="e.g. 240"
              className="w-40 border border-thistle-black/10 rounded-full px-4 py-2.5 text-sm bg-thistle-white/50 focus:border-thistle-green focus:ring-1 focus:ring-thistle-green/20 outline-none transition-colors disabled:opacity-40 placeholder:text-thistle-black/25"
            />
            <Toggle label="I do not know" checked={a.giaUnknown} onChange={(v) => set('giaUnknown', v)} />
          </div>
        </Field>

        <Field label="What is it now?">
          <Choice options={EXISTING_USES} value={a.existingUse} onChange={(v) => set('existingUse', v)} />
        </Field>

        <Field label="What do you want it to become?">
          <Choice options={PROPOSED_USES} value={a.proposedUse} onChange={(v) => set('proposedUse', v)} />
        </Field>

        <Field label="How many separate buildings?">
          <Choice
            options={[
              { value: '1', label: 'One' },
              { value: '2', label: 'Two' },
              { value: '3plus', label: 'Three or more' },
            ]}
            value={a.buildings}
            onChange={(v) => set('buildings', v)}
          />
        </Field>

        <Field label="How many design options would you like tested?">
          <Choice
            options={[
              { value: 'one', label: 'One preferred option' },
              { value: 'alternative', label: 'Plus one alternative' },
              { value: 'several', label: 'Several' },
            ]}
            value={a.options}
            onChange={(v) => set('options', v)}
          />
        </Field>

        <Field label="Heritage status">
          <Choice
            options={[
              { value: 'none', label: 'None' },
              { value: 'conservation_area', label: 'Conservation Area' },
              { value: 'Grade II', label: 'Grade II listed' },
              { value: 'Grade II*', label: 'Grade II* listed' },
              { value: 'Grade I', label: 'Grade I listed' },
            ]}
            value={a.heritage}
            onChange={(v) => set('heritage', v as HeritageGrade)}
          />
        </Field>

        <Field
          label="Do you have enough on the existing building?"
          hint="Plans, surveys, brochures, photos or planning history that show what is there now."
        >
          <Choice
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'Not really' },
            ]}
            value={a.info}
            onChange={(v) => set('info', v)}
          />
        </Field>

        <Field label="Anything else that applies?">
          <div className="space-y-fl-1">
            <Toggle
              label="The scheme includes a significant extension"
              checked={a.extension}
              onChange={(v) => set('extension', v)}
            />
            <Toggle
              label="There is a significant planning constraint, such as flood risk or an Article 4 direction"
              checked={a.specialConstraint}
              onChange={(v) => set('specialConstraint', v)}
            />
            <Toggle
              label="This is a masterplan or a whole-site redevelopment"
              checked={a.masterplan}
              onChange={(v) => set('masterplan', v)}
            />
          </div>
        </Field>

        <div className="pt-fl-4 border-t border-thistle-black/[0.06] flex flex-col sm:flex-row sm:items-center gap-fl-4">
          <Button
            variant="primary"
            icon={<ArrowUpRight size={16} />}
            onClick={() => setSubmitted(true)}
            disabled={!ready}
          >
            Get my instant price
          </Button>
          <p className="text-xs text-thistle-black/45 max-w-sm">
            No payment yet. Larger or more involved projects route to a free Expert Session rather than an
            automatic price.
          </p>
        </div>
      </div>
    </Reveal>
  );
};
