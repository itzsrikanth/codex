import { Component, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';
import { MasterService } from './master.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('cursor', { read: ElementRef }) cursor: ElementRef;
  menu: boolean;            // to save state of expand / collapse menu
  transform: SafeStyle;     // to control screen transition during menu click

  constructor(
    private sanitizer: DomSanitizer,
    private master: MasterService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let mouseMove$ = Observable.fromEvent(window, 'mousemove')
    this.master.animationFrame$
      .withLatestFrom(mouseMove$, (frame, position) => position)
      .map((event: MouseEvent) => ({
        x: event.clientX,
        y: event.clientY
      }))
      .scan((start, end) => {
        let dx = end.x - start.x,
            dy = end.y - start.y;
        return {
          x: start.x + dx * .05,
          y: start.y + dy * .05
        };
      }).subscribe(coord => {
        this.cursor.nativeElement.style.left = coord.x - 10 + 'px';
        this.cursor.nativeElement.style.top = coord.y - 10 + 'px';
      });
  }

  getMenu() {
    if (this.menu) {
      this.menu = false;
      this.transform = this.sanitizer.bypassSecurityTrustStyle('none');
    } else {
      this.menu = true;
      this.transform = this.sanitizer.bypassSecurityTrustStyle('scale(0.7) translateX(-30vw)');
    }
  }

}
