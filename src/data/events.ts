// Newest first. `href` may point to an event page on this site or elsewhere.
// Move an entry into `upcoming` to feature it on the home and events pages.

export interface EventItem {
  title: string;
  year: number;
  date?: string; // ISO date, when known
  place?: string;
  href?: string;
  kind: 'VERSEN' | 'Symposium' | 'Partner';
}

export const upcoming: EventItem[] = [];

export const past: EventItem[] = [
  { title: 'SEN Symposium 2026', year: 2026, href: 'https://www.sen-symposium.nl/', kind: 'Symposium' },
  { title: 'How to Navigate the SE Funding Landscape', year: 2025, date: '2025-10-23', place: 'Radboud University, Nijmegen', href: '/events/2025-navigate-funding/', kind: 'VERSEN' },
  { title: 'SEN Symposium 2025', year: 2025, href: 'https://www.sen-symposium.nl/history/2025/program', kind: 'Symposium' },
  { title: 'ICT.OPEN 2025', year: 2025, href: 'https://www.ictopen.nl/', kind: 'Partner' },
  { title: 'PLNL 2024', year: 2024, href: 'https://conf.researchr.org/home/plnl-2024', kind: 'Partner' },
  { title: 'ICT.OPEN 2024', year: 2024, href: 'https://www.ictopen.nl/', kind: 'Partner' },
  { title: 'SEN Symposium 2024', year: 2024, href: 'https://www.sen-symposium.nl/history/2024/program', kind: 'Symposium' },
  { title: 'Generative AI and Ethics', year: 2023, date: '2023-11-20', place: 'Utrecht University', href: '/events/2023-generative-ai-and-ethics/', kind: 'VERSEN' },
  { title: 'PLNL 2023', year: 2023, href: 'https://conf.researchr.org/home/plnl-2023', kind: 'Partner' },
  { title: 'SEN Symposium 2023', year: 2023, href: 'https://www.sen-symposium.nl/history/2023/program', kind: 'Symposium' },
  { title: 'SEN Classrooms', year: 2023, href: 'https://forms.office.com/e/pp4PqpdHfc', kind: 'VERSEN' },
  { title: 'ICT.OPEN 2023', year: 2023, href: 'https://www.ictopen.nl/', kind: 'Partner' },
  { title: 'ICT.OPEN 2022', year: 2022, href: 'https://www.ictopen.nl/', kind: 'Partner' },
  { title: 'SEN Symposium 2022', year: 2022, href: 'https://www.sen-symposium.nl/history/2022/program', kind: 'Symposium' },
  { title: 'Artificial Intelligence meets Software Engineering (with IPA)', year: 2022, href: 'https://ipa.win.tue.nl/?event=joint-ipa-versen-seminar-afternoon-on-artificial-intelligence-meets-software-engineering', kind: 'VERSEN' }, // year unverified: listed between SEN 2021 and SEN 2022 on the old site
  { title: 'SEN Symposium 2021', year: 2021, href: 'http://www.sen-symposium.nl/history/2021/program/', kind: 'Symposium' },
  { title: 'ICT.OPEN 2021', year: 2021, href: 'https://www.ictopen.nl/', kind: 'Partner' },
  { title: 'SEN Symposium 2020', year: 2020, href: 'http://www.sen-symposium.nl/history/2020/program', kind: 'Symposium' },
  { title: 'BENEVOL 2020', year: 2020, href: 'https://benevol2020.github.io/', kind: 'Partner' },
  { title: 'SEN Symposium 2019', year: 2019, href: 'http://www.sen-symposium.nl/history/2019/program', kind: 'Symposium' },
  { title: 'BENEVOL 2019', year: 2019, href: 'http://soft.vub.ac.be/benevol2019/', kind: 'Partner' },
  { title: 'SEN Symposium 2018', year: 2018, href: 'http://www.sen-symposium.nl/history/2018/program', kind: 'Symposium' },
  { title: 'Landelijk Architectuurcongres 2018', year: 2018, kind: 'Partner' },
  { title: 'SEN Symposium 2017', year: 2017, href: 'http://www.sen-symposium.nl/history/2017/program/', kind: 'Symposium' },
  { title: 'Landelijk Architectuurcongres 2017', year: 2017, kind: 'Partner' },
  { title: 'SEN Symposium 2016', year: 2016, href: 'http://www.sen-symposium.nl/history/2016/program', kind: 'Symposium' },
  { title: 'SEN Symposium 2014', year: 2014, href: 'http://www.sen-symposium.nl/history/2014/program', kind: 'Symposium' },
];
