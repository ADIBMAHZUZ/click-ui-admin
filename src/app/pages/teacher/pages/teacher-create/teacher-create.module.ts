import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherCreatePageRoutingModule } from './teacher-create-routing.module';

import { TeacherCreatePage } from './teacher-create.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherCreatePageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [TeacherCreatePage]
})
export class TeacherCreatePageModule {}
