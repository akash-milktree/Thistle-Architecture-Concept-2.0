import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({ children, width = "100%", delay = 0, className = "" }) => {
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
