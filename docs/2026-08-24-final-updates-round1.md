# Final update brief: round 1 (pricing journey + CTA rewiring)

Date: 24 August 2026
Source: Ed's "Website Final Update Brief" PDF, August 2026 (in `aug feedback and updates/`)
Scope shipped: brief sections 01 (part), 02, 09 (part), 10 (part)

## Shipped in this round

### Pricing page (section 02)
- "How The Fee Is Built" and the published fee tables are gone. Replaced with "What Affects Your Fee": factors only (property size, existing and proposed use, units or bedrooms, extent of alterations, planning complexity, heritage and listed status, alternative options). The engine stays in code, unpublished.
- Architectural Feasibility carries a "Recommended" badge and stronger card styling.
- New "£49.99 Or From £298?" section states the difference explicitly: data-led and automated versus data plus architect, planning interpretation, sketch and layout testing, and a professional recommendation.
- The Maywood Group "avoided a bad purchase" review now sits directly under the calculator, with a link to the Trustpilot original. Full reviews section stays at the bottom.
- "All fees include VAT" stated under the product ladder and in the calculator.

### Feasibility journey (section 09)
- The calculator now captures name, email and phone before it reveals the fee. Revealing the fee posts a lead (source `pricing-calculator`) with the outcome (priced, or routed to Expert Session), so an abandoned payment still leaves a lead.
- The result shows the fixed fee plus the 50% holding deposit, with CTA "Secure My Feasibility".
- Stripe checkout now charges the 50% deposit, not the full fee. Metadata carries the full fee, deposit flag and balance; the webhook email reports "Deposit paid, awaiting detailed brief" with the balance due.
- After payment, /feasibility-confirmed unlocks the detailed project brief (the existing intake modal). Calculator answers (name, email, phone, floor area) carry forward via localStorage, so nothing is asked twice.
- The brief-submitted email is now titled "Project brief submitted, for Jodi" with a next-step row.

### Site-wide CTA rewiring (section 10) and homepage (section 01)
- Primary CTA is "Get Your Fixed Fee" routing to /pricing, everywhere: navbar (desktop and mobile), footer band, homepage hero, FAQ band, CTA blocks, all three tools, conversion pages, blog posts.
- Feasibility Package page CTAs are "Get Your Instant Fixed Fee" routing to the pricing calculator. Nothing opens the detailed intake pre-payment any more.
- The exit-intent popup, whose copy offers the free expert session, now says "Book a Free Expert Session" and goes to /contact.
- Homepage hero headline is "Feasibility-First Architecture." with "nationwide" moved into the supporting copy. Secondary CTA is "See How Feasibility Works" to /feasibility-package.
- Bridge line added after the five-step process: "If it's a Go, we can take it forward: planning, design, technical, tender and construction, with the same team throughout."
- hello@incollective.works replaced by hello@thistlearchitecture.co.uk on the footer, contact page and error messages.
- Trustpilot badge wording is evergreen: "5-star customer reviews on Trustpilot", no hard-coded count.
- Navigation label "Conversions" is now "Expertise" (nav and footer). The /conversions/ URLs are unchanged, per the brief.
- VAT wording on the package page changed from "+ VAT" to "inc. VAT", and the VAT FAQ answer updated to match "all fees inclusive of VAT".

## Decisions that need Ed's sign-off

1. **Balance timing wording.** The brief defines the 50% holding deposit but not when the balance is due. The site currently says: "the balance is due before your feasibility is delivered." Change on request.
2. **VAT-inclusive.** The brief's KEY line says all fees include VAT. The site previously said "+ VAT" and the FAQ said prices were exclusive. Both now say inclusive. This changes what customers pay in real terms, so worth an explicit confirmation.
3. **Deposit vs full £49.99.** Only the Architectural Feasibility checkout exists today. The £49.99 automated product still routes to the feasibility package page; its own pay-first flow is part of the package page restructure (next round).

## Operational blockers (for Ed / the team)

- **hello@thistlearchitecture.co.uk must be monitored.** It was swapped off the site on 11 August because nobody confirmed reading it. It is now the public address again per the brief. Confirm the inbox is watched.
- **Jodi's email as a Formspree recipient.** Brief-submitted notifications are flagged for Jodi but land in the shared feasibility inbox. To reach her directly, her address must be added and verified in Formspree (formspree.json plus CLI deploy).
- **Jodi's Calendly link** is needed for the Contact page three-route layout and the Expert Session booking flow.
- **New team photography and the studio B-roll video** are needed for the About page rewrite.
- **Original project folders** are needed for the case-study audit (section 04).
- **Highbury** content is needed to add it as a completed project (section 05).

## Still to do (next rounds)

- Section 03: Feasibility Package page restructure (pricing near the top, "What You Actually Receive" merge, updated five-steps wording, team strengthening incl. Jodi, £49.99 pay-first flow, HMO Checker made fainter as partner offer).
- Section 04: case-study audit against source folders, web crops of sketches.
- Section 05: Completed Projects reorder to Ed's ten, photo-only thumbnails, videos.
- Section 06: Expertise overview page, Co-Living & Large HMO page, search-intent H1s, title/meta dedup, sector FAQs.
- Section 07: About page rewrite (blocked on photography/video).
- Section 08: Contact three routes with Jodi profile and Calendly (blocked on link).
- Section 10: tracking events, full CTA/state QA on desktop and mobile.
