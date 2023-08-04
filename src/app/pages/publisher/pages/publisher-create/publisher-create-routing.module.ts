import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublisherCreatePage } from './publisher-create.page';

const routes: Routes = [
  {
    path: '',
    component: PublisherCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublisherCreatePageRoutingModule {}
