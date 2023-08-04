import { SharedModule } from "src/app/shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { LearningMaterialCreatePageRoutingModule } from "./learning-material-create-routing.module";

import { LearningMaterialCreatePage } from "./learning-material-create.page";
import { TranslateModule } from "@ngx-translate/core";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { IonicSelectableModule } from "ionic-selectable";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LearningMaterialCreatePageRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    IonicSelectableModule,
  ],
  declarations: [LearningMaterialCreatePage],
})
export class LearningMaterialCreatePageModule {}
