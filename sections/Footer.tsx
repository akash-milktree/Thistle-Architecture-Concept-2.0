import React from 'react';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/animations/Reveal';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-thistle-black text-white pt-32 pb-12 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-32">
          <div className="max-w-2xl mb-12 lg:mb-0">
             <Reveal>
              <h2 className="text-6xl md:text-8xl font-medium tracking-tighter leading-[0.9] mb-8">
                Make faster<br />decisions.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl text-white/60 font-light mb-8 max-w-lg">
                Structured feasibility for existing buildings. Professional architect review. Delivered in 5 days.
              </p>
              <div className="flex gap-4">
                <Button variant="primary" className="bg-white text-thistle-black hover:bg-thistle-pink hover:text-thistle-black hover:border-thistle-pink" size="lg">Start Feasibility</Button>
              </div>
            </Reveal>
          </div>
          
          <div className="flex flex-col gap-8 text-sm text-white/40 text-right w-full lg:w-auto">
            <a href="#" className="hover:text-thistle-pink transition-colors">How it Works</a>
            <a href="#" className="hover:text-thistle-pink transition-colors">Case Studies</a>
            <a href="#" className="hover:text-thistle-pink transition-colors">Pricing</a>
            <a href="#" className="hover:text-thistle-pink transition-colors">Login</a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end border-t border-white/10 pt-8">
          <div className="flex gap-2 mb-4 md:mb-0">
             <div className="w-3 h-3 bg-thistle-green rounded-full"></div>
             <span className="text-xs uppercase tracking-widest text-white/50">Thistle Architecture</span>
          </div>
          <div className="text-xs text-white/30 flex gap-6">
            <span>© 2024 Thistle Architecture Ltd.</span>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};