"use client";

import React, { useState, useMemo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Reveal } from '../../components/animations/Reveal';
import { Button } from '../../components/ui/Button';
import { ToolGate } from '../../components/ui/ToolGate';
import { pruneEmpty } from '../../lib/tina';
import { NumberInput, OutputRow, formatGBP, type OutcomeCopy } from './calcUi';

// An HMO is valued on the income it produces, not on comparable sales, so it
// needs its own model rather than the apartment GDV one. The method here is the
// one our own feasibility documents use: room rate to gross rent, an operating
// allowance for bills, management and voids, then a yield to capitalise it.
// The defaults (25% operating allowance, 8.5% yield, £30k per bed) are the
// benchmarks those documents adopt.

export type HmoBand = 'marginal' | 'viable' | 'strong';

export interface HmoInputs {
  purchasePrice: number;
  roomCount: number;
  roomRatePcm: number;
  operatingPct: number;
  yieldPct: number;
  buildCostPerRoom: number;
}

export interface HmoResult {
  grossAnnualRent: number;
  netAnnualIncome: number;
  capitalValue: number;
  totalCost: number;
  profit: number;
  profitPct: number;
  band: HmoBand;
}

export function computeHmo(inputs: HmoInputs): HmoResult {
  const grossAnnualRent = inputs.roomCount * inputs.roomRatePcm * 12;
  const netAnnualIncome = grossAnnualRent * (1 - inputs.operatingPct / 100);
  // Capitalise the net income at the target yield. Guard the divide: a zero
  // yield is meaningless rather than infinitely valuable.
  const capitalValue = inputs.yieldPct > 0 ? netAnnualIncome / (inputs.yieldPct / 100) : 0;
  const totalCost = inputs.purchasePrice + inputs.roomCount * inputs.buildCostPerRoom;
  const profit = capitalValue - totalCost;
  const profitPct = totalCost > 0 ? (profit / totalCost) * 100 : 0;
  const band: HmoBand = profitPct < 10 ? 'marginal' : profitPct < 25 ? 'viable' : 'strong';
  return { grossAnnualRent, netAnnualIncome, capitalValue, totalCost, profit, profitPct, band };
}

const DEFAULTS: HmoInputs = {
  purchasePrice: 350_000,
  roomCount: 7,
  roomRatePcm: 675,
  operatingPct: 25,
  yieldPct: 8.5,
  buildCostPerRoom: 30_000,
};

const BAND_COPY: Record<HmoBand, { label: string; body: string; bg: string; text: string }> = {
  marginal: {
    label: 'Marginal',
    body: 'Under 10% over cost. On an HMO the room count is usually what decides this, and the room count is decided by planning and space standards, not by hope. A feasibility tells you how many rooms the building will actually be allowed.',
    bg: 'bg-red-50 border-red-200',
    text: 'text-red-600',
  },
  viable: {
    label: 'Viable',
    body: 'Between 10 and 25% over cost. Workable on paper. The things that move it most are the achievable room rate and whether every room clears the local space standard, both of which a feasibility checks against real local evidence.',
    bg: 'bg-amber-50 border-amber-200',
    text: 'text-amber-600',
  },
  strong: {
    label: 'Strong',
    body: 'Over 25% over cost. Strong on these numbers, which usually means either the deal is genuinely good or the room count assumes a planning position you do not have yet. A feasibility tells you which.',
    bg: 'bg-thistle-green/[0.08] border-thistle-green/30',
    text: 'text-thistle-green',
  },
};

// The note under the inputs describes DEFAULTS above it. The two are not
// wired together — the note is CMS copy and the figures are code — so if a
// benchmark is ever revised, both have to be changed, and the field
// description in tina/collections/tool.ts says so where the editor will read
// it.
const NOTE_FALLBACK =
  'The operating allowance covers bills, management and voids. Defaults follow the benchmarks our feasibility documents use, but every one of them varies by area and product.';

interface HMOCalculatorProps {
  /** Panel headings. The input labels and units below them stay in code. */
  inputsHeading?: string;
  outputsHeading?: string;
  /** The small print under the inputs, explaining what the defaults assume. */
  note?: string;
  /**
   * CMS wording for the three verdict bands, keyed by band. Only the words:
   * which band a set of inputs lands in is computeHmo()'s decision, and the
   * 10% / 25% boundaries stay in code with it.
   */
  bands?: Partial<Record<HmoBand, OutcomeCopy>>;
  /** Label on the "Get Your Fixed Fee" button, shared with the page shell. */
  ctaLabel?: string;
  tina?: { inputsHeading?: string; outputsHeading?: string; note?: string; ctaLabel?: string };
}

