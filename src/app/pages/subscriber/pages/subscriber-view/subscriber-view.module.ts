import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubscriberViewPageRoutingModule } from './subscriber-view-routing.module';

import { SubscriberViewPage } from './subscriber-view.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubscriberViewPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
  declarations: [SubscriberViewPage]
})
export class SubscriberViewPageModule {}
