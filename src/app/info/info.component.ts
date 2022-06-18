import { Component } from '@angular/core';
import { fadeIn } from '../animation/fade-in';
import { grow } from '../animation/grow';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  animations: [grow, fadeIn],
})
export class InfoComponent {
  public status = 'initial';
}
