# Sajith Jeewantha — Portfolio v1.0.0

Personal portfolio and blog of **Sajith Jeewantha**, Software Engineer — live at [sajithjeewantha.com](https://sajithjeewantha.com).

A fast, fully static site built with **Astro 7** and **Tailwind CSS 4**. All content — bio, education, certifications, projects, technology stack and blog posts — lives in this repository as **JSON** and **Markdown**. There is no database, no server and no admin login: edit a file, commit, deploy.

---

## Contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Quick start](#quick-start)
- [Commands](#commands)
- [Project structure](#project-structure)
- [Managing content](#managing-content)
  - [Profile & bio](#profile--bio)
  - [Experience](#experience)
  - [Education](#education)
  - [Certifications](#certifications)
  - [Projects](#projects)
  - [Technology stack](#technology-stack)
  - [Blog posts](#blog-posts)
  - [Bible verses](#bible-verses)
  - [Code lab & pipeline](#code-lab--pipeline)
  - [Changing your profile photo](#changing-your-profile-photo)
  - [Icons & images](#icons--images)
- [Design system](#design-system)
  - [Hero art: v1 – v10](#hero-art-v1--v10)
- [Themes: light, dark, system](#themes-light-dark-system)
- [SEO](#seo)
- [Deployment](#deployment)
- [Migrating from v0 (Django)](#migrating-from-v0-django)
- [Troubleshooting](#troubleshooting)

---

## Features

- **Sections**: Bio / About (with a code "lab" window) · Experience (with an ML pipeline diagram) · Education & Certifications · Projects (with category filter) · Technology Stack · Blog · Scripture
- **Ten hero art designs** to choose from (v1–v5 animated, v6–v10 static), all previewed side by side at `/design/`
- **Scripture**: Catholic Bible verses on love, strength and relationship (Douay–Rheims, public domain)
- **Blog** in Markdown with syntax highlighting, table of contents, reading time, tags, RSS feed and drafts
- **Light / Dark / System** theme switch, remembered per visitor, with no flash on load
- **Content as data**: JSON files validated by schemas — a typo fails the build, never the live site
- **Optimised images**: logos and photos are resized and converted to WebP at build time (a 112 KB PNG becomes about 3 KB)
- **Zero icon fonts and almost no JavaScript**: icons are inline SVG rendered at build time
- **Accessible**: semantic HTML, skip link, keyboard focus styles, `prefers-reduced-motion` respected
- **SEO**: meta and Open Graph tags, JSON-LD (`Person`, `BlogPosting`), `sitemap-index.xml`, `robots.txt`, RSS

## Tech stack

| Area           | Choice                                                                 |
| -------------- | ---------------------------------------------------------------------- |
| Framework      | [Astro 7](https://astro.build) (static output)                         |
| Styling        | [Tailwind CSS 4](https://tailwindcss.com) + `@tailwindcss/typography`  |
| Content        | Astro Content Collections (JSON via `file()`, Markdown via `glob()`)   |
| Validation     | Zod schemas in `src/content.config.ts`                                 |
| Images         | `astro:assets` + `sharp` (WebP, responsive sizes)                      |
| UI icons       | [Lucide](https://lucide.dev) and [Remix Icon](https://remixicon.com) via Iconify, inlined at build |
| Fonts          | Self-hosted with Fontsource: Inter, JetBrains Mono, Cormorant Garamond |
| Feeds / SEO    | `@astrojs/rss`, `@astrojs/sitemap`                                     |

## Quick start

**Requirements:** Node.js **22.23.4 or newer** (see `engines` in `package.json`) and npm.

```sh
git clone https://github.com/sajith-jeewantha/Portfolio.git
cd Portfolio
git switch release/v1.0.0
cd site
npm install
npm run dev
```

Open <http://localhost:4321>. The page reloads as you edit files.

## Commands

Run all commands from the `site/` folder.

| Command             | What it does                                                        |
| ------------------- | ------------------------------------------------------------------- |
| `npm install`       | Install dependencies                                                |
| `npm run dev`       | Start the dev server at `localhost:4321` (shows draft posts too)    |
| `npm run build`     | Validate all content and build the production site into `./dist/`   |
| `npm run preview`   | Serve the production build from `./dist/` locally                   |
| `npm run check`     | Type-check `.astro` / `.ts` files and content schemas               |
| `npm run sync`      | Regenerate content types after changing `content.config.ts`         |
| `npm run icon -- pytorch` | Save a brand logo from Simple Icons into `src/assets/icons/`  |
| `npm run photo -- <file>` | Convert a photo (incl. iPhone HEIC) to a web-ready JPEG, metadata removed |
| `npm run astro -- --help` | Any other Astro CLI command                                   |

Typical release check before pushing:

```sh
npm run check && npm run build && npm run preview
```

## Project structure

```
site/
├── astro.config.mjs          # Site URL, integrations, Tailwind, code-highlight themes
├── package.json
├── public/                   # Copied as-is: favicon.svg, robots.txt
└── src/
    ├── assets/
    │   ├── icons/            # Technology & issuer logos (renamed, kebab-case)
    │   └── images/           # Profile photo and other images
    ├── components/
    │   ├── sections/         # Hero, About, Experience, Education, Projects, Stack, LatestPosts, Scripture, Contact
    │   ├── Header.astro      # Sticky nav, mobile menu, theme switch
    │   ├── Footer.astro
    │   ├── Icon.astro        # Build-time inline SVG icons
    │   ├── Medallion.astro   # Logo on a "porcelain" plate (legible in both themes)
    │   ├── hero-art.ts       # Registry of hero art versions (used by Hero + /design)
    │   ├── RoseFrame.astro   # Shared frame + portrait for circular windows (v3–v5)
    │   ├── RoseWindow-v1.astro … RoseWindow-v10.astro # Hero art versions
    │   ├── CodeLab.astro     # IDE-style code window (PyTorch · MCP · Ballerina)
    │   ├── Pipeline.astro    # ML / agent pipeline diagram
    │   ├── VerseDivider.astro # Ornament + verse between sections
    │   └── ...
    ├── content/
    │   └── blog/             # Blog posts (.md / .mdx)
    ├── content.config.ts     # Schemas for every collection
    ├── data/                 # ← All portfolio content lives here (JSON)
    │   ├── site.json             # Site title, description, keywords, nav
    │   ├── profile.json          # Name, bio, current role, focus areas, socials, skill profiles
    │   ├── experience.json       # Jobs / internships
    │   ├── verses.json           # Bible verses (love, strength, relationship)
    │   ├── education.json
    │   ├── issuers.json          # Certification issuers + their logos
    │   ├── certifications.json
    │   ├── projects.json
    │   ├── project-categories.json
    │   ├── technologies.json
    │   └── tech-categories.json
    ├── layouts/BaseLayout.astro  # <head>, SEO tags, theme script
    ├── lib/content.ts        # Data helpers (sorting, lookups, logo resolver)
    ├── pages/
    │   ├── index.astro       # Home page
    │   ├── blog/index.astro  # /blog
    │   ├── blog/[...slug].astro  # /blog/<post>
    │   ├── rss.xml.ts        # /rss.xml
    │   ├── design.astro      # /design — compare hero art versions (noindex)
    │   └── 404.astro
    └── styles/global.css     # Design tokens (colours, fonts) + components
```

## Managing content

Every JSON entry needs a unique `id`. Most collections also support:

- `"visible": false`: hide an item without deleting it
- `"order": 1`: control the display order (lower comes first)

Run `npm run dev` while editing. If something is wrong, the terminal shows exactly which file and field is invalid.

### Profile & bio

`src/data/profile.json`

```json
{
  "name": "Sajith Jeewantha",
  "role": "Software Engineer",
  "headline": "Full Stack Software Engineer",
  "intro": "Hi, I'm Sajith Jeewantha — ...",
  "mission": "I strive to make this world a better place ...",
  "about": ["Paragraph 1", "Paragraph 2"],
  "focus": [{ "label": "Cloud & DevOps", "icon": "cloud", "text": "..." }],
  "socials": [{ "name": "GitHub", "url": "https://github.com/...", "icon": "ri:github-fill" }],
  "skillProfiles": [{ "name": "Credly", "url": "https://...", "logo": "credly" }]
}
```

- `icon` values are icon names: plain names are [Lucide](https://lucide.dev/icons) (e.g. `cloud`, `brain`); `ri:` names are [Remix Icon](https://remixicon.com) (used for brand logos).
- `logo` values are file names from `src/assets/icons/` (without extension).

`src/data/site.json` holds the page title, SEO description, keywords, navigation links and the site **version**.

### Experience

`src/data/experience.json`. Current roles are listed first, then the rest by start date (newest first).

```json
{
  "id": "wso2-software-engineer-intern",
  "role": "Software Engineer Intern",
  "company": "WSO2",
  "companyUrl": "https://wso2.com",
  "logo": "wso2",
  "type": "Internship",
  "location": "Colombo, Sri Lanka",
  "start": "2026-07",
  "end": null,
  "description": "...",
  "highlights": ["Building AI agents with the Model Context Protocol (MCP)", "..."],
  "skills": ["Deep Learning", "MCP", "AI Agents"],
  "order": 1,
  "visible": true
}
```

- `start` / `end` use `"YYYY-MM"`. `"end": null` means **Present**: the card gets a "Current role" badge, and the duration (e.g. `5 mos`) is worked out automatically.
- `type`: `Full-time`, `Part-time`, `Internship`, `Contract` or `Freelance`
- When a role changes, also update `"current"` in `profile.json` (it's shown in the hero badge and the SEO data).

### Education

`src/data/education.json`

```json
{
  "id": "mphil-software-engineering",
  "degree": "Master of Philosophy in Software Engineering",
  "school": "IIC University of Technology / Java Institute for Advanced Technology",
  "start": 2026,
  "end": 2028,
  "status": "in-progress",
  "description": "...",
  "highlights": ["Artificial Intelligence", "Neural Network Programming"],
  "gpa": null,
  "grade": null,
  "order": 1,
  "visible": true
}
```

`status` is `completed` or `in-progress`. `gpa` (0–4) and `grade` are optional and only shown when set.

### Certifications

`src/data/certifications.json`; the issuer is a reference to an `id` in `issuers.json`.

```json
{
  "id": "oci-foundations",
  "title": "OCI 2025 Certified Foundations Associate",
  "issuer": "oracle",
  "year": 2025,
  "month": 10,
  "expires": 2027,
  "status": "earned",
  "url": "https://catalog-education.oracle.com/...",
  "description": "...",
  "order": 5,
  "visible": true
}
```

- `status`: `earned` or `in-progress`
- `month` (optional, 1–12): shows the issue date as `Oct 2026` instead of just the year
- `url`: the verification link (shown as **Verify ↗**); use `null` if there is none yet
- To add a new issuer, add a logo to `src/assets/icons/` and an entry to `issuers.json`:
  `{ "id": "microsoft", "name": "Microsoft", "logo": "microsoft" }`

### Projects

`src/data/projects.json`

```json
{
  "id": "ai-chat-bot",
  "title": "AI Chat Bot",
  "year": 2026,
  "status": "completed",
  "icon": "bot",
  "categories": ["ai", "ml"],
  "description": "...",
  "features": ["TF-IDF vector search", "..."],
  "tech": ["Python", "Scikit-learn", "Docker"],
  "links": [
    { "type": "github", "label": "Source", "url": "https://github.com/..." },
    { "type": "docker", "label": "Docker Hub", "url": "https://hub.docker.com/..." }
  ],
  "featured": true,
  "order": 2,
  "visible": true
}
```

- `status`: `completed`, `in-progress` or `published`
- `categories`: ids from `project-categories.json` (these become the filter buttons)
- `links[].type`: `github`, `website`, `post`, `docker`, `video` or `other` (sets the icon)
- `icon`: any [Lucide icon](https://lucide.dev/icons) name

### Technology stack

`src/data/technologies.json`:

```json
{ "id": "docker", "name": "Docker", "category": "devops", "logo": "docker", "visible": true }
```

Categories (label, icon and order) are in `src/data/tech-categories.json`. Items in a category are listed alphabetically, and empty categories are hidden automatically.

**To add a technology:**

1. Put the logo in `src/assets/icons/`, e.g. `kubernetes.png` (lowercase, kebab-case).
2. Add `{ "id": "kubernetes", "name": "Kubernetes", "category": "devops", "logo": "kubernetes", "visible": true }`.

### Blog posts

Create a Markdown file in `src/content/blog/`. The file name becomes the URL:
`src/content/blog/my-first-post.md` → `/blog/my-first-post/`

```markdown
---
title: 'My first post'
description: 'One or two sentences shown on cards, in search results and in RSS.'
pubDate: 2026-11-10
updatedDate: 2026-11-12 # optional
tags: ['java', 'spring-boot']
cover: ./images/my-first-post-cover.png # optional, relative to this file
coverAlt: 'Architecture diagram' # optional
draft: true # visible in `npm run dev`, hidden in production
---

## A heading

Normal **Markdown**: lists, tables, links, images and code blocks.
```

- `## headings` automatically build the "On this page" table of contents.
- Images: put them next to the post (e.g. `src/content/blog/images/`) and reference them with a relative path. They are optimised at build time.
- Set `draft: false` to publish.

### Bible verses

`src/data/verses.json` uses the **Douay–Rheims** Bible, the classic English Catholic translation, which is in the **public domain**. Modern Catholic translations (NABRE, RSV-CE) are copyrighted, so check their licence before quoting them on a public site.

```json
{ "id": "isa-40-31", "theme": "strength", "reference": "Isaiah 40:31", "featured": true, "order": 1,
  "text": "But they that hope in the Lord shall renew their strength, ..." }
```

- `theme`: `love`, `strength` or `relationship` (the tabs in the Scripture section), or `other`
- `featured: true`: the large verse with the illuminated initial at the top of its tab
- `visible: false`: hidden from the tabs but still usable by id. Verses used elsewhere are hidden from the tabs so they don't appear twice:

| Where                           | Verse id      | Set in                          |
| ------------------------------- | ------------- | ------------------------------- |
| Under the hero                  | `phil-4-13`   | `src/pages/index.astro`         |
| Between Education and Projects  | `prov-27-17`  | `src/pages/index.astro`         |
| Footer motto                    | `1cor-16-14`  | `src/components/Footer.astro`   |
| 404 page                        | `luke-15-6`   | `src/pages/404.astro`           |

To put a verse anywhere: `<VerseDivider id="john-15-12" />`. An unknown id fails the build.

### Code lab & pipeline

- The **code lab** in About (`src/components/CodeLab.astro`) shows three tabs: `train.py` (PyTorch), `mcp_server.py` (an MCP tool server) and `service.bal` (Ballerina), plus a terminal with an illustrative training log and loss curve. Edit the `files` array to change the snippets; any [Shiki language](https://shiki.style/languages) works.
- The **pipeline** under Experience is configured in `profile.json` → `pipeline` (label, `fn`, Lucide icon, text).
- The **stats** in About use code-style labels (`len(projects)`, `stack.size`, …), and their numbers are counted from your data automatically.

### Changing your profile photo

The photo is resolved in one place (`src/lib/avatar.ts`) and used by every hero design, the Open Graph image and so on. Nothing else hard-codes its file name.

1. Put the photo in `src/assets/images/`.
2. **iPhone HEIC/HEIF photos** (and other non-web formats) must be converted first:
   ```sh
   npm run photo -- src/assets/images/my-photo.heic            # → my-photo.jpg
   npm run photo -- ~/Downloads/IMG_1234.HEIC sajith-jeewantha  # custom output name
   ```
   This resizes to max 1600 px, fixes rotation and **removes all metadata**. Phone photos can contain GPS location, which shouldn't be published. HEIC conversion uses macOS's built-in `sips` (`heif-convert` on Linux).
3. In `src/data/profile.json`:
   ```json
   "avatar": "sajith-jeewantha",
   "avatarPosition": "18% 50%"
   ```
   - `avatar`: the file name **without extension**; `.jpg`, `.jpeg`, `.png`, `.webp` or `.avif` are all found automatically.
   - `avatarPosition`: where to focus when the photo is cropped into a circle, like CSS `object-position` (`"x% y%"`). Lower x moves the crop left, lower y moves it up. Use `"center"` for photos with the face in the middle.

If the photo is missing or in an unsupported format, the build stops and says what to do. `.heic` files are git-ignored, so the large originals never get committed.

### Icons & images

| What                         | Where                       | How it's used                                         |
| ---------------------------- | --------------------------- | ----------------------------------------------------- |
| Tech / issuer logos          | `src/assets/icons/`         | Referenced by name (`"logo": "spring-boot"`)          |
| Profile photo                | `src/assets/images/`        | Hero, Open Graph image; see [Changing your profile photo](#changing-your-profile-photo) |
| Blog images                  | next to the post            | Relative path in Markdown / `cover`                   |
| Files served exactly as-is   | `public/`                   | e.g. `favicon.svg`, `robots.txt`, a CV PDF            |
| UI icons (sun, moon, arrows) | npm (`@iconify-json/*`)     | `<Icon name="sun" />`, no files needed                |

Logo tips:

- PNG with a transparent background, SVG or WebP; roughly **256–512 px** is plenty.
- Use lowercase kebab-case names: `google-cloud.png`, `spring-boot.png`.
- Logos sit on a light "porcelain medallion", so dark logos (Django, GitHub, Terraform) stay readable in dark mode.
- A missing or misspelt logo name **fails the build** with a list of available names.
- SVG logos are served as-is (they're already small and sharp); PNG/JPG logos are converted to WebP.
- Brand logos not in the folder can be taken from [Simple Icons](https://simpleicons.org). Run `npm run icon -- <slug> [file-name]`, e.g. `npm run icon -- pytorch`, to save one in the brand colour.

## Design system

**"Cathedral Glass"**: a modern AI and engineering look with subtle cathedral touches.

- **Palette** inspired by stained glass: **lapis** (primary), **gold** (gilded accent), **ruby**, **emerald** and **amethyst**, on a warm **vellum** canvas (light) or a deep **nave-at-night** navy (dark).
- **Rose window as a neural network**: the hero art is a generated SVG whose tracery is network nodes and synapses, with signals travelling along the edges.
- **Pointed-arch frames** for icons and the "SJ" monogram, **gilded ornaments** as section dividers, and frosted **glass panes** for cards.
- **Typography**: Cormorant Garamond for display headings, Inter for text, JetBrains Mono for technical labels.

All colours are CSS variables in `src/styles/global.css` (`:root` for light, `[data-theme='dark']` for dark) and are exposed to Tailwind as `bg-lapis`, `text-gold`, `border-line` and so on. To change the palette, edit those variables; every component follows.

Motion (rotation, signals, reveal-on-scroll) is turned off for visitors who prefer reduced motion.

### Hero art: v1 – v10

| Version | Component | Look | Design |
| --- | --- | --- | --- |
| `v1` | `RoseWindow-v1.astro` | Cathedral · neural network | Circular rose window: stained-glass lancets and a neural network radiating from your portrait, slowly turning |
| `v2` | `RoseWindow-v2.astro` | Cathedral · deep learning | Tall gothic lancet window: the glass is a feed-forward network (input at the sill → output in the oculus with your portrait), forward-pass signals, light rays, gold cross |
| `v3` | `RoseWindow-v3.astro` | Software engineering | "Compiled Rose": rotating source-code ring, git history with branches and merges, stained-glass service architecture (api, auth, db, cache, queue, ci/cd, tests, docs) with requests flowing to the centre |
| `v4` | `RoseWindow-v4.astro` | AI · ML · DL | "Attention Rose": 24 tokens linked by 3 attention heads, activation-heatmap glass, loss-landscape contours with a gradient-descent path into the portrait, rotating equations |
| `v5` | `RoseWindow-v5.astro` | All combined | "Cathedral of Code & Mind": lancets and cross, neural tracery with signals, attention arcs between git commits, code/math glyph roundels, and *ad maiorem Dei gloriam* in the ring |
| `v6` | `RoseWindow-v6.astro` | Static · hardware & software | "Circuit Rose": a printed circuit board; your portrait is the chip, gold copper traces with 45° bends end in vias and pads, silkscreen labels |
| `v7` | `RoseWindow-v7.astro` | Static · ML math | "Quatrefoil of Tensors": four gothic lobes are weight matrices Q, K, V, W as heatmap glass; roundels hold 3×3 convolution kernels |
| `v8` | `RoseWindow-v8.astro` | Static · Byzantine · binary | "Mosaic of Bits": concentric tesserae encoding "AD MAIOREM DEI GLORIAM · LOVE · STRENGTH · RELATIONSHIP" in 8-bit ASCII (gold = 1, glass = 0) |
| `v9` | `RoseWindow-v9.astro` | Static · data-driven | "Sunburst of Skills": inner ring = tech categories, outer ring = every visible technology from `technologies.json`; redraws when the data changes |
| `v10` | `RoseWindow-v10.astro` | Static · altarpiece | "Triptych": three gothic lancets, CODE (glass panes with code), FAITH (portrait in the oculus, cross, diamond-quarry glass), MIND (neural network glass) |

Compare them side by side, in light and dark, at **`/design/`** (e.g. <http://localhost:4321/design/>). To choose, set `"heroArt"` in `src/data/site.json` to `"v1"` … `"v10"`. An unknown value fails the build.

- All versions are registered in `src/components/hero-art.ts`. To add a v6, create the component and add one entry there; the hero and `/design` pick it up automatically.
- v3–v9 share `RoseFrame.astro` (frame, halo, portrait) and the geometry helpers in `src/lib/geometry.ts`.
- v1–v5 are animated (and stop for visitors who prefer reduced motion); v6–v10 are fully static.
- The `/design` page is `noindex` and left out of the sitemap; delete `src/pages/design.astro` (and any versions you don't use) once you've decided.

## Themes: light, dark, system

The switch in the header has three states:

| Option | Behaviour                                                      |
| ------ | -------------------------------------------------------------- |
| ☀ Light  | Always light                                                 |
| ☾ Dark   | Always dark                                                  |
| 🖥 System | Follows the OS setting and updates live when it changes (default) |

The choice is saved in `localStorage`. A small inline script in `BaseLayout.astro` applies the theme before the page paints, so there is no flash.

## SEO

What's built in:

| Area | What the site does |
| --- | --- |
| Titles & descriptions | Unique `<title>` and meta description per page (home description kept under 160 characters) |
| Canonical URLs | `<link rel="canonical">` on every page, so `*.pages.dev` copies don't compete with your domain |
| Indexing control | `/design` and the 404 page are `noindex`; `/design` is also left out of the sitemap |
| Sitemap & robots | `/sitemap-index.xml` (auto-generated from your pages) and `/robots.txt` pointing to it |
| Structured data | JSON-LD `Person` (photo, job, employer, university, skills, social profiles) + `WebSite` on the home page; `BlogPosting` on posts |
| Social previews | Open Graph + Twitter cards with a 1200×630 image, so links look good on LinkedIn, WhatsApp, X and Facebook |
| Performance | Static HTML on a CDN, ~2 KB of JavaScript, self-hosted fonts, WebP images, lazy loading, immutable caching |
| Accessibility | One `<h1>` per page, `lang="en"`, alt text, skip link, keyboard focus, reduced motion |
| Feeds | `/rss.xml` for the blog |

The domain is set in `astro.config.mjs` (`site`) and `src/data/site.json` (`url`).

### After going live

1. **Google Search Console** (<https://search.google.com/search-console>) → *Add property* → **Domain** → `sajithjeewantha.com`. Because DNS is on Cloudflare, Google can add the verification TXT record for you automatically. Alternatively use the *URL prefix* method: paste the token into `"googleSiteVerification"` in `src/data/site.json` and redeploy.
2. In Search Console → **Sitemaps** → submit `sitemap-index.xml`.
3. **URL Inspection** → enter `https://sajithjeewantha.com/` → *Request indexing*.
4. **Bing Webmaster Tools** (<https://www.bing.com/webmasters>) → *Import from Google Search Console* (also covers DuckDuckGo and Yahoo).
5. Check the results: [Rich Results Test](https://search.google.com/test/rich-results) for the structured data, [PageSpeed Insights](https://pagespeed.web.dev/) for performance, and the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) for the share preview.

What helps ranking most from here: **publish blog posts regularly**, link to the site from your LinkedIn, GitHub profile README, Credly and email signature, and keep `site.json` → `description` accurate.

## Deployment

`npm run build` produces a plain static folder (`site/dist/`) that any static host can serve. The domain is already on Cloudflare, so **Cloudflare Pages** is the natural choice: free, global CDN, automatic HTTPS, and no servers or databases to run.

### 1. Create the Pages project (one time)

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → authorise GitHub → choose `sajith-jeewantha/Portfolio`.
2. Build settings:

   | Setting | Value |
   | --- | --- |
   | Production branch | `master` |
   | Framework preset | Astro |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Root directory (advanced) | `site` |

   The Node.js version comes from `site/.node-version` (24). If the build log shows an older Node, add the environment variable `NODE_VERSION` = `24`.
3. **Save and Deploy.** You get a URL like `https://<project>.pages.dev`.

### 2. Preview before switching the domain

Every branch and pull request gets its own preview URL (e.g. `https://release-v1-0-0.<project>.pages.dev`), so you can test v1.0.0 while the old site keeps serving `sajithjeewantha.com`. Preview deployments are automatically hidden from search engines.

### 3. Go live

1. Merge `release/v1.0.0` into `master`. Pages builds and deploys production automatically.
2. Pages project → **Custom domains** → **Set up a custom domain** → `sajithjeewantha.com`, then again for `www.sajithjeewantha.com`.
   - The domain currently points to the old Cloud Run service. Cloudflare will ask to replace that DNS record; confirm it. The switch takes effect within minutes, and HTTPS is issued automatically.
3. Redirect `www` to the main domain: Cloudflare dashboard → your domain → **Rules** → **Redirect Rules** → template *Redirect from WWW to root* (301).
4. Recommended domain settings (Cloudflare dashboard → your domain):
   - **SSL/TLS** → mode **Full (strict)**; **Edge Certificates** → *Always Use HTTPS* **on**
   - **Speed** → enable *Early Hints*, *HTTP/3*, and *Brotli* if offered

### 4. Every change after that

Edit content → commit → push. Pull requests get a preview URL; merging to `master` deploys to production in about a minute. `.github/workflows/site.yml` also type-checks and builds every PR, so broken content never reaches `master`.

### Response headers

`public/_headers` adds security headers (HSTS, `nosniff`, frame protection, referrer and permissions policies) and long-term caching for fingerprinted assets in `/_astro/`.

### 5. Shut down v0 (after v1 is live)

Nothing in Google Cloud is removed automatically. Once the domain points to Pages and everything works, delete the Cloud Run service `portfolioservice`, the Artifact Registry repository `docker-portfolio-repository`, the Terraform state bucket `sj-portfolio-tf-state` and the GitHub secrets the old workflow used. Then pause or delete the Supabase project.

### Alternatives

- **Terraform**: the Pages project, custom domains and DNS can be managed with the Cloudflare Terraform provider (`cloudflare_pages_project`, `cloudflare_pages_domain`) if you want infrastructure as code again.
- **GitHub Actions deploy**: instead of Cloudflare's Git integration, build in Actions and upload with `cloudflare/wrangler-action` (needs a Cloudflare API token as a repository secret).

## Migrating from v0 (Django)

v0 was a Django app (PostgreSQL on Supabase, logos in a Supabase bucket) deployed to Cloud Run with Terraform. Its code was removed in v1.0.0 and is still available in the git history (any commit before the v1.0.0 release, e.g. `git show dc8f3f0:portfolio/web/models.py`). All v0 content from the Supabase backup was converted into `src/data/*.json`:

| v0 model (Django)        | v1 file                                   |
| ------------------------ | ----------------------------------------- |
| `Technology`             | `technologies.json` (+ `tech-categories.json`) |
| `Education`              | `education.json`                          |
| `Company`                | `issuers.json`                            |
| — (new in v1)            | `experience.json`                         |
| `Certification`          | `certifications.json`                     |
| `Category`               | `project-categories.json`                 |
| `Project`                | `projects.json`                           |
| Hard-coded hero / footer | `profile.json`                            |
| Supabase bucket icons    | `src/assets/icons/` (renamed to kebab-case) |

Once v1 is live, the old Cloud Run service, Artifact Registry repository, Terraform state bucket (`sj-portfolio-tf-state`) and Supabase project can be shut down. Removing the code does **not** delete any cloud resources.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| `Logo "x" not found in src/assets/icons` | Check the file name matches the `logo` value (without extension). |
| `... references unknown issuer/category` | The id must exist in `issuers.json` / `project-categories.json` / `tech-categories.json`. |
| Schema error after editing JSON | Read the message: it names the file, entry and field. Check commas and quotes. |
| New post not showing | It is probably `draft: true`, or `pubDate` is missing. |
| Types out of date in the editor | Run `npm run sync`. |
| `Profile photo "x.heic" is in a format browsers and Astro can't use` | Run the `npm run photo -- …` command shown in the error, then rebuild. |
| `Could not resolve '../assets/images/…'` | A file imports an image path directly. Use the `<Avatar />` component or `src/lib/avatar.ts` instead. |
| `sharp` errors on install | Delete `node_modules` and `package-lock.json`, then run `npm install` again. |

---

© Sajith Jeewantha · v1.0.0
