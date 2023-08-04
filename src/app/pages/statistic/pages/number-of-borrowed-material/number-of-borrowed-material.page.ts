import { FormBuilder, FormGroup } from "@angular/forms";
import { StatisticService } from "src/app/services/statistic.service";
import { Component, OnInit } from "@angular/core";
import { ChartOptions, ChartType } from "chart.js";
import { TranslateService } from "@ngx-translate/core";
import * as moment from "moment";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
interface label {
  title: string[];
  key: string[];
}
@Component({
  selector: "app-number-of-borrowed-material",
  templateUrl: "./number-of-borrowed-material.page.html",
  styleUrls: ["./number-of-borrowed-material.page.scss"],
})
export class NumberOfBorrowedMaterial implements OnInit {
  data: any;
  formData: FormGroup = this.fb.group({
    from: [moment().format("YYYY-MM-DD")],
    to: [moment().format("YYYY-MM-DD")],
  });
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

  public pieChartLabels: label = { title: [], key: [] };
  public pieChartData = [];
  param;
  public dateFrom: any;
  public dateTo: any;
  constructor(
    private translate: TranslateService,
    private statisticService: StatisticService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {}

  ionViewWillEnter() {
    this.translate.use(localStorage.getItem("language"));
    this.loadData();
  }

  loadData() {
    this.pieChartLabels.title = [];
    this.statisticService
      .numberOfBorrowedMaterial(this.formData.value)
      .subscribe((data) => {
        this.data = data?.data;
        this.pieChartLabels.key = Object.keys(data?.data);
        this.pieChartData = Object.values(data?.data);
        Object.keys(this.data).forEach((data) =>
          this.translate
            .get("Statistic_tab.tab_number_of_borrowed_material." + data)
            .subscribe((data) => this.pieChartLabels.title.push(data))
        );
      });
  }

  onChange(event) {
    this.loadData();
  }

  htmltoPDF() {
    html2canvas(document.querySelector("#print-statistic-number-borrow")).then(
      (canvas) => {
        var pdf = new jsPDF("landscape", "pt", [canvas.width, canvas.height]);

        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        pdf.addImage(imgData, 0, 0, canvas.width, canvas.height);
        pdf.save(
          "statistic_number_borrow" + moment().format("MM/dd/yyyy") + ".pdf"
        );
      }
    );
  }
}
