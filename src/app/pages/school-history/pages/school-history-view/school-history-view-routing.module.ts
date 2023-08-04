import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchoolHistoryViewPage } from './school-history-view.page';

const routes: Routes = [
  {
    path: '',
    component: SchoolHistoryViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolHistoryViewPageRoutingModule {}
