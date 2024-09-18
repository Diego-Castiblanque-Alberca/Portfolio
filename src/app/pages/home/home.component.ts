import {
  Component,
  ElementRef,
  HostListener,
  ViewChild, OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { PresentationComponent } from '../../shared/components/presentation/presentation.component';
import { ProjectsListComponent } from '../../shared/components/projects-list/projects-list.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavBarComponent,
    CommonModule,
    PresentationComponent,
    ProjectsListComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  previousScrollPosition!: number;
  scrollActive: boolean = true;
  //referenceTimeOut: NodeJS.Timeout | null = null;

  ngOnInit() {
    this.previousScrollPosition = window.scrollY;
  }

  @HostListener('window:scroll', [])
  nextSecction() {
    if (window.innerWidth > 992 && this.scrollActive) {
      window.document.body.style.overflow = 'hidden';
      this.scrollActive = false;
      const currentScrollPosition: number = window.scrollY;
      const viewportHeight: number = window.visualViewport ? window.visualViewport.height : window.innerHeight;
      if (currentScrollPosition > this.previousScrollPosition) {
        window.scroll(0, this.previousScrollPosition + viewportHeight);
        this.previousScrollPosition += viewportHeight;
      } else if (currentScrollPosition < this.previousScrollPosition) {
        window.scroll(0, this.previousScrollPosition - viewportHeight);
        this.previousScrollPosition -= viewportHeight;
      }
      setTimeout(() => {
        this.scrollActive = true;
        window.document.body.style.overflow = 'scroll';
      }, 1200);
    }
  }
}
