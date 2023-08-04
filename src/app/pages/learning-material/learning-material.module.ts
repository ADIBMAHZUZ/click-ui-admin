import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LearningMaterialPageRoutingModule } from './learning-material-routing.module';

import { LearningMaterialPage } from './learning-material.page';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LearningMaterialPageRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [LearningMaterialPage]
})
export class LearningMaterialPageModule {}
