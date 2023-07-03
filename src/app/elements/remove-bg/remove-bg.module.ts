import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RemoveBgService } from './service/remove-bg.service';
import { RemoveBgComponent } from './components/remove-bg/remove-bg.component';
import { HttpClientModule } from '@angular/common/http';

import { ButtonModule} from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';

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
    TabViewModule,
    ToastModule,
    SkeletonModule
  ],
  providers: [
    RemoveBgService,
    MessageService
  ]
})
export class RemoveBgModule { }
