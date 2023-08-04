import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentContentViewPage } from './student-content-view.page';

const routes: Routes = [
  {
    path: '',
    component: StudentContentViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentContentViewPageRoutingModule {}
