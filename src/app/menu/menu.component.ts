import { Component } from '@angular/core';

@Component({
  selector: 'menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  menus = [
    {
      name: 'home'
    }, {
      name: 'about us'
    }, {
      name: 'products',
      subs: [
        {
          name: 'Magnalium Powder (Mg/Al Alloy Powder)'
        }, {
          name: 'Magnesium Powder'
        }
      ]
    }, {
      name: 'research & Development'
    }, {
      name: 'production technology'
    },{
      name: 'contact us',
      subs: [
        {
          name: 'online queries'
        }
      ]
    }, {
      name: 'terms & conditions'
    }
  ];
  
}