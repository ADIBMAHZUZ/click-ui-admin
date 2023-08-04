import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublisherViewPageRoutingModule } from './publisher-view-routing.module';

import { PublisherViewPage } from './publisher-view.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublisherViewPageRoutingModule,
    TranslateModule
  ],
  declarations: [PublisherViewPage]
})
export class PublisherViewPageModule {}
