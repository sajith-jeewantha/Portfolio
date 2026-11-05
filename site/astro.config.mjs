// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { readdirSync, readFileSync } from 'node:fs';

const SITE = 'https://sajithjeewantha.com';
const BLOG_DIR = new URL('./src/content/blog/', import.meta.url);

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
    const field = (key) => fm.match(new RegExp(`^${key}:\\s*['"]?([^'"\\r\\n]+)`, 'm'))?.[1].trim();
    if (field('draft') === 'true') continue;
    const date = new Date(field('updatedDate') ?? field('pubDate') ?? '');
    if (!Number.isNaN(date.getTime())) dates.set(`${SITE}/blog/${name.replace(/\.mdx?$/, '')}/`, date.toISOString());
  }
  // The blog index changes whenever a post is added or updated.
  const newest = [...dates.values()].sort().at(-1);
  if (newest) dates.set(`${SITE}/blog/`, newest);
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
    shikiConfig: {
      // Light/dark code themes — switched by the site theme in global.css
      themes: { light: 'github-light', dark: 'github-dark-dimmed' },
      wrap: true,
    },
  },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
