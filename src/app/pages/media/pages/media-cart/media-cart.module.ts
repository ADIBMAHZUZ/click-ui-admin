import { SharedModule } from "src/app/shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MediaCartPageRoutingModule } from "./media-cart-routing.module";

import { MediaCartPage } from "./media-cart.page";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { TranslateModule } from "@ngx-translate/core";
import { PagerModule } from "src/app/shared/pager/pager.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MediaCartPageRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    PagerModule,
  ],
  declarations: [MediaCartPage],
})
export class MediaCartPageModule {}
