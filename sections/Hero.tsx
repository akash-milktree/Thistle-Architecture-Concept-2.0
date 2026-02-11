import React from 'react';
import { Button } from '../components/ui/Button';
import { ArrowUpRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Reveal } from '../components/animations/Reveal';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row bg-thistle-black text-white overflow-hidden">
      
      {/* Left Column: Content (50%) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-32 pb-12 lg:pt-0 relative z-10">
        <div className="max-w-xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/5 backdrop-blur-sm w-fit mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-thistle-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-thistle-green"></span>
              </span>
              <span className="text-xs font-medium text-thistle-green tracking-wide">Feasibility for Developers</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-medium tracking-tighter leading-[1.05] mb-6">
              Your trusted partner for <span className="text-thistle-pink">commercial conversion.</span>
            </h1>
          </Reveal>
          
          <Reveal delay={0.2}>
            <p className="text-lg text-white/60 leading-relaxed font-light mb-10 max-w-md">
              Thistle delivers data-driven desk studies and architect reviews for commercial-to-residential projects. Fast, structured, and risk-averse.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex items-center gap-4">
              <Button size="lg" variant="glass" icon={<ArrowUpRight size={18} />}>
                Start Feasibility
              </Button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Right Column: Image (50%) */}
      {/* Added margins: pt-24 (top), pr-6 (right), pb-6 (bottom), pl-0 (left, touches center) */}
      <div className="w-full lg:w-1/2 relative h-[50vh] lg:h-screen bg-thistle-black box-border lg:pt-4 lg:pr-4 lg:pb-4 lg:pl-0">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-full h-full rounded-2xl overflow-hidden"
        >
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" 
              alt="Commercial Architecture Interior" 
              className="w-full h-full object-cover opacity-90"
            />
            
            {/* Subtle overlay to ensure text contrast if needed, though mostly visual here */}
            <div className="absolute inset-0 bg-black/10" />

            {/* Testimonial Card Overlay inside the image container */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="absolute bottom-6 right-6 md:bottom-10 md:right-10 max-w-[90%] md:max-w-sm"
            >
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-xl shadow-2xl">
                <div className="flex gap-1 mb-3 text-white">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" className="text-thistle-pink" />
                  ))}
                </div>
                <p className="text-white/95 text-sm leading-relaxed font-medium mb-4">
                  "Thistle has been a game-changer for our acquisition team. Their ability to blend planning constraints with commercial viability is unparalleled."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-thistle-green/20 flex items-center justify-center text-xs font-bold text-thistle-green">MC</div>
                  <div className="text-xs text-white/60">
                    <span className="block text-white font-medium">Marcus Cole</span>
                    Director, Sterling Property
                  </div>
                </div>
              </div>
            </motion.div>
        </motion.div>
      </div>

    </section>
  );
};