import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MediaCategoryPage } from './media-category.page';

const routes: Routes = [
  {
    path: '',
    component: MediaCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MediaCategoryPageRoutingModule {}
