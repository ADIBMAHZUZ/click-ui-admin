import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchoolNewsPageRoutingModule } from './school-news-routing.module';

import { SchoolNewsPage } from './school-news.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { QuillModule } from 'ngx-quill';
import { TranslateModule } from '@ngx-translate/core';
import { PagerModule } from 'src/app/shared/pager/pager.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchoolNewsPageRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    TranslateModule,
    PagerModule
  ],
  declarations: [SchoolNewsPage]
})
export class SchoolNewsPageModule {}
