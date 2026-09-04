import React from 'react';
import Link from 'next/link';

/**
 * Item 77. The enquiry form and both calculator email steps collected a name,
 * an email and a phone number with no consent line, no explanation of use and
 * no link to the privacy notice beside the field.
 *
 * Short on purpose. The requirement is that somebody about to type their email
 * can see what it is for and where the detail lives, without leaving the form.
 * The privacy notice itself carries the full picture.
 */
export const PrivacyNote: React.FC<{ purpose: string; className?: string }> = ({
  purpose,
  className = '',
}) => (
  <p className={`text-[11px] leading-relaxed text-thistle-black/45 ${className}`}>
    {purpose} We do not sell your details or add you to a marketing list without asking.{' '}
    <Link href="/privacy" className="underline underline-offset-2 hover:text-thistle-black/70">
      Privacy notice
    </Link>
    .
  </p>
);
