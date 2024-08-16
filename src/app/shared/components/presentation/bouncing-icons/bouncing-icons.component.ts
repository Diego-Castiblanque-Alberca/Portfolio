import {
  Component,
  ElementRef,
  Input,
  ViewChildren,
  AfterViewInit,
  HostListener, OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresentationComponent } from '../presentation.component';
import { Directions } from './directions';
import { Distances } from './distances';
import { SpaceBetween } from './spaceBetween';

@Component({
  selector: 'app-bouncing-icons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bouncing-icons.component.html',
  styleUrl: './bouncing-icons.component.scss',
})
export class BouncingIconsComponent implements AfterViewInit, OnInit {
  iconsUrl: string[];
  translateY: number;
  translateX: number;
  distance: Distances;
  direction: Directions;
  spaceBetween: SpaceBetween;
  spaceActual: number;
  firstImpact: boolean;
  setIntervalId: number | undefined;

  @Input() container!: PresentationComponent;
  containerElement: ElementRef | undefined;
  @ViewChildren('icon') iconsElements!: ElementRef[];

  constructor() {
    this.iconsUrl = [
      'assets/images/icons-band/css.png',
      'assets/images/icons-band/github.png',
      'assets/images/icons-band/html.png',
      'assets/images/icons-band/git.png',
      'assets/images/icons-band/angular.png',
      'assets/images/icons-band/npm.png',
      'assets/images/icons-band/sass.png',
      'assets/images/icons-band/ts.png',
    ];
    this.translateY = 2;
    this.translateX = 1;
    this.firstImpact = false;
    this.direction = {
      down: true,
      up: false,
      left: false,
      right: true,
    };
    this.distance = {
      axisX: 0,
      axisY: 0,
    };
    this.spaceBetween = {
      default: 70,
      preImpact: 25,
      impact: 0,
      postImpact: 25,
    };
    this.spaceActual = this.spaceBetween.impact;
  }
  ngOnInit() {
    this.resetDistance();
  }
  ngAfterViewInit() {
    this.containerElement = this.container.presentationContainer
    this.moveIcons();
  }
  moveIcons() {
    if (this.containerElement) {
      const limitsContainer = this.containerElement.nativeElement.getBoundingClientRect();

      this.setIntervalId = window.setInterval(() => {
        this.iconsElements.forEach((iconElement, index) => {
          const icon = iconElement.nativeElement;
          const coordinatesIcon = icon.getBoundingClientRect();
          if (coordinatesIcon.top <= limitsContainer.top) {
            if (this.direction.up && this.direction.left) {
              //
            } else {
              //
            }
            this.resetDistance();
            this.invertDirection(this.direction);
          } else if (coordinatesIcon.bottom <= limitsContainer.bottom) {
            if (this.direction.down && this.direction.right) {
              //
            } else {
              //
            }
            this.resetDistance();
            this.invertDirection(this.direction);
          } else if (coordinatesIcon.left <= limitsContainer.left) {
            if (this.direction.left && this.direction.up) {
              //
            } else {
              //
            }
            this.resetDistance();
            this.invertDirection(this.direction);
          } else if (coordinatesIcon.right <= limitsContainer.right) {
            if (this.direction.right && this.direction.down) {
              //
            } else {
              //
            }
            this.resetDistance();
            this.invertDirection(this.direction);
          }
          //comprobar la dirección y en función de ello mover el icono
          //comprobar la distancia del icono a su límite y en función de ello aumentar el espacio entre ellos
          //Investigar como crear una animación de apertura y cierre de los iconos
          //Investigar como crear una animación de movimiento de los iconos
          //Prioridad el tema de crear las animaciones ya que al espacio entre ellos le tengo que poner tiempo y 
          // va a interferir en el movimiento si todos son transform translate
          // icon.style.transform = `translate(${distance.axisX}px, ${distance.axisY}px)`;
        });
        this.distance.axisX += this.translateX;
        this.distance.axisY += this.translateY;
      }, 100);
    }
  }
  invertDirection(direction: Directions) {
    this.direction = {
      down: !direction.down,
      up: !direction.up,
      left: !direction.left,
      right: !direction.right,
    };
  }
  resetDistance() {
    this.distance.axisX = 0;
    this.distance.axisY = 0;
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    clearInterval(this.setIntervalId);
    this.moveIcons();
  }
}
