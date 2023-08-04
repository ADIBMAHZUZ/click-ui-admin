import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { ChartsModule } from "ng2-charts";
import { TranslateModule } from "@ngx-translate/core";
import { RankingDownloadedMaterial } from "./ranking-downloaded-material.page";
import { RankingDownloadedMaterialPageRoutingModule } from "./ranking-downloaded-material-routing.module";
import { SharedModule } from "src/app/shared/shared.module";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    TranslateModule,
    SharedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    RankingDownloadedMaterialPageRoutingModule,
  ],
  declarations: [RankingDownloadedMaterial],
})
export class RankingDownloadedMaterialPageModule {}
