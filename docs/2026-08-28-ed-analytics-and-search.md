# Ed's two emails, 27 August 2026: analytics, Search Console, the rebrand article, author bios

Ed pulled four items forward because they hold up the search and reporting work.
This is what has been built, what is waiting on him, and the exact list of things
he asked us to specify.

Short version: two of the four are done and live. The other two are finished on
our side and cannot go further without an account only he can open.

| His item | State |
|---|---|
| 33, analytics | Built and deployed, switched off. Needs one code from him to go live. |
| Search Console | Nothing we can do until the property exists. Two routes below. |
| 50, rebrand article | Published on HMO Designers with the canonical. Done. |
| 29, author bios | Fields built and live, Ed's photograph in place. Bios are his to write. |

---

## 1. Item 33, analytics

### What is built

The whole measurement layer is written, tested and deployed. It is switched off.

It stays off until one environment variable holds the GA4 Measurement ID. With
no ID the site loads no Google script, sets no cookie and makes no request to
Google. We checked that in a browser rather than assuming it: on the live site
today there are zero requests to Google, no `gtag`, and no consent banner.

Every event in the brief is wired:

| Ed's brief | What fires it |
|---|---|
| Calculator started | The first field a visitor changes, on all four tools |
| Calculator completed | The full result appearing: the unlock on the two calculators, the verdict on the Class MA checker, the price reveal on the pricing calculator |
| Payment started | The moment checkout is requested, on both paid products |
| Payment paid | Stripe returning the customer to the confirmation page |
| Payment abandoned | Stripe returning them after they backed out |
| Jodi calls | A request submitted on the Expert Session card |
| Bookings | Built but not firing, see below |

Each event carries which tool or product it came from, and the payment events
carry the fee, so the funnel can be read per product rather than as one average.

**Bookings is the one gap, and it is not a code gap.** There is nothing to book
against until Jodi's Calendly link exists, which is still item 1 on the
outstanding list. A request for a call is not a confirmed booking, and reporting
one as the other would flatter the numbers. The event is defined and ready. When
the link lands it is a two-line change.

### What we need from Ed

He asked to own the property, which is right, so it has to be created inside his
Google account. Two ways, and the first is less work for him:

**Either** add `info@milktreeagency.com` as an Administrator on his Google
Analytics **account** at analytics.google.com, under Admin, Account access
management. We then create the property inside his account, so it belongs to
Thistle from the first day and no contractor can take it away.

**Or** he creates the property himself, for `thistlearchitecture.co.uk`, and
sends us the Measurement ID. It looks like `G-` followed by ten characters, and
it is in Admin, Data streams, on the web stream. He should then add
`info@milktreeagency.com` as Administrator so we can finish the setup.

Either way we then set the ID in Vercel, redeploy, and confirm the funnel is
reporting. About half a day, and most of that is watching real events arrive.

Two jobs inside GA4 come after that, and both need the property to exist first:
registering the event details as custom dimensions so they show up in reports,
and marking the payment events as key events so they count as conversions.

### One thing he did not ask for, which we built anyway

There is now a cookie banner.

Analytics cookies need opt-in consent in the UK. The site's cookie policy already
told visitors that analytics cookies were in use, which was true of the policy
and not of the site, and there was nothing to consent with. Switching GA4 on
without asking would have made that page inaccurate and put Thistle on the wrong
side of the rules.

So analytics runs in Google's consent mode with everything denied until a visitor
accepts. Accept and reject carry the same visual weight, because a buried reject
is the pattern the ICO objects to. Advertising cookies stay off permanently,
since the site runs no advertising and the policy says so.

The banner only appears once analytics is switched on. Nobody is asked to consent
to something that is not running.

---

## 2. Search Console

Ed checked and confirmed there is no property for `thistlearchitecture.co.uk`. He
is right, and it means there is no search data on the new site at all since the
launch.

We cannot create it. It has to be opened from inside a Google account, and it
should be his so that ownership sits with Thistle.

### The faster of the two routes

A **Domain property** covers every subdomain and both http and https at once, and
it is the better property to hold. It can only be verified with a DNS record.

1. Ed adds the property at search.google.com/search-console, choosing Domain and
   entering `thistlearchitecture.co.uk`.
2. Google shows a TXT record. He sends us that one line.
3. We add it at GoDaddy, which is where the DNS actually lives, and tell him.
4. He presses Verify, then adds `info@milktreeagency.com` as a user.
5. We submit the sitemap, which is already live and correct at
   `https://www.thistlearchitecture.co.uk/sitemap.xml`, and covers 73 pages.

Ed said verification would need to come from our side because we hold the DNS.
Half right: we can add the record, but only the account holder can start the
property and read the value we need to add. So it is one message each way.

**If that stalls,** there is a second route that needs no DNS at all. A URL prefix
property can be verified with a tag in the page, and we have already shipped the
support for it: send us the verification code and it is live in one deploy, with
no registrar login involved. It covers less than a Domain property, so it is the
fallback rather than the plan.

