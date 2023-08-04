import { SharedModule } from "./../../../../../../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ListAudioPageRoutingModule } from "./list-audio-routing.module";

import { ListAudioPage } from "./list-audio.page";
import { PagerModule } from "src/app/shared/pager/pager.module";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListAudioPageRoutingModule,
    PagerModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
  ],
  declarations: [ListAudioPage],
})
export class ListAudioPageModule {}
