import { Component, Input, OnChanges, SimpleChanges, ComponentFactoryResolver, ViewContainerRef,
  ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { MasterService } from '../master.service';
import { IndexComponent } from '../index/index.component';
import { BgWatermarkComponent } from '../bgWatermark/bgWatermark.component';

@Component({
  selector: 'parallax',
  templateUrl: './parallax.component.html',
  styleUrls: ['./parallax.component.scss']
})
export class ParallaxComponent implements OnChanges {

  @ViewChildren('viewContainer', { read: ViewContainerRef}) containers: QueryList<ViewContainerRef>;
  @ViewChild('wrapper', { read: ElementRef}) wrapper: ElementRef;
  @Input() transform = 'none';
  pages: Array<any> = [
    IndexComponent,  // foreground
    BgWatermarkComponent, // background
  ];
  buffer = [];

  constructor(
    private componentFactory: ComponentFactoryResolver,
    private master: MasterService
  ) { }

  ngAfterViewInit() {
    // this.pages = new Array(5).fill(0);
    console.log(this.containers)
    this.containers.forEach((container, index) => {
      let factory = this.componentFactory.resolveComponentFactory(this.pages[index]);
      container.clear();
      container.createComponent(factory);
    });

    this.master.scrollTrigger  = Observable.fromEvent(this.wrapper.nativeElement, 'scroll')
        .throttleTime(100)
        .map(event => event['target'].scrollTop);
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
  }

}
