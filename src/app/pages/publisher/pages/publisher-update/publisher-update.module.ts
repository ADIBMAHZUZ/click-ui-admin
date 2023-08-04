import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublisherUpdatePageRoutingModule } from './publisher-update-routing.module';

import { PublisherUpdatePage } from './publisher-update.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublisherUpdatePageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [PublisherUpdatePage]
})
export class PublisherUpdatePageModule {}
