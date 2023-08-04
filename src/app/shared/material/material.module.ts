import { NgModule } from "@angular/core";
import {
  MatSnackBarModule,
  MatSnackBar,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule } from "@angular/material/datepicker";
import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatBadgeModule } from "@angular/material/badge";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatCardModule } from "@angular/material/card";
import { MatNativeDateModule } from "@angular/material/core";
import { CdkTableModule, CdkColumnDef } from "@angular/cdk/table";
import { BreakpointObserver } from "@angular/cdk/layout";
import { MatSortModule } from "@angular/material/sort";
import { MatDialogModule } from "@angular/material/dialog";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatTableModule } from "@angular/material/table";
import { MatRadioModule } from "@angular/material/radio";

const componentModules = [
  MatButtonModule,
  MatDividerModule,
  MatButtonToggleModule,
  MatIconModule,
  MatBadgeModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatChipsModule,
  MatTooltipModule,
  MatSortModule,
  MatPaginatorModule,
  MatCardModule,
  CdkTableModule,
  MatCheckboxModule,
  MatDialogModule,
  MatAutocompleteModule,
  DragDropModule,
  MatDatepickerModule,
  MatTableModule,
  MatRadioModule,
];

@NgModule({
  imports: [componentModules],
  exports: [componentModules],
  providers: [
    MatSnackBar,
    CdkColumnDef,
    MatDatepickerModule,
    BreakpointObserver,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: "legacy" },
    },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000 } },
  ],
})
export class MaterialModule {}
