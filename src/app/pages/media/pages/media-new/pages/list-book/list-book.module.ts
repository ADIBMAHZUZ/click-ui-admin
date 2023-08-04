import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ListBookPageRoutingModule } from "./list-book-routing.module";

import { ListBookPage } from "./list-book.page";
import { PagingModule } from "src/app/shared/paging/paging.module";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ListBookPageRoutingModule,
    PagingModule,
    TranslateModule,
  ],
  declarations: [ListBookPage],
})
export class ListBookPageModule {}
