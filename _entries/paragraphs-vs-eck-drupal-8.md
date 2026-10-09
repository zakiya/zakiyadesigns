---
title: "Paragraphs vs. ECK for Drupal 8"
year: 2016
kind: professional
posted: 2016-06-27
role: Author
summary: "Blog post originally posted at ChapterThree.com"
tags: [ drupal ]
link: https://www.chapterthree.com/blog/paragraphs-vs-eck-drupal-8
link_text: Read the original on Chapter Three
---

[Paragraphs](http://drupal.org/project/paragraphs) has become a popular site building tool for Drupal. In the feedback
to our [recent blog post](https://www.chapterthree.com/blog/slice-template), some asked why the Chapter Three team has
not fully embraced the module. Most of our Drupal 8 sites use [Entity Construction Kit](http://drupal.org/project/eck)
with [Inline Entity Form](http://drupal.org/project/inline_entity_form) (ECK/IEF) to achieve what others do with
Paragraphs.

![Slice Template](/files/paragraphs-vs-eck-drupal-8/slice-template-short-210.jpg)

**The Slice Template design could be created using Paragraphs or Inline Entity Form.**

This post seeks to explain why one might choose one module (or set of modules) over the other for semi-structured
content in Drupal 8.

We'll be using our colloquial term "slice" to refer to a paragraph-like entity created with the ECK/IEF approach.

## Similarities

Both approaches allow for the creation of horizontal chunks of structured content that require no technical knowledge to
create, and allow for flexible displays. Both work with Drupal's multilingual system. Both use Drupal's Entity API
system, and are therefore fieldable. The theming experience of working with ECK and Paragraphs is similar; both return
render elements and provide some template suggestions for bundles and view modes.

## Site Builder Experience

**Paragraphs**
After installation, Paragraphs are immediately available to be added to nodes. If you neglect to add paragraph types,
you are given a convenient link to go do so.

**ECK/IEF**
The [difference between a bundle and an entity](https://www.drupal.org/node/1040330) can be a bit confusing the first
time you use ECK/IEF.

First, set up ECK Entity types then Bundle types. Then add references to the Bundle type as a field on each Content
type. Finally configure the form display on each Content type that uses Inline Entity Form. Additionally, each time you
add a new Bundle type, you'll have to add it to each field that the type needs to make it available. The learning curve
is small, but it exists nonetheless.

###### **Winner: Paragraphs**

## Content Editing Experience

**Paragraphs**
On the form configuration page you can choose whether (1) all form items are opened completely, (2) each paragraph is
accessed by accordion, or (3) users see exactly what they see on the front end. You can also choose the display of the
paragraph type selector.

**ECK/IEF**
While you'll have to use the [Inline Entity Form Preview](https://www.drupal.org/project/inline_entity_form_preview)
(IEFP) module if you want preview display, all the other form options provided by Paragraphs (and more) are available
using ECK/IEF. IEFP also provides the ability to choose a configurable "Preview" view mode. While this is extra site
building work, it facilitates a better content editing experience. Rich content parts can be condensed and rendered in a
more "edit-mode" appropriate way. For example, images can be set to render at smaller sizes, and entity references can
be shown as labels, instead of rendering directly inline, etc. This can be managed on a case by case basis.

**Both**
Working with many attached entities can be a slow and downright painful experience. Drupal's TableDrag functionality
allows editors to re-order content parts, but doesn't perform very well with many pieces of content. All of these
modules, and Drupal in general, would benefit from an investment in improving TableDrag functionality.

###### **Winner: Tie**

![Comparison of Slice vs Paragraph Content Editing Experiences](/files/paragraphs-vs-eck-drupal-8/content-editing.jpg)

**Inline Entity Form next to Paragraphs in "Preview" mode. The content editing experiences of Paragraphs and ECK/IEF can
be very similar.**

## Revisions

**Paragraphs**
[Entity Reference Revisions](https://www.drupal.org/project/entity_reference_revisions) is a requirement for Paragraphs
so it is innately revision-friendly without any extra configuration.

**ECK/IEF**
Alas, there isn't any out-of-the-box support for revisions using ECK/IEF on Drupal 8 at the time of this posting.
Contributors to [this Drupal.org issue for Inline Entity Form](https://www.drupal.org/node/2367235), many of whom are
Chapter Three employees, are working toward a solution.

###### **Winner: Paragraphs**

## Search

**Paragraphs**
Drupal's default search indexes Paragraph entities as part of their parent nodes without any extra configuration.

**ECK/IEF**
ECK entities are also indexed by core Drupal search. Just make sure that fields are being displayed, and users have
permission to view the custom entities.

###### **Winner: Tie**

#

## Reusable Entities

**Paragraphs**
[This issue](https://www.drupal.org/node/2414865) sums it up. If you want to reuse the same paragraph on multiple pages,
you're out of luck. It's possible, though, to reference other kinds of entities inside a paragraph.

**ECK/IEF**
You can easily reuse slices with the ICK/IEF set up. You can just as easily restrict that functionality from users. It's
important to have strong naming conventions if your users can reuse entities. A potential drawback of the Entity system
is that each entity/slice has a required title field whether you plan to display that title or reuse the content.

###### **Winner: ECK/IEF**

## Flexibility

**Paragraphs**
Configuration options are limited to exactly what is expected of the module. Use the included Paragraphs Type
Permissions module for more user-level control.

**ECK/IEF**
With the ECK/IEF you have lots of options. You can limit which slice types are available to a field; you can change
naming conventions in the UI; you can set permissions per type; you can choose whether or not the user can use existing
slices; and much much more.

Additionally, ECK and IEF are useful for structured content that is not tied to a node nor should be classified as a
paragraph type. In a recent project, we created Entities called "chunks" to hold things like accordion sets, newsletter
links, calls-to-action, and featured content.

###### **Winner: ECK/IEF**

## Unique URL

**Paragraphs**
Paragraphs are only accessible by visiting the referenced container (like the node).

**ECK/IEF**
Each Entity has its own url. But in most cases, there's no need for these types of entities to have one and it's best to
use a module like [Rabbit Hole](https://www.drupal.org/project/rabbit_hole) to obscure it.

###### **Winner: Paragraphs**

## Support

**Paragraphs**
There are many blog posts, tutorials, and Drupal camp sessions dedicated to using the Paragraphs module as a site
builder.

**ECK/IEF**
Beginner tutorials about ECK/IEF aren't as prevalent. If you get stuck on a custom feature, you may have to spend more
time searching for answers.

###### **Winner: Paragraphs**

## Conclusion

The Paragraphs module is great for what it was designed. It is an easy-to-use solution to a common configuration
problem. It is also the only Drupal contrib choice if you need structured content to be revisionable. Site builders
without a development team, and those without the time or desire to dig in and customize the experience beyond
Paragraphs' default offerings, will find it especially attractive.

Nearly the exact same functionality, however, can be achieved by using Entity Construction Kit and Inline Entity Form.
While the initial set up may not be intuitive, and will take more time upfront to configure, it is also more extensible
and customizable.

For smaller sites with simpler specs, Paragraphs might be all you need. If you're looking a more custom solution that
can be extended in the future, Entity Construction Kit + Inline Entity Form is the way to go.

At Chapter Three, we build relationships with clients that often last for years. We know that priorities and technical
specifications change. We typically choose ECK/IEF over Paragraphs either because of a particular specification in the
initial build, or because we know we'll need more flexibility in the long-term. With a little more effort up-front, we
deliver a first-rate content editing experience and meet the ever-changing needs of our clients.

*[Jacine Luisi](https://www.chapterthree.com/about/jacine-luisi), [Jaesin Mulenex](https://www.chapterthree.com/about/jaesin-mulenex), [Daniel Wehner](https://www.chapterthree.com/about/daniel-wehner),
and [Mark Feree](https://www.chapterthree.com/about/mark-ferree) contributed to this post.*
