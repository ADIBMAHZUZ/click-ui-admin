import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherCreatePage } from './teacher-create.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherCreatePageRoutingModule {}
