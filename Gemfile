source "https://rubygems.org"

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
