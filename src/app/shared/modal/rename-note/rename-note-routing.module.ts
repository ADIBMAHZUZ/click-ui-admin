import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RenameNotePage } from './rename-note.page';

const routes: Routes = [
  {
    path: '',
    component: RenameNotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RenameNotePageRoutingModule {}
