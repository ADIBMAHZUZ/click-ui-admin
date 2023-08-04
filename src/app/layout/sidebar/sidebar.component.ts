import { GetProfile } from "./../../pages/auth/store/auth.action";
import { AuthState } from "./../../pages/auth/store/auth.state";
import {
  LoadCountMediaExpired,
  LoadCountNotification,
} from "./../../pages/notification/store/notification.actions";
import { NotificationState } from "./../../pages/notification/store/notification.state";
import { MediaService } from "src/app/services/media.service";
import { NotificationService } from "src/app/services/notification.service";
import { url } from "inspector";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import {
  Platform,
  MenuController,
  NavController,
  AlertController,
  ToastController,
  ModalController,
} from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { TranslateService } from "@ngx-translate/core";
import { Router, ActivatedRouteSnapshot } from "@angular/router";
import { isNumber } from "util";
import { catchError } from "rxjs/operators";
import { of, Subscription } from "rxjs";
import { id } from "@swimlane/ngx-datatable";
import { GlobalMenuService } from "src/app/services/global-menu.service";
import { AuthService } from "src/app/pages/auth/auth.service";
import { PublisherService } from "src/app/services/publisher.service";
import { ProfileService } from "src/app/pages/profile/profile.service";
import { BuyStoragePage } from "src/app/shared/modal/buy-storage/buy-storage.page";
import { Store } from "@ngxs/store";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SideBarComponent implements OnInit {
  public user_type = "";
  public storage_used = "";
  public percent_storage = 0;
  img_logo = "";
  userName = "";
  countNotification: number = 0;
  countExpiredMedia: number = 0;

  public appPages = [
    {
      title: "dashboard",
      url: "/dashboard",
      icon: "apps",
      roles: ["admin", "publisher"],
    },
    {
      title: "media",
      url: "/media",
      icon: "play",
      roles: ["librarian", "publisher"],
    },
    {
      title: "news",
      url: "/school-news",
      icon: "school",
      roles: ["librarian"],
    },
    {
      title: "note",
      url: "/teacher-note",
      icon: "book",
      roles: ["teacher"],
    },
    {
      title: "material",
      url: "/learning-material",
      icon: "library",
      roles: ["librarian"],
    },
    {
      title: "history",
      url: "/school-history",
      icon: "document-text",
      roles: ["librarian"],
    },
    {
      title: "student",
      url: "/student-content",
      icon: "paper-plane",
      roles: ["librarian", "subscriber"],
    },
    {
      title: "publisher",
      url: "/publisher",
      icon: "send",
      roles: ["admin"],
    },
    {
      title: "library",
      url: "/library",
      icon: "library",
      roles: ["admin"],
    },
    {
      title: "subscriber",
      url: "/subscriber",
      icon: "people",
      roles: ["librarian"],
    },
    {
      title: "teacher",
      url: "/teacher",
      src: "../../../assets/icon/user-graduate-solid.svg",
      roles: ["librarian"],
    },
    {
      title: "statistic",
      url: "/statistic",
      icon: "stats-chart",
      roles: ["admin", "publisher", "librarian"],
    },
    {
      title: "log",
      url: "/log",
      icon: "newspaper",
      roles: ["admin", "publisher"],
    },
    {
      title: "profile",
      url: "/profile",
      icon: "person",
      roles: ["full"],
    },
    {
      title: "change",
      url: "/change-password",
      icon: "lock-closed",
      roles: ["full"],
    },
    {
      title: "notification",
      url: "/notification",
      icon: "notifications",
      roles: ["admin", "publisher", "librarian"],
    },
    {
      title: "logout",
      url: "/auth/logout",
      icon: "log-out",
      roles: ["full"],
    },
    {
      title: "storage",
      url: "#",
      icon: "list",
      roles: ["publisher", "librarian", "teacher"],
    },
  ];

  public path: string;

  subscription = new Subscription();

  constructor(
    public menu: MenuController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private globalFooService: GlobalMenuService,
    private alertController: AlertController,
    private publisherService: PublisherService,
    private toastController: ToastController,
    private profileService: ProfileService,
    private modalController: ModalController,
    private mediaService: MediaService,
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef,
    private store: Store
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.menu.open();
    this.getProfile();
    this.initializeApp();
    this.translate.use(localStorage.getItem("language"));
    this.user_type = localStorage.getItem("user_type");

    this.store.dispatch(new LoadCountMediaExpired());
    this.store.dispatch(new LoadCountNotification());
    this.store.dispatch(new GetProfile());

    this.initData();
  }

  initData() {
    this.subscription.add(
      this.store
        .select(NotificationState.countMediaExpired)
        .subscribe((data) => {
          if (this.user_type == "librarian") {
            this.countExpiredMedia = data;
          }
        })
    );

    this.subscription.add(
      this.store
        .select(NotificationState.countNotification)
        .subscribe((data) => {
          this.countNotification = data;
        })
    );

    this.subscription.add(
      this.store.select(AuthState.getProfile).subscribe((data) => {
        if (!data) return;
        if (data?.current_storage != undefined && data?.storage != undefined) {
          this.translate
            .get("Publisher.used_storage", {
              value: data.current_storage,
              used: data.storage,
            })
            .subscribe((result) => {
              this.storage_used = result;
            });
          this.percent_storage = data.current_storage / data?.storage;
        }
      })
    );
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.globalFooService.getObservable().subscribe((data) => {
      this.user_type = localStorage.getItem("user_type");

      this.profileService
        .getProfile(localStorage.getItem("language"))
        .subscribe((data) => {
          if (data.current_storage != undefined && data.storage != undefined) {
            this.translate
              .get("Publisher.used_storage", {
                value: data.current_storage,
                used: data.storage,
              })
              .subscribe((result: string) => {
                this.storage_used = result;
              });
            this.percent_storage = data.current_storage / data.storage;
          }
        });
    });
  }

  ionViewWillEnter() {
    this.translate.use(localStorage.getItem("language"));
  }

  async buyStorage() {
    let header = "";
    this.translate.get("Publisher.buy_storage").subscribe((result: string) => {
      header = result;
    });

    let name = "";
    this.translate.get("Publisher.storage").subscribe((result: string) => {
      name = result;
    });
    const alert = await this.alertController.create({
      header: header,
      cssClass: "my-custom-alert-update",
      inputs: [
        {
          name: "storage_name",
          type: "text",
          label: name,
          placeholder: name,
          value: name,
          disabled: true,
        },
        {
          name: "storage_value",
          type: "text",
          placeholder: "100",
          value: 100,
          label: name,
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {},
        },
        {
          text: "Ok",
          handler: (dataAlert) => {
            if (this.checkNumber(dataAlert.storage_value)) {
              let params = {
                data: dataAlert.storage_value,
              };
              this.globalFooService.publishSomeData({ change: "storage" });
              this.publisherService
                .buyStoragePublisher(params)
                .subscribe((data) => {
                  debugger;
                  if (data?.success) {
                    this.requestSuccess();
                  } else {
                    this.requestFail(data?.error);
                  }
                });
            } else {
              this.errorNumber();
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async buyStorageModal() {
    const modal = await this.modalController.create({
      component: BuyStoragePage,
      showBackdrop: false,
      cssClass: "buyStorage",
    });
    modal.onDidDismiss().then((data) => {});
    return await modal.present();
  }

  async requestSuccess() {
    let title = "";
    this.translate.get("Publisher.notify_buy").subscribe((result: string) => {
      title = result;
    });
    const toast = await this.toastController.create({
      message: title,
      duration: 2000,
      position: "bottom",
      color: "primary",
      cssClass: "custom-toast",
    });
    toast.present();
  }

  async requestFail(error) {
    const toast = await this.toastController.create({
      message: error,
      duration: 2000,
      position: "bottom",
      color: "primary",
      cssClass: "custom-toast",
    });
    toast.present();
  }

  checkNumber(value) {
    let checkNumber = true;
    let checkNull = value;
    let check = parseInt(value);
    if (check < 0) {
      checkNumber = false;
    } else if (
      (!isNumber(check) || isNaN(check) || check < 0 || !isNumber(checkNull)) &&
      checkNull != "" &&
      check != checkNull
    ) {
      checkNumber = false;
    } else {
      checkNumber = true;
    }

    return checkNumber;
  }

  async errorNumber() {
    let notify = "";
    this.translate.get("Publisher.err_number").subscribe((result: string) => {
      notify = result;
    });

    let header = "";
    this.translate.get("Publisher.err_storage").subscribe((result: string) => {
      header = result;
    });

    const alert = await this.alertController.create({
      header: header,
      cssClass: "my-custom-alert",
      message: notify,
      buttons: [
        {
          text: "Ok",
          handler: () => {},
        },
      ],
    });
    await alert.present();
  }

  getProfile() {
    let lang = localStorage.getItem("language");
    this.profileService.getProfile(lang).subscribe((data) => {
      if (data.logo == null) {
        this.img_logo = "../../../assets/img/1.jpg";
      } else {
        this.img_logo = data.logo;
      }
      this.userName = data.username;
    });
  }
}
