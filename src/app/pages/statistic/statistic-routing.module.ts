import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RoleGuardService as RoleGuard } from "../../guards/role-guard.service";
import { StatisticPage } from "./statistic.page";

const routes: Routes = [
  {
    path: "",
    component: StatisticPage,
    canActivate: [RoleGuard],
    // canActivateChild: [RoleGuard],
    data: {
      expectedRole: "admin",
      expectedRolePub: "publisher",
      expectedRoleLib: "librarian",
    },
    children: [
      {
        path: "number-media",
        loadChildren: () =>
          import("./pages/number-media/number-media.module").then(
            (m) => m.NumberMediaPageModule
          ),
      },
      {
        path: "media-category",
        loadChildren: () =>
          import("./pages/media-category/media-category.module").then(
            (m) => m.MediaCategoryPageModule
          ),
      },
      {
        path: "subscriber-library",
        loadChildren: () =>
          import("./pages/subscriber-library/subscriber-library.module").then(
            (m) => m.SubscriberLibraryPageModule
          ),
      },
      {
        path: "number-download",
        loadChildren: () =>
          import("./pages/number-download/number-download.module").then(
            (m) => m.NumberDownloadPageModule
          ),
      },
      {
        path: "top-download",
        loadChildren: () =>
          import("./pages/top-download/top-download.module").then(
            (m) => m.TopDownloadPageModule
          ),
      },
      {
        path: "number-of-register",
        loadChildren: () =>
          import("./pages/number-of-register/number-of-register.module").then(
            (m) => m.NumberOfRegisterPageModule
          ),
      },
      {
        path: "number-of-borrowed-material",
        loadChildren: () =>
          import(
            "./pages/number-of-borrowed-material/number-of-borrowed-material.module"
          ).then((m) => m.NumberOfBorrowedMaterialPageModule),
      },
      {
        path: "ranking-downloaded-material",
        loadChildren: () =>
          import(
            "./pages/ranking-downloaded-material/ranking-downloaded-material.module"
          ).then((m) => m.RankingDownloadedMaterialPageModule),
      },
      {
        path: "ranking-active-subscriber",
        loadChildren: () =>
          import(
            "./pages/ranking-active-subscriber/ranking-active-subscriber.module"
          ).then((m) => m.RankingActiveSubscriberPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatisticPageRoutingModule {}
