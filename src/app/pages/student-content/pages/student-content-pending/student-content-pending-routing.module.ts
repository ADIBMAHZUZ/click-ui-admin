import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentContentPendingPage } from './student-content-pending.page';

const routes: Routes = [
  {
    path: '',
    component: StudentContentPendingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentContentPendingPageRoutingModule {}
