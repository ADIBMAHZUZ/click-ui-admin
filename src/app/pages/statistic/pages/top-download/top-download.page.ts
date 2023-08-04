import { ModalController } from "@ionic/angular";
import { ProfileService } from "src/app/pages/profile/profile.service";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { StatisticService } from "src/app/services/statistic.service";
import * as moment from "moment";
import { LibraryService } from "src/app/services/library.service";
import { ChooseLibraryComponent } from "src/app/shared/modal/choose-library/choose-library.component";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

@Component({
  selector: "app-top-download",
  templateUrl: "./top-download.page.html",
  styleUrls: ["./top-download.page.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class TopDownloadPage implements OnInit {
  public columns: any;
  public data = [];
  public dateFrom: any;
  public dateTo: any;
  public columns_name = ["no", "title", "number_of_download", "media_type"];

  public dataLibrary = [];
  public library = { id: "all", name: "All" };
  public library_all = "all";
  createdDate: string;
  constructor(
    private translate: TranslateService,
    private statisticService: StatisticService,
    private libraryService: LibraryService,
    private profileService: ProfileService,
    private modalController: ModalController
  ) {
    this.translate.use(localStorage.getItem("language"));
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.translate.use(localStorage.getItem("language"));
    this.columns = [];

    this.libraryService.listLibraries().subscribe((data) => {
      this.dataLibrary = data["results"];
    });

    this.profileService
      .getProfile(localStorage.getItem("language"))
      .subscribe((data) => {
        this.createdDate = data?.created;
        this.dateFrom = moment(this.createdDate).format("YYYY-MM-DD");
        this.dateTo = moment().format("YYYY-MM-DD");
        let params = {
          from: moment(this.createdDate).format("YYYY-MM-DD"),
          to: moment().format("YYYY-MM-DD"),
          library: this.library,
        };
        this.loadDataTopDownload(params);
      });
  }

  changeDateFrom() {
    this.dateFrom = new Date(this.dateFrom);
    if (this.dateFrom != undefined && this.dateTo != undefined) {
      let params = {
        from: moment(this.dateFrom).format("YYYY-MM-DD"),
        to: moment(this.dateTo).format("YYYY-MM-DD"),
        library: this.library,
      };
      this.loadDataTopDownload(params);
    }
  }

  changeDateTo() {
    this.dateTo = new Date(this.dateTo);
    if (this.dateFrom != undefined && this.dateTo != undefined) {
      let params = {
        from: moment(this.dateFrom).format("YYYY-MM-DD"),
        to: moment(this.dateTo).format("YYYY-MM-DD"),
        library: this.library,
      };
      this.loadDataTopDownload(params);
    }
  }

  changeLibrary() {
    if (this.dateFrom != undefined && this.dateTo != undefined) {
      let params = {
        from: moment(this.dateFrom).format("YYYY-MM-DD"),
        to: moment(this.dateTo).format("YYYY-MM-DD"),
        library: this.library,
      };
      this.loadDataTopDownload(params);
    }
  }

  loadDataTopDownload(params) {
    this.statisticService.topDownload(params).subscribe((data) => {
      this.data = data["result"];
      if (this.data[0] != undefined) {
        let temp_columns = Object.entries(this.data[0]);
        this.columns = [];
        temp_columns.forEach((item) => {
          var name_item = item[0].split("_").join(" ");
          var t = { prop: item[0], name: name_item };
          this.columns.push(t);
        });
      }
    });
  }

  exportDataToExcel() {
    this.statisticService.exportAsExcelFile(this.data, "Top_Download");
  }

  async chooseLibrary() {
    const modal = await this.modalController.create({
      component: ChooseLibraryComponent,
      showBackdrop: false,
      cssClass: "chooseModalCss",
      componentProps: {
        data: this.library,
      },
    });
    await modal.present();
    modal.onDidDismiss().then((data) => {
      if (data.role == "submit") {
        this.library = data?.data;
        this.changeLibrary();
      }
    });
  }

  htmltoPDF() {
    html2canvas(document.querySelector("#print-statistic-top-download")).then(
      (canvas) => {
        var pdf = new jsPDF("landscape", "pt", [canvas.width, canvas.height]);

        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        pdf.addImage(imgData, 0, 0, canvas.width, canvas.height);
        pdf.save(
          "statistic_top_download" + moment().format("MM/dd/yyyy") + ".pdf"
        );
      }
    );
  }
}
