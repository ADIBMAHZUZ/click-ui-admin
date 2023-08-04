import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { UploadComponent } from "./components/upload/upload.component";
import { MaterialModule } from "./material/material.module";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { TranslateModule } from "@ngx-translate/core";
import { ChooseCategoryComponent } from "./modal/choose-category/choose-category.component";
import { IonicSelectableModule } from "ionic-selectable";
import { ChoosePublisherComponent } from "./modal/choose-publisher/choose-publisher.component";
import { ChooseLibraryComponent } from "./modal/choose-library/choose-library.component";
import { NgxPrintModule } from "ngx-print";
import { FormatNumberPipe } from "./pipe/format-number.pipe";

const PAGES_COMPONENTS = [
  UploadComponent,
  ChooseCategoryComponent,
  ChooseLibraryComponent,
  ChoosePublisherComponent,
];
const MODULE = [
  MaterialModule,
  FormsModule,
  ReactiveFormsModule,
  CommonModule,
  NgxPrintModule,
  IonicModule,
  TranslateModule,
  IonicSelectableModule,
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
];

const PIPE = [FormatNumberPipe];

@NgModule({
  declarations: [...PAGES_COMPONENTS, ...PIPE],
  imports: [...MODULE],
  exports: [...PAGES_COMPONENTS, ...MODULE, ...PIPE],
  entryComponents: [],
})
export class SharedModule {}
