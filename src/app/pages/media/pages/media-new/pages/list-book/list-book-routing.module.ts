import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListBookPage } from './list-book.page';

const routes: Routes = [
  {
    path: '',
    component: ListBookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListBookPageRoutingModule {}
