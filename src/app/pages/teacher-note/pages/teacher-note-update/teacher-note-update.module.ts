import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherNoteUpdatePageRoutingModule } from './teacher-note-update-routing.module';

import { TeacherNoteUpdatePage } from './teacher-note-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherNoteUpdatePageRoutingModule
  ],
  declarations: [TeacherNoteUpdatePage]
})
export class TeacherNoteUpdatePageModule {}
