import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';
import { RoleGuardService as RoleGuard } from '../../guards/role-guard.service'

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    canActivate: [RoleGuard],
    data: {
      expectedRoleAdmin: "admin",
      expectedRolePub: "publisher",
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
