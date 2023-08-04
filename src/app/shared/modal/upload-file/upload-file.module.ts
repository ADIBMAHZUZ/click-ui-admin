import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadFilePageRoutingModule } from './upload-file-routing.module';

import { UploadFilePage } from './upload-file.page';
import { DragDropDirective } from '../../drap-drop-directive';
import { NgxFileDropModule } from 'ngx-file-drop';
 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadFilePageRoutingModule,
    NgxFileDropModule
  ],
  declarations: [UploadFilePage, DragDropDirective],
  exports:[UploadFilePage]
})
export class UploadFilePageModule {}
