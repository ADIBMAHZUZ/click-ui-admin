import { Component, OnInit } from "@angular/core";
import { SchoolHistoryService } from "src/app/services/school-history.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import * as moment from "moment";
import { TranslateService } from "@ngx-translate/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-school-history-view",
  templateUrl: "./school-history-view.page.html",
  styleUrls: ["./school-history-view.page.scss"],
})
export class SchoolHistoryViewPage implements OnInit {
  public title = "";
  public publishDate;
  public isActive = "";
  public isActiveArr = [
    { value: true, name: "True" },
    { value: false, name: "False" },
  ];
  public photo = "";
  public htmlText = "";
  public school_history_id;
  image: any;
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private schoolHistoryService: SchoolHistoryService,
    private translate: TranslateService,
    private sanitizer: DomSanitizer
  ) {
    this.translate.use(localStorage.getItem("language"));
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.translate.use(localStorage.getItem("language"));
    this.school_history_id = +this.activatedRoute.snapshot.paramMap.get("id");
    this.schoolHistoryService
      .getSchoolHistory(this.school_history_id)
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

  zoomPicture(imgUrl) {
    this.image = this.sanitizer.bypassSecurityTrustResourceUrl(imgUrl);
  }

  closeZoom() {
    this.image = "";
  }
}
