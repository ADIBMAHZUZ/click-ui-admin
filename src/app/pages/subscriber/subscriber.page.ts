import { NotificationService } from "src/app/services/notification.service";
import { of, Subscriber } from "rxjs";
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ChangeDetectorRef,
} from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { SubscriberService } from "src/app/services/subscriber.service";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Validators } from "@angular/forms";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { LibraryService } from "src/app/services/library.service";
import { catchError } from "rxjs/operators";
import { HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-subscriber",
  templateUrl: "./subscriber.page.html",
  styleUrls: ["./subscriber.page.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SubscriberPage implements OnInit {
  @ViewChild(DatatableComponent) public table: DatatableComponent;
  public rowCountPage;
  public currentPageLimit: number = 10;
  public currentVisible: number = 3;
  public columns: any;
  public data: any;
  public searchSubscriber = "";
  public notify_delete = "";
  public checkUserType = false;
  public checkSearchPage = false;
  // public pageSize: number = 12
  public dataLibrary = [];
  public library = "all";
  public library_all = "all";
  public checkChangeLibrary = false;
  public data_current = {
    current_subscribers: "",
    max_subscribers: "",
  };
  public checkList: any = [];
  constructor(
    public alertController: AlertController,
    private subscriberService: SubscriberService,
    private router: Router,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private libraryService: LibraryService,
    private notificationService: NotificationService,
    private toastController: ToastController
  ) {
    this.columns = [
      { prop: "id", name: "ID" },
      { prop: "name", name: "Name" },
      { prop: "email", name: "Email" },
      { prop: "short_name", name: "Short name" },
      { prop: "username", name: "Username" },
    ];
    this.translate.use(localStorage.getItem("language"));
    this.checkUserType = false;
    if (localStorage.getItem("user_type") != "admin") {
      this.checkUserType = true;
    }
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.translate.use(localStorage.getItem("language"));
    this.checkUserType = false;
    if (localStorage.getItem("user_type") != "admin") {
      this.checkUserType = true;
    }
    if (localStorage.getItem("language") == "en") {
      this.notify_delete = "Are you sure you want to delete?";
    } else {
      this.notify_delete = "Adakah anda pasti ingin memadam?";
    }
    this.loadLibrary();
    this.loadData();

    this.libraryService.getCurrentSubscriber().subscribe((data) => {
      this.data_current = data;
    });
  }

  loadLibrary() {
    this.libraryService.listLibraries().subscribe((data) => {
      this.dataLibrary = data.results;
    });
  }

  changeLibrary(item) {
    let params = {
      library: item,
    };
    if (item == "all") {
      this.loadData();
    } else {
      this.subscriberService.listSubscriberLibrary(params).subscribe((data) => {
        this.data = data.results;
        this.rowCountPage = data.count;
        this.checkSearchPage = false;
        this.checkChangeLibrary = true;
        // this.onLimitChange(parseInt(data.results.length))
      });
    }
  }

  loadData() {
    this.subscriberService.listSubscriber().subscribe((data) => {
      this.rowCountPage = data.count;
      this.checkChangeLibrary = false;
      this.checkSearchPage = false;
      this.onLimitChange(parseInt(data.results.length));
      let temp_data = data.results;
      this.data = temp_data;
      this.cdr.detectChanges();
    });
  }

  updateMaxDuration(id) {
    let max_device;
    let max_download;
    let duration;
    this.subscriberService.getSubscriber(id).subscribe((data) => {
      max_device = data.max_device;
      max_download = data.max_download;
      duration = data.max_borrow_duration;
      this.updateMaxDurationDevice(max_device, max_download, duration, id);
    });
  }

  async updateMaxDurationDevice(max_device, max_download, duration, id) {
    const alert = await this.alertController.create({
      header: "Update max download & duration borrow",
      cssClass: "my-custom-alert-update",
      inputs: [
        {
          name: "max_1",
          type: "text",
          label: "Max device",
          placeholder: "Max device",
          value: "Max device",
          disabled: true,
        },
        {
          name: "max_device",
          type: "number",
          placeholder: "Max device",
          value: max_device,
          label: "Max device",
        },
        {
          name: "max_3",
          type: "text",
          label: "Max device",
          placeholder: "Max download",
          value: "",
          disabled: true,
        },
        {
          name: "max_download",
          type: "number",
          placeholder: "Max download",
          value: max_download,
          label: "Max download",
        },
        {
          name: "max_2",
          type: "text",
          label: "Max device",
          placeholder: "Duration borrow",
          value: "",
          disabled: true,
        },
        {
          name: "duration_borrow",
          type: "number",
          placeholder: "Duration borrow",
          value: duration,
          label: "Duration borrow",
        },
      ],
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
          handler: (dataAlert) => {
            console.log(dataAlert.max);
            let formData = new FormData();
            formData.append("max_device", dataAlert.max_device);
            formData.append("max_download", dataAlert.max_download);
            formData.append("max_borrow_duration", dataAlert.duration_borrow);

            this.subscriberService
              .updateSubscriber(id, formData)
              .subscribe((data) => {
                this.loadData();
              });
          },
        },
      ],
    });
    await alert.present();
  }

  async updateStatusSubscriber(item) {
    let title = "";
    let temp_language = localStorage.getItem("language");
    if (!item.is_active) {
      this.translate
        .get("Subscriber.notify_inactive", { account: item.username })
        .subscribe((result: string) => {
          this.notify_delete = result;
        });
    } else {
      this.translate
        .get("Subscriber.notify_active", { account: item.username })
        .subscribe((result: string) => {
          this.notify_delete = result;
        });
    }
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
            this.loadData();
          },
        },
        {
          text: "Ok",
          handler: () => {
            this.subscriberService.updateStatus(item.id).subscribe((data) => {
              this.loadData();
            });
          },
        },
      ],
    });
    await alert.present();
  }

  onSearchSubscriber() {
    if (this.searchSubscriber == "") {
      this.loadData();
    } else {
      // this.router.navigate(['/subscriber/'], { queryParams: { search: '<' +this.searchSubscriber+ '>'} });
      this.subscriberService
        .searchSubscriber(this.searchSubscriber)
        .subscribe((data) => {
          this.data = data.results;
          this.rowCountPage = data.count;
          this.checkSearchPage = true;
          this.checkChangeLibrary = false;
          this.onLimitChange(parseInt(data.results.length));
        });
    }
  }

  changePage(ev) {
    if (!this.checkSearchPage && !this.checkChangeLibrary) {
      this.subscriberService.listPageSubscriber(ev).subscribe((data) => {
        this.data = data.results;
      });
    } else if (this.checkSearchPage) {
      let params = {
        search: this.searchSubscriber,
        page: ev.page,
      };
      this.subscriberService.listPageSubscriber(params).subscribe((data) => {
        this.data = data.results;
      });
    } else if (this.checkChangeLibrary) {
      let params = {
        library: this.library,
        page: ev.page,
      };
      this.subscriberService.listPageSubscriber(params).subscribe((data) => {
        this.data = data.results;
      });
    }
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
    this.cdr.detectChanges();
    this.currentPageLimit = parseInt(limit, 10);
  }

  async deleteSubscriber() {
    let delete_notify = "";
    this.translate
      .get("Subscriber.delete_confirm", { account: this.checkList.length })
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
          handler: (blah) => {
            this.loadData();
          },
        },
        {
          text: "Delete",
          handler: () => {
            const params = {
              users: this.checkList.map((item) => item.id).join(","),
            };
            this.subscriberService
              .deleteSubscriberMulti({
                header: { "Content-Type": "multipart/form-data" },
                body: params,
              })
              .subscribe((data) => {
                if (data?.success) {
                  this.requestDeleteSuccess();
                  this.loadData();
                } else {
                  this.checkList = [];
                  this.requestDeleteFalse(data?.error);
                }
              });
          },
        },
      ],
    });
    await alert.present();
  }

  async requestDeleteSuccess() {
    const toast = await this.toastController.create({
      message: this.translate.instant("Notification.delete_success"),
      duration: 2000,
      position: "bottom",
      color: "primary",
      cssClass: "custom-toast",
    });
    toast.present();
  }

  async requestDeleteFalse(error: string) {
    const toast = await this.toastController.create({
      message: error,
      duration: 2000,
      position: "bottom",
      color: "danger",
      cssClass: "custom-toast",
    });
    toast.present();
  }

  onSelect({ selected }) {
    this.checkList.splice(0, this.checkList.length);
    this.checkList.push(...selected);
  }
}
