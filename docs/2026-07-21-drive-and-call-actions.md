# Actions from Ed's Drive share + the pricing call

Compiled 2026-07-21 from the call transcript Akash pasted, cross-checked against
the codebases.

## Read this first: the transcript is mostly NOT Thistle

That call was overwhelmingly an **HMO Checker** product call: subscription tiers
(£14.99 / £18.99 / enterprise), "Source While You Sleep" search allocations,
density checker, pay-as-you-go button, trial banners, greyed-out ratings,
CRM webhook, and a user journey flowchart for Jody and Christy.

The action items filed under "Akash" in that summary are **HMO Checker** items:

- "Update the pricing page within the next hour or two" -> HMO Checker pricing.
- "Update the entire website content and pricing" -> HMO Checker.
- "User journey flowchart for Jody and Christy" -> HMO Checker.

**None of those are Thistle Architecture.** Thistle has one price (the £298
feasibility) and no subscription tiers. Do not apply any of that pricing work to
this repo. Flagged because the summary reads as if it is all one workstream.

Only three items in the whole call touch Thistle:

1. (19:43) Ed shared a Google Drive folder of video and photo content; Akash to
   review size and upload relevant material to the website.
2. (19:43) "The completed projects page will be updated with case studies from
   HMO Designers and Fiscel websites."
3. (20:09) Ed to record an additional video about Thistle covering completed
   projects and case studies. **Ed's action, not ours. Blocked on him.**

## Blocker: the Drive folder is not reachable

Searched the connected Google Drive account: shared-with-me folders, owner
`edward@thistlearchitecture.co.uk` and variants, and titles containing Thistle /
HMO / Fiscel / Completed Projects. **No such folder.** No link was pasted either.

It is either shared with a different address than the one connected here, or the
link never reached us. Needed to proceed: the folder URL, or the folder shared
with the connected account.

Note we may already hold much of it. The 6.25GB `OneDrive_2026-07-16.zip`
(external drive) was Ed's video and photo content and has already been mined:
the homepage hero drone footage, Beauchamp House, Monument House, Wigan Church,
162 Millbrook and Bereweeke Avenue all came from it. **Check whether the Drive
folder is the same content before downloading 6GB again.**

## The real job: port HMO Designers' completed projects to Thistle

This is the item Akash flagged and it can start now, without the Drive.

`~/Downloads/Projects/hmo_designer/site` holds **10 completed HMO projects** as
structured JSON in `content/projects/*.json`, with **93 gallery images, all
present on disk** (61MB in `public/images/projects/`). Real finished-build
photography, which is exactly what Thistle's Completed Projects tab lacks.

| Slug | Title | Subtitle | Body chars | Images |
|---|---|---|---|---|
| derby-road | Derby Road - South Coast | Ultra Luxury 8-bed HMO | 126 | 10 |
| geroge-street | George Street - Eastleigh | 7-bedroom HMO in Eastleigh, Hampshire | 278 | 15 |
| high-end-hmo-design-project | HMO Project - South Coast | Queens Road - 7 Bedroom HMO | 390 | 6 |
| hmo-construction-project-shadwell | HMO Project - Portsmouth | Shadwell Road - 7 Bedroom HMO | 179 | 7 |
| hmo-project-bedhampton | HMO Project - London Surrey | Project Surrey - 7 Bedroom HMO | 480 | 8 |
| hmo-project-chalkridge | HMO Project - London | Chalkridge - 7 Bedroom HMO | 301 | 6 |
| hmo-project-crawley | HMO Project - Gillingham | Project Burlington - 7 Bedroom | 155 | 7 |
| hmo-project-southampton | HMO Project - Southampton | Burlington Road - 7 Bedroom Essential HMO | 179 | 9 |
| hmo-property-surrey | HMO Property - Southend-on-Sea | Project Prince - High-end 7-Bedroom HMO | 273 | 10 |
| large-hmo-south-sea | Large HMO - South Sea | 8 Bedroom Luxury Co-living | 77 | 15 |

Data problems to fix on the way in, not copy across:

- `geroge-street` is a typo for George, and its subtitle misspells "Eastliegh".
  Keep the old slug on HMO Designers, use a corrected one on Thistle.
- Several slugs and titles disagree on location: `hmo-project-crawley` is titled
  Gillingham, `hmo-property-surrey` is titled Southend-on-Sea,
  `hmo-project-bedhampton` is titled "London Surrey". **Ed must confirm the real
  location of each before we publish an address.**
- Body copy is short (77 to 480 chars) and written for HMO Designers. It needs
  rewriting in Thistle's voice, and it names third parties ("in collaboration
  with L&K Estates and the interior designers, roost") which needs a decision on
  whether Thistle credits them too.
- These are HMO Designers' projects. Both are Thistle Group and incollective is
  the parent, so reuse is fine in principle, but the copy should not imply
  Thistle did work HMO Designers did. Frame as group delivery.

Suggested approach: add them as `kind: 'project'` entries in
`data/caseStudiesData.ts` with a `Thistle Group` provenance note, copy the images
into `public/images/projects/hmo-*/`, and rewrite each body. That takes Completed
Projects from 5 entries to 15, all with real photography.

## "Fiscel"

The transcript says case studies should also come from the "Fiscel" website.
No such name appears in any codebase or in the group brands we know
(Thistle Architecture, HMO Designers, HMO Checker, incollective). Likely a
mis-transcription. **Ask Ed what Fiscel is and where the site is.**

## Task list

Blocked on Ed:
- [ ] Drive folder link, or share it with the connected account.
- [ ] Confirm whether the Drive folder duplicates the 6.25GB OneDrive zip.
- [ ] Confirm the true location of each HMO Designers project (see conflicts).
- [ ] Confirm whether to credit third parties (L&K Estates, roost).
- [ ] What is "Fiscel" and where is its site?
- [ ] Record the Thistle video (his action, 20:09).
- [ ] Still outstanding from 8 July: TrustPilot text, client reviews, job titles
      for Adouj and Beverley, Kaan's title, Highbury and Stanmore feasibility
      documents, more developer logos.

Can start now:
- [ ] Port the 10 HMO Designers projects into Thistle's Completed Projects,
      with corrected slugs, rewritten copy, and images optimised for web.
- [ ] Hold publishing any project whose location Ed has not confirmed.

Explicitly NOT ours (HMO Checker, different product):
- Pricing tiers, Source While You Sleep, pay-as-you-go, trial banners,
  greyed-out ratings, CRM webhook, Jody/Christy user journey flowchart.
