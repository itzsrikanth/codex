import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ParallaxComponent } from './parallax/parallax.component';
import { JumboHoverComponent } from './jumbo.hover/jumboHover.component';
import { GalleryComponent } from './gallery/gallery.component';

// services
import { MasterService } from './master.service';

import { IndexComponent } from './index/index.component';
import { BgWatermarkComponent } from './bgWatermark/bgWatermark.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, BrowserAnimationsModule ],
  declarations: [ 
    AppComponent, 
    ParallaxComponent, 
    JumboHoverComponent, 
    GalleryComponent,

    IndexComponent,
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
