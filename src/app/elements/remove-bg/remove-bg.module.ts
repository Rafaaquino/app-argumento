import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RemoveBgService } from './service/remove-bg.service';
import { RemoveBgComponent } from './components/remove-bg/remove-bg.component';
import { HttpClientModule } from '@angular/common/http';

import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [
    RemoveBgComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ButtonModule
  ],
  providers: [
    RemoveBgService
  ]
})
export class RemoveBgModule { }
