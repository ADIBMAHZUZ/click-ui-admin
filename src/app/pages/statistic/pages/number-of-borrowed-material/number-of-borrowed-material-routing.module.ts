import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NumberOfBorrowedMaterial } from "./number-of-borrowed-material.page";

const routes: Routes = [
  {
    path: "",
    component: NumberOfBorrowedMaterial,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NumberOfBorrowedMaterialPageRoutingModule {}
