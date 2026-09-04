"use client";

import React from 'react';
import { useTina } from 'tinacms/dist/react';
import { PageHero } from '../components/ui/PageHero';
import { Reveal } from '../components/animations/Reveal';
import { f, type TinaQuery, EMPTY_QUERY } from '../lib/tina-fields';
import { str, arr, pruneEmpty } from '../lib/tina';

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * One headed paragraph of the document, plus the CMS field ids for its own two
 * fields.
 *
 * The ids are per item, not per list: `tinaField(sections[2], 'body')` resolves
 * to that one paragraph, so clicking it in the editor opens it. A marker on the
 * list would open an empty form instead.
 */
type LegalSection = {
  heading: string;
  body: string;
  tina?: { heading?: string; body?: string };
};

// The standing wording, now also in content/legal/privacy.json. It stays here
// as the fallback, byte for byte, so the page renders exactly as it did before
// if it is ever mounted without CMS data or the document comes back empty. A
// legal page that quietly renders blank is worse than one that is out of date.
const SECTIONS_FALLBACK: LegalSection[] = [
  {
    heading: "Information We Collect",
    body: "We collect information you provide directly to us, such as when you submit a feasibility enquiry, contact us, or sign up for our newsletter. This includes your name, email address, phone number, company name, and property details you submit through our feasibility portal.",
  },
  {
    heading: "How We Use Your Information",
    body: "We use the information we collect to provide and improve our services, process your feasibility enquiries, communicate with you about your projects, and send you relevant updates about our services. We do not sell your personal information to third parties.",
  },
  {
    heading: "Data Storage & Security",
    body: "Your data is stored securely on encrypted servers within the UK. We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction.",
  },
  {
    heading: "Your Rights",
    body: "Under the UK GDPR, you have the right to access, rectify, or delete your personal data. You can also object to processing, request data portability, and withdraw consent at any time. To exercise these rights, contact us at privacy@thistlearchitecture.co.uk.",
  },
  {
    heading: "Data Retention",
    body: "We retain your personal data for as long as necessary to provide our services and fulfil the purposes described in this policy. Feasibility report data is retained for 7 years in line with professional indemnity insurance requirements.",
  },
  {
    heading: "Third-Party Services",
    body: "We use third-party services for analytics, email communication, and data processing. These providers are contractually bound to process your data only on our instructions and in compliance with UK GDPR.",
  },
  {
    heading: "Contact Us",
    body: "If you have questions about this Privacy Policy or our data practices, contact us at privacy@thistlearchitecture.co.uk or write to Incollective Limited, trading as Thistle Architecture, Gatcombe House, Copnor Road, Hilsea, Portsmouth, PO3 5EJ.",
  },
];

// Same idea for the hero. `lastUpdated` is the date on its own — the "Last
// updated:" label in front of it is fixed page copy, not something the editor
// owns.
const HERO_FALLBACK = {
  title: "Privacy Policy.",
  lastUpdated: "September 2026",
};

interface PrivacyPageProps {
  /**
   * The raw CMS query, passed straight through from the server page so that
   * useTina can re-run it live inside the editor. Optional so the page still
   * renders if it is mounted without it.
   */
  page?: TinaQuery;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ page }) => {
  // useTina returns the server data verbatim on the public site and swaps in
  // the live form values inside the editor. Passing a null-ish query is not
  // allowed, so the hook runs against a stub when the prop is absent and the
  // result is discarded below.
  const { data: live } = useTina(page ?? EMPTY_QUERY);
  const doc = page ? (live as any)?.legal : undefined;

  // pruneEmpty, so a field an editor has cleared leaves the standing copy in
  // place rather than blanking the top of the page.
  const hero = {
    ...HERO_FALLBACK,
    ...pruneEmpty({ title: str(doc?.title), lastUpdated: str(doc?.lastUpdated) }),
  };

  const fromCms: LegalSection[] = arr<any>(doc?.sections).map((s) => ({
    heading: str(s?.heading),
    body: str(s?.body),
    tina: { heading: f(s, 'heading'), body: f(s, 'body') },
  }));
  const sections = fromCms.length ? fromCms : SECTIONS_FALLBACK;

  return (
    <>
      {/* "Legal" is the same eyebrow on all three of these pages: it classifies
          the page rather than describing it, so it stays in code.

          The date line carries no marker on purpose. PageHero puts the marker on
          the whole description paragraph, and that paragraph is "Last updated:"
          plus the date, while the field is only the date. A marker has to sit on
          the element that renders the field and nothing more, so this one is
          edited in the form. */}
      <PageHero
        label="Legal"
        heading={hero.title}
        description={`Last updated: ${hero.lastUpdated}`}
        tina={{ heading: f(doc, 'title') }}
      />
      <section className="py-fl-section px-fl-margin bg-thistle-white">
        <div className="max-w-[800px] mx-auto">
          {sections.map((s, i) => (
            <Reveal key={i} delay={i * 0.05}>
              {/* The markers go on the h3 and the p themselves, never on this
                  wrapper: Tina resolves a click by walking up to the nearest
                  [data-tina-field], so a marker here would swallow every click
                  in the block and open the wrong field. */}
              <div className="mb-fl-7">
                <h3
                  className="text-fluid-h6 font-medium tracking-tight text-thistle-black mb-fl-3"
                  data-tina-field={s.tina?.heading}
                >
                  {s.heading}
                </h3>
                <p className="text-fluid-base text-thistle-black/80 leading-relaxed" data-tina-field={s.tina?.body}>
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
};
