import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './Button';
import { ThistleLogo } from './ThistleLogo';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useFeasibility } from '../feasibility/FeasibilityContext';
import { Menu, X, ChevronDown } from 'lucide-react';

const serviceLinks = [
  { label: "Feasibility Package", path: "/feasibility-package", desc: "Our core product — 6 deliverables in 5 days" },
  { label: "Commercial Conversions", path: "/commercial-conversions", desc: "Offices, retail, and mixed-use buildings" },
  { label: "HMOs", path: "/hmos", desc: "Licensing, density, and planning analysis" },
  { label: "High-End Residential", path: "/high-end-residential", desc: "Design-sensitive and heritage sites" },
];

const navLinks = [
  { label: "How It Works", path: "/how-it-works" },
  { label: "Case Studies", path: "/case-studies" },
  { label: "About", path: "/about" },
];

export const Navbar: React.FC = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const { openModal } = useFeasibility();

  const isDarkHero = pathname === '/' || pathname === '/how-it-works' || pathname === '/commercial-conversions' || pathname === '/hmos' || pathname === '/high-end-residential' || pathname === '/feasibility-package';

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

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

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

  const isServiceActive = serviceLinks.some(l => pathname.startsWith(l.path));

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
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              <ThistleLogo
                variant="full"
                color={showDarkMode ? 'light' : 'dark'}
                className="h-11 w-auto transition-all duration-300"
              />
            </Link>

            <div className={`hidden md:flex items-center gap-fl-6 text-fluid-sm font-medium transition-colors duration-300 ${showDarkMode ? 'text-white/80' : 'text-thistle-black/70'}`}>

              {/* Services Dropdown */}
              <div ref={servicesRef} className="relative">
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className={`flex items-center gap-1.5 transition-colors hover:text-thistle-pink ${isServiceActive ? 'text-thistle-pink' : ''}`}
                >
                  Services
                  <motion.div animate={{ rotate: servicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={14} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-0 mt-3 w-72 bg-thistle-white border border-thistle-black/[0.08] rounded-xl shadow-xl shadow-thistle-black/[0.08] overflow-hidden"
                    >
                      {serviceLinks.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={() => setServicesOpen(false)}
                          className={`flex flex-col px-4 py-3.5 hover:bg-thistle-black/[0.03] transition-colors border-b border-thistle-black/[0.04] last:border-b-0 ${pathname.startsWith(link.path) ? 'bg-thistle-black/[0.03]' : ''}`}
                        >
                          <span className={`text-sm font-medium tracking-tight ${pathname.startsWith(link.path) ? 'text-thistle-pink' : 'text-thistle-black'}`}>
                            {link.label}
                          </span>
                          <span className="text-xs text-thistle-black/40 mt-0.5">{link.desc}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Regular nav links */}
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
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
                Start Feasibility
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
              {/* Services section */}
              <div className="mb-2">
                <p className="text-[10px] uppercase tracking-widest text-thistle-black/30 font-semibold mb-3">Services</p>
                <div className="flex flex-col gap-1">
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`py-3 px-3 rounded-lg text-lg font-medium border-b border-thistle-black/5 last:border-b-0 ${pathname.startsWith(link.path) ? 'text-thistle-pink' : 'text-thistle-black'}`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-thistle-black/[0.06] my-4" />

              {/* Main nav links */}
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
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
                Start Feasibility
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
