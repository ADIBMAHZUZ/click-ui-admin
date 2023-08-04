import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListVideoPage } from './list-video.page';

const routes: Routes = [
  {
    path: '',
    component: ListVideoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListVideoPageRoutingModule {}
