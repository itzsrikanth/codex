import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ParallaxComponent } from './parallax/parallax.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
    { path: 'home', component: ParallaxComponent },
    { path: 'products', component: ProductsComponent },
    { path: '**', component: ParallaxComponent }
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