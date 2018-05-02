import { Component } from '@angular/core';
import { trigger, style, state, animate, transition } from '@angular/animations';

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
  menus = [
    {
      name: 'home',
      href: '/home'
    }, {
      name: 'about us',
      href: ''
    }, {
      name: 'products',
      href: '/products',
      subsState: 'collapsed',
      subs: [
        {
          name: 'Magnalium Powder (Mg/Al Alloy Powder)',
          href: ''
        }, {
          name: 'Magnesium Powder',
          href: ''
        }, {
          name: 'Aluminium Powder',
          href: ''
        }
      ]
    }, {
      name: 'research & Development',
      href: ''
    }, {
      name: 'production technology',
      href: ''
    },{
      name: 'Production Quality',
      href: ''
    },{
      name: 'contact us',
      subsState: 'collapsed',
      subs: [
        {
          name: 'online queries',
          href: ''
        }
      ]
    }, {
      name: 'terms & conditions',
      href: ''
    }
  ];

  menuState(menuObj) {
    if (menuObj.subsState)
      menuObj.subsState = menuObj.subsState === 'collapsed' ? 'expanded' : 'collapsed';
  }
  
}