import type { APIRoute } from 'astro';
import { allNews, excerpt, newsUrl } from '~/lib/news';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const GET: APIRoute = async ({ site }) => {
  const items = (await allNews()).slice(0, 30);
  const base = site ?? new URL('https://www.versen.nl');
  const body = items
    .map((n) => {
      const link = new URL(newsUrl(n), base).href;
      return `<item><title>${esc(n.data.title)}</title><link>${link}</link><guid>${link}</guid><pubDate>${n.data.date.toUTCString()}</pubDate><description>${esc(excerpt(n.body ?? '', 400))}</description></item>`;
    })
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>VERSEN news</title><link>${base.href}</link><description>News from the Dutch software engineering community</description>${body}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
