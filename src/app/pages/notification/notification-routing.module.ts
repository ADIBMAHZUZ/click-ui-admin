import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RoleGuardService as RoleGuard } from "../../guards/role-guard.service";
import { NotificationPage } from "./notification.page";

const routes: Routes = [
  {
    path: "",
    component: NotificationPage,
    canActivate: [RoleGuard],
    data: {
      expectedRole: "admin",
      expectedRolePub: "publisher",
      expectedRoleLib: "librarian",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationPageRoutingModule {}
