import React from 'react';
import { reviews, REVIEWS_URL } from '../../data/reviewsData';

// A compact proof badge for use next to a call to action, where the full review
// section would be too much.
//
// Two things it deliberately does not do.
//
// It does not embed Trustpilot's official widget. That was tried on 18 August,
// on the reasonable argument that a third-party embed reads as more authentic
// than a badge we draw ourselves. It cannot be done on this account.
//
// Thistle's Trustpilot profile is on the free tier, and every TrustBox template
// was checked against their business unit (6a00407e1ded7e5a2b924339). All of
// them return "BusinessUnit does not have access to that trustbox": micro
// combo, micro star, review count, TrustScore, mini, carousel, grid,
// horizontal, starter, list and drop-down.
//
// The failure mode is what makes this worth recording. A blocked TrustBox does
// not render empty or error, it renders Trustpilot's sample data. On the first
// attempt the feasibility hero displayed "Excellent, 4.5 stars, 390 reviews",
// which belongs to an unrelated company. Shipping that would have put a false
// claim on the site, in the same place we had just removed invented
// testimonials from.
//
// If Thistle upgrades to a paid Trustpilot plan the widget becomes the better
// answer and this should be revisited.
//
// It does not reproduce the Trustpilot logo. The name is used as plain text in
// a link to the profile, which is attribution rather than trademark use.
//
// The wording is evergreen on purpose. Ed's August 2026 final brief: "use
// evergreen wording such as '5-star customer reviews on Trustpilot'; do not
// hard-code the number of reviews". A count goes stale the day a review lands,
// and this badge is on every page. What it claims is still checkable on the
// link, and the star row only fills when every review really is five star.

const allFiveStar = reviews.every((r) => r.rating === 5);

interface TrustpilotBadgeProps {
  /** 'light' for dark backgrounds. */
  tone?: 'dark' | 'light';
  className?: string;
}

export const TrustpilotBadge: React.FC<TrustpilotBadgeProps> = ({ tone = 'dark', className = '' }) => {
  const text = tone === 'light' ? 'text-white/70' : 'text-thistle-black/55';
  const strong = tone === 'light' ? 'text-white' : 'text-thistle-black';
  const border = tone === 'light' ? 'border-white/15 hover:border-white/30' : 'border-thistle-black/10 hover:border-thistle-black/25';

  return (
    <a
      href={REVIEWS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-fl-3 rounded-full border ${border} px-4 py-2 transition-colors ${className}`}
    >
      <span className="flex gap-0.5" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <svg key={i} width="13" height="13" viewBox="0 0 20 20" fill="currentColor" className="text-thistle-green">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </span>
      <span className={`text-xs ${text}`}>
        <span className={`font-medium ${strong}`}>
          {allFiveStar ? '5-star customer reviews' : 'Customer reviews'}
        </span>{' '}
        on <span className={`font-medium ${strong}`}>Trustpilot</span>
      </span>
    </a>
  );
};
