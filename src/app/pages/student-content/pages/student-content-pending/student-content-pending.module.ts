import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentContentPendingPageRoutingModule } from './student-content-pending-routing.module';

import { StudentContentPendingPage } from './student-content-pending.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentContentPendingPageRoutingModule
  ],
  declarations: [StudentContentPendingPage]
})
export class StudentContentPendingPageModule {}
