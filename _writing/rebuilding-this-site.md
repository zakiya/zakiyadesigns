---
title: Rebuilding this site
date: 2026-09-05
kind: professional
summary: >-
  Notes on turning a repo full of orphaned slide decks back into a portfolio,
  and the one rule that made it maintainable.
---

<!--
  PLACEHOLDER — written by Claude to seed the collection so the writing
  section renders. Rewrite it in your own words or delete the file; the
  index and landing page update themselves either way.
-->

This site had stopped being a site. The domain pointed at a set of GitHub IP
addresses that were retired years ago, so it served a 404. The homepage was a
README. Four conference decks sat at the root of the repo, linked from nowhere,
and the navigation was three hand-copied lines of markdown that pointed at
`.md` URLs the build rewrote out from under them.

The fix wasn't clever. It was picking one rule and holding to it:

**Adding something to the site means adding one file.**

Projects live in `_projects/`. Writing lives in `_writing/`. Both are Jekyll
collections, and every index — the landing page, the section pages, this list —
reads from those collections directly. No template edits. No link to remember
to add in a second place. The reason the old nav went stale is that keeping it
current was a separate chore from publishing, and separate chores don't get
done.

The visual side is the Zakiya design system: Nunito Sans, near-black ink on
white, structure carried by rules and borders instead of shadows and cards, and
sentence case everywhere. The tokens are vendored into `_sass/zakiya/` as plain
custom properties, so the site inherits the system without inheriting a
framework.
