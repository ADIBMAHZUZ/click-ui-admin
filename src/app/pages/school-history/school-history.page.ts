import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { SchoolHistoryService } from "src/app/services/school-history.service";
import { TranslateService } from "@ngx-translate/core";
import { DatatableComponent } from "@swimlane/ngx-datatable";

@Component({
  selector: "app-school-history",
  templateUrl: "./school-history.page.html",
  styleUrls: ["./school-history.page.scss"],
})
export class SchoolHistoryPage implements OnInit {
  @ViewChild(DatatableComponent) public table: DatatableComponent;
  public rowCountPage;
  public currentPageLimit: number = 10;
  public currentVisible: number = 3;
  public columns: any;
  public data: any;
  public searchHistory = "";
  public checkIsActive = true;
  public notify_delete = "";
  public checkSearchPage = false;
  public checkDelete = false;
  constructor(
    public alertController: AlertController,
    private schoolHistoryService: SchoolHistoryService,
    private router: Router,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) {
    this.columns = [
      { prop: "id", name: "ID" },
      { prop: "title", name: "Title" },
      { prop: "publish_date", name: "Publish date" },
      // {prop: 'is_active', name: 'Active'},
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
    this.schoolHistoryService.listSchoolHistory().subscribe((data) => {
      this.data = data.results;
      if (this.checkDelete) {
        this.cdr.detectChanges();
      }
      this.rowCountPage = data.count;
      this.checkSearchPage = false;
      this.onLimitChange(parseInt(data.results.length));
      this.checkDelete = false;
    });
  }

  async deleteHistory(item) {
    if (!item.is_active) {
      this.translate
        .get("School_history.notify_inactive", { article: item.title })
        .subscribe((result: string) => {
          this.notify_delete = result;
        });
    } else {
      this.translate
        .get("School_history.notify_active", { article: item.title })
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
            this.checkDelete = true;
            this.loadData();
          },
        },
        {
          text: "Ok",
          handler: () => {
            this.schoolHistoryService
              .deleteSchoolHistory(item.id)
              .subscribe((data) => {
                this.checkDelete = true;
                this.loadData();
              });
          },
        },
      ],
    });
    await alert.present();
  }

  onSearchHistory() {
    if (this.searchHistory == "") {
      this.loadData();
    } else {
      // this.router.navigate(['/school-history/'], { queryParams: { title: this.searchHistory} });
      this.schoolHistoryService
        .searchSchoolHistory(this.searchHistory)
        .subscribe((data) => {
          this.data = data.results;
          this.rowCountPage = data.count;
          this.checkSearchPage = true;
          this.onLimitChange(parseInt(data.results.length));
        });
    }
  }

  async deleteHistoryReal(item) {
    this.translate
      .get("School_history.notify_delete", { article: item.title })
      .subscribe((result: string) => {
        this.notify_delete = result;
      });

    const alert = await this.alertController.create({
      header: "",
      cssClass: "my-custom-alert",
      message: this.notify_delete,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {},
        },
        {
          text: "Ok",
          handler: () => {
            this.schoolHistoryService
              .deleteSchoolHistoryReal(item.id)
              .subscribe((data) => {
                this.checkDelete = true;
                this.loadData();
              });
          },
        },
      ],
    });
    await alert.present();
  }

  changePage(ev) {
    if (!this.checkSearchPage) {
      this.schoolHistoryService.listPageSchoolHistory(ev).subscribe((data) => {
        this.data = data.results;
      });
    } else {
      let params = {
        title: this.searchHistory,
        page: ev.page,
      };
      this.schoolHistoryService
        .listPageSchoolHistory(params)
        .subscribe((data) => {
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
}
