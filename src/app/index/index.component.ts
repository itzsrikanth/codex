import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {

  @ViewChild('cv', { read: ElementRef }) cv: ElementRef;
  dummy = [];
  cpSubs = [
    {},
    {},
    {},
    {},
    {},
  ];

  ngOnInit() {
    this.dummy = Array(11).fill(0);
    document.documentElement.style.setProperty('--cvWidth', this.cv.nativeElement.offsetWidth + 'px');
  }

}
