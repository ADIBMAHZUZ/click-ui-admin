import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopDownloadPage } from './top-download.page';

const routes: Routes = [
  {
    path: '',
    component: TopDownloadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopDownloadPageRoutingModule {}
