# Actions from Ed's call transcript

Date compiled: 25 August 2026
Source: call transcript between Akash and Ed, recorded **before** Ed sent the Website Final Update Brief PDF.

Because this call predates the final brief, anything the brief later contradicts is superseded by the brief. Where that applies it is flagged below. Everything else stands.

## The headline: this closes the biggest risk on the live site

Ed answered the client-report question directly, and his answer removes what was the single worst exposure.

> "I don't think we need to necessarily [show them]... we show what they get on the page but you can't click on it and see the PDF. If they want to see the PDFs, they need to get in touch and we can send them an example, and that example would have them hidden."

**Verified against the live code**: fifteen real client feasibility PDFs sat in `public/documents/`, each linked from its case-study page with a working "View document" button. Five named the client and all fifteen carried the full address and postcode.

**This has now been built and the files are gone.** See action 1 below for exactly what changed, including four further files found in `public/` that were being served to anyone and had nothing to do with the site.

He also asked, separately, that the drawings themselves be cropped: "it's got all the full address and everything on it... all of that needs removing." Same category of problem, same fix, still to do.

## What the call answers, so it comes off Ed's outstanding list

| Was blocked on | Ed's answer |
| --- | --- |
| What to do with the fifteen client reports | Take the downloads off. Describe what the client receives, gate the real thing behind getting in touch, send one redacted example. |
| Whether the six named clients consented | Largely moot once the PDFs come down. |
| The five missing Feasibility Overview documents | "This one doesn't necessarily have an overview document... it's fine as it is, Akash, honestly." Those five studies stay as they are. Show the same "what the client received" list on every study, since it is gated anyway. |
| Which study should lead the feasibility page | Order by date, newest first. "The more recent ones will have all of the documents on them, because we do it in a set process." |
| Money figures on the study pages | Remove them from the studies where the source did not carry them. "I don't think it needs to be there on everyone." |
| Winchester or Portsmouth | Winchester, but at a **new address** which Ed sent on WhatsApp during the call, mentioned as Portland Terrace. The exact line still needs pulling out of that message. |
| Phone number | One number for both Thistle and HMO Designers. "Anyone coming from designers, they're just getting in touch with Thistle now." |
| Stripe account | The same account already used for HMO Designers and inCollective. Not a new account to open. |
| The AI team portraits | Ed disliked them ("why has it stuck us into suits?") and committed to a real shoot: "I can get photos taken of all of us tomorrow." Jodi will not be in it. |
| Keep the Conversions page? | Yes. "I think it's good. I think leave it." |
| Whether twelve published studies is enough | Yes. "That's enough, I think." |

## Actions for us

### Do first, privacy

1. **DONE, 26 August. The client PDFs are off the site.** Every study now shows the same three generic document cards (Feasibility Overview, Planning Research & Risk Analysis, Space & Standards Review) with inert, padlocked "View document" links. Asking opens an email field, the address goes to the team through the existing lead route labelled "send redacted example", and nothing is revealed on submit. All fifteen files were deleted from `public/documents/` so the URLs cannot be guessed, and the per-study document lists were removed from the data entirely. Verified: zero PDF links and zero hrefs in that section, and every old URL now returns 404.

   **A wider sweep of `public/` found four more files being served to anyone**, none of them referenced from the site: a real client Design and Access Statement, naming the property and its full postcode on page one; an internal "Website Amends" PDF; the Gemini notes from a February internal meeting; and an internal website guide. All four were confirmed live on the production domain, and all four have been removed. Copies of everything taken down are kept outside the repo.

2. **Produce one redacted example report.** More urgent now than before: the site tells people the team will email them a full example, with client details removed, within one working day. Until that file exists, that promise cannot be kept. Ed supplies it, since the originals are his. The old gated sample was the St John's document with the client address on every page, so it came down with the rest and its gate now captures an address rather than serving a file.
3. **Crop every published drawing** so the title block, address, disclaimer and Thistle logo are gone, leaving just the plan or elevation. Axis House was already done in an earlier round; the rest are not. Ed wants each one labelled plainly, for example "Proposed ground floor plan" and "Proposed elevations", with the reader able to flick between them and on to the CGI.

