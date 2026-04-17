# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static personal academic portfolio website for Liang Wang, hosted on GitHub Pages. There is no build system, package manager, or framework — just plain HTML, CSS, and vanilla JavaScript.

## Development

To preview the site locally, serve it with any static HTTP server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## Architecture

**Single-page site** — all content lives in `index.html`. The layout uses [Materialize CSS](https://materializecss.com/) (v1.x) for the responsive grid and UI components.

Key files:
- `index.html` — entire page content (sections: bio, research interests, news, publications, preprints, projects, academic services, education)
- `css/style.css` — custom styles on top of Materialize
- `js/app.js` — sticky header behavior only

**Publications** are organized within `index.html` under three categories: AI for Science, Graph ML, and Data Mining. Each entry is plain HTML — no CMS or templating.

**Assets:**
- `asset/` — avatar and institution logos (PNG)
- `files/` — CV PDFs, paper PDFs, posters, slides
- `fonts/` — Chinese TTF fonts used in CV display
