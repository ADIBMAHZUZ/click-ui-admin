import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherNoteUpdatePage } from './teacher-note-update.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherNoteUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherNoteUpdatePageRoutingModule {}
