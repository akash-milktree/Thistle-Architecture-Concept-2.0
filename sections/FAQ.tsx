import React, { useState } from 'react';
import { Reveal } from '../components/animations/Reveal';
import { Button } from '../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useFeasibility } from '../components/feasibility/FeasibilityContext';

const faqs = [
  {
    question: "What types of buildings do you work with?",
    answer: "We specialise exclusively in existing commercial buildings — offices, retail units, light industrial, and mixed-use stock. Our expertise covers Class MA, Class O, and full planning applications for commercial-to-residential conversions.",
  },
  {
    question: "How long does a feasibility study take?",
    answer: "Our standard turnaround is 5 working days. Day 1–2 covers the automated desk study, Day 3–4 is the architect review, and Day 5 delivers your completed feasibility report with a clear Go/No-Go recommendation.",
  },
  {
    question: "What's included in the feasibility report?",
    answer: "You receive GA floor plans, a schedule of accommodation, constraints analysis, risk register, and a Go/No-Go recommendation. Everything is structured so banks, investors, and JV partners can review it immediately.",
  },
  {
    question: "How much does a feasibility study cost?",
    answer: "We operate on a fixed-fee model — no hourly rates, no scope creep. You know exactly what you're paying before we start. Pricing depends on building size and complexity. Get in touch for a quote.",
  },
  {
    question: "Do I need planning permission before ordering?",
    answer: "No. The feasibility study is designed to be done before you apply for planning — or even before you purchase the building. It tells you whether the project is viable before you commit capital.",
  },
  {
    question: "Can I use the report to raise finance?",
    answer: "Yes. Our reports are structured with commercial metrics — GDV projections, unit mixes, efficiency ratios — that banks and investors expect to see. They're designed to support funding applications and JV proposals.",
  },
  {
    question: "How do I get started?",
    answer: "Submit your property details through our portal — address, any floor plans you have, and your target unit mix. We'll confirm the scope and fee, and start work immediately once instructed.",
  },
];

export const FAQ: React.FC = () => {
  const { openModal } = useFeasibility();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-fl-section px-fl-margin bg-thistle-white">
      <div className="max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-fl-8">
          {/* Left: Header */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.2em] text-thistle-black/40 font-semibold mb-fl-5">FAQs</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black mb-fl-5">
                Answering your questions.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-fluid-sm text-thistle-black/50 leading-relaxed mb-fl-6 max-w-sm">
                Got more questions? Send us your enquiry and we'll get back to you within 24 hours.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <Button variant="primary" icon={<ArrowUpRight size={16} />} onClick={openModal}>
                Get in touch
              </Button>
            </Reveal>
          </div>

          {/* Right: Accordion */}
          <div className="flex flex-col gap-fl-3">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div
                  className={`rounded-xl border transition-colors duration-300 ${
                    openIndex === i
                      ? 'border-thistle-black/[0.1] bg-white'
                      : 'border-thistle-black/[0.06] bg-transparent hover:border-thistle-black/[0.1]'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                    className="w-full flex items-center justify-between gap-fl-4 px-fl-5 py-fl-4 text-left group"
                  >
                    <span className={`text-fluid-sm font-medium tracking-tight transition-colors duration-300 ${
                      openIndex === i ? 'text-thistle-black' : 'text-thistle-black/70 group-hover:text-thistle-black'
                    }`}>
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: openIndex === i ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                        openIndex === i
                          ? 'bg-thistle-black text-white'
                          : 'bg-thistle-black/[0.05] text-thistle-black/40'
                      }`}
                    >
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
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
                        <p className="text-fluid-sm text-thistle-black/50 leading-relaxed px-fl-5 pb-fl-4">
                          {faq.answer}
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
