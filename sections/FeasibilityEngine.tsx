"use client";

import React from 'react';
import { Reveal } from '../components/animations/Reveal';
import { motion } from 'framer-motion';
import { InlineCTA } from '../components/ui/InlineCTA';

// Each graphic is content that slots into a uniform square container
// so all six layers read with symmetric scale.

// ─── Layer 01: Planning history ──────────
const GraphicPlanning: React.FC = () => (
  <div className="w-full h-full flex flex-col justify-center bg-white rounded-2xl border border-thistle-black/[0.06] shadow-sm shadow-thistle-black/[0.03] p-fl-6">
    <div className="flex items-center justify-between mb-fl-4">
      <span className="text-[10px] uppercase tracking-wider text-thistle-black/40 font-semibold">Planning history · 5 yrs</span>
      <span className="text-[10px] text-thistle-green font-medium">8 approvals · 2 refusals</span>
    </div>
    <div className="relative h-24">
      <div className="absolute left-0 right-0 top-1/2 h-px bg-thistle-black/[0.08]" />
      {[
        { x: 8, approved: true, label: "2021" },
        { x: 22, approved: true, label: "" },
        { x: 35, approved: false, label: "2022" },
        { x: 48, approved: true, label: "" },
        { x: 60, approved: true, label: "2023" },
        { x: 72, approved: false, label: "" },
        { x: 84, approved: true, label: "2024" },
        { x: 94, approved: true, label: "" },
      ].map((m, i) => (
        <div key={i} className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2" style={{ left: `${m.x}%` }}>
          <div className={`w-2 h-2 rounded-full ${m.approved ? 'bg-thistle-green' : 'bg-red-400'} ring-4 ring-white`} />
          {m.label && <span className="absolute top-4 left-1/2 -translate-x-1/2 text-[9px] text-thistle-black/40">{m.label}</span>}
        </div>
      ))}
    </div>
    <div className="mt-fl-5 pt-fl-4 border-t border-thistle-black/[0.06] flex items-center gap-4 text-[10px] text-thistle-black/50">
      <span className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-thistle-green" />Approved</span>
      <span className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-red-400" />Refused</span>
    </div>
  </div>
);

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
const GraphicDensity: React.FC = () => (
  <div className="w-full h-full flex flex-col justify-center bg-white rounded-2xl border border-thistle-black/[0.06] shadow-sm shadow-thistle-black/[0.03] p-fl-6">
    <div className="mb-fl-4 flex items-center justify-between">
      <span className="text-[10px] uppercase tracking-wider text-thistle-black/40 font-semibold">HMO saturation · 1km</span>
      <span className="text-[10px] text-thistle-green font-medium">Under threshold</span>
    </div>
    <div className="grid grid-cols-12 gap-[2px] aspect-[12/6]">
      {Array.from({ length: 72 }).map((_, i) => {
        const row = Math.floor(i / 12);
        const col = i % 12;
        const dx = col - 5.5;
        const dy = row - 2.5;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const opacity = Math.max(0.05, 0.7 - dist * 0.1);
        const isSite = row === 2 && col === 6;
        return (
          <div
            key={i}
            className={`rounded-[1px] ${isSite ? 'bg-thistle-black' : 'bg-thistle-green'}`}
            style={{ opacity: isSite ? 1 : opacity }}
          />
        );
      })}
    </div>
    <div className="mt-fl-4 pt-fl-3 border-t border-thistle-black/[0.06] grid grid-cols-3 gap-2 text-[10px]">
      <div>
        <div className="text-thistle-black/40 uppercase tracking-wider font-semibold text-[9px]">HMOs</div>
        <div className="text-thistle-black font-semibold text-sm">18</div>
      </div>
      <div>
        <div className="text-thistle-black/40 uppercase tracking-wider font-semibold text-[9px]">Threshold</div>
        <div className="text-thistle-black font-semibold text-sm">25</div>
      </div>
      <div>
        <div className="text-thistle-black/40 uppercase tracking-wider font-semibold text-[9px]">Headroom</div>
        <div className="text-thistle-green font-semibold text-sm">28%</div>
      </div>
    </div>
  </div>
);

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

// ─── Rows config ──────────
const rows = [
  {
    eyebrow: "Layer 01",
    title: "Planning history & policy analysis",
    body: "We read five years of approvals and refusals around your site to pinpoint how local planning is actually trending, not what policy documents say.",
    Graphic: GraphicPlanning,
  },
  {
    eyebrow: "Layer 02",
    title: "Local authority constraints",
    body: "Article 4 directions, conservation areas, licensing thresholds, flood zones: every constraint that could stop your scheme, surfaced before you buy.",
    Graphic: GraphicConstraints,
  },
  {
    eyebrow: "Layer 03",
    title: "Density & housing analysis",
    body: "HMO saturation, housing demand, and local delivery targets. We tell you whether the numbers stack up before you waste a pre-app.",
    Graphic: GraphicDensity,
  },
  {
    eyebrow: "Layer 04",
    title: "Comparable schemes",
    body: "Nearby conversions, achieved unit counts, and actual sale values. Benchmarks sourced automatically, not guessed from memory.",
    Graphic: GraphicComparables,
  },
  {
    eyebrow: "Layer 05",
    title: "GDV and viability",
    body: "Build cost modelling, margin analysis, and ROI projections. A clear view of whether the deal pencils before you commit capital.",
    Graphic: GraphicGDV,
  },
  {
    eyebrow: "Layer 06",
    title: "Spatial layout optimisation",
    body: "Architect-led layout options that maximise unit yield against space standards, daylight, and circulation. Validated, not estimated.",
    Graphic: GraphicLayout,
  },
];

export const FeasibilityEngine: React.FC = () => {
  return (
    <section className="bg-white py-fl-section px-fl-margin">
      <div className="max-w-[1360px] mx-auto">
        {/* Header */}
        <div className="text-center mb-fl-section-sm max-w-2xl mx-auto">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-4">The Feasibility Engine</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black mb-fl-4">
              Six Data Layers.<br /><span className="text-thistle-green">One Clear Answer.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-fluid-base text-thistle-black/80 leading-relaxed">
              Every analysis cross-references authoritative data with architectural logic, surfacing risks, opportunities, and optimal layouts before you commit.
            </p>
          </Reveal>
        </div>

        {/* Alternating rows — text on one side, square graphic on the other */}
        <div className="space-y-fl-section-sm">
          {rows.map((row, i) => {
            const isEven = i % 2 === 0;
            return (
              <Reveal key={i} delay={0.05}>
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-fl-8 items-center ${isEven ? '' : 'lg:[&>*:first-child]:order-2'}`}>
                  {/* Content */}
                  <div className={isEven ? '' : 'lg:pl-fl-5'}>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-thistle-green font-semibold">{row.eyebrow}</span>
                    <h3 className="text-fluid-h3 font-medium tracking-tight leading-tight text-thistle-black mt-fl-3 mb-fl-4">
                      {row.title}
                    </h3>
                    <p className="text-fluid-base text-thistle-black/80 leading-relaxed max-w-md">
                      {row.body}
                    </p>
                  </div>
                  {/* Graphic — forced square for symmetry across all six rows */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className={`aspect-square w-full ${isEven ? 'lg:order-2' : ''}`}
                  >
                    <row.Graphic />
                  </motion.div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-fl-section-sm">
            <InlineCTA label="Start your feasibility" />
          </div>
        </Reveal>
      </div>
    </section>
  );
};
