import { Component, HostListener } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'jumbo-hover',
  templateUrl: './jumboHover.component.html',
  styleUrls: ['./jumboHover.component.scss']
})
export class JumboHoverComponent {

  transform: SafeStyle;

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    let win = {
      x: window.innerWidth/2,
      y: window.innerHeight/2
    };
    // let current = { ...win };
    // console.log(win);
    Observable.fromEvent(document.body, 'mousemove')
      .subscribe((event: MouseEvent) => {
        this.transform = this.sanitizer.bypassSecurityTrustStyle(
          'rotateY(' + +((event.clientX / win.x) - 1).toFixed(2) * 2 + 
          'deg) rotateX(' + +((event.clientY / win.y) - 1).toFixed(2) * 5 + 'deg)'
        );
      });

    Observable.fromEvent(window, 'resize')
      .subscribe((event: MouseEvent) => {
        win.x = window.innerWidth/2;
        win.y = window.innerHeight/2;
      });
  }
}
