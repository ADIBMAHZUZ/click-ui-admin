import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LearningMaterialUpdatePage } from './learning-material-update.page';

const routes: Routes = [
  {
    path: '',
    component: LearningMaterialUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearningMaterialUpdatePageRoutingModule {}
