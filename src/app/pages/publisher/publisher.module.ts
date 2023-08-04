import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublisherPageRoutingModule } from './publisher-routing.module';

import { PublisherPage } from './publisher.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateModule } from '@ngx-translate/core';
import { PagerModule } from 'src/app/shared/pager/pager.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublisherPageRoutingModule,
    NgxDatatableModule,
    TranslateModule,
    PagerModule
  ],
  declarations: [PublisherPage]
})
export class PublisherPageModule {}
