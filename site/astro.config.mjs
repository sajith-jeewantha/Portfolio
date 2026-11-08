// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { readdirSync, readFileSync } from 'node:fs';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { unified } from '@astrojs/markdown-remark';

const SITE = 'https://sajithjeewantha.com';
const BLOG_DIR = new URL('./src/content/blog/', import.meta.url);
const ROADMAP_DIR = new URL('./src/content/roadmaps/', import.meta.url);

/**
 * Sitemap <lastmod> for each blog post: `updatedDate`, else `pubDate`, read
 * from frontmatter. Google uses <lastmod> to decide what to re-crawl, so it
 * is only set where the date is accurate. Pages without one are left out.
 */
function blogLastmod() {
  /** @type {Map<string, string>} */
  const dates = new Map();
  for (const name of readdirSync(BLOG_DIR)) {
    if (!/\.mdx?$/.test(name)) continue;
    const fm = readFileSync(new URL(name, BLOG_DIR), 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
    const field = (/** @type {string} */ key) => fm.match(new RegExp(`^${key}:\\s*['"]?([^'"\\r\\n]+)`, 'm'))?.[1].trim();
    if (field('draft') === 'true') continue;
    const date = new Date(field('updatedDate') ?? field('pubDate') ?? '');
    if (!Number.isNaN(date.getTime())) dates.set(`${SITE}/blog/${name.replace(/\.mdx?$/, '')}/`, date.toISOString());
  }
  // The blog index changes whenever a post is added or updated.
  const newest = [...dates.values()].sort().at(-1);
  if (newest) dates.set(`${SITE}/blog/`, newest);

  // Roadmaps: each track carries an `updated` date; the hub takes the newest.
  for (const name of readdirSync(ROADMAP_DIR)) {
    if (!name.endsWith('.md')) continue;
    const fm = readFileSync(new URL(name, ROADMAP_DIR), 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
    const date = new Date(fm.match(/^updated:\s*['"]?([^'"\r\n]+)/m)?.[1].trim() ?? '');
    if (!Number.isNaN(date.getTime())) dates.set(`${SITE}/roadmaps/${name.replace(/\.md$/, '')}/`, date.toISOString());
  }
  const newestRoadmap = [...dates.entries()].filter(([u]) => u.includes('/roadmaps/')).map(([, d]) => d).sort().at(-1);
  if (newestRoadmap) dates.set(`${SITE}/roadmaps/`, newestRoadmap);
  return dates;
}
const lastmod = blogLastmod();

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: SITE,
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/design'),
      serialize: (item) => {
        const date = lastmod.get(item.url);
        return date ? { ...item, lastmod: date } : item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    // Math ($…$ and $$…$$) is rendered to static HTML by KaTeX at build time.
    // remark/rehype plugins need the unified processor (the default one takes none).
    processor: unified({ remarkPlugins: [remarkMath], rehypePlugins: [[rehypeKatex, { strict: false }]] }),
    // Mermaid fences are left as plain <pre> and drawn in the browser (roadmaps).
    syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid', 'math'] },
    shikiConfig: {
      // Light/dark code themes — switched by the site theme in global.css
      themes: { light: 'github-light', dark: 'github-dark-dimmed' },
      wrap: true,
    },
  },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
