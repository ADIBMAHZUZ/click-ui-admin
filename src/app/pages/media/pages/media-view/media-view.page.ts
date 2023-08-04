import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { MediaService } from "src/app/services/media.service";
import * as moment from "moment";
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: "app-media-view",
  templateUrl: "./media-view.page.html",
  styleUrls: ["./media-view.page.scss"],
})
export class MediaViewPage implements OnInit {
  public name = "";
  public relesae_date = "";
  public media_type = "";
  public author = "";
  public category = [];
  public mainCategory = "";
  public logo = "";
  public is_active = "";
  public media_id;
  public srcVideo = "";
  public images = [];
  public categories = [];
  public dataCategpry;
  public isbn = "";
  public checkISBN = false;
  public file_size = "";
  public temp_category = [];
  public price = "";
  image: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private mediaService: MediaService,
    private sanitizer: DomSanitizer
  ) {
    this.mediaService.listCategories().subscribe((data) => {
      this.categories = data;
    });
    this.translate.use(localStorage.getItem("language"));
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.translate.use(localStorage.getItem("language"));
    this.media_id = +this.activatedRoute.snapshot.paramMap.get("id");
    this.mediaService.listCategories().subscribe((data) => {
      this.categories = data;
    });
    this.mediaService.getMedia(this.media_id).subscribe((data) => {
      this.name = data.name;
      this.author = data.author;
      this.mainCategory = data.main_category;
      this.price = data.price;

      // let temp = data.category

      this.category = data.category.map((item) => item.name);
      // if (this.temp_category.length > 0) {
      //   this.category = [];
      //   for (var i = 0; i < this.temp_category.length; i++) {
      //     this.category.push(this.temp_category[i].name);
      //   }
      // }
      this.media_type = data.media_type;
      // this.mediaService.listCategories().subscribe(data => {
      //   this.dataCategpry = data
      //   this.dataCategpry.forEach(element => {
      //     if(element.id == temp){
      //       this.category = element.name
      //     }
      //   });
      // })
      if (data.is_active) {
        this.is_active = "Active";
      } else {
        this.is_active = "Inactive";
      }
      this.relesae_date = moment.utc(data.release_date).format("MM-DD-YYYY");

      this.media_type = data.media_type;
      this.file_size = data.file_size + " MB";
      this.isbn = data.isbn;
      if (data.thumbnail != null) {
        this.logo = data.thumbnail;
      } else {
        this.logo = "";
      }
    });
  }
  zoomPicture(imgUrl) {
    this.image = this.sanitizer.bypassSecurityTrustResourceUrl(imgUrl);
  }

  closeZoom() {
    this.image = "";
  }
}
