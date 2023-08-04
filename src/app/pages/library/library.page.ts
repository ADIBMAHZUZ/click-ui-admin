import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ChangeDetectorRef,
} from "@angular/core";
import {
  AlertController,
  NavController,
  ToastController,
} from "@ionic/angular";
import { LibraryService } from "../../services/library.service";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { DatatableComponent } from "@swimlane/ngx-datatable";

@Component({
  selector: "app-library",
  templateUrl: "./library.page.html",
  styleUrls: ["./library.page.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class LibraryPage implements OnInit {
  @ViewChild(DatatableComponent) public table: DatatableComponent;
  public rowCountPage;
  public currentPageLimit: number = 10;
  public currentVisible: number = 3;
  public columns: any;
  public data: any;
  public rowCount;
  public searchLibrary = "";
  public checkIsActive = true;
  public notify_delete = "";
  public checkSearchPage = false;
  public dataLibrary = [];
  public library = "all";
  public library_all = "all";
  public checkChangeLibrary = false;
  public checkList = [];
  constructor(
    public alertController: AlertController,
    private libraryService: LibraryService,
    private router: Router,
    private translate: TranslateService,
    private navCtrl: NavController,
    private cdr: ChangeDetectorRef,
    public toastController: ToastController
  ) {
    this.columns = [
      { prop: "id", name: "ID" },
      { prop: "name", name: "Name" },
      { prop: "short_name", name: "Short name" },
      { prop: "email", name: "Email" },
      { prop: "max_subscribers", name: "Max subscriber" },
      // {prop: 'phone', name: 'Phone'},
    ];
    this.translate.use(localStorage.getItem("language"));
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.loadLibrary();
    this.loadData();
    this.translate.use(localStorage.getItem("language"));
    if (localStorage.getItem("language") == "en") {
      this.notify_delete = "Are you sure you want to delete?";
    } else {
      this.notify_delete = "Adakah anda pasti ingin memadam?";
    }
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
      this.libraryService.listLibraryOfLibrary(params).subscribe((data) => {
        this.data = data.results;
        this.rowCountPage = data.count;
        this.checkSearchPage = false;
        this.checkChangeLibrary = true;
        // this.onLimitChange(parseInt(data.results.length))
      });
    }
  }

  loadData() {
    this.libraryService.listLibrary().subscribe((data) => {
      this.data = data.results;
      this.rowCountPage = data.count;
      this.checkSearchPage = false;
      this.checkChangeLibrary = false;
      this.onLimitChange(parseInt(data.results.length));
    });
  }

  async deleteLibrary(item) {
    let title = "";
    let temp_language = localStorage.getItem("language");
    if (!item.is_active) {
      this.translate
        .get("Library.notify_inactive", { account: item.name })
        .subscribe((result: string) => {
          this.notify_delete = result;
        });
    } else {
      this.translate
        .get("Library.notify_active", { account: item.name })
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
            this.libraryService.deleteLibrary(item.id).subscribe((data) => {
              this.loadData();
            });
          },
        },
      ],
    });
    await alert.present();
  }

  onSearchLibrary() {
    if (this.searchLibrary == "") {
      this.loadData();
    } else {
      // this.router.navigate(['/library/'], { queryParams: { search: '<' +this.searchLibrary+ '>'} });
      this.libraryService
        .searchLibrary(this.searchLibrary)
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
      this.libraryService.listPageLibrary(ev).subscribe((data) => {
        this.data = data.results;
      });
    } else if (this.checkSearchPage) {
      let params = {
        search: this.searchLibrary,
        page: ev.page,
      };
      this.libraryService.listPageLibrary(params).subscribe((data) => {
        this.data = data.results;
      });
    } else if (this.checkChangeLibrary) {
      let params = {
        library: this.library,
        page: ev.page,
      };
      this.libraryService.listPageLibrary(params).subscribe((data) => {
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

  popPage() {
    // this.navCtrl.pop();
    console.log(this.navCtrl);
  }

  ionViewWillLeave() {
    // this.popPage()
  }
  onSelect({ selected }) {
    this.checkList.splice(0, this.checkList.length);
    this.checkList.push(...selected);
  }

  async deleteTeacher() {
    let delete_notify = "";
    this.translate
      .get("Library.delete_confirm", { account: this.checkList.length })
      .subscribe((result: string) => {
        delete_notify = result;
      });
    const params = {
      users: this.checkList.map((item) => item.id).join(","),
    };

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
            this.libraryService
              .delete({
                header: { "Content-Type": "multipart/form-data" },
                body: params,
              })
              .subscribe((data) => {
                if (data?.success) {
                  this.requestDeleteSuccess(data?.message);
                  this.loadData();
                } else {
                  this.checkList = [];
                  this.requestDeleteFalse(data?.message);
                }
              });
          },
        },
      ],
    });
    await alert.present();
  }
  async requestDeleteSuccess(message) {
    const toast = await this.toastController.create({
      message: message,
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
}
