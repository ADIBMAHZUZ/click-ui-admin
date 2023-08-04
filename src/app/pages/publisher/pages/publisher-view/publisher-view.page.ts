import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PublisherService } from "src/app/services/publisher.service";
import { TranslateService } from "@ngx-translate/core";
import { ModalViewFilePage } from "src/app/shared/modal/modal-view-file/modal-view-file.page";
import { ModalController } from "@ionic/angular";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-publisher-view",
  templateUrl: "./publisher-view.page.html",
  styleUrls: ["./publisher-view.page.scss"],
})
export class PublisherViewPage implements OnInit {
  public publisher = "";
  public publishershort = "";
  public address = "";
  public phone = "";
  public email = "";
  public username = "";
  public isActive = "";
  public publisher_id;
  public logo = "";
  public storage;
  image: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private publisherService: PublisherService,
    private translate: TranslateService,
    private modalController: ModalController,
    private sanitizer: DomSanitizer
  ) {
    this.translate.use(localStorage.getItem("language"));
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.translate.use(localStorage.getItem("language"));
    this.publisher_id = +this.activatedRoute.snapshot.paramMap.get("id");
    this.publisherService.getPublisher(this.publisher_id).subscribe((data) => {
      this.publisher = data.name;
      this.publishershort = data.short_name;
      this.address = data.address;
      this.phone = data.phone;
      this.username = data.username;
      this.email = data.email;
      this.storage = data.storage;
      if (data.is_active) {
        this.isActive = "Active";
      } else {
        this.isActive = "Inactive";
      }
      if (data.logo != null) {
        this.logo = data.logo;
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
