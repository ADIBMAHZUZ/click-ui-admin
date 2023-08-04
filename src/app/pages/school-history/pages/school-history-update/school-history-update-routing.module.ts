import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchoolHistoryUpdatePage } from './school-history-update.page';

const routes: Routes = [
  {
    path: '',
    component: SchoolHistoryUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolHistoryUpdatePageRoutingModule {}
