import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AlertController, ModalController } from "@ionic/angular";
import { GlobalMenuService } from "src/app/services/global-menu.service";
import { MediaService } from "src/app/services/media.service";
import { PublisherService } from "src/app/services/publisher.service";
import { Router } from "@angular/router";
import { ChoosePublisherComponent } from "src/app/shared/modal/choose-publisher/choose-publisher.component";

@Component({
  selector: "app-media",
  templateUrl: "./media.page.html",
  styleUrls: ["./media.page.scss"],
})
export class MediaPage implements OnInit {
  public notify_delete = "";
  public data = [];
  public columns = [];
  public searchMedia = "";
  public checkCreate = false;
  public publisher = "all";
  public publisher_all = "all";
  public search_publisher: any = { name: "All", id: "all" };
  public dataPublisher = [];

  constructor(
    private translate: TranslateService,
    public alertController: AlertController,
    private globalFooService: GlobalMenuService,
    private mediaService: MediaService,
    private publisherService: PublisherService,
    private modalController: ModalController,
    private router: Router
  ) {
    this.translate.use(localStorage.getItem("language"));
    this.columns = [
      { prop: "id", name: "ID" },
      { prop: "name", name: "Name" },
      { prop: "author", name: "Author" },
      { prop: "is_active", name: "Active" },
      { prop: "category", name: "Category" },
      { prop: "price", name: "Price" },
    ];
    this.checkCreate = false;
    if (localStorage.getItem("user_type") != "librarian") {
      this.checkCreate = true;
    }
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.translate.use(localStorage.getItem("language"));
    this.checkCreate = false;
    this.publisherService.listAllPublisher().subscribe((data) => {
      this.dataPublisher = data;
    });
    if (localStorage.getItem("user_type") != "librarian") {
      this.checkCreate = true;
    }
    if (localStorage.getItem("language") == "en") {
      this.notify_delete = "Are you sure you want to delete?";
    } else {
      this.notify_delete = "Adakah anda pasti ingin memadam?";
    }
    // this.loadPublisher()

    // Reset search and filter for library
    this.globalFooService.getObservableResetSearchFilter().subscribe((data) => {
      if (data.reset) {
        this.globalFooService.publishSomeData({});
        this.publisher = "all";
        this.publisher_all = "all";
        this.search_publisher = { name: "All", id: "all" };
        this.searchMedia = "";
      }
    });
  }

  loadPublisher() {
    //get data publisher
  }
  changePublisher(item) {
    this.globalFooService.publishSomeData({
      filter: item,
      change: this.searchMedia,
    });
  }

  async deleteMedia(id) {
    const alert = await this.alertController.create({
      header: "",
      cssClass: "my-custom-alert",
      message: this.notify_delete,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            // this.loadData()
          },
        },
        {
          text: "Ok",
          handler: () => {
            // this.libraryService.deleteLibrary(id).subscribe(data => {
            //   this.loadData()
            // })
          },
        },
      ],
    });
    await alert.present();
  }

  onSearchMedia() {
    this.globalFooService.publishSomeData({
      change: this.searchMedia,
      filter: this.search_publisher?.id,
    });
  }

  async choosePublisher() {
    const modal = await this.modalController.create({
      component: ChoosePublisherComponent,
      showBackdrop: false,
      cssClass: "chooseModalCss",
      componentProps: {
        data: this.search_publisher,
      },
    });
    await modal.present();
    modal.onDidDismiss().then((data) => {
      if (data.role == "submit") {
        this.search_publisher = data?.data;
        this.changePublisher(data?.data?.id);
      }
    });
  }
}
