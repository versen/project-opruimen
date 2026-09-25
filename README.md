# versen.nl — Astro rebuild

Successor to the Jekyll site in `../versen.github.io` (left untouched). Static site, Astro 7.

```sh
npm install
npm run dev        # http://localhost:4380
npm run build      # -> dist/
python3 scripts/migrate-news.py   # re-import news + assets from ../versen.github.io
```

## Where things live

| What | Where |
|---|---|
| Navigation (header, mobile menu, section sub-nav, footer sitemap, hub cards) | `src/data/nav.ts` — the only place to add a page to the menus |
| Pages (About, Awards, Resources, Working Groups, events) | `src/content/pages/**.mdx` — the path is the URL |
| News | `src/content/news/YYYY-MM-DD-slug.md` (`title`, `date`, optional `image`) |
| Events list, home-page spotlights/quotes/stats | `src/data/events.ts`, `src/data/home.ts` |
| Old-URL redirects | `src/data/redirects.json` (pages), `src/data/news-redirects.json` (generated) |
| Photo galleries (resized at build) | `src/assets/galleries/<folder>/`, used as `<Gallery folder="…" />` |
| Styles (colours and fonts are tokens at the top) | `src/styles/global.css` |

## Deploying (GitHub Pages)

`.github/workflows/deploy.yml` builds on every push to `main` and publishes `dist/` with
GitHub Pages. One-time repo settings: **Pages → Source: GitHub Actions**, and the custom
domain (www.versen.nl) entered there — there is deliberately no `CNAME` file, so a copy
of the repo can't claim the domain.

For a review copy (e.g. a separate preview repo), set the repository variable
`PREVIEW=true` (Settings → Secrets and variables → Actions → Variables). That build shows
a "preview" banner, is hidden from search engines, and disables the Join form.
Locally: `PUBLIC_PREVIEW=true npm run build`.

When the copy is served under a sub-path (a GitHub Pages project site such as
`…/project-opruimen/`), also set `BASE_PATH=/project-opruimen`. A build step then prefixes
every root-relative link in the generated HTML (`src/integrations/base-links.mjs`).
Locally: `BASE_PATH=/project-opruimen PUBLIC_PREVIEW=true npm run build`.
