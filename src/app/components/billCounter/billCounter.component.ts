import { Component, Input, ViewChildren, QueryList, ElementRef } from '@angular/core';

@Component({
  selector: 'bill-counter',
  templateUrl: './billCounter.component.html',
  styleUrls: ['./billCounter.component.scss']
})
export class BillCounterComponent {

  @ViewChildren('billboard', { read: ElementRef }) billboard: QueryList<ElementRef>;
  @Input() value = '1992';
  @Input() height = 200;
  @Input() width = 150;
  @Input() duration = 80;
  _value: Array<string>;
  numbers: Array<number>;
  anime = {
    topHalf: [
      { transform: 'rotateX(0deg)' },
      { transform: 'rotateX(-90deg)' }
    ],
    topFull: [
      { transform: 'rotateX(-90deg)' },
      { transform: 'rotateX(-180deg)' }
    ],
    bottomHalf: [
      { transform: 'rotateX(180deg)' },
      { transform: 'rotateX(90deg)' }
    ],
    bottomFull: [
      { transform: 'rotateX(90deg)' },
      { transform: 'rotateX(0deg)' }
    ],
    op: {
      duration: this.duration,
      fill: 'forwards'
    }
  }

  ngOnInit() {
    document.documentElement.style.setProperty('--bill-width', this.width + 'px');
    document.documentElement.style.setProperty('--bill-height', this.height + 'px');
    this.numbers = Array(10).fill(0)
      .map((value, index) => index)
      .reverse();
    this._value = this.value.split('');
  }

  ngAfterViewInit() {
      this.run();
  }

  run() {
    this.billboard.forEach((bill, index) => {
      var target = +this._value[index];
      var bottoms = bill.nativeElement.getElementsByClassName('bottom');
      var tops = bill.nativeElement.getElementsByClassName('top');
      var len: number = bottoms.length;
      bottoms[len - 1].animate(this.anime.bottomHalf, this.anime.op)
        .onfinish = () => {
          bottoms[len - 1].animate(this.anime.bottomFull, this.anime.op);
          this.animeFn(len - 2, 0, tops, bottoms, target);
        }
    });
  }

  animeFn(index, count, tops, bottoms, target) {
    tops[index + 1].animate(this.anime.topHalf, this.anime.op);
    bottoms[index].animate(this.anime.bottomHalf, this.anime.op)
      .onfinish = () => {
        bottoms[index].style.zIndex = 10 + count;
        tops[index + 1].animate(this.anime.topFull, this.anime.op);
        bottoms[index].animate(this.anime.bottomFull, this.anime.op);
        if (+bottoms[index].innerText !== target) {
          this.animeFn(index - 1, count + 1, tops, bottoms, target);
        }
      }
  }

}
