import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalViewFilePage } from './modal-view-file.page';

const routes: Routes = [
  {
    path: '',
    component: ModalViewFilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalViewFilePageRoutingModule {}
