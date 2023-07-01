import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RemoveBgModule } from './remove-bg/remove-bg.module';
import { ExtractModule } from './extract-text/extract-text.model';

@NgModule({
  declarations: [
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
