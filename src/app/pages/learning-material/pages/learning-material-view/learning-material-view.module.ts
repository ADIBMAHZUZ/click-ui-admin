import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LearningMaterialViewPageRoutingModule } from './learning-material-view-routing.module';

import { LearningMaterialViewPage } from './learning-material-view.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LearningMaterialViewPageRoutingModule,
    TranslateModule
  ],
  declarations: [LearningMaterialViewPage]
})
export class LearningMaterialViewPageModule {}
