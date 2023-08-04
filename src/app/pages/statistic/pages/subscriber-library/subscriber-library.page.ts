import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ChartType, ChartOptions } from "chart.js";
import { TranslateService } from "@ngx-translate/core";
import { StatisticService } from "src/app/services/statistic.service";
import * as moment from "moment";
import { ContentObserver } from "@angular/cdk/observers";
import { LibraryService } from "src/app/services/library.service";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ProfileService } from "src/app/pages/profile/profile.service";
@Component({
  selector: "app-subscriber-library",
  templateUrl: "./subscriber-library.page.html",
  styleUrls: ["./subscriber-library.page.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SubscriberLibraryPage implements OnInit {
  public columns: any;
  public data = [];
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
  createdDate: any;
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

        let params = {
          from: moment(data?.created).format("YYYY-MM-DD"),
          to: moment().format("YYYY-MM-DD"),
        };
        this.getDataSubscriberPerLibrary(params);
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
      this.getDataSubscriberPerLibrary(params);
    }
  }

  changeDateTo() {
    this.dateTo = new Date(this.dateTo);
    if (this.dateFrom != undefined && this.dateTo != undefined) {
      let params = {
        from: moment(this.dateFrom).format("YYYY-MM-DD"),
        to: moment(this.dateTo).format("YYYY-MM-DD"),
      };
      this.getDataSubscriberPerLibrary(params);
    }
  }

  getDataSubscriberPerLibrary(params) {
    this.checkDisplayPie = false;
    this.statisticService.subscriberPerLibrary(params).subscribe((data) => {
      this.total = data["total"];
      delete data["total"];
      if (this.total > 0) {
        this.checkDisplayPie = true;
      }
      // if(data != undefined){
      //   this.data.push(data)
      // }
      this.data = [];
      if (data["data"].length > 0) {
        for (var i = 0; i < data["data"].length; i++) {
          params = {
            Name: data["name"][i],
            Value: data["data"][i],
          };
          this.data.push(params);
        }
      }
      this.pieChartData[0] = data.data;
      this.pieChartLabels[0] = data.name;
    });
  }

  toObject(arr, arr2) {
    let results = [];
    for (var i = 0; i < arr.length; ++i) {
      var rv = {};
      rv[arr2[i]] = arr[i];
      results.push(rv);
    }
    return results;
  }

  exportDataToExcel() {
    this.statisticService.exportAsExcelFile(
      this.data,
      "Subscriber_Per_Library"
    );
  }

  htmltoPDF() {
    html2canvas(
      document.querySelector("#print-statistic-subscriber-per-library")
    ).then((canvas) => {
      var pdf = new jsPDF("landscape", "pt", [canvas.width, canvas.height]);

      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(imgData, 0, 0, canvas.width, canvas.height);
      pdf.save(
        "statistic_subscriber_per_library" +
          moment().format("MM/dd/yyyy") +
          ".pdf"
      );
    });
  }
}
