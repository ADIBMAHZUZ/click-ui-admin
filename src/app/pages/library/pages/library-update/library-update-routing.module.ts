import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibraryUpdatePage } from './library-update.page';

const routes: Routes = [
  {
    path: '',
    component: LibraryUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibraryUpdatePageRoutingModule {}
