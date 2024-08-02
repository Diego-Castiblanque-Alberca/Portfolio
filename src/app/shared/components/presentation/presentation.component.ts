import { Component } from '@angular/core';
import { IdentidyCardComponent } from './identidy-card/identidy-card.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { AnimatedBandComponent } from './animated-band/animated-band.component';

@Component({
  selector: 'app-presentation',
  standalone: true,
  imports: [IdentidyCardComponent, AboutMeComponent, AnimatedBandComponent],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.scss',
})
export class PresentationComponent {}
