import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherUpdatePage } from './teacher-update.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherUpdatePageRoutingModule {}
