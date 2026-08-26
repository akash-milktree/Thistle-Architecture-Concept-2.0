"use client";

import React from 'react';
import { Reveal } from '../components/animations/Reveal';
import { feasibilityLayers } from '../data/feasibilityLayers';
import { InlineCTA } from '../components/ui/InlineCTA';

// The six data layers, drawn rather than photographed. Ed asked on 5 August for
// these diagrams back: he called the photographic versions that replaced them
// "ugly because they're not very coordinated", which they were, being six
// unrelated stock shots standing in for six specific pieces of analysis.
//
// Restored from the versions removed in 8b43569, unchanged. They are drawn from
// the brand palette and each one shows the actual output of its layer, so they
// coordinate by construction in a way six photographs never did.
//
// Layout is unchanged: the same card grid the photographs sat in. The diagrams
// were drawn for a square container about 600px across and carry labelling at 9
// and 10px, so read them at this size before trusting them here.

// ─── Layer 01: Planning history ──────────
const GraphicPlanning: React.FC = () => {
  const statusColor = (s: 'approved' | 'refused' | 'pending') =>
    s === 'approved' ? 'bg-thistle-green' : s === 'refused' ? 'bg-red-400' : 'bg-amber-400';
  return (
    <div className="w-full h-full flex flex-col justify-center bg-white rounded-2xl border border-thistle-black/[0.06] shadow-sm shadow-thistle-black/[0.03] p-fl-6">
      <div className="flex items-center justify-between mb-fl-4">
        <span className="text-[10px] uppercase tracking-wider text-thistle-black/40 font-semibold">Local planning history · 5 years</span>
        <span className="text-[10px] text-thistle-green font-medium">6 approved · 1 pending · 1 refused</span>
      </div>
      <div className="relative h-24">
        <div className="absolute left-0 right-0 top-1/2 h-px bg-thistle-black/[0.08]" />
        {([
          { x: 8, status: 'approved', label: "2021" },
          { x: 22, status: 'approved', label: "" },
          { x: 35, status: 'refused', label: "2022" },
          { x: 48, status: 'approved', label: "" },
          { x: 60, status: 'approved', label: "2023" },
          { x: 72, status: 'pending', label: "" },
          { x: 84, status: 'approved', label: "2024" },
          { x: 94, status: 'approved', label: "" },
        ] as const).map((m, i) => (
          <div key={i} className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2" style={{ left: `${m.x}%` }}>
            <div className={`w-2 h-2 rounded-full ${statusColor(m.status)} ring-4 ring-white`} />
            {m.label && <span className="absolute top-4 left-1/2 -translate-x-1/2 text-[9px] text-thistle-black/40">{m.label}</span>}
          </div>
        ))}
      </div>
      <div className="mt-fl-5 pt-fl-4 border-t border-thistle-black/[0.06] flex items-center gap-4 text-[10px] text-thistle-black/50">
        <span className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-thistle-green" />Approved</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" />Pending</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-red-400" />Refused</span>
      </div>
    </div>
  );
};

// ─── Layer 02: Local authority constraints ──────────
const GraphicConstraints: React.FC = () => (
  <div className="w-full h-full flex flex-col bg-white rounded-2xl border border-thistle-black/[0.06] shadow-sm shadow-thistle-black/[0.03] p-fl-4 overflow-hidden">
    <div className="relative flex-1 bg-thistle-white rounded-xl overflow-hidden">
      <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <path d="M 20 60 L 90 30 L 170 40 L 240 20 L 340 50 L 380 110 L 360 200 L 320 260 L 220 280 L 120 270 L 50 220 L 20 150 Z" fill="#F5F4EF" stroke="#2F3B36" strokeWidth="1" strokeOpacity="0.3" />
        <path d="M 80 80 L 160 70 L 200 110 L 180 170 L 100 180 L 60 130 Z" fill="#DAAEBB" fillOpacity="0.35" stroke="#DAAEBB" strokeWidth="1.5" strokeDasharray="4 3" />
        <path d="M 220 90 L 300 100 L 320 160 L 280 210 L 200 200 L 210 140 Z" fill="#8F9952" fillOpacity="0.25" stroke="#8F9952" strokeWidth="1.5" strokeDasharray="4 3" />
        <circle cx="170" cy="140" r="8" fill="#2F3B36" />
        <circle cx="170" cy="140" r="3" fill="white" />
        <text x="120" y="130" fontSize="10" fill="#2F3B36" fontFamily="sans-serif" opacity="0.7">Article 4</text>
        <text x="248" y="155" fontSize="10" fill="#2F3B36" fontFamily="sans-serif" opacity="0.7">Conservation</text>
      </svg>
    </div>
    <div className="mt-fl-3 flex items-center justify-between px-fl-2">
      <span className="text-[10px] uppercase tracking-wider text-thistle-black/40 font-semibold">Constraint layers</span>
      <span className="text-[10px] text-thistle-black/60">Subject site flagged</span>
    </div>
  </div>
);

// ─── Layer 03: Density & housing analysis ──────────
const GraphicDensity: React.FC = () => {
  // Indices on a 16-col × 10-row grid (160 cells). Site marker at row 4, col 8 → 4*16+8 = 72.
  const SITE = 72;
  const HMO_CELLS = new Set([3, 17, 28, 36, 49, 57, 65, 81, 94, 103, 118, 127, 134, 146]);
  const FAMILY_CELLS = new Set([6, 11, 20, 25, 33, 41, 52, 60, 71, 83, 90, 98, 107, 113, 121, 137, 142, 151]);
  return (
    <div className="w-full h-full flex flex-col justify-center bg-white rounded-2xl border border-thistle-black/[0.06] shadow-sm shadow-thistle-black/[0.03] p-fl-6">
      <div className="mb-fl-4 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wider text-thistle-black/40 font-semibold">HMO density · 1km</span>
        <span className="text-[10px] text-red-500 font-medium">Over threshold</span>
      </div>
      <div className="grid gap-[1.5px] aspect-[16/10]" style={{ gridTemplateColumns: 'repeat(16, minmax(0, 1fr))' }}>
        {Array.from({ length: 160 }).map((_, i) => {
          const row = Math.floor(i / 16);
          const col = i % 16;
          const dx = col - 7.5;
          const dy = row - 4.5;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const opacity = Math.max(0.08, 0.65 - dist * 0.06);
          if (i === SITE) {
            return (
              <div
                key={i}
                className="rounded-[1px] bg-thistle-green ring-2 ring-thistle-black/80"
                style={{ opacity: 1 }}
              />
            );
          }
          if (HMO_CELLS.has(i)) {
            return <div key={i} className="rounded-[1px] bg-red-400" style={{ opacity: 0.85 }} />;
          }
          if (FAMILY_CELLS.has(i)) {
            return <div key={i} className="rounded-[1px] bg-amber-300" style={{ opacity: 0.8 }} />;
          }
          return <div key={i} className="rounded-[1px] bg-thistle-green" style={{ opacity }} />;
        })}
      </div>
      {/* Scale bar */}
      <div className="mt-fl-3 flex items-center gap-2">
        <div className="h-px bg-thistle-black/40 flex-1 max-w-[60px]" />
        <span className="text-[9px] uppercase tracking-wider text-thistle-black/50 font-semibold">100m</span>
      </div>
      <div className="mt-fl-3 pt-fl-3 border-t border-thistle-black/[0.06] flex items-center justify-between gap-3 text-[10px]">
        <div className="flex items-center gap-3 text-thistle-black/50">
          <span className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-[1px] bg-red-400" />HMO</span>
          <span className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-[1px] bg-amber-300" />Family</span>
          <span className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-[1px] bg-thistle-green" />Residential</span>
        </div>
        <span className="text-red-500 font-semibold">22 HMOs · over cap</span>
      </div>
    </div>
  );
};

