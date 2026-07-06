import { NextResponse } from 'next/server';

// Forwards lead payloads to the CRM webhook when configured.
// LEAD_WEBHOOK_URL is the Milktree CRM inbound webhook.
export async function POST(request: Request) {
  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid json' }, { status: 400 });
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        return NextResponse.json({ ok: false }, { status: 502 });
      }
    } catch {
      return NextResponse.json({ ok: false }, { status: 502 });
    }
  } else {
    console.log('[lead]', JSON.stringify(data));
  }
  return NextResponse.json({ ok: true });
}
