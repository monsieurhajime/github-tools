import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { RepositoryDetailsComponent } from "./repository-details.component";
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
