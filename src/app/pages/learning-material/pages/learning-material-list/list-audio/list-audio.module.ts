import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListAudioPageRoutingModule } from './list-audio-routing.module';

import { ListAudioPage } from './list-audio.page';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PagerModule } from 'src/app/shared/pager/pager.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListAudioPageRoutingModule,
    PagerModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  declarations: [ListAudioPage]
})
export class ListAudioPageModule {}
