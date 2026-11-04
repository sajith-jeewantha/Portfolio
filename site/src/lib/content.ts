import type { ImageMetadata } from 'astro';
import { getCollection } from 'astro:content';
import profileJson from '../data/profile.json';
import siteJson from '../data/site.json';

export const profile = profileJson;
export const site = siteJson;

/* ------------------------------------------------------------------ */
/* Logos — every file in src/assets/icons, keyed by name w/o extension */
/* ------------------------------------------------------------------ */
const logoFiles = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/icons/*.{png,jpg,jpeg,webp,svg,avif}',
  { eager: true },
);

const logos = new Map<string, ImageMetadata>(
  Object.entries(logoFiles).map(([path, mod]) => [
    path.split('/').pop()!.replace(/\.[^.]+$/, ''),
    mod.default,
  ]),
);

/** Resolve a logo name (e.g. "spring-boot") to an optimisable image. Fails the build if missing. */
export function logo(name: string): ImageMetadata {
  const img = logos.get(name);
  if (!img) {
    throw new Error(
      `Logo "${name}" not found in src/assets/icons. Available: ${[...logos.keys()].join(', ')}`,
    );
  }
  return img;
}

/* ------------------------------------------------------------------ */
/* Collections                                                         */
/* ------------------------------------------------------------------ */
const byOrder = <T extends { data: { order?: number } }>(a: T, b: T) =>
  (a.data.order ?? 99) - (b.data.order ?? 99);

export const VERSE_TRANSLATION = 'Douay–Rheims';

export const verseThemes = [
  { id: 'love', label: 'Love', icon: 'heart' },
  { id: 'strength', label: 'Strength', icon: 'shield' },
  { id: 'relationship', label: 'Relationship', icon: 'handshake' },
] as const;

export async function getVersesByTheme() {
  const all = (await getCollection('verses', (v) => v.data.visible)).sort(byOrder);
  return verseThemes.map((t) => ({ ...t, verses: all.filter((v) => v.data.theme === t.id) }));
}

/** A single verse by id — fails the build if the id doesn't exist. */
export async function getVerse(id: string) {
  const v = (await getCollection('verses')).find((x) => x.id === id);
  if (!v) throw new Error(`Verse "${id}" not found in src/data/verses.json`);
  return v;
}

export async function getExperience() {
  return (await getCollection('experience', (e) => e.data.visible)).sort(
    (a, b) => (b.data.end === null ? 1 : 0) - (a.data.end === null ? 1 : 0) || b.data.start.localeCompare(a.data.start),
  );
}

export async function getEducation() {
  return (await getCollection('education', (e) => e.data.visible)).sort(byOrder);
}

export async function getCertifications() {
  const issuers = new Map((await getCollection('issuers')).map((i) => [i.id, i.data]));
  return (await getCollection('certifications', (c) => c.data.visible))
    .sort(byOrder)
    .map((c) => {
      const issuer = issuers.get(c.data.issuer);
      if (!issuer) throw new Error(`Certification "${c.id}" references unknown issuer "${c.data.issuer}"`);
      return { ...c, issuer };
    });
}

export async function getProjects() {
  const categories = await getCollection('projectCategories');
  const known = new Set(categories.map((c) => c.id));
  const projects = (await getCollection('projects', (p) => p.data.visible)).sort(byOrder);
  for (const p of projects)
    for (const c of p.data.categories)
      if (!known.has(c)) throw new Error(`Project "${p.id}" uses unknown category "${c}"`);
  // Only show filter chips for categories that actually have projects.
  const used = categories.filter((c) => projects.some((p) => p.data.categories.includes(c.id)));
  return { projects, categories: used };
}

export async function getStack() {
  const categories = (await getCollection('techCategories')).sort(byOrder);
  const techs = await getCollection('technologies', (t) => t.data.visible);
  const known = new Set(categories.map((c) => c.id));
  for (const t of techs)
    if (!known.has(t.data.category))
      throw new Error(`Technology "${t.id}" uses unknown category "${t.data.category}"`);
  return categories
    .map((c) => ({
      ...c,
      items: techs
        .filter((t) => t.data.category === c.id)
        .sort((a, b) => a.data.name.localeCompare(b.data.name)),
    }))
    .filter((c) => c.items.length > 0);
}

export async function getPosts() {
  return (await getCollection('blog', (p) => import.meta.env.DEV || !p.data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

/* ------------------------------------------------------------------ */
/* Formatting                                                          */
/* ------------------------------------------------------------------ */
export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2026-07" → "Jul 2026" */
export const formatMonth = (ym: string) => {
  const [y, m] = ym.split('-').map(Number);
  return `${MONTHS[m - 1]} ${y}`;
};

/** Issue date of a certification: "Oct 2026" or "2025" */
export const formatIssued = (year: number, month?: number) => (month ? `${MONTHS[month - 1]} ${year}` : `${year}`);

/** Duration like LinkedIn: "4 mos", "1 yr 2 mos" (inclusive of both months) */
export function duration(start: string, end: string | null, now = new Date()) {
  const [sy, sm] = start.split('-').map(Number);
  const [ey, em] = end ? end.split('-').map(Number) : [now.getFullYear(), now.getMonth() + 1];
  const total = Math.max(1, (ey - sy) * 12 + (em - sm) + 1);
  const y = Math.floor(total / 12);
  const m = total % 12;
  return [y && `${y} yr${y > 1 ? 's' : ''}`, m && `${m} mo${m > 1 ? 's' : ''}`].filter(Boolean).join(' ');
}

export function readingTime(markdown = '') {
  const words = markdown.replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}
