import { Component, Input } from '@angular/core';
import { Project } from '../../../models/project';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
})
export class ProjectCardComponent {
  @Input({ required: true })
  tittle1!: string;
  @Input({ required: true })
  tittle2!: string;
  @Input({ required: true })
  descriptions!: string[];
  @Input({ required: true })
  type!: string | string[];
  @Input({ required: true })
  iconsTechnologies!: string[];
  @Input({ required: true })
  isActive = true;
  @Input({ required: true })
  url!: string;
  toProject(Event: MouseEvent) {
    Event.stopPropagation();
    this.isActive && window.open(this.url, '_blank');
    //Si la carta no está activa, es porque tiene que moverse y no se puede abrir el enlace
    //se mueve la carta y ya se queda lista para abrir el enlace
    //Se desactivan todas las demás cartas.
  }
}
