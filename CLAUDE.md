# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio website for **Moldoo STUDIO**, a Korean creative production company. Hosted on GitHub Pages at `moldoo.info`. Built with Vite + React 18, deployed via GitHub Actions.

## Development

```bash
npm run dev      # localhost:5173
npm run build    # outputs to dist/
npm run preview  # preview the dist/ build
```

No lint or test commands.

## Architecture

Single-page app using React Router v6 with **HashRouter** (required for GitHub Pages — no 404 redirect needed).

**Routing:** `/#/` → HomePage, `/#/about` → AboutPage, `/#/project` → ProjectPage, `/#/contact` → ContactPage

**Entry:** `src/main.jsx` → `src/App.jsx` (wraps everything in HashRouter + shared Navbar/Footer)

**Styling:** Mix of `src/global.css` (CSS custom properties, resets, shared keyframes) and CSS Modules per component (`.module.css` files). CSS vars defined in `:root`:
- `--background: #1c1d1d` (dark)
- `--primary: #eb6301` (orange accent)
- `--text-white: #ffffff`

Responsive breakpoints: **768px** (mobile), **1024px** (tablet). Font: Pretendard via CDN.

**Data arrays** in `src/data/`:
- `videos.js` — YouTube video entries for FILM tab (each needs a video ID + metadata)
- `designs.js` — Design portfolio items for DESIGN tab
- `services.js` — 6 service card entries (Korean labels)

**Key components:**
- `src/components/Navbar/` — scroll detection via `src/hooks/useScrolledNavbar.js` (adds `.scrolled` at 50px), active route highlighting via `useLocation`
- `src/components/ProjectTabs/ProjectTabs.jsx` — FILM/DESIGN tab switcher; tab state stored in URL query param `?tab=film|design` via `useSearchParams`
- `src/components/ProjectTabs/PortfolioCard.jsx` — YouTube iframe lazy loading using `react-intersection-observer`; first 3 cards load eagerly, rest on scroll with 200px margin
- `src/components/ProjectTabs/DesignCard.jsx` — Design item card with gradient fallback for failed images
- `src/components/ContactForm/` — EmailJS integration (`@emailjs/browser`) with phone (9–11 digit) and email validation

**Assets:** Stored in `public/assets/` and referenced as `/assets/...` in JSX.

## Key Implementation Details

**EmailJS:** Credentials in `.env` as `VITE_EMAILJS_*` — intentionally not gitignored since these are public client-side keys by design.

**Deploy:** `.github/workflows/deploy.yml` runs `npm run build` then deploys `dist/` via `peaceiris/actions-gh-pages@v4`.

**Language:** Site content is primarily Korean (`<html lang="ko">`).

**Adding portfolio videos:** Add an entry to `src/data/videos.js`. The lazy-loading logic in `PortfolioCard.jsx` handles iframe injection automatically.

**Adding design items:** Add an entry to `src/data/designs.js`.
