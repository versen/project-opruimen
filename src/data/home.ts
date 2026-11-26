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
    href: '/awards/thesis/',
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

// The mission as stated on /about/, set as one sentence and its five goals.
export const mission = {
  lead: 'VERSEN is the Dutch National Association for Software Engineering. Its mission is to bring together researchers, educators and practitioners in the field of software engineering in the Netherlands, who share five goals:',
  goals: [
    'advancing the field',
    'raising public awareness of its challenges and opportunities',
    'acquiring funding for groundbreaking and applied research',
    'transferring academic results to society',
    'representing software engineers to professional, legal and political entities',
  ],
};

// What visitors come to do. The working-groups text is filled in with live counts.
export const tasks = [
  { title: 'Nominate a thesis', text: 'Yearly awards for the best PhD and MSc theses in software engineering.', href: '/awards/thesis/' },
  { title: 'Request funding', text: 'VERSEN money for an event or initiative that supports our mission.', href: '/funding/' },
  { title: 'Come to the SEN Symposium', text: 'The yearly meeting of the Dutch software engineering community.', href: 'https://www.sen-symposium.nl/' },
  { title: 'Send us news', text: 'An award, a defence, a grant, a vacancy or an event for the website and newsletter.', href: '/suggest-news/' },
  { title: 'Work with us as a company', text: 'Host an MSc thesis student, advise us, or support the association.', href: '/about/for-companies/' },
  { title: 'Join a working group', text: '', href: '/working-groups/' },
];
