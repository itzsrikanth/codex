import { Component, ViewChild, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Observable, Subscription, Subject } from 'rxjs/Rx';
import { MasterService } from '../master.service';
import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';
import { fadeStagger } from '../animations';

@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [

    trigger('fadeEntry', [
      transition('void => *', [
        style({
          transform: 'translateX(-50vw)',
          opacity: 0
      }), animate(700, style({
        transform: 'translateY(0vw)',
        opacity: 1
      }))]),
    ]),

    fadeStagger,

    trigger('alternateStagger', [
      transition('void => *', [
        query('.alternate-even', style({
          transform: 'translateY(100px)',
          opacity: 0
        })),
        query('.alternate-even', stagger('1000ms', [
          animate(5000, style({
            transform: 'translateY(0px)',
            opacity: 1
          }))
        ])),
        query('.alternate-odd', style({
          transform: 'translateY(-100px)',
          opacity: 0
        })),
        query('.alternate-odd', stagger('1000ms', [
          animate(5000, style({
            transform: 'translateY(0px)',
            opacity: 1
          }))
        ]))
      ])
    ])

  ]
})
export class IndexComponent {

  @ViewChild('cv', { read: ElementRef }) cv: ElementRef;
  @ViewChild('pinger', { read: ElementRef }) pinger: ElementRef;
  dummy: Array<number>;
  typoAnime = [
    'Pioneers in Non Metal Powder Metallurgy',
    'Global Leaders in Industry'
  ];
  cpSubs = [
    {
      class: 'random',
      title: 'quality',
      link: ''
    },
    {
      class: 'shopping-cart',
      title: 'book',
      link: ''
    },
    {
      class: 'space-shuttle',
      title: 'meet us',
      link: '/contactus'
    },
    {
      class: 'ticket',
      title: 'brochure',
      link: ''
    },
    {
      class: 'refresh',
      title: 'contacts',
      link: '/contactus'
    },
  ];
  // pingList = new Subject<Array<any>>();
  pingList = [{
    class: 'podcast',
    title: 'podcast',
    link: '/about-us'
  }, {
    class: 'superpowers',
    title: 'quality',
    link: ''
  }, {
    class: 'microchip',
    title: 'technology',
    link: ''
  }, {
    class: 'area-chart',
    title: 'achievements',
    link: ''
  }, {
    class: 'bug',
    title: 'milestones',
    link: ''
  }, {
    class: 'coffee',
    title: 'contact us',
    link: '/contactus'
  }, {
    class: 'compass',
    title: 'directions',
    link: '/contactus'
  }, {
    class: 'university',
    title: 'join us',
    link: ''
  }];
  pingModal: boolean;
  modalClickSubs$: Subscription;
  transform: SafeStyle;

  // animation triggers
  headPoints: boolean;
  sb: boolean;
  pingPong: boolean;
  arc: boolean;
  windows: boolean;

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
  
  ngAfterViewInit() {
    let headPtSubs = Observable.interval(1500)
      .subscribe(() => {
        this.headPoints = true;
        headPtSubs.unsubscribe();
      });

    this.master.scrollTrigger
      .subscribe(value => {
        if (value > 500) {
          this.sb = true;
        }
        if (value > 1100) {
          this.pingPong = true;
        }
        if (value > 1700) {
          this.arc = true;
        }
        if (value > 2500) {
          this.windows = true;
        }
      });
  }

  pingExpander(event) {
    let pingTarget: HTMLDivElement = <HTMLDivElement>event.target;
    var pingCoord = pingTarget.getBoundingClientRect();
    console.log(pingCoord);
    this.renderer.addClass(pingTarget, 'activate');
    document.documentElement.style.setProperty('--ping-top', '-' + pingCoord.top.toFixed(2));
  }

}
