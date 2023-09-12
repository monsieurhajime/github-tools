import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { RepositoryListComponent } from "./repository-list.component";
import { SearchPaginationModule } from "../search-pagination/search-pagination.module";

@NgModule({
  declarations: [
    RepositoryListComponent,
  ],
  exports: [
    RepositoryListComponent,
  ],
  imports: [
    BrowserModule,
    SearchPaginationModule,
    RouterModule,
  ]
})
export class RepositoryListModule {}
