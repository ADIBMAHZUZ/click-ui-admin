import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibraryPageRoutingModule } from './library-routing.module';

import { LibraryPage } from './library.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateModule } from '@ngx-translate/core';
// import {DataTablePagerComponent} from '../../services/pager.component'
import { PagerModule } from 'src/app/shared/pager/pager.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LibraryPageRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    TranslateModule,
    PagerModule
  ],
  declarations: [LibraryPage]
})
export class LibraryPageModule {}
