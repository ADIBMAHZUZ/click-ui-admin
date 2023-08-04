import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { LearningMaterialService } from "src/app/services/learning-material.service";
import { GlobalMenuService } from "src/app/services/global-menu.service";
import { TranslateService } from "@ngx-translate/core";
import { AlertController } from "@ionic/angular";
import { DatatableComponent } from "@swimlane/ngx-datatable";

@Component({
  selector: "app-list-audio",
  templateUrl: "./list-audio.page.html",
  styleUrls: ["./list-audio.page.scss"],
})
export class ListAudioPage implements OnInit {
  @ViewChild(DatatableComponent) public table: DatatableComponent;
  public searchAudio = "";
  public checkSearchPage = false;
  public rowCountPage;
  public currentPageLimit: number = 10;
  public currentVisible: number = 3;
  public notify_delete = "";
  public data = [];
  public images = [];
  public columns;
  public checkDelete = false;
  constructor(
    private learningMaterialService: LearningMaterialService,
    private globalFooService: GlobalMenuService,
    private translate: TranslateService,
    public alertController: AlertController,
    private cdr: ChangeDetectorRef
  ) {
    this.columns = [
      { prop: "id", name: "ID" },
      { prop: "name", name: "Name" },
      { prop: "release_date", name: "Publish date" },
      { prop: "is_active", name: "Active" },
      { prop: "media_type", name: "Media type" },
      // {prop: 'phone', name: 'Phone'},
    ];
    this.translate.use(localStorage.getItem("language"));
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.translate.use(localStorage.getItem("language"));
    localStorage.removeItem("type_media_material");
    localStorage.setItem("type_media_material", "audio");
    if (localStorage.getItem("language") == "en") {
      this.notify_delete = "Are you sure you want to delete?";
    } else {
      this.notify_delete = "Adakah anda pasti ingin memadam?";
    }
    this.loadData();
    this.globalFooService.getSearchAudio().subscribe((data) => {
      if (data.change == "") {
        this.loadData();
      } else if (data.change.results != undefined) {
        this.loadData();
      } else {
        let params = {
          name: data.change,
          publisher: "",
          category: "",
          author: "",
          media_type: "audio",
          published_date: "",
        };
        this.searchAudio = data.change;
        this.learningMaterialService
          .searchLearningMaterial(params)
          .subscribe((data) => {
            this.data = data.results;
            this.images = [];
            let temp_data = data.results;
            this.rowCountPage = data.count;
            this.checkSearchPage = true;
            this.onLimitChange(parseInt(data.results.length));
          });
      }
    });
  }

  loadData() {
    let params = {
      media_type: "audio",
    };
    this.learningMaterialService
      .listLearningMaterial(params)
      .subscribe((data) => {
        this.data = data.results;
        if (this.checkDelete) {
          this.cdr.detectChanges();
        }

        this.images = [];
        let temp_data = data.results;
        this.rowCountPage = data.count;
        this.checkSearchPage = false;
        this.onLimitChange(parseInt(data.results.length));
        this.checkDelete = false;
      });
  }

  async deleteLearningMaterial(item) {
    if (!item.is_active) {
      this.translate
        .get("Learning_material.notify_inactive", { media: item.name })
        .subscribe((result: string) => {
          this.notify_delete = result;
        });
    } else {
      this.translate
        .get("Learning_material.notify_active", { media: item.name })
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
            this.learningMaterialService
              .deleteLearningMaterial(item.id)
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

  async deleteLearningMaterialReal(item) {
    this.translate
      .get("Learning_material.notify_delete", { media: item.name })
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
            this.learningMaterialService
              .deleteLearningMaterialReal(item.id)
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
      let params = {
        media_type: "audio",
        page: ev.page,
      };
      this.learningMaterialService
        .listPageLearningMaterial(params)
        .subscribe((data) => {
          this.data = data.results;
        });
    } else {
      let params = {
        media_type: "audio",
        page: ev.page,
        name: this.searchAudio,
        publisher: "",
        category: "",
        author: "",
        published_date: "",
      };
      this.learningMaterialService
        .listPageLearningMaterial(params)
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
