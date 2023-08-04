import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuyStoragePage } from './buy-storage.page';

const routes: Routes = [
  {
    path: '',
    component: BuyStoragePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyStoragePageRoutingModule {}
