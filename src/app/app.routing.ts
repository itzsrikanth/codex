import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UIGuard } from './UI.guard';
import { CanDeactivateGuard } from './canDeactivateGuard';
import { ParallaxHomeComponent } from './parallax/parallaxHome.component';
import { ProductsComponent } from './products/products.component';
import { ContactUsComponent } from './contactUs/contactUs.component';

const routes: Routes = [
    { path: 'home', component: ParallaxHomeComponent, canDeactivate: [CanDeactivateGuard] },
    { path: 'products', component: ProductsComponent, canDeactivate: [CanDeactivateGuard] },
    { path: 'contactus', component: ContactUsComponent, canDeactivate: [CanDeactivateGuard] },
    { path: '**', component: ParallaxHomeComponent, canDeactivate: [CanDeactivateGuard] }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRouting { }