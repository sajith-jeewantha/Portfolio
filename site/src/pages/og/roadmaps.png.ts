/** Social card for the roadmaps hub → /og/roadmaps.png */
import type { APIRoute } from 'astro';
import { roadmapsIndexCard } from '../../lib/og';
import { getRoadmaps } from '../../lib/roadmaps';

export const GET: APIRoute = async () =>
  roadmapsIndexCard((await getRoadmaps()).map((r) => ({ id: r.id, short: r.data.short, icon: r.data.icon })));
