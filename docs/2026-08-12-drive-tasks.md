# Tasks unlocked by the 12 August drive drop

Source: `OneDrive_2026-08-12.zip`, 6.9GB, 393 files, `03 New Website/`.
Read from the archive index without extracting, so nothing has been copied into
the project yet.

Pick which of these to run. Numbered for reference.

---

## 1. Homepage rebuild to the written brief — BIG
`Website Amends.docx` is a full homepage redesign brief, not a list of tweaks.
It sets a positioning that the current homepage does not match:

> a developer-led, technology-enhanced feasibility platform with architectural
> delivery, **not** a traditional architecture practice, **not** a design-led brand

It specifies twelve sections in a fixed order, new hero copy ("From building to
viable conversion in 5 days"), a traditional-architect vs Thistle comparison
table, a data-sources section, and testimonials. It also asks to **avoid heavy
dark backgrounds** and move to "product-style" components, with Resi, Searchland
and Urbanist as references.

Worth knowing before starting: this conflicts with things already signed off.
The hero video was chosen in the 8 July round and re-chosen on 10 August; this
brief wants feasibility outputs or UI visuals there instead. The homepage was
cut to four sections in the July round; this brief wants twelve. Someone needs to
say which wins.

Sub-tasks, each doable alone:
- 1a. New hero copy and CTA wording
- 1b. Metrics strip, with the numbers confirmed
- 1c. How It Works as four horizontal steps
- 1d. Feasibility Engine section with a flow diagram
- 1e. Deliverables reworded to decision, risk, profit
- 1f. Why Thistle Is Different comparison table
- 1g. Data Sources section ("Powered by 15+ data sources")
- 1h. Testimonials with logos
- 1i. Lighten the palette away from dark sections

## 2. Feasibility case study pages, to Ed's template — DONE 13 Aug
`Feasibility Examples/Feasibility Example Page.docx` is the template Ed wants
used. It defines: hero with tags and a sketch preview, a key-information table
(bedrooms, room sizes, communal space, planning route, key risk, date, optional
end value), a Feasibility in Brief block (The Brief, What We Found, Our
Recommendation), a full-width sketch with zoom and a carousel where there are
options, and document cards with cover thumbnails.

Worked example in the document is Cheshunt, three-bed to six-bed HMO.

## 3. Project pages, to Ed's template
`Finished Projects/All projects/Project Explanations.docx`. A different template
from the one above: hero of the finished building, an existing-to-proposed
before/after near the top, then existing building, feasibility and concept,
technical drawings, and completion. 24k characters, so it likely carries
per-project notes as well as the structure.

## 4. Feasibility package deliverable documents — DONE 13 Aug
The outstanding item from 5 August. The actual documents now exist:

`Example Feasibility, to be emailed as example/`
- Feasibility Overview, Planning Research, Space Standards, Option 1 - 7 Bed HMO,
  Option 2 - 8 Bed HMO

`Feasibility Examples/155 Windmill Lane - Feasibility Summary and Sketches/`
- Feasibility Overview, Feasibility Sketch, Planning Research, Space Standards,
  Broxbourne HMO Standards

155 Windmill Lane is the example project Ed named. Everything needed to replace
the wrong deliverable imagery is here, all PDFs under 1MB.

## 5. Real project photography
Nine projects have photo folders: Bereweeke Avenue, Beauchamp House, Greyfriars,
Harpenden Police Station, Highbury Building, Millbrook, School House, Wigan
Church, 13 Campbell Road.

Feeds three open items at once: conversions page heroes, case study pages needing
more than sketches, and the homepage image carousel.

## 6. Team photos
Adouj, Beverley, Ed, Jan, Kaan, Seyma. **Jodi is not in the folder**, and she was
one of the two people Ed asked to add. Jan has two shots to choose between.

Note Ed's instruction from 5 August: he chose the AI-generated versions but wants
them redone in the clothes people already have on, not suits, and looking like
one office. These are the source photographs for that.

## 7. New briefs not previously seen
- `Videography/Thistle Architecture- Launch Videography Brief.docx`
- `Videography/Email Campaign/Thistle Architecture- Email Campaign Brief.docx`

Neither has been read in detail yet. Both may contain their own task lists.

## 8. Meeting recording
`Thistle mark up-20260708_105905-Meeting Recording.mp4`, 153MB. The 8 July
markup meeting. Could be checked against the notes already taken from it.

---

## Too large for me to handle, over to Akash

These need compressing before they can be used. Everything else in the drop is
small enough to work with.

| File | Size |
|---|---|
| Monument House `DJI_...0861_D.MP4` | 3.0GB |
| Monument House `DJI_...0862_D.MP4` | 1.1GB |
| Bereweeke `DJI_...0878_D.MP4` | 406MB |
| Bereweeke `DJI_...0883_D.MP4` | 276MB |
| Bereweeke `DJI_...0879_D.MP4` | 218MB |
| Bereweeke `DJI_...0877_D.MP4` | 202MB |
| Meeting recording | 153MB |
| Bereweeke `DJI_...0881_D.MP4` and `...0880_D.MP4` | 146MB, 127MB |

Monument House is the folder marked "Existing videos - use for homepage".

---

## Not from this folder

Ed's latest team information, which Akash has separately. Pairs with item 6.


---

# Parked, to pick up at the end

## 9. Magnifier on the deliverable images
Akash, 13 August. The five deliverable panels on the feasibility package page now
show real document pages, and at panel size the body text is not readable. That
is acceptable as a glance, but someone who hovers should be able to actually read
it.

Wanted: a magnifier on hover over the panel image, so the cursor acts as a loupe
over the document at full resolution.

Notes for whoever builds it:
- The source images are 1400px wide, so there is real detail to magnify into.
- The panel is `Panel` in `sections/feasibility-package/DeliverableShowcase.tsx`.
- Needs a sensible touch fallback, since hover does not exist on a phone. The
  simplest is to reuse the full-screen behaviour the case study sketch already
  has in `components/case-study/SketchViewer.tsx` rather than build a second
  pattern.
- Agreed to do this at the end, after the higher-value items.
