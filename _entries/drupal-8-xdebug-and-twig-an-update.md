---
title: "Drupal 8, Xdebug, and Twig - An Update"
year: 2017
kind: professional
posted: 2017-05-09
role: Author
summary: "Blog post originally posted at ChapterThree.com"
tags: [ drupal ]
link: https://www.chapterthree.com/blog/drupal-8-xdebug-and-twig-an-update
link_text: Read the original on Chapter Three
---

{% raw %}![Debugging Drupal 8 Twig with XDebug](/files/drupal-8-xdebug-and-twig-an-update/pewpewpew.jpg)

Note: This is an updated version of [an earlier post](/posts/debug-drupal-8-twig-templates-twigxdebug-module/). These
instructions achieve the same as the previous one without using Composer or the Twig Xdebug module.

## Why use this method

If you're a back end developer who is used to interactive debugging, or a front end developer looking to up your game in
Drupal 8, it's time for you to start using Xdebug. Most Drupal developers are used to using `dpm()` in Drupal 7 and its
Drupal 8 counterpart `kint()`. While this will get you pretty far, using a debugger like Xdebug can save you time. Once
installed, you'll be able to quickly inspect all the global and local variables available at a specified breakpoint in
the code. You can also step through code to find the functions that created said variable.

## Requirements/Installation

For many developers, the biggest impediment to using a proper IDE and debugger is the setup. If you're not super
comfortable managing your local development environment, taking the time to work through these installations will make
you more proficient in the long run. If you're not sure where to start I would try using either MAMP or DrupalVM for
your local host.

**Xdebug installed on your local server**

- If you use MAMP, Xdebug is installed for you. Just click "Activate Xdebug" on the PHP tab of the MAMP PRO interface.

**An Integrated Development Environment (IDE) with XDebug listener enabled.**

- [Documentation for installing Xdebug with PhpStorm](https://www.jetbrains.com/help/phpstorm/2016.3/configuring-xdebug.html)
  is available on the JetBrains website. If you already have Xdebug installed, scroll down to the "Integrating Xdebug
  with PhpStorm" section.

**Xdebug extension for browser**

- Chrome users can use
  the [XDebug helper](https://chrome.google.com/webstore/detail/xdebug-helper/eadndfjplgieldjbigjakmdgkmoaaaoc?hl=en )
  extension. Just make sure to select your IDE (like PhpStorm) as the IDE key.

**Drupal's [Devel module​​​​​](https://www.drupal.org/project/devel)**

- Enable as you would with any other Drupal module.

## Debug checklist

Now that the hardest part is over, you can set a breakpoint in any twig template. If for some reason it's not working,
you'll need to make sure

1. **Your IDE is listening for connections**
2. **Your browser extension is set to debug**
3. **Xdebug is active (that checkbox in MAMP)**
4. **You've set a breakpoint in the twig template with `{{ devel_breakpoint() }}`**

Most of the time you'll be looking at the `$context` variable for values that are available for use in the template.

*Video Demonstration of XDebug in Twig Templates in Action:*

[Watch the video](https://www.youtube.com/watch?v=wi0qh31Sdag)

## Final Thoughts

Making Xdebug a part of your developer toolset will make you a far more efficient developer. Any time you spend on
installation will be worth it later. Though there may be some bumps along the way, Xdebug-related errors are highly
Googleable and being able to interactively debug Twig templates is awesome. {% endraw %}
