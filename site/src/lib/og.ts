/**
 * Social cards (og:image / twitter:image) for the blog and roadmaps, rendered
 * at build time: satori lays out the card and turns every glyph into an SVG
 * path, then sharp rasterises it to a 1200×630 PNG. Because the fonts are
 * embedded, cards look identical on any machine — no system fonts needed.
 *
 * Endpoints live in src/pages/og/; pages point at them with BaseLayout's
 * `ogImage` prop.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import { getIconData, iconToSVG } from '@iconify/utils';
import lucide from '@iconify-json/lucide/icons.json';
import type { IconifyJSON } from '@iconify/types';
import { avatarFile } from './avatar';
import { profile, site } from './content';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

/* ------------------------------------------------------------------ */
/* Palettes — the site's own tokens (global.css / roadmaps.css)        */
/* ------------------------------------------------------------------ */
const night = {
  bg: '#070816',
  ink: '#f4f2fb',
  text: '#c8c9df',
  muted: '#8f92b0',
  line: '#33376a',
  lapis: '#9197ff',
  amethyst: '#b79bff',
  gold: '#e8bb52',
};

const slate = {
  bg: '#171c26',
  ink: '#eceef3',
  text: '#cdd2dc',
  muted: '#9aa3b5',
  line: '#3b4558',
  lapis: '#9ea7ff',
  gold: '#e3bb63',
};

/** Track accents from the dark roadmap theme (all AA on the slate canvas). */
export const trackAccent: Record<string, string> = {
  foundations: '#e6b85c',
  'software-engineering': '#6cb6ff',
  'software-architecture': '#a9acff',
  'cloud-engineering': '#4fd1c5',
  'data-engineering': '#93b6dc',
  'ml-engineering': '#7bd88f',
  'deep-learning': '#c4a2ff',
  'inference-gpu': '#f08cd0',
  'ai-engineering': '#ff9b8a',
  'harness-engineering': '#f4a65b',
  'context-engineering': '#c9d96b',
  'ai-security-safety': '#ff8593',
};

/* ------------------------------------------------------------------ */
/* Assets — loaded once per build                                      */
/* ------------------------------------------------------------------ */
const fontFile = (pkg: string, file: string) =>
  readFileSync(join(process.cwd(), 'node_modules/@fontsource', pkg, 'files', file));

const fonts = [
  { name: 'Cormorant', data: fontFile('cormorant-garamond', 'cormorant-garamond-latin-600-normal.woff'), weight: 600 },
  { name: 'Cormorant', data: fontFile('cormorant-garamond', 'cormorant-garamond-latin-700-normal.woff'), weight: 700 },
  { name: 'Inter', data: fontFile('inter', 'inter-latin-400-normal.woff'), weight: 400 },
  { name: 'Inter', data: fontFile('inter', 'inter-latin-500-normal.woff'), weight: 500 },
  { name: 'Inter', data: fontFile('inter', 'inter-latin-600-normal.woff'), weight: 600 },
  { name: 'Mono', data: fontFile('jetbrains-mono', 'jetbrains-mono-latin-500-normal.woff'), weight: 500 },
] as { name: string; data: Buffer; weight: 400 | 500 | 600 | 700 }[];

const svgUri = (svg: string) => `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;

/** The site's favicon emblem (lancet window + rose). */
const emblem = svgUri(readFileSync(join(process.cwd(), 'public/favicon.svg'), 'utf8'));

/** Lucide icon as a data URI, stroked in the given colour. */
export function iconUri(name: string, color: string) {
  const data = getIconData(lucide as IconifyJSON, name);
  if (!data) throw new Error(`Lucide icon "${name}" not found`);
  const { attributes, body } = iconToSVG(data);
  return svgUri(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${attributes.viewBox}">${body.replaceAll('currentColor', color)}</svg>`,
  );
}

