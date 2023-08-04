import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MediaCreatePageRoutingModule } from "./media-create-routing.module";

import { MediaCreatePage } from "./media-create.page";
import { TranslateModule } from "@ngx-translate/core";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { IonicSelectableModule } from "ionic-selectable";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MediaCreatePageRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    IonicSelectableModule,
    SharedModule,
  ],
  declarations: [MediaCreatePage],
})
export class MediaCreatePageModule {}
