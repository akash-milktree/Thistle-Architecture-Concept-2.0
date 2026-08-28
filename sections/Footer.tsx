"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../components/ui/Button';
import { ThistleLogo } from '../components/ui/ThistleLogo';
import { Reveal } from '../components/animations/Reveal';
import { useRouter } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { TrustpilotBadge } from '../components/ui/TrustpilotBadge';
import { pruneEmpty, telHref, normalizeImage } from '../lib/tina';
import { CookieSettingsLink } from '../components/analytics/CookieSettingsLink';

const productLinks = [
  { label: "Feasibility Package", to: "/feasibility-package" },
  { label: "Case Studies", to: "/case-studies/feasibility-studies" },
  { label: "Class MA Checker", to: "/tools/class-ma-checker" },
  { label: "GDV Calculator", to: "/tools/gdv-calculator" },
];

const conversionsLinks = [
  { label: "Commercial to Residential", to: "/conversions/commercial-to-residential" },
  { label: "HMO", to: "/conversions/hmo" },
  { label: "Co-Living & Large HMO", to: "/conversions/co-living-large-hmo" },
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

interface FooterCta {
  eyebrow: string;
  heading: string;
  body: string;
  buttonLabel: string;
  reassurance: string;
  backgroundImage: string;
  backgroundAlt: string;
}

interface FooterDetails {
  blurb: string;
  email: string;
  phone: string;
  address: string;
  hours: string;
  productHeading: string;
  expertiseHeading: string;
  companyHeading: string;
  copyright: string;
}

interface FooterProps {
  /** CMS copy for the closing band. Falls back to the standing copy. */
  cta?: Partial<FooterCta>;
  /** CMS copy for the footer body. Falls back to the standing copy. */
  details?: Partial<FooterDetails>;
  tina?: {
    cta?: Partial<Record<keyof FooterCta, string>>;
    details?: Partial<Record<keyof FooterDetails, string>>;
  };
}

const CTA_FALLBACK: FooterCta = {
  eyebrow: 'Get Started',
  heading: 'Make Faster\nDecisions.',
  body: "Understand your property's design potential, planning position and principal risks before committing further time or money.",
  buttonLabel: 'Get Your Fixed Fee',
  reassurance: 'No obligation. Response within one working day.',
  backgroundImage: '/images/projects/bereweeke/complete-rear.jpg',
  backgroundAlt: 'The completed rear extension at Bereweeke Avenue, in brick with steel windows',
};

const DETAILS_FALLBACK: FooterDetails = {
  blurb: 'Data-driven feasibility for commercial conversions, HMOs, and high-end residential across the UK.',
  email: 'hello@thistlearchitecture.co.uk',
  phone: '0808 175 5405',
  address: 'The Pump House, Garnier Road, Winchester, SO23 9QG',
  hours: 'Mon to Fri, 9am to 6pm GMT',
  productHeading: 'Product',
  expertiseHeading: 'Expertise',
  companyHeading: 'Company',
  copyright: '© 2026 Thistle Architecture Ltd. Registered in England and Wales.',
};

export const Footer: React.FC<FooterProps> = ({ cta, details, tina }) => {
  const router = useRouter();
  const c: FooterCta = { ...CTA_FALLBACK, ...pruneEmpty(cta) };
  const d: FooterDetails = { ...DETAILS_FALLBACK, ...pruneEmpty(details) };

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
          src={normalizeImage(c.backgroundImage, CTA_FALLBACK.backgroundImage)}
          alt={c.backgroundAlt}
          fill
          sizes="100vw"
          className="object-cover"
          // Marked so the band's background can be replaced by clicking it.
          // The overlay below sits on top and would otherwise swallow the
          // click, so the marker goes on this wrapper's image element and the
          // overlay is left pointer-transparent.
          data-tina-field={tina?.cta?.backgroundImage}
        />
        <div className="absolute inset-0 bg-thistle-black/75 pointer-events-none" />
        <div className="relative z-10 max-w-[1360px] mx-auto text-center">
          <Reveal>
            <p
              className="text-xs uppercase tracking-[0.2em] text-white/40 font-semibold mb-fl-5"
              data-tina-field={tina?.cta?.eyebrow}
            >
              {c.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            {/* whitespace-pre-line so a newline typed in the CMS breaks the
                line, which is how the two-line treatment survives editing. */}
            <h2
              className="text-fluid-display font-medium tracking-tighter leading-[0.95] mb-fl-6 whitespace-pre-line"
              data-tina-field={tina?.cta?.heading}
            >
              {c.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            {/* Ed's CTA copy, from the Feasibility Example Page template. It is
                written for this band, which every page ends with. */}
            <p
              className="text-fluid-sm text-white/85 leading-relaxed max-w-md mx-auto mb-fl-7"
              data-tina-field={tina?.cta?.body}
            >
              {c.body}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <Button
              variant="glass"
              size="lg"
              icon={<ArrowUpRight size={18} />}
              onClick={() => router.push('/pricing')}
              className="!bg-thistle-green !text-black !border-thistle-green hover:!bg-thistle-green/80 hover:!border-thistle-green/80"
              data-tina-field={tina?.cta?.buttonLabel}
            >
              {c.buttonLabel}
            </Button>
            <p className="text-xs text-white/60 mt-fl-4" data-tina-field={tina?.cta?.reassurance}>
              {c.reassurance}
            </p>
            <TrustpilotBadge tone="light" className="mt-fl-5" />
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
              <p className="text-fluid-base text-white/80 leading-relaxed mb-fl-5 max-w-md" data-tina-field={tina?.details?.blurb}>
                {d.blurb}
              </p>
              <div className="flex flex-col gap-fl-2 text-fluid-sm text-white/70">
                {/* Ed's August 2026 final brief asks for this address site-wide,
                    reversing the 2026-08-11 swap to hello@incollective.works.
                    The href is derived from the same field as the text, so the
                    two cannot be edited out of step. */}
                <a href={`mailto:${d.email}`} className="inline-flex items-center min-h-[32px] hover:text-thistle-green transition-colors w-fit" data-tina-field={tina?.details?.email}>
                  {d.email}
                </a>
                {/* One number for Thistle and HMO Designers, per Ed on the
                    August call: "anyone coming from designers, they're just
                    getting in touch with Thistle now."
                    If this is ever swapped for a call-tracking number, move it
                    back into code — an editor changing it would break
                    attribution invisibly. */}
                <a href={telHref(d.phone)} className="inline-flex items-center min-h-[32px] hover:text-thistle-green transition-colors w-fit" data-tina-field={tina?.details?.phone}>
                  {d.phone}
                </a>
                {/* Ed's current address, supplied 2026-08-26. It replaced Itchen
                    Court, Eastgate Street, which came off the practice's Wix
                    site and was out of date. His Google Business Profile still
                    shows the older Portsmouth address, so the two disagree until
                    he updates it. */}
                <span data-tina-field={tina?.details?.address}>{d.address}</span>
                <span className="text-white/50" data-tina-field={tina?.details?.hours}>{d.hours}</span>
              </div>
            </div>

            {/* Product */}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/60 font-semibold mb-fl-5" data-tina-field={tina?.details?.productHeading}>{d.productHeading}</p>
              <div className="flex flex-col gap-fl-3">
                {productLinks.map((link) => (
                  <Link key={link.to} href={link.to} className="inline-flex items-center min-h-[32px] text-fluid-sm text-white/80 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Expertise (the /conversions/ URLs stay; only the label changed) */}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/60 font-semibold mb-fl-5" data-tina-field={tina?.details?.expertiseHeading}>{d.expertiseHeading}</p>
              <div className="flex flex-col gap-fl-3">
                {conversionsLinks.map((link) => (
                  <Link key={link.to} href={link.to} className="inline-flex items-center min-h-[32px] text-fluid-sm text-white/80 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/60 font-semibold mb-fl-5" data-tina-field={tina?.details?.companyHeading}>{d.companyHeading}</p>
              <div className="flex flex-col gap-fl-3">
                {companyLinks.map((link) => (
                  <Link key={link.to} href={link.to} className="inline-flex items-center min-h-[32px] text-fluid-sm text-white/80 hover:text-white transition-colors">
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
            <span className="text-xs text-white/60" data-tina-field={tina?.details?.copyright}>{d.copyright}</span>
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
              <Link key={link.to} href={link.to} className="inline-flex items-center min-h-[32px] text-xs text-white/60 hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
            {/* Sits with the legal links because that is where people look for
                it. Renders nothing at all while analytics is switched off. */}
            <CookieSettingsLink className="inline-flex items-center min-h-[32px] text-xs text-white/60 hover:text-white transition-colors" />
            <span className="text-xs text-white/40">·</span>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-[32px] text-xs text-white/70 hover:text-white transition-colors">LinkedIn</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-[32px] text-xs text-white/70 hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
