import { ProfileService } from "src/app/pages/profile/profile.service";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ChartType, ChartOptions } from "chart.js";
import { TranslateService } from "@ngx-translate/core";
import { StatisticService } from "src/app/services/statistic.service";
import * as moment from "moment";
import { LibraryService } from "src/app/services/library.service";
@Component({
  selector: "app-media-category",
  templateUrl: "./media-category.page.html",
  styleUrls: ["./media-category.page.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class MediaCategoryPage implements OnInit {
  public columns: any;
  public data = [];
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
      position: "top",
      labels: {
        // boxWidth: 30,
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
        if (data?.user_type == "admin") {
          this.checkUserType = true;
        } else {
          this.checkUserType = false;
        }
        this.columns = [];
        let params = {
          from: moment(this.dateFrom).format("YYYY-MM-DD"),
          to: moment().format("YYYY-MM-DD"),
        };

        if (this.checkUserType) {
          this.getDataMediaPerCategory(params);
        } else {
          this.getDataMediaPerCategoryPublisher(params);
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
        this.getDataMediaPerCategory(params);
      } else {
        this.getDataMediaPerCategoryPublisher(params);
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
        this.getDataMediaPerCategory(params);
      } else {
        this.getDataMediaPerCategoryPublisher(params);
      }
    }
  }

  getDataMediaPerCategory(params) {
    this.statisticService.mediaPerCategory(params).subscribe((data) => {
      this.data = data["results"];
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
        if (item[0] !== "total" && item[0] !== "results") {
          this.pieChartLabels[0].push(item[0]);
          this.pieChartData[0].push(item[1]);
        }
      });
      if (data["results"].length > 0) {
        let temp_columns = Object.entries(data["results"][0]);
        this.columns = [];
        temp_columns.forEach((item) => {
          var t = { prop: item[0], name: item[0] };
          this.columns.push(t);
        });
      }
    });
  }

  getDataMediaPerCategoryPublisher(params) {
    this.statisticService.mediaPerCategory(params).subscribe((data) => {
      this.data = data["results"];
      this.total = data["total"];
      if (this.total > 0) {
        this.checkDisplayPie = true;
      } else if (this.total == 0) {
        this.checkDisplayPie = false;
      }
      this.pieChartData[0] = data["data"];
      this.pieChartLabels[0] = data["category"];

      if (data["results"].length > 0) {
        let temp_columns = Object.entries(data["results"][0]);
        this.columns = [];
        temp_columns.forEach((item) => {
          var t = { prop: item[0], name: item[0] };
          this.columns.push(t);
        });
      }
    });
  }

  exportDataToExcel() {
    this.statisticService.exportAsExcelFile(this.data, "Media_Per_Category");
  }

  toObject(arr) {
    var dataObject = {};
    for (var i = 0; i < arr.length; ++i) {
      dataObject[arr[i][0]] = arr[i][1];
    }
    return dataObject;
  }
}
