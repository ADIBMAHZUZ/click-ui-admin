import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubscriberImportCsvPageRoutingModule } from './subscriber-import-csv-routing.module';

import { SubscriberImportCsvPage } from './subscriber-import-csv.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubscriberImportCsvPageRoutingModule,
    TranslateModule
  ],
  declarations: [SubscriberImportCsvPage]
})
export class SubscriberImportCsvPageModule {}
