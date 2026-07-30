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

## Drive folder: OPENED AND MINED 2026-07-29

Link: https://drive.google.com/drive/folders/1WmU1rviEFwLcjnl-nhC6VYTdfTHKgoxa

It is link-shared, not shared to the connected account, so the Drive connector
cannot see it. It has to be browsed anonymously. Files download via
`https://drive.usercontent.google.com/download?id=<ID>&export=download&confirm=t`.

**The folder is misnamed.** It is called "Eds Home Reno" but it is a video and
photo library, not a home renovation. Ten top-level folders in two groups:

**Group A, used:** `HMO Marketing` holds three completed projects, each with a
50-shot Canon 5D marketing set: **81 The Crescent**, **Bishopstoke Road HMO
Conversion** and **Eastleigh HMO**. All three are now live (see
docs/case-study-confirmations.md for the open questions).

**Group B, not used:** `Intro footage` (5 edited property films, 100 to 200MB
each), `Ed Filming Day` (14 clips plus a Drone subfolder holding 3.35GB of raw
DJI footage from July 2024), `1. homes under the hammer BTS shoot`,
`2. Ed's Advert`, `3. Ed's HMO Event`, `14-03-2025 (day in the life shoot)`,
two dated folders, and `Assets > Eds homes photos` (20 photos and 16 videos,
all WhatsApp-compressed at 200 to 800KB, so not publication quality).

**There is not a single document in the whole folder.** No feasibility studies,
no drawings, no schedules. It is imagery only, so it fills galleries and heroes
but cannot produce a written case study on its own.

One useful cross-reference: the film `7FESTINGRD_16x9_V3.mp4` identified the
Southsea Co-Living project as Festing Road, Southsea. The opening street shot
and the interiors match that gallery frame for frame.

It does NOT duplicate the 6.25GB OneDrive archive; that one was project
photography and drone footage for Monument House, Wigan Church, Millbrook,
Bereweeke and Beauchamp. This one is Ed's personal-brand video plus the three
HMO marketing sets.

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

## "Fiscel": RESOLVED, it is Thistle

Akash confirmed 2026-07-29 that "Fiscel" is a whisper transcription error for
Thistle. There is no third site. The instruction is therefore just: pull case
studies from the HMO Designers and Thistle material. Nothing further to ask Ed.

## Task list

Blocked on Akash:
- [x] Drive folder link supplied and mined 2026-07-29.
- [ ] Check the Highbury and Stanmore feasibility documents before the question
      list goes to Ed; they may already be in hand.
- [ ] Supply the Google Business Profile links for Thistle Architecture and HMO
      Designers so the real reviews can be pulled (decision 2026-07-29: use
      Google reviews from BOTH brands as the testimonial source).

Blocked on Ed:
- [ ] Confirm the true location of each HMO Designers project (see conflicts).
- [ ] Confirm whether to credit third parties (L&K Estates, roost).
- [ ] Record the Thistle video (his action, 20:09).
- [ ] Still outstanding from 8 July: TrustPilot text, job titles for Adouj and
      Beverley, Kaan's title, more developer logos.

Resolved 2026-07-29:
- [x] "Fiscel" is a transcription error for Thistle. Not a separate site.
- [x] Client reviews source settled: Google reviews, Thistle and HMO Designers.

Done 2026-07-29:
- [x] Ported **7 of the 10** HMO Designers projects into Completed Projects,
      with corrected slugs, rewritten copy and 78 images copied in. Completed
      Projects goes from 5 entries to 12. Every ported entry carries a new
      `provenance` field ("By HMO Designers, part of Thistle Group") which
      renders on both the card and the detail page, so nothing implies Thistle
      Architecture did the job itself.
- [x] Held the 3 projects whose location the sources disagree on. See the
      block comment in `data/caseStudiesData.ts` for exactly why each one is
      out. Their images are NOT in the repo; re-run the copy step when Ed
      confirms.

| Source slug | New slug | Location published |
|---|---|---|
| derby-road | derby-road | South Coast, England |
| geroge-street | george-street-eastleigh | Eastleigh, Hampshire |
| high-end-hmo-design-project | queens-road | South Coast, England |
| hmo-construction-project-shadwell | shadwell-road | Portsmouth, Hampshire |
| hmo-project-southampton | burlington-road | Southampton, Hampshire |
| hmo-property-surrey | project-prince | Southend-on-Sea, Essex |
| large-hmo-south-sea | southsea-co-living | Southsea, Portsmouth |
| hmo-project-bedhampton | HELD | slug says Bedhampton, title says "London Surrey" |
| hmo-project-crawley | HELD | slug says Crawley, title says Gillingham |
| hmo-project-chalkridge | HELD | title says London, photos show a suburban semi |

Explicitly NOT ours (HMO Checker, different product):
- Pricing tiers, Source While You Sleep, pay-as-you-go, trial banners,
  greyed-out ratings, CRM webhook, Jody/Christy user journey flowchart.
