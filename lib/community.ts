import type { CommunityPost } from './types';

export const COMMUNITY: CommunityPost[] = [
  {
    id: 'c1',
    kind: 'Event',
    title: 'E-Cell Founders Night',
    host: 'Entrepreneurship Cell',
    college: 'Jai Hind College',
    when: 'Thu, 7 Sep · 5:30 PM',
    where: 'Seminar Hall, 3rd Floor',
    blurb:
      'Four student founders talk about what actually broke in their first year. Open floor after.',
    tags: ['Entrepreneurship', 'Networking', 'Startups'],
    attending: 84,
    emoji: '🚀'
  },
  {
    id: 'c2',
    kind: 'Club',
    title: 'Photography Collective',
    host: 'Lens Society',
    college: 'Jai Hind College',
    when: 'Every Sunday · 7:00 AM',
    where: 'Meets at Kala Ghoda',
    blurb:
      'Weekly photowalks across the city. All levels, phone cameras completely welcome.',
    tags: ['Photography', 'Travel', 'Design'],
    attending: 46,
    emoji: '📷'
  },
  {
    id: 'c3',
    kind: 'Project',
    title: 'Campus Waste Audit — 3 spots open',
    host: 'Meera Joshi',
    college: 'Jai Hind College',
    when: 'Ongoing · ~4 hrs/week',
    where: 'Campus + remote',
    blurb:
      'Measuring where campus waste actually goes, then publishing the report. Need data and design help.',
    tags: ['Sustainability', 'Social Impact', 'Research'],
    attending: 9,
    emoji: '🌱'
  },
  {
    id: 'c4',
    kind: 'Meetup',
    title: '6 AM Run Club',
    host: 'Dev Sharma',
    college: 'Jai Hind College',
    when: 'Mon / Wed / Fri · 6:00 AM',
    where: 'Marine Drive, Gate 3',
    blurb: 'Five kilometres, no pressure on pace. Breakfast after on Fridays.',
    tags: ['Sports', 'Get fitter', 'Gym'],
    attending: 31,
    emoji: '🏃'
  },
  {
    id: 'c5',
    kind: 'Event',
    title: 'Inter-College Case Competition',
    host: 'Commerce Association',
    college: 'Jai Hind College',
    when: 'Sat, 16 Sep · 9:00 AM',
    where: 'Main Auditorium',
    blurb:
      'Teams of three. Live consulting case, judged by working analysts. Teams still forming.',
    tags: ['Consulting', 'Finance & Markets', 'Teammates'],
    attending: 122,
    emoji: '📊'
  },
  {
    id: 'c6',
    kind: 'Activity',
    title: 'Thursday Open Mic',
    host: 'Literary Society',
    college: "St. Xavier's College",
    when: 'Every Thursday · 6:00 PM',
    where: 'Quad Steps',
    blurb: 'Poetry, stand-up, music. Sign-up sheet opens an hour before. Cross-college entry allowed.',
    tags: ['Music', 'Literature', 'Public Speaking'],
    attending: 58,
    emoji: '🎤'
  },
  {
    id: 'c7',
    kind: 'Opportunity',
    title: 'Frontend intern — early-stage campus startup',
    host: 'Aditya Ghosh',
    college: 'NM College',
    when: 'Applications close 20 Sep',
    where: 'Hybrid · Mumbai',
    blurb:
      'React work on a live product with real users. Stipend, flexible hours around lectures.',
    tags: ['React', 'JavaScript', 'Startups'],
    attending: 27,
    emoji: '💼'
  },
  {
    id: 'c8',
    kind: 'Club',
    title: 'Film Society Screening: Rashomon',
    host: 'Film Society',
    college: 'Jai Hind College',
    when: 'Fri, 8 Sep · 4:00 PM',
    where: 'AV Room',
    blurb: 'Screening followed by a proper discussion. Latecomers seated after the first act.',
    tags: ['Film & Cinema', 'Literature'],
    attending: 39,
    emoji: '🎬'
  },
  {
    id: 'c9',
    kind: 'Meetup',
    title: 'Data Science Study Circle',
    host: 'Zoya Merchant',
    college: 'Jai Hind College',
    when: 'Tue · 5:00 PM',
    where: 'Library, Room 2',
    blurb: 'Working through an ML course together. Currently on week four, easy to join late.',
    tags: ['AI & Machine Learning', 'Python', 'Study partner'],
    attending: 18,
    emoji: '🧠'
  }
];
