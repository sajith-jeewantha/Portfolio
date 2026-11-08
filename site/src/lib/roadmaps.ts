import { getCollection, type CollectionEntry } from 'astro:content';

export type Roadmap = CollectionEntry<'roadmaps'>;
export type Stage = Roadmap['data']['stages'][number];

import { DEFAULT_WEEKLY_HOURS } from './roadmap-constants';

export { DEFAULT_WEEKLY_HOURS, WEEKLY_HOUR_OPTIONS } from './roadmap-constants';

export async function getRoadmaps() {
  return (await getCollection('roadmaps')).sort((a, b) => a.data.order - b.data.order);
}

/** CSS custom property holding a track's accent colour (defined in roadmaps.css). */
export const accentVar = (id: string) => `var(--t-${id})`;

export const tierLabel = {
  foundation: 'Foundation',
  core: 'Core',
  specialisation: 'Specialisation',
} as const;

export const totalHours = (r: Roadmap) => r.data.stages.reduce((n, s) => n + s.hours, 0);

export const weeks = (hours: number, perWeek = DEFAULT_WEEKLY_HOURS) => Math.max(1, Math.round(hours / perWeek));

/** Every checklist item in a stage: concepts, projects and readiness signals. */
export function stageItems(s: Stage) {
  return [
    ...s.concepts.map((text) => ({ kind: 'concept', text })),
    ...s.projects.map((p) => ({ kind: 'project', text: p.title })),
    ...s.signals.map((text) => ({ kind: 'signal', text })),
  ];
}

/**
 * Stable checklist key from the item text (djb2), so saved progress survives
 * reordering items. Editing an item's wording resets just that item.
 */
export function checkKey(track: string, level: string, kind: string, text: string) {
  let h = 5381;
  for (const ch of `${kind}:${text}`) h = ((h << 5) + h + ch.charCodeAt(0)) >>> 0;
  return `${track}/${level.toLowerCase()}/${h.toString(36)}`;
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Tiny inline Markdown for frontmatter strings: [links](url), `code`, **bold**, *em*.
 * Input is escaped first, so only these constructs produce HTML.
 */
export function inline(md: string) {
  return escapeHtml(md)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\(((?:https?:\/\/|\/)[^)\s]+)\)/g, (_, text, url) => {
      const external = url.startsWith('http');
      return `<a href="${url}"${external ? ' rel="noopener"' : ''}>${text}</a>`;
    });
}

/** Columns of the hub's overview diagram (left → right = foundation → specialisation). */
export const overviewLayers: string[][] = [
  ['foundations', 'software-engineering'],
  ['software-architecture', 'cloud-engineering', 'data-engineering', 'ml-engineering'],
  ['deep-learning', 'ai-engineering'],
  ['inference-gpu', 'context-engineering'],
  ['harness-engineering', 'ai-security-safety'],
];

/** Main dependency edges drawn on the hub diagram (from → to, always left → right). */
export const overviewEdges: [string, string][] = [
  ['software-engineering', 'software-architecture'],
  ['software-engineering', 'cloud-engineering'],
  ['software-engineering', 'data-engineering'],
  ['foundations', 'ml-engineering'],
  ['data-engineering', 'deep-learning'],
  ['foundations', 'deep-learning'],
  ['ml-engineering', 'deep-learning'],
  ['software-architecture', 'ai-engineering'],
  ['cloud-engineering', 'ai-engineering'],
  ['ml-engineering', 'ai-engineering'],
  ['deep-learning', 'inference-gpu'],
  ['cloud-engineering', 'inference-gpu'],
  ['ai-engineering', 'context-engineering'],
  ['context-engineering', 'harness-engineering'],
  ['ai-engineering', 'ai-security-safety'],
  ['cloud-engineering', 'ai-security-safety'],
];
