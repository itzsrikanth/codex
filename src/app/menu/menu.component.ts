import { Component } from '@angular/core';

@Component({
  selector: 'menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['./menu.component.scss']
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
      href: '',
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
  
}