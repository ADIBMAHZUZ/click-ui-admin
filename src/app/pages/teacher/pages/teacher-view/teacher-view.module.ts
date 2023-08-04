import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherViewPageRoutingModule } from './teacher-view-routing.module';

import { TeacherViewPage } from './teacher-view.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherViewPageRoutingModule,
    TranslateModule
  ],
  declarations: [TeacherViewPage]
})
export class TeacherViewPageModule {}
