import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { TeacherNotePageRoutingModule } from "./teacher-note-routing.module";

import { TeacherNotePage } from "./teacher-note.page";
import { TranslateModule } from "@ngx-translate/core";
import { ModalViewFilePage } from "src/app/shared/modal/modal-view-file/modal-view-file.page";
// import { UploadFilePage } from 'src/app/shared/modal/upload-file/upload-file.page';
import { NgxFileDropModule } from "ngx-file-drop";
import { DragDropDirective } from "src/app/shared/drap-drop-directive";
import { PagingModule } from "src/app/shared/paging/paging.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherNotePageRoutingModule,
    TranslateModule,
    NgxFileDropModule,
    PagingModule,
  ],
  declarations: [TeacherNotePage],
  entryComponents: [ModalViewFilePage],
})
export class TeacherNotePageModule {}
