import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibraryViewPage } from './library-view.page';

const routes: Routes = [
  {
    path: '',
    component: LibraryViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibraryViewPageRoutingModule {}
