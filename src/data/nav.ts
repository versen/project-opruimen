// Single source of truth for site navigation. The header shows only the six
// sections; their children feed the mobile menu, each section's sub-navigation,
// the hub pages and the footer sitemap. Add a page here once and it appears
// everywhere it should — the header itself never grows.

export interface NavLink {
  label: string;
  href: string;
  blurb?: string;
}

export interface NavSection extends NavLink {
  children: NavLink[];
}

// Active working groups, read from the pages themselves so a new group only
// needs its .mdx file (with `group: true`) to show up in every menu.
interface GroupFrontmatter { title: string; description?: string; group?: boolean; archived?: boolean; order?: number }
const groupPages = import.meta.glob<GroupFrontmatter>('/src/content/pages/working-groups/*.mdx', { eager: true, import: 'frontmatter' });
const groupLinks: NavLink[] = Object.entries(groupPages)
  .filter(([, fm]) => fm.group && !fm.archived)
  .sort(([, a], [, b]) => (a.order ?? 0) - (b.order ?? 0))
  .map(([path, fm]) => ({
    label: fm.title,
    href: `/working-groups/${path.split('/').pop()!.replace(/\.mdx$/, '')}/`,
    blurb: fm.description,
  }));

export const sections: NavSection[] = [
  {
    label: 'News',
    href: '/news/',
    children: [
      { label: 'Latest news', href: '/news/', blurb: 'What is happening in Dutch software engineering.' },
      { label: 'News archive', href: '/news/archive/', blurb: 'Every item since 2016, by year.' },
      { label: 'Suggest news', href: '/resources/press/', blurb: 'Send us an item for the website and newsletter.' },
    ],
  },
  {
    label: 'Events',
    href: '/events/',
    children: [
      { label: 'Upcoming & past events', href: '/events/', blurb: 'Seminars, workshops and tracks we (co-)organize.' },
      { label: 'SEN Symposium', href: 'https://www.sen-symposium.nl/', blurb: 'Our yearly national symposium.' },
      { label: 'Community Events group', href: '/working-groups/community-events/', blurb: 'The people behind our events.' },
    ],
  },
  {
    label: 'Awards',
    href: '/awards/',
    children: [
      { label: 'Thesis awards', href: '/awards/thesis/', blurb: 'Yearly PhD and MSc thesis awards: criteria, jury, procedure.' },
      { label: 'Call for thesis submissions', href: '/awards/call/', blurb: 'Deadline and how to nominate a thesis.' },
      { label: 'Past thesis winners', href: '/awards/winners/', blurb: 'All PhD and MSc winners since 2018.' },
      { label: 'Honorary fellows', href: '/awards/honorary-fellows/', blurb: 'Emeriti who shaped software engineering in the Netherlands.' },
      { label: 'External awards', href: '/awards/external/', blurb: 'Our policy on prizes awarded by other organizations.' },
    ],
  },
  {
    label: 'Resources',
    href: '/resources/',
    children: [
      { label: 'Proposal support', href: '/resources/proposal-support/', blurb: 'Funded NWO/ERC proposals their authors will share.' },
      { label: 'Funding for initiatives', href: '/working-groups/funding/', blurb: 'Request VERSEN money for an event or initiative.' },
      { label: 'MSc thesis collaborations', href: '/resources/msc-thesis-collaborations/', blurb: 'For companies: host a thesis student.' },
      { label: 'Education', href: '/resources/education/', blurb: 'Our work on SE curricula and life-long learning.' },
      { label: 'Press & suggest news', href: '/resources/press/', blurb: 'Reach Dutch SE professors, or send us news.' },
      { label: 'Logos', href: '/resources/logos/', blurb: 'The VERSEN logo in SVG, PNG and PDF.' },
    ],
  },
  {
    label: 'Working Groups',
    href: '/working-groups/',
    children: [
      { label: 'All groups & how to join', href: '/working-groups/', blurb: 'What each group does, who leads it, and how to take part.' },
      ...groupLinks,
    ],
  },
  {
    label: 'About',
    href: '/about/',
    children: [
      { label: 'About VERSEN', href: '/about/', blurb: 'Mission, organization, research groups.' },
      { label: 'Manifesto', href: '/about/manifesto/', blurb: 'Our vision for software research and education.' },
      { label: 'Board', href: '/about/board/', blurb: 'Executive board and board members.' },
      { label: 'Members', href: '/about/members/', blurb: 'Directory of listed members.' },
      { label: 'Honorary fellows', href: '/awards/honorary-fellows/', blurb: 'Emeriti who shaped the field.' },
      { label: 'Advisory board', href: '/about/advisory-board/', blurb: 'Industry representatives.' },
      { label: 'Partners & sponsors', href: '/about/partners-and-sponsors/', blurb: 'Who we work with and who funds us.' },
      { label: 'Code of conduct', href: '/about/code-of-conduct/', blurb: 'Our commitments, and how to report.' },
      { label: 'Annual reports', href: '/about/annual-reports/', blurb: 'Yearly reports since 2022.' },
      { label: 'Contact', href: '/contact/', blurb: 'Who to write to, for what.' },
    ],
  },
];

export const join: NavLink = { label: 'Join', href: '/join/' };

/** A request path without the deployment base (e.g. "/project-opruimen"). */
export function sitePath(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const p = base && pathname.startsWith(base) ? pathname.slice(base.length) || '/' : pathname;
  return p.endsWith('/') ? p : p + '/';
}

/** The section a path belongs to, for highlighting and sub-navigation. */
export function sectionFor(path: string): NavSection | undefined {
  const p = sitePath(path);
  if (p.startsWith('/contact/')) return sections.find((s) => s.label === 'About');
  if (p.startsWith('/in-memoriam/')) return sections.find((s) => s.label === 'News');
  return sections.find((s) => p.startsWith(s.href));
}
