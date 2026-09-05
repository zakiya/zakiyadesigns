---
title: Engaged California — moderation
year: 2025
role: Engineering manager
venue: ODI Codefest
published: false
summary: >-
  Standing up comment moderation for Engaged California's LA Fires topic over
  a single weekend — what we did, what we learned, and what we'd explore next.
tags: [public engagement, moderation, trust and safety]
deck: /slides/codefest/
---

{%- comment -%}
  HOLD: this deck contains a slide marked "Data not validated | Do not share."
  Kept out of the build with `published: false` pending review. Remove that
  line in the front matter to publish.
{%- endcomment -%}

A Codefest sprint at the California Office of Data and Innovation, presented
with Jarrett Krumrei, lead product manager.

## The goal

Get moderation up and running for Engaged California's LA Fires topic by Monday
morning: refine the moderation policies, identify and train a moderation team,
and develop the moderation operations to support it.

## What made it hard

- We had never done this before
- We didn't know the volume, or how many bad actors to expect
- We had to hold ODI and state standards for data security and privacy
- We wanted an audit trail
- Admin and moderator login had to be IP restricted

## What we did

- Worked with DGS for moderator access
- Anonymous, machine-generated usernames
- No email addresses in the export
- Geofenced to the US
- Tracked moderation actions in Coda

## What we learned

- The hardest problems aren't technical
- Limit to 1,000 invites per day
- Be prepared to switch to reactive mode
- Decide on an import cadence up front
- Wait to delete

## What we'd explore next

- See whether generative AI flags the same comments, for the same reasons —
  and whether we can train it up
- Automate the CSV updates and approval marking
- Move some of what we built in Coda into the platform itself