export const HMOCalculator: React.FC<HMOCalculatorProps> = ({
  inputsHeading = 'Your numbers',
  outputsHeading = 'Projected outcome',
  note = NOTE_FALLBACK,
  bands,
  ctaLabel = 'Get Your Fixed Fee',
  tina,
}) => {
  const router = useRouter();
  const [inputs, setInputs] = useState<HmoInputs>(DEFAULTS);
  const result = useMemo(() => computeHmo(inputs), [inputs]);
  // Only `label` and `body` are merged in from the CMS. The colours are part of
  // the verdict rather than part of the copy, and are not an editor's to
  // change.
  const cmsBand = bands?.[result.band];
  const bandCopy = {
    ...BAND_COPY[result.band],
    ...pruneEmpty({ label: cmsBand?.label, body: cmsBand?.body }),
  };

  const update = (key: keyof HmoInputs, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section className="bg-thistle-white py-fl-section px-fl-margin">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-fl-7">
          <Reveal>
            <div className="bg-white rounded-2xl border border-thistle-black/[0.06] p-fl-7">
              <h3 className="text-fluid-h5 font-medium tracking-tight text-thistle-black mb-fl-5" data-tina-field={tina?.inputsHeading}>{inputsHeading}</h3>
              <div className="flex flex-col gap-fl-5">
                <NumberInput label="Purchase price" value={inputs.purchasePrice} prefix="£" step={10000} onChange={(n) => update('purchasePrice', n)} />
                <NumberInput label="Number of rooms" value={inputs.roomCount} step={1} onChange={(n) => update('roomCount', n)} />
                <NumberInput label="Rent per room, per month" value={inputs.roomRatePcm} prefix="£" step={25} onChange={(n) => update('roomRatePcm', n)} />
                <NumberInput label="Operating allowance" value={inputs.operatingPct} suffix="%" step={1} onChange={(n) => update('operatingPct', n)} />
                <NumberInput label="Target yield" value={inputs.yieldPct} suffix="%" step={0.5} onChange={(n) => update('yieldPct', n)} />
                <NumberInput label="Conversion cost per room" value={inputs.buildCostPerRoom} prefix="£" step={2500} onChange={(n) => update('buildCostPerRoom', n)} />
              </div>
              <p className="text-xs text-thistle-black/45 leading-relaxed mt-fl-5" data-tina-field={tina?.note}>
                {note}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-fl-4 h-full">
              <div className="bg-white rounded-2xl border border-thistle-black/[0.06] p-fl-7">
                <h3 className="text-fluid-h5 font-medium tracking-tight text-thistle-black mb-fl-5" data-tina-field={tina?.outputsHeading}>{outputsHeading}</h3>
                <div className="space-y-fl-4">
                  <OutputRow label="Gross annual rent" value={formatGBP(result.grossAnnualRent)} />
                  <ToolGate source="hmo-calculator" extra={{ inputs }}>
                    <div className="space-y-fl-4">
                      <OutputRow label="Net annual income" value={formatGBP(result.netAnnualIncome)} />
                      <OutputRow label={`Indicative value at ${inputs.yieldPct}% yield`} value={formatGBP(result.capitalValue)} />
                      <OutputRow label="Total cost (purchase + conversion)" value={formatGBP(result.totalCost)} />
                      <OutputRow label="Profit over cost" value={formatGBP(result.profit)} />
                      <OutputRow label="Profit %" value={`${result.profitPct.toFixed(1)}%`} accent />
                    </div>
                  </ToolGate>
                </div>
              </div>

              <div className={`rounded-2xl border ${bandCopy.bg} p-fl-6`}>
                {/* Markers go on the badge and the paragraph themselves, never
                    on the card around them: a marker on the wrapper would
                    capture the click meant for either. */}
                <span className={`block text-[10px] uppercase tracking-widest font-semibold mb-fl-3 ${bandCopy.text}`} data-tina-field={cmsBand?.tina?.label}>{bandCopy.label}</span>
                <p className="text-fluid-sm text-thistle-black/80 leading-relaxed mb-fl-5" data-tina-field={cmsBand?.tina?.body}>
                  {bandCopy.body}
                </p>
                <Button variant="primary" icon={<ArrowUpRight size={16} />} onClick={() => router.push('/pricing')} data-tina-field={tina?.ctaLabel}>
                  {ctaLabel}
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
