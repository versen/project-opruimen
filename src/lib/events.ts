import { upcoming, type EventItem } from '~/data/events';
import { allNews } from '~/lib/news';

/**
 * The single definition of "upcoming" for the whole site: events in
 * `src/data/events.ts` plus events announced in news items (their `event`
 * front matter) that have not ended at build time, soonest first.
 */
export async function upcomingEvents(): Promise<EventItem[]> {
  const today = new Date().toISOString().slice(0, 10);
  const fromNews: EventItem[] = (await allNews())
    .filter((n) => n.data.event)
    .map((n) => {
      const e = n.data.event!;
      const date = e.date.toISOString().slice(0, 10);
      return { title: e.title, year: Number(date.slice(0, 4)), date, end: e.end?.toISOString().slice(0, 10), place: e.place, href: e.href ?? `/news/${n.id}/`, kind: 'Community' };
    });
  return [...upcoming, ...fromNews]
    .filter((e) => !e.date || (e.end ?? e.date) >= today)
    .sort((a, b) => (a.date ?? '9999').localeCompare(b.date ?? '9999'));
}

export const formatEventDate = (iso?: string) =>
  iso ? new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }) : undefined;
