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

  // modal popup related variables
  modalClick$ = new Subject<any>();
  modalElement: HTMLDivElement;
  private _modalShow: boolean;
  get modalShow (): boolean {
    return this._modalShow;
  }
  set modalShow(bool) {
    this._modalShow = bool;
    if (!bool) {
      this.modalElement.style.transform = 'translateX(-100vw)';
    } else {
      this.modalElement.innerHTML = '';
      this.modalElement.style.transform = 'translateX(0vw)';
    }
  }
  
}
