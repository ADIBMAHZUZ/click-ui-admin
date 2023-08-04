import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentContentPageRoutingModule } from './student-content-routing.module';

import { StudentContentPage } from './student-content.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateModule } from '@ngx-translate/core';
import { PagerModule } from 'src/app/shared/pager/pager.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentContentPageRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    TranslateModule,
    PagerModule
  ],
  declarations: [StudentContentPage]
})
export class StudentContentPageModule {}
