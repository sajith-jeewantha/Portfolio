import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, profile } from '../lib/content';

export async function GET(context: APIContext) {
  const posts = (await getPosts()).filter((p) => !p.data.draft);
  return rss({
    title: `${profile.name} — Blog`,
    description: 'Notes on software engineering, cloud, AI and machine learning.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      categories: post.data.tags,
      link: `/blog/${post.id}/`,
    })),
  });
}
