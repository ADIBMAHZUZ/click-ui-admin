import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublisherPage } from './publisher.page';
import { RoleGuardService as RoleGuard } from '../../guards/role-guard.service'

const routes: Routes = [
  {
    path: '',
    component: PublisherPage,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'admin',
    },
  },
  {
    path: 'create',
    loadChildren: () => import('./pages/publisher-create/publisher-create.module').then( m => m.PublisherCreatePageModule),
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'admin',
    },
  },
  {
    path: 'view/:id',
    loadChildren: () => import('./pages/publisher-view/publisher-view.module').then( m => m.PublisherViewPageModule),
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'admin',
    },
  },
  {
    path: 'update/:id',
    loadChildren: () => import('./pages/publisher-update/publisher-update.module').then( m => m.PublisherUpdatePageModule),
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'admin',
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublisherPageRoutingModule {}
