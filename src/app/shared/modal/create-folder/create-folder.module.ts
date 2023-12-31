import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateFolderPageRoutingModule } from './create-folder-routing.module';

import { CreateFolderPage } from './create-folder.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateFolderPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [CreateFolderPage]
})
export class CreateFolderPageModule {}
