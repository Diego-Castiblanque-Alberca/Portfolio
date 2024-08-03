import { Component, ViewChild, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { AnimatedBandComponent } from './animated-band/animated-band.component';
@Component({
  selector: 'app-two-animated-bands',
  standalone: true,
  imports: [AnimatedBandComponent],
  templateUrl: './two-animated-bands.component.html',
  styleUrl: './two-animated-bands.component.scss'
})
export class TwoAnimatedBandsComponent implements OnInit {
  @ViewChild('containerBands', { static: true }) containerBands!: ElementRef;
  containerRotated: number;

  constructor() {
    this.containerRotated= 0;
  }

  ngOnInit() {
    this.containerRotated = this.getRotationDegrees(this.containerBands);
  }
  getRotationDegrees(element: ElementRef): number {
    const transform = window.getComputedStyle(element.nativeElement).transform;
    if (transform === 'none') return 0;
    const values = transform.split('(')[1].split(')')[0].split(',');
    const a = parseFloat(values[0]);
    const b = parseFloat(values[1]);
    const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    return angle;
  }
}

