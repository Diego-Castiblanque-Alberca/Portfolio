import { Component, ElementRef, Input, ViewChild } from '@angular/core';
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
  title1!: string;
  @Input({ required: true })
  iconSpine!: string;
  @Input({ required: true })
  title2!: string[];
  @Input({ required: true })
  descriptions!: string[];
  @Input({ required: true })
  type!: string | string[];
  @Input({ required: true })
  iconsTechnologies!: string[];
  @Input({ required: true })
  url!: string;
  @ViewChild('card', { static: true })
  card!: ElementRef;
  isActive = true;
  toProject(Event: MouseEvent | KeyboardEvent) {
    console.log('toProject');
    Event.stopPropagation();
    this.isActive && window.open(this.url, '_blank');
    //Si la carta no está activa, es porque tiene que moverse y no se puede abrir el enlace
    //se mueve la carta y ya se queda lista para abrir el enlace
    //Se desactivan todas las demás cartas.
  }
}
