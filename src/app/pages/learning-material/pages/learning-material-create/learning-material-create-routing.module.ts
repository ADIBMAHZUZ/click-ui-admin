import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LearningMaterialCreatePage } from './learning-material-create.page';

const routes: Routes = [
  {
    path: '',
    component: LearningMaterialCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearningMaterialCreatePageRoutingModule {}
