import { Injectable, computed, signal } from '@angular/core';
import {
  APP_URLS,
  PROFILE_DATA,
  QUICK_STATS,
  SKILL_CATEGORIES,
  WORK_EXPERIENCES,
  PORTFOLIO_PROJECTS,
  EDUCATION_DATA,
} from '../constants/portfolio.data';
import {
  ProfileInfo,
  StatMetric,
  SkillCategory,
  Experience,
  Project,
  Education,
  ProjectFilterOption,
} from '../models/portfolio.model';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  readonly urls = APP_URLS;
  readonly profile = signal<ProfileInfo>(PROFILE_DATA);
  readonly stats = signal<readonly StatMetric[]>(QUICK_STATS);
  readonly skills = signal<readonly SkillCategory[]>(SKILL_CATEGORIES);
  readonly experiences = signal<readonly Experience[]>(WORK_EXPERIENCES);
  readonly projects = signal<readonly Project[]>(PORTFOLIO_PROJECTS);
  readonly education = signal<readonly Education[]>(EDUCATION_DATA);

  readonly activeProjectFilter = signal<ProjectFilterOption>('all');
  readonly copiedItem = signal<string | null>(null);

  readonly filteredProjects = computed(() => {
    const filter = this.activeProjectFilter();
    const all = this.projects();

    switch (filter) {
      case 'saas':
        return all.filter((p) => p.projectType === 'saas');
      case 'enterprise':
        return all.filter((p) => p.projectType === 'enterprise-work');
      case 'fintech':
        return all.filter((p) => p.projectType === 'fintech');
      case 'all':
      default:
        return all;
    }
  });

  setProjectFilter(filter: ProjectFilterOption): void {
    this.activeProjectFilter.set(filter);
  }

  copyToClipboard(text: string, label: string): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      this.copiedItem.set(label);
      setTimeout(() => {
        if (this.copiedItem() === label) {
          this.copiedItem.set(null);
        }
      }, 2500);
    }
  }

  scrollToSection(id: string): void {
    if (typeof window === 'undefined') return;

    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }
}
