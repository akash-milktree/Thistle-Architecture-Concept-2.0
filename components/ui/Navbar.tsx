"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './Button';
import { ThistleLogo } from './ThistleLogo';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useFeasibility } from '../feasibility/FeasibilityContext';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: "Visibility Package", path: "/feasibility-package" },
  { label: "How It Works", path: "/how-it-works" },
  { label: "Our Work", path: "/case-studies" },
  { label: "About", path: "/about" },
];

export const Navbar: React.FC = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openModal } = useFeasibility();

  const isDarkHero = pathname === '/' || pathname === '/how-it-works' || pathname === '/feasibility-package';

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

  const showDarkMode = isDarkHero && !scrolled && !isMobileMenuOpen;

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center px-fl-margin py-6 transition-colors duration-500 ${scrolled || !isDarkHero || isMobileMenuOpen
            ? 'bg-thistle-white/90 backdrop-blur-md border-b border-thistle-black/5 py-4'
            : 'bg-transparent py-6'
          }`}
      >
        <div className="w-full flex items-center justify-between relative z-50">
          <div className="flex items-center gap-8 pl-0 lg:pl-12">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              <ThistleLogo
                variant="full"
                color={showDarkMode ? 'light' : 'dark'}
                className="h-11 w-auto transition-all duration-300"
              />
            </Link>

            <div className={`hidden md:flex items-center gap-fl-6 text-fluid-sm font-medium transition-colors duration-300 ${showDarkMode ? 'text-white/80' : 'text-thistle-black/70'}`}>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`transition-colors hover:text-thistle-pink ${pathname.startsWith(link.path) ? 'text-thistle-pink' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center pr-0 lg:pr-4 gap-4">
            <div className="hidden md:block">
              <Button
                size="sm"
                variant={showDarkMode ? 'glass' : 'primary'}
                className={showDarkMode ? '!bg-thistle-green !border-thistle-green !text-thistle-black hover:!bg-thistle-green/80 hover:!border-thistle-green/80' : ''}
                onClick={openModal}
              >
                Book Free Session
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 -mr-2 transition-colors ${showDarkMode ? 'text-white' : 'text-thistle-black'}`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-thistle-white pt-24 pb-8 px-6 md:hidden flex flex-col overflow-y-auto"
          >
            <div className="flex flex-col flex-1">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`py-3 px-3 rounded-lg text-lg font-medium border-b border-thistle-black/5 last:border-b-0 ${pathname.startsWith(link.path) ? 'text-thistle-pink' : 'text-thistle-black'}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-6">
              <Button
                size="lg"
                variant="primary"
                className="w-full justify-center"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openModal();
                }}
              >
                Book Free Expert Session
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
