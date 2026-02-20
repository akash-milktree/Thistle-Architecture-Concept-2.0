import React from 'react';
import { Reveal } from '../components/animations/Reveal';
import { motion } from 'framer-motion';

const topRow = [
  {
    quote: "Thistle gives us the confidence to bid on tight deadlines. Their reports are clearer and more commercially grounded than any traditional architect we've used.",
    name: "Marcus Cole",
    role: "Director",
    company: "Sterling Property Group",
    initials: "MC",
  },
  {
    quote: "We used to wait 3 weeks for a feasibility that still left questions unanswered. Thistle delivered in 4 days with a clear Go recommendation.",
    name: "Rachel Simmons",
    role: "Acquisitions Manager",
    company: "Oakbridge Capital",
    initials: "RS",
  },
  {
    quote: "The level of detail in the risk register alone justified the fee. We avoided a building that would have cost us £200k in unforeseen structural work.",
    name: "James Whitfield",
    role: "Managing Partner",
    company: "Northgate Developments",
    initials: "JW",
  },
  {
    quote: "Their ability to blend planning constraints with commercial viability is unparalleled. Every report has been investor-ready from day one.",
    name: "Sophie Hartley",
    role: "Investment Director",
    company: "Meridian Estates",
    initials: "SH",
  },
  {
    quote: "We've instructed Thistle on 12 buildings now. The consistency and speed is something no other practice has come close to matching.",
    name: "David Okonkwo",
    role: "CEO",
    company: "Prestige Urban Living",
    initials: "DO",
  },
];

const bottomRow = [
  {
    quote: "The accommodation schedule alone saved us weeks of back-and-forth with our QS. Everything was structured exactly how our lender needed it.",
    name: "Aisha Patel",
    role: "Development Manager",
    company: "Langford Group",
    initials: "AP",
  },
  {
    quote: "We were about to exchange on a building that Thistle flagged as non-viable. That single report saved us from a £1.2m mistake.",
    name: "Tom Brennan",
    role: "Founder",
    company: "Brennan Property Co",
    initials: "TB",
  },
  {
    quote: "Fast, thorough, and commercially literate. Thistle understands what developers actually need — not what architects think we need.",
    name: "Laura Chen",
    role: "Head of Acquisitions",
    company: "Zenith Capital",
    initials: "LC",
  },
  {
    quote: "The Go/No-Go recommendation gave our board the clarity they needed. We went from feasibility to planning submission in under 3 weeks.",
    name: "Nathan Cross",
    role: "Operations Director",
    company: "Hartwell Developments",
    initials: "NC",
  },
  {
    quote: "Their desk study flagged an Article 4 direction that our solicitors had missed entirely. Worth every penny and then some.",
    name: "Priya Mehta",
    role: "Associate Director",
    company: "Beaumont Living",
    initials: "PM",
  },
];

const Stars = () => (
  <div className="flex gap-0.5 mb-fl-3">
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill="currentColor" className="text-thistle-green">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, role, company, initials }) => (
  <div className="w-[340px] flex-shrink-0 bg-white border border-thistle-black/[0.06] rounded-xl p-fl-5">
    <Stars />
    <p className="text-fluid-sm text-thistle-black/70 leading-relaxed mb-fl-5">
      "{quote}"
    </p>
    <div className="flex items-center gap-fl-3 pt-4 border-t border-thistle-black/[0.06]">
      <div className="w-9 h-9 rounded-full bg-thistle-black/[0.06] flex items-center justify-center text-[10px] font-bold text-thistle-black/50">
        {initials}
      </div>
      <div>
        <span className="block text-fluid-sm font-medium text-thistle-black">{name}</span>
        <span className="text-xs text-thistle-black/40">{role}, {company}</span>
      </div>
    </div>
  </div>
);

export const Testimonials: React.FC = () => {
  const topCards = [...topRow, ...topRow];
  const bottomCards = [...bottomRow, ...bottomRow];

  return (
    <section className="py-fl-section bg-thistle-white overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-fl-margin mb-fl-8">
        {/* Centered Header */}
        <div className="text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-thistle-black/50 font-semibold mb-fl-5">Testimonials</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black mb-fl-5">
              Hear from our clients.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-fluid-sm text-thistle-black/60 leading-relaxed max-w-xl mx-auto">
              Trusted by developers, investors, and property professionals across the UK.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Top Row — scrolls right to left */}
      <div className="mb-fl-4">
        <motion.div
          className="flex gap-fl-4 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 45,
          }}
        >
          {topCards.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </motion.div>
      </div>

      {/* Bottom Row — scrolls left to right */}
      <div>
        <motion.div
          className="flex gap-fl-4 w-max"
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 50,
          }}
        >
          {bottomCards.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
