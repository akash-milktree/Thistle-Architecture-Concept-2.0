import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './Button';
import { ThistleLogo } from './ThistleLogo';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useFeasibility } from '../feasibility/FeasibilityContext';

const navLinks = [
  { label: "How It Works", path: "/how-it-works" },
  { label: "Case Studies", path: "/case-studies" },
  { label: "About", path: "/about" },
];

export const Navbar: React.FC = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { pathname } = useLocation();
  const { openModal } = useFeasibility();

  const isDarkHero = pathname === '/' || pathname === '/how-it-works';

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const showDarkMode = isDarkHero && !scrolled;

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center px-fl-margin py-6 transition-colors duration-500 ${
        scrolled || !isDarkHero
          ? 'bg-thistle-white/90 backdrop-blur-md border-b border-thistle-black/5 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-10 pl-0 lg:pl-12">
          <Link to="/">
            <ThistleLogo
              variant="full"
              color={showDarkMode ? 'light' : 'dark'}
              className="h-8 w-auto transition-all duration-300"
            />
          </Link>

          <div className={`hidden md:flex gap-fl-6 text-fluid-sm font-medium transition-colors duration-300 ${
            showDarkMode ? 'text-white/80' : 'text-thistle-black/70'
          }`}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors hover:text-thistle-pink ${
                  pathname.startsWith(link.path) ? 'text-thistle-pink' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center pr-0 lg:pr-4">
          <Button
            size="sm"
            variant={showDarkMode ? 'glass' : 'primary'}
            className={showDarkMode ? '!bg-thistle-pink !border-thistle-pink !text-thistle-black hover:!bg-thistle-pink/80 hover:!border-thistle-pink/80' : ''}
            onClick={openModal}
          >
            Start Feasibility
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};
