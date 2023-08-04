import { CountNotification } from "./shared/models/models";
import { ChooseLibraryComponent } from "./../../shared/modal/choose-library/choose-library.component";
import { ChoosePublisherComponent } from "./../../shared/modal/choose-publisher/choose-publisher.component";
import {
  AlertController,
  ModalController,
  ToastController,
} from "@ionic/angular";
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { LibraryService } from "src/app/services/library.service";
import { GlobalMenuService } from "src/app/services/global-menu.service";
import { PublisherService } from "src/app/services/publisher.service";
import { NotificationService } from "src/app/services/notification.service";
import { Publisher } from "src/app/shared/model/model";
import { Store } from "@ngxs/store";
import { LoadCountNotification } from "./store/notification.actions";
import { PAGE_SIZE } from "src/app/shared/utils/constants";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.page.html",
  styleUrls: ["./notification.page.scss"],
})
export class NotificationPage implements OnInit {
  public dataPublisher: Publisher[] = [];
  public dataLibrary = [];
  public page_temp = 1;

  public publisher: Publisher = { id: "all", name: "All" };
  public publisher_all = "all";

  public library = { id: "all", name: "All" };
  public library_all = "all";
  public items;

  public dataNotification = [];

  public notification_arr = [];

  public checkUserType = false;
  public checkFilter = false;
  public pageIndex = 0;
  maxPage = 1;

  userType = localStorage.getItem("user_type");

  displayColumns = [
    "id",
    "message",
    "time",
    "quotation",
    "status",
    "payment",
    "action",
  ];
  pageSize: number = PAGE_SIZE;
  constructor(
    private translate: TranslateService,
    private globalService: GlobalMenuService,
    private notificationService: NotificationService,
    private alertController: AlertController,
    private toastController: ToastController,
    private modalController: ModalController,
    private store: Store
  ) {
    this.translate.use(localStorage.getItem("language"));
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.translate.use(localStorage.getItem("language"));
    let params = {
      page: 1,
      lan: localStorage.getItem("language"),
    };
    if (this.userType == "admin") {
      this.checkUserType = true;
      this.loadDataNotificationAdmin(params);
    }
    if (this.userType == "publisher") {
      let paramsPub;
      if (this.library.id != "all") {
        paramsPub = {
          page: 1,
          lan: localStorage.getItem("language"),
          library: this.library.id,
        };
      } else {
        paramsPub = {
          page: 1,
          lan: localStorage.getItem("language"),
        };
      }
      this.checkUserType = false;
      this.loadDataNotificationPublisher(paramsPub);
    }
    if (this.userType == "librarian") {
      this.checkUserType = true;
      this.loadDataNotificationLibrarian(params);
    }
  }

  loadDataNotificationAdmin(params) {
    this.notificationService.listNotificationAdmin(params).subscribe((data) => {
      this.items = data.count;
      this.maxPage =
        data?.count % this.pageSize != 0
          ? Math.floor(data?.count / this.pageSize) + 1
          : data?.count / this.pageSize;

      this.dataNotification = data.results;
      if (data.results.length > 0) {
        this.notification_arr = [];
        for (var i = 0; i < data.results.length; i++) {
          let temp;
          if (this.dataNotification[i].status == "pending") {
            temp = {
              fill_acc: "outline",
              fill_re: "outline",
              disable_acc: false,
              disable_re: false,
            };
          } else if (this.dataNotification[i].status == "approved") {
            temp = {
              fill_acc: "outline",
              fill_re: "clear",
              disable_acc: true,
              disable_re: true,
            };
          } else if (this.dataNotification[i].status == "rejected") {
            temp = {
              fill_acc: "clear",
              fill_re: "outline",
              disable_acc: true,
              disable_re: true,
            };
          } else {
            temp = {
              fill_acc: "outline",
              fill_re: "outline",
              disable_acc: true,
              disable_re: true,
            };
          }
          this.notification_arr.push(temp);
        }
        if (this.checkFilter) {
          this.globalService.publishDataFilter({ page: 1 });
          this.checkFilter = false;
        }
      }
    });
  }

