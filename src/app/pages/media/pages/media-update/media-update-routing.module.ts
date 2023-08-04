import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MediaUpdatePage } from './media-update.page';

const routes: Routes = [
  {
    path: '',
    component: MediaUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MediaUpdatePageRoutingModule {}
