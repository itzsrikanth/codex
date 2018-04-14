import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
// import { TypoService } from './typo.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  menu: boolean;            // to save state of expand / collapse menu
  transform: SafeStyle;     // to control screen transition during menu click

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
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
