import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ListVideoPageRoutingModule } from "./list-video-routing.module";

import { ListVideoPage } from "./list-video.page";
import { PagingModule } from "src/app/shared/paging/paging.module";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListVideoPageRoutingModule,
    PagingModule,
    TranslateModule,
    SharedModule,
  ],
  declarations: [ListVideoPage],
})
export class ListVideoPageModule {}
