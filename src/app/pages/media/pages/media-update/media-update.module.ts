import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MediaUpdatePageRoutingModule } from './media-update-routing.module';

import { MediaUpdatePage } from './media-update.page';
import { TranslateModule } from '@ngx-translate/core';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MediaUpdatePageRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    IonicSelectableModule
  ],
  declarations: [MediaUpdatePage]
})
export class MediaUpdatePageModule {}
