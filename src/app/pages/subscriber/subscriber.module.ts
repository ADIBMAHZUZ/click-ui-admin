import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubscriberPageRoutingModule } from './subscriber-routing.module';

import { SubscriberPage } from './subscriber.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateModule } from '@ngx-translate/core';
import { PagerModule } from 'src/app/shared/pager/pager.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubscriberPageRoutingModule,
    NgxDatatableModule,
    TranslateModule,
    PagerModule
  ],
  declarations: [SubscriberPage]
})
export class SubscriberPageModule {}
