---
title: 'Portfolio v1.0.0 — from Django to a static Astro site'
description: 'Why I rebuilt my portfolio as a static site, how the content is stored as JSON and Markdown, and what changed in the design.'
pubDate: 2026-11-04
tags: ['astro', 'architecture', 'devops']
draft: false
---

My first portfolio was a Django application: a PostgreSQL database on Supabase, logos in a Supabase storage bucket, a container on Google Cloud Run and Terraform running from GitHub Actions. It worked well, and building it taught me a lot about infrastructure.

But a portfolio is mostly **read-only content that changes a few times a month**. For v1.0.0 I asked a simple question: _what is the least infrastructure that does this job well?_

## The new architecture

The site is now built with [Astro](https://astro.build) and Tailwind CSS, and compiled to plain HTML at build time.

| Before (v0)                       | Now (v1.0.0)                              |
| --------------------------------- | ----------------------------------------- |
| Django + Gunicorn on Cloud Run    | Static HTML on a CDN                      |
| PostgreSQL on Supabase            | JSON files in Git                         |
| Logos in a Supabase bucket        | Images in the repo, optimised at build    |
| Django admin dashboard            | Edit JSON / Markdown, commit, deploy      |

## Content as data

Every section of the home page is a JSON file in `src/data/`, and each one is validated by a schema at build time:

```json
{
  "id": "docker",
  "name": "Docker",
  "category": "devops",
  "logo": "docker",
  "visible": true
}
```

If I mistype a category or reference a logo that doesn't exist, the **build fails** — so a mistake never reaches the live site. Blog posts like this one are Markdown files in `src/content/blog/`.

## Design

The new look blends a modern AI / engineering aesthetic with subtle cathedral touches: stained-glass colours, a rose window whose tracery is drawn as a neural network, and pointed-arch frames. It supports light, dark and system themes.

> Simple systems are easier to trust — and easier to keep running.

## What's next

- More write-ups of my projects, starting with the API Shield Platform
- Notes from my MPhil research on intelligent systems