### hmodesigners.co.uk

Ed's access there is under an old personal Gmail and he wants
`edward@thistlearchitecture.co.uk` added as an owner, plus the same on GA4 if we
hold it.

Both are account actions in Google's console rather than anything in the code, so
they sit with whoever holds the Milktree Google login. Neither is difficult and
both are inside his end-of-next-week deadline. Worth doing at the same time as
the Thistle property so it is one sitting rather than three.

---

## 3. Item 50, the rebrand article

**Done and published**, at
`https://hmodesigners.co.uk/hmo-designers-thistle-architecture-rebrand/`.

Scarlett's copy, unchanged, taken from the version already published on Thistle so
the two cannot drift apart.

The canonical tag points at the Thistle article, which was the point of the
exercise. Two near-identical pages compete and Google may rank neither. With the
tag, the ranking value flows to the Thistle page instead, which is what the
announcement is for.

Checked against the handover document, on the built site, before it went out:
canonical correct, title tag and web address exactly as specified, one main
heading, all seven section headings in the right order, both tables rendering as
real tables that scroll sideways on a phone without dragging the article with
them, both links to thistlearchitecture.co.uk followed rather than blocked,
"Jodi" spelled correctly, and the article showing on the blog index.

Two small pieces of groundwork were needed and are worth knowing about, because
they now exist for any future article: that site could not point a canonical at
another domain at all, and its headings were worked out from the title, so it
could not have a title written for Google and a different headline written for
the reader. Both are now options, and every existing article is untouched.

---

## 4. Item 29, the author boxes

Ed is right that a name with no photograph and no bio is worse than nothing.

### What is done

The author box now takes a photograph, a short bio and a profile link, all
editable in the CMS. All three are optional, so an article nobody has filled in
looks exactly as it did before rather than breaking.

Ed's photograph is already in place on all fourteen Thistle articles. It is the
same picture already published on the About page, so it needed no new file and no
approval from him.

Each article's hidden data for Google now carries the author's photograph, bio and
profile link when they exist. That is the part that actually affects being
"credited to Google as the author". A name and a job title are thin evidence that
an author is a real person with relevant experience. A face, a line of background
and a link Google can check elsewhere are what it looks for.

**No bio has been written.** Ed offered to send the wording, and a bio is a claim
about a person's expertise published in their name, so it is his to write rather
than ours to invent across fourteen live pages.

### Exactly what we need, and for whom

He asked us to be specific. This is the whole list.

**Jodi.** Everything, because we hold nothing for her at all.
1. A photograph. Head and shoulders, looking at the camera, plain background, to
   match the six team photographs we already have. At least 800 by 800 pixels.
2. Her full name as she wants it published. The site only ever says "Jodi".
3. Her job title. The site currently describes her as "Business Development and
   Expert Sessions", which was our wording, not hers.
4. Two or three sentences of bio.

**Kaan.** We have his photograph already.
1. His full name as he wants it published. The About page says only "Kaan". His
   messages sign off as Halil Kaan Taskin, and we did not want to publish that
   without asking.
2. Two or three sentences of bio.

**Ed.** We have his photograph and it is already live.
1. Two or three sentences of bio.

**All three, optional but worth having.** A LinkedIn profile address each. It
gives Google a second, independent source confirming the author is a real person,
which is the single cheapest thing that can be done for author credibility.

**On the bios.** Two or three sentences, about that person's own experience rather
than about the practice, and ideally saying why they are worth reading on the
subjects they write about. Roughly forty to sixty words. If it is easier, we can
draft all three from the wording already approved on the About page and send them
back for him to correct, which is usually faster than writing from a blank page.

### The HMO Checker articles

These are the boxes Ed says have been live since June showing a name and nothing
else. That site is not one we hold the code for, so we cannot fix it from here.
The assets above are the same ones it needs, so one set of files covers both
sites. Once we know who is credited on those articles we can say whether anything
beyond the list above is required, and who needs to make the change.

---

## What happens next

**Waiting on Ed, and nothing moves without them:**
1. Either Administrator access to his Google Analytics account, or the Measurement
   ID once he creates the property.
2. The Search Console Domain property opened, and the TXT record value sent over.
3. Photograph, full name and job title for Jodi. Full name for Kaan. A bio for
   each of the three, or a yes to us drafting them from the About page.
4. Still outstanding from before, and still the thing holding two features:
   Jodi's Calendly link.

**Ours, as soon as those land:**
1. Set the Measurement ID, redeploy, watch the funnel report, then set up the
   custom dimensions and mark the key events.
2. Add the DNS record at GoDaddy, and submit the sitemap once verified.
3. Add `edward@thistlearchitecture.co.uk` as an owner on the hmodesigners.co.uk
   property, and on its GA4 if we hold it.
4. Fill in the author boxes and wire the booking event.
