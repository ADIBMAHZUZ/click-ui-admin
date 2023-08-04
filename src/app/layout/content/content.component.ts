import { GetProfile } from "./../../pages/auth/store/auth.action";
import { Component, OnInit } from "@angular/core";
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
import { catchError, windowWhen } from "rxjs/operators";
import { of, Subscription } from "rxjs";
import { id } from "@swimlane/ngx-datatable";
import { GlobalMenuService } from "src/app/services/global-menu.service";
import { AuthService } from "src/app/pages/auth/auth.service";
import { PublisherService } from "src/app/services/publisher.service";
import { ProfileService } from "src/app/pages/profile/profile.service";
import { BuyStoragePage } from "src/app/shared/modal/buy-storage/buy-storage.page";
import { Store } from "@ngxs/store";
import { AuthState } from "src/app/pages/auth/store/auth.state";

@Component({
  selector: "app-content",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.scss"],
})
export class ContentLayoutComponent implements OnInit {
  public user_type = "";
  public storage_used = "";
  public percent_storage = 0;
  img_logo = "";
  userName = "";

  public path: string;

  subscription = new Subscription();

  constructor(
    public menu: MenuController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private navController: NavController,
    private globalFooService: GlobalMenuService,
    private auth: AuthService,
    private router: Router,
    private alertController: AlertController,
    private publisherService: PublisherService,
    private toastController: ToastController,
    private profileService: ProfileService,
    private modalController: ModalController,
    private menuController: MenuController,
    private store: Store
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.store.dispatch(new GetProfile());

    this.translate.use(localStorage.getItem("language"));
    this.subscriptions();
  }

  subscriptions() {
    this.subscription.add(
      this.store.select(AuthState.getProfile).subscribe((data) => {
        if (!data) return;
        if (data.logo == null) {
          this.img_logo = "../../../assets/img/1.jpg";
        } else {
          this.img_logo = data?.logo;
        }
        this.userName = data?.username;
      })
    );
  }

  // getProfile() {
  //   let lang = localStorage.getItem("language");
  //   this.profileService.getProfile(lang).subscribe((data) => {
  //     if (data.logo == null) {
  //       this.img_logo = "../../../assets/img/1.jpg";
  //     } else {
  //       this.img_logo = data.logo;
  //     }
  //     this.userName = data.username;
  //   });
  // }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}
