import { Component, Input } from '@angular/core';
import { Project } from '../../../models/project';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
})
export class ProjectCardComponent {
  @Input() project!: Project;
  isActive = true;

  toProject(Event: MouseEvent) {
    Event.stopPropagation();
    this.isActive && window.open(this.project.url, '_blank');
  }
}
