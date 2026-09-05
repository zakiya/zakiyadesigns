# zakiyadesigns.com

Portfolio and writing of Zakiya Khabir. A Jekyll site built by GitHub Pages, served
at [zakiyadesigns.com](https://zakiyadesigns.com).

## Adding content

Adding a project or an essay means **adding one file**. The landing page and the section indexes read from the
collections directly — no template edits.

**A project** — create `_projects/my-project.md`:

```yaml
---
title: The thing I did
year: 2026
role: Engineering manager
venue: Where it happened
summary: One or two sentences for the listing.
tags: [ topic, topic ]
deck: /slides/my-project/   # optional, if slides exist
---

The story goes here.
```

**A piece of writing** — create `_writing/my-essay.md`:

```yaml
---
title: What I think about this
date: 2026-09-05
kind: professional   # or: personal
summary: One or two sentences for the listing.
---

The essay goes here.
```

Set `published: false` in the front matter to keep something out of the build.

Don't post-date a `date:`. Jekyll lists a future-dated file but won't generate its page, so the link 404s until that
date arrives. Use `--future` locally if you need to preview one.

## Layout

| Path                      | What it is                                                   |
|---------------------------|--------------------------------------------------------------|
| `_projects/`, `_writing/` | Content. One markdown file per item.                         |
| `slides/`                 | The original Keynote HTML exports, linked from case studies. |
| `_layouts/`, `_includes/` | Templates. `_includes/nav.html` is the only nav.             |
| `_sass/zakiya/`           | Design system tokens, vendored from claude.ai/design.        |
| `pages/`                  | Unrelated San Diego Sirens tooling that shares this repo.    |

The design tokens are vendored, not authored here. Re-pull them from the Zakiya design system rather than editing
`_sass/zakiya/` by hand.

## Hosting and DNS

The site is served by GitHub Pages from `main` at the repo root. The domain is registered at **GoDaddy** (nameservers
`ns21`/`ns22.domaincontrol.com`).

### The problem

The apex `zakiyadesigns.com` still points at `192.30.252.153` and
`192.30.252.154` — GitHub's *retired* Pages IPs. They answer with a 404 and no valid certificate, so the apex is
effectively dead. The current Pages IPs are
`185.199.108–111.153`.

`www.zakiyadesigns.com` is already a CNAME to `zakiya.github.io` and is **correct as-is** — leave it alone. GitHub
routes by the Host header and the custom domain configured on the repo, not by which repo the CNAME target happens to
name.

### Fixing the A records at GoDaddy

1. Sign in to GoDaddy → **My Products** → find `zakiyadesigns.com` → **DNS**
   (or go straight to `dcc.godaddy.com/control/dnsmanagement?domainName=zakiyadesigns.com`).
2. In the **Records** list, find the two **A** records with Name `@` pointing to
   `192.30.252.153` and `192.30.252.154`. Delete both (trash icon → confirm).
3. **Add** four new records, one at a time:

   | Type | Name | Value | TTL |
      |---|---|---|---|
   | A | `@` | `185.199.108.153` | 600 seconds |
   | A | `@` | `185.199.109.153` | 600 seconds |
   | A | `@` | `185.199.110.153` | 600 seconds |
   | A | `@` | `185.199.111.153` | 600 seconds |

   Four separate A records on the same `@` name is correct and expected — GoDaddy allows it. A short TTL while you
   verify is deliberate; raise it to 1 hour once the site is up.

4. Optionally add IPv6, same `@` name, type **AAAA**:
   `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`,
   `2606:50c0:8003::153`.
5. Leave the existing `www` CNAME (`zakiya.github.io`) untouched.

### Then, on GitHub

1. `zakiya/zakiyadesigns` → **Settings** → **Pages**.
2. Source: **Deploy from a branch**, branch `main`, folder `/ (root)`.
3. **Custom domain**: enter `zakiyadesigns.com` and Save. The repo's `CNAME`
   file already contains this, so nothing should change on disk.
4. Wait for the DNS check to go green, then tick **Enforce HTTPS**. The certificate can take up to 24 hours to issue —
   the checkbox stays greyed out until it does.

Make sure the `zakiya/zakiya.github.io` repo does **not** also claim
`zakiyadesigns.com` as its custom domain, or the two will fight over it.

### Verifying

```sh
dig +short zakiyadesigns.com A          # expect the four 185.199.x.153
curl -sI https://zakiyadesigns.com      # expect HTTP/2 200, valid cert
```

DNS changes at GoDaddy usually propagate in minutes, but allow up to an hour. If `dig` still shows the old IPs, your
resolver has them cached — try
`dig @1.1.1.1 +short zakiyadesigns.com A` to bypass it.

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

macOS ships Ruby 2.6, which is too old, so the `PATH` line is not optional — without it you get the system Ruby and
`bundle install` fails.

### Running it

```sh
export PATH="/usr/local/opt/ruby@3.3/bin:$PATH"
bundle exec jekyll serve
```

Then open <http://localhost:4000>. The server rebuilds on save; Ctrl-C stops it.

| Flag           | What it does                                               |
|----------------|------------------------------------------------------------|
| `--livereload` | Refreshes the browser automatically on rebuild             |
| `--port 4001`  | Use a different port if 4000 is taken                      |
| `--future`     | Include future-dated writing (normally skipped)            |
| `--detach`     | Run in the background; stop with `pkill -f "jekyll serve"` |

To build without serving: `bundle exec jekyll build` (output lands in `_site/`, which is gitignored).

### If you'd rather not retype the PATH line

Adding it to `~/.zshrc` makes Ruby 3.3 the default for *every* project on the machine, which may not be what you want.
Scoping it to this repo is safer — either a shell alias, or [direnv](https://direnv.net) with a `.envrc`
containing:

```sh
export PATH="/usr/local/opt/ruby@3.3/bin:$PATH"
```

### Troubleshooting

**`undefined method 'tainted?'`** — you're on Ruby 4.x, which resolves to the old Jekyll 3.9 / Liquid 4.0.3. Check
`ruby -v`; you want 3.3.x. Either the
`PATH` export is missing or `ruby@3.3` isn't installed.

**`cannot load such file -- csv`** — newer Rubies unbundled several stdlib gems. The Gemfile declares `csv`, `base64`,
`bigdecimal`, `logger` and
`ostruct` to cover this; run `bundle install` again.

**A new page 404s** — check the `date:` isn't in the future, and that you don't have `published: false` set.

**Changes to `_config.yml` don't show up** — that file is only read at startup. Restart the server.
