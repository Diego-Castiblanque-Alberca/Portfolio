import { Component } from '@angular/core';
import { IdentidyCardComponent } from './identidy-card/identidy-card.component';
import { AboutMeComponent } from './about-me/about-me.component';

@Component({
  selector: 'app-presentation',
  standalone: true,
  imports: [IdentidyCardComponent, AboutMeComponent],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.scss'
})
export class PresentationComponent {

}