// ─── Layer 04: Comparable schemes ──────────
const GraphicComparables: React.FC = () => (
  <div className="w-full h-full flex flex-col justify-center gap-3">
    {[
      { addr: "14 Mitcham Lane", type: "Class MA", units: "8", gdv: "£2.1M", dist: "0.3 mi" },
      { addr: "221 Purley Way", type: "Class MA", units: "12", gdv: "£3.4M", dist: "0.8 mi" },
      { addr: "88 Brighton Rd", type: "Full planning", units: "10", gdv: "£2.8M", dist: "1.2 mi" },
    ].map((c, i) => (
      <div key={i} className="bg-white rounded-xl border border-thistle-black/[0.06] shadow-sm shadow-thistle-black/[0.03] p-fl-4 flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-thistle-black truncate">{c.addr}</span>
            <span className="text-[10px] text-thistle-black/40 flex-shrink-0">· {c.dist}</span>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-thistle-black/40">{c.type}</span>
        </div>
        <div className="flex gap-fl-4 flex-shrink-0">
          <div className="text-right">
            <div className="text-[9px] uppercase tracking-wider text-thistle-black/40 font-semibold">Units</div>
            <div className="text-sm font-semibold text-thistle-black">{c.units}</div>
          </div>
          <div className="text-right">
            <div className="text-[9px] uppercase tracking-wider text-thistle-black/40 font-semibold">GDV</div>
            <div className="text-sm font-semibold text-thistle-green">{c.gdv}</div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// ─── Layer 05: GDV & viability ──────────
const GraphicGDV: React.FC = () => (
  <div className="w-full h-full flex flex-col justify-center bg-white rounded-2xl border border-thistle-black/[0.06] shadow-sm shadow-thistle-black/[0.03] p-fl-6">
    <div className="mb-fl-4 flex items-center justify-between">
      <span className="text-[10px] uppercase tracking-wider text-thistle-black/40 font-semibold">Financial summary</span>
      <span className="text-[10px] text-thistle-green font-medium">Viable · 24% margin</span>
    </div>
    <div className="space-y-fl-3">
      {[
        { label: "Purchase price", value: "£1.4M", bar: 35 },
        { label: "Build cost (est.)", value: "£1.1M", bar: 28 },
        { label: "Projected GDV", value: "£3.2M", bar: 80, accent: true },
      ].map((row, i) => (
        <div key={i}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-thistle-black/60">{row.label}</span>
            <span className={`text-sm font-semibold ${row.accent ? 'text-thistle-green' : 'text-thistle-black'}`}>{row.value}</span>
          </div>
          <div className="h-1.5 bg-thistle-black/[0.05] rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${row.accent ? 'bg-thistle-green' : 'bg-thistle-black/30'}`} style={{ width: `${row.bar}%` }} />
          </div>
        </div>
      ))}
    </div>
    <div className="mt-fl-5 pt-fl-3 border-t border-thistle-black/[0.06] flex items-center justify-between">
      <span className="text-[10px] uppercase tracking-wider text-thistle-black/40 font-semibold">Projected margin</span>
      <span className="text-fluid-h5 font-semibold text-thistle-green tracking-tight">+24%</span>
    </div>
  </div>
);

// ─── Layer 06: Spatial layout optimisation ──────────
const GraphicLayout: React.FC = () => (
  <div className="w-full h-full flex flex-col bg-white rounded-2xl border border-thistle-black/[0.06] shadow-sm shadow-thistle-black/[0.03] overflow-hidden">
    <div className="px-fl-5 py-fl-3 border-b border-thistle-black/[0.06] flex items-center justify-between">
      <span className="text-[10px] uppercase tracking-wider text-thistle-black/40 font-semibold">Optimised layout · Level 2</span>
      <span className="text-[10px] text-thistle-black/50">8 units · 680 sqm</span>
    </div>
    <div className="p-fl-5 bg-thistle-white/50 flex-1 flex items-center">
      <svg viewBox="0 0 380 180" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        <rect x="10" y="10" width="360" height="160" fill="white" stroke="#2F3B36" strokeWidth="1.5" rx="3" />
        <rect x="16" y="82" width="348" height="18" fill="#F5F4EF" stroke="#2F3B36" strokeWidth="0.3" strokeOpacity="0.3" />
        <text x="190" y="94" textAnchor="middle" fontSize="7" fill="#71776E" fontFamily="sans-serif" letterSpacing="0.5">CORRIDOR</text>
        <rect x="170" y="16" width="40" height="22" fill="#2F3B36" fillOpacity="0.06" stroke="#2F3B36" strokeOpacity="0.25" strokeWidth="0.5" />
        <text x="190" y="30" textAnchor="middle" fontSize="6" fill="#71776E" fontFamily="sans-serif">CORE</text>
        {[
          { x: 16, w: 72, type: "1B", color: "#DAAEBB" },
          { x: 90, w: 72, type: "2B", color: "#8F9952" },
          { x: 212, w: 72, type: "1B", color: "#DAAEBB" },
          { x: 286, w: 78, type: "2B", color: "#8F9952" },
        ].map((u, i) => (
          <g key={`t${i}`}>
            <rect x={u.x} y="42" width={u.w} height="38" fill={u.color} fillOpacity="0.2" stroke={u.color} strokeWidth="0.8" />
            <text x={u.x + u.w / 2} y="64" textAnchor="middle" fontSize="9" fontWeight="500" fill="#2F3B36" fontFamily="sans-serif">{u.type}</text>
          </g>
        ))}
        {[
          { x: 16, w: 84, type: "2B", color: "#8F9952" },
          { x: 102, w: 72, type: "1B", color: "#DAAEBB" },
          { x: 190, w: 72, type: "2B", color: "#8F9952" },
          { x: 286, w: 78, type: "1B", color: "#DAAEBB" },
        ].map((u, i) => (
          <g key={`b${i}`}>
            <rect x={u.x} y="104" width={u.w} height="38" fill={u.color} fillOpacity="0.2" stroke={u.color} strokeWidth="0.8" />
            <text x={u.x + u.w / 2} y="126" textAnchor="middle" fontSize="9" fontWeight="500" fill="#2F3B36" fontFamily="sans-serif">{u.type}</text>
          </g>
        ))}
      </svg>
    </div>
    <div className="px-fl-5 py-fl-3 border-t border-thistle-black/[0.06] grid grid-cols-3 gap-2 text-[10px]">
      <div><span className="text-thistle-black/40 uppercase tracking-wider font-semibold block text-[9px]">1-bed</span><span className="text-sm font-semibold text-thistle-black">4</span></div>
      <div><span className="text-thistle-black/40 uppercase tracking-wider font-semibold block text-[9px]">2-bed</span><span className="text-sm font-semibold text-thistle-black">4</span></div>
      <div><span className="text-thistle-black/40 uppercase tracking-wider font-semibold block text-[9px]">Efficiency</span><span className="text-sm font-semibold text-thistle-green">87%</span></div>
    </div>
  </div>
);

// Bodies stay as Ed rewrote them in round 1, when the layer titles changed too.
// Graphic order follows the layer order, so each diagram sits with the analysis
// it illustrates.
// Bodies shortened for Ed's August 2026 final brief: "keep 'What Is Analysed',
// but shorten the copy and let the data/graphics do more of the work."
const rows = [
  { ...feasibilityLayers[0], body: "What has been approved, refused, or is pending nearby.", Graphic: GraphicPlanning },
  { ...feasibilityLayers[1], body: "The policy and constraints that decide whether your scheme is viable.", Graphic: GraphicConstraints },
  { ...feasibilityLayers[2], body: "Nearby conversions, unit counts, and achieved sale values.", Graphic: GraphicComparables },
  { ...feasibilityLayers[3], body: "Build cost, margin, and ROI, before you commit.", Graphic: GraphicGDV },
  { ...feasibilityLayers[4], body: "Space standards, Building Regs, and licensing for your area.", Graphic: GraphicDensity },
  { ...feasibilityLayers[5], body: "The part automation cannot do: an architect draws the layout options over your plans.", Graphic: GraphicLayout },
];

export const FeasibilityEngine: React.FC = () => {
  return (
    <section className="bg-thistle-white py-fl-section px-fl-margin">
      <div className="max-w-[1360px] mx-auto">
        {/* Header */}
        <div className="text-center mb-fl-section-sm max-w-2xl mx-auto">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-4">The Analysis</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black mb-fl-4">
              What&apos;s Included<br /><span className="text-thistle-green">In Data Analysis.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-fluid-base text-thistle-black/80 leading-relaxed">
              Hundreds of data points, cross-referenced automatically, so our architects spend their time on layouts and recommendations.
            </p>
          </Reveal>
        </div>

        {/* Card grid, as before the diagrams came back. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fl-5 mb-fl-8">
          {rows.map((row, i) => (
            <Reveal key={row.eyebrow} delay={Math.min(i * 0.06, 0.3)}>
              <div className="h-full rounded-2xl overflow-hidden bg-white border border-thistle-black/[0.06]">
                {/* The graphics inside are drawn at a fixed type size, so on a
                    320px card the 4:3 box came out shorter than its own content
                    and sliced the legend and stat rows in half. min-h wins over
                    the ratio when the ratio would be the smaller of the two, so
                    the box keeps 4:3 wherever there is room and stops shrinking
                    past the point the content fits. */}
                <div className="relative aspect-[4/3] min-h-[15rem] overflow-hidden">
                  <row.Graphic />
                </div>
                <div className="p-fl-5">
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-2">{row.eyebrow}</span>
                  <h3 className="text-fluid-h6 font-medium tracking-tight text-thistle-black mb-fl-2">{row.title}</h3>
                  <p className="text-fluid-sm text-thistle-black/65 leading-relaxed">{row.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-fl-section-sm">
            <InlineCTA href="#instant-quote" label="Get Your Instant Fixed Fee" />
          </div>
        </Reveal>
      </div>
    </section>
  );
};
