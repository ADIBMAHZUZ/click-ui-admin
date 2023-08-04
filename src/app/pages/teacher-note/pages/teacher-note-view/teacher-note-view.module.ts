import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherNoteViewPageRoutingModule } from './teacher-note-view-routing.module';

import { TeacherNoteViewPage } from './teacher-note-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherNoteViewPageRoutingModule
  ],
  declarations: [TeacherNoteViewPage]
})
export class TeacherNoteViewPageModule {}
