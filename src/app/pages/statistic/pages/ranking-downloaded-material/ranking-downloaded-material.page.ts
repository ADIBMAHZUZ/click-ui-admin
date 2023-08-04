import { AuthState } from "./../../../auth/store/auth.state";
import { Store } from "@ngxs/store";
import { FormBuilder, FormGroup } from "@angular/forms";
import { StatisticService } from "src/app/services/statistic.service";
import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { ProfileService } from "src/app/pages/profile/profile.service";

interface RakingDownloadedMedia {
  numberOfDownload: number;
  title: string;
}

@Component({
  selector: "app-ranking-downloaded-material",
  templateUrl: "./ranking-downloaded-material.page.html",
  styleUrls: ["./ranking-downloaded-material.page.scss"],
})
export class RankingDownloadedMaterial implements OnInit {
  formData: FormGroup;
  data: RakingDownloadedMedia[] = [];
  createdDate;
  columns_name = ["no", "title", "number_of_download"];
  constructor(
    private statisticService: StatisticService,
    private fb: FormBuilder,
    private profileService: ProfileService,
    private store: Store
  ) {
    this.formData = this.fb.group({
      from: [],
      to: [moment().format("YYYY-MM-DD")],
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  ionViewWillEnter() {
    this.declareForm();
    this.loadData();
  }

  declareForm() {
    this.store.select(AuthState.getProfile).subscribe((data) => {
      this.createdDate = data?.created;
      this.formData = this.fb.group({
        from: [this.createdDate],
        to: [moment().format("YYYY-MM-DD")],
      });
    });
  }

  loadData() {
    const { from, to } = this.formData.value;
    let params = {
      from: moment(from).format("YYYY-MM-DD"),
      to: moment(to).format("YYYY-MM-DD"),
    };
    this.statisticService
      .rankingDownloadedMaterial(params)
      .subscribe((data) => {
        this.data = data?.data;
      });
  }

  onChange(event) {
    this.loadData();
  }

  exportDataToExcel() {
    this.statisticService.exportAsExcelFile(
      this.data,
      "Ranking_Download_Media"
    );
  }

  htmltoPDF() {
    html2canvas(
      document.querySelector("#print-statistic-top-ranking-download-media")
    ).then((canvas) => {
      var pdf = new jsPDF("landscape", "pt", [canvas.width, canvas.height]);

      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(imgData, 0, 0, canvas.width, canvas.height);
      pdf.save(
        "statistic_ranking_download_media" +
          moment().format("MM/dd/yyyy") +
          ".pdf"
      );
    });
  }
}
