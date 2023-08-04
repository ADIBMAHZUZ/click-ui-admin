import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { NotificationPageRoutingModule } from "./notification-routing.module";

import { NotificationPage } from "./notification.page";
import { TranslateModule } from "@ngx-translate/core";
import { PagerModule } from "src/app/shared/pager/pager.module";
import { PagingModule } from "src/app/shared/paging/paging.module";
import { LogPagingModule } from "src/app/shared/logpaging/paging/paging.module";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationPageRoutingModule,
    TranslateModule,
    PagerModule,
    NgxDatatableModule,
    SharedModule,
    LogPagingModule,
  ],
  declarations: [NotificationPage],
})
export class NotificationPageModule {}
