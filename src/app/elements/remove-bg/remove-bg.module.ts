import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RemoveBgService } from './service/remove-bg.service';
import { RemoveBgComponent } from './components/remove-bg/remove-bg.component';
import { HttpClientModule } from '@angular/common/http';

import { ButtonModule} from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [
    RemoveBgComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ButtonModule,
    ProgressSpinnerModule,
    TabViewModule
  ],
  providers: [
    RemoveBgService
  ]
})
export class RemoveBgModule { }
