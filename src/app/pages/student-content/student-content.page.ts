import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { StudentContentService } from "src/app/services/student-content.service";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { DatatableComponent } from "@swimlane/ngx-datatable";

@Component({
  selector: "app-student-content",
  templateUrl: "./student-content.page.html",
  styleUrls: ["./student-content.page.scss"],
})
export class StudentContentPage implements OnInit {
  @ViewChild(DatatableComponent) public table: DatatableComponent;
  public rowCountPage;
  public currentPageLimit: number = 10;
  public currentVisible: number = 3;
  public columns: any;
  public data: any;
  public searchStudent = "";
  public checkIsActive = true;
  public notify_delete = "";
  public notify_update = "";
  public checkSearchPage = false;
  public checkStatus = false;
  public checkDelete = false;
  constructor(
    public alertController: AlertController,
    private studentContentService: StudentContentService,
    private router: Router,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) {
    this.columns = [
      { prop: "id", name: "ID" },
      { prop: "title", name: "Title" },
      { prop: "publish_date", name: "Publish date" },
      { prop: "status", name: "Status" },
    ];
    this.translate.use(localStorage.getItem("language"));
  }

  ngOnInit() {}

  ionViewWillEnter() {
    let uerType = localStorage.getItem("user_type");
    if (uerType == "librarian") {
      this.checkStatus = true;
    } else if (uerType == "subscriber") {
      this.checkStatus = false;
    }
    this.loadData();
    this.translate.use(localStorage.getItem("language"));
    if (localStorage.getItem("language") == "en") {
      this.notify_delete = "Are you sure you want to delete?";
    } else {
      this.notify_delete = "Adakah anda pasti ingin memadam?";
    }
  }

  loadData() {
    this.studentContentService.listStudentContent().subscribe((data) => {
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

  async deleteStudentReal(id) {
    this.translate
      .get("Student_content.notify_delete")
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
            this.studentContentService.deleteReal(id).subscribe((data) => {
              this.checkDelete = true;
              this.loadData();
            });
          },
        },
      ],
    });
    await alert.present();
  }

  async deleteStudent(item) {
    if (!item.is_active) {
      this.translate
        .get("Student_content.notify_inactive", { content: item.title })
        .subscribe((result: string) => {
          this.notify_delete = result;
        });
    } else {
      this.translate
        .get("Student_content.notify_active", { content: item.title })
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
            this.studentContentService
              .deleteStudentContent(item.id)
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

  async studentPublish() {
    this.translate
      .get("Student_content.notify_update")
      .subscribe((result: string) => {
        this.notify_update = result;
      });
    const alert = await this.alertController.create({
      header: "",
      cssClass: "my-custom-alert",
      message: this.notify_update,
      buttons: [
        {
          text: "Ok",
          handler: () => {},
        },
      ],
    });
    await alert.present();
  }

  onSearchStudent() {
    if (this.searchStudent == "") {
      this.loadData();
    } else {
      // this.router.navigate(['/student-content/'], { queryParams: { title: this.searchStudent} });
      this.studentContentService
        .searchStudentContent(this.searchStudent)
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
      this.studentContentService
        .listPageStudentContent(ev)
        .subscribe((data) => {
          this.data = data.results;
        });
    } else {
      let params = {
        title: this.searchStudent,
        page: ev.page,
      };
      this.studentContentService
        .listPageStudentContent(ev)
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
