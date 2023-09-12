import { NgModule } from "@angular/core";
import { RepositoryDetailsComponent } from "./repository-details.component";

@NgModule({
  declarations: [
    RepositoryDetailsComponent,
  ],
  exports: [
    RepositoryDetailsComponent,
  ]
})
export class RepositoryDetailsModule {}
