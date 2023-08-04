import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: "root",
})
export class ConfigService {
  private configUrl: any = {
    auth: {
      login: environment.apiUrl + "auth/login/",
      logout: environment.apiUrl + "auth/logout/",
      forgotPassword: environment.apiUrl + "auth/forgot-password/",
      createNewPassword: environment.apiUrl + "auth/create-new-password/",
    },
    users: {
      profile: environment.apiUrl + "users/profile/",
      changePassword: environment.apiUrl + "users/change-password/",
      delete: environment.apiUrl + "users/delete/:id/",
      request_delete:
        environment.apiUrl + "librarian/request_delete_library/:id/",
    },
    librarians: {
      list_libraries: environment.apiUrl + "users/libraries/",
      list: environment.apiUrl + "users/librarians/",
      get: environment.apiUrl + "users/librarians/:id/",
      create: environment.apiUrl + "users/librarians/",
      delete: environment.apiUrl + "users/librarians/:id/",
      update: environment.apiUrl + "users/librarians/:id/",
      search: environment.apiUrl + "users/librarians/",
      current_subscriber: environment.apiUrl + "users/current_subscribers/",
      tracking: environment.apiUrl + "users/tracking_subscribers/",
      media_view: environment.apiUrl + "library_media_view/:id",
      deleteMulti: environment.apiUrl + "users/delete/",
    },
    subscribers: {
      list: environment.apiUrl + "users/subscribers/",
      get: environment.apiUrl + "users/subscribers/:id/",
      create: environment.apiUrl + "users/subscribers/",
      update: environment.apiUrl + "users/subscribers/:id/",
      updateStatus: environment.apiUrl + "users/subscribers/:id/",
      search: environment.apiUrl + "users/subscribers/",
      import: environment.apiUrl + "users/import_subscribers/",
      update_max_device: environment.apiUrl + "admin/max_device/:id/",
      delete: environment.apiUrl + "users/delete/:id/",
      deleteMulti: environment.apiUrl + "users/delete/",
    },
    teachers: {
      list: environment.apiUrl + "users/teachers/",
      get: environment.apiUrl + "users/teachers/:id/",
      create: environment.apiUrl + "users/teachers/",
      update: environment.apiUrl + "users/teachers/:id/",
      updateStatus: environment.apiUrl + "users/teachers/:id/",
      search: environment.apiUrl + "users/teachers/",
      import: environment.apiUrl + "users/import_teachers/",
      delete: environment.apiUrl + "users/delete/:id/",
      deleteMulti: environment.apiUrl + "users/delete/",
    },
    publishers: {
      list: environment.apiUrl + "users/publishers/",
      get: environment.apiUrl + "users/publishers/:id/",
      create: environment.apiUrl + "users/publishers/",
      update: environment.apiUrl + "users/publishers/:id/",
      updateStatus: environment.apiUrl + "users/publishers/:id/",
      search: environment.apiUrl + "users/publishers/",
      list_all: environment.apiUrl + "users/publishers/views/",
      buy_storage: environment.apiUrl + "publisher/request_storage/",
      delete: environment.apiUrl + "users/delete/",
    },
    school_history: {
      list: environment.apiUrl + "school_history/",
      get: environment.apiUrl + "school_history/:id/",
      create: environment.apiUrl + "school_history/",
      update: environment.apiUrl + "school_history/:id/",
      delete: environment.apiUrl + "school_history/:id/",
      search: environment.apiUrl + "school_history/",
      remove: environment.apiUrl + "school_history/delete/:id/",
    },
    school_news_board: {
      list: environment.apiUrl + "school_news_board/",
      get: environment.apiUrl + "school_news_board/:id/",
      create: environment.apiUrl + "school_news_board/",
      update: environment.apiUrl + "school_news_board/:id/",
      delete: environment.apiUrl + "school_news_board/:id/",
      search: environment.apiUrl + "school_news_board/",
      remove: environment.apiUrl + "school_news_board/delete/:id/",
    },
    student_content: {
      list: environment.apiUrl + "student_content/",
      get: environment.apiUrl + "student_content/:id/",
      create: environment.apiUrl + "student_content/",
      update: environment.apiUrl + "student_content/:id/",
      delete: environment.apiUrl + "student_content/:id/",
      search: environment.apiUrl + "student_content/",
      remove: environment.apiUrl + "student_content/delete/:id/",
    },

    statistics: {
      number_of_media: environment.apiUrl + "statistics/number_of_media/",
      number_of_download: environment.apiUrl + "statistics/number_of_download/",
      top_download_media: environment.apiUrl + "statistics/top_download_media/",
      media_per_category: environment.apiUrl + "statistics/media_per_category/",
      subscriber_per_media:
        environment.apiUrl + "statistics/subscriber_per_media/",
      number_of_register:
        environment.apiUrl + "statistics/library/number_of_register",
      number_of_borrowed_material:
        environment.apiUrl + "statistics/library/number_of_borrowed_material",
      ranking_downloaded_material:
        environment.apiUrl + "statistics/library/ranking_downloaded_material",
      ranking_active_subscriber:
        environment.apiUrl + "statistics/library/ranking_active_subscriber",
    },

    learning_material: {
      list: environment.apiUrl + "learning_material/",
      get: environment.apiUrl + "learning_material/:id/",
      create: environment.apiUrl + "learning_material/",
      update: environment.apiUrl + "learning_material/:id/",
      delete: environment.apiUrl + "learning_material/:id/",
      search: environment.apiUrl + "learning_material/",
      remove: environment.apiUrl + "learning_material/delete/:id/",
    },

    categories: {
      list: environment.apiUrl + "master_data/categories/",
    },

    dashboard: {
      list: environment.apiUrl + "statistics/dashboard/",
    },

    medias: {
      list: environment.apiUrl + "media_view/",
      get: environment.apiUrl + "media_view/:id/",
      create: environment.apiUrl + "media_view/",
      update: environment.apiUrl + "media_view/:id/",
      delete: environment.apiUrl + "media_view/:id/",
      search: environment.apiUrl + "media_view/",
      all: environment.apiUrl + "media/all/",
      cart: environment.apiUrl + "media/addtocart/",
      media_log: environment.apiUrl + "media/get_media_publisher/",
      media_accept: environment.apiUrl + "media/get_media_publisher/:id/",
      search_all: environment.apiUrl + "media/all/",
      multi_upload: environment.apiUrl + "media/multi_upload/",
      delete_media: environment.apiUrl + "media/:id/delete",
      library_media_view: environment.apiUrl + "library_media_view/",
      library_media_detail: environment.apiUrl + "library_media_view/:id",
      count_expired_media: environment.apiUrl + "expired_media/count/",
    },

    teacher_notes: {
      list: environment.apiUrl + "teacher_notes/:id/",
      create: environment.apiUrl + "teacher_notes/create_folder/",
      delete: environment.apiUrl + "teacher_notes/:id/",
      dirname: environment.publicUrl + "teacher_notes/:id/",
      dirname_child: environment.apiUrl + "teacher_notes/:id/list/?page=",
      dirname_page: environment.apiUrl + "teacher_notes/:id/?page=",
      list_child: environment.apiUrl + "teacher_notes/:id/list/",
      upload: environment.apiUrl + "notes/upload/",
      list_new: environment.apiUrl + "notes/:id/?page=:index",
      remove: environment.apiUrl + "notes/delete/:id/",
      list_new_root: environment.apiUrl + "notes/:id/?page=",
      rename: environment.apiUrl + "notes/rename/:id/",
      multi_delete: environment.apiUrl + "notes/multi_delete/",
    },

    notifications: {
      list_admin: environment.apiUrl + "admin/notification/",
      list_publisher: environment.apiUrl + "publisher/notification/",
      list_librarian: environment.apiUrl + "librarian/notification/",
      accept_reject_admin: environment.apiUrl + "admin/notification/:id/",
      accept_reject_publisher:
        environment.apiUrl + "publisher/notification/:id/",
      accept_reject_library: environment.apiUrl + "librarian/notification/:id/",
      request_delete_teacher:
        environment.apiUrl + "librarian/request_delete_teacher/:id/",
      request_delete_subscriber:
        environment.apiUrl + "librarian/request_delete_subscriber/:id/",
      count_notification: environment.apiUrl + "notification/count/",
    },

    log: {
      list_admin: environment.apiUrl + "admin/log/",
      list_log: environment.apiUrl + "users/log/",
    },

    quotation: {
      view: environment.apiUrl + "quotation/notification/:id/",
      send: environment.apiUrl + "quotation/notification/:id/",
    },
  };
  getConfig() {
    return this.configUrl;
  }
  constructor() {}
}
