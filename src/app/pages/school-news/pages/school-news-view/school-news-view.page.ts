import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SchoolNewsService } from "src/app/services/school-news.service";
import * as moment from "moment";
import { TranslateService } from "@ngx-translate/core";
import { Location } from "@angular/common";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-school-news-view",
  templateUrl: "./school-news-view.page.html",
  styleUrls: ["./school-news-view.page.scss"],
})
export class SchoolNewsViewPage implements OnInit {
  public title = "";
  public publishDate;
  public isActive = "";
  public isActiveArr = [
    { value: true, name: "True" },
    { value: false, name: "False" },
  ];
  public school_news_id;
  public htmlText = "";
  public photo = "";
  image: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private schoolNewsService: SchoolNewsService,
    private translate: TranslateService,
    private location: Location,
    private sanitizer: DomSanitizer
  ) {
    this.translate.use(localStorage.getItem("language"));
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.translate.use(localStorage.getItem("language"));
    this.school_news_id = +this.activatedRoute.snapshot.paramMap.get("id");
    this.schoolNewsService
      .getSchoolNews(this.school_news_id)
      .subscribe((data) => {
        this.title = data.title;
        this.publishDate = moment
          .utc(data.publish_date)
          .format("MM/DD/YYYY HH:mm");
        this.htmlText = data.content;

        if (data.is_active) {
          this.isActive = "Active";
        } else {
          this.isActive = "Inactive";
        }
        if (data.photo != null) {
          this.photo = data.photo;
        } else {
          this.photo = "assets/img/no.png";
        }
      });
  }

  handleEditorCreated(event) {
    event.enable(false);
  }
  goBack() {
    this.location.back();
  }

  zoomPicture(imgUrl) {
    this.image = this.sanitizer.bypassSecurityTrustResourceUrl(imgUrl);
  }

  closeZoom() {
    this.image = "";
  }
}
