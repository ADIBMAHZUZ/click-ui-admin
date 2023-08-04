import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LearningMaterialPage } from './learning-material.page';
import { RoleGuardService as RoleGuard } from '../../guards/role-guard.service'

const routes: Routes = [
  {
    path: '',
    component: LearningMaterialPage,
    canActivate: [RoleGuard], 
    data: {
      expectedRole: 'librarian',
    },
    children: [
      {
        path: 'book',
        children: [
          {
            path: '',
            loadChildren: './pages/learning-material-list/list-book/list-book.module#ListBookPageModule'
          }
        ]
      },
      {
        path: 'audio',
        children: [
          {
            path: '',
            loadChildren: './pages/learning-material-list/list-audio/list-audio.module#ListAudioPageModule'
          }
        ]
      },
      {
        path: 'video',
        children: [
          {
            path: '',
            loadChildren: './pages/learning-material-list/list-video/list-video.module#ListVideoPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/learning-material/book',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'book',
    loadChildren: () => import('./pages/learning-material-list/list-book/list-book.module').then( m => m.ListBookPageModule)
  },
  {
    path: 'audio',
    loadChildren: () => import('./pages/learning-material-list/list-audio/list-audio.module').then( m => m.ListAudioPageModule)
  },
  {
    path: 'video',
    loadChildren: () => import('./pages/learning-material-list/list-video/list-video.module').then( m => m.ListVideoPageModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./pages/learning-material-create/learning-material-create.module').then( m => m.LearningMaterialCreatePageModule),
    canActivate: [RoleGuard], 
    data: {
      expectedRole: 'librarian',
    }
  },
  {
    path: 'view/:id',
    loadChildren: () => import('./pages/learning-material-view/learning-material-view.module').then( m => m.LearningMaterialViewPageModule),
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'librarian',
    }
  },
  {
    path: 'update/:id',
    loadChildren: () => import('./pages/learning-material-update/learning-material-update.module').then( m => m.LearningMaterialUpdatePageModule),
    canActivate: [RoleGuard], 
    data: {
      expectedRole: 'librarian',
    }
  },
  {
    path: 'book',
    loadChildren: () => import('./pages/learning-material-list/list-book/list-book.module').then( m => m.ListBookPageModule)
  },
  {
    path: 'audio',
    loadChildren: () => import('./pages/learning-material-list/list-audio/list-audio.module').then( m => m.ListAudioPageModule)
  },
  {
    path: 'video',
    loadChildren: () => import('./pages/learning-material-list/list-video/list-video.module').then( m => m.ListVideoPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearningMaterialPageRoutingModule {}
