import { GetProfile } from "./../auth/store/auth.action";
import { Store } from "@ngxs/store";
import { NotificationService } from "src/app/services/notification.service";
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ChangeDetectorRef,
} from "@angular/core";
import {
  AlertController,
  ModalController,
  PopoverController,
  ToastController,
} from "@ionic/angular";
import { TeacherService } from "../../services/teacher.service";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { LibraryService } from "src/app/services/library.service";

@Component({
  selector: "app-teacher",
  templateUrl: "./teacher.page.html",
  styleUrls: ["./teacher.page.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class TeacherPage implements OnInit {
  @ViewChild(DatatableComponent) public table: DatatableComponent;
  public rowCountPage;
  public currentPageLimit: number = 10;
  public currentVisible: number = 3;
  public columns: any;
  public data: any;
  public searchTeacher = "";
  public notify_delete = "";
  public checkSearchPage = false;
  public checkRole = false;
  public dataLibrary = [];
  public library = "all";
  public library_all = "all";
  public checkChangeLibrary = false;
  checkList: any = [];

  constructor(
    public alertController: AlertController,
    private teacherService: TeacherService,
    private router: Router,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private libraryService: LibraryService,
    private modalController: ModalController,
    public popoverController: PopoverController,
    public notificationService: NotificationService,
    private toastController: ToastController,
    private store: Store
  ) {
    this.columns = [
      { prop: "id", name: "ID" },
      { prop: "name", name: "Name" },
      { prop: "email", name: "Email" },
      { prop: "short_name", name: "Short name" },
      { prop: "username", name: "Username" },
    ];
    this.translate.use(localStorage.getItem("language"));
  }

  ngOnInit() {}

  ionViewWillEnter() {
    let temp_role = localStorage.getItem("user_type");
    if (temp_role == "admin") {
      this.checkRole = true;
    } else {
      this.checkRole = false;
    }
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
      this.teacherService.listTeacherLibrary(params).subscribe((data) => {
        this.data = data.results;
        this.rowCountPage = data.count;
        this.checkSearchPage = false;
        this.checkChangeLibrary = true;
        // this.onLimitChange(parseInt(data.results.length))
      });
    }
  }

  loadData() {
    this.teacherService.listTeacher().subscribe((data) => {
      this.data = data.results;
      this.rowCountPage = data.count;
      this.checkSearchPage = false;
      this.checkChangeLibrary = false;
      this.onLimitChange(parseInt(data.results.length));
      this.cdr.detectChanges();
    });
  }

  async updateStatusTeacher(item) {
    let temp_language = localStorage.getItem("language");
    if (!item.is_active) {
      this.translate
        .get("Teacher.notify_inactive", { account: item.username })
        .subscribe((result: string) => {
          this.notify_delete = result;
        });
    } else {
      this.translate
        .get("Teacher.notify_active", { account: item.username })
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
            this.teacherService
              .updateStatusTeacher(item.id)
              .subscribe((data) => {});
          },
        },
      ],
    });
    await alert.present();
  }

  onSearchTeacher() {
    if (this.searchTeacher == "") {
      this.loadData();
    } else {
      // this.router.navigate(['/teacher/'], { queryParams: { search: '<' +this.searchTeacher+ '>'} });
      this.teacherService
        .searchTeacher(this.searchTeacher)
        .subscribe((data) => {
          this.data = data.results;
          this.rowCountPage = data.count;
          this.checkSearchPage = true;
          this.checkChangeLibrary = false;
          this.onLimitChange(parseInt(data.results.length));
        });
    }
  }

  onSearchTeacherAuto(ev) {
    if (ev == undefined || ev.target.value == "") {
      this.loadData();
    } else {
      const val = ev.target.value;
      this.teacherService.searchTeacher(val).subscribe((data) => {
        this.data = data.results;
        this.rowCountPage = data.count;
        this.onLimitChange(parseInt(data.results.length));
      });
    }
  }

  changePage(ev) {
    if (!this.checkSearchPage && !this.checkChangeLibrary) {
      this.teacherService.listPageTeacher(ev).subscribe((data) => {
        this.data = data.results;
      });
    } else if (this.checkSearchPage) {
      let params = {
        search: this.searchTeacher,
        page: ev.page,
      };
      this.teacherService.listPageTeacher(params).subscribe((data) => {
        this.data = data.results;
      });
    } else if (this.checkChangeLibrary) {
      let params = {
        library: this.library,
        page: ev.page,
      };
      this.teacherService.listPageTeacher(params).subscribe((data) => {
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

  onSelect({ selected }) {
    this.checkList.splice(0, this.checkList.length);
    this.checkList.push(...selected);
  }

  async deleteTeacher() {
    let delete_notify = "";
    this.translate
      .get("Teacher.delete_confirm", { account: this.checkList.length })
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
            this.teacherService
              .delete({
                header: { "Content-Type": "multipart/form-data" },
                body: params,
              })
              .subscribe((data) => {
                if (data?.success) {
                  this.requestDeleteSuccess();
                  this.loadData();
                  this.store.dispatch(new GetProfile());
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
      message: "Delete successful",
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
