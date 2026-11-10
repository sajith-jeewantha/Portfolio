/** Social card for each roadmap track → /og/roadmaps/<id>.png */
import type { APIRoute, GetStaticPaths } from 'astro';
import { roadmapCard } from '../../../lib/og';
import { getRoadmaps, tierLabel } from '../../../lib/roadmaps';

export const getStaticPaths = (async () =>
  (await getRoadmaps()).map((r) => ({ params: { slug: r.id }, props: { r } }))) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => {
  const { r } = props as Awaited<ReturnType<typeof getStaticPaths>>[number]['props'];
  const { title, summary, icon, tier, stages } = r.data;
  return roadmapCard({ id: r.id, title, summary, icon, tier: tierLabel[tier], stages });
};
