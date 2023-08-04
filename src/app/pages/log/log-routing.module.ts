import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogPage } from './log.page';
import { RoleGuardService as RoleGuard } from '../../guards/role-guard.service'

const routes: Routes = [
  {
    path: '',
    component: LogPage,
    canActivate: [RoleGuard], 
    data: {
      expectedRole: 'admin',
      expectedRolePub: "publisher",
      expectedRoleLib: "librarian",
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogPageRoutingModule {}
