import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibraryUpdatePageRoutingModule } from './library-update-routing.module';

import { LibraryUpdatePage } from './library-update.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LibraryUpdatePageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [LibraryUpdatePage]
})
export class LibraryUpdatePageModule {}
