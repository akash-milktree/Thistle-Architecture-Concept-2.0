// Real client reviews, replacing ten invented testimonials that had been live
// since the first build (Marcus Cole / Sterling Property Group and the rest).
// None of those people or companies existed.
//
// Source: Thistle Architecture's Trustpilot profile, read 18 August 2026 and
// again 5 September 2026. Seven reviews, all five star, all from 2026, all
// about Thistle rather than a parent company.
//
// Google was checked too and deliberately not used. Its five reviews are three
// years old, three of them name inCollective and "Tim" who is not on the
// Thistle team, one has no text beyond "Brilliant service and very helpful",
// and one is from a Ben Kercher, which shares a surname with the founder.
// Trustpilot is both more recent and actually about this practice.
//
// `quote` is always a verbatim, contiguous excerpt. Words are never changed or
// reordered, including the original spelling and typos, and every card links to
// the full review so anyone can check it.

export interface Review {
  /** Reviewer name exactly as published. */
  author: string;
  /** Review title as published, where there is one. */
  title?: string;
  /** Verbatim contiguous excerpt. Never edited. */
  quote: string;
  /** Publication date shown on the review. */
  date: string;
  /** Machine-readable form of the same date, for schema.org. */
  datePublished: string;
  rating: 5;
  /**
   * Which page this review is most relevant to, so a single review can be
   * dropped into context rather than showing a generic set everywhere.
   */
  topics: Array<'feasibility' | 'hmo' | 'commercial' | 'planning'>;
}

export const REVIEWS_URL = 'https://uk.trustpilot.com/review/thistlearchitecture.co.uk';

export const reviews: Review[] = [
  {
    author: 'Maywood Group',
    title: 'The Best Money I Spent Before Buying a Property',
    quote:
      "I booked a feasibility study before committing to the purchase of a property I intended to convert into an HMO. The team were thorough, professional and, most importantly, completely honest. Although the outcome wasn't what I initially hoped for due to planning constraints, the study identified significant risks that could have cost me a substantial amount of money had I proceeded without proper due diligence.",
    date: '30 June 2026',
    datePublished: '2026-06-30',
    rating: 5,
    topics: ['feasibility', 'hmo'],
  },
  {
    author: 'Liam Thomas',
    title: 'Professional, Commercial and Solutions-Focused',
    quote:
      'We have been working with Ed and the team at Thistle Architecture on a complex office-to-residential conversion and roof extension project in Winchester, and the service throughout has been excellent. Ed has been proactive, commercially minded and solutions-focused from day one.',
    date: '12 May 2026',
    datePublished: '2026-05-12',
    rating: 5,
    topics: ['commercial', 'planning'],
  },
  {
    author: 'Sunny Berhane',
    title: 'A Great Team',
    quote:
      "I've worked with Edward and Kaan on several planning applications now, all of which have resulted in positive outcomes. They consistently provide a high standard of work, are thorough in their approach, and understand how to present a strong planning case.",
    date: '7 August 2026',
    datePublished: '2026-08-07',
    rating: 5,
    topics: ['planning'],
  },
  {
    author: 'Gemma',
    quote:
      'I decided to work with Ed and the team due to their experience in HMO conversions. I was purchasing my first building to convert and needed expert guidance. The whole process was so enjoyable and the results were fantastic!',
    date: '18 May 2026',
    datePublished: '2026-05-18',
    rating: 5,
    topics: ['hmo'],
  },
  {
    author: 'Adam Cooper',
    title: 'Ed and his team are always friendly',
    quote:
      'Ed and his team are always friendly, professional and positive. They are exactly the team you want when working on complex projects.',
    date: '20 August 2026',
    datePublished: '2026-08-20',
    rating: 5,
    topics: ['planning'],
  },
  {
    author: "Lewis O'Hara",
    title: 'Highly recommend!',
    quote:
      'Used Ed and his team to put my property through planning etc.. couldn’t fault them, came up with some great ideas and drawings.. would highly recommend!',
    date: '20 August 2026',
    datePublished: '2026-08-20',
    rating: 5,
    topics: ['planning'],
  },
  {
    author: 'Joel Walker',
    quote:
      'Thistlearchitecture recently did the full planning application on a Hotel we own to which they gain planning permission to turn it into a 9 bedroom HMO. Great service throughout, always easy to get on the phone and very details with their work.',
    date: '1 April 2026',
    datePublished: '2026-04-01',
    rating: 5,
    topics: ['hmo', 'commercial', 'planning'],
  },
];

/** The most relevant review for a given page, falling back to the first. */
export const reviewFor = (topic: Review['topics'][number]): Review =>
  reviews.find((r) => r.topics[0] === topic) ?? reviews.find((r) => r.topics.includes(topic)) ?? reviews[0];

/**
 * One named review, for a page that has to show a particular one.
 *
 * Item 73 of Ed's September 2026 list: the topic lookup above put Gemma on
 * both HMO pages and Liam Thomas on both commercial pages, and Liam's review
 * describes an office-to-residential job, which is not mixed use. Pinning by
 * author is how each of the five conversion pages now gets its own review,
 * chosen to match the service. Returns undefined rather than falling back, so
 * a mistyped name shows no review instead of the wrong one.
 */
export const reviewByAuthor = (author: string): Review | undefined =>
  reviews.find((r) => r.author === author);
