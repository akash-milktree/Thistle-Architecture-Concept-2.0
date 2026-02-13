import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ThistleLogo } from '../components/ui/ThistleLogo';
import { Reveal } from '../components/animations/Reveal';
import { useFeasibility } from '../components/feasibility/FeasibilityContext';
import { ArrowUpRight } from 'lucide-react';

const navLinks = [
  { label: "How It Works", to: "/how-it-works" },
  { label: "Case Studies", to: "/case-studies" },
  { label: "About", to: "/about" },
  { label: "Blog", to: "/blog" },
];

const serviceLinks = [
  "Feasibility Studies",
  "Desk Studies",
  "GA Floor Plans",
  "Constraints Analysis",
];

const legalLinks = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Service", to: "/terms" },
  { label: "Cookie Policy", to: "/cookies" },
];

export const Footer: React.FC = () => {
  const { openModal } = useFeasibility();

  return (
    <footer className="bg-thistle-black text-white overflow-hidden">
      {/* CTA Section */}
      <div className="pt-fl-section-sm pb-fl-section-sm px-fl-margin border-b border-white/[0.06]">
        <div className="max-w-[1360px] mx-auto text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-white/30 font-semibold mb-fl-5">Get Started</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-fluid-display font-medium tracking-tighter leading-[0.95] mb-fl-6">
              Make faster<br />decisions.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-fluid-sm text-white/40 leading-relaxed max-w-md mx-auto mb-fl-7">
              Submit your property details and get a structured feasibility report with a clear Go/No-Go recommendation — in 5 days.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <Button
              variant="glass"
              size="lg"
              icon={<ArrowUpRight size={18} />}
              onClick={openModal}
              className="!bg-thistle-green !text-thistle-black !border-thistle-green hover:!bg-thistle-green/80 hover:!border-thistle-green/80"
            >
              Start Feasibility
            </Button>
          </Reveal>
        </div>
      </div>

      {/* Footer Grid */}
      <div className="py-fl-8 px-fl-margin">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-fl-8">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="inline-block mb-fl-5">
                <ThistleLogo variant="full" color="light" className="h-5" />
              </Link>
              <p className="text-fluid-sm text-white/30 leading-relaxed mb-fl-5">
                Data-driven feasibility for commercial-to-residential conversions across the UK.
              </p>
              <a href="mailto:hello@thistlearchitecture.co.uk" className="text-fluid-sm text-white/50 hover:text-thistle-pink transition-colors">
                hello@thistlearchitecture.co.uk
              </a>
            </div>

            {/* Navigation */}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/20 font-semibold mb-fl-5">Navigate</p>
              <div className="flex flex-col gap-fl-3">
                {navLinks.map((link) => (
                  <Link key={link.to} to={link.to} className="text-fluid-sm text-white/40 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/20 font-semibold mb-fl-5">Services</p>
              <div className="flex flex-col gap-fl-3">
                {serviceLinks.map((service) => (
                  <span key={service} className="text-fluid-sm text-white/40">
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/20 font-semibold mb-fl-5">Legal</p>
              <div className="flex flex-col gap-fl-3">
                {legalLinks.map((link) => (
                  <Link key={link.to} to={link.to} className="text-fluid-sm text-white/40 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="px-fl-margin py-fl-5 border-t border-white/[0.06]">
        <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row justify-between items-center gap-fl-4">
          <div className="flex items-center gap-2">
            <ThistleLogo variant="mark" className="w-3.5 h-3.5" />
            <span className="text-xs text-white/25">&copy; 2026 Thistle Architecture Ltd. Registered in England and Wales.</span>
          </div>
          <div className="flex items-center gap-fl-5">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-xs text-white/25 hover:text-white/50 transition-colors">LinkedIn</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xs text-white/25 hover:text-white/50 transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
