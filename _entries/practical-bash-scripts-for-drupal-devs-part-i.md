---
title: "Practical Bash Scripts for Drupal Devs: Part I"
year: 2016
kind: professional
posted: 2016-03-08
role: Author
summary: "Blog post originally posted at ChapterThree.com"
tags: [ drupal ]
link: https://www.chapterthree.com/blog/practical-bash-scripts-for-drupal-devs-part-i
link_text: Read the original on Chapter Three
---

![Practical Bash Scripts](/files/practical-bash-scripts-for-drupal-devs-part-i/tractorrrr.jpg)

This series will show a few bash scripts that I use regularly while developing Drupal websites. Each post will increase
in complexity. Every local development environment varies, but by following these examples, you should be able to create
your own custom scripts in no time.

I use a Mac but these ideas can be extrapolated for other systems.

## Part One: Better drush uli

### The problem:

Many of us use the command `drush uli` several times a day to log in to various sites on our local machines.

In order for `drush uli` to work, you need to `cd` to the proper directory, and/or add the `--uri` flag to specify which
site you're trying to log in to. If you develop using different AMP stacks or are using SSL you might have to specify
the port. These details may have been long forgotten if it has been a while since you worked on that site.

```
$ cd path/to/mysite
$ drush uli --uri=http://mysite.local:8083
```

Thousands of milliseconds are wasted thinking and typing in this arduous process. A bash script can save you. Behold the
elegance that awaits:

```
$ uli mysite
```

### The script:

uli.sh

```
#!/usr/bin/env bash
if [ -z "$1" ] # If no argument is given.
   then # "then" is a required part of the if/else statement.
   # Print some help text.
   echo "Which site?"
   echo "Script will use MAMP port by default. Use 'add' for Acquia dev desktop"
   echo "uli [site] [add (optional)]"

else # There is an argument.

   if [[ "$2" == "add" ]] #if the second argument is 'add'
      then
      cd $HOME/Sites/$1/sites/default
      drush --uri=http://$1.local:8083/ uli

   else
      cd $HOME/Sites/$1/sites/default
      drush --uri=http://$1.local:8888/ uli

   fi # "fi" ends the if statement.

fi
```

### Script Notes:

**`#!/usr/bin/env bash`** - [the Sha-bang](https://en.wikipedia.org/wiki/Shebang_(Unix))

**`if else then fi`**- These keywords form
the [structure of the if/then statement](http://www.thegeekstuff.com/2010/06/bash-if-statement-examples/).

**`$1 $2`** - These are arguments submitted with the command. If I type `uli mysite`, **`mysite`** is `$1`, if I type
`uli mysite add`, then **`add`** is `$2`. The arguments are incremental numbers unless you specifically give the
variable a name. More on that in later posts.

**`$HOME`** - On a Mac this is usually the /Users/myname/ folder. Depending on your setup, you may need to change this
path.

`/sites/default` - In Drupal 7 if you add $base_path = whatever.local to your settings.php then you can run drush
commands from the site root instead.

### Where does the script go?

The first step is to make the script executable by using `$ chmod 700 path/to/file` in the
Terminal. [More on file permissions here](http://linuxcommand.org/lts0070.php).

Secondly, you'll need to add an alias (shortcut)*. I keep my aliases in my .bash_profile file. Some use .bashrc. The
difference between the two is [explained here](http://www.joshstaiger.org/archives/2005/07/bash_profile_vs.html).

My script file is called uli.sh so I add the following line to my .bash_profile (Found in the home directory).

```
alias uli="/path/to/uli.sh"
```

*You could also add a file called `uli` to the /usr/bin folder on a Mac and skip the part about writing an alias.
Personally I like to keep all my custom scripts in a folder inside my home directory.

### What if the site is a multisite?

It depends. If a multisite is an edge case, you may not feel it is worth modifying the script. If most of the sites you
work on are multisites, you can modify the script accordingly. Later posts will cover conditional input and actions
based on prompts.

### Why don't you just create a local alias file?

Personally, I'd rather write one script that works for every site than edit a file every time I get a new project. But
if you're into
it, [instructions](http://www.mikestiv.com/set-up-drush-alias) [aren't](http://drupal.stackexchange.com/questions/22876/how-to-set-up-drush-aliases-for-a-local-server-for-rsync) [hard](https://www.deeson.co.uk/labs/drupal-drush-aliases-and-how-use-them) [to](https://ohthehugemanatee.org/blog/2014/01/10/drush-self-aliases/) [find](http://www.bariswanschers.com/blog/working-drush-alias-files-teams).

### You know you could set MAMP to use port 80, right?

Sure could. I like seeing the port number in the url. It reminds me that I'm on my local and gives a clue which stack
I'm using.

### Final note

If you get in the habit of scripting your site commands, you'll start to see the benefits of consistant naming
conventions. I always put my settings.php in /default, I always use MAMP on port 8888, I always give a tld of .local
rather than .l or .localhost. In a later post I'll share a script that builds the majority of my local sites for me,
thus ensuring consistency. Reducing the number of variables you have to script for will make you a happy camper.
