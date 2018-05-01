import { Component, OnChanges, SimpleChanges, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
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
  @ViewChild('modal', {read: ElementRef}) modal: ElementRef;
  menu: boolean;            // to save state of expand / collapse menu
  transform: SafeStyle;     // to control screen transition during menu click

  constructor(
    private sanitizer: DomSanitizer,
    public master: MasterService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.master.menu$
      .subscribe(bool => this.menu = bool);
  }

  ngAfterViewInit() {
    let mouseMove$ = Observable.fromEvent(window, 'mousemove');
    this.changeDetector.detectChanges();
    this.master.modalElement = <HTMLDivElement>this.modal.nativeElement;
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
        this.cursor.nativeElement.style.left = coord.x + 5 + 'px';
        // this.cursor.nativeElement.style.left = coord.x - 10 + 'px';
        this.cursor.nativeElement.style.top = coord.y + 5 + 'px';
        // this.cursor.nativeElement.style.top = coord.y - 10 + 'px';
      });
  }

  getMenu() {
    var transform;
    if (this.menu) {
      this.master.menu$.next(false);
      transform = this.sanitizer.bypassSecurityTrustStyle('none');
    } else {
      this.master.menu$.next(true);
      transform = this.sanitizer.bypassSecurityTrustStyle('scale(0.7) translateX(-30vw)');
    }
    this.master.transform$.next(transform);
  }

}
