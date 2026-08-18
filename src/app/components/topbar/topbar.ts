import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PortfolioService } from '../../core/services/portfolio.service';
import { SocialLinksComponent } from '../social-links/social-links';

interface NavItem {
  readonly label: string;
  readonly id: string;
}

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, SocialLinksComponent],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class TopbarComponent {
  readonly portfolioService = inject(PortfolioService);
  isScrolled = false;

  readonly navItems: readonly NavItem[] = [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Education', id: 'education' },
    { label: 'Contact', id: 'contact' },
  ];

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 40;
  }

  scrollTo(id: string): void {
    this.portfolioService.scrollToSection(id);
  }
}