import { Component, ViewChild, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Observable, Subscription, Subject } from 'rxjs/Rx';
import { MasterService } from '../master.service';

@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {

  @ViewChild('cv', { read: ElementRef }) cv: ElementRef;
  @ViewChild('pinger', { read: ElementRef }) pinger: ElementRef;
  dummy: Array<number>;
  cpSubs = [
    {
      class: 'random',
      title: 'quality'
    },
    {
      class: 'shopping-cart',
      title: 'book'
    },
    {
      class: 'space-shuttle',
      title: 'meet us'
    },
    {
      class: 'ticket',
      title: 'get brochure'
    },
    {
      class: 'refresh',
      title: 'contacts'
    },
  ];
  // pingList = new Subject<Array<any>>();
  pingList = [{
    class: 'podcast',
    title: 'podcast'
  }, {
    class: 'superpowers',
    title: 'quality'
  }, {
    class: 'microchip',
    title: 'technology'
  }, {
    class: 'area-chart',
    title: 'achievements'
  }, {
    class: 'bug',
    title: 'bug'
  }, {
    class: 'coffee',
    title: 'contact us'
  }, {
    class: 'compass',
    title: 'directions'
  }, {
    class: 'university',
    title: 'join us'
  }];
  pingModal: boolean;
  modalClickSubs$: Subscription;
  transform: SafeStyle;

  constructor(
    private renderer: Renderer2,
    private changeDetector: ChangeDetectorRef,
    private master: MasterService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {

    let win = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };
    Observable.fromEvent(document.body, 'mousemove')
      .subscribe((event: MouseEvent) => {
        this.transform = this.sanitizer.bypassSecurityTrustStyle(
          'rotateY(' + +((event.clientX / win.x) - 1).toFixed(2) * 2 +
          'deg) rotateX(' + +((event.clientY / win.y) - 1).toFixed(2) * 5 + 'deg)'
        );
      });


    this.dummy = Array(11).fill(0);
    document.documentElement.style.setProperty('--cvWidth', this.cv.nativeElement.offsetWidth + 'px');
    this.modalClickSubs$ = this.master.modalClick$
      .subscribe(() => {
        this.master.modalShow = false;
      });
  }

  ngOnDestroy() {
    this.modalClickSubs$.unsubscribe();
  }

  pingExpander(event) {
    this.master.modalShow = true;
    let pingTarget: HTMLDivElement = <HTMLDivElement>event.target;
    var pingCoord = pingTarget.getBoundingClientRect();
    var tmp = this.renderer.createElement('div');
    // this.renderer.setStyle(tmp, 'position', 'absolute');
    // this.renderer.setStyle(tmp, 'background', 'red');
    this.renderer.setStyle(tmp, 'width', pingTarget.offsetWidth + 'px');
    // this.renderer.setStyle(tmp, 'height', pingTarget.offsetHeight + 'px');
    // this.renderer.setStyle(tmp, 'border-radius', '50%');
    // this.renderer.setStyle(tmp, 'transform', 'scale(0.2)');
    this.renderer.setStyle(tmp, 'top', +pingCoord.top.toFixed(2) + (pingTarget.offsetHeight / 2) - 5 + 'px');
    this.renderer.setStyle(tmp, 'left', pingCoord.left.toFixed(2) + 'px');
    this.renderer.addClass(tmp, 'ping-expander');
    // this.changeDetector.detectChanges();
    pingTarget.classList.add('active');
    // tmp.classList.add('active');
    this.renderer.appendChild(this.master.modalElement, tmp);
    tmp.animate([
      { height: '0', 'border-radius': '50%' },
      { height: '10px', 'border-radius': '0%' },
      { transform: 'rotateZ(90deg)' },
    ], {
        fill: 'forwards',
        duration: 700
      });
  }

}
