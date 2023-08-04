import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubscriberCreatePageRoutingModule } from './subscriber-create-routing.module';

import { SubscriberCreatePage } from './subscriber-create.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubscriberCreatePageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [SubscriberCreatePage]
})
export class SubscriberCreatePageModule {}
