import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherViewPage } from './teacher-view.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherViewPageRoutingModule {}
