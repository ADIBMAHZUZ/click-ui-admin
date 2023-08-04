import { TranslateService } from "@ngx-translate/core";
import { StatisticService } from "src/app/services/statistic.service";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ChartOptions, ChartType } from "chart.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as moment from "moment";

@Component({
  selector: "app-number-of-register",
  templateUrl: "./number-of-register.page.html",
  styleUrls: ["./number-of-register.page.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class NumberOfRegister implements OnInit {
  data: any;
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

  public pieChartLabels = [];
  public pieChartData = [];
  public label = [];

  constructor(
    private statisticService: StatisticService,
    private translate: TranslateService
  ) {}
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.statisticService.numberOfRegister().subscribe((data) => {
      this.data = data["data"];
      Object.keys(this.data).forEach((data) =>
        this.translate
          .get("Statistic_tab.tab_number_of_register." + data)
          .subscribe((data) => this.pieChartLabels.push(data))
      );
      this.label = Object.keys(data?.data);
      this.pieChartData = Object.values(this.data);
    });
  }

  htmltoPDF() {
    html2canvas(
      document.querySelector("#print-statistic-number-register")
    ).then((canvas) => {
      var pdf = new jsPDF("landscape", "pt", [canvas.width, canvas.height]);

      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(imgData, 0, 0, canvas.width, canvas.height);
      pdf.save(
        "statistic_number_register" + moment().format("MM/dd/yyyy") + ".pdf"
      );
    });
  }
}
