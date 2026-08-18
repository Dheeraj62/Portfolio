export type ProjectType = 'saas' | 'enterprise-work' | 'fintech';

export interface SocialLinks {
  readonly email: string;
  readonly linkedin: string;
  readonly github: string;
}

export interface ProfileInfo {
  readonly name: string;
  readonly role: string;
  readonly location: string;
  readonly experienceYears: string;
  readonly currentCompany: string;
  readonly currentRole: string;
  readonly social: SocialLinks;
  readonly highlights: readonly string[];
  readonly coreStack: readonly string[];
}

export interface StatMetric {
  readonly num: string;
  readonly label: string;
  readonly sub: string;
  readonly icon: string;
}

export interface SkillCategory {
  readonly title: string;
  readonly icon: string;
  readonly color: string;
  readonly items: readonly string[];
}

export interface Experience {
  readonly title: string;
  readonly org: string;
  readonly location: string;
  readonly period: string;
  readonly type: string;
  readonly badge: string;
  readonly isCurrent: boolean;
  readonly summary: string;
  readonly points: readonly string[];
  readonly tech: readonly string[];
}

export interface Project {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly projectType: ProjectType;
  readonly organization?: string; // E.g., 'IndiGo Airlines (Aionos)', 'Binary Semantics Ltd.'
  readonly isCurrentJobProject?: boolean;
  readonly featured?: boolean;
  readonly description: string;
  readonly highlights?: readonly string[];
  readonly metrics?: string;
  readonly tags: readonly string[];
  readonly liveUrl?: string;
  readonly repoUrl?: string;
}

export interface Education {
  readonly degree: string;
  readonly institution: string;
  readonly period: string;
  readonly score: string;
  readonly icon: string;
  readonly highlight: string;
}

export type ProjectFilterOption = 'all' | 'saas' | 'enterprise' | 'fintech';
