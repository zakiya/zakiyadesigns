# zakiyadesigns.com

Works by Zakiya. A Jekyll site built by GitHub Pages, served at [zakiyadesigns.com](https://zakiyadesigns.com).

## Adding content

There is one content type: **Posts**. Publishing means **adding one file** to `_entries/`. The landing page and the
Posts index read the collection directly — no template edits.

## Local preview

### One-time setup

GitHub Pages builds this site server-side, so local preview is optional — but it's the only way to see a change before
pushing it.

Use **Ruby 3.3**. On Ruby 3.3 the `github-pages` gem resolves to Jekyll 3.10 / Liquid 4.0.4 and builds cleanly. Plain
`brew install ruby` currently gives you Ruby 4.x, where the same gem resolves to the older Jekyll 3.9 / Liquid 4.0.3 —
that version calls `tainted?`, which Ruby removed in 3.2, and the build dies on the first template. So install the
versioned formula, not `ruby`:

```sh
brew install ruby@3.3
export PATH="/usr/local/opt/ruby@3.3/bin:$PATH"
gem install bundler
bundle config set --local path vendor/bundle
bundle install
```

`.envrc` puts that same `PATH` line on any shell that enters this directory, so it's the last time you have to type it —
but only once [direnv](https://direnv.net) is installed and hooked into your shell. Without direnv the file does nothing
at all:

```sh
brew install direnv
echo 'eval "$(direnv hook zsh)"' >> ~/.zshrc   # then open a new shell
direnv allow
```

`direnv allow` records a hash of `.envrc`, so re-run it after editing that file. The path in it is Homebrew's Intel
prefix (`/usr/local/opt`); on Apple Silicon it would be `/opt/homebrew/opt`.

### Running it

```sh
bundle exec jekyll serve
```

Then open <http://localhost:4000>. The server rebuilds on save; Ctrl-C stops it.

| Flag           | What it does                                               |
|----------------|------------------------------------------------------------|
| `--livereload` | Refreshes the browser automatically on rebuild             |
| `--port 4001`  | Use a different port if 4000 is taken                      |
| `--future`     | Include future-dated posts (normally skipped)              |
| `--detach`     | Run in the background; stop with `pkill -f "jekyll serve"` |

To build without serving: `bundle exec jekyll build` (output lands in `_site/`, which is gitignored).

### Troubleshooting

**`undefined method 'tainted?'`** — you're on Ruby 4.x, which resolves to the old Jekyll 3.9 / Liquid 4.0.3. Check
`ruby -v`; you want 3.3.x. Either direnv didn't load (it prints `direnv: loading .../.envrc` when it does — if it's
silent, run `direnv allow`) or `ruby@3.3` isn't installed.

**`Could not find github-pages-232 ... in locally installed gems`** — same cause, one layer down: the gems are installed
under Ruby 3.3 in `vendor/bundle/ruby/3.3.0/`, and you're running some other Ruby. Check `ruby -v`.

**`cannot load such file -- csv`** — newer Rubies unbundled several stdlib gems. The Gemfile declares `csv`, `base64`,
`bigdecimal`, `logger` and
`ostruct` to cover this; run `bundle install` again.

**A new post 404s** — check that you don't have `published: false` set, and that the file is in `_entries/`.

**Changes to `_config.yml` don't show up** — that file is only read at startup. Restart the server.
