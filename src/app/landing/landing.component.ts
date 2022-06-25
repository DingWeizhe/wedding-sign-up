import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { grow } from '../animation/grow';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styles: [
    `
      :host {
        display: inline-block;
        width: 100%;
      }
    `,
  ],
  animations: [grow],
})
export class LandingComponent implements AfterViewInit {
  public status = 'initial';

  public isSenior$ = this._activatedRoute.queryParams.pipe(
    map((params) => params['mode'] === 'senior')
  );

  public constructor(
    private readonly _router: Router,
    private readonly _elementRef: ElementRef,
    private readonly _activatedRoute: ActivatedRoute
  ) {}

  public ngAfterViewInit(): void {
    this.onWindowsResize();
    localStorage.setItem('arrived', 'true');
    setTimeout(() => this.form(), 5000);
  }

  public form() {
    this.status = 'exit';
    setTimeout(
      () => this._router.navigate(['form'], { queryParamsHandling: 'merge' }),
      1000
    );
  }

  @HostListener('window:resize')
  public onWindowsResize() {
    let height = window.visualViewport?.height ?? window.innerHeight;
    if (window.innerWidth < 460) {
      this._elementRef.nativeElement.style.height = height - 20 + 'px';
    } else {
      this._elementRef.nativeElement.style.height = '100%';
    }
    // this.container.nativeElement.style.height = height + 'px';
    // this.inner.nativeElement.style.height = height - 20 + 'px';
  }
}
