import { ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { DashboardPageRoutingModule } from "./dashboard-routing.module";

import { DashboardPage } from "./dashboard.page";
import { TranslateModule } from "@ngx-translate/core";
import { JwtModule } from "@auth0/angular-jwt";
import { SharedModule } from "src/app/shared/shared.module";

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    TranslateModule,
    SharedModule,
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: tokenGetter
    //   }
    // }),
  ],
  declarations: [DashboardPage],
})
export class DashboardPageModule {}
