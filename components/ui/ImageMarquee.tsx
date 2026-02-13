import React from 'react';
import { motion } from 'framer-motion';

const images = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop",
];

// Duplicate for seamless loop
const marqueeImages = [...images, ...images];

export const ImageMarquee: React.FC = () => {
  return (
    <div className="w-full overflow-hidden">
      <motion.div
        className="flex w-max gap-4 md:gap-6"
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
            className="w-[75vw] sm:w-[50vw] md:w-[35vw] lg:w-[28vw] aspect-[3/4] flex-shrink-0 rounded-2xl overflow-hidden group"
          >
            <img
              src={src}
              alt={`Thistle Project ${(index % images.length) + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
