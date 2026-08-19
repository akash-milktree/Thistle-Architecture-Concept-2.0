import { NextResponse } from 'next/server';
import { getFeasibilityRoute, type ProjectInput } from '@/data/pricingData';

export const runtime = 'nodejs';

// Checkout for the Architectural Feasibility, per section 5 of Ed's pricing
// brief: questionnaire, calculated fixed fee, online payment, onboarding.
//
// THE PRICE IS RECALCULATED HERE AND THE CLIENT'S NUMBER IS IGNORED.
//
// That is the whole reason this route takes the answers rather than an amount.
// The calculator shows a price in the browser, so a posted amount is a number
// the customer controls: anyone could send £1 and the session would charge £1.
// The engine is pure and cheap, so it runs again on the server and that result
// is what gets charged. If the two ever disagree, the server wins.
//
// Stripe is not switched on yet. Until STRIPE_SECRET_KEY is set, this returns
// the priced enquiry so the caller can fall back to lead capture rather than
// dropping someone who has already reached a price.

const STRIPE_API = 'https://api.stripe.com/v1/checkout/sessions';
const SITE = 'https://www.thistlearchitecture.co.uk';

interface CheckoutBody {
  project: ProjectInput;
  email?: string;
  name?: string;
  address?: string;
}

export async function POST(request: Request) {
  let body: CheckoutBody;
  try {
    body = (await request.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid json' }, { status: 400 });
  }

  if (!body?.project) {
    return NextResponse.json({ ok: false, error: 'missing project' }, { status: 400 });
  }

  const route = getFeasibilityRoute(body.project);

  // A project that routes to an Expert Session must never reach payment, even
  // if something in the client asked it to. The brief is explicit: no price is
  // displayed and no payment is requested.
  if (route.route !== 'instant_payment') {
    return NextResponse.json({ ok: true, route: 'expert_session', reason: route.reason });
  }

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    // Prepared, not live. The caller treats this as "take the lead instead".
    return NextResponse.json({
      ok: true,
      route: 'payment_unavailable',
      price: route.price,
      message: 'Card payment is not switched on yet.',
    });
  }

  // Stripe's REST API directly, so the project carries no SDK dependency until
  // someone decides it needs one. Amount is in pence.
  const form = new URLSearchParams({
    mode: 'payment',
    'line_items[0][quantity]': '1',
    'line_items[0][price_data][currency]': 'gbp',
    'line_items[0][price_data][unit_amount]': String(route.price * 100),
    'line_items[0][price_data][product_data][name]': 'Architectural Feasibility',
    'line_items[0][price_data][product_data][description]':
      'Fixed-fee architectural feasibility, delivered in five working days.',
    success_url: `${SITE}/feasibility-confirmed?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE}/pricing?cancelled=1`,
    // The scope that was priced, so a dispute can be settled against what was
    // actually answered rather than what anyone remembers.
    'metadata[gia]': String(body.project.gia ?? ''),
    'metadata[base]': String(route.base),
    'metadata[uplift]': String(route.uplift),
    'metadata[factors]': String(route.factors),
    'metadata[address]': (body.address ?? '').slice(0, 490),
  });
  if (body.email) form.set('customer_email', body.email);

  try {
    const res = await fetch(STRIPE_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: form,
    });
    const session = (await res.json()) as { url?: string; error?: { message?: string } };
    if (!res.ok || !session.url) {
      console.error('[checkout] stripe rejected the session', session.error?.message);
      return NextResponse.json({ ok: false, error: 'checkout unavailable' }, { status: 502 });
    }
    return NextResponse.json({ ok: true, route: 'payment', url: session.url, price: route.price });
  } catch (err) {
    console.error('[checkout] stripe unreachable', err);
    return NextResponse.json({ ok: false, error: 'checkout unavailable' }, { status: 502 });
  }
}
