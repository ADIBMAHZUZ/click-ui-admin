import {NgModule} from '@angular/core';
import { DataTablePagerComponent } from './pager.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
imports: [
    CommonModule,
    FormsModule,
    IonicModule,
],
  declarations:[DataTablePagerComponent],
  exports:[DataTablePagerComponent]
})
export class PagerModule
{
}