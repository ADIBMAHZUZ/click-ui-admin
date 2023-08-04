import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchoolHistoryCreatePage } from './school-history-create.page';

const routes: Routes = [
  {
    path: '',
    component: SchoolHistoryCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolHistoryCreatePageRoutingModule {}
