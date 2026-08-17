"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../components/ui/Button';
import { ThistleLogo } from '../components/ui/ThistleLogo';
import { Reveal } from '../components/animations/Reveal';
import { useRouter } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';

const productLinks = [
  { label: "Feasibility Package", to: "/feasibility-package" },
  { label: "Case Studies", to: "/case-studies/feasibility-studies" },
  { label: "Class MA Checker", to: "/tools/class-ma-checker" },
  { label: "GDV Calculator", to: "/tools/gdv-calculator" },
];

const conversionsLinks = [
  { label: "Commercial to Residential", to: "/conversions/commercial-to-residential" },
  { label: "HMO", to: "/conversions/hmo" },
];

const companyLinks = [
  { label: "About", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Service", to: "/terms" },
  { label: "Cookie Policy", to: "/cookies" },
];

export const Footer: React.FC = () => {
  const router = useRouter();

  return (
    <footer className="bg-thistle-black text-white overflow-hidden">
      {/* CTA Section */}
      <div className="relative pt-fl-section-sm pb-fl-section-sm px-fl-margin border-b border-white/[0.06] overflow-hidden">
        {/* This band sits in the footer, so it loads on every page: it was the
            most-requested image on the site by a distance. It had no `sizes`,
            and a `fill` image without one defaults to 100vw, so Next served the
            largest variant everywhere.

            The source was also a 2400x3600 portrait sitting in a wide strip
            under a 75% black overlay, so object-cover threw most of the height
            away. It is now cropped to the part that was actually visible. */}
        <Image
          src="/images/projects/bereweeke/complete-rear.jpg"
          alt="The completed rear extension at Bereweeke Avenue, in brick with steel windows"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-thistle-black/75" />
        <div className="relative z-10 max-w-[1360px] mx-auto text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-white/40 font-semibold mb-fl-5">Get Started</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-fluid-display font-medium tracking-tighter leading-[0.95] mb-fl-6">
              Make Faster<br />Decisions.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            {/* Ed's CTA copy, from the Feasibility Example Page template. It is
                written for this band, which every page ends with. */}
            <p className="text-fluid-sm text-white/85 leading-relaxed max-w-md mx-auto mb-fl-7">
              Understand your property's design potential, planning position and principal risks before committing further time or money.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <Button
              variant="glass"
              size="lg"
              icon={<ArrowUpRight size={18} />}
              onClick={() => router.push('/feasibility-package')}
              className="!bg-thistle-green !text-black !border-thistle-green hover:!bg-thistle-green/80 hover:!border-thistle-green/80"
            >
              Book Your Feasibility
            </Button>
            <p className="text-xs text-white/60 mt-fl-4">No obligation. Response within one working day.</p>
          </Reveal>
        </div>
      </div>

      {/* Footer Grid */}
      <div className="py-fl-8 px-fl-margin">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-fl-7">
            {/* Brand + Contact Column (spans 2 on lg) */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-fl-5">
                <ThistleLogo variant="full" color="light" className="h-11" />
              </Link>
              <p className="text-fluid-base text-white/80 leading-relaxed mb-fl-5 max-w-md">
                Data-driven feasibility for commercial conversions, HMOs, and high-end residential across the UK.
              </p>
              <div className="flex flex-col gap-fl-2 text-fluid-sm text-white/70">
                {/* Swapped off hello@thistlearchitecture.co.uk on 2026-08-11.
                    That inbox was not confirmed to be monitored, and this is
                    the only address the team have confirmed they read. */}
                <a href="mailto:hello@incollective.works" className="hover:text-thistle-green transition-colors w-fit">
                  hello@incollective.works
                </a>
                {/* Real number and registered address, taken from the practice's
                    own site before the domain moved off Wix. */}
                <a href="tel:+448081755405" className="hover:text-thistle-green transition-colors w-fit">
                  0808 175 5405
                </a>
                <span>Itchen Court, Eastgate Street, Winchester, SO23 8RE</span>
                <span className="text-white/50">Mon to Fri, 9am to 6pm GMT</span>
              </div>
            </div>

            {/* Product */}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/60 font-semibold mb-fl-5">Product</p>
              <div className="flex flex-col gap-fl-3">
                {productLinks.map((link) => (
                  <Link key={link.to} href={link.to} className="text-fluid-sm text-white/80 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Conversions */}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/60 font-semibold mb-fl-5">Conversions</p>
              <div className="flex flex-col gap-fl-3">
                {conversionsLinks.map((link) => (
                  <Link key={link.to} href={link.to} className="text-fluid-sm text-white/80 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/60 font-semibold mb-fl-5">Company</p>
              <div className="flex flex-col gap-fl-3">
                {companyLinks.map((link) => (
                  <Link key={link.to} href={link.to} className="text-fluid-sm text-white/80 hover:text-white transition-colors">
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
        <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-fl-4">
          <div className="flex items-center gap-fl-3 flex-wrap">
            <ThistleLogo variant="mark" className="w-3.5 h-3.5" />
            <span className="text-xs text-white/60">&copy; 2026 Thistle Architecture Ltd. Registered in England and Wales.</span>
            <span className="text-xs text-white/40">·</span>
            <span className="text-xs text-white/60">
              Made by{' '}
              <a
                href="https://riftly.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-thistle-green transition-colors"
              >
                Riftly.ai
              </a>
            </span>
          </div>
          <div className="flex items-center gap-fl-4 flex-wrap">
            {legalLinks.map((link) => (
              <Link key={link.to} href={link.to} className="text-xs text-white/60 hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
            <span className="text-xs text-white/40">·</span>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-xs text-white/70 hover:text-white transition-colors">LinkedIn</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xs text-white/70 hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
