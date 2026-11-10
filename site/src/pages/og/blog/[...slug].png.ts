/** Social card for each blog post → /og/blog/<slug>.png */
import type { APIRoute, GetStaticPaths } from 'astro';
import { blogPostCard } from '../../../lib/og';
import { formatDate, getPosts, readingTime } from '../../../lib/content';

export const getStaticPaths = (async () =>
  (await getPosts()).map((post) => ({ params: { slug: post.id }, props: { post } }))) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => {
  const { post } = props as Awaited<ReturnType<typeof getStaticPaths>>[number]['props'];
  const { title, description, pubDate, tags } = post.data;
  return blogPostCard({ title, description, date: formatDate(pubDate), readingTime: readingTime(post.body), tags });
};
