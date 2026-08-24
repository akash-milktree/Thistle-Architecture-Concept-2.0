"use client";

import React, { useState, useMemo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../../components/animations/Reveal';
import { Button } from '../../components/ui/Button';
import { useRouter } from 'next/navigation';
import { ToolGate } from '../../components/ui/ToolGate';
import { NumberInput, OutputRow, formatGBP } from './calcUi';

export type ViabilityBand = 'marginal' | 'viable' | 'strong';

export interface ViabilityInputs {
  purchasePrice: number;
  floorAreaSqm: number;
  unitCount: number;
  avgSalePerUnit: number;
  buildCostPerSqm: number;
}

export interface ViabilityResult {
  gdv: number;
  totalCost: number;
  marginPounds: number;
  marginPct: number;
  band: ViabilityBand;
}

// Pure helper: turns inputs into a result. Band thresholds: under 10% margin
// is marginal, 10 to 25% is viable, over 25% is strong.
export function computeViability(inputs: ViabilityInputs): ViabilityResult {
  const gdv = inputs.unitCount * inputs.avgSalePerUnit;
  const totalCost = inputs.purchasePrice + inputs.buildCostPerSqm * inputs.floorAreaSqm;
  const marginPounds = gdv - totalCost;
  const marginPct = totalCost > 0 ? (marginPounds / totalCost) * 100 : 0;
  const band: ViabilityBand = marginPct < 10 ? 'marginal' : marginPct < 25 ? 'viable' : 'strong';
  return { gdv, totalCost, marginPounds, marginPct, band };
}

const DEFAULTS: ViabilityInputs = {
  purchasePrice: 1_400_000,
  floorAreaSqm: 1_100,
  unitCount: 12,
  avgSalePerUnit: 290_000,
  buildCostPerSqm: 1_800,
};

const BAND_COPY: Record<ViabilityBand, { label: string; body: string; bg: string; text: string }> = {
  marginal: {
    label: 'Marginal',
    body: 'Margin under 10%. The deal is fragile, since small cost overruns or sale-price misses could wipe it. A feasibility runs comparables and a real risk register so you know what you are actually buying.',
    bg: 'bg-red-50 border-red-200',
    text: 'text-red-600',
  },
  viable: {
    label: 'Viable',
    body: 'Margin between 10 and 25%. The deal looks workable on paper. A feasibility confirms the GDV against local comparables and pressure-tests the build cost.',
    bg: 'bg-amber-50 border-amber-200',
    text: 'text-amber-600',
  },
  strong: {
    label: 'Strong',
    body: 'Margin over 25%. The numbers look strong, which usually means either you have a real edge, or one of your inputs is optimistic. A feasibility tells you which.',
    bg: 'bg-thistle-green/[0.08] border-thistle-green/30',
    text: 'text-thistle-green',
  },
};

export const GDVCalculator: React.FC = () => {
  const router = useRouter();
  const [inputs, setInputs] = useState<ViabilityInputs>(DEFAULTS);
  const result = useMemo(() => computeViability(inputs), [inputs]);
  const bandCopy = BAND_COPY[result.band];

  const update = (key: keyof ViabilityInputs, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section className="bg-thistle-white py-fl-section px-fl-margin">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-fl-7">
          <Reveal>
            <div className="bg-white rounded-2xl border border-thistle-black/[0.06] p-fl-7">
              <h3 className="text-fluid-h5 font-medium tracking-tight text-thistle-black mb-fl-5">Your numbers</h3>
              <div className="flex flex-col gap-fl-5">
                <NumberInput label="Purchase price" value={inputs.purchasePrice} prefix="£" step={10000} onChange={(n) => update('purchasePrice', n)} />
                <NumberInput label="Floor area" value={inputs.floorAreaSqm} suffix="sqm" step={50} onChange={(n) => update('floorAreaSqm', n)} />
                <NumberInput label="Number of units" value={inputs.unitCount} step={1} onChange={(n) => update('unitCount', n)} />
                <NumberInput label="Average sale per unit" value={inputs.avgSalePerUnit} prefix="£" step={5000} onChange={(n) => update('avgSalePerUnit', n)} />
                <NumberInput label="Build cost per sqm" value={inputs.buildCostPerSqm} prefix="£" suffix="/ sqm" step={50} onChange={(n) => update('buildCostPerSqm', n)} />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-fl-4 h-full">
              <div className="bg-white rounded-2xl border border-thistle-black/[0.06] p-fl-7">
                <h3 className="text-fluid-h5 font-medium tracking-tight text-thistle-black mb-fl-5">Projected outcome</h3>
                <div className="space-y-fl-4">
                  <OutputRow label="Projected GDV" value={formatGBP(result.gdv)} />
                  <ToolGate source="gdv-calculator" extra={{ inputs }}>
                    <div className="space-y-fl-4">
                      <OutputRow label="Total cost (purchase + build)" value={formatGBP(result.totalCost)} />
                      <OutputRow label="Margin" value={formatGBP(result.marginPounds)} />
                      <OutputRow label="Margin %" value={`${result.marginPct.toFixed(1)}%`} accent />
                    </div>
                  </ToolGate>
                </div>
              </div>

              <div className={`rounded-2xl border ${bandCopy.bg} p-fl-6`}>
                <span className={`block text-[10px] uppercase tracking-widest font-semibold mb-fl-3 ${bandCopy.text}`}>{bandCopy.label}</span>
                <p className="text-fluid-sm text-thistle-black/80 leading-relaxed mb-fl-5">
                  {bandCopy.body}
                </p>
                <Button variant="primary" icon={<ArrowUpRight size={16} />} onClick={() => router.push('/pricing')}>
                  Get Your Fixed Fee
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
