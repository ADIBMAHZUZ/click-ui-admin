import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentContentCreatePage } from './student-content-create.page';

const routes: Routes = [
  {
    path: '',
    component: StudentContentCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentContentCreatePageRoutingModule {}
