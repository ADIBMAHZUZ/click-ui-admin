import { RankingActiveSubscriberPageRoutingModule } from "./ranking-active-subscriber-routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { ChartsModule } from "ng2-charts";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "src/app/shared/shared.module";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { RankingActiveSubscriber } from "./ranking-active-subscriber.page";
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
    RankingActiveSubscriberPageRoutingModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  declarations: [RankingActiveSubscriber],
})
export class RankingActiveSubscriberPageModule {}
