import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SubscriberPage } from "./subscriber.page";
import { RoleGuardService as RoleGuard } from "../../guards/role-guard.service";

const routes: Routes = [
  {
    path: "",
    component: SubscriberPage,
    canActivate: [RoleGuard],
    data: {
      expectedRoleLibrary: "librarian",
    },
  },
  {
    path: "create",
    loadChildren: () =>
      import("./pages/subscriber-create/subscriber-create.module").then(
        (m) => m.SubscriberCreatePageModule
      ),
    canActivate: [RoleGuard],
    data: {
      expectedRoleLibrary: "librarian",
    },
  },
  {
    path: "view/:id",
    loadChildren: () =>
      import("./pages/subscriber-view/subscriber-view.module").then(
        (m) => m.SubscriberViewPageModule
      ),
    canActivate: [RoleGuard],
    data: {
      expectedRoleLibrary: "librarian",
    },
  },
  {
    path: "update/:id",
    loadChildren: () =>
      import("./pages/subscriber-update/subscriber-update.module").then(
        (m) => m.SubscriberUpdatePageModule
      ),
    canActivate: [RoleGuard],
    data: {
      expectedRoleLibrary: "librarian",
    },
  },
  {
    path: "subscriber-import-csv",
    loadChildren: () =>
      import("./pages/subscriber-import-csv/subscriber-import-csv.module").then(
        (m) => m.SubscriberImportCsvPageModule
      ),
    canActivate: [RoleGuard],
    data: {
      expectedRoleLibrary: "librarian",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriberPageRoutingModule {}
