---
title: "Debug Drupal 8 Twig Templates with the Twig_Xdebug Module"
year: 2017
kind: professional
posted: 2017-01-26
role: Author
summary: "Blog post originally posted at ChapterThree.com"
tags: [ drupal ]
link: https://www.chapterthree.com/blog/debug-drupal-8-twig-templates-twigxdebug-module
link_text: Read the original on Chapter Three
---

{% raw %} **Note: This post has been [updated and simplified here](/posts/drupal-8-xdebug-and-twig-an-update/). The
original post is still accurate but the same can be achieved without using composer or an extra module.**

## Debugging Drupal 8 Twig with XDebugWhy use this method

If you're a back end developer who is used to interactive debugging, or a front end developer looking to up your game in
Drupal 8, the Twig Xdebug module is for you. Most Drupal developers are used to using `dpm()` in Drupal 7 and its Drupal
8 counterpart `kint()`. While this will get you pretty far, using a debugger like Xdebug is a far more powerful. Once
installed, you'll be able to quickly inspect all the global and local variables available at a specified breakpoint in
the code. You can also step through code to find the functions that created said variable.

## Requirements/Installation

For many developers, the biggest impediment to using a proper IDE and debugger is the setup. If you're not super
comfortable managing your local development environment, taking the time to work through these installations will make
you more proficient in the long run.

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

**Composer installed globally**

- If you use Drush, there's a pretty good chance you already have the Composer package manager installed. Type
  `composer -v` in a terminal window to check. If it is not installed, follow
  the [Composer documentation](https://getcomposer.org/doc/00-intro.md).

**Breakpoint Twig Extension PHP library**

- Use the directions in the "INSTALLATION" section of
  the [Twig Xdebug module](https://www.drupal.org/project/twig_xdebug) description page get the PHP library that the
  module will use. Run the two commands from the root of your Drupal project.

  Watch this video to see what to expect:

  [Watch the video](https://www.youtube.com/watch?v=mQ9ILVAn4jY)

**Drupal's [Twig Xdebug module​​​​​](https://www.drupal.org/project/twig_xdebug)**

- Enable as you would with any other Drupal module.

## Debug checklist

Now that the hardest part is over, you can set a breakpoint in any twig template. If for some reason it's not working,
you'll need to make sure

1. **Your IDE is listening for connections**
2. **Your browser extension is set to debug**
3. **Xdebug is active (that checkbox in MAMP)**
4. **You've set a breakpoint in the twig template with `{{breakpoint()}}`**

Most of the time you'll be looking at the `$context` variable for values that are available for use in the template.

Here's a video of Twig Xdebug in action:

[Watch the video](https://www.youtube.com/watch?v=mQ9ILVAn4jY)

##

## Final Thoughts

Making Xdebug and Twig Xdebug a part of your developer toolset will make you a far more efficient developer. Any time
you spend on installation will be worth it later. Though there may be some bumps along the way, Xdebug-related errors
are highly Googleable and being able to interactively debug Twig templates is awesome.

Have you tried Twig Xdebug? Are there any tools that help you develop with Drupal 8? Let us know in the comments!
{% endraw %}