let avatarCache: Promise<string> | undefined;
/** Square crop of the profile photo around its focus point (profile.avatarPosition), as a data URI. */
function avatarUri() {
  avatarCache ??= (async () => {
    const img = sharp(avatarFile);
    const { width = 0, height = 0 } = await img.metadata();
    const [fx, fy] = ((profile as { avatarPosition?: string }).avatarPosition ?? '50% 50%')
      .split(/\s+/)
      .map((v) => parseFloat(v) / 100);
    const side = Math.min(width, height);
    const clamp = (v: number, max: number) => Math.max(0, Math.min(Math.round(v), max));
    const left = clamp(fx * width - side / 2, width - side);
    const top = clamp(fy * height - side / 2, height - side);
    const jpg = await img.extract({ left, top, width: side, height: side }).resize(160, 160).jpeg({ quality: 85 }).toBuffer();
    return `data:image/jpeg;base64,${jpg.toString('base64')}`;
  })();
  return avatarCache;
}

/* ------------------------------------------------------------------ */
/* Tiny element builder (satori takes React-like objects)              */
/* ------------------------------------------------------------------ */
type Style = Record<string, string | number>;
type Child = Node | string | false | null | undefined;
interface Node {
  type: string;
  props: { style?: Style; children?: Child | Child[]; [k: string]: unknown };
}

const div = (style: Style, ...children: Child[]): Node => ({
  type: 'div',
  props: { style: { display: 'flex', ...style }, children: children.filter((c) => c !== false && c != null) },
});
const img = (src: string, size: number, style: Style = {}): Node => ({
  type: 'img',
  props: { src, width: size, height: size, style },
});

/** rgba() from #rrggbb so accents can be tinted. */
export const alpha = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};

/** Shorten at a word boundary so long summaries never overflow the card. */
export function clip(text: string, max: number) {
  const plain = text.replace(/\*\*?|`/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  if (plain.length <= max) return plain;
  return plain.slice(0, plain.lastIndexOf(' ', max)).replace(/[\s,;:—-]+$/, '') + '…';
}

/** Title size that keeps long titles to about three lines. */
const titleSize = (t: string) => (t.length <= 28 ? 88 : t.length <= 44 ? 76 : t.length <= 64 ? 66 : 56);

/* ------------------------------------------------------------------ */
/* Shared frame                                                        */
/* ------------------------------------------------------------------ */
interface FrameOptions {
  palette: typeof night | typeof slate;
  /** Glow colours, top-right then bottom-left. */
  glow: [string, string];
  /** Colour of the left rail and the eyebrow label. */
  accent: string;
  eyebrow: string;
  /** Right side of the header row (e.g. date). */
  meta?: string;
  /** Path shown in the footer, e.g. "/blog". */
  path: string;
  body: Node;
}

async function frame({ palette: p, glow, accent, eyebrow, meta, path, body }: FrameOptions): Promise<Node> {
  const host = new URL(site.url).host;
  return div(
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      backgroundColor: p.bg,
      backgroundImage: `radial-gradient(circle at 92% 0%, ${alpha(glow[0], 0.28)} 0%, transparent 46%), radial-gradient(circle at 0% 100%, ${alpha(glow[1], 0.2)} 0%, transparent 42%)`,
      fontFamily: 'Inter',
      color: p.text,
      position: 'relative',
    },
    // accent rail
    div({ position: 'absolute', left: 0, top: 0, bottom: 0, width: 12, backgroundColor: accent }),
    // hairline frame, like the site's gilded borders
    div({ position: 'absolute', left: 36, top: 24, right: 24, bottom: 24, border: `1px solid ${alpha(p.gold, 0.22)}`, borderRadius: 18 }),
    div(
      // explicit size + border-box: satori sizes boxes content-box by default
      {
        position: 'absolute',
        left: 0,
        top: 0,
        width: OG_WIDTH,
        height: OG_HEIGHT,
        boxSizing: 'border-box',
        flexDirection: 'column',
        padding: '56px 72px 50px 84px',
      },
      // header
      div(
        { alignItems: 'center', justifyContent: 'space-between' },
        div(
          { alignItems: 'center', gap: 18 },
          img(emblem, 46),
          div({ fontFamily: 'Mono', fontSize: 22, letterSpacing: 3, color: accent, textTransform: 'uppercase' }, eyebrow),
        ),
        meta && div({ fontFamily: 'Mono', fontSize: 21, color: p.muted }, meta),
      ),
      // body
      div({ flexDirection: 'column', flexGrow: 1, flexShrink: 1, minHeight: 0, justifyContent: 'center' }, body),
      // footer
      div(
        { alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${p.line}`, paddingTop: 26, marginTop: 18 },
        div(
          { alignItems: 'center', gap: 18 },
          img(await avatarUri(), 60, { borderRadius: 999, border: `2px solid ${p.gold}` }),
          div(
            { flexDirection: 'column' },
            div({ fontSize: 26, fontWeight: 600, color: p.ink }, profile.name),
            div({ fontSize: 19, color: p.muted }, `${profile.role} · ${profile.location}`),
          ),
        ),
        div({ fontFamily: 'Mono', fontSize: 22, color: p.muted }, host, div({ color: accent }, path)),
      ),
    ),
  );
}

