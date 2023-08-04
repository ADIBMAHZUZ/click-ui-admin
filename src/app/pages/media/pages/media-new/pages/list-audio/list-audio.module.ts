import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ListAudioPageRoutingModule } from "./list-audio-routing.module";

import { ListAudioPage } from "./list-audio.page";
// import { JwPaginationComponent } from 'src/app/shared/paging';
import { PagingModule } from "src/app/shared/paging/paging.module";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListAudioPageRoutingModule,
    PagingModule,
    TranslateModule,
    SharedModule,
  ],
  declarations: [ListAudioPage],
})
export class ListAudioPageModule {}
