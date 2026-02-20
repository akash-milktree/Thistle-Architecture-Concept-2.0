import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Reveal } from '../components/animations/Reveal';
import { useFeasibility } from '../components/feasibility/FeasibilityContext';

export const Hero: React.FC = () => {
  const { openModal } = useFeasibility();
  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row bg-thistle-black text-white overflow-hidden">

      {/* Gradient mesh overlay for depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-thistle-green/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-thistle-pink/5 rounded-full blur-[100px]" />
      </div>

      {/* Left Column: Content (50%) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-fl-margin pt-fl-section pb-fl-7 lg:pt-0 relative z-10">
        <div className="max-w-xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] backdrop-blur-sm w-fit mb-fl-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-thistle-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-thistle-green"></span>
              </span>
              <span className="text-xs font-medium text-thistle-green tracking-wide">Feasibility-first. Data-driven.</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-fluid-h1 font-medium tracking-tighter leading-[1.05] mb-fl-5">
              Know if a building works<span className="text-thistle-pink"> before you buy it.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-fluid-lg text-white/50 leading-relaxed font-light mb-fl-7 max-w-md">
              Thistle delivers fast, structured feasibility for commercial conversions, HMOs, and high-end residential. A clear Go/No-Go in 5 days — backed by data, reviewed by architects.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-fl-4">
              <Button size="lg" variant="glass" icon={<ArrowUpRight size={18} />} onClick={openModal} className="!bg-thistle-green !text-thistle-black !border-thistle-green hover:!bg-thistle-green/80 hover:!border-thistle-green/80 hover:!text-thistle-black">
                Start Feasibility
              </Button>
              <Link to="/how-it-works" className="text-sm text-white/40 hover:text-white/70 transition-colors font-medium tracking-tight">
                How it works &rarr;
              </Link>
            </div>
          </Reveal>

          {/* Floating stats row */}
          <Reveal delay={0.5}>
            <div className="flex gap-fl-6 mt-fl-8 pt-fl-6 border-t border-white/[0.06]">
              {[
                { value: "5", unit: " days", label: "to your report" },
                { value: "200+", unit: "", label: "feasibility reports" },
                { value: "7+", unit: " yrs", label: "specialist experience" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl font-medium tracking-tight text-white">
                    {stat.value}{stat.unit && <span className="text-white/50 text-sm ml-0.5">{stat.unit}</span>}
                  </span>
                  <span className="text-xs text-white/30 mt-1">{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Right Column: Image (50%) */}
      <div className="w-full lg:w-1/2 relative h-[50vh] lg:h-screen bg-thistle-black box-border lg:pt-4 lg:pr-4 lg:pb-4 lg:pl-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative w-full h-full rounded-2xl overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
            alt="Commercial Architecture Interior"
            className="w-full h-full object-cover"
          />

          {/* Gradient overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-thistle-black/30 via-transparent to-transparent" />

          {/* Floating testimonial card with metric */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="absolute bottom-6 right-6 md:bottom-8 md:right-8 max-w-[90%] md:max-w-xs"
          >
            <div className="bg-black/30 backdrop-blur-2xl border border-white/10 p-5 rounded-xl">
              <div className="flex items-center gap-fl-3 mb-fl-4 pb-fl-4 border-b border-white/[0.08]">
                <span className="text-2xl font-medium text-white tracking-tight">+4.2</span>
                <span className="text-xs text-white/50 leading-tight">avg. units unlocked<br /><span className="text-thistle-green">per project</span></span>
              </div>
              <p className="text-white/90 text-sm leading-relaxed mb-fl-4">
                "Their ability to blend planning constraints with commercial viability is unparalleled."
              </p>
              <div className="flex items-center gap-fl-3">
                <div className="w-7 h-7 rounded-full bg-thistle-green/20 flex items-center justify-center text-[10px] font-bold text-thistle-green">MC</div>
                <div className="text-xs text-white/50">
                  <span className="block text-white/80 font-medium">Marcus Cole</span>
                  Sterling Property Group
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
};
