import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MediaNewPage } from './media-new.page';

const routes: Routes = [
  {
    path: '',
    component: MediaNewPage,
    children: [
      {
        path: 'book',
        children: [
          {
            path: '',
            loadChildren: './pages/list-book/list-book.module#ListBookPageModule'
          }
        ]
      },
      {
        path: 'audio',
        children: [
          {
            path: '',
            loadChildren: './pages/list-audio/list-audio.module#ListAudioPageModule'
          }
        ]
      },
      {
        path: 'video',
        children: [
          {
            path: '',
            loadChildren: './pages/list-video/list-video.module#ListVideoPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/media/new/book',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'book',
    loadChildren: () => import('./pages/list-book/list-book.module').then( m => m.ListBookPageModule)
  },
  {
    path: 'audio',
    loadChildren: () => import('./pages/list-audio/list-audio.module').then( m => m.ListAudioPageModule)
  },
  {
    path: 'video',
    loadChildren: () => import('./pages/list-video/list-video.module').then( m => m.ListVideoPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MediaNewPageRoutingModule {}
