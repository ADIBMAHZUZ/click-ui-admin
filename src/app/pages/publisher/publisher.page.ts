import { map } from "rxjs/operators";
import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { PublisherService } from "src/app/services/publisher.service";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { DatatableComponent } from "@swimlane/ngx-datatable";

@Component({
  selector: "app-publisher",
  templateUrl: "./publisher.page.html",
  styleUrls: ["./publisher.page.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class PublisherPage implements OnInit {
  @ViewChild(DatatableComponent) public table: DatatableComponent;
  public rowCountPage;
  public currentPageLimit: number = 10;
  public currentVisible: number = 3;
  public columns: any;
  public data: any;
  public searchPublisher = "";
  public notify_delete = "";
  public checkSearchPage = false;
  checkList: any = [];
  constructor(
    public alertController: AlertController,
    private publisherService: PublisherService,
    private router: Router,
    private translate: TranslateService,
    private toastController: ToastController
  ) {
    this.columns = [
      { prop: "id", name: "ID" },
      { prop: "name", name: "Name" },
      { prop: "email", name: "Email" },
    ];
    this.translate.use(localStorage.getItem("language"));
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.loadData();
    this.translate.use(localStorage.getItem("language"));
    if (localStorage.getItem("language") == "en") {
      this.notify_delete = "Are you sure you want to delete?";
    } else {
      this.notify_delete = "Adakah anda pasti ingin memadam?";
    }
  }

  loadData() {
    this.publisherService.listPublisher().subscribe((data) => {
      this.data = data.results;
      this.rowCountPage = data.count;
      this.checkSearchPage = false;
      this.onLimitChange(parseInt(data.results.length));
    });
  }

  async updateStatusPublisher(item) {
    if (!item.is_active) {
      this.translate
        .get("Publisher.notify_inactive", { account: item.username })
        .subscribe((result: string) => {
          this.notify_delete = result;
        });
    } else {
      this.translate
        .get("Publisher.notify_active", { account: item.username })
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
            this.publisherService
              .updateStatusPublisher(item.id)
              .subscribe((data) => {
                this.loadData();
              });
          },
        },
      ],
    });
    await alert.present();
  }

  onSearchPublisher() {
    if (this.searchPublisher == "") {
      this.loadData();
    } else {
      // this.router.navigate(['/publisher/'], { queryParams: { search: '<' +this.searchPublisher+ '>'} });
      this.publisherService
        .searchPublisher(this.searchPublisher)
        .subscribe((data) => {
          this.data = data.results;
          this.rowCountPage = data.count;
          this.checkSearchPage = true;
          this.onLimitChange(parseInt(data.results.length));
        });
    }
  }

  changePage(ev) {
    if (!this.checkSearchPage) {
      this.publisherService.listPagePublisher(ev).subscribe((data) => {
        this.data = data.results;
      });
    } else {
      let params = {
        search: this.searchPublisher,
        page: ev.page,
      };
      this.publisherService.listPagePublisher(ev).subscribe((data) => {
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
    this.currentPageLimit = parseInt(limit, 10);
  }

  async deletePublisher() {
    let delete_notify = "";
    this.translate
      .get("Publisher.delete_confirm", { account: this.checkList.length })
      .subscribe((result: string) => {
        delete_notify = result;
      });
    const params = {
      body: {
        users: this.checkList.map((item) => item.id).join(","),
      },
    };
    const alert = await this.alertController.create({
      header: "",
      backdropDismiss: false,
      cssClass: "my-custom-alert",
      message: delete_notify,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            this.checkList = [];
            this.loadData();
          },
        },
        {
          text: "Delete",
          handler: () => {
            this.publisherService.deletePublisher(params).subscribe((data) => {
              if (data?.success) {
                this.DeleteSuccess();
                this.loadData();
              } else {
                this.checkList = [];
                this.DeleteFalse(data?.message);
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
      message: "Account was deleted",
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
  onSelect({ selected }) {
    this.checkList.splice(0, this.checkList.length);
    this.checkList.push(...selected);
  }
}
