"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '../components/ui/Button';
import { ArrowUpRight, MapPin, Building2, BarChart3, FileCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Reveal } from '../components/animations/Reveal';
import { useFeasibility } from '../components/feasibility/FeasibilityContext';

export const Hero: React.FC = () => {
  const { openModal } = useFeasibility();
  return (
    <section className="relative min-h-screen bg-thistle-white text-thistle-black overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-fl-margin min-h-screen flex flex-col lg:flex-row">

      {/* Left Column: Content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center pt-fl-section pb-fl-7 lg:pt-0 relative z-10">
        <div className="max-w-xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-thistle-green/10 border border-thistle-green/20 w-fit mb-fl-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-thistle-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-thistle-green"></span>
              </span>
              <span className="text-xs font-medium text-thistle-green tracking-wide">5-day turnaround</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-fluid-h1 font-medium tracking-tighter leading-[1.05] mb-fl-5">
              From building to viable conversion<span className="text-thistle-green"> in 5 days.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-fluid-base text-thistle-black/60 leading-relaxed font-light mb-fl-4 max-w-md">
              Thistle combines proprietary data analysis with developer-led architecture to test schemes quickly and accurately.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="text-fluid-base text-thistle-black/60 leading-relaxed font-light mb-fl-7 max-w-md">
              Our feasibility system analyses planning, density, constraints, and layout potential, giving a clear Go/No-Go in days, not weeks.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-fl-4">
              <Button size="lg" variant="primary" icon={<ArrowUpRight size={18} />} onClick={openModal} className="!bg-thistle-green !text-thistle-black !border-thistle-green hover:!bg-thistle-green/80">
                Start Feasibility
              </Button>
              <Link href="/how-it-works" className="text-sm text-thistle-black/40 hover:text-thistle-black/70 transition-colors font-medium tracking-tight">
                How it works &rarr;
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Right Column: System Visual */}
      <div className="w-full lg:w-1/2 relative h-[50vh] lg:h-screen flex items-center justify-center py-fl-7 lg:py-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative w-full max-w-md"
        >
          {/* Feasibility system preview card */}
          <div className="bg-white rounded-2xl border border-thistle-black/[0.06] shadow-lg shadow-thistle-black/5 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-thistle-black/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-thistle-green" />
                <span className="text-xs font-semibold tracking-wide text-thistle-black/60 uppercase">Feasibility Report</span>
              </div>
              <span className="text-xs text-thistle-black/30">5 days</span>
            </div>

            {/* Property info row */}
            <div className="px-6 py-4 border-b border-thistle-black/[0.04]">
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={14} className="text-thistle-green" />
                <span className="text-sm font-medium">42 High Street, Croydon</span>
              </div>
              <div className="flex gap-4">
                <span className="text-xs text-thistle-black/40">Class MA</span>
                <span className="text-xs text-thistle-black/40">Office to Resi</span>
                <span className="text-xs text-thistle-black/40">12 units</span>
              </div>
            </div>

            {/* Analysis modules */}
            <div className="px-6 py-4 space-y-3">
              {[
                { icon: Building2, label: "Planning analysis", status: "Complete", color: "bg-thistle-green" },
                { icon: BarChart3, label: "Financial viability", status: "Complete", color: "bg-thistle-green" },
                { icon: FileCheck, label: "Layout optimisation", status: "Complete", color: "bg-thistle-green" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.15, duration: 0.4 }}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-thistle-black/[0.03] flex items-center justify-center">
                      <item.icon size={16} className="text-thistle-black/50" />
                    </div>
                    <span className="text-sm text-thistle-black/70">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                    <span className="text-xs text-thistle-black/40">{item.status}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Result banner */}
            <div className="px-6 py-4 bg-thistle-green/10 border-t border-thistle-green/20">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold tracking-wide text-thistle-green uppercase">Recommendation</span>
                  <p className="text-lg font-medium text-thistle-black mt-0.5">Go — Viable scheme</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-thistle-green/20 flex items-center justify-center">
                  <FileCheck size={18} className="text-thistle-green" />
                </div>
              </div>
            </div>
          </div>

        </motion.div>
      </div>

      </div>
    </section>
  );
};
