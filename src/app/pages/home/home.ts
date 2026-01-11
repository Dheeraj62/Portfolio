import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { TopbarComponent } from '../../components/topbar/topbar';
import { SectionTitle } from '../../components/section-title/section-title';
import { Project, ProjectCard } from '../../components/project-card/project-card';

@Component({
  selector: 'app-home',
   imports: [
    CommonModule,
    TopbarComponent,
    SectionTitle,
    ProjectCard,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
  name = 'Dheeraj Verma';
  role = '.NET Core | Angular | Full Stack Developer';
  location = 'India';

  highlights = [
    '3+ years building web apps and APIs',
    'Angular + .NET Core enterprise projects',
    'MongoDB, SQL Server, REST, Auth, CI/CD basics',
  ];

  skills = [
    { title: 'Frontend', items: ['Angular 18/20', 'TypeScript', 'RxJS', 'Angular Material', 'HTML/SCSS'] },
    { title: 'Backend', items: ['.NET Core', 'Web APIs', 'Entity Framework Core', 'JWT/Auth', 'Background Jobs'] },
    { title: 'Databases', items: ['SQL Server', 'MongoDB', 'Indexes', 'Query optimization (basic)'] },
    { title: 'Tools', items: ['Git', 'Postman', 'Azure basics', 'CI/CD basics'] },
  ];

  experiences = [
    {
      title: 'Software Developer',
      org: 'Your Company',
      period: '2023 — Present',
      points: [
        'Built and maintained Angular dashboards and .NET Core APIs.',
        'Implemented validations, logging, and scalable data fetching patterns.',
        'Worked on GST/invoice workflows with MongoDB & SQL Server.',
      ],
    },
    {
      title: 'Developer / Recruiter (Earlier)',
      org: 'Previous',
      period: '2021 — 2023',
      points: [
        'Worked on web modules, bug fixes, and feature delivery.',
        'Collaborated with cross-functional teams and stakeholders.',
      ],
    },
  ];

  projects: Project[] = [
    {
      title: 'GST / Invoice Automation',
      description: 'Invoice workflows, validation pipelines, and upload status tracking with MongoDB and .NET Core.',
      tags: ['.NET Core', 'MongoDB', 'Angular', 'GST'],
    },
    {
      title: 'Seating Chart Editor',
      description: 'Interactive seat selection + section overlays + tooltips for admin editing.',
      tags: ['JavaScript', 'SVG/Canvas', 'APIs'],
    },
    {
      title: 'Portfolio (Angular 20)',
      description: 'Modern responsive portfolio with Angular Material and clean UI.',
      tags: ['Angular 20', 'Material', 'SCSS'],
    },
  ];

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}