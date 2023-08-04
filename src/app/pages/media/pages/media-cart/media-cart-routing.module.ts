import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MediaCartPage } from "./media-cart.page";

const routes: Routes = [
  {
    path: "",
    component: MediaCartPage,
  },
  {
    path: ":id",
    component: MediaCartPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MediaCartPageRoutingModule {}
