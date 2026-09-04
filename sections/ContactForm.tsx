"use client";

import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../components/animations/Reveal';
import { PrivacyNote } from '../components/ui/PrivacyNote';

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// General enquiry form. It posts to /api/leads rather than an endpoint of its
// own, tagged with its own source, so it lands in the same inbox as the tool
// leads and needs no extra form setting up on the Formspree project.
//
// Deliberately short. Anyone with a live scheme is better served by the
// feasibility form, which asks the questions that actually let the team price
// the work; this is for everyone else, so asking more than name, email and a
// message would only put them off.
interface ContactFormProps {
  /**
   * The practice phone number, for the "if it is urgent" line in the success
   * message. Passed in from the CMS settings document rather than written here,
   * because this line quotes the same number the footer and contact details
   * show — hardcoding it meant changing the number in the CMS left this one
   * copy behind, still telling people to ring the old one.
   *
   * Only the success message is CMS-driven. Every field label, placeholder,
   * validation message and button state in this form stays in code: they are
   * functional UI, and an edit that breaks one breaks lead capture silently.
   */
  phone?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ phone: contactPhone = '0808 175 5405' }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');

  const ready = name.trim().length > 1 && emailOk(email) && message.trim().length > 4;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready || status === 'submitting') return;
    setStatus('submitting');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: 'contact-form', email, Name: name, Phone: phone, Message: message }),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  const field =
    'w-full border border-thistle-black/10 rounded-xl px-4 py-3 text-fluid-sm bg-thistle-white/50 focus:border-thistle-green focus:ring-1 focus:ring-thistle-green/20 outline-none transition-colors placeholder:text-thistle-black/25';

  if (status === 'done') {
    return (
      <div className="bg-white rounded-2xl border border-thistle-black/[0.08] p-fl-6 text-center">
        <p className="text-fluid-base text-thistle-black mb-fl-2">Thanks, that has reached us.</p>
        <p className="text-fluid-sm text-thistle-black/60">
          We reply within one working day. If it is urgent, call {contactPhone}.
        </p>
      </div>
    );
  }

  return (
    <Reveal>
      <form onSubmit={submit} className="bg-white rounded-2xl border border-thistle-black/[0.08] p-fl-6 flex flex-col gap-fl-4">
        <div className="grid sm:grid-cols-2 gap-fl-4">
          <label className="flex flex-col gap-fl-2">
            <span className="text-fluid-sm text-thistle-black/70">Your name</span>
            <input className={field} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
          </label>
          <label className="flex flex-col gap-fl-2">
            <span className="text-fluid-sm text-thistle-black/70">Email</span>
            <input type="email" className={field} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="you@company.co.uk" required />
          </label>
        </div>

        <label className="flex flex-col gap-fl-2">
          <span className="text-fluid-sm text-thistle-black/70">Phone <span className="text-thistle-black/35">(optional)</span></span>
          <input type="tel" className={field} value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
        </label>

        <label className="flex flex-col gap-fl-2">
          <span className="text-fluid-sm text-thistle-black/70">How can we help?</span>
          <textarea rows={5} className={`${field} resize-y`} value={message} onChange={(e) => setMessage(e.target.value)} required />
        </label>

        <div className="flex flex-wrap items-center gap-fl-4">
          <button
            type="submit"
            disabled={!ready || status === 'submitting'}
            className="inline-flex items-center justify-center gap-1.5 text-fluid-sm font-medium px-6 py-3 rounded-full bg-thistle-green text-thistle-black hover:bg-thistle-green/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? 'Sending…' : 'Send enquiry'}
            <ArrowUpRight size={16} />
          </button>
          <p className="text-xs text-thistle-black/45">We reply within one working day.</p>
        </div>

        {/* Item 77. */}
        <PrivacyNote purpose="We use these details to answer your enquiry and to talk through your project." />

        {status === 'error' && (
          <p aria-live="polite" className="text-fluid-sm text-red-700">
            Something went wrong. Please try again, or email hello@thistlearchitecture.co.uk.
          </p>
        )}
      </form>
    </Reveal>
  );
};
