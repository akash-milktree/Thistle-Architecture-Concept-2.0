"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  className?: string;
  /** Makes the inner animation wrapper fill the Reveal's height, so
   *  children can use h-full inside stretched grid/flex layouts. */
  fullHeight?: boolean;
}

export const Reveal: React.FC<RevealProps> = ({ children, width = "100%", delay = 0, className = "", fullHeight = false }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-75px" });
  const mainControls = useAnimation();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      const timer = setTimeout(() => setRevealed(true), (delay + 0.6) * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, mainControls, delay]);

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: revealed ? "visible" : "hidden" }} className={className}>
      <motion.div
        style={fullHeight ? { height: "100%" } : undefined}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98], delay: delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};
