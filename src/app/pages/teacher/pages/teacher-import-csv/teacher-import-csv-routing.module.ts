import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherImportCsvPage } from './teacher-import-csv.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherImportCsvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherImportCsvPageRoutingModule {}
