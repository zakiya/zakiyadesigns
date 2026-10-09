source "https://rubygems.org"

# Read source files as UTF-8 even when the shell's LANG is unset; otherwise Sass
# chokes on the em dashes in _sass/. GitHub Pages sets its own encoding.
Encoding.default_external = Encoding::UTF_8

# Matches what GitHub Pages runs server-side, so a local build reflects
# production.
gem "github-pages", group: :jekyll_plugins

# Local preview only.
gem "webrick", "~> 1.8"

# Jekyll 3.9 (what github-pages pins) predates these being unbundled from
# Ruby's stdlib. Required to run the build on Ruby 3.4+; harmless on the
# older Ruby that GitHub Pages uses server-side.
gem "csv"
gem "base64"
gem "bigdecimal"
gem "logger"
gem "ostruct"
