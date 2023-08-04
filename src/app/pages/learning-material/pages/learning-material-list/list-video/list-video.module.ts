import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListVideoPageRoutingModule } from './list-video-routing.module';

import { ListVideoPage } from './list-video.page';
import { PagerModule } from 'src/app/shared/pager/pager.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListVideoPageRoutingModule,
    PagerModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  declarations: [ListVideoPage]
})
export class ListVideoPageModule {}
