import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { ParallaxComponent } from './parallax/parallax.component';
import { JumboHoverComponent } from './jumbo.hover/jumboHover.component';
import { GalleryComponent } from './gallery/gallery.component';

// services
import { MasterService } from './master.service';

import { MenuComponent } from './menu/menu.component';
import { IndexComponent } from './index/index.component';
import { ProductsComponent } from './products/products.component';
import { HoverInfoComponent } from './index/hover-info/HoverInfo.component';
import { SafariBrowserComponent } from './index/safariBrowser/SafariBrowser.component';
import { BgWatermarkComponent } from './bgWatermark/bgWatermark.component';

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule, 
    BrowserAnimationsModule,
    AppRouting
  ],
  declarations: [ 
    AppComponent, 
    ParallaxComponent, 
    JumboHoverComponent, 
    GalleryComponent,
    MenuComponent,
    IndexComponent,
    ProductsComponent,
    HoverInfoComponent,
    SafariBrowserComponent,
    BgWatermarkComponent
  ],
  providers: [
    MasterService
  ],
  entryComponents: [
    IndexComponent,
    BgWatermarkComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
