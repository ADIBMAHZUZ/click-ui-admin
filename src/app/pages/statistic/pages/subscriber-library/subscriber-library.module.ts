import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { SubscriberLibraryPageRoutingModule } from "./subscriber-library-routing.module";

import { SubscriberLibraryPage } from "./subscriber-library.page";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ChartsModule } from "ng2-charts";
import { TranslateModule } from "@ngx-translate/core";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubscriberLibraryPageRoutingModule,
    NgxDatatableModule,
    ChartsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    TranslateModule,
  ],
  declarations: [SubscriberLibraryPage],
})
export class SubscriberLibraryPageModule {}
