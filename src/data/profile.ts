// Single source of truth for personal details. Everything here comes from
// Rahul Anand's resume; nothing is invented.

export const profile = {
  name: 'Rahul Anand',
  firstName: 'Rahul',
  initials: 'RA',
  siteTitle: 'Rahul Anand | Full-stack, Mobile & Web3 Developer',
  siteDescription:
    'Portfolio of Rahul Anand, a Computer Science undergraduate at VIT Chennai building full-stack, mobile, and Web3 applications: Flutter, Next.js, and Ethereum smart contracts.',
  headline: 'Computer Science undergraduate building full-stack, mobile, and Web3 applications',
  roles: ['Full-stack developer', 'Flutter mobile developer', 'Web3 builder', 'Software development intern'],
  intro:
    'I build apps across Flutter, React.js, Next.js, Node.js, and Ethereum smart contracts, from tourist-safety mobile apps to risk-aware DeFi dashboards.',
  location: 'Chennai, Tamil Nadu',
  email: 'rahulanand1407@gmail.com',
  resumeUrl: '/Rahul_Anand_Resume.pdf',
  resumeFileName: 'Rahul_Anand_Resume.pdf',
  githubUser: 'RAY-Cold',
  links: {
    github: 'https://github.com/RAY-Cold',
    linkedin: 'https://linkedin.com/in/rahul-anand-225a17283',
    email: 'mailto:rahulanand1407@gmail.com',
  },
  online: [
    { kind: 'github', label: 'GitHub', handle: 'RAY-Cold', href: 'https://github.com/RAY-Cold', body: 'Source for the projects on this site.' },
    { kind: 'linkedin', label: 'LinkedIn', handle: 'rahul-anand-225a17283', href: 'https://linkedin.com/in/rahul-anand-225a17283', body: 'Background, updates, and connections.' },
    { kind: 'email', label: 'Email', handle: 'rahulanand1407@gmail.com', href: 'mailto:rahulanand1407@gmail.com', body: 'The quickest way to reach me.' },
  ],
  heroCard: { line1: 'B.Tech Computer Science', line2: 'VIT Chennai, expected 2027' },
  heroHighlights: [
    { icon: 'trophy', title: 'Institute Finalist', body: 'Smart India Hackathon 2025' },
    { icon: 'briefcase', title: 'Software Development Intern', body: 'Impower Centre, 2026' },
    { icon: 'award', title: 'First Place', body: 'Inter-College Web Development, 2024' },
  ],
  languages: ['English', 'Tamil', 'Hindi'],
} as const;

export type OnlineKind = (typeof profile.online)[number]['kind'];

export const about = {
  paragraphs: [
    'I am a Computer Science and Engineering undergraduate at Vellore Institute of Technology, Chennai, graduating in 2027 with a CGPA of 8.63.',
    'I like building the part people hold in their hands: I was the sole developer of the Flutter app for our Smart India Hackathon project, and I have built Web3 dashboards that make on-chain risk readable.',
    'This year I interned as a software developer at Impower Centre on Verbal Coach, a speech-therapy platform. I am looking for roles where I can ship full-stack, mobile, and Web3 products.',
  ],
  interests: ['Flutter mobile apps', 'Web3 and smart contracts', 'Full-stack web apps', 'Real-time systems', 'Healthcare and accessibility tech'],
  facts: [
    { label: 'CGPA', value: '8.63 / 10' },
    { label: 'Class XII (2023)', value: '94.4%' },
    { label: 'Class X (2021)', value: '97%' },
    { label: 'Graduating', value: '2027' },
  ],
};

export const education = {
  degree: 'B.Tech in Computer Science and Engineering',
  school: 'Vellore Institute of Technology, Chennai',
  period: 'Expected 2027',
  cgpa: '8.63/10',
};

export type TimelineItem = {
  period: string;
  title: string;
  org: string;
  kind: 'Education' | 'Internship' | 'Leadership' | 'Competition' | 'Academic project';
  body: string;
  stack?: string;
};

// Shown in this order on the page.
export const timeline: TimelineItem[] = [
  {
    period: 'May 2026 – Jul 2026',
    title: 'Software Development Intern',
    org: 'Impower Centre',
    kind: 'Internship',
    stack: 'Next.js, TypeScript, Supabase (PostgreSQL), Tailwind CSS, Vitest',
    body: 'Co-developed Verbal Coach in a 5-member team: a speech-therapy platform where clinicians author activities on a canvas, assign them to patients, and track progress. It serves 3 roles across 42 routes, with real-time messaging, server-side scoring, row-level security on every table, and 71 unit tests.',
  },
  {
    period: 'Expected 2027',
    title: 'B.Tech, Computer Science and Engineering',
    org: 'Vellore Institute of Technology, Chennai',
    kind: 'Education',
    body: 'CGPA 8.63/10. Earlier: Class XII (2023) 94.4% and Class X (2021) 97%.',
  },
  {
    period: '2025',
    title: 'Institute Finalist, Smart India Hackathon',
    org: 'Smart India Hackathon 2025',
    kind: 'Competition',
    body: 'Sole developer of the Flutter mobile app for Tour Secure AI, a tourist safety platform with digital ID, real-time alerts, and SOS.',
  },
  {
    period: '2024',
    title: 'First Place, Inter-College Web Development Competition',
    org: 'Inter-college competition',
    kind: 'Competition',
    body: 'Built and presented a full-stack MERN e-commerce store.',
  },
  {
    period: 'College',
    title: 'Event Manager',
    org: 'College Club',
    kind: 'Leadership',
    body: 'Planned and ran college-level events, coordinating teams, resources, and participants from planning through execution.',
  },
];

export const experienceIntro = 'My internship, degree, competitions, and leadership.';

export type Achievement = {
  title: string;
  issuer: string;
  year?: string;
  kind: 'Hackathon' | 'Competition' | 'Certification' | 'Academic' | 'Internship';
  body: string;
};

export const achievements: Achievement[] = [
  {
    title: 'Institute Finalist',
    issuer: 'Smart India Hackathon',
    year: '2025',
    kind: 'Hackathon',
    body: 'Selected as an institute finalist for Tour Secure AI; I built its Flutter mobile app.',
  },
  {
    title: 'First Place',
    issuer: 'Inter-College Web Development Competition',
    year: '2024',
    kind: 'Competition',
    body: 'Won with a full-stack e-commerce platform built on React, Node.js, and MongoDB.',
  },
  {
    title: 'Software Development Intern',
    issuer: 'Impower Centre',
    year: '2026',
    kind: 'Internship',
    body: 'Eight weeks building Verbal Coach, a speech-therapy platform, in a 5-member team.',
  },
  {
    title: 'Academic record',
    issuer: 'VIT Chennai and school boards',
    kind: 'Academic',
    body: 'CGPA 8.63/10 in B.Tech CSE, 94.4% in Class XII, and 97% in Class X.',
  },
];
