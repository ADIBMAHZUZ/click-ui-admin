import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolNewsPage } from './school-news.page';
import { RoleGuardService as RoleGuard } from '../../guards/role-guard.service'

const routes: Routes = [
  {
    path: '',
    component: SchoolNewsPage,
    canActivate: [RoleGuard],
    data: {
      expectedRoleLibrary: "librarian"
    },
  },
  {
    path: 'create',
    loadChildren: () => import('./pages/school-news-create/school-news-create.module').then( m => m.SchoolNewsCreatePageModule),
    canActivate: [RoleGuard],
    data: {
      expectedRoleLibrary: "librarian"
    },
  },
  {
    path: 'view/:id',
    loadChildren: () => import('./pages/school-news-view/school-news-view.module').then( m => m.SchoolNewsViewPageModule),
    canActivate: [RoleGuard],
    data: {
      expectedRoleLibrary: "librarian"
    },
  },
  {
    path: 'update/:id',
    loadChildren: () => import('./pages/school-news-update/school-news-update.module').then( m => m.SchoolNewsUpdatePageModule),
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
export class SchoolNewsPageRoutingModule {}
