# Pricing page and feasibility calculator

Built from Ed's "Pricing & Feasibility Calculator Brief" (12 August, archived at
`docs/2026-08-12-pricing-and-calculator-brief.pdf`).

## What is live

- **`/pricing`**: the four products, the calculator, the fee tables, and what
  the £49.99 appraisal covers. In the nav, in the sitemap, canonical set.
- **`data/pricingData.ts`**: the pricing engine, following the brief's own
  reference implementation.
- **`npm run pricing-check`**: 45 assertions against the document rather than
  against the code. Both edges of all six area bands, all seven worked examples
  from page 6, all ten hard stops, every complexity uplift, the heritage
  non-stacking rule and both safety stops.
- **`/api/checkout`**: prepared for Stripe, see below.

## Stripe: what is needed to switch payment on

The route is written and wired. It needs one environment variable:

```
STRIPE_SECRET_KEY=sk_live_...      # or sk_test_... to try it first
```

Set it in Vercel (`vercel env add STRIPE_SECRET_KEY`) for Production, Preview
and Development. Nothing else is required: the route talks to Stripe's REST API
directly, so there is no SDK to install and no version to keep current.

Until that variable exists the route answers `payment_unavailable` and the
calculator sends the person to the enquiry form with their answers, so nobody
who reaches a price falls out of the funnel.

**The price is recalculated on the server and the browser's number is ignored.**
That is deliberate and worth not undoing. The calculator shows a price in the
page, so anything the client posts is a number the customer controls; a posted
amount would let someone pay £1. The engine is pure, so it runs again in the
route and that result is what gets charged.

Still to do once keys are in:
- [ ] A webhook at `/api/checkout/webhook` for `checkout.session.completed`, so
      a paid feasibility creates the project rather than relying on the success
      redirect, which a customer can close.
- [ ] Decide whether the £49.99 automated product also takes card here, or stays
      with the existing enquiry flow.
- [ ] The success page at `/feasibility-package?paid=1` currently just returns
      to the package page.

## Three things in the brief for Ed

1. **The development-strategies threshold contradicts itself.** The hard-stop
   list says "two or more fundamentally different development strategies", but
   the brief's own reference code says `>= 3` and its questionnaire prices
   "+1 alternative" as a £75 uplift, sending only "several" to an Expert
   Session. Two of the three agree, so the build uses 3. If Ed meant two, the
   £75 "one additional design option" uplift can never be charged.

2. **The ">£250 uplift" safety rule cannot currently fire on its own.** The two
   largest uplifts are Grade II at £150 and mixed use at £100, which sum to
   exactly £250, and any third factor already trips the 3-factor rule. Harmless,
   and load-bearing again the moment an uplift value rises, but it is doing no
   work today.

3. **"Jodie" or "Jodi".** The brief says Jodie. `formspree.json` uses
   `jodi@thistlearchitecture.co.uk` and a client's Trustpilot review says Jodi.
   The page currently avoids the first name; worth settling before it appears in
   the Expert Session copy.

## Not built yet, from section 5

- The exit-intent popup for the feasibility form. One already exists at
  `components/ExitIntentPopup.tsx` and is used on `/feasibility-package`; the
  brief's version has different rules (only after meaningful form interaction,
  once per session, never after purchase or once an Expert Session is booked)
  and should extend that rather than duplicate it.
- The "Bespoke Feasibility Required" manual override, which is an internal
  process rather than a page.
