import { NumberOfRegisterPageRoutingModule } from "./number-of-register-routing.module";
import { NumberOfRegister } from "./number-of-register.page";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ChartsModule } from "ng2-charts";
import { TranslateModule } from "@ngx-translate/core";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxDatatableModule,
    NumberOfRegisterPageRoutingModule,
    ChartsModule,
    TranslateModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  declarations: [NumberOfRegister],
})
export class NumberOfRegisterPageModule {}
