import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import QRCodeStyling from 'qr-code-styling';
import { map } from 'rxjs';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
})
export class SuccessComponent implements AfterViewInit {
  @ViewChild('qrCode')
  public qrCodeDom!: ElementRef<HTMLDivElement>;

  private readonly _signUpId$ = this._activatedRoute.queryParamMap.pipe(
    map((paramMap) => paramMap.get('signUpId'))
  );

  public readonly url$ = this._signUpId$.pipe(
    map((signUpId) => {
      const url = new URL('https://liff.line.me/1657230630-R44dzmb0');
      if (signUpId) url.searchParams.append('signUpId', signUpId);
      return url.toString();
    })
  );

  public constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute
  ) {}

  public ngAfterViewInit(): void {
    if (localStorage.getItem('arrived') === null) {
      this._router.navigate(['landing'], { queryParamsHandling: 'merge' });
    }

    this.url$.subscribe((url) => this.updateQrCode(url));
  }

  private updateQrCode(url: string) {
    const qrCodeStyling = new QRCodeStyling({
      width: 200,
      height: 200,
      type: 'svg',
      data: url,
      image: './assets/line-icon.png',
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 5,
      },
      margin: 0,
      dotsOptions: {
        color: '#5AC463',
        type: 'rounded',
      },
      backgroundOptions: {
        color: 'rgba(255,255,255,0)',
      },
    });

    if (this.qrCodeDom) {
      qrCodeStyling.append(this.qrCodeDom.nativeElement);
    }
  }
}
