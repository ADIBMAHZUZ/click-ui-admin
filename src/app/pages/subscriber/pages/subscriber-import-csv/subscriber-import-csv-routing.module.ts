import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscriberImportCsvPage } from './subscriber-import-csv.page';

const routes: Routes = [
  {
    path: '',
    component: SubscriberImportCsvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriberImportCsvPageRoutingModule {}
