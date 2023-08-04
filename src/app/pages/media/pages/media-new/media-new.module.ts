import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MediaNewPageRoutingModule } from "./media-new-routing.module";

import { MediaNewPage } from "./media-new.page";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MediaNewPageRoutingModule,
    TranslateModule,
    SharedModule,
  ],
  declarations: [MediaNewPage],
})
export class MediaNewPageModule {}
