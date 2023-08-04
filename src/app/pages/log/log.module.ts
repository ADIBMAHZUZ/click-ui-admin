import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogPageRoutingModule } from './log-routing.module';

import { LogPage } from './log.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateModule } from '@ngx-translate/core';
import { PagerModule } from 'src/app/shared/pager/pager.module';
import { PagingModule } from 'src/app/shared/paging/paging.module';
import { LogPagingModule } from 'src/app/shared/logpaging/paging/paging.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogPageRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    TranslateModule,
    PagerModule,
    LogPagingModule
  ],
  declarations: [LogPage]
})
export class LogPageModule {}
