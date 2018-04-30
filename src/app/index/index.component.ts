import { Component, ViewChild, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { MasterService } from '../master.service';

@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {

  @ViewChild('cv', { read: ElementRef }) cv: ElementRef;
  @ViewChild('pinger', {read: ElementRef}) pinger: ElementRef;
  dummy: Array<number>;
  cpSubs = [
    {},
    {},
    {},
    {},
    {},
  ];
  pingList = [
    'podcast',
    'superpowers',
    'microchip',
    'area-chart',
    'bug',
    'coffee',
    'compass',
    'university'
  ];
  pingModal: boolean;
  modalClickSubs$: Subscription;

  constructor(
    private renderer: Renderer2,
    private changeDetector: ChangeDetectorRef,
    private master: MasterService
  ) { }

  ngOnInit() {
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
    this.renderer.setStyle(tmp, 'position', 'absolute');
    this.renderer.setStyle(tmp, 'background', 'red');
    this.renderer.setStyle(tmp, 'width', pingTarget.offsetWidth + 'px');
    this.renderer.setStyle(tmp, 'height', pingTarget.offsetHeight + 'px');
    this.renderer.setStyle(tmp, 'border-radius', '50%');
    this.renderer.setStyle(tmp, 'transform', 'scale(0.2)');
    this.renderer.setStyle(tmp, 'top', pingCoord.top.toFixed(2) + 'px');
    this.renderer.setStyle(tmp, 'left', pingCoord.left.toFixed(2) + 'px');
    // this.changeDetector.detectChanges();
    pingTarget.classList.add('active');
    this.renderer.appendChild(this.master.modalElement, tmp);
  }

}
