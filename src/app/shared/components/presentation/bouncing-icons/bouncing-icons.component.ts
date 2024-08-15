import { Component, ElementRef, Input, ViewChildren, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bouncing-icons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bouncing-icons.component.html',
  styleUrl: './bouncing-icons.component.scss',
})
export class BouncingIconsComponent implements AfterViewInit {
  icons: string[];
  inicialPosition: number;
  preImpactPosition: number;
  impactPosition: number;
  postImpactPosition: number;
  normalPosition: number;

  @Input() obstacles!: ElementRef[];
  @Input() iconsContainer!: ElementRef;
  @ViewChildren('icon') iconsElements!: ElementRef[];

  constructor() {
    this.icons = [
      'assets/images/icons-band/css.png',
      'assets/images/icons-band/github.png',
      'assets/images/icons-band/html.png',
      'assets/images/icons-band/git.png',
      'assets/images/icons-band/angular.png',
      'assets/images/icons-band/npm.png',
      'assets/images/icons-band/sass.png',
      'assets/images/icons-band/ts.png',
    ];
    this.inicialPosition = 80;
    this.preImpactPosition = 30;
    this.impactPosition = 10;
    this.postImpactPosition = 30;
    this.normalPosition = 70;
  }
  ngAfterViewInit() {
    this.inicialPositionIcons();
    this.moveIcons();
  }
  inicialPositionIcons() {
    this.iconsElements.forEach((icon, index) => {
      icon.nativeElement.style.transform = `translate(-${this.inicialPosition * index}%, -${this.inicialPosition * index}%)`;
    });
  }
  moveIcons() {

  }
}
