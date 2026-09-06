---
title: Engaged California — moderation
year: 2025
role: Engineering manager
venue: ODI Codefest
published: false
draft: true
summary: Placeholder summary — replace with your own.
tags: [public engagement, moderation, trust and safety]
deck: /files/codefest/
---

{%- comment -%}
  HOLD: the deck contains a slide marked "Data not validated | Do not share."
  Kept out of the build with `published: false` pending your review. The
  moderation counts from that slide are deliberately NOT reproduced below.
{%- endcomment -%}

The points below were extracted from your own slides so the page isn't empty.
They are your facts, but the selection and arrangement are Claude's, and there
is no narrative here yet. Write it in your own words, then remove `draft: true`
and this paragraph.

- Presented with Jarrett Krumrei, lead product manager.
- Structure: "What we did / What we learned / Areas to explore."
- Goal: get moderation running for Engaged California's LA Fires topic by
  Monday morning — refine moderation policies, identify and train a moderation
  team, develop "moderation ops."
- Challenges: "We have never done this before!" Uncertainty about volume and
  bad actors. Maintaining ODI and state standards around data security and
  privacy. Wanted an audit trail. IP restricted login for admins and
  moderators.
- Solutions: worked with DGS for moderator access; anonymous, machine-generated
  usernames; no email addresses in the export; geofencing to US only; used Coda
  to track moderation actions.
- Lessons: "Hardest problems aren't technical." "Limit to 1000 Ethelo invites
  per day." "Prepare to switch to reactive mode." "Decide on an import
  cadence." "Wait to delete."
- Areas to explore: whether GenAI flags the same comments for the same reasons
  and whether it can be trained up; automating CSV updates and approval
  marking; moving Coda-built features into Ethelo.
