import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentContentUpdatePage } from './student-content-update.page';

const routes: Routes = [
  {
    path: '',
    component: StudentContentUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentContentUpdatePageRoutingModule {}
