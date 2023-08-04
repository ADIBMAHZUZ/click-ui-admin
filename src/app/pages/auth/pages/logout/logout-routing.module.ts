import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogoutPage } from './logout.page';
import { AuthGuardService as AuthGuard } from '../../../auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: LogoutPage,
    canActivate: [AuthGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogoutPageRoutingModule {}
