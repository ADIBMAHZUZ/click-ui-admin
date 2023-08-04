import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { JwtModuleOptions, JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthPageRoutingModule,
    TranslateModule,
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: tokenGetter
    //   }
    // }),
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: tokenGetter
    //   }
    // })
  ]
})
export class AuthPageModule {}
