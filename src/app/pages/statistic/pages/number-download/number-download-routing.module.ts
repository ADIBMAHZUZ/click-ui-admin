import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NumberDownloadPage } from './number-download.page';

const routes: Routes = [
  {
    path: '',
    component: NumberDownloadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NumberDownloadPageRoutingModule {}
