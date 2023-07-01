import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";

import { RemoveBgComponent } from "./elements/remove-bg/components/remove-bg/remove-bg.component";
import { ExtractTextComponent } from "./elements/extract-text/components/extract-text/extract-text.component";

const routes: Routes = [
  {
    path: '', component: RemoveBgComponent
  },
  {
    path: 'remover-bg', component: RemoveBgComponent
  },
  {
    path: 'extract-text', component: ExtractTextComponent
  }
]

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
