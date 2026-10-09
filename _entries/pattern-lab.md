---
title: "Before You Start a Pattern Lab Project with Drupal"
year: 2019
kind: professional
posted: 2019-04-03
role: Author
summary: "Blog post originally posted at ChapterThree.com"
tags: [ drupal ]
link: https://www.chapterthree.com/blog/pattern-lab
link_text: Read the original on Chapter Three
---

## What is Pattern Lab?

[Pattern Lab](https://patternlab.io) is a tool that many teams use for implementing component-driven front ends. It
transforms pattern templates, authored by developers, into a full-featured, static site. It is easy to learn, and can be
used in a variety of different types of projects. It can be used as a rapid prototyping tool, a front end style guide,
the actual templates powering one or more live sites, or a combination of all three.

## Drupal and Pattern Lab

Pattern Lab has become increasingly popular in the Drupal community over the past few years, since the release of Drupal
8 with Twig. The promise of Pattern Lab is that its Twig templates and CSS can be consumed like a service by Drupal.
While there are some clear advantages, there are also hidden costs and potential pitfalls to be aware of. If you’re
thinking about taking on a Pattern Lab Drupal project, below are a list of considerations based on our experience.

## What Do You Need to Be Successful?

### #1: An Experienced Team of Experts

- Your team should be full of Drupal 8 experts that have several large-scale Drupal 8 custom themes under its belt.
  Drupal 7 experience alone won’t prepare you for the specific challenges that emerge in a Pattern Lab Drupal 8 project.
- Your team should be able to implement a component-based front-end. This means high levels of organization and
  preparation with an eye toward reusability and extension.
- Ideally, the same developer will either implement or be code architect for **both** the Pattern Lab and Drupal
  implementation. Teams working in parallel on the front-end need to be in close communication and a pull request
  workflow is highly encouraged.

### #2: A Strong Technical Foundation and Development Workflow

- A Composer-based workflow
  is [absolutely necessary](https://www.drupal.org/docs/develop/using-composer/using-composer-to-install-drupal-and-manage-dependencies)
  for all Drupal 8 projects.
- Configuration settings must be committed to code. Drupal 8’s Configuration Management System is one of the big
  improvements from Drupal 7. Those who fail to track their configuration in git will suffer from database mismatches,
  missing module notices and general chaos.
- Front end teams should be using feature branches and pull request workflow and know how and when to use git rebase.

*Note: In the context of Drupal, Pattern Lab is typically used to implement "component templates", which are then used
within normal Drupal templates. You'll either find a pattern lab implementation lives directly in a Drupal theme, or
that it's an entirely external project, required via Composer.*

### #3: A Comprehensive Architecture Plan

- Pattern Lab components, colors, text styles and elements should be named in advance.
- Determine parent-child relationships and modifiers early.
- Drupal architecture should be clearly defined. Things like field machine names, entity types, and site structure
  should be decided and debated before anything is built.

### #4: A Healthy Budget and a Generous Timeline

- Budget or timeline may not allow for all features to be developed in the first iteration or your project, so be
  prepared to prioritize features as you go.
- Pattern Lab Drupal projects require extra upfront work, as well as ongoing maintenance. They usually take longer and
  cost more.

## What Can Go Wrong?

- Some features are too complex to implement with Pattern Lab in a reasonable amount of time if they will only be
  consumed by Drupal. Form elements, images, menus and tabs are rendered in a very specific way by Drupal and mimicking
  that structure and logic in Pattern Lab is costly.
- Your Pattern Lab's organization may fight against Drupal's internal system. For instance a "molecule" might be
  composed of field in some places and some other Drupal element elsewhere. If your Pattern Lab is only or primarily for
  Drupal, consider organizing by Drupal elements (fields, paragraphs, nodes, views) instead of by Pattern Labs groups
  (atoms, molecules, organisms).
- JavaScript. Getting Pattern Lab to use Drupal's JavaScript Libraries and vice versa can be challenging. Drupal
  (rightly) delivers specific JavaScript files based on a number of conditions that Pattern Lab is not aware
  of. [This article](https://hackernoon.com/front-end-journey-into-drupal-pattern-lab-4db02e617fb4) speaks to this in
  more detail.
- Drupal Twig templates are generally not aware of what's happening in their parents or with their children. While one
  can use a module like [Twig Tweak](https://www.drupal.org/project/twig_tweak) to get around this behavior, it is
  better to start with the assumption that, for instance, a Paragraph is independent from the page it lives on.
- Render fields. Instead of digging for data, sometimes extracting information from a field can be challenging in the
  Drupal theme layer. For instance, image fields: instead of handling classes and src attributes from an image field and
  passing them to the Pattern Lab component you can just pass the whole field to a Pattern lab component and manage
  image styles and classes on the admin UI of Drupal. Rely on view modes and image styles as much as you can.

## What Makes Pattern Lab Great?

- **Organization & Presentation**: A high level structure, or groups, based on
  "[Atomic Design](http://atomicdesign.bradfrost.com/)" principles is provided. You can choose to work within that
  structure, or change the terminology to whatever suits your needs by simply renaming file system directories. These
  groups turn into dropdown menus, that expand to show all the pattern templates in that group and allows navigating to
  them. This makes it easy for team members to browse and discover what patterns exist.
- **Dynamic Data**: Patterns are meant to be authored to work with dynamic data. Example data files are included, easily
  customizable, and available to templates. There is a global set of data, as well as the ability to customize per
  component, and variant. This encourages writing templates in a way that can be used outside of pattern lab, with real
  data.
- **Variants**: It's common to have multiple variants of a pattern. For example, in a typical "Hero" pattern, you might
  have a "light" and "dark" version. Pattern Lab supports variants, which it calls "Pseudo Patterns" and displays them
  clearly in the static build.
- **Documentation**: Documentation can be added at group and component level, as desired, by adding a markdown file,
  with the same name. This documentation is exposed in the static site, along with the source code of the template.

## When Should You Consider Pattern Lab?

Pattern Lab could be a great choice for your next project. Here's a few things to consider:

- Do you have a team of front-end developers, who are great at CSS and HTML, have Twig experience or at least Template
  engine experience, and understand the basics of Object Oriented Programming?
- Do you need to use Pattern Lab for more than one website?
- Does your project require a living style guide as a deliverable?
- Do you have ample budget and time?
- Do you have technical stakeholders who want to interact with components prior to actual Drupal site development?

## What's Next?

Pattern Lab is a great approach for skilled teams to expand the use of component-based design and particularly helpful
for enterprise clients with a variety of websites to build, maintain and grow. Make sure to create a solid plan that
includes well-documented technical architecture and clearly understood development workflow that aligns with the best
practices we've outlined above. Understand the potential pitfalls in order to decide if Pattern Lab is the best approach
for your project. And finally, consider the available resources so that you have a comfortable budget to work with.

Have we convinced you to explore Pattern Lab in more depth? Do you have thoughts on our approach based on your
experiences? We're eager to hear from you in the comments or [get in touch](https://www.chapterthree.com/contact) with
us directly to discuss a new project or other ideas.

*(note: this article was written primarily through a collaboration
with [Jacine Luisi](https://www.chapterthree.com/about/jacine-luisi), with additional contributions
by [Israel Morales](https://www.chapterthree.com/about/israel-morales)
and [Rob Decker](https://www.chapterthree.com/about/rob-decker).)*
