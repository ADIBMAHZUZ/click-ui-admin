import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibraryCreatePageRoutingModule } from './library-create-routing.module';

import { LibraryCreatePage } from './library-create.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LibraryCreatePageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [LibraryCreatePage]
})
export class LibraryCreatePageModule {}
