import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MediaPendingPageRoutingModule } from './media-pending-routing.module';

import { MediaPendingPage } from './media-pending.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MediaPendingPageRoutingModule
  ],
  declarations: [MediaPendingPage]
})
export class MediaPendingPageModule {}
