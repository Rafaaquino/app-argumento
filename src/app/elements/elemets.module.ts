import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RemoveBgModule } from './remove-bg/remove-bg.module';
import { ExtractModule } from './extract-text/extract-text.module';

import { MenuComponent } from './shared/components/menu/menu.component';

@NgModule({
  declarations: [
    MenuComponent
  ],
  exports: [
    MenuComponent
  ],
  imports: [
    BrowserModule,
    RemoveBgModule,
    ExtractModule
  ],
  providers: [
  ]
})
export class ElementsModule { }