export async function renderPng(node: Node) {
  const svg = await satori(node as unknown as Parameters<typeof satori>[0], { width: OG_WIDTH, height: OG_HEIGHT, fonts });
  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
}

/* ------------------------------------------------------------------ */
/* Cards                                                               */
/* ------------------------------------------------------------------ */
const chip = (text: string, color: string) =>
  div(
    {
      fontFamily: 'Mono',
      fontSize: 20,
      color,
      border: `1px solid ${alpha(color, 0.45)}`,
      backgroundColor: alpha(color, 0.1),
      borderRadius: 999,
      padding: '6px 16px',
    },
    text,
  );

export async function blogPostCard(post: { title: string; description: string; date: string; readingTime: string; tags: string[] }) {
  const p = night;
  return renderPng(
    await frame({
      palette: p,
      glow: [p.lapis, p.amethyst],
      accent: p.gold,
      eyebrow: 'Blog',
      meta: `${post.date} · ${post.readingTime}`,
      path: '/blog',
      body: div(
        { flexDirection: 'column', gap: 22 },
        div(
          { fontFamily: 'Cormorant', fontWeight: 700, fontSize: titleSize(post.title), lineHeight: 1.02, color: p.ink, letterSpacing: -0.5 },
          post.title,
        ),
        div({ fontSize: 27, lineHeight: 1.4, color: p.text, maxWidth: 980 }, clip(post.description, 150)),
        post.tags.length > 0 && div({ gap: 12, marginTop: 6 }, ...post.tags.slice(0, 4).map((t) => chip(`#${t}`, p.gold))),
      ),
    }),
  );
}

export async function blogIndexCard(latest: { title: string; date: string }[], count: number) {
  const p = night;
  return renderPng(
    await frame({
      palette: p,
      glow: [p.lapis, p.amethyst],
      accent: p.gold,
      eyebrow: 'Blog',
      meta: `${count} ${count === 1 ? 'post' : 'posts'}`,
      path: '/blog',
      body: div(
        { gap: 56, alignItems: 'center' },
        div(
          { flexDirection: 'column', gap: 18, width: 560 },
          div({ fontFamily: 'Cormorant', fontWeight: 700, fontSize: 92, lineHeight: 1, color: p.ink }, 'Notes & articles'),
          div({ fontSize: 27, lineHeight: 1.4 }, 'Software engineering, cloud, AI and machine learning — what I build and what I learn.'),
        ),
        div(
          { flexDirection: 'column', gap: 14, flexGrow: 1, flexShrink: 1 },
          div({ fontFamily: 'Mono', fontSize: 18, letterSpacing: 2, color: p.muted, textTransform: 'uppercase' }, 'Latest'),
          ...latest.slice(0, 3).map((x) =>
            div(
              { flexDirection: 'column', gap: 6, borderLeft: `3px solid ${p.gold}`, padding: '6px 0 6px 18px', backgroundColor: alpha(p.lapis, 0.06) },
              div({ fontFamily: 'Cormorant', fontWeight: 600, fontSize: 30, lineHeight: 1.1, color: p.ink }, clip(x.title, 60)),
              div({ fontFamily: 'Mono', fontSize: 17, color: p.muted }, x.date),
            ),
          ),
        ),
      ),
    }),
  );
}

