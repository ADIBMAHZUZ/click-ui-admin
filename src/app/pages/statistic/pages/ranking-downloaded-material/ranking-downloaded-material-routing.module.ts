import { RankingDownloadedMaterial } from "./ranking-downloaded-material.page";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: RankingDownloadedMaterial,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RankingDownloadedMaterialPageRoutingModule {}
