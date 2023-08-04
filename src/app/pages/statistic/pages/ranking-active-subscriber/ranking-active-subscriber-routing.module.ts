import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RankingActiveSubscriber } from "./ranking-active-subscriber.page";

const routes: Routes = [
  {
    path: "",
    component: RankingActiveSubscriber,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RankingActiveSubscriberPageRoutingModule {}
