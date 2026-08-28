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

// The standing wording, now also in content/legal/cookies.json. It stays here
// as the fallback, byte for byte, so the page renders exactly as it did before
// if it is ever mounted without CMS data or the document comes back empty. A
// legal page that quietly renders blank is worse than one that is out of date.
const SECTIONS_FALLBACK: LegalSection[] = [
  {
    heading: "What Are Cookies",
    body: "Cookies are small text files stored on your device when you visit a website. They help us understand how you use our site, remember your preferences, and improve your experience.",
  },
  {
    heading: "Essential Cookies",
    body: "These cookies are necessary for the website to function properly. They enable basic features like page navigation and access to secure areas. The website cannot function without these cookies.",
  },
  {
    heading: "Analytics Cookies",
    body: "We use Google Analytics to understand how visitors find and use this site, so we can make it better. It sets two cookies, named _ga and _ga_PVDKSFH5GQ, which tell returning visits apart from new ones. They are only set if you choose \"Allow analytics\" when we ask. Say no and none are set, and the site works exactly the same. We never use this data to identify you, and we do not sell or share it.",
  },
  {
    heading: "Marketing Cookies",
    body: "We do not use marketing or advertising cookies, and advertising is switched off in our analytics. If that ever changes we will update this policy and ask your permission first.",
  },
  {
    heading: "Managing Cookies",
    body: "You can change your mind at any time using the \"Cookie settings\" link at the bottom of any page. That takes back your permission straight away and asks you again. You can also control cookies in your browser settings, where most browsers let you refuse them or delete ones already saved.",
  },
  {
    heading: "Updates to This Policy",
    body: "We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.",
  },
];

// Same idea for the hero. `lastUpdated` is the date on its own — the "Last
// updated:" label in front of it is fixed page copy, not something the editor
// owns.
const HERO_FALLBACK = {
  title: "Cookie Policy.",
  lastUpdated: "August 2026",
};

interface CookiesPageProps {
  /**
   * The raw CMS query, passed straight through from the server page so that
   * useTina can re-run it live inside the editor. Optional so the page still
   * renders if it is mounted without it.
   */
  page?: TinaQuery;
}

export const CookiesPage: React.FC<CookiesPageProps> = ({ page }) => {
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
                {/* Smaller and lighter than the same paragraph on /terms and
                    /privacy, which use text-fluid-base at /80. That difference
                    predates the CMS migration and has been left exactly as it
                    was, since changing it here would be a visual change smuggled
                    into a content change. Worth settling one way or the other. */}
                <p className="text-fluid-sm text-thistle-black/50 leading-relaxed" data-tina-field={s.tina?.body}>
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
