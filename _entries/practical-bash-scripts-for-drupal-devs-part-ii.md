---
title: "Practical Bash Scripts for Drupal Devs: Part II"
year: 2016
kind: professional
posted: 2016-04-05
role: Author
summary: "Blog post originally posted at ChapterThree.com"
tags: [ drupal ]
link: https://www.chapterthree.com/blog/practical-bash-scripts-for-drupal-devs-part-ii
link_text: Read the original on Chapter Three
---

![Useful Bash Scripts](/files/practical-bash-scripts-for-drupal-devs-part-ii/bashbashbash_0.jpg)

In the previous post we covered:

1. Creating an if/else statement.
2. Getting arguments from command input.
3. Getting the script to run from the command line.
4. Writing an alias.

##

## Part Two:  Import a database from Pantheon* in one command.

This is a script to use when local is already set up and we want pull the latest database. After the script is installed
you'll be able to download a backup from a particular environment on Pantheon and then import that backup into the
existing database using a simple 3-word command:

```
$ dump mysite test
```

Even if you don't use Pantheon regularly, deconstructing this script can give you some ideas on how to build your own.

### The Script

### dump.sh

```
#!/usr/bin/env bash
CY="\033[0;33m" #yellow
CR="\033[0m" #reset
CG="\033[0;32m" #green
CB="\033[0;34m" #blue
CO="\033[38;5;95m" #ochre

if [ -z "$1" ]
   then
   printf "$CO • dump [site] [env] \n$CR"
   printf "$CY • Example: $CO dump mysite dev \n$CR"

elif [ -z "$2" ]
   then
   printf "$CO • Enter the environment \n$CR"
   printf "$CO • dump [site] [env] \n$CR"
   printf "$CY • Example: $CO dump mysite dev \n$CR"

else

    if [ ! -d "$HOME/Sites/dbs/$1" ]
        then
        mkdir $HOME/Sites/dbs/$1
    fi

    drush @pantheon.$1.$2 sql-dump > $HOME/Sites/dbs/$1/$(date +%m%d\-%H)-$1-$2.sql
    cd $HOME/Sites/$1/sites/default
    drush sql-drop -y

    printf "$CY • My custom password hint. \n$CR"
    /Applications/MAMP/library/bin/mysql -u USERNAME -p $1 < $HOME/Sites/dbs/$1/$(date +%m%d\-%H)-$1-$2.sql
    drush rr

    printf "$CY • Script complete. \n$CR"

fi
```

### Script Notes

**`CY="\033[0;33m"`**
The first 5 lines
set [color values](http://webhome.csc.uvic.ca/~sae/seng265/fall04/tips/s265s047-tips/bash-using-colors.html) that we'll
use in the prompts to increase readability.

`\n`
Line break.

**`if [ -z "$1" ]`**
If the prompt has no values, we want to give some sort of feedback to the user about what to enter.

**`if [ ! -d "$HOME/Sites/dbs/$1" ]`**
The script stores all backups in a specific directory. This line checks to see if that directory already exists.

**`$(date +%m%d\-%H)`**
This puts a human-readable [date stamp](http://tldp.org/LDP/abs/html/timedate.html) on the dumped file.

**`USERNAME`**
Replace with your database's username. Use the appropriate security precautions.

### Other considerations

Because this script creates a new database for each date, you may end up with a great deal of unwanted files. If you are
dealing with large databases and not in the habit of regularly pruning files on your machine, you may want to remove the
date stamp from the script.

The `drush sql-sync` command is the more efficient and common way to get the latest database. Before this year, Pantheon
did not support that command. Now that Pantheon is expanding its support for sql-sync, it is reasonable to imagine this
script will be slowly phased out.

If you're having trouble with this script, you may want to
revisit [Practical Bash Scripts for Drupal Devs: Part I.](/posts/practical-bash-scripts-for-drupal-devs-part-i/)

*[Pantheon now supports drush sql-sync when Drush 8.0.4 or later is installed on the remote server](https://pantheon.io/docs/articles/local/drupal-drush-command-line-utility/).
