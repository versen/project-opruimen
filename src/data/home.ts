// Content for the home page that changes a few times a year.

export const stats = [
  { value: '400+', label: 'members' },
  { value: '17', label: 'research groups' },
  { value: '2016', label: 'founded' },
];

// Items for the home page's "Right now" strip (one line each: kicker + linked title).
// Keep reusable items here and switch them with `show`; at most three are shown
// (fewer if an event is upcoming). With nothing to show, the strip is hidden.
// `text` and `cta` aren't displayed in the strip; they're kept for a card layout.
export const spotlights = [
  {
    show: false,
    kicker: 'Thesis awards',
    title: 'Nominate an outstanding PhD or MSc thesis',
    text: 'Yearly awards for theses defended at a Dutch institution, presented at the SEN Symposium.',
    href: '/awards/call/',
    cta: 'See the call',
  },
  {
    show: true,
    kicker: 'Proposal support',
    title: 'Learn from funded NWO and ERC proposals',
    text: 'Veni, Vidi, Vici, ENW and ERC grantees who are willing to share their applications.',
    href: '/resources/proposal-support/',
    cta: 'Browse proposals',
  },
  {
    show: false,
    kicker: 'SEN Symposium',
    title: 'The yearly meeting of Dutch software engineering',
    text: 'Talks, the thesis-award ceremony and honorary fellows, hosted at CWI in Amsterdam.',
    href: 'https://www.sen-symposium.nl/',
    cta: 'Visit sen-symposium.nl',
  },
];

export const activities = [
  { title: 'Events', text: 'The SEN Symposium, seminar afternoons and tracks at ICT.OPEN.', href: '/events/' },
  { title: 'Awards', text: 'PhD and MSc thesis awards, and our honorary fellows.', href: '/awards/' },
  { title: 'Funding', text: 'Shared proposals and small grants for community initiatives.', href: '/resources/' },
  { title: 'Education & industry', text: 'Curriculum work and MSc thesis matchmaking with companies.', href: '/resources/education/' },
];

// Verbatim excerpts; the full quotes are on /about/manifesto/.
export const endorsements = [
  {
    quote: 'The VERSEN manifesto hopes to inspire software researchers, yet I find it also provokes me as a software developer.',
    name: 'Jeroen Heijmans',
    org: 'RWS',
  },
  {
    quote: "I endorse VERSEN's manifesto on Software Research and Education in the Netherlands, because I share the urgency for investing in software engineering knowledge and skills.",
    name: 'Rik Farenhorst',
    org: 'Independent consultant',
  },
  {
    quote: 'We’re happy to see these challenges listed in the Manifesto on Software Research and Education and hope to cooperate in and benefit from the research.',
    name: 'Dr. Frank Niessink',
    org: 'Quality manager, ICTU',
  },
  {
    quote: 'It is paramount that future software engineers are trained both in computer science fundamentals, and in up-to-date engineering methods to help improve the software landscape of the future.',
    name: 'Dr. Magiel Bruntink',
    org: 'Head of Research, Software Improvement Group',
  },
  {
    quote: 'I strongly believe that we should look at developing secure software as a craft and culture by investing in software engineers helping them to learn and use the right skills.',
    name: 'Danny Onwezen',
    org: 'Chairman, Secure Software Alliance',
  },
];
