import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscriberLibraryPage } from './subscriber-library.page';

const routes: Routes = [
  {
    path: '',
    component: SubscriberLibraryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriberLibraryPageRoutingModule {}
