import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthLayoutComponent } from "./auth/auth.component";
import { ContentLayoutComponent } from "./content/content.component";
import { SideBarComponent } from "./sidebar/sidebar.component";
import { SharedModule } from "../shared/shared.module";
import { LayoutRoutingModule } from "./layout-routing.module";

const COMPONENT = [
  AuthLayoutComponent,
  ContentLayoutComponent,
  SideBarComponent,
];

const MODULE = [SharedModule, CommonModule, LayoutRoutingModule];
@NgModule({
  declarations: [...COMPONENT],
  imports: [...MODULE],
})
export class LayoutModule {}
