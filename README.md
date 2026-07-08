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

The site is deployed to **GitHub Pages** with a custom domain
(`annkafalk.com`, configured via `public/CNAME`).

- `.github/workflows/ci.yml` validates that the project typechecks and
  builds successfully on every push/PR.
- `.github/workflows/deploy.yml` builds the site and deploys the `dist/`
  folder to GitHub Pages on every push to `main`.
- `vite.config.ts` keeps `base: "/"` since the site is served from a
  custom domain at the root path (no GitHub Pages project subpath).
- DNS for `annkafalk.com` is configured at the registrar (Squarespace
  Domains) with 4 `A` records pointing at GitHub Pages' IPs
  (`185.199.108.153`–`185.199.111.153`) and a `www` `CNAME` record
  pointing at `deweezy12.github.io`.

## Content notes

- `PORTFOLIO_ORDER` in `src/App.tsx` controls both the file numbers used and
  the display order of the portfolio grid.
- `POLAS_ITEMS` controls the four "Polas" images and their labels.
- Two extra images (`polas-front.jpg`, `polas-fullbody.jpg`) are included in
  `public/images/` but not currently referenced in the code — kept for
  possible future use.
