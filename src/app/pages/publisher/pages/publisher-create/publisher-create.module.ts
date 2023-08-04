import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublisherCreatePageRoutingModule } from './publisher-create-routing.module';

import { PublisherCreatePage } from './publisher-create.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublisherCreatePageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [PublisherCreatePage]
})
export class PublisherCreatePageModule {}
