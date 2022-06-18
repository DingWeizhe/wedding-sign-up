import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { grow } from '../animation/grow';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  animations: [grow],
})
export class LandingComponent implements AfterViewInit {
  public status = 'initial';

  public constructor(private readonly _router: Router) {}

  public ngAfterViewInit(): void {
    setTimeout(() => this.form(), 5000);
  }

  public form() {
    this.status = 'exit';
    setTimeout(() => this._router.navigateByUrl('/form'), 1000);
  }
}
