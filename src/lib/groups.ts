import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { executive } from '~/data/board';

export type Group = CollectionEntry<'pages'>;
export type Member = Group['data']['members'][number];

export const groupUrl = (g: Group) => `/${g.id}/`;

/** Chair, co-chair, general chair… but not vice-chair. */
export const isChair = (m: Member) => !!m.role && /\bchair\b/i.test(m.role) && !/vice/i.test(m.role);

/** Members of a group, chairs first. The Executive Board's come from the board data. */
export function membersOf(g: Group): Member[] {
  const list = g.id === 'working-groups/executive-board' ? executive : g.data.members;
  return [...list].sort((a, b) => Number(isChair(b)) - Number(isChair(a)));
}

export const chairsOf = (g: Group) => membersOf(g).filter(isChair);

/** Working groups in their listed order; archived ones only when asked. */
export async function groups(archived = false): Promise<Group[]> {
  const all = await getCollection('pages', (p) => p.data.group && p.data.archived === archived);
  return all.sort((a, b) => a.data.order - b.data.order);
}

export const group = (slug: string) => getEntry('pages', `working-groups/${slug}`);
