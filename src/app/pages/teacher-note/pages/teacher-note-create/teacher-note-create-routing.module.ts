import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherNoteCreatePage } from './teacher-note-create.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherNoteCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherNoteCreatePageRoutingModule {}
