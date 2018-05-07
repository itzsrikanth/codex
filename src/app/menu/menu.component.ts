import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { trigger, style, state, animate, transition } from '@angular/animations';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('menuHeight', [
      state('expanded', style({
        height: '*'
      })),
      state('collapsed', style({
        height: 0
      })),
      transition('* => *', animate(300))
    ])
  ]
})
export class MenuComponent {

  menus: Observable<Array<any>>;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.menus = <Observable<Array<any>>>this.http.get('/assets/data/menu.json');
  }

  menuState(menuObj) {
    if (menuObj.subsState)
      menuObj.subsState = menuObj.subsState === 'collapsed' ? 'expanded' : 'collapsed';
  }
  
}