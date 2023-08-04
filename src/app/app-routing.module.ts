import { ContentLayoutComponent } from "./layout/content/content.component";
import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthLayoutComponent } from "./layout/auth/auth.component";

const routes: Routes = [
  { path: "", redirectTo: "/auth/login", pathMatch: "full" },
  // { path: '**',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full'
  // },
  {
    path: "auth",
    component: AuthLayoutComponent,
    loadChildren: () =>
      import("./pages/auth/auth.module").then((m) => m.AuthPageModule),
  },
  {
    path: "",
    component: ContentLayoutComponent,
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("./pages/dashboard/dashboard.module").then(
            (m) => m.DashboardPageModule
          ),
      },
      {
        path: "profile",
        loadChildren: () =>
          import("./pages/profile/profile.module").then(
            (m) => m.ProfilePageModule
          ),
      },
      {
        path: "change-password",
        loadChildren: () =>
          import("./pages/change-password/change-password.module").then(
            (m) => m.ChangePasswordPageModule
          ),
      },
      {
        path: "library",
        loadChildren: () =>
          import("./pages/library/library.module").then(
            (m) => m.LibraryPageModule
          ),
      },
      {
        path: "subscriber",
        loadChildren: () =>
          import("./pages/subscriber/subscriber.module").then(
            (m) => m.SubscriberPageModule
          ),
      },
      {
        path: "teacher",
        loadChildren: () =>
          import("./pages/teacher/teacher.module").then(
            (m) => m.TeacherPageModule
          ),
      },
      {
        path: "publisher",
        loadChildren: () =>
          import("./pages/publisher/publisher.module").then(
            (m) => m.PublisherPageModule
          ),
      },
      {
        path: "school-news",
        loadChildren: () =>
          import("./pages/school-news/school-news.module").then(
            (m) => m.SchoolNewsPageModule
          ),
      },
      {
        path: "school-history",
        loadChildren: () =>
          import("./pages/school-history/school-history.module").then(
            (m) => m.SchoolHistoryPageModule
          ),
      },
      {
        path: "teacher-note",
        loadChildren: () =>
          import("./pages/teacher-note/teacher-note.module").then(
            (m) => m.TeacherNotePageModule
          ),
      },
      {
        path: "media",
        loadChildren: () =>
          import("./pages/media/media.module").then((m) => m.MediaPageModule),
      },
      {
        path: "learning-material",
        loadChildren: () =>
          import("./pages/learning-material/learning-material.module").then(
            (m) => m.LearningMaterialPageModule
          ),
      },
      {
        path: "student-content",
        loadChildren: () =>
          import("./pages/student-content/student-content.module").then(
            (m) => m.StudentContentPageModule
          ),
      },
      {
        path: "log",
        loadChildren: () =>
          import("./pages/log/log.module").then((m) => m.LogPageModule),
      },
      {
        path: "statistic",
        loadChildren: () =>
          import("./pages/statistic/statistic.module").then(
            (m) => m.StatisticPageModule
          ),
      },
      {
        path: "auth",
        loadChildren: () =>
          import("./pages/auth/auth.module").then((m) => m.AuthPageModule),
      },
      {
        path: "modal-view-file",
        loadChildren: () =>
          import("./shared/modal/modal-view-file/modal-view-file.module").then(
            (m) => m.ModalViewFilePageModule
          ),
      },
      {
        path: "upload-file",
        loadChildren: () =>
          import("./shared/modal/upload-file/upload-file.module").then(
            (m) => m.UploadFilePageModule
          ),
      },
      {
        path: "notification",
        loadChildren: () =>
          import("./pages/notification/notification.module").then(
            (m) => m.NotificationPageModule
          ),
      },
      {
        path: "buy-storage",
        loadChildren: () =>
          import("./shared/modal/buy-storage/buy-storage.module").then(
            (m) => m.BuyStoragePageModule
          ),
      },
      {
        path: "preview-library-home",
        loadChildren: () =>
          import(
            "./shared/modal/preview-library-home/preview-library-home.module"
          ).then((m) => m.PreviewLibraryHomePageModule),
      },
      {
        path: "rename-note",
        loadChildren: () =>
          import("./shared/modal/rename-note/rename-note.module").then(
            (m) => m.RenameNotePageModule
          ),
      },
      {
        path: "create-folder",
        loadChildren: () =>
          import("./shared/modal/create-folder/create-folder.module").then(
            (m) => m.CreateFolderPageModule
          ),
      },
      {
        path: "quotation",
        loadChildren: () =>
          import("./pages/quotation/quotation.module").then(
            (m) => m.QuotationPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
