import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherNoteCreatePageRoutingModule } from './teacher-note-create-routing.module';

import { TeacherNoteCreatePage } from './teacher-note-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherNoteCreatePageRoutingModule
  ],
  declarations: [TeacherNoteCreatePage]
})
export class TeacherNoteCreatePageModule {}
