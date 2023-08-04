import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { QuotationPage } from "./pages/quotation/quotation.page";

const routes: Routes = [
  {
    path: "view/:id",
    component: QuotationPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuotationPageRoutingModule {}
