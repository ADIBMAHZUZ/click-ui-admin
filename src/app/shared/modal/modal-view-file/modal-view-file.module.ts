import { NgxDocViewerModule } from "ngx-doc-viewer";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ModalViewFilePageRoutingModule } from "./modal-view-file-routing.module";
import { ModalViewFilePage } from "./modal-view-file.page";
import { PdfViewerModule } from "ng2-pdf-viewer";
import { BrowserModule } from "@angular/platform-browser";
import { InlineSVGModule } from "ng-inline-svg";
import { SharedModule } from "../../shared.module";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalViewFilePageRoutingModule,
    PdfViewerModule,
    NgxDocViewerModule,
    BrowserModule,
    InlineSVGModule.forRoot(),
  ],
  declarations: [ModalViewFilePage],
})
export class ModalViewFilePageModule {}
