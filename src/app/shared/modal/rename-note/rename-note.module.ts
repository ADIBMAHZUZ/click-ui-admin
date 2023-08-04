import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RenameNotePageRoutingModule } from './rename-note-routing.module';

import { RenameNotePage } from './rename-note.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RenameNotePageRoutingModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [RenameNotePage]
})
export class RenameNotePageModule {}
