import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Tilt3DDirective } from '../../directives/tilt-3d.directive';
import { Project } from '../../core/models/portfolio.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, MatChipsModule, MatButtonModule, MatIconModule, Tilt3DDirective],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
})
export class ProjectCard {
  readonly project = input.required<Project>();
}
