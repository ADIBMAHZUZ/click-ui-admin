import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListBookPageRoutingModule } from './list-book-routing.module';

import { ListBookPage } from './list-book.page';
import { PagerModule } from 'src/app/shared/pager/pager.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListBookPageRoutingModule,
    PagerModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  declarations: [ListBookPage]
})
export class ListBookPageModule {}
