import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuyStoragePageRoutingModule } from './buy-storage-routing.module';

import { BuyStoragePage } from './buy-storage.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuyStoragePageRoutingModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [BuyStoragePage]
})
export class BuyStoragePageModule {}
