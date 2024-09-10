import { Component } from '@angular/core';
import { projects } from '../../constants';
import { ProjectCardComponent } from './project-card/project-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [ProjectCardComponent, CommonModule],
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.scss',
})
export class ProjectsListComponent {
  projects = projects;
}
