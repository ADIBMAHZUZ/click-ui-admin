import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LibraryService } from "../../../../services/library.service";
import { TranslateService } from "@ngx-translate/core";
import { ModalController, NavController } from "@ionic/angular";
import { ModalViewFilePage } from "src/app/shared/modal/modal-view-file/modal-view-file.page";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-library-view",
  templateUrl: "./library-view.page.html",
  styleUrls: ["./library-view.page.scss"],
})
export class LibraryViewPage implements OnInit {
  public library = "";
  public libraryshort = "";
  public address = "";
  public phone = "";
  public email = "";
  public username = "";
  public logo = "";
  public is_active = "";
  public library_id;
  public max_subscriber;
  image: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private libraryService: LibraryService,
    private translate: TranslateService,
    private navCtrl: NavController,
    private modalController: ModalController,
    private sanitizer: DomSanitizer
  ) {
    this.translate.use(localStorage.getItem("language"));
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.translate.use(localStorage.getItem("language"));
    this.library_id = +this.activatedRoute.snapshot.paramMap.get("id");
    this.libraryService.getLibrary(this.library_id).subscribe((data) => {
      this.library = data.name;
      this.libraryshort = data.short_name;
      this.address = data.address;
      this.phone = data.phone;
      this.username = data.username;
      this.email = data.email;
      this.max_subscriber = data.max_subscribers;
      if (data.is_active) {
        this.is_active = "Active";
      } else {
        this.is_active = "Inactive";
      }
      if (data.logo != null) {
        this.logo = data.logo;
      } else {
        this.logo = "";
      }
    });
  }

  popPage() {
    // this.navCtrl.pop();
    console.log(this.navCtrl);
  }

  ionViewWillLeave() {
    // this.popPage()
  }

  zoomPicture(imgUrl) {
    this.image = this.sanitizer.bypassSecurityTrustResourceUrl(imgUrl);
  }

  closeZoom() {
    this.image = "";
  }
}