### Content and page changes

4. **DONE.** The gate copy now says the team will send "a full example feasibility", never "this project's report", which was Ed's point: the example sent out will not necessarily be the study being read.
5. **DONE.** The same three document cards appear on every feasibility study, and the per-document page counts are gone.
6. **Order the feasibility studies by date, newest first.**
7. **Add a Highlighted Projects default view** to Completed Projects, with everything still reachable behind it. Ed picked, as a deliberate spread of types: Derby Road (HMO), Bereweeke Avenue (high-end house), Monument House (flats), the Methodist church at Wigan (office conversion), Highbury (co-living), and Boyne Rise, the bungalow to contemporary family home.
8. **Put a real photograph on every completed project.** Ed walked the folders on the call and pointed out material we had missed: Bishopstoke has an existing-building photo, Wigan has a Methodist church photo plus full plans, and Millbrook has technical plans and an interior design mood board even though its Site Photos folder is empty. Monument House is already done. Beauchamp is the one Ed still owes.
9. **Show more of what is in each project folder**, not just what the template expected. Ed: "I'm just trying to gather together as much as we have on these projects." That means mood boards and additional plans get surfaced too.
10. **Add reviews back to the homepage.** They currently only appear on the feasibility package and About pages.
11. **Add a "one of our expert designers" element to the homepage**: a photo of Kaan with a short line and a button through to the team. Ed's reference was Resi, but toned down to suit Thistle's design.
12. **Show both feasibility studies and completed projects on the homepage**, three of each. Note: the final brief later cut the homepage to four sections, so check this against the brief before building.
13. **Feature two worked examples on the feasibility package page**, not one: a classic three-bed terrace to seven-bed HMO, and one much larger office-to-residential co-living scheme (Boyne Rise, Kingsland).
14. **Add an HMO Article 4 Checker entry to Tools** that links out to the HMO Checker site. Ed was explicit that it should link out rather than embed: "I don't want the two websites competing in SEO."
15. **Use Boyne Rise as the co-living example** on the Conversions page. Ed's working definition: above eight or nine bedrooms it is still an HMO but it reads as co-living.
16. **Add Jodi and Seyma to the team page.** Jodi's details can be lifted from the HMO Checker site.
17. **Build the exit-intent expert session offer.** Ed's words: when someone is about to leave a feasibility without paying, offer a free fifteen-minute expert session with Jodi. He wants the same booking route on HMO Checker, framed there as an onboarding call.
18. **Put Jodi's email on the Contact page** in place of the inCollective address.

### Marketing

19. **Run a Trustpilot review campaign to past clients.** Ed has done roughly twenty feasibilities and only has five reviews. Agreed approach: email past clients, possibly with an incentive such as a discount on their next feasibility. Ed to supply the email list.

## Still outstanding from Ed after this call

These were raised on the call and are not resolved by it.

- The **exact new office address** from his WhatsApp message.
- **Jodi's email address**, and her Calendly link, which is still what blocks both booking routes.
- **Which video to use per project.** Ed wants video and there is plenty in the Drive, including long raw footage. Agreed mechanism is to host the chosen clips on Vimeo and embed, so the site stays fast. Ed still has to nominate one clip per project.
- **A photograph for Beauchamp House.**
- **The image for the repeated section** at the foot of the study pages. Ed wants it changed but did not say to what.
- **The team photographs** he said he would take the next day.

## Two things to raise with Ed

**The Trustpilot answer given on the call was wrong, and he should be told.** Ed asked whether the review count on the site updates itself as new reviews come in, and was told yes, it is a live integration. It is not. Thistle's Trustpilot account is on the free tier, every widget type was tested and refused, and the badge on the site is deliberately worded so it never states a number. A genuinely live rating needs a paid Trustpilot plan at £119 a month billed annually. He is expecting behaviour the site does not have.

**He gave two real numbers on this call that are better than the claims currently on the site**: "we've definitely done 350 plus feasibilities, and then 500 plus completed projects". Those are his own words and far stronger than the unverified 98.5% and 86% figures still on the homepage. Worth confirming he is happy to publish them, and then using them.