  loadDataNotificationPublisher(params) {
    //get notification
    this.notificationService
      .listNotificationPublisher(params)
      .subscribe((data) => {
        this.items = data.count;
        this.maxPage =
          data?.count % this.pageSize != 0
            ? Math.floor(data?.count / this.pageSize) + 1
            : data?.count / this.pageSize;
        this.dataNotification = data.results;
        if (data.results.length > 0) {
          this.notification_arr = [];
          for (var i = 0; i < this.dataNotification.length; i++) {
            let temp;
            if (this.dataNotification[i].status == "pending") {
              temp = {
                fill_acc: "outline",
                fill_re: "outline",
                disable_acc: false,
                disable_re: false,
              };
            } else if (this.dataNotification[i].status == "approved") {
              temp = {
                fill_acc: "outline",
                fill_re: "clear",
                disable_acc: true,
                disable_re: true,
              };
            } else if (this.dataNotification[i].status == "rejected") {
              temp = {
                fill_acc: "clear",
                fill_re: "outline",
                disable_acc: true,
                disable_re: true,
              };
            } else {
              temp = {
                fill_acc: "outline",
                fill_re: "outline",
                disable_acc: true,
                disable_re: true,
              };
            }

            if (
              (this.dataNotification[i].status == "pending" ||
                this.dataNotification[i].status == "pending") &&
              this.dataNotification[i].ref_no != "Free"
            ) {
              if (this.dataNotification[i].ref_no == null) {
                temp = {
                  fill_acc: "outline",
                  fill_re: "outline",
                  disable_acc: true,
                  disable_re: true,
                };
              }
              if (
                this.dataNotification[i].ref_no != null &&
                this.dataNotification[i].is_send_quotation == true
              ) {
                temp = {
                  fill_acc: "outline",
                  fill_re: "outline",
                  disable_acc: false,
                  disable_re: true,
                };
              }
              if (this.dataNotification[i].is_send_quotation == false) {
                temp = {
                  fill_acc: "outline",
                  fill_re: "outline",
                  disable_acc: true,
                  disable_re: false,
                };
              }
            }

            this.notification_arr.push(temp);
          }
          if (this.checkFilter) {
            this.globalService.publishDataFilter({ page: 1 });
            this.checkFilter = false;
          }
        }
      });
  }

  loadDataNotificationLibrarian(params) {
    //get notification
    this.notificationService
      .listNotificationLibrarian(params)
      .subscribe((data) => {
        this.items = data.count;
        this.maxPage =
          data?.count % this.pageSize != 0
            ? Math.floor(data?.count / this.pageSize) + 1
            : data?.count / this.pageSize;
        this.dataNotification = data.results;
        if (data.results.length > 0) {
          this.notification_arr = [];
          for (var i = 0; i < this.dataNotification.length; i++) {
            let temp;
            if (this.dataNotification[i].status == "pending") {
              temp = {
                fill_acc: "outline",
                fill_re: "outline",
                disable_acc: false,
                disable_re: false,
              };
            } else if (this.dataNotification[i].status == "approved") {
              temp = {
                fill_acc: "outline",
                fill_re: "clear",
                disable_acc: true,
                disable_re: true,
              };
            } else if (this.dataNotification[i].status == "rejected") {
              temp = {
                fill_acc: "clear",
                fill_re: "outline",
                disable_acc: true,
                disable_re: true,
              };
            } else {
              temp = {
                fill_acc: "clear",
                fill_re: "clear",
                disable_acc: true,
                disable_re: true,
              };
            }
            this.notification_arr.push(temp);
          }
          if (this.checkFilter) {
            this.globalService.publishDataFilter({ page: 1 });
            this.checkFilter = false;
          }
        }
      });
  }

  changePublisher() {
    //change publisher
    let role = localStorage.getItem("user_type");
    this.checkFilter = true;
    if (role == "admin") {
      let params = this.getParamsFilterAdmin(1);
      this.loadDataNotificationAdmin(params);
    }
    if (role == "librarian") {
      let params = this.getParamsFilterLibrary(1);
      this.loadDataNotificationLibrarian(params);
    }
  }

  changeLibrary() {
    //change library
    let role = localStorage.getItem("user_type");
    this.checkFilter = true;
    if (role == "admin") {
      let params = this.getParamsFilterAdmin(1);
      this.loadDataNotificationAdmin(params);
    }

    if (role == "publisher") {
      let params = this.getParamsFilterPublisher(1);
      this.loadDataNotificationPublisher(params);
    }
  }

