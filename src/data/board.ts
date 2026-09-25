// Executive board and board support, shown on /about/board/ and on the
// Executive Board working-group page. Terms run from SEN Symposium to SEN Symposium.

export interface Person { name: string; href?: string; photo?: string; role?: string; org?: string; email?: string }

export const executive: Person[] = [
  { name: 'Tanja Vos', href: 'https://tanjavos.com/', photo: '/assets/img/board/tanja.jpg', role: 'Chair · 2024–2027*', org: 'Open Universiteit' },
  { name: 'Paris Avgeriou', href: 'http://www.cs.rug.nl/~paris/', photo: '/assets/img/board/paris.jpg', role: 'Vice-chair · 2023–2026*', org: 'University of Groningen' },
  { name: 'Jurgen Vinju', href: 'https://homepages.cwi.nl/~jurgenv/', photo: '/assets/img/board/jurgen.jpg', role: 'Treasurer · ex officio*', org: 'NWO-I Centrum Wiskunde & Informatica' },
  { name: 'Yanja Dajsuren', href: 'https://dajsuren.win.tue.nl/', photo: '/assets/img/board/yanja.jpg', role: 'Secretary · 2025–2028*', org: 'Eindhoven University of Technology' },
  { name: 'Tijs van der Storm', href: 'http://homepages.cwi.nl/~storm', photo: '/assets/img/board/tijs.jpg', role: 'Member · 2024–2027*', org: 'NWO-I Centrum Wiskunde & Informatica' },
  { name: 'Anton Wijs', href: 'https://www.win.tue.nl/~awijs/', photo: '/assets/img/board/awijs.jpg', role: 'Member · 2024–2027*', org: 'Eindhoven University of Technology' },
  { name: 'Sangeeth Kochanthara', href: 'https://www.linkedin.com/in/sangeethko/', photo: '/assets/img/board/sangeeth.jpg', role: 'Member · 2024–2027*', org: 'ASTRON | Eindhoven University of Technology' },
];

export const support: Person[] = [
  { name: 'Burcu Kulahcioglu Ozkan', href: 'https://burcuku.github.io/home/', photo: '/assets/img/board/burcu.jpg', role: 'Publicity chair', org: 'Delft University of Technology' },
  { name: 'Daniel Feitosa', href: 'https://www.rug.nl/staff/d.feitosa/', photo: '/assets/img/board/daniel.jpg', role: 'Web chair', org: 'University of Groningen' },
];
