import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UIGuard } from './UI.guard';
import { ParallaxHomeComponent } from './parallax/parallaxHome.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
    { path: 'home', component: ParallaxHomeComponent },
    { path: 'products', component: ProductsComponent },
    { path: '**', component: ParallaxHomeComponent }
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