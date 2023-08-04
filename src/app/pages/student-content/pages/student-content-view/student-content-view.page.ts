import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { StudentContentService } from "src/app/services/student-content.service";
import * as moment from "moment";
import { TranslateService } from "@ngx-translate/core";
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: "app-student-content-view",
  templateUrl: "./student-content-view.page.html",
  styleUrls: ["./student-content-view.page.scss"],
})
export class StudentContentViewPage implements OnInit {
  public title = "";
  public publishDate;
  public isActive = "";
  public isActiveArr = [
    { value: true, name: "True" },
    { value: false, name: "False" },
  ];
  public student_content_id;
  public htmlText = "";
  public photo = "";
  public status = "";
  image: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private studetnContentService: StudentContentService,
    private translate: TranslateService,
    private sanitizer: DomSanitizer
  ) {
    this.translate.use(localStorage.getItem("language"));
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.translate.use(localStorage.getItem("language"));
    this.student_content_id = +this.activatedRoute.snapshot.paramMap.get("id");
    this.studetnContentService
      .getStudentContent(this.student_content_id)
      .subscribe((data) => {
        this.title = data.title;
        this.publishDate = moment
          .utc(data.publish_date)
          .format("MM/DD/YYYY HH:mm");
        this.htmlText = data.content;
        this.status = data.status;
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
