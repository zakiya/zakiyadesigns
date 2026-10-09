# zakiyadesigns.com

Works by Zakiya. A Jekyll site built by GitHub Pages, served at [zakiyadesigns.com](https://zakiyadesigns.com).

## Adding content

There is one content type: **Posts**. Publishing means **adding one file** to `_entries/`. The landing page and the
Posts index read the collection directly — no template edits.

## Local preview

### One-time setup

GitHub Pages builds this site server-side, so local preview is optional — but it's the only way to see a change before
pushing it.

[mise](https://mise.jdx.dev) installs the right Ruby (3.3, pinned in `mise.toml`) and runs the commands below with it.
Install mise once, then set up the gems:

```sh
curl https://mise.run | sh     # or: brew install mise
mise install                   # Ruby 3.3, from mise.toml
mise run setup                 # gems into vendor/bundle
```

Nothing goes in your shell profile: `mise run` picks up Ruby 3.3 on its own.

Why 3.3: on it the `github-pages` gem resolves to Jekyll 3.10 / Liquid 4.0.4 and builds cleanly. On Ruby 4.x it resolves
to the older Jekyll 3.9 / Liquid 4.0.3, which calls `tainted?` (removed in Ruby 3.2) and dies on the first template.

### Running it

```sh
mise run serve
```

Then open <http://localhost:4000>. The server rebuilds on save; Ctrl-C stops it. Flags go on the end, e.g.
`mise run serve --livereload`.

| Flag           | What it does                                               |
|----------------|------------------------------------------------------------|
| `--livereload` | Refreshes the browser automatically on rebuild             |
| `--port 4001`  | Use a different port if 4000 is taken                      |
| `--future`     | Include future-dated posts (normally skipped)              |
| `--detach`     | Run in the background; stop with `pkill -f "jekyll serve"` |

To build without serving: `mise run build` (output lands in `_site/`, which is gitignored).

### Troubleshooting

**`undefined method 'tainted?'`** or **`Could not find github-pages-232 ... in locally installed gems`** — something ran
`bundle` with a Ruby other than 3.3. Use `mise run …` rather than calling `bundle` directly; if it persists, run
`mise run setup` again.

**`cannot load such file -- csv`** — newer Rubies unbundled several stdlib gems. The Gemfile declares `csv`, `base64`,
`bigdecimal`, `logger` and `ostruct` to cover this; run `mise run setup` again.

**A new post 404s** — check that you don't have `published: false` set, and that the file is in `_entries/`.

**Changes to `_config.yml` don't show up** — that file is only read at startup. Restart the server.
