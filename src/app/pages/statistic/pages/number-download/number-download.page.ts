import { ProfileService } from "src/app/pages/profile/profile.service";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ChartType, ChartOptions } from "chart.js";
import { TranslateService } from "@ngx-translate/core";
import { StatisticService } from "src/app/services/statistic.service";
import * as moment from "moment";
import { AlertController } from "@ionic/angular";
import { LibraryService } from "src/app/services/library.service";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

@Component({
  selector: "app-number-download",
  templateUrl: "./number-download.page.html",
  styleUrls: ["./number-download.page.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class NumberDownloadPage implements OnInit {
  public columns: any;
  public data: any;
  public total = 0;
  public dateFrom: any;
  public dateTo: any;
  public checkDisplayPie = false;
  public dataLibrary = [];
  public library = "all";
  public library_all = "all";
  /** Pie Charts */
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: "right",
      labels: {
        fontSize: 15,
        padding: 15,
      },
    },
    plugins: {
      streaming: false,
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    },
  };
  public pieChartType: ChartType = "pie";
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors = [
    {
      backgroundColor: [
        "rgba(54, 180, 229)",
        "rgba(0,255,0,0.3)",
        "rgba(0,0,255,0.3)",
        "rgba(56, 170, 225)",
        "rgba(10,233,0,0.3)",
        "rgba(0,0,233,0.5)",
        "rgba(60, 180, 222)",
        "rgba(0,250,0,0.4)",
        "rgba(10,0,233,0.3)",
      ],
    },
  ];

  public pieChartLabels = [[]];
  public pieChartData = [[]];
  createdDate: string;
  columnsName = ["no", "library", "audio", "book", "video"];
  constructor(
    private translate: TranslateService,
    private statisticService: StatisticService,
    public alertController: AlertController,
    private libraryService: LibraryService,
    private profileService: ProfileService
  ) {
    this.translate.use(localStorage.getItem("language"));
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.translate.use(localStorage.getItem("language"));
    this.loadLibrary();
    this.columns = [];
    this.profileService
      .getProfile(localStorage.getItem("language"))
      .subscribe((data) => {
        this.createdDate = data?.created;
        this.dateFrom = moment(this.createdDate).format("YYYY-MM-DD");
        this.dateTo = moment().format("YYYY-MM-DD");

        let params = {
          from: moment(this.createdDate).format("YYYY-MM-DD"),
          to: moment().format("YYYY-MM-DD"),
        };
        this.getDataNumberOfDownload(params);
      });
  }

  changeDateFrom() {
    this.dateFrom = new Date(this.dateFrom);

    if (this.dateFrom != undefined && this.dateTo != undefined) {
      let params = {
        from: moment(this.dateFrom).format("YYYY-MM-DD"),
        to: moment(this.dateTo).format("YYYY-MM-DD"),
      };
      this.getDataNumberOfDownload(params);
    }
  }

  loadLibrary() {
    this.libraryService.listLibraries().subscribe((data) => {
      this.dataLibrary = data.results;
    });
  }

  changeLibrary(item) {}

  changeDateTo() {
    this.dateTo = new Date(this.dateTo);
    if (this.dateFrom != undefined && this.dateTo != undefined) {
      let params = {
        from: moment(this.dateFrom).format("YYYY-MM-DD"),
        to: moment(this.dateTo).format("YYYY-MM-DD"),
      };
      this.getDataNumberOfDownload(params);
    }
  }

  getDataNumberOfDownload(params) {
    this.checkDisplayPie = false;
    this.statisticService.numberOfDownload(params).subscribe((data) => {
      this.data = data["result"];
      this.total = data["total"];
      if (this.total > 0) {
        this.checkDisplayPie = true;
      } else if (this.total == 0) {
        this.checkDisplayPie = false;
      }
      this.pieChartData[0] = [];
      this.pieChartLabels[0] = [];
      let temp_data = Object.entries(data);
      temp_data.forEach((item) => {
        if (item[0] !== "total" && item[0] !== "result") {
          this.pieChartLabels[0].push(item[0]);
          this.pieChartData[0].push(item[1]);
        }
      });

      if (data["result"].length > 0) {
        let temp_columns = Object.entries(data["result"][0]);
        this.columns = [];
        temp_columns.forEach((item) => {
          var t = { prop: item[0], name: item[0] };
          this.columns.push(t);
        });
      }
    });
  }

  exportDataToExcel() {
    this.statisticService.exportAsExcelFile(this.data, "Number_Of_Download");
  }

  htmltoPDF() {
    html2canvas(
      document.querySelector("#print-statistic-number-download")
    ).then((canvas) => {
      var pdf = new jsPDF("landscape", "pt", [canvas.width, canvas.height]);

      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(imgData, 0, 0, canvas.width, canvas.height);
      pdf.save(
        "statistic_number_download" + moment().format("MM/dd/yyyy") + ".pdf"
      );
    });
  }
}
