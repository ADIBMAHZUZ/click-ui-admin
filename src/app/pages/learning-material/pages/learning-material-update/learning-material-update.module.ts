import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LearningMaterialUpdatePageRoutingModule } from './learning-material-update-routing.module';

import { LearningMaterialUpdatePage } from './learning-material-update.page';
import { TranslateModule } from '@ngx-translate/core';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LearningMaterialUpdatePageRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    IonicSelectableModule
  ],
  declarations: [LearningMaterialUpdatePage]
})
export class LearningMaterialUpdatePageModule {}
