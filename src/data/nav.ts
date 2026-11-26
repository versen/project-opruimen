// Single source of truth for site navigation. The header shows only the seven
// sections; their children feed the mobile menu, each section's sub-navigation,
// the hub pages and the footer sitemap. Add a page here once and it appears
// everywhere it should — the header itself never grows.

export interface NavLink {
  label: string;
  href: string;
  blurb?: string;
  /** Optional heading in the section's sidebar; set on the first link of a group. */
  group?: string;
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

// External pages that several sections link to.
export const links = {
  newsletters: 'https://us7.campaign-archive.com/home/?u=e6afd6c1e7c0289f4566d4fe5&id=5228435632',
  linkedin: 'https://www.linkedin.com/company/versennl',
  sria: 'https://doi.org/10.5281/zenodo.22685531',
};

export const sections: NavSection[] = [
  {
    label: 'About',
    href: '/about/',
    children: [
      { label: 'About VERSEN', href: '/about/', blurb: 'Our mission, and where to find what.', group: 'The association' },
      { label: 'Organization', href: '/about/organization/', blurb: 'How VERSEN is organized, with the statutes and procedures.' },
      { label: 'Sponsors & partners', href: '/about/partners-and-sponsors/', blurb: 'Who funds us and who we work with.' },
      { label: 'Code of conduct', href: '/about/code-of-conduct/', blurb: 'Our commitments, and how to report.' },
      { label: 'Board', href: '/about/board/', blurb: 'The executive board, the board members and their history.', group: 'People' },
      { label: 'Advisory board', href: '/about/advisory-board/', blurb: 'Industry representatives who advise us.' },
      { label: 'Members', href: '/about/members/', blurb: 'Directory of listed members.' },
      { label: 'Research groups', href: '/about/research-groups/', blurb: 'The groups behind VERSEN, and related research schools.' },
      { label: 'For companies', href: '/about/for-companies/', blurb: 'Host an MSc thesis student, advise or support us.', group: 'Work with us' },
    ],
  },
  {
    label: 'Working groups',
    href: '/working-groups/',
    children: [
      { label: 'All groups & how to join', href: '/working-groups/', blurb: 'What each group does, who leads it, and how to take part.' },
      ...groupLinks,
    ],
  },
  {
    label: 'Events',
    href: '/events/',
    children: [
      { label: 'Upcoming & past events', href: '/events/', blurb: 'Our own events, and events in the community.' },
      { label: 'SEN Symposium', href: 'https://www.sen-symposium.nl/', blurb: 'Our yearly national symposium.' },
    ],
  },
  {
    label: 'Funding',
    href: '/funding/',
    children: [
      { label: 'Get funding', href: '/funding/', blurb: 'Request VERSEN money for an event or initiative.' },
      { label: 'Funding landscape (2025)', href: '/events/2025-navigate-funding/', blurb: 'Material from our afternoon on Dutch and European funding.' },
    ],
  },
  {
    label: 'News',
    href: '/news/',
    children: [
      { label: 'Latest news', href: '/news/', blurb: 'What is happening in Dutch software engineering.' },
      { label: 'News archive', href: '/news/archive/', blurb: 'Every item since 2016, searchable, with the newsletters.' },
      { label: 'Suggest news', href: '/suggest-news/', blurb: 'Send us an item for the website and newsletter.' },
    ],
  },
  {
    label: 'Awards',
    href: '/awards/',
    children: [
      { label: 'Thesis awards', href: '/awards/thesis/', blurb: 'Yearly PhD and MSc thesis awards: criteria, jury and the call.' },
      { label: 'Past winners', href: '/awards/winners/', blurb: 'All PhD and MSc winners since 2018.' },
      { label: 'Honorary fellows', href: '/awards/honorary-fellows/', blurb: 'Emeriti who shaped software engineering in the Netherlands.' },
    ],
  },
  {
    label: 'Resources',
    href: '/resources/',
    children: [
      { label: 'Research agenda (SRIA)', href: '/resources/sria/', blurb: 'The Strategic Research and Innovation Agenda for the Future of Software.' },
      { label: 'Manifesto', href: '/resources/manifesto/', blurb: 'Our vision for software research and education in the Netherlands.' },
      { label: 'Annual reports', href: '/resources/annual-reports/', blurb: 'Yearly reports of the executive board, since 2022.' },
      { label: 'Newsletter archive', href: links.newsletters, blurb: 'Past issues of the VERSEN newsletter.' },
      { label: 'Proposal support', href: '/resources/proposal-support/', blurb: 'Funded NWO and ERC proposals their authors will share.' },
      { label: 'Logos', href: '/resources/logos/', blurb: 'The VERSEN logo in SVG, PNG and PDF.' },
    ],
  },
];

// Shown next to the Join button, in the mobile menu and in the footer bar.
export const contact: NavLink = { label: 'Contact', href: '/contact/' };

/** True for links that leave the site; menus mark them with an arrow. */
export const isExternal = (href: string) => /^https?:/.test(href);

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
  if (p.startsWith('/suggest-news/')) return sections.find((s) => s.label === 'News');
  if (p.startsWith('/in-memoriam/')) return sections.find((s) => s.label === 'News');
  // A page listed in two sections belongs to the one whose path it lives under.
  if (p.startsWith('/events/2025-navigate-funding/')) return sections.find((s) => s.label === 'Events');
  return sections.find((s) => p.startsWith(s.href));
}
