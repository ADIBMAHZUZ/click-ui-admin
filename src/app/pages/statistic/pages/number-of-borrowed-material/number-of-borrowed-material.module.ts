import { NumberOfBorrowedMaterial } from "./number-of-borrowed-material.page";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ChartsModule } from "ng2-charts";
import { TranslateModule } from "@ngx-translate/core";
import { NumberOfBorrowedMaterialPageRoutingModule } from "./number-of-borrowed-material-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxDatatableModule,
    ChartsModule,
    TranslateModule,
    NumberOfBorrowedMaterialPageRoutingModule,
  ],
  declarations: [NumberOfBorrowedMaterial],
})
export class NumberOfBorrowedMaterialPageModule {}
