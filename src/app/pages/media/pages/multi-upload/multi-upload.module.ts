import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MultiUploadPageRoutingModule } from './multi-upload-routing.module';

import { MultiUploadPage } from './multi-upload.page';
import { NgxFileDropModule } from 'ngx-file-drop';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MultiUploadPageRoutingModule,
    NgxFileDropModule,
    TranslateModule
  ],
  declarations: [MultiUploadPage]
})
export class MultiUploadPageModule {}
