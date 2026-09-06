---
title: Kickoffs website
year: 2026
kind: personal
role: Software engineer
summary: Calendar for NWSL other select women's football fixtures.
tags: [ football(soccer), gender, python ]
link: https://zakiya.github.io/nwsl-kickoffs/_site/?timezone=PT
link_text: View site
---

## The problem

NWSL games are streamed on a dizzying array of platforms and broadcast channels. Times are almost always advertised in
Eastern Standard Time. There are some apps that have game info. But often the user interfaces are gross and dominated by
ads. Also, they assume you're primarily interested in English Premiere League (EPL) or MLS. As an avid women's soccer
fan, I am not the target audience for these apps.

## What I did

- Forked a python project that was close to what I wanted.
- Added Women's Africa Cup of Nations, Men's World Cup, Arsenal, and Chelsea
- Used GitHub actions to pull in fixtures daily. This was useful during the World Cup and WAFCON because teams are TBD
  until they've advanced in the tournament.
- Made it mobile friendly
- Added a favicon from the Noun project

## What was cool

I'm not really a python developer but with the help of Claude Code I was able to understand the mechanics and enough to
deploy a heavily customized version of th original project.

## Where it stands

Now I can go to my shortcut on my phone and see all the games I care about in one place, in my own time zone. 