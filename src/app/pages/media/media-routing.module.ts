import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MediaPage } from "./media.page";
import { RoleGuardService as RoleGuard } from "../../guards/role-guard.service";

const routes: Routes = [
  {
    path: "",
    component: MediaPage,
    canActivate: [RoleGuard],
    data: {
      expectedRolePub: "publisher",
      expectedRoleLib: "librarian",
    },
    children: [
      {
        path: "book",
        children: [
          {
            path: "",
            loadChildren:
              "./pages/media-list/page/list-book/list-book.module#ListBookPageModule",
          },
        ],
      },
      {
        path: "audio",
        children: [
          {
            path: "",
            loadChildren:
              "./pages/media-list/page/list-audio/list-audio.module#ListAudioPageModule",
          },
        ],
      },
      {
        path: "video",
        children: [
          {
            path: "",
            loadChildren:
              "./pages/media-list/page/list-video/list-video.module#ListVideoPageModule",
          },
        ],
      },
      {
        path: "",
        redirectTo: "/media/book",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "create",
    loadChildren: () =>
      import("./pages/media-create/media-create.module").then(
        (m) => m.MediaCreatePageModule
      ),
    canActivate: [RoleGuard],
    data: {
      expectedRolePub: "publisher",
    },
  },
  {
    path: "view/:id",
    loadChildren: () =>
      import("./pages/media-view/media-view.module").then(
        (m) => m.MediaViewPageModule
      ),
    canActivate: [RoleGuard],
    data: {
      expectedRolePub: "publisher",
    },
  },
  {
    path: "update/:id",
    loadChildren: () =>
      import("./pages/media-update/media-update.module").then(
        (m) => m.MediaUpdatePageModule
      ),
    canActivate: [RoleGuard],
    data: {
      expectedRolePub: "publisher",
    },
  },
  {
    path: "new",
    loadChildren: () =>
      import("./pages/media-new/media-new.module").then(
        (m) => m.MediaNewPageModule
      ),
    canActivate: [RoleGuard],
    data: {
      expectedRoleLib: "librarian",
    },
  },
  {
    path: "cart",
    loadChildren: () =>
      import("./pages/media-cart/media-cart.module").then(
        (m) => m.MediaCartPageModule
      ),
    canActivate: [RoleGuard],
    data: {
      expectedRoleLib: "librarian",
    },
  },
  {
    path: "pending",
    loadChildren: () =>
      import("./pages/media-pending/media-pending.module").then(
        (m) => m.MediaPendingPageModule
      ),
    canActivate: [RoleGuard],
    data: {
      expectedRolePub: "publisher",
      expectedRoleLib: "librarian",
    },
  },
  {
    path: "book",
    loadChildren: () =>
      import("./pages/media-list/page/list-book/list-book.module").then(
        (m) => m.ListBookPageModule
      ),
  },
  {
    path: "audio",
    loadChildren: () =>
      import("./pages/media-list/page/list-audio/list-audio.module").then(
        (m) => m.ListAudioPageModule
      ),
  },
  {
    path: "video",
    loadChildren: () =>
      import("./pages/media-list/page/list-video/list-video.module").then(
        (m) => m.ListVideoPageModule
      ),
  },
  {
    path: "multi-upload",
    loadChildren: () =>
      import("./pages/multi-upload/multi-upload.module").then(
        (m) => m.MultiUploadPageModule
      ),
    canActivate: [RoleGuard],
    data: {
      expectedRolePub: "publisher",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MediaPageRoutingModule {}
