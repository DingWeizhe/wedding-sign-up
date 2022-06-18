import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import QRCodeStyling from 'qr-code-styling';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
})
export class SuccessComponent implements AfterViewInit {
  @ViewChild('qrCode')
  public qrCodeDom!: ElementRef<HTMLDivElement>;

  private readonly _signUpId$ = this._activatedRoute.queryParamMap.pipe(
    map((paramMap) => paramMap.get('signUpId')),
    filter(Boolean)
  );

  public readonly url$ = this._signUpId$.pipe(
    map((signUpId) => {
      const url = new URL('https://3971.api.gosu.bar/customize/redirect');
      url.searchParams.append('signUpId', signUpId);
      return url.toString();
    })
  );

  public constructor(private readonly _activatedRoute: ActivatedRoute) {}

  public ngAfterViewInit(): void {
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
