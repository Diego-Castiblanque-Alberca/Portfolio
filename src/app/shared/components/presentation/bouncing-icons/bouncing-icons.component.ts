import {
  Component,
  ElementRef,
  Input,
  ViewChildren,
  AfterViewInit,
  HostListener,
  QueryList,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresentationComponent } from '../presentation.component';
import { Directions } from './directions';
import { Distances } from './distances';
import { Sides } from './sides';

@Component({
  selector: 'app-bouncing-icons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bouncing-icons.component.html',
  styleUrl: './bouncing-icons.component.scss',
})
export class BouncingIconsComponent implements AfterViewInit {
  iconsUrl: string[];
  axisXDisplacement: number;
  axisYDisplacement: number;
  axisXDisplacementCalculated: number;
  axisYDisplacementCalculated: number;
  distanceTravelled: Distances;
  direction: Directions;
  spaceBetween: number;
  setIntervalId: number | undefined;
  orderCounter: number;

  @Input() container!: PresentationComponent;
  containerElement: ElementRef | undefined;
  @ViewChildren('icon') iconsElements!: QueryList<ElementRef>;
  @ViewChild('iconsContainer') iconsContainer!: ElementRef;
  @ViewChildren('img') imgs!: QueryList<ElementRef>;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
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
    this.axisXDisplacement = 3;
    this.axisYDisplacement = 3;
    this.axisXDisplacementCalculated = 0;
    this.axisYDisplacementCalculated = 0;
    this.spaceBetween = 1.2;
    this.direction = {
      down: true,
      up: false,
      left: false,
      right: true,
    };
    this.distanceTravelled = {
      axisX: 0,
      axisY: 0,
    };
    this.orderCounter = 0;
  }

  ngAfterViewInit() {
    this.containerElement = this.container.presentationContainer;
    this.moveIcons();
    window.setTimeout(() => {
      this.iconsContainer.nativeElement.style.width =
        this.iconsElements.first.nativeElement.offsetWidth + 'px';
      this.iconsContainer.nativeElement.style.height =
        this.iconsElements.first.nativeElement.offsetHeight + 'px';
    }, 200);
  }
  moveIcons() {
    if (this.containerElement) {
      const limitsContainer =
        this.containerElement.nativeElement.getBoundingClientRect();
      this.setIntervalId = window.setInterval(() => {
        const coordinatesIcon =
          this.iconsContainer.nativeElement.getBoundingClientRect();
        //comprobar si el icono está en el límite del contenedor y en función de ello cambiar la dirección
        this.checkImpact(coordinatesIcon, limitsContainer);
        //Calcular la dirección del movimiento
        this.cuantityMovementAndDirection();
        //Calcular el espacio entre los iconos
        // this.calculateSpaceBetween(coordinatesIcon, limitsContainer);
        this.setSpaceBetweenIcons(this.direction);
        this.distanceTravelled.axisX += this.axisXDisplacementCalculated;
        this.distanceTravelled.axisY += this.axisYDisplacementCalculated;
        this.iconsContainer.nativeElement.style.transform = `translate(${this.distanceTravelled.axisX}px, ${this.distanceTravelled.axisY}px)`;
      }, 10);
    }
  }
  changeIconOnImpact() {
    if (this.orderCounter === this.imgs.length - 1) {
      this.orderCounter = 0;
    }
    this.imgs
      .toArray()[0]
      .nativeElement.setAttribute('src', this.iconsUrl[this.orderCounter + 1]);
    this.orderCounter++;
  }
  setSpaceBetweenIcons(direction: Directions) {
    this.iconsElements.forEach((icon, index) => {
      icon.nativeElement.style.zIndex = this.iconsElements.length - index + '';
      icon.nativeElement.style.transition = 'transform 0.25s';
      if (direction.down && direction.right) {
        icon.nativeElement.style.transform = `translate(-${this.spaceBetween * index}px, -${this.spaceBetween * index}px)`;
      } else if (direction.down && direction.left) {
        icon.nativeElement.style.transform = `translate(${this.spaceBetween * index}px, -${this.spaceBetween * index}px)`;
      } else if (direction.up && direction.right) {
        icon.nativeElement.style.transform = `translate(-${this.spaceBetween * index}px, ${this.spaceBetween * index}px)`;
      } else if (direction.up && direction.left) {
        icon.nativeElement.style.transform = `translate(${this.spaceBetween * index}px, ${this.spaceBetween * index}px)`;
      }
    });
  }

  cuantityMovementAndDirection() {
    if (this.direction.up && this.direction.left) {
      this.axisXDisplacementCalculated = -this.axisXDisplacement;
      this.axisYDisplacementCalculated = -this.axisYDisplacement;
    } else if (this.direction.down && this.direction.left) {
      this.axisXDisplacementCalculated = -this.axisXDisplacement;
      this.axisYDisplacementCalculated = this.axisYDisplacement;
    } else if (this.direction.up && this.direction.right) {
      this.axisXDisplacementCalculated = this.axisXDisplacement;
      this.axisYDisplacementCalculated = -this.axisYDisplacement;
    } else if (this.direction.down && this.direction.right) {
      this.axisXDisplacementCalculated = this.axisXDisplacement;
      this.axisYDisplacementCalculated = this.axisYDisplacement;
    }
  }
  checkImpact(coordinatesIcon: DOMRect, limitsContainer: DOMRect) {
    if (coordinatesIcon.top <= limitsContainer.top) {
      this.invertDirection(Sides.top, this.direction);
      this.changeIconOnImpact();
    } else if (coordinatesIcon.bottom >= limitsContainer.bottom) {
      this.invertDirection(Sides.bottom, this.direction);
      this.changeIconOnImpact();
    } else if (coordinatesIcon.left <= limitsContainer.left) {
      this.invertDirection(Sides.left, this.direction);
      this.changeIconOnImpact();
    } else if (coordinatesIcon.right >= limitsContainer.right) {
      this.invertDirection(Sides.right, this.direction);
      this.changeIconOnImpact();
    }
  }
  invertDirection(side: string, direction: Directions) {
    switch (side) {
      case Sides.top:
        direction.down = true;
        direction.up = false;
        break;
      case Sides.bottom:
        direction.down = false;
        direction.up = true;
        break;
      case Sides.left:
        direction.right = true;
        direction.left = false;
        break;
      case Sides.right:
        direction.right = false;
        direction.left = true;
        break;
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    clearInterval(this.setIntervalId);
    this.moveIcons();
  }
}
//comprobar la distancia del icono a su límite y en función de ello aumentar el espacio entre ellos
//Investigar como crear una animación de apertura y cierre de los iconos
//Investigar como crear una animación de movimiento de los iconos
//Prioridad el tema de crear las animaciones ya que al espacio entre ellos le tengo que poner tiempo y
// va a interferir en el movimiento si todos son transform translate
// icon.style.transform = `translate(${distance.axisX}px, ${distance.axisY}px)`;
