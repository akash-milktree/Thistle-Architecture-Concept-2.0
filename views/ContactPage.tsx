"use client";

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, ArrowUpRight } from 'lucide-react';
import { useTina } from 'tinacms/dist/react';
import { PageHero } from '../components/ui/PageHero';
import { ContactForm } from '../sections/ContactForm';
import { ExpertSessionCard } from '../sections/ExpertSessionCard';
import { Reveal } from '../components/animations/Reveal';
import { Button } from '../components/ui/Button';
import { useRouter } from 'next/navigation';
import { f, type TinaQuery, EMPTY_QUERY } from '../lib/tina-fields';
import { str, pruneEmpty, telHref} from '../lib/tina';

// Ed's August 2026 final brief, section 08: three routes by how ready the
// visitor is, in his order. Response-time wording stays "within one working
// day" throughout, which is what the team actually operates to; nothing here
// promises an instant call.
//
// That wording is deliberately NOT in the CMS. Both instances of it sit inside
// the two forms (sections/ContactForm.tsx and sections/ExpertSessionCard.tsx),
// which stay entirely in code: this page is the site's lead capture, and a form
// is functional UI rather than copy. The closing band carries a third version
// of the same promise, from Site Settings. So if the promise ever changes it
// changes in three places, none of them the Contact Page form.
//
// The copy below is now a fallback rather than the page's only copy: the same
// strings also live in content/contact/index.json, seeded byte-for-byte from
// what was here. They stay in code so the page renders unchanged if it is ever
// mounted without a CMS query, and so the notes on each block stay next to the
// words they explain.

const HERO_FALLBACK = {
  label: 'Contact',
  heading: 'Get in touch.',
  description: 'Three ways in, depending on how ready you are to move.',
};

// Route 1: ready to assess a property. The button goes to the fee calculator.
// The destination is code; only the label is content.
const ROUTE_READY_FALLBACK = {
  eyebrow: 'Ready To Assess A Property',
  body: 'Answer a few questions and your fixed fee is on screen. Fastest way to a Go or No-Go.',
  buttonLabel: 'Get Your Fixed Fee',
};

// Route 3: general enquiry, further down the page. Route 2 is Jodi's
// ExpertSessionCard: its copy IS editable, but the fallbacks live inside that
// component rather than here, because the strings are interleaved with a
// booking form. Only the prose moves into the CMS — every field placeholder,
// button busy state and error message in that form stays in code.
const ROUTE_GENERAL_FALLBACK = {
  eyebrow: 'General Or Other Enquiry',
  body: "Anything else, from a press enquiry to a question about a project we've already delivered.",
  buttonLabel: 'Use The Form Below',
};

// Anyone with a live scheme gets more out of the feasibility form than a
// general message, so it is offered here rather than buried.
const NUDGE_FALLBACK = {
  heading: 'Already have a building in mind?',
  body: 'The feasibility form asks the few questions we need to tell you whether it stacks up, and you get a clear Go or No-Go in five days.',
  linkLabel: 'Book your feasibility',
};

// The email address and phone number on this page are the same pair the footer
// renders, and they read from the same two Site Settings fields rather than
// from a contact-page copy of them. Two numbers that have drifted apart is a
// caller who reaches nobody. These fallbacks cover only the case where the page
// is mounted without the settings query, and match DETAILS_FALLBACK in
// sections/Footer.tsx.
const DETAILS_FALLBACK = {
  email: 'hello@thistlearchitecture.co.uk',
  phone: '0808 175 5405',
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
  const router = useRouter();

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

  const routeReady = { ...ROUTE_READY_FALLBACK, ...pruneEmpty({
    eyebrow: str(c?.routeReady?.eyebrow),
    body: str(c?.routeReady?.body),
    buttonLabel: str(c?.routeReady?.buttonLabel),
  }) };

  const routeGeneral = { ...ROUTE_GENERAL_FALLBACK, ...pruneEmpty({
    eyebrow: str(c?.routeGeneral?.eyebrow),
    body: str(c?.routeGeneral?.body),
    buttonLabel: str(c?.routeGeneral?.buttonLabel),
  }) };

  const nudge = { ...NUDGE_FALLBACK, ...pruneEmpty({
    heading: str(c?.feasibilityNudge?.heading),
    body: str(c?.feasibilityNudge?.body),
    linkLabel: str(c?.feasibilityNudge?.linkLabel),
  }) };

  const details = { ...DETAILS_FALLBACK, ...pruneEmpty({
    email: str(s?.footer?.email),
    phone: str(s?.footer?.phone),
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
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-fl-5 items-stretch mb-fl-8">
          {/* Route 1: ready to assess a property */}
          <Reveal fullHeight>
            <div className="h-full flex flex-col rounded-2xl border border-thistle-black/[0.08] bg-white p-fl-6">
              <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-3" data-tina-field={f(c?.routeReady, 'eyebrow')}>{routeReady.eyebrow}</p>
              <p className="text-fluid-sm text-thistle-black/70 leading-relaxed flex-1 mb-fl-5" data-tina-field={f(c?.routeReady, 'body')}>
                {routeReady.body}
              </p>
              <Button
                variant="primary"
                icon={<ArrowUpRight size={16} />}
                onClick={() => router.push('/pricing#calculator')}
                className="w-fit"
                data-tina-field={f(c?.routeReady, 'buttonLabel')}
              >
                {routeReady.buttonLabel}
              </Button>
            </div>
          </Reveal>

          {/* Route 2: not sure what they need, Jodi.
              No props and no markers, on purpose. The card is two paragraphs
              wrapped around a call-back form, and the form is off limits — its
              placeholders, button states and success message are what capture
              the lead. Making half a card editable would be worse than leaving
              it whole, so the whole of it stays in code with the form. */}
          <ExpertSessionCard
            copy={{
              personName: str(c?.expertSession?.personName),
              personRole: str(c?.expertSession?.personRole),
              pitch: str(c?.expertSession?.pitch),
              buttonLabel: str(c?.expertSession?.buttonLabel),
              reassurance: str(c?.expertSession?.reassurance),
              successHeading: str(c?.expertSession?.successHeading),
              successUrgent: str(c?.expertSession?.successUrgent),
              emailPrompt: str(c?.expertSession?.emailPrompt),
              email: str(c?.expertSession?.email),
            }}
            tina={{
              personName: f(c?.expertSession, 'personName'),
              personRole: f(c?.expertSession, 'personRole'),
              pitch: f(c?.expertSession, 'pitch'),
              buttonLabel: f(c?.expertSession, 'buttonLabel'),
              reassurance: f(c?.expertSession, 'reassurance'),
              successHeading: f(c?.expertSession, 'successHeading'),
              successUrgent: f(c?.expertSession, 'successUrgent'),
              emailPrompt: f(c?.expertSession, 'emailPrompt'),
              email: f(c?.expertSession, 'email'),
            }}
          />

          {/* Route 3: general enquiry, further down the page */}
          <Reveal delay={0.1} fullHeight>
            <div className="h-full flex flex-col rounded-2xl border border-thistle-black/[0.08] bg-white p-fl-6">
              <p className="text-xs uppercase tracking-[0.2em] text-thistle-black/40 font-semibold mb-fl-3" data-tina-field={f(c?.routeGeneral, 'eyebrow')}>{routeGeneral.eyebrow}</p>
              <p className="text-fluid-sm text-thistle-black/70 leading-relaxed flex-1 mb-fl-5" data-tina-field={f(c?.routeGeneral, 'body')}>
                {routeGeneral.body}
              </p>
              <a href="#enquiry" className="w-fit">
                {/* The marker goes on the button, which renders the label, and
                    not on the anchor around it: Tina resolves a click by
                    walking up with closest(), so a marker on the anchor would
                    also swallow the jump down to the form. */}
                <Button variant="outline" icon={<ArrowUpRight size={16} />} data-tina-field={f(c?.routeGeneral, 'buttonLabel')}>
                  {routeGeneral.buttonLabel}
                </Button>
              </a>
            </div>
          </Reveal>
        </div>

        <div id="enquiry" className="max-w-[1360px] mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-fl-7 items-start scroll-mt-24">
          <div className="flex flex-col gap-fl-6">
            <Reveal>
              <div className="flex flex-col gap-fl-4">
                {/* Both of these edit the Site Settings fields the footer uses,
                    so clicking one here opens the same field as clicking it in
                    the footer. The href is derived from the same value as the
                    text, so the two cannot be edited out of step. */}
                <a
                  href={`mailto:${details.email}`}
                  className="flex items-center gap-fl-3 text-fluid-base text-thistle-black hover:text-thistle-green transition-colors w-fit"
                  data-tina-field={f(s?.footer, 'email')}
                >
                  <Mail size={18} className="text-thistle-black/40 shrink-0" />
                  {details.email}
                </a>
                <a
                  href={telHref(details.phone)}
                  className="flex items-center gap-fl-3 text-fluid-base text-thistle-black hover:text-thistle-green transition-colors w-fit"
                  data-tina-field={f(s?.footer, 'phone')}
                >
                  <Phone size={18} className="text-thistle-black/40 shrink-0" />
                  {details.phone}
                </a>
              </div>
            </Reveal>

            {/* Anyone with a live scheme gets more out of the feasibility form than
                a general message, so it is offered here rather than buried. */}
            <Reveal delay={0.1}>
              <div className="bg-white rounded-2xl border border-thistle-black/[0.08] p-fl-5">
                <p className="text-fluid-base text-thistle-black mb-fl-2" data-tina-field={f(c?.feasibilityNudge, 'heading')}>{nudge.heading}</p>
                <p className="text-fluid-sm text-thistle-black/60 mb-fl-4" data-tina-field={f(c?.feasibilityNudge, 'body')}>
                  {nudge.body}
                </p>
                <Link
                  href="/feasibility-package"
                  className="inline-flex items-center gap-1.5 text-fluid-sm font-medium text-thistle-black hover:text-thistle-green transition-colors"
                  data-tina-field={f(c?.feasibilityNudge, 'linkLabel')}
                >
                  {nudge.linkLabel}
                  <ArrowUpRight size={15} />
                </Link>
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
