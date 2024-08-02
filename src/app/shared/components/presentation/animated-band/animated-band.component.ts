import { booleanAttribute, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-animated-band',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animated-band.component.html',
  styleUrl: './animated-band.component.scss'
})
export class AnimatedBandComponent {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ transform: booleanAttribute }) reverse: boolean;
  icons: string[];
  constructor() {
    this.reverse = false;
    this.icons = [
      '../../../../../assets/images/icons-band/angular.png',
      '../../../../../assets/images/icons-band/apache.png',
      '../../../../../assets/images/icons-band/aws.png',
      '../../../../../assets/images/icons-band/css.png',
      '../../../../../assets/images/icons-band/docker.png',
      '../../../../../assets/images/icons-band/git.png',
      '../../../../../assets/images/icons-band/github.png',
      '../../../../../assets/images/icons-band/html.png',
      '../../../../../assets/images/icons-band/java.png',
      '../../../../../assets/images/icons-band/js.png',
      '../../../../../assets/images/icons-band/laravel.png',
      '../../../../../assets/images/icons-band/mysql.png',
      '../../../../../assets/images/icons-band/npm.png',
      '../../../../../assets/images/icons-band/php.png',
      '../../../../../assets/images/icons-band/react.png',
      '../../../../../assets/images/icons-band/sass.png',
      '../../../../../assets/images/icons-band/ts.png',
      '../../../../../assets/images/icons-band/visual.png'
    ];
  }

}
