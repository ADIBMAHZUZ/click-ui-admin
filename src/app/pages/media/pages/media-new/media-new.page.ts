import { ModalController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";
import { GlobalMenuService } from "src/app/services/global-menu.service";
import { TranslateService } from "@ngx-translate/core";
import { LibraryService } from "src/app/services/library.service";
import { PublisherService } from "src/app/services/publisher.service";
import { Publisher } from "src/app/shared/model/model";
import { ChoosePublisherComponent } from "src/app/shared/modal/choose-publisher/choose-publisher.component";

@Component({
  selector: "app-media-new",
  templateUrl: "./media-new.page.html",
  styleUrls: ["./media-new.page.scss"],
})
export class MediaNewPage implements OnInit {
  public searchMedia = "";
  public dataPublisher = [
    { id: "all", name: "Publisher 01" },
    { id: 1, name: "Publisher 01" },
    { id: 2, name: "Publisher 02" },
    { id: 3, name: "Publisher 03" },
    { id: 4, name: "Publisher 04" },
    { id: 5, name: "Publisher 05" },
  ];
  public publisher: Publisher = { id: "all", name: "All" };
  public publisher_all = "all";
  public number = 0;
  constructor(
    private globalFooService: GlobalMenuService,
    private translate: TranslateService,
    private libraryService: LibraryService,
    private publisherService: PublisherService,
    private modalController: ModalController
  ) {
    this.translate.use(localStorage.getItem("language"));
  }

  ionViewWillEnter() {
    this.publisher = { id: "all", name: "All" };
    this.publisher_all = "all";
    this.searchMedia = "";
    this.translate.use(localStorage.getItem("language"));
    this.publisherService.listAllPublisher().subscribe((data) => {
      this.dataPublisher = data;
    });
    this.loadPublisher();
    // Reset search and filter for library
    this.globalFooService
      .getObservableResetSearchFilterGetNew()
      .subscribe((data) => {
        if (data.reset) {
          this.publisher = { id: "all", name: "All" };
          this.publisher_all = "all";
          this.searchMedia = "";
        }
      });
  }

  ngOnInit() {}

  addToCart(id) {}

  onSearchMedia() {
    this.globalFooService.publishSomeData({
      change: this.searchMedia,
      number: this.number,
    });
    this.number++;
  }

  loadPublisher() {
    //get data publisher
  }

  changePublisher(item) {
    this.globalFooService.publishSomeData({
      filter: item,
      number: this.number,
    });
  }

  changeLibrary(item) {
    this.globalFooService.publishSomeData({
      library: item,
    });
    this.number++;
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
        this.changePublisher(data?.data?.id);
      }
    });
  }
}
