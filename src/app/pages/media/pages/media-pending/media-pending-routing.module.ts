import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MediaPendingPage } from './media-pending.page';

const routes: Routes = [
  {
    path: '',
    component: MediaPendingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MediaPendingPageRoutingModule {}
