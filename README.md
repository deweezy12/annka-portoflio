# Annka Falk — Model Portfolio

A single-page portfolio website for model Annka Falk — sedcard, editorial
portfolio grid with lightbox, polas, about and contact sections.

Built with [Vite](https://vitejs.dev) + [React](https://react.dev) +
TypeScript.

## Getting started

Requires Node.js 20 (see `.nvmrc`).

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173` by default.

## Available scripts

| Script              | Description                                        |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Start the Vite dev server with hot reload          |
| `npm run build`     | Typecheck and build a production bundle to `dist/` |
| `npm run preview`   | Preview the production build locally               |
| `npm run typecheck` | Run TypeScript in `--noEmit` mode                  |

## Project structure

```
public/
  favicon.svg
  images/          # portfolio, hero and polas photography
src/
  App.tsx          # page markup and interaction (nav, lightbox, sections)
  App.css          # all page styling, scoped under .annkafalk-page
  index.css        # minimal global reset
  main.tsx         # React entry point
  lib/
    asset.ts       # resolves asset paths against Vite's base URL
index.html
vite.config.ts
tsconfig.json
```

## Deployment

Not yet configured — hosting will be decided in a later step. Once a
target is chosen:

- **Custom domain / root path hosting** (Vercel, Netlify, most VPS setups):
  no changes needed, `vite.config.ts` already defaults `base` to `/`.
- **GitHub Pages project site** (e.g. `https://user.github.io/repo-name/`):
  set `base: "/repo-name/"` in `vite.config.ts` (or pass `BASE_PATH` as an
  env var at build time), and add a deploy step/workflow that uploads the
  `dist/` folder via `actions/deploy-pages`.

The `.github/workflows/ci.yml` workflow currently only validates that the
project typechecks and builds successfully on every push/PR — it does not
deploy anywhere yet.

## Content notes

- `PORTFOLIO_ORDER` in `src/App.tsx` controls both the file numbers used and
  the display order of the portfolio grid.
- `POLAS_ITEMS` controls the four "Polas" images and their labels.
- Two extra images (`polas-front.jpg`, `polas-fullbody.jpg`) are included in
  `public/images/` but not currently referenced in the code — kept for
  possible future use.
