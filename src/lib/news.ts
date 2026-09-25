import { getCollection, type CollectionEntry } from 'astro:content';

export type News = CollectionEntry<'news'>;

/** All news, newest first. */
export async function allNews(): Promise<News[]> {
  const items = await getCollection('news');
  return items.sort((a, b) => b.data.date.getTime() - a.data.date.getTime() || b.id.localeCompare(a.id));
}

export const newsUrl = (item: News) => `/news/${item.id}/`;

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

/** Plain-text teaser from a markdown body. */
export function excerpt(md: string, max = 220): string {
  const text = md
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/[*_`#>|]+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > max ? text.slice(0, max).replace(/\s+\S*$/, '') + '…' : text;
}
