import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RepositoryListComponent } from "../component/repository-list/repository-list.component";
import { RepositoryDetailsComponent } from "../component/repository-details/repository-details.component";

const routes: Routes = [
  { path: '', component: RepositoryListComponent },
  { path: 'repository/:owner/:repo', component: RepositoryDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
