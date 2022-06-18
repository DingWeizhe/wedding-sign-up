import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('container')
  public container!: ElementRef<HTMLElement>;

  @ViewChild('bg')
  public bg!: ElementRef<HTMLElement>;

  public ngAfterViewInit(): void {
    this.onWindowsResize();
  }

  @HostListener('window:resize')
  public onWindowsResize() {
    const height = window.visualViewport?.height ?? window.innerHeight;
    this.container.nativeElement.style.height = height + 'px';
    this.bg.nativeElement.style.height = height + 'px';
  }
}
