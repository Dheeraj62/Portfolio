import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PortfolioService } from '../../core/services/portfolio.service';

@Component({
  selector: 'app-social-links',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="social-links-wrapper" [class.compact]="compact()">
      <!-- GitHub -->
      <a
        [href]="portfolioService.urls.github"
        target="_blank"
        rel="noreferrer"
        class="social-btn github"
        title="GitHub Profile"
        aria-label="GitHub Profile"
      >
        <svg class="svg-icon" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
          />
        </svg>
        @if (!compact()) {
          <span class="btn-label">GitHub</span>
        }
      </a>

      <!-- LinkedIn -->
      <a
        [href]="portfolioService.urls.linkedin"
        target="_blank"
        rel="noreferrer"
        class="social-btn linkedin"
        title="LinkedIn Profile"
        aria-label="LinkedIn Profile"
      >
        <svg class="svg-icon" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
          />
        </svg>
        @if (!compact()) {
          <span class="btn-label">LinkedIn</span>
        }
      </a>

      <!-- Email -->
      @if (showEmail()) {
        <a
          [href]="portfolioService.urls.mailto"
          class="social-btn email"
          title="Send Email"
          aria-label="Send Email"
        >
          <mat-icon class="mat-icon-sm">mail</mat-icon>
          @if (!compact()) {
            <span class="btn-label">Email</span>
          }
        </a>
      }
    </div>
  `,
  styles: [
    `
      .social-links-wrapper {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .social-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 8px 16px;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.08);
        color: #94a3b8;
        font-size: 13px;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        cursor: pointer;

        &:hover {
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        &.github:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.25);
        }

        &.linkedin:hover {
          background: rgba(14, 165, 233, 0.2);
          border-color: rgba(14, 165, 233, 0.4);
          color: #38bdf8;
        }

        &.email:hover {
          background: rgba(99, 102, 241, 0.2);
          border-color: rgba(99, 102, 241, 0.4);
          color: #a5b4fc;
        }
      }

      .compact .social-btn {
        width: 36px;
        height: 36px;
        padding: 0;
        border-radius: 10px;
      }

      .svg-icon {
        width: 18px;
        height: 18px;
      }

      .mat-icon-sm {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }

      .btn-label {
        font-size: 13px;
      }
    `,
  ],
})
export class SocialLinksComponent {
  readonly portfolioService = inject(PortfolioService);
  readonly compact = input<boolean>(false);
  readonly showEmail = input<boolean>(false);
}
