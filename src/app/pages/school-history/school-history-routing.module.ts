import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchoolHistoryPage } from './school-history.page';
import { RoleGuardService as RoleGuard } from '../../guards/role-guard.service'

const routes: Routes = [
  {
    path: '',
    component: SchoolHistoryPage,
    canActivate: [RoleGuard],
    data: {
      expectedRoleLibrary: "librarian"
    },
  },
  {
    path: 'create',
    loadChildren: () => import('./pages/school-history-create/school-history-create.module').then( m => m.SchoolHistoryCreatePageModule),
    canActivate: [RoleGuard],
    data: {
      expectedRoleLibrary: "librarian"
    },
  },
  {
    path: 'view/:id',
    loadChildren: () => import('./pages/school-history-view/school-history-view.module').then( m => m.SchoolHistoryViewPageModule),
    canActivate: [RoleGuard],
    data: {
      expectedRoleLibrary: "librarian"
    },
  },
  {
    path: 'update/:id',
    loadChildren: () => import('./pages/school-history-update/school-history-update.module').then( m => m.SchoolHistoryUpdatePageModule),
    canActivate: [RoleGuard],
    data: {
      expectedRoleLibrary: "librarian"
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolHistoryPageRoutingModule {}
