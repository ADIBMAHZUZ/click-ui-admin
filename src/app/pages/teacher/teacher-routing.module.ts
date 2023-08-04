import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherPage } from './teacher.page';
import { RoleGuardService as RoleGuard } from '../../guards/role-guard.service'
const routes: Routes = [
  {
    path: '',
    component: TeacherPage,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'admin',
      expectedRoleLib: 'librarian',
    },
  },
  {
    path: 'create',
    loadChildren: () => import('./pages/teacher-create/teacher-create.module').then( m => m.TeacherCreatePageModule),
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'admin',
      expectedRoleLib: 'librarian',
    },
  },
  {
    path: 'view/:id',
    loadChildren: () => import('./pages/teacher-view/teacher-view.module').then( m => m.TeacherViewPageModule),
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'admin',
      expectedRoleLib: 'librarian',
    },
  },
  {
    path: 'update/:id',
    loadChildren: () => import('./pages/teacher-update/teacher-update.module').then( m => m.TeacherUpdatePageModule),
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'admin',
      expectedRoleLib: 'librarian',
    },
  },
  {
    path: 'teacher-import-csv',
    loadChildren: () => import('./pages/teacher-import-csv/teacher-import-csv.module').then( m => m.TeacherImportCsvPageModule),
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
export class TeacherPageRoutingModule {}
