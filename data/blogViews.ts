// Views each article had on the old Wix site, read from archived snapshots of
// that site. They are the starting point, not the whole number: the counter adds
// live views on top, so a post that had been read 254 times carries on from 254
// rather than resetting to nothing.
//
// One exception. top-10-considerations-when-it-comes-to-self-building starts at
// zero because none of its archived snapshots rendered a counter, so there was
// no number to recover. If the figure turns up in Wix analytics, set it here.
export const seedViews: Record<string, number> = {
  "10-pros-and-cons-of-masonry-for-self-build-houses": 254,
  "brick-vs-stone-vs-concrete-masonry-in-self-build-homes": 68,
  "buying-vs-building-a-home-in-the-uk": 76,
  "class-ma-prior-approval-what-you-need-to-know": 18,
  "class-q-barn-conversions": 4,
  "how-much-does-it-cost-to-self-build-in-2023": 21,
  "how-to-find-the-right-self-build-architect": 36,
  "how-to-fund-a-self-build-home": 12,
  "self-build-icfs-construction": 48,
  "self-build-sips-construction": 907,
  "self-build-timber-frame-house": 105,
  "self-building-an-eco-home-in-the-uk": 68,
  "top-10-considerations-when-it-comes-to-self-building": 0,
};

export const seedFor = (slug: string): number => seedViews[slug] ?? 0;
