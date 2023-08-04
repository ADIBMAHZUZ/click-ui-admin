import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentContentPage } from './student-content.page';
import { RoleGuardService as RoleGuard } from '../../guards/role-guard.service'

const routes: Routes = [
  {
    path: '',
    component: StudentContentPage,
    canActivate: [RoleGuard],
    data: {
      expectedRoleLib: "librarian",
      expectedRoleSub: "subscriber"
    },
  },
  {
    path: 'create',
    loadChildren: () => import('./pages/student-content-create/student-content-create.module').then( m => m.StudentContentCreatePageModule),
    canActivate: [RoleGuard],
    data: {
      expectedRoleLib: "librarian",
      expectedRoleSub: "subscriber"
    },
  },
  {
    path: 'view/:id',
    loadChildren: () => import('./pages/student-content-view/student-content-view.module').then( m => m.StudentContentViewPageModule),
    canActivate: [RoleGuard],
    data: {
      expectedRoleLib: "librarian",
      expectedRoleSub: "subscriber"
    },
  },
  {
    path: 'update/:id',
    loadChildren: () => import('./pages/student-content-update/student-content-update.module').then( m => m.StudentContentUpdatePageModule),
    canActivate: [RoleGuard],
    data: {
      expectedRoleLib: "librarian",
      expectedRoleSub: "subscriber"
    },
  },
  {
    path: 'pending',
    loadChildren: () => import('./pages/student-content-pending/student-content-pending.module').then( m => m.StudentContentPendingPageModule),
    canActivate: [RoleGuard],
    data: {
      expectedRoleLib: "librarian",
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentContentPageRoutingModule {}
