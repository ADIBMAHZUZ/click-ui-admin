import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ChartOptions, ChartType } from "chart.js";
import { TranslateService } from "@ngx-translate/core";
import { StatisticService } from "src/app/services/statistic.service";
import * as moment from "moment";
import { LibraryService } from "src/app/services/library.service";
import { ProfilePage } from "src/app/pages/profile/profile.page";
import { ProfileService } from "src/app/pages/profile/profile.service";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

@Component({
  selector: "app-number-media",
  templateUrl: "./number-media.page.html",
  styleUrls: ["./number-media.page.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class NumberMediaPage implements OnInit {
  public columns: any;
  public data: any;
  public total = 0;
  public dateFrom: any;
  public dateTo: any;
  public checkDisplayPie = false;
  public checkUserType = false;
  public dataLibrary = [];
  public library = "all";
  public library_all = "all";

  /** Pie Charts */
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: "right",
      labels: {
        fontSize: 16,
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
      ],
    },
  ];

  public pieChartLabels = [[]];
  public pieChartData_media = [[]];
  createdDate: string = "";
  columns_name = ["no", "name", "book", "audio", "video"];
  constructor(
    private translate: TranslateService,
    private statisticService: StatisticService,
    private libraryService: LibraryService,
    private profileService: ProfileService
  ) {
    this.translate.use(localStorage.getItem("language"));
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.translate.use(localStorage.getItem("language"));
    this.loadLibrary();

    this.profileService
      .getProfile(localStorage.getItem("language"))
      .subscribe((data) => {
        this.createdDate = data?.created;
        this.dateFrom = moment(data?.created).format("YYYY-MM-DD");
        this.dateTo = moment().format("YYYY-MM-DD");

        if (data?.user_type == "admin") {
          this.checkUserType = true;
        } else {
          this.checkUserType = false;
        }
        let params = {
          from: moment(data?.created).format("YYYY-MM-DD"),
          to: moment().format("YYYY-MM-DD"),
        };
        this.columns = [];
        if (this.checkUserType) {
          this.getDataMediaOfMumber(params);
        } else {
          this.getDataMediaOfMumberPublisher(params);
        }
      });
  }

  loadLibrary() {
    this.libraryService.listLibraries().subscribe((data) => {
      this.dataLibrary = data.results;
    });
  }

  changeLibrary(item) {
    console.log(item);
  }

  changeDateFrom() {
    this.dateFrom = new Date(this.dateFrom);
    if (this.dateFrom != undefined && this.dateTo != undefined) {
      let params = {
        from: moment(this.dateFrom).format("YYYY-MM-DD"),
        to: moment(this.dateTo).format("YYYY-MM-DD"),
      };
      if (this.checkUserType) {
        this.getDataMediaOfMumber(params);
      } else {
        this.getDataMediaOfMumberPublisher(params);
      }
    }
  }

  changeDateTo() {
    this.dateTo = new Date(this.dateTo);
    if (this.dateFrom != undefined && this.dateTo != undefined) {
      let params = {
        from: moment(this.dateFrom).format("YYYY-MM-DD"),
        to: moment(this.dateTo).format("YYYY-MM-DD"),
      };
      if (this.checkUserType) {
        this.getDataMediaOfMumber(params);
      } else {
        this.getDataMediaOfMumberPublisher(params);
      }
    }
  }

  getDataMediaOfMumber(params) {
    this.statisticService.numberOfMedia(params).subscribe((data) => {
      this.data = data["result"];
      this.total = data["total"];
      if (this.total > 0) {
        this.checkDisplayPie = true;
      } else if (this.total == 0) {
        this.checkDisplayPie = false;
      }

      this.pieChartData_media[0] = [];
      this.pieChartLabels[0] = [];
      let temp_data = Object.entries(data);
      temp_data.forEach((item) => {
        if (item[0] !== "total" && item[0] !== "result") {
          this.pieChartLabels[0].push(item[0]);
          this.pieChartData_media[0].push(item[1]);
        }
      });

      if (data["result"].length > 0) {
        let temp_columns = Object.entries(data["result"][0]);
        this.columns = [];
        temp_columns.forEach((item) => {
          if (item[0] != "library" && item[0] != "subscriber") {
            var t = { prop: item[0], name: item[0] };
            this.columns.push(t);
          }
        });
      }
    });
  }

  getDataMediaOfMumberPublisher(params) {
    this.statisticService.numberOfMedia(params).subscribe((data) => {
      this.data = data["result"];
      this.total = data["total"];
      if (this.total > 0) {
        this.checkDisplayPie = true;
      } else if (this.total == 0) {
        this.checkDisplayPie = false;
      }
      this.pieChartData_media[0] = [];
      this.pieChartLabels[0] = [];

      if (data["result"].length > 0) {
        let temp_columns = Object.entries(data["result"][0]);
        this.columns = [];
        temp_columns.forEach((item) => {
          if (item[0] != "library" && item[0] != "subscriber") {
            var t = { prop: item[0], name: item[0] };
            this.columns.push(t);
          }
          if (item[0] == "book" || item[0] == "audio" || item[0] == "video") {
            this.pieChartLabels[0].push(item[0]);
            this.pieChartData_media[0].push(item[1]);
          }
        });
      }
    });
  }

  exportDataToExcel() {
    this.statisticService.exportAsExcelFile(this.data, "Number_Of_Media");
  }

  htmltoPDF() {
    html2canvas(
      document.querySelector("#print-statistic-number-of-media")
    ).then((canvas) => {
      var pdf = new jsPDF("landscape", "pt", [canvas.width, canvas.height]);

      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(imgData, 0, 0, canvas.width, canvas.height);
      pdf.save(
        "statistic_number_of_media" + moment().format("MM/dd/yyyy") + ".pdf"
      );
    });
  }
}
