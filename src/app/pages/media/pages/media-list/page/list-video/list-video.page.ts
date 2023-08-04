import { LibraryService } from "src/app/services/library.service";
import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { GlobalMenuService } from "src/app/services/global-menu.service";
import { TranslateService } from "@ngx-translate/core";
import { AlertController, ToastController } from "@ionic/angular";
import { MediaService } from "src/app/services/media.service";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import * as moment from "moment";
import { Subscription } from "rxjs";
import { PAGE_SIZE } from "src/app/shared/utils/constants";

@Component({
  selector: "app-list-video",
  templateUrl: "./list-video.page.html",
  styleUrls: ["./list-video.page.scss"],
})
export class ListVideoPage implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  searchVideo = "";
  checkSearchPage = false;
  filterVideo = "";
  checkFilterVideo = false;
  rowCountPage;
  currentPageLimit: number = 10;
  currentVisible: number = 3;
  notify_delete = "";
  data = [];
  images = [];
  columns;
  checkUserType = false;
  currentDate = moment();
  pageSize: number = PAGE_SIZE;
  curPage: number = 1;
  private subscription = new Subscription();
  constructor(
    private globalFooService: GlobalMenuService,
    private translate: TranslateService,
    public alertController: AlertController,
    private mediaService: MediaService,
    private cdr: ChangeDetectorRef,
    private toastController: ToastController,
    private libraryService: LibraryService
  ) {
    this.columns = [
      { prop: "id", name: "ID" },
      { prop: "name", name: "Name" },
      { prop: "author", name: "Author" },
      { prop: "quantity", name: "Quantity" },
      { prop: "is_active", name: "Active" },
      { prop: "media_type", name: "Media type" },
      { prop: "media_type", name: "Media type" },
      { prop: "library_active", name: "Active" },
      { prop: "publisher_active", name: "Active" },
      { prop: "publisher_name", name: "Publisher name" },
      { prop: "price", name: "Price" },
      { prop: "is_renew", name: "Renew" },
    ];
    this.translate.use(localStorage.getItem("language"));
    this.checkUserType = false;
    if (localStorage.getItem("user_type") != "librarian") {
      this.checkUserType = true;
    }
  }

  ngOnInit() {}

  ionViewWillEnter() {
    // Reset search and filter for library
    this.globalFooService.publishResetSearchFilter({ reset: true });
    this.translate.use(localStorage.getItem("language"));
    localStorage.removeItem("type_media");
    localStorage.setItem("type_media", "video");
    this.checkUserType = false;
    if (localStorage.getItem("user_type") != "librarian") {
      this.checkUserType = true;
    }
    if (localStorage.getItem("language") == "en") {
      this.notify_delete = "Are you sure you want to delete?";
    } else {
      this.notify_delete = "Adakah anda pasti ingin memadam?";
    }
    this.loadData();
    this.subscription.add(
      this.globalFooService.getSearchVideo().subscribe((data) => {
        let params = { media_type: "video" };
        if (data.change != undefined) {
          if (data?.change != "") {
            params["name"] = data.change;
            this.searchVideo = data.change;
          }
        }
        if (data.filter != undefined) {
          if (data.filter != "all") {
            params["publisher"] = data.filter;
            this.filterVideo = data.filter;
          }
        }
        this.curPage = 1;
        this.loadData(params);
      })
    );
  }

  loadData(param?: any) {
    let params = {
      media_type: "video",
      ...param,
    };
    if (!this.checkUserType) {
      this.mediaService.listMediaForLibrarian(params).subscribe((data) => {
        this.images = [];
        this.rowCountPage = data.count;
        this.checkSearchPage = !!params?.name;
        this.checkFilterVideo = !!params?.library;
        this.onLimitChange(parseInt(data.results.length));
        this.data = data.results;
        this.cdr.detectChanges();
      });
      return;
    } else {
      this.mediaService.listMedia(params).subscribe((data) => {
        this.images = [];
        this.rowCountPage = data.count;
        this.checkSearchPage = !!params?.name;
        this.checkFilterVideo = !!params?.publisher;
        this.onLimitChange(parseInt(data.results.length));
        this.data = data?.results.map((item) => ({
          ...item,
          isRenew: this.checkRenew(item?.expired_date, this.currentDate),
        }));
        this.cdr.detectChanges();
      });
    }
  }

  async deleteVideo(item) {
    const alert = await this.alertController.create({
      header: "",
      cssClass: "my-custom-alert",
      message: this.checkError(item),
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            this.loadData();
          },
        },
        {
          text: "Ok",
          handler: () => {
            if (!this.checkUserType) {
              this.libraryService.updateStatus(item.id).subscribe((data) => {
                this.loadData();
              });
            } else {
              this.mediaService.updateStatusMedia(item.id).subscribe((data) => {
                this.loadData();
              });
            }
          },
        },
      ],
    });
    await alert.present();
  }

  checkError(item) {
    if (this.checkUserType) {
      if (!item.is_active) {
        this.translate
          .get("Media.notify_inactive", { media: item.name })
          .subscribe((result: string) => {
            this.notify_delete = result;
          });
      } else {
        this.translate
          .get("Media.notify_active", { media: item.name })
          .subscribe((result: string) => {
            this.notify_delete = result;
          });
      }
    } else {
      if (!item.library_active) {
        this.translate
          .get("Media.notify_inactive", { media: item.name })
          .subscribe((result: string) => {
            this.notify_delete = result;
          });
      } else {
        this.translate
          .get("Media.notify_active", { media: item.name })
          .subscribe((result: string) => {
            this.notify_delete = result;
          });
      }
    }
    return this.notify_delete;
  }

  changePage(ev) {
    let params;
    if (!this.checkSearchPage && !this.checkFilterVideo) {
      params = {
        media_type: "video",
        page: ev.page,
      };
    } else if (this.checkSearchPage && !this.checkFilterVideo) {
      params = {
        media_type: "video",
        page: ev.page,
        name: this.searchVideo,
      };
    } else if (!this.checkSearchPage && this.checkFilterVideo) {
      params = {
        media_type: "video",
        page: ev.page,
        publisher: this.filterVideo,
      };
    }
    this.curPage = ev.page;
    this.loadData(params);
  }

  public onLimitChange(limit: any): void {
    this.changePageLimit(limit);
    this.table.limit = this.currentPageLimit;
    this.table.recalculate();
    setTimeout(() => {
      if (this.table.bodyComponent.temp.length <= 0) {
        this.table.offset = Math.floor(
          (this.table.rowCount - 1) / this.table.limit
        );
      }
    });
  }

  public onVisibleChange(visible: any): void {
    this.currentVisible = parseInt(visible, 10);
  }

  private changePageLimit(limit: any): void {
    this.currentPageLimit = parseInt(limit, 10);
  }

  async deleteMedia(item) {
    let delete_notify = "";
    this.translate
      .get("Media.delete_confirm", { media: item.name })
      .subscribe((result: string) => {
        delete_notify = result;
      });
    const alert = await this.alertController.create({
      header: "",
      cssClass: "my-custom-alert",
      message: delete_notify,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            this.loadData();
          },
        },
        {
          text: "Delete",
          handler: () => {
            this.mediaService.deleteMedia(item.id).subscribe((data) => {
              if (data?.success) {
                this.loadData();
                this.DeleteSuccess();
              } else {
                this.DeleteFalse(data?.error);
              }
            });
          },
        },
      ],
    });
    await alert.present();
  }

  async DeleteSuccess() {
    const toast = await this.toastController.create({
      message: "Delete Successful",
      duration: 2000,
      position: "bottom",
      color: "primary",
      cssClass: "custom-toast",
    });
    toast.present();
  }

  async DeleteFalse(error: string) {
    const toast = await this.toastController.create({
      message: error,
      duration: 2000,
      position: "bottom",
      color: "danger",
      cssClass: "custom-toast",
    });
    toast.present();
  }

  checkRenew(expired_date, current_date) {
    if (moment(expired_date) < moment(current_date)) {
      return true;
    }
    return false;
  }

  ionViewWillLeave(): void {
    this.subscription.unsubscribe();
  }
}
