import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from "../component/header/header.module";
import { RouterModule } from "@angular/router";
import { RepositoryListModule } from "../component/repository-list/repository-list.module";
import { SpinnerModule } from "../component/spinner/spinner.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HeaderModule,
    RepositoryListModule,
    RouterModule,
    SpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
