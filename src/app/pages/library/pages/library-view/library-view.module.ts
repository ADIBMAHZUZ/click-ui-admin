import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibraryViewPageRoutingModule } from './library-view-routing.module';

import { LibraryViewPage } from './library-view.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LibraryViewPageRoutingModule,
    TranslateModule
  ],
  declarations: [LibraryViewPage]
})
export class LibraryViewPageModule {}
