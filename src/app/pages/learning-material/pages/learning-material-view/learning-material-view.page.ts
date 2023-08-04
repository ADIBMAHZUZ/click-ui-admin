import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { LearningMaterialService } from "src/app/services/learning-material.service";
import * as moment from "moment";
import { MediaService } from "src/app/services/media.service";
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: "app-learning-material-view",
  templateUrl: "./learning-material-view.page.html",
  styleUrls: ["./learning-material-view.page.scss"],
})
export class LearningMaterialViewPage implements OnInit {
  public images = [];
  public material_id;
  public name = "";
  public publisher = "";
  public category = "";
  public duration = "";
  public author = "";
  public format_type = "";
  public logo = "";
  public is_active = "";
  public media_type = "";
  public number_of_download = 0;
  public file_size = "";
  public url = "";
  public preview_url = "";
  public publish_date;
  public categories;
  public isbn = "";
  public mainCategory = "";
  public checkISBN = false;
  image: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private learningMaterialService: LearningMaterialService,
    private translate: TranslateService,
    private mediaService: MediaService,
    private sanitizer: DomSanitizer
  ) {
    this.translate.use(localStorage.getItem("language"));
    this.learningMaterialService.listCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.translate.use(localStorage.getItem("language"));
    this.material_id = +this.activatedRoute.snapshot.paramMap.get("id");
    this.learningMaterialService
      .getLearningMaterial(this.material_id)
      .subscribe((data) => {
        this.name = data.name;
        this.author = data.author;
        // this.category = data.category
        this.number_of_download = data.number_of_download;
        this.media_type = data.media_type;
        this.duration = data.duration;
        this.publisher = data.publisher;
        this.mainCategory = data.main_category;
        this.publish_date = moment
          .utc(data.release_date)
          .format("MM-DD-YYYY HH:mm:ss");
        this.file_size = data.file_size + " MB";
        this.format_type = data.format_type;
        let temp = data.category;
        if (data.media_type == "book") {
          this.isbn = data.isbn;
          this.checkISBN = true;
        } else {
          this.checkISBN = false;
        }
        this.mediaService.listCategories().subscribe((data) => {
          this.categories = data;
          this.categories.forEach((element) => {
            if (element.id == temp) {
              this.category = element.name;
            }
          });
        });

        if (data.is_active) {
          this.is_active = "Active";
        } else {
          this.is_active = "Inactive";
        }
        if (data.thumbnail != null) {
          this.logo = data.thumbnail;
        } else {
          this.logo = "";
        }
        console.log(data);
        this.images = data.images;
      });
  }

  zoomPicture(imgUrl) {
    this.image = this.sanitizer.bypassSecurityTrustResourceUrl(imgUrl);
  }

  closeZoom() {
    this.image = "";
  }
}
