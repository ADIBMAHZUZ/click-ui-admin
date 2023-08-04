import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MediaCreatePage } from './media-create.page';

const routes: Routes = [
  {
    path: '',
    component: MediaCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MediaCreatePageRoutingModule {}
