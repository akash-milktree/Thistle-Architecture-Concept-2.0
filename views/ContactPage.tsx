"use client";

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, ArrowUpRight } from 'lucide-react';
import { PageHero } from '../components/ui/PageHero';
import { ContactForm } from '../sections/ContactForm';
import { ExpertSessionCard } from '../sections/ExpertSessionCard';
import { Reveal } from '../components/animations/Reveal';
import { Button } from '../components/ui/Button';
import { useRouter } from 'next/navigation';

// Ed's August 2026 final brief, section 08: three routes by how ready the
// visitor is, in his order. Response-time wording stays "within one working
// day" throughout, which is what the team actually operates to; nothing here
// promises an instant call.
export const ContactPage: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <PageHero
        label="Contact"
        heading="Get in touch."
        description="Three ways in, depending on how ready you are to move."
      />

      <section className="bg-thistle-white py-fl-8 px-fl-margin">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-fl-5 items-stretch mb-fl-8">
          {/* Route 1: ready to assess a property */}
          <Reveal fullHeight>
            <div className="h-full flex flex-col rounded-2xl border border-thistle-black/[0.08] bg-white p-fl-6">
              <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-3">Ready To Assess A Property</p>
              <p className="text-fluid-sm text-thistle-black/70 leading-relaxed flex-1 mb-fl-5">
                Answer a few questions and your fixed fee is on screen. Fastest way to a Go or No-Go.
              </p>
              <Button
                variant="primary"
                icon={<ArrowUpRight size={16} />}
                onClick={() => router.push('/pricing#calculator')}
                className="w-fit"
              >
                Get Your Fixed Fee
              </Button>
            </div>
          </Reveal>

          {/* Route 2: not sure what they need, Jodi */}
          <ExpertSessionCard />

          {/* Route 3: general enquiry, further down the page */}
          <Reveal delay={0.1} fullHeight>
            <div className="h-full flex flex-col rounded-2xl border border-thistle-black/[0.08] bg-white p-fl-6">
              <p className="text-xs uppercase tracking-[0.2em] text-thistle-black/40 font-semibold mb-fl-3">General Or Other Enquiry</p>
              <p className="text-fluid-sm text-thistle-black/70 leading-relaxed flex-1 mb-fl-5">
                Anything else, from a press enquiry to a question about a project we've already delivered.
              </p>
              <a href="#enquiry" className="w-fit">
                <Button variant="outline" icon={<ArrowUpRight size={16} />}>
                  Use The Form Below
                </Button>
              </a>
            </div>
          </Reveal>
        </div>

        <div id="enquiry" className="max-w-[1360px] mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-fl-7 items-start scroll-mt-24">
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
};
