---
title: "Local Behat Testing with Lando and Pantheon"
year: 2020
kind: professional
posted: 2020-10-08
role: Author
summary: "Blog post originally posted at ChapterThree.com"
tags: [ testing ]
link: https://www.chapterthree.com/blog/local-behat-testing-lando-and-pantheon
link_text: Read the original on Chapter Three
---

If you've followed [Pantheon's Build Tool Instructions](https://pantheon.io/docs/guides/build-tools/create-project/) and
used Pantheon's [Example Drops 8 Composer](https://github.com/pantheon-systems/example-drops-8-composer) as the base to
take advantage of [CircleCI](https://circleci.com) then you've encountered [Behat](https://docs.behat.org/en/latest/)
tests. Behat tests are extremely valuable for testing site functionality before new code goes to production or a shared
code stream. However, on a custom site these default tests provided by Pantheon are likely to fail if you've made even a
benign change like deleting Tags vocabulary on a Drupal standard installation.

The first few times I encountered these tests and inevitable failures, I would summarily delete or comment out the Behat
test and proceed with development as normal. "We'll come back to those later", I always said. One of the barriers to
taking full advantage of the Behat scaffolding that Pantheon provided was that there wasn't obvious guidance on how to
run the tests locally before they caused failures in CircleCI builds.

However, with just a few file changes to your [Lando](https://lando.dev/)-based project, you can have these tests
running locally. Good test coverage can give developers confidence when pushing code and reduces the chance of breaking
basic existing functionality. An investment in tests early in a project can save time and headaches later on and build
confidence in the development team.

(These instructions assume Drops
8 [2.3.1](https://github.com/pantheon-systems/example-drops-8-composer/releases/tag/2.3.1) composer-based installation.)

1. Add a drush alias file with url and db-url settings to `drush/lando.aliases.drushrc.php`.<sup>1</sup>

   ```
   <?php

   $aliases['epihc'] = array(
     'uri' => 'https://epihc.lndo.site/',
     'db-url' => 'mysql://pantheon:pantheon@database:3306/pantheon',
   );
   ```
2. Add lando-specific behat config to `tests/behat/behat-lando.yml`.

   ```
   default:
     suites:
       default:
         contexts:
           - FeatureContext
           - Drupal\DrupalExtension\Context\DrupalContext
           - Drupal\DrupalExtension\Context\MinkContext
           - Drupal\DrupalExtension\Context\MessageContext
           - Drupal\DrupalExtension\Context\DrushContext
           - FailAid\Context\FailureContext
     extensions:
       Drupal\MinkExtension:
         goutte: ~
         base_url: https://epihc.lndo.site/  # Replace with your site's URL
       Drupal\DrupalExtension:
         blackbox: ~
         api_driver: 'drush'
         drush:
           alias: 'lando.epihc'
   ```
3. Add Behat tooling to the Lando config and restart/rebuild lando to `.lando.yml`.

   ```
   tooling:
     behat:
       description: Run behat tests.
       cmd:
         - appserver: /app/vendor/bin/behat --config=/app/tests/behat/behat-lando.yml
   ```
4. Run `lando behat` in terminal to run the tests.

The final task will be to update the Behat tests for your particular site's needs. Your main test file is at [
`tests/behat/features/content.feature`](https://github.com/pantheon-systems/example-drops-8-composer/tree/master/tests/behat/features).
Luckily Behat uses natural language and
is [pretty easy to write](https://gist.github.com/mikecrittenden/618e57a41286e555dea8).

Other things to know:

- Check out your dev dependencies for the packages that are working together to make the tests Drupal friendly.
  The [Behat Drupal Extension](https://www.drupal.org/project/drupalextension) page has some good references.
- We use Pantheon, Drops-8, and Lando as a starting point for many of our projects but other approaches are equally
  valid.
- If you need to debug the actual build process on CircleCI, go to [
  `.ci/test/behat/run`](https://github.com/pantheon-systems/example-drops-8-composer/blob/master/.ci/test/behat/run)
- Behat tests aren't appropriate for every use case. Visual regression tests, linters, code sniffers, and/or unit test
  have their place as well.

Hopefully these instructions will help you get started on your test-driven way!

<sup>1</sup> Replace `pantheon` with `drupal8` when using the drupal8 Lando recipe. This database setting is required
for Behat to run drush commands.
