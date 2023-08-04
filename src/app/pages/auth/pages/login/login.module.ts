import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
// import { IonicPageModule } from '@ionic/angular'

import { LoginPageRoutingModule } from "./login-routing.module";

import { LoginPage } from "./login.page";
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
    ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule,
    SharedModule,
    TranslateModule,
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: tokenGetter
    //   }
    // })
    // IonicPageModule.forChild(LoginPage),
    // TranslateModule.forChild()
  ],
  exports: [TranslateModule],
  declarations: [LoginPage],
})
export class LoginPageModule {}
