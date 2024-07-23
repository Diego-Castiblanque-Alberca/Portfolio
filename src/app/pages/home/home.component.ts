import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { PresentationComponent } from '../../shared/components/presentation/presentation.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent, CommonModule, PresentationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
