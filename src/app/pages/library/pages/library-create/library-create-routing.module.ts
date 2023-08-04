import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibraryCreatePage } from './library-create.page';

const routes: Routes = [
  {
    path: '',
    component: LibraryCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibraryCreatePageRoutingModule {}
