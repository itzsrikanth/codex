import { Injectable } from '@angular/core';
import { Observable, Scheduler } from 'rxjs/Rx';

@Injectable()
export class MasterService {

  scrollTrigger: Observable<number>;
  
  documentWheel$ = Observable.fromEvent(document, 'wheel')
    .throttleTime(400)
    .map((event: MouseWheelEvent) => event.deltaY > 0);

  animationFrame$ = Observable.interval(0, Scheduler.animationFrame);
  
}
