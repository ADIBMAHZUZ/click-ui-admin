import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MediaCategoryPageRoutingModule } from "./media-category-routing.module";

import { MediaCategoryPage } from "./media-category.page";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ChartsModule } from "ng2-charts";
import { TranslateModule } from "@ngx-translate/core";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MediaCategoryPageRoutingModule,
    NgxDatatableModule,
    ChartsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    TranslateModule,
  ],
  declarations: [MediaCategoryPage],
})
export class MediaCategoryPageModule {}