export async function roadmapCard(r: {
  id: string;
  title: string;
  summary: string;
  icon: string;
  tier: string;
  stages: { level: string; hours: number }[];
}) {
  const p = slate;
  const accent = trackAccent[r.id] ?? p.lapis;
  const total = r.stages.reduce((n, s) => n + s.hours, 0);
  // long titles get a smaller face; ones that still wrap get a one-line summary so the stage row fits
  const size = r.title.length > 26 ? 60 : titleSize(r.title) - 6;
  const long = r.title.length > 36;
  return renderPng(
    await frame({
      palette: p,
      glow: [accent, p.lapis],
      accent,
      eyebrow: `Roadmap · ${r.tier}`,
      meta: `${total} h · 4 stages`,
      path: '/roadmaps',
      body: div(
        { flexDirection: 'column', gap: 20 },
        div(
          { alignItems: 'center', gap: 26 },
          div(
            {
              width: 92,
              height: 92,
              flexShrink: 0,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 22,
              backgroundColor: alpha(accent, 0.14),
              border: `1px solid ${alpha(accent, 0.5)}`,
            },
            img(iconUri(r.icon, accent), 52),
          ),
          div(
            { fontFamily: 'Cormorant', fontWeight: 700, fontSize: size, lineHeight: 1.02, color: p.ink, letterSpacing: -0.5 },
            r.title,
          ),
        ),
        div({ fontSize: 25, lineHeight: 1.42, color: p.text }, clip(r.summary, long ? 80 : 150)),
        // stage path: Beginner → Expert, each bar a little brighter
        div(
          { gap: 14, marginTop: 8 },
          ...r.stages.map((s, i) =>
            div(
              {
                flexDirection: 'column',
                flexGrow: 1,
                flexBasis: 0,
                gap: 4,
                padding: '14px 18px',
                borderRadius: 12,
                backgroundColor: alpha(accent, 0.06 + i * 0.03),
                borderTop: `4px solid ${alpha(accent, 0.4 + i * 0.2)}`,
              },
              div({ fontFamily: 'Mono', fontSize: 16, color: p.muted }, `0${i + 1}`),
              div({ fontSize: 22, fontWeight: 600, color: p.ink }, s.level),
              div({ fontFamily: 'Mono', fontSize: 18, color: accent }, `${s.hours} h`),
            ),
          ),
        ),
      ),
    }),
  );
}

export async function roadmapsIndexCard(tracks: { id: string; short: string; icon: string }[]) {
  const p = slate;
  return renderPng(
    await frame({
      palette: p,
      glow: [p.lapis, trackAccent['ai-engineering']],
      accent: p.gold,
      eyebrow: 'Roadmaps · 2027',
      meta: `${tracks.length} tracks`,
      path: '/roadmaps',
      body: div(
        { flexDirection: 'column', gap: 26 },
        div(
          { flexDirection: 'column', gap: 12 },
          div({ fontFamily: 'Cormorant', fontWeight: 700, fontSize: 76, lineHeight: 1, color: p.ink }, 'Career roadmaps for 2027'),
          div({ fontSize: 25, color: p.text }, 'Beginner to Expert · staged projects · time estimates · verified references'),
        ),
        div(
          { flexWrap: 'wrap', gap: 12 },
          ...tracks.map((t) => {
            const c = trackAccent[t.id] ?? p.lapis;
            return div(
              {
                alignItems: 'center',
                gap: 12,
                width: 252, // (1044 content width - 3 × 12 gap) / 4
                boxSizing: 'border-box',
                padding: '11px 16px',
                borderRadius: 12,
                backgroundColor: alpha(c, 0.1),
                border: `1px solid ${alpha(c, 0.42)}`,
              },
              img(iconUri(t.icon, c), 26),
              div({ fontSize: 21, fontWeight: 500, color: p.ink }, t.short),
            );
          }),
        ),
      ),
    }),
  );
}
