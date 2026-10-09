---
title: "How to Write an Effective Bug Report, Issue, or Ticket"
year: 2016
kind: professional
posted: 2016-01-04
role: Author
summary: "Blog post originally posted at ChapterThree.com"
tags: [ software ]
link: https://www.chapterthree.com/blog/how-to-write-an-effective-bug-report-issue-or-ticket
link_text: Read the original on Chapter Three
---

Whether you are a project manager, product owner, developer, or content manager, you may have to submit issues, bug
reports, tickets, or tasks. Whatever your project management tool calls them, these information snippets are essential
parts of project communication. A well-written ticket can eliminate confusion and save development time. In this post
I’ll layout out some considerations for writing a ticket. It is not meant to be formulaic. **Rather, this post can serve
as a reminder to think critically about tickets so they are most effective.**

![Write an Effective Bug Report, Issue or Ticket](/files/how-to-write-an-effective-bug-report-issue-or-ticket/bugsquash2.jpg)

**Give some context**
In most cases, the most important audience of a ticket is the person who has to implement a change. That individual may
have built 90% of project or may have been on-boarded yesterday. Consider that the person implementing a ticket may not
have all the references and back story that you have. “Menu still having issues” is not useful information to someone
who has not seen the original bug. Since a project or task may be on hold or put in backlog, think about whether the
ticket will still make sense in a few weeks or months.

**What to include?**

Too much information in a ticket can make it hard to read and reduce efficiency. Including the right amount of
information at the appropriate level of detail can make it much easier on the team and improve efficiency.

##

## For All Projects

### • URL

You should always include one or more urls in a ticket. Even if it seems obvious (“Home page doesn’t load”), a copied
and pasted url can reveal extra information, like whether the user is accessing via SSL and what environment is being
used.

It is not uncommon to have errors reported for a “dev” environment when the tester should have been working on a “test”
environment, or vice versa. The url is a reference that helps ensure a common starting point.

## **For Front-End Tasks**

### • Screenshot

A picture says a thousand words. What is unclear from a description can be quickly illuminated with a screenshot.

Bonus points if you use a tool like [Skitch](https://evernote.com/skitch/?var=1) or King to annotate the screenshot. An
arrow or a red box and some text can go a long way. I’m a fan
of [Preview](http://support.apple.com/kb/PH20218?locale=en_US), which comes with Mac OS X,
and [Jing](https://www.techsmith.com/tutorial-jing-taking-your-first-capture.html), which can also handle video screen
captures.

### • Device/OS/Browser version

Your *device* is the physical object that you use for testing. Examples are Android phone, iPhone, Windows phone,
Galaxy, Kindle, iPad, MacBook Pro, and Dell.

You *OS* is the operating system, the software that runs the whole device. Examples are Windows NT, Mac OSX, Android OS,
and iOS.

Your *browser* is the particular app that you are using to view the website. Examples are Firefox, Internet Explorer,
Chrome, and Safari.

The matrices of devices and operating systems seems infinite. Usually you can find the browser version in the “About ..”
menu item.

When adding details to a ticket, you get bonus points for testing in multiple browsers. “Submit button is too wide in
IE8 but looks fine in Firefox 43, Safari 9 and Chrome 47” is a great note!

## **For Back-End Tasks**

### • Steps to reproduce

There is often more than one way to accomplish a task on a website. When documenting functional bugs and requests,
listing the specific steps to trigger the bug or get to a particular screen can be very helpful. State whether your
results are consistent or intermittent.

### • Actual Behavior vs Desired Behavior

Describing a request in these terms can often help to clarify it.

##

## Drupal-Specific Considerations

### **• User/role**

It's important to indicate user and role states when documenting tickets. Were you logged in? Logged out? What was the
username?

In Drupal, users often have different permissions and see things differenently depending on their role.

If you have access to multiple user accounts, see if you can you reproduce the same results with a different role and
document your findings.

**Other things to think about**

As project team, you may agree to include information for the sake of organization and management. These things may
include:

- **Sprint #** - The cycle of time (usually 1 or 2 weeks) during which the work will be done.
- **Component** - The part of the system (Examples: Theming, Blog, Shopping Cart, Menu System, WYSIWYG).
- **Deadline/Estimate** - The amount of time or effort you estimate the task will take. Some teams report this in hours,
  others use story points.
- **Priority/Severity** - How should the task be prioritized? It is Low, High, Critical Post-Launch, or a Launch
  Blocker?
- **Type** - What type of ticket is this? Is it a task, bug or feature request?
- **Dependencies/Related tasks** - Is this task dependent on other tasks?

Good tickets make the whole team happy and lead to fewer frustrations. Including all the information above in every
ticket might be overkill and drive everyone a little nuts. Concise, accurate tickets that include relevant information
can help make a project go smoothly.
