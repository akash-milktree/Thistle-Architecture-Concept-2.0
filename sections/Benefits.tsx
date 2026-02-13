import React, { useState, useRef, useEffect } from 'react';
import { Reveal } from '../components/animations/Reveal';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Search, ClipboardCheck, LayoutGrid, ShieldCheck, PenTool } from 'lucide-react';

const services = [
  {
    icon: <FileText size={20} />,
    title: "Feasibility Reports",
    desc: "A comprehensive Go/No-Go report covering planning constraints, structural considerations, unit mix options, and commercial viability — everything a developer needs to make a confident decision.",
  },
  {
    icon: <Search size={20} />,
    title: "Desk Studies",
    desc: "Automated data gathering across planning portals, land registry, and environmental databases. We surface the constraints that matter before you commit capital.",
  },
  {
    icon: <ClipboardCheck size={20} />,
    title: "Planning Analysis",
    desc: "Class MA, Class O, and full planning assessments. We identify the most viable route to consent and flag risks that could delay or block your project.",
  },
  {
    icon: <LayoutGrid size={20} />,
    title: "Accommodation Schedules",
    desc: "Detailed unit mixes, floor areas, and efficiency ratios that maximise GDV while meeting minimum space standards and building regulations.",
  },
  {
    icon: <ShieldCheck size={20} />,
    title: "Risk Assessments",
    desc: "Structural, environmental, and commercial risk registers that give you and your investors clarity on what you're walking into.",
  },
  {
    icon: <PenTool size={20} />,
    title: "Architect Reviews",
    desc: "Every feasibility is reviewed by a qualified architect who pressure-tests layouts, identifies buildability issues, and validates the commercial assumptions.",
  },
];

export const Benefits: React.FC = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const accordionRef = useRef<HTMLDivElement>(null);
  const [accordionHeight, setAccordionHeight] = useState<number | null>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (accordionRef.current) {
        setAccordionHeight(accordionRef.current.offsetHeight);
      }
    };
    updateHeight();
    // Re-measure after accordion animations settle
    const timer = setTimeout(updateHeight, 400);
    return () => clearTimeout(timer);
  }, [openIndex]);

  return (
    <section className="py-fl-section px-fl-margin bg-thistle-white">
      <div className="max-w-[1360px] mx-auto">
        {/* Centered Header */}
        <div className="text-center mb-fl-8">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-thistle-black/40 font-semibold mb-fl-5">Services</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black mb-fl-5">
              What we do
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-fluid-sm text-thistle-black/50 leading-relaxed max-w-xl mx-auto">
              Everything a developer needs to assess an existing building — structured, fast, and commercially focused.
            </p>
          </Reveal>
        </div>

        {/* Two-Column: Image + Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-fl-5 items-start">
          {/* Left: Image — height matches accordion */}
          <Reveal>
            <div
              className="rounded-2xl overflow-hidden transition-all duration-300"
              style={{ height: accordionHeight ? `${accordionHeight}px` : 'auto', minHeight: '400px' }}
            >
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop"
                alt="Commercial building exterior"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>

          {/* Right: Accordion */}
          <div ref={accordionRef} className="flex flex-col">
            {services.map((service, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="border-b border-thistle-black/[0.08] last:border-b-0">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                    className="w-full flex items-center gap-fl-4 py-5 text-left group"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                      openIndex === i
                        ? 'bg-thistle-green/15 text-thistle-green'
                        : 'bg-thistle-black/[0.04] text-thistle-black/40 group-hover:bg-thistle-black/[0.07]'
                    }`}>
                      {service.icon}
                    </div>
                    <span className={`text-fluid-h6 font-medium tracking-tight flex-1 transition-colors duration-300 ${
                      openIndex === i ? 'text-thistle-black' : 'text-thistle-black/60 group-hover:text-thistle-black'
                    }`}>
                      {service.title}
                    </span>
                    <motion.div
                      animate={{ rotate: openIndex === i ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                        openIndex === i
                          ? 'bg-thistle-black text-white'
                          : 'bg-thistle-black/[0.05] text-thistle-black/40 group-hover:bg-thistle-black/[0.08]'
                      }`}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-fluid-sm text-thistle-black/50 leading-relaxed pl-14 pb-5 max-w-md">
                          {service.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
