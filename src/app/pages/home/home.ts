import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';

import { TopbarComponent } from '../../components/topbar/topbar';
import { SectionTitle } from '../../components/section-title/section-title';
import { ProjectCard } from '../../components/project-card/project-card';
import { ThreeCanvasComponent } from '../../components/three-canvas/three-canvas';
import { SocialLinksComponent } from '../../components/social-links/social-links';
import { Tilt3DDirective } from '../../directives/tilt-3d.directive';
import { PortfolioService } from '../../core/services/portfolio.service';
import { ProjectFilterOption } from '../../core/models/portfolio.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TopbarComponent,
    SectionTitle,
    ProjectCard,
    ThreeCanvasComponent,
    SocialLinksComponent,
    Tilt3DDirective,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatChipsModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
  readonly portfolioService = inject(PortfolioService);

  readonly filterTabs: readonly { label: string; value: ProjectFilterOption }[] = [
    { label: 'All Projects', value: 'all' },
    { label: 'SaaS & Live', value: 'saas' },
    { label: 'Enterprise & Airlines', value: 'enterprise' },
    { label: 'FinTech & Compliance', value: 'fintech' },
  ];

  setFilter(filter: ProjectFilterOption): void {
    this.portfolioService.setProjectFilter(filter);
  }

  copyToClipboard(text: string, label: string): void {
    this.portfolioService.copyToClipboard(text, label);
  }

  scrollTo(id: string): void {
    this.portfolioService.scrollToSection(id);
  }
}