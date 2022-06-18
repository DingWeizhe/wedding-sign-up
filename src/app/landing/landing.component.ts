import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { grow } from '../animation/grow';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  animations: [grow],
})
export class LandingComponent {
  public status = 'initial';

  public constructor(private readonly _router: Router) {}

  public info() {
    this.status = 'exit';
    setTimeout(() => {
      this._router.navigateByUrl('/info');
    }, 1000);
  }
}
