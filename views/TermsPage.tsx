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

// The standing wording, now also in content/legal/terms.json. It stays here
// as the fallback, byte for byte, so the page renders exactly as it did before
// if it is ever mounted without CMS data or the document comes back empty. A
// legal page that quietly renders blank is worse than one that is out of date.
const SECTIONS_FALLBACK: LegalSection[] = [
  {
    heading: "Acceptance of Terms",
    body: "By accessing and using this website, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.",
  },
  {
    heading: "Services",
    body: "Thistle Architecture provides commercial-to-residential feasibility studies, desk studies, planning analysis, and related architectural consultancy services. Our services are provided subject to a separate engagement letter and fee proposal for each project.",
  },
  {
    heading: "Feasibility Reports",
    body: "Feasibility reports are prepared based on the information available at the time of assessment and are intended as guidance for development decisions. They do not constitute a guarantee of planning approval, structural adequacy, or commercial viability. All reports are subject to our standard terms of engagement.",
  },
  {
    heading: "Intellectual Property",
    body: "All content on this website, including text, images, logos, and design elements, is the property of Thistle Architecture Ltd and is protected by copyright law. You may not reproduce, distribute, or create derivative works without our written permission.",
  },
  {
    heading: "Limitation of Liability",
    body: "Thistle Architecture Ltd shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our website or services. Our total liability is limited to the fees paid for the specific service in question.",
  },
  {
    heading: "Professional Indemnity",
    body: "Thistle Architecture Ltd maintains professional indemnity insurance in accordance with ARB and RIBA requirements. Details of our insurance coverage are available on request.",
  },
  {
    heading: "Governing Law",
    body: "These Terms of Service are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.",
  },
];

// Same idea for the hero. `lastUpdated` is the date on its own — the "Last
// updated:" label in front of it is fixed page copy, not something the editor
// owns.
const HERO_FALLBACK = {
  title: "Terms Of Service.",
  lastUpdated: "February 2026",
};

interface TermsPageProps {
  /**
   * The raw CMS query, passed straight through from the server page so that
   * useTina can re-run it live inside the editor. Optional so the page still
   * renders if it is mounted without it.
   */
  page?: TinaQuery;
}

export const TermsPage: React.FC<TermsPageProps> = ({ page }) => {
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