  async acceptNotification(id) {
    let temp = localStorage.getItem("user_type");
    let params = {
      accept: true,
    };
    let params_page = {
      page: this.page_temp,
      lan: localStorage.getItem("language"),
    };

    const alert = await this.alertController.create({
      header: "",
      cssClass: "my-custom-alert",
      message: this.translate.instant("Notification.accept"),
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
        },
        {
          text: this.translate.instant("Button.accept"),
          handler: () => {
            if (temp == "admin") {
              this.notificationService
                .acceptRejectAdmin(id, params)
                .subscribe((data) => {
                  this.store.dispatch(new LoadCountNotification());
                  this.loadDataNotificationAdmin(params_page);
                });
            }

            if (temp == "publisher") {
              this.notificationService
                .acceptRejectPublisher(id, params)
                .subscribe((data) => {
                  this.store.dispatch(new LoadCountNotification());
                  this.loadDataNotificationPublisher(params_page);
                });
            }

            if (temp == "librarian") {
              this.notificationService
                .acceptRejectLibrary(id, params)
                .subscribe((data) => {
                  if (data?.success) {
                    this.store.dispatch(new LoadCountNotification());
                    this.loadDataNotificationLibrarian(params_page);
                  } else {
                    this.requestFail(data?.message);
                  }
                });
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async rejectNotification(id) {
    let temp = localStorage.getItem("user_type");
    let params = {
      accept: false,
    };
    let params_page = {
      page: this.page_temp,
      lan: localStorage.getItem("language"),
    };
    const alert = await this.alertController.create({
      header: "",
      cssClass: "my-custom-alert",
      message: this.translate.instant("Notification.reject"),
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
        },
        {
          text: this.translate.instant("Button.reject"),
          handler: () => {
            if (temp == "admin") {
              this.notificationService
                .acceptRejectAdmin(id, params)
                .subscribe((data) => {
                  this.store.dispatch(new LoadCountNotification());
                  this.loadDataNotificationAdmin(params_page);
                });
            }

            if (temp == "publisher") {
              this.notificationService
                .acceptRejectPublisher(id, params)
                .subscribe((data) => {
                  this.store.dispatch(new LoadCountNotification());
                  this.loadDataNotificationPublisher(params_page);
                });
            }

            if (temp == "librarian") {
              this.notificationService
                .acceptRejectLibrary(id, params)
                .subscribe((data) => {
                  this.store.dispatch(new LoadCountNotification());
                  this.loadDataNotificationLibrarian(params_page);
                });
            }
          },
        },
      ],
    });
    await alert.present();
  }

  onChangePage(index) {
    if (index == 0) {
      this.page_temp = 1;
    }
    if (index > 0) {
      this.page_temp = index;
    }

    if (this.pageIndex != this.page_temp) {
      let temp = localStorage.getItem("user_type");
      if (temp == "admin") {
        let parasmAdmin = this.getParamsFilterAdmin(this.page_temp);
        this.loadDataNotificationAdmin(parasmAdmin);
      }
      if (temp == "publisher") {
        let paramsPub = this.getParamsFilterPublisher(this.page_temp);
        this.loadDataNotificationPublisher(paramsPub);
      }
      if (temp == "librarian") {
        let paramsPub = this.getParamsFilterLibrary(this.page_temp);
        this.loadDataNotificationLibrarian(paramsPub);
      }
      this.pageIndex = this.page_temp;
    }
  }

  // Get params filter for admin
  getParamsFilterAdmin(page) {
    let params;
    if (this.library.id != "all" && this.publisher.id != "all") {
      params = {
        page: page,
        lan: localStorage.getItem("language"),
        library: this.library.id,
        publisher: this.publisher.id,
      };
    }
    if (this.library.id == "all" && this.publisher.id != "all") {
      params = {
        page: page,
        lan: localStorage.getItem("language"),
        publisher: this.publisher.id,
      };
    }
    if (this.library.id != "all" && this.publisher.id == "all") {
      params = {
        page: page,
        lan: localStorage.getItem("language"),
        library: this.library.id,
      };
    }
    if (this.library.id == "all" && this.publisher.id == "all") {
      params = {
        page: page,
        lan: localStorage.getItem("language"),
      };
    }
    return params;
  }

  //Get params filter for publisher
  getParamsFilterPublisher(page) {
    let params;
    if (this.library.id != "all") {
      params = {
        page: page,
        lan: localStorage.getItem("language"),
        library: this.library.id,
      };
    }
    if (this.library.id == "all") {
      params = {
        page: page,
        lan: localStorage.getItem("language"),
      };
    }
    return params;
  }

  getParamsFilterLibrary(page) {
    let params;
    if (this.publisher.id != "all") {
      params = {
        page: page,
        lan: localStorage.getItem("language"),
        publisher: this.publisher.id,
      };
    }
    if (this.publisher.id == "all") {
      params = {
        page: page,
        lan: localStorage.getItem("language"),
      };
    }
    return params;
  }

  async choosePublisher() {
    const modal = await this.modalController.create({
      component: ChoosePublisherComponent,
      showBackdrop: false,
      cssClass: "chooseModalCss",
      componentProps: {
        data: this.publisher,
      },
    });
    await modal.present();
    modal.onDidDismiss().then((data) => {
      if (data.role == "submit") {
        this.publisher = data?.data;
      }
      this.changePublisher();
    });
    this.pageIndex = 1;
  }

  async chooseLibrary() {
    const modal = await this.modalController.create({
      component: ChooseLibraryComponent,
      showBackdrop: false,
      cssClass: "chooseModalCss",
      componentProps: {
        data: this.library,
      },
    });
    await modal.present();
    modal.onDidDismiss().then((data) => {
      if (data.role == "submit") {
        this.library = data?.data;
      }
      this.changeLibrary();
    });
    this.pageIndex = 1;
  }

  reset() {
    this.publisher = { id: "all", name: "All" };
    this.library = { id: "all", name: "All" };
    this.changePublisher();
    this.changeLibrary();
  }

  async requestFail(error) {
    const toast = await this.toastController.create({
      message: error,
      duration: 2000,
      position: "bottom",
      color: "danger",
      cssClass: "custom-toast",
    });
    toast.present();
  }
}
