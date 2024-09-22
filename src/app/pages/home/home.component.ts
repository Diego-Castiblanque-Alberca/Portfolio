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
  @ViewChild('homeContainer', { static: true })
  homeContainer!: ElementRef;

  ngOnInit() {
    this.previousScrollPosition = window.document.body.offsetTop;
  }

  @HostListener('window:scroll', ['$event'])
  nextSecction(event: Event) {
    if (window.innerWidth < 992 || !this.scrollActive) return;
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
    console.log(window.document.body.offsetTop);
    setTimeout(() => {
      this.scrollActive = true;
      window.document.body.style.overflow = 'scroll';
    }, 1200);
  }
}
