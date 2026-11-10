/** Social card for the blog index → /og/blog.png */
import type { APIRoute } from 'astro';
import { blogIndexCard } from '../../lib/og';
import { formatDate, getPosts } from '../../lib/content';

export const GET: APIRoute = async () => {
  const posts = await getPosts();
  return blogIndexCard(
    posts.map((p) => ({ title: p.data.title, date: formatDate(p.data.pubDate) })),
    posts.length,
  );
};
