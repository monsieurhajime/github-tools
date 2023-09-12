import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  exports: [
    HeaderComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class HeaderModule {}
