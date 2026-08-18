import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-title',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="section-title-wrap">
      @if (tag()) {
        <div class="section-tag mono">
          <span class="tag-hash">#</span>
          <span>{{ tag() }}</span>
        </div>
      }
      <h2 class="title">{{ title() }}</h2>
      @if (subtitle()) {
        <p class="subtitle">{{ subtitle() }}</p>
      }
    </div>
  `,
  styles: [`
    .section-title-wrap {
      margin-bottom: 32px;
    }
    .section-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      font-weight: 600;
      color: #818cf8;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 8px;
    }
    .tag-hash {
      color: #38bdf8;
    }
    .title {
      margin: 0;
      font-size: clamp(26px, 3.2vw, 36px);
      font-weight: 800;
      letter-spacing: -0.5px;
      color: #f8fafc;
    }
    .subtitle {
      margin: 8px 0 0;
      font-size: 16px;
      color: #94a3b8;
      max-width: 680px;
    }
  `]
})
export class SectionTitle {
  title = input.required<string>();
  subtitle = input<string>();
  tag = input<string>();
}
