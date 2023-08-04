import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreviewLibraryHomePageRoutingModule } from './preview-library-home-routing.module';

import { PreviewLibraryHomePage } from './preview-library-home.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreviewLibraryHomePageRoutingModule,
    TranslateModule,
  ],
  declarations: [PreviewLibraryHomePage]
})
export class PreviewLibraryHomePageModule {}
