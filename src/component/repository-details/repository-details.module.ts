import { NgModule } from "@angular/core";
import { RepositoryDetailsComponent } from "./repository-details.component";
import { BrowserModule } from "@angular/platform-browser";
import { ContributionDetailsModule } from "../contribution-details/contribution-details.module";

@NgModule({
  declarations: [
    RepositoryDetailsComponent,
  ],
  exports: [
    RepositoryDetailsComponent,
  ],
  imports: [
    BrowserModule,
    ContributionDetailsModule,
  ]
})
export class RepositoryDetailsModule {}
