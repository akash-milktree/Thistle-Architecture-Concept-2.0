import React from 'react';
import { motion } from 'framer-motion';

const images = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop", // Hallway/Interior
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop", // Exterior Modern
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop", // Courtyard
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop", // Bedroom
];

// Duplicate for loop
const marqueeImages = [...images, ...images];

export const ImageMarquee: React.FC = () => {
  return (
    <div className="w-full overflow-hidden bg-thistle-white">
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 40, 
        }}
      >
        {marqueeImages.map((src, index) => (
          <div 
            key={index} 
            className="w-[85vw] sm:w-[60vw] md:w-[40vw] lg:w-[30vw] aspect-[4/5] flex-shrink-0 pr-4 md:pr-8"
          >
             <div className="w-full h-full overflow-hidden relative group bg-gray-200">
                <img 
                  src={src} 
                  alt={`Thistle Project ${index}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
             </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};