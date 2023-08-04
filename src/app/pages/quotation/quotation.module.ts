import { QuotationPageRoutingModule } from "./quotation-routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "src/app/shared/shared.module";
import { QuotationPage } from "./pages/quotation/quotation.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuotationPageRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule,
  ],
  declarations: [QuotationPage],
})
export class QuotationPageModule {}
