import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherImportCsvPageRoutingModule } from './teacher-import-csv-routing.module';

import { TeacherImportCsvPage } from './teacher-import-csv.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherImportCsvPageRoutingModule,
    TranslateModule
  ],
  declarations: [TeacherImportCsvPage]
})
export class TeacherImportCsvPageModule {}
