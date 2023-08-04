import { MatIconModule } from "@angular/material/icon";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MediaPageRoutingModule } from "./media-routing.module";

import { MediaPage } from "./media.page";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatIconModule,
    MediaPageRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  declarations: [MediaPage],
})
export class MediaPageModule {}
