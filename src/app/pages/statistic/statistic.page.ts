import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-statistic",
  templateUrl: "./statistic.page.html",
  styleUrls: ["./statistic.page.scss"],
})
export class StatisticPage implements OnInit {
  public checkUserType = false;
  temp = localStorage.getItem("user_type");
  constructor(private translate: TranslateService) {
    this.translate.use(localStorage.getItem("language"));
  }

  statistic = [
    {
      title: "title_number_media",
      tab: "number-media",
      roles: ["admin", "publisher"],
    },
    {
      title: "title_media_category",
      tab: "media-category",
      roles: ["admin", "publisher"],
    },
    {
      title: "title_subscriber_library",
      tab: "subscriber-library",
      roles: ["admin"],
    },
    {
      title: "title_number_download",
      tab: "number-download",
      roles: ["admin", "publisher"],
    },
    {
      title: "title_top_download",
      tab: "top-download",
      roles: ["admin", "publisher"],
    },
    {
      title: "title_number_of_register",
      tab: "number-of-register",
      roles: ["librarian"],
    },
    {
      title: "title_number_of_borrowed_material",
      tab: "number-of-borrowed-material",
      roles: ["librarian"],
    },
    {
      title: "title_ranking_downloaded_material",
      tab: "ranking-downloaded-material",
      roles: ["librarian"],
    },
    {
      title: "title_ranking_active_subscriber",
      tab: "ranking-active-subscriber",
      roles: ["librarian"],
    },
  ];

  ngOnInit() {}

  ionViewWillEnter() {
    this.translate.use(localStorage.getItem("language"));

    if (this.temp == "admin") {
      this.checkUserType = true;
    } else {
      this.checkUserType = false;
    }
  }
}
