import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LearningMaterialViewPage } from './learning-material-view.page';

const routes: Routes = [
  {
    path: '',
    component: LearningMaterialViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearningMaterialViewPageRoutingModule {}
