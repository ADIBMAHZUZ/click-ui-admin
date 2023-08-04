import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NumberMediaPage } from './number-media.page';

const routes: Routes = [
  {
    path: '',
    component: NumberMediaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NumberMediaPageRoutingModule {}
