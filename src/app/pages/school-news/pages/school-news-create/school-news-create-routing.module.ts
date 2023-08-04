import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchoolNewsCreatePage } from './school-news-create.page';

const routes: Routes = [
  {
    path: '',
    component: SchoolNewsCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolNewsCreatePageRoutingModule {}
