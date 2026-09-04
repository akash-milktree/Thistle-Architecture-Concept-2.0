"use client";

import React from 'react';
import { useTina } from 'tinacms/dist/react';
import { PageHero } from '../components/ui/PageHero';
import { Reveal } from '../components/animations/Reveal';
import { f, type TinaQuery, EMPTY_QUERY } from '../lib/tina-fields';
import { str, arr } from '../lib/tina';
import { DISCLAIMER_VERSION, DISCLAIMER_VERSION_DATE } from '../lib/disclaimer';

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * /feasibility-disclaimer, the document a client has to accept before paying.
 *
 * Ed's brief of 25 August is explicit about how it must render, and each of
 * these is a requirement rather than a preference:
 *
 *  - plain HTML, read in the browser, never a PDF embed or a download
 *  - no accordions and no "read more" truncation, so nothing is hidden by
 *    default
 *  - body text no smaller than the rest of the site, no grey-on-grey
 *  - a version number and date at the top
 *
 * So this deliberately renders everything, at normal size, in order.
 */

interface Props {
  page?: TinaQuery;
}

export const FeasibilityDisclaimerPage: React.FC<Props> = ({ page }) => {
  const { data } = useTina(page ?? EMPTY_QUERY);
  const cms = (data as any)?.legal;

  // From lib/disclaimer.ts, not from the CMS, so the version shown here and the
  // version inside the checkout tick-box label cannot drift apart.
  const version = DISCLAIMER_VERSION;
  const versionDate = DISCLAIMER_VERSION_DATE;

  /**
   * The two money figures in section 8.
   *
   * They are blank in the brief Ed sent, as "£[     ]", and nobody at this end
   * can decide them: one is a contractual cap on his liability and the other
   * has to match his insurance policy. So rather than invent a number or
   * silently drop the sentence, an unset figure renders as a visible marker.
   * A clause that obviously has a gap in it is honest. A clause with a number
   * we made up would be worse than no clause at all.
   */
  const fill = (body: string) =>
    body
      .replace(/\{\{liabilityCap\}\}/g, str(cms?.liabilityCap) || '[amount to be confirmed]')
      .replace(/\{\{piLimit\}\}/g, str(cms?.piLimit) || '[amount to be confirmed]');

  const sections = arr<any>(cms?.sections);

  return (
    <>
      <PageHero
        label="Legal"
        heading={str(cms?.title) || 'Feasibility Report — Basis and Limitations.'}
        description={`Version ${version} — ${versionDate}`}
      />

      <section className="py-fl-section px-fl-margin bg-white">
        <div className="max-w-[760px] mx-auto">
          {str(cms?.intro) && (
            <Reveal>
              <p
                className="text-fluid-base text-thistle-black/75 leading-relaxed mb-fl-7"
                data-tina-field={f(cms, 'intro')}
              >
                {str(cms.intro)}
              </p>
            </Reveal>
          )}

          {sections.map((s, i) => (
            <Reveal key={i} delay={Math.min(i * 0.03, 0.2)}>
              <div className="mb-fl-6">
                {/* A section with no heading is a continuation of the one above
                    it, which the source document uses once. Rendering an empty
                    h2 would put a gap where the text should simply carry on. */}
                {str(s?.heading) && (
                  <h2
                    className="text-fluid-h5 font-medium tracking-tight text-thistle-black mb-fl-3"
                    data-tina-field={f(s, 'heading')}
                  >
                    {str(s.heading)}
                  </h2>
                )}

                <div data-tina-field={f(s, 'body')}>
                  {fill(str(s?.body))
                    .split('\n\n')
                    .filter(Boolean)
                    .map((p, j) => (
                      // Same size and colour as body copy everywhere else on
                      // the site. The brief rules out small print explicitly.
                      <p key={j} className="text-fluid-base text-thistle-black/75 leading-relaxed mb-fl-3">
                        {p}
                      </p>
                    ))}
                </div>

                {arr<string>(s?.bullets).length > 0 && (
                  <ul className="list-disc pl-5 space-y-fl-2 mt-fl-3" data-tina-field={f(s, 'bullets')}>
                    {arr<string>(s.bullets).map((b, j) => (
                      <li key={j} className="text-fluid-base text-thistle-black/75 leading-relaxed">
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
};
