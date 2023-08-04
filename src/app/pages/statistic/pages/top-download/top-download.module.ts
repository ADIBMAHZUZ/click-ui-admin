import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { TopDownloadPageRoutingModule } from "./top-download-routing.module";

import { TopDownloadPage } from "./top-download.page";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { TranslateModule } from "@ngx-translate/core";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { SharedModule } from "src/app/shared/shared.module";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopDownloadPageRoutingModule,
    NgxDatatableModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    TranslateModule,
    SharedModule,
  ],
  declarations: [TopDownloadPage],
})
export class TopDownloadPageModule {}
