import { LibraryService } from "src/app/services/library.service";
import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { GlobalMenuService } from "src/app/services/global-menu.service";
import { TranslateService } from "@ngx-translate/core";
import { AlertController, ToastController } from "@ionic/angular";
import { MediaService } from "src/app/services/media.service";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { BorrowMedia } from "src/app/pages/media/shared/model/model";
import { Router } from "@angular/router";
import * as moment from "moment";
import { Subscription } from "rxjs";
import { PAGE_SIZE } from "src/app/shared/utils/constants";

@Component({
  selector: "app-list-audio",
  templateUrl: "./list-audio.page.html",
  styleUrls: ["./list-audio.page.scss"],
})
export class ListAudioPage implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  searchAudio = "";
  checkSearchPage = false;
  filterAudio = "";
  checkFilterAudio = false;
  rowCountPage;
  currentPageLimit: number = 10;
  currentVisible: number = 3;
  notify_delete = "";
  data: any = [];
  images = [];
  columns;
  checkUserType = false;
  currentDate = moment();
  curPage: number = 1;
  pageSize = PAGE_SIZE;
  private subscription = new Subscription();
  constructor(
    private globalFooService: GlobalMenuService,
    private translate: TranslateService,
    public alertController: AlertController,
    private mediaService: MediaService,
    private cdr: ChangeDetectorRef,
    private toastController: ToastController,
    private router: Router,
    private libraryService: LibraryService
  ) {
    this.columns = [
      { prop: "id", name: "ID" },
      { prop: "name", name: "Name" },
      { prop: "author", name: "Author" },
      { prop: "quantity", name: "Quantity" },
      { prop: "is_active", name: "Active" },
      { prop: "category", name: "Category" },
      { prop: "library_active", name: "Active" },
      { prop: "price", name: "Price" },
      { prop: "publisher_active", name: "Active" },
      { prop: "publisher_name", name: "Publisher name" },
    ];
    this.translate.use(localStorage.getItem("language"));
    if (localStorage.getItem("user_type") == "librarian") {
      this.checkUserType = true;
    }
  }

  ngOnInit() {
    this.loadData();
  }

  ionViewWillEnter() {
    // Reset search and filter for library
    this.globalFooService.publishResetSearchFilter({ reset: true });
    this.translate.use(localStorage.getItem("language"));
    localStorage.removeItem("type_media");
    localStorage.setItem("type_media", "audio");
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
      this.globalFooService.getSearchAudio().subscribe((data) => {
        let params = { media_type: "audio" };
        if (data.change != undefined) {
          if (data.change != "") {
            params["name"] = data.change;
            this.searchAudio = data.change;
          }
        }
        if (data.filter != undefined) {
          if (data.filter != "all") {
            params["publisher"] = data.filter;
            this.filterAudio = data.filter;
          }
        }
        this.curPage = 1;
        this.loadData(params);
      })
    );
  }

  loadData(param?: any) {
    let params = {
      media_type: "audio",
      ...param,
    };
    if (this.checkUserType) {
      this.mediaService.listMedia(params).subscribe((data) => {
        this.cdr.detectChanges();
        this.images = [];
        this.rowCountPage = data.count;
        this.checkSearchPage = !!param?.name;
        this.checkFilterAudio = !!param?.library;
        this.onLimitChange(parseInt(data.results.length));
        this.data = data.results;
      });
    } else {
      this.mediaService.listMediaForLibrarian(params).subscribe((data) => {
        this.cdr.detectChanges();
        this.images = [];
        this.rowCountPage = data.count;
        this.checkSearchPage = !!param?.name;
        this.checkFilterAudio = !!param?.publisher;
        this.onLimitChange(parseInt(data.results.length));
        this.data = data?.results.map((item) => ({
          ...item,
          isRenew: this.checkRenew(item?.expired_date, this.currentDate),
        }));
      });
    }
  }

  async updateStatusAudio(item) {
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

  changePage(ev) {
    let params;

    if (!this.checkSearchPage && !this.checkFilterAudio) {
      params = {
        media_type: "audio",
        page: ev.page,
      };
    } else if (this.checkSearchPage && !this.checkFilterAudio) {
      params = {
        media_type: "audio",
        page: ev.page,
        name: this.searchAudio,
      };
    } else if (!this.checkSearchPage && this.checkFilterAudio) {
      params = {
        media_type: "audio",
        page: ev.page,
        publisher: this.filterAudio,
      };
    }
    this.curPage = ev.page;
    this.loadData(params);
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

  public onLimitChange(limit: any): void {
    this.changePageLimit(limit);
    this.table.limit = this.currentPageLimit;
    this.table.recalculate();
    setTimeout(() => {
      if (this.table.bodyComponent.temp.length <= 0) {
        // TODO[Dmitry Teplov] find a better way.
        // TODO[Dmitry Teplov] test with server-side paging.
        this.table.offset = Math.floor(
          (this.table.rowCount - 1) / this.table.limit
        );
        // this.table.offset = 0;
      }
    });
  }

  public onVisibleChange(visible: any): void {
    this.currentVisible = parseInt(visible, 10);
  }

  private changePageLimit(limit: any): void {
    this.currentPageLimit = parseInt(limit, 10);
  }

  async deleteAudio(item) {
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
