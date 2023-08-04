import { GetProfile } from "./../../../auth/store/auth.action";
import { AuthState } from "./../../../auth/store/auth.state";
import { Store } from "@ngxs/store";
import { StatisticService } from "src/app/services/statistic.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import * as moment from "moment";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ProfileService } from "src/app/pages/profile/profile.service";
interface rankingOfSub {
  Subscriber: string;
  Total: number;
  Audio: number;
  Video: number;
  Book: number;
}
@Component({
  selector: "app-ranking-active-subscriber",
  templateUrl: "./ranking-active-subscriber.page.html",
  styleUrls: ["./ranking-active-subscriber.page.scss"],
})
export class RankingActiveSubscriber implements OnInit {
  data: rankingOfSub[] = [];
  formData: FormGroup;
  columns_name = ["no", "subscriber", "book", "audio", "video", "total"];
  createdDate;
  constructor(
    private statisticService: StatisticService,
    private fb: FormBuilder,
    private store: Store
  ) {}
  ngOnInit(): void {
    this.store.dispatch(new GetProfile());
    this.declareForm();
    this.loadData();
  }

  declareForm() {
    this.store.select(AuthState.getProfile).subscribe((data) => {
      this.createdDate = data?.created;
      this.formData = this.fb.group({
        from: [data?.created],
        to: [moment().format("YYYY-MM-DD")],
      });
    });
  }
  loadData() {
    const { from, to } = this.formData.value;
    let param = {
      from: moment(from).format("YYYY-MM-DD"),
      to: moment(to).format("YYYY-MM-DD"),
    };
    this.statisticService.rankingActiveSubscriber(param).subscribe((data) => {
      this.data = data?.data;
    });
  }
  onChange(event) {
    this.loadData();
  }
  exportDataToExcel() {
    this.statisticService.exportAsExcelFile(
      this.data,
      "Ranking_Active_Subscriber"
    );
  }

  htmltoPDF() {
    html2canvas(
      document.querySelector("#print-statistic-ranking-active-subscriber")
    ).then((canvas) => {
      var pdf = new jsPDF("landscape", "pt", [canvas.width, canvas.height]);

      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(imgData, 0, 0, canvas.width, canvas.height);
      pdf.save(
        "statistic_ranking_active_subscriber" +
          moment().format("MM/dd/yyyy") +
          ".pdf"
      );
    });
  }
}
