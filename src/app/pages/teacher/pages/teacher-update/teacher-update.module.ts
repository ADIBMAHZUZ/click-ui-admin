import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherUpdatePageRoutingModule } from './teacher-update-routing.module';

import { TeacherUpdatePage } from './teacher-update.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherUpdatePageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [TeacherUpdatePage]
})
export class TeacherUpdatePageModule {}
