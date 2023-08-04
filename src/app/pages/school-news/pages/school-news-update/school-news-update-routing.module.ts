import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchoolNewsUpdatePage } from './school-news-update.page';

const routes: Routes = [
  {
    path: '',
    component: SchoolNewsUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolNewsUpdatePageRoutingModule {}
