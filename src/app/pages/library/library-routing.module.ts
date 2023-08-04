import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibraryPage } from './library.page';
import { RoleGuardService as RoleGuard } from '../../guards/role-guard.service'

const routes: Routes = [
  {
    path: '',
    component: LibraryPage,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'admin',
  },
    
  },
  {
    path: 'create',
    loadChildren: () => import('./pages/library-create/library-create.module').then( m => m.LibraryCreatePageModule),
    canActivate: [RoleGuard], 
    data: {
      expectedRole: 'admin',
    }
  },
  {
    path: 'view/:id',
    loadChildren: () => import('./pages/library-view/library-view.module').then( m => m.LibraryViewPageModule),
    canActivate: [RoleGuard], 
    data: {
      expectedRole: 'admin',
    }
  },
  {
    path: 'update/:id',
    loadChildren: () => import('./pages/library-update/library-update.module').then( m => m.LibraryUpdatePageModule),
    canActivate: [RoleGuard], 
    data: {
      expectedRole: 'admin',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibraryPageRoutingModule {}
