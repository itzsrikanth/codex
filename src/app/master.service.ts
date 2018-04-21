import { Injectable } from '@angular/core';
import { Observable, Scheduler, Subject } from 'rxjs/Rx';

@Injectable()
export class MasterService {

  scrollTrigger: Observable<number>;

  documentWheel$ = Observable.fromEvent(document, 'wheel')
    .throttleTime(400)
    .map((event: MouseWheelEvent) => event.deltaY / 125);

  animationFrame$ = Observable.interval(0, Scheduler.animationFrame);

  transform$ = new Subject<any>();
  menu$ = new Subject<boolean>();
  
}
