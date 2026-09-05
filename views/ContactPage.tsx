"use client";

import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { useTina } from 'tinacms/dist/react';
import { PageHero } from '../components/ui/PageHero';
import { ContactForm } from '../sections/ContactForm';
import { ExpertSessionCard } from '../sections/ExpertSessionCard';
import { Reveal } from '../components/animations/Reveal';
import { f, type TinaQuery, EMPTY_QUERY } from '../lib/tina-fields';
import { str, pruneEmpty, telHref} from '../lib/tina';

// Ed's August 2026 final brief, section 08, gave this page three routes by how
// ready the visitor is. His September list, item 76, counted what that had
// become, five competing ways in, and asked for one address, one booking route
// and one number, each saying what it is for. So the page is now two things:
// Jodi's live calendar, and the enquiry form with the practice address and
// number beside it. The fee calculator is no longer offered here; the closing
// band on every page already carries that button.
//
// "Within one working day" is deliberately NOT in the CMS. It sits inside the
// enquiry form (sections/ContactForm.tsx), which stays entirely in code: this
// page is the site's lead capture, and a form is functional UI rather than
// copy. The closing band carries a second version of the same promise, from
// Site Settings.
//
// The copy below is now a fallback rather than the page's only copy: the same
// strings also live in content/contact/index.json, seeded byte-for-byte from
// what was here. They stay in code so the page renders unchanged if it is ever
// mounted without a CMS query, and so the notes on each block stay next to the
// words they explain.

const HERO_FALLBACK = {
  label: 'Contact',
  heading: 'Get in touch.',
  description: 'Book a call with Jodi, or send us a message. One address, one number, and both say what they are for.',
};

// Jodi's card is sections/ExpertSessionCard.tsx: its three lines of prose are
// editable and its fallbacks live there, next to the calendar they introduce.
//
// Gone with item 76: the "ready to assess a property" card (a route to the fee
// calculator, which the closing band on every page already offers), the
// "general or other enquiry" card (a route to the form directly beneath it),
// the "already have a building in mind" nudge, and jodi@ as a second address.

// The email address and phone number on this page are the same pair the footer
// renders, and they read from the same two Site Settings fields rather than
// from a contact-page copy of them. Two numbers that have drifted apart is a
// caller who reaches nobody. These fallbacks cover only the case where the page
// is mounted without the settings query, and match DETAILS_FALLBACK in
// sections/Footer.tsx.
const DETAILS_FALLBACK = {
  email: 'hello@thistlearchitecture.co.uk',
  phone: '0808 175 5405',
  hours: 'Mon to Fri, 9am to 6pm GMT',
};

interface ContactPageProps {
  /**
   * Raw CMS queries, passed straight through from the server page so that
   * useTina can re-run them live inside the editor. Optional so the page still
   * renders if it is mounted without them.
   */
  page?: TinaQuery;
  /**
   * Site Settings, for the email address and phone number in the left-hand
   * column. Fetched by this page as well as by the root layout, because
   * PageShell keeps its copy of the query to itself.
   */
  settings?: TinaQuery;
}

export const ContactPage: React.FC<ContactPageProps> = ({ page, settings }) => {
  // useTina returns the server data verbatim on the public site and swaps in
  // the live form values inside the editor. Passing a null-ish query is not
  // allowed, and hooks cannot be called conditionally, so the hooks run against
  // a stub when the props are absent and the results are discarded below.
  const { data: livePage } = useTina(page ?? EMPTY_QUERY);
  const { data: liveSettings } = useTina(settings ?? EMPTY_QUERY);

  const c = page ? (livePage as any)?.contact : undefined;
  const s = settings ? (liveSettings as any)?.settings : undefined;

  // Spread over the fallbacks with pruneEmpty, exactly as the footer does: a
  // field the editor has cleared comes back as '' and would otherwise blank the
  // page, so an empty field simply leaves the standing copy in place.
  const hero = { ...HERO_FALLBACK, ...pruneEmpty({
    label: str(c?.hero?.label),
    heading: str(c?.hero?.heading),
    description: str(c?.hero?.description),
  }) };

  const details = { ...DETAILS_FALLBACK, ...pruneEmpty({
    email: str(s?.footer?.email),
    phone: str(s?.footer?.phone),
    hours: str(s?.footer?.hours),
  }) };

  return (
    <>
      <PageHero
        label={hero.label}
        heading={hero.heading}
        description={hero.description}
        tina={{
          label: f(c?.hero, 'label'),
          heading: f(c?.hero, 'heading'),
          description: f(c?.hero, 'description'),
        }}
      />

      <section className="bg-thistle-white py-fl-8 px-fl-margin">
        {/* Route 1: book a call. Jodi's live calendar. */}
        <div id="book" className="max-w-[1360px] mx-auto mb-fl-8 scroll-mt-24">
          <ExpertSessionCard
            copy={{
              personName: str(c?.expertSession?.personName),
              personRole: str(c?.expertSession?.personRole),
              pitch: str(c?.expertSession?.pitch),
            }}
            tina={{
              personName: f(c?.expertSession, 'personName'),
              personRole: f(c?.expertSession, 'personRole'),
              pitch: f(c?.expertSession, 'pitch'),
            }}
          />
        </div>

        {/* Route 2: write to us. One address, one number, one form. */}
        <div id="enquiry" className="max-w-[1360px] mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-fl-7 items-start scroll-mt-24">
          <div className="flex flex-col gap-fl-6">
            <Reveal>
              <div className="flex flex-col gap-fl-5">
                {/* Both of these edit the Site Settings fields the footer uses,
                    so clicking one here opens the same field as clicking it in
                    the footer. The href is derived from the same value as the
                    text, so the two cannot be edited out of step.

                    Each carries a line saying what it is for. Item 76: the page
                    offered two addresses and a number with no explanation of
                    which to use. Now there is one address, one number, and
                    Jodi's calendar above for anyone who wants to talk first. */}
                <div>
                  <a
                    href={`mailto:${details.email}`}
                    className="flex items-center gap-fl-3 text-fluid-base text-thistle-black hover:text-thistle-green transition-colors w-fit"
                    data-tina-field={f(s?.footer, 'email')}
                  >
                    <Mail size={18} className="text-thistle-black/40 shrink-0" />
                    {details.email}
                  </a>
                  <p className="text-xs text-thistle-black/50 mt-1 pl-[calc(18px+var(--fl-3,0.75rem))]">
                    For any enquiry, including press and projects we have already delivered. We reply within one working day.
                  </p>
                </div>
                <div>
                  <a
                    href={telHref(details.phone)}
                    className="flex items-center gap-fl-3 text-fluid-base text-thistle-black hover:text-thistle-green transition-colors w-fit"
                    data-tina-field={f(s?.footer, 'phone')}
                  >
                    <Phone size={18} className="text-thistle-black/40 shrink-0" />
                    {details.phone}
                  </a>
                  <p className="text-xs text-thistle-black/50 mt-1 pl-[calc(18px+var(--fl-3,0.75rem))]" data-tina-field={f(s?.footer, 'hours')}>
                    For anything urgent. {details.hours}.
                  </p>
                </div>
              </div>
            </Reveal>

          </div>

          {/* No props and no markers, deliberately. Everything inside — the
              field labels, the placeholder, "Sending…", the success and error
              messages, the post to /api/leads — is functional UI. A typo in a
              heading is embarrassing; a typo in here is a lost enquiry. */}
          <ContactForm phone={details.phone} />
        </div>
      </section>
    </>
  );
};
