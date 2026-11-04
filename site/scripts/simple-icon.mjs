#!/usr/bin/env node
/**
 * Save a brand logo from Simple Icons (https://simpleicons.org) into src/assets/icons,
 * coloured with the brand's official colour.
 *
 *   npm run icon -- <simple-icons-slug> [file-name]
 *   npm run icon -- pytorch
 *   npm run icon -- nodedotjs nodejs
 *
 * Find slugs at https://simpleicons.org (the slug is shown on each icon).
 */
import * as icons from 'simple-icons';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const [slug, name = slug] = process.argv.slice(2);
if (!slug) {
  console.error('Usage: npm run icon -- <simple-icons-slug> [file-name]');
  process.exit(1);
}

const key = 'si' + slug.charAt(0).toUpperCase() + slug.slice(1);
const icon = icons[key];
if (!icon) {
  console.error(`"${slug}" is not in Simple Icons. Use a PNG/SVG from the brand's site instead.`);
  process.exit(1);
}

const out = fileURLToPath(new URL(`../src/assets/icons/${name}.svg`, import.meta.url));
writeFileSync(out, icon.svg.replace('<svg ', `<svg width="256" height="256" fill="#${icon.hex}" `));
console.log(`Saved ${icon.title} → src/assets/icons/${name}.svg  (use "logo": "${name}")`);
