import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscriberCreatePage } from './subscriber-create.page';

const routes: Routes = [
  {
    path: '',
    component: SubscriberCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriberCreatePageRoutingModule {}
