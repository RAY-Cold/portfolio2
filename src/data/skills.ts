import type { IconType } from 'react-icons';
import {
  SiC, SiCplusplus, SiCss, SiDart, SiEthereum, SiFlutter, SiGit, SiGithub, SiHtml5, SiJavascript,
  SiMongodb, SiNextdotjs, SiNodedotjs, SiOpenjdk, SiPostgresql, SiPython, SiReact, SiSolidity,
  SiSupabase, SiTailwindcss, SiTypescript, SiVitest,
} from 'react-icons/si';
import { LuBrain, LuCode, LuLink, LuWallet } from 'react-icons/lu';

export type SkillCategory = 'Languages' | 'Web & mobile' | 'Blockchain & AI' | 'Databases & tools';

export type Skill = { name: string; icon: IconType; category: SkillCategory };

export const skillCategories: { id: SkillCategory; blurb: string }[] = [
  { id: 'Languages', blurb: 'What I write code in' },
  { id: 'Web & mobile', blurb: 'Apps people use' },
  { id: 'Blockchain & AI', blurb: 'On-chain and intelligent' },
  { id: 'Databases & tools', blurb: 'Data and workflow' },
];

export const skills: Skill[] = [
  { name: 'Python', icon: SiPython, category: 'Languages' },
  { name: 'Java', icon: SiOpenjdk, category: 'Languages' },
  { name: 'C', icon: SiC, category: 'Languages' },
  { name: 'C++', icon: SiCplusplus, category: 'Languages' },
  { name: 'JavaScript', icon: SiJavascript, category: 'Languages' },
  { name: 'TypeScript', icon: SiTypescript, category: 'Languages' },
  { name: 'Dart', icon: SiDart, category: 'Languages' },

  { name: 'React.js', icon: SiReact, category: 'Web & mobile' },
  { name: 'Next.js', icon: SiNextdotjs, category: 'Web & mobile' },
  { name: 'Node.js', icon: SiNodedotjs, category: 'Web & mobile' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, category: 'Web & mobile' },
  { name: 'HTML', icon: SiHtml5, category: 'Web & mobile' },
  { name: 'CSS', icon: SiCss, category: 'Web & mobile' },
  { name: 'Flutter', icon: SiFlutter, category: 'Web & mobile' },

  { name: 'Ethereum', icon: SiEthereum, category: 'Blockchain & AI' },
  { name: 'Solidity', icon: SiSolidity, category: 'Blockchain & AI' },
  { name: 'wagmi', icon: LuWallet, category: 'Blockchain & AI' },
  { name: 'viem', icon: LuLink, category: 'Blockchain & AI' },
  { name: 'AI/ML', icon: LuBrain, category: 'Blockchain & AI' },

  { name: 'Supabase', icon: SiSupabase, category: 'Databases & tools' },
  { name: 'PostgreSQL', icon: SiPostgresql, category: 'Databases & tools' },
  { name: 'MongoDB', icon: SiMongodb, category: 'Databases & tools' },
  { name: 'Git', icon: SiGit, category: 'Databases & tools' },
  { name: 'GitHub', icon: SiGithub, category: 'Databases & tools' },
  { name: 'Vitest', icon: SiVitest, category: 'Databases & tools' },
  { name: 'VS Code', icon: LuCode, category: 'Databases & tools' },
];
