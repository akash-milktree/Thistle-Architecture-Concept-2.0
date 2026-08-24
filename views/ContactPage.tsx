"use client";

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, ArrowUpRight } from 'lucide-react';
import { PageHero } from '../components/ui/PageHero';
import { ContactForm } from '../sections/ContactForm';
import { Reveal } from '../components/animations/Reveal';

export const ContactPage: React.FC = () => (
  <>
    <PageHero
      label="Contact"
      heading="Get in touch."
      description="Tell us about the building and we will come back to you within one working day."
    />

    <section className="bg-thistle-white py-fl-8 px-fl-margin">
      <div className="max-w-[1360px] mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-fl-7 items-start">
        <div className="flex flex-col gap-fl-6">
          <Reveal>
            <div className="flex flex-col gap-fl-4">
              <a
                href="mailto:hello@thistlearchitecture.co.uk"
                className="flex items-center gap-fl-3 text-fluid-base text-thistle-black hover:text-thistle-green transition-colors w-fit"
              >
                <Mail size={18} className="text-thistle-black/40 shrink-0" />
                hello@thistlearchitecture.co.uk
              </a>
              <a
                href="tel:+448081755405"
                className="flex items-center gap-fl-3 text-fluid-base text-thistle-black hover:text-thistle-green transition-colors w-fit"
              >
                <Phone size={18} className="text-thistle-black/40 shrink-0" />
                0808 175 5405
              </a>
            </div>
          </Reveal>

          {/* Anyone with a live scheme gets more out of the feasibility form than
              a general message, so it is offered here rather than buried. */}
          <Reveal delay={0.1}>
            <div className="bg-white rounded-2xl border border-thistle-black/[0.08] p-fl-5">
              <p className="text-fluid-base text-thistle-black mb-fl-2">Already have a building in mind?</p>
              <p className="text-fluid-sm text-thistle-black/60 mb-fl-4">
                The feasibility form asks the few questions we need to tell you whether it stacks up, and you get a clear
                Go or No-Go in five days.
              </p>
              <Link
                href="/feasibility-package"
                className="inline-flex items-center gap-1.5 text-fluid-sm font-medium text-thistle-black hover:text-thistle-green transition-colors"
              >
                Book your feasibility
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>

        <ContactForm />
      </div>
    </section>
  </>
);
