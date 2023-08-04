import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscriberViewPage } from './subscriber-view.page';

const routes: Routes = [
  {
    path: '',
    component: SubscriberViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriberViewPageRoutingModule {}
