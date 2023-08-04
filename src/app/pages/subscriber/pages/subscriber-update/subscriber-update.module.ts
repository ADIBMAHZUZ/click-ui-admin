import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubscriberUpdatePageRoutingModule } from './subscriber-update-routing.module';

import { SubscriberUpdatePage } from './subscriber-update.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubscriberUpdatePageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [SubscriberUpdatePage]
})
export class SubscriberUpdatePageModule {}
