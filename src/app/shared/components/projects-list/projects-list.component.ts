import {
  Component,
  QueryList,
  ViewChildren,
  viewChildren,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { projects, emptyProjects } from '../../constants';
import { ProjectCardComponent } from './project-card/project-card.component';
import { CommonModule } from '@angular/common';
import { Project } from '../../models/project';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [ProjectCardComponent, CommonModule],
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.scss',
})
export class ProjectsListComponent implements OnInit, AfterViewInit {
  //Hard coded projects
  allProjects: Project[] = projects;
  hiddenProjects: Project[] = emptyProjects;

  previousScroll: number = 0;
  halfWidthContainer!: number; //ancho de la ventana
  middleContainer!: number; //el punto del ejex central de la ventana
  cardSelected!: ProjectCardComponent; //referencia a la card seleccionada
  cardSelectedIndex: number = 0; //indice de la card seleccionada
  halfWidthCardSelected!: number; //ancho de la card seleccionada
  middleCardSelected!: number; //punto del eje x central de la card seleccionada
  // borderLeftCardSelected!: number; //borde izquierdo de la card seleccionada
  // borderRightCardSelected!: number; //borde derecho de la card seleccionada
  @ViewChild('pointer', { static: true }) pointer!: ElementRef;
  @ViewChild('containerList', { static: true }) container!: ElementRef;
  @ViewChildren('projectCard')
  projectsCards!: QueryList<ProjectCardComponent>;
  @ViewChildren('itemStatus')
  itemsStatusBar!: QueryList<HTMLElement>;

  ngOnInit() {
    this.halfWidthContainer =
      this.container.nativeElement.getBoundingClientRect().width / 2;
    this.middleContainer =
      this.container.nativeElement.getBoundingClientRect().x +
      this.halfWidthContainer;
  }
  ngAfterViewInit() {
    this.cardSelected =
      this.projectsCards.get(this.cardSelectedIndex) ||
      this.projectsCards.first;
    console.log(this.cardSelected.card);
    this.halfWidthCardSelected =
      this.cardSelected.card.nativeElement.getBoundingClientRect().width / 2;
    this.middleCardSelected =
      this.cardSelected.card.nativeElement.getBoundingClientRect().x + this.halfWidthCardSelected;
    // Calcular el desplazamiento necesario para centrar la tarjeta seleccionada
    const scrollOffset = this.middleCardSelected - this.middleContainer;
    // Ajustar el desplazamiento del contenedor
    this.container.nativeElement.scrollLeft += scrollOffset;
  }
  nextCard(event: Event) {
    console.log('nextCard');
  }
}
