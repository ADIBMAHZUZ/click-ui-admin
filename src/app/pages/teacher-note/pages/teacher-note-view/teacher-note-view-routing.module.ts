import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherNoteViewPage } from './teacher-note-view.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherNoteViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherNoteViewPageRoutingModule {}
