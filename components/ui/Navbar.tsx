import React, { useState } from 'react';
import { Button } from './Button';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export const Navbar: React.FC = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    
    // Determine scrolled state for background color
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    // Determine hide/show on scroll direction
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center px-6 py-6 md:px-8 transition-colors duration-500 ${
        scrolled ? 'bg-thistle-white/90 backdrop-blur-md border-b border-thistle-black/5 py-4' : 'bg-transparent py-6'
      }`}
    >
      {/* 50/50 Grid Layout simulation for Navbar to align with Hero */}
      <div className="w-full flex items-center">
        
        {/* Left Side (Logo) - Aligns with text column */}
        <div className="w-1/2 pl-0 lg:pl-12 flex items-center">
          <div className={`flex items-center gap-2 transition-colors duration-300 ${scrolled ? 'text-thistle-black' : 'text-white'}`}>
            <div className={`w-4 h-4 rounded-sm transition-colors duration-300 ${scrolled ? 'bg-thistle-black' : 'bg-white'}`}></div>
            <span className="font-semibold tracking-tight text-lg">Thistle.</span>
          </div>
        </div>

        {/* Right Side (Links + CTA) - Aligns with image column */}
        <div className="w-1/2 flex justify-between items-center pl-4 lg:pl-0 pr-0 lg:pr-4">
          
          {/* Navigation Links - Centered or Start of right block */}
          <div className={`hidden md:flex gap-8 text-sm font-medium transition-colors duration-300 ${
            scrolled ? 'text-thistle-black/70' : 'text-white/80'
          }`}>
            <a href="#" className={`transition-colors ${scrolled ? 'hover:text-thistle-pink' : 'hover:text-thistle-pink'}`}>Process</a>
            <a href="#" className={`transition-colors ${scrolled ? 'hover:text-thistle-pink' : 'hover:text-thistle-pink'}`}>Case Studies</a>
            <a href="#" className={`transition-colors ${scrolled ? 'hover:text-thistle-pink' : 'hover:text-thistle-pink'}`}>Pricing</a>
          </div>

          {/* CTAs - Far Right */}
          <div className={`flex gap-4 items-center transition-colors duration-300 ml-auto ${scrolled ? 'text-thistle-black' : 'text-white'}`}>
            <span className={`hidden sm:block text-sm font-medium cursor-pointer transition-colors ${
              scrolled ? 'hover:text-thistle-green' : 'hover:text-thistle-pink'
            }`}>Login</span>
            <Button size="sm" variant={scrolled ? 'primary' : 'glass'}>Start Project</Button>
          </div>

        </div>
      </div>
    </motion.nav>
  );
};