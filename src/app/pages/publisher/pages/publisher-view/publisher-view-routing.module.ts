import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublisherViewPage } from './publisher-view.page';

const routes: Routes = [
  {
    path: '',
    component: PublisherViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublisherViewPageRoutingModule {}
