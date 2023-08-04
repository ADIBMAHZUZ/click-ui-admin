import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { NumberMediaPageRoutingModule } from "./number-media-routing.module";
import { NumberMediaPage } from "./number-media.page";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ChartsModule } from "ng2-charts";
import { TranslateModule } from "@ngx-translate/core";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NumberMediaPageRoutingModule,
    NgxDatatableModule,
    ChartsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    TranslateModule,
    SharedModule,
  ],
  declarations: [NumberMediaPage],
})
export class NumberMediaPageModule {}
