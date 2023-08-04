import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import * as moment from "moment";
import { MediaService } from "src/app/services/media.service";
import { ModalController, ToastController } from "@ionic/angular";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import { IonicSelectableComponent } from "ionic-selectable";
import { ModalViewFilePage } from "src/app/shared/modal/modal-view-file/modal-view-file.page";
import { ChooseCategoryComponent } from "src/app/shared/modal/choose-category/choose-category.component";
import { DomSanitizer } from "@angular/platform-browser";

class Category {
  public id: any;
  public name: string;
}
@Component({
  selector: "app-media-update",
  templateUrl: "./media-update.page.html",
  styleUrls: ["./media-update.page.scss"],
})
export class MediaUpdatePage implements OnInit {
  categories_search: Category[];
  category_search: Category[];
  public isActiveArr = [
    { value: true, name: "Active" },
    { value: false, name: "Inactive" },
  ];
  public categoryArr = [
    { id: 1, name: "Science" },
    { id: 2, name: "Romantic" },
  ];
  public mediaTypeArr = [
    { value: "audio", name: "Audio" },
    { value: "video", name: "Video" },
    { value: "book", name: "Book" },
  ];
  public fileTypeImage = ["image/png", "image/jpeg"];
  public fileTypeBook = ["application/pdf"];
  public fileTypeAudio = ["audio/mpeg"];
  public fileTypeVideo = ["video/mp4"];
  public count_images = 0;
  public images_id = [];
  public images = [];
  public images_change = [];
  public checkImage1 = false;
  public check_file_type = false;
  public srcVideo = "";
  public img = new Image();
  public checkError = false;
  public checkImage = false;
  public checkQuill = false;
  public checkSubmit = false;
  public formData = new FormData();
  public publishDate: Date;
  public temp_photo;
  public title = "";
  public logo = [""];
  public status = "";
  public isActive = false;
  public category = [];
  public temp_category = [];
  public author = "";
  public media;
  public mediaType = "audio";
  public countImage;
  public media_type;
  public name;
  public media_id;
  public categories = [];
  public temp_media = "";
  public checkMediaDefault = false;
  image: any;
  updateMediaForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private translate: TranslateService,
    private mediaService: MediaService,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private modalController: ModalController,
    private sanitizer: DomSanitizer
  ) {
    this.translate.use(localStorage.getItem("language"));
    this.mediaService.listCategories().subscribe((data) => {
      this.categories = data;
    });
    this.declareForm();
  }

  declareForm() {
    this.updateMediaForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      isActive: ["", [Validators.required]],
      author: [""],
      mainCategory: ["Public", [Validators.required]],
      specificCategory: ["", [Validators.required]],
      isbn: [""],
      price_per_copy: ["0", [Validators.required, Validators.min(0)]],
      release_date: ["", [Validators.required]],
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.images_id = [];
    this.images_change = [];
    this.countImage = [];
    this.checkSubmit = false;
    this.mediaService.listCategories().subscribe((data) => {
      this.categories = data;
      this.categories_search = data;
    });
    this.translate.use(localStorage.getItem("language"));
    this.media_id = +this.activatedRoute.snapshot.paramMap.get("id");
    this.mediaService.getMedia(this.media_id).subscribe((data) => {
      this.temp_media = data.media_type;
      this.name = data.name;
      this.author = data.author;
      this.temp_category = data.category;
      this.updateMediaForm.patchValue({
        specificCategory: data?.category,
        mainCategory: data?.main_category,
        price_per_copy: data?.price,
        isbn: data?.isbn,
      });
      if (this.temp_category.length > 0) {
        this.category = [];
        for (var i = 0; i < this.temp_category.length; i++) {
          this.category.push(this.temp_category[i].id);
        }
        this.checkLoopForArray(this.categories, this.category);
      }

      this.mediaType = data.media_type;
      this.isActive = data.is_active;
      this.publishDate = new Date(
        moment.utc(data.release_date).format("MM-DD-YYYY")
      );
      if (data.images.length > 0) {
        this.images = data.images;
        this.checkImage = true;
        this.count_images = this.images.length;
      } else {
        this.img.src = "";
        this.checkImage = false;
      }
      if (data.url != null) {
        this.checkImage1 = true;
      }
    });
  }

  updateMedia() {
    this.checkSubmit = true;
    if (
      this.updateMediaForm.valid &&
      this.checkImage &&
      this.checkImage1 &&
      !this.check_file_type
    ) {
      let formData = new FormData();
      const {
        name,
        author,
        isActive,
        price_per_copy,
        release_date,
        mainCategory,
        specificCategory,
        isbn,
      } = this.updateMediaForm.value;
      formData.append("name", name);
      formData.append("author", author);
      formData.append(
        "release_date",
        moment(release_date).format("YYYY-MM-DD")
      );
      formData.append("is_active", isActive);
      formData.append("media_type", this.mediaType);

      formData.append("main_category", mainCategory);
      formData.append("price", price_per_copy);
      const specificCategoryList = specificCategory.map((item) => item?.id);
      formData.append("category", specificCategoryList);
      if (isbn != undefined && isbn != "") {
        formData.append("isbn", isbn);
      }

      if (this.images_id.length > 0) {
        let id_delete = "";
        for (var i = 0; i < this.images_id.length; i++) {
          if (i == this.images_id.length - 1) {
            id_delete += this.images_id[i];
          } else {
            id_delete += this.images_id[i] + ", ";
          }
        }
        formData.append("delete_images", id_delete);
      }
      if (this.countImage != undefined) {
        for (var i = 0; i < this.countImage.length; i++) {
          formData.append("new_images[]", this.countImage[i]);
        }
      }

      // if(this.countImage.length > 0){
      //   formData.append("thumbnail", this.countImage[0], this.countImage[0].name)
      // }

      if (this.media != undefined) {
        // formData.append("media", this.media, this.media.name)
        // formData.append('url', this.media, this.media.name)
      }
      this.mediaService
        .updateMedia(this.media_id, formData)
        .pipe(
          catchError((data) => {
            if (data.error) {
              this.updateFail();
            }
            return of();
          })
        )
        .subscribe((data) => {
          this.updateSuccess();
          this.router.navigate(["/media/book"]);
        });
    } else {
      this.checkError = true;
    }
  }

  async updateSuccess() {
    let title = "";
    this.translate
      .get("Media.update_media.update_success")
      .subscribe((result: string) => {
        title = result;
      });

    const toast = await this.toastController.create({
      message: title,
      duration: 2000,
      position: "bottom",
      color: "primary",
      cssClass: "custom-toast",
    });
    toast.present();
  }

  async updateFail() {
    let title = "";
    this.translate
      .get("Media.update_media.update_fail")
      .subscribe((result: string) => {
        title = result;
      });
    const toast = await this.toastController.create({
      message: title,
      duration: 2000,
      position: "bottom",
      color: "danger",
      cssClass: "custom-toast",
    });
    toast.present();
  }

  onChange(element): void {
    this.countImage = [];
    this.images_change = [];
    let file = element[0];
    this.temp_photo = element[0];
    let fileReader: FileReader = new FileReader();
    this.img.src = URL.createObjectURL(file);
    this.img.title = file.name;
    fileReader.readAsDataURL(file);
    this.checkImage = true;
    if (element.length > 0) {
      for (var i = 0; i < element.length; i++) {
        let temp = element[i];
        if (this.validFileType(temp.type, this.fileTypeImage)) {
          let temp = element[i];
          if (this.validFileType(temp.type, this.fileTypeImage)) {
            let t = URL.createObjectURL(temp);
            this.images_change.push(t);
            this.countImage.push(temp);
          }
        }
      }
    }
  }

  changeMediaType() {
    let checkMedia = this.updateMediaForm.controls.media_type.value;

    if (checkMedia != this.temp_media && !this.checkMediaDefault) {
      this.checkImage1 = false;
    } else {
      this.checkImage1 = true;
    }

    if (checkMedia == "book") {
      if (this.media != undefined) {
        if (!this.validFileType(this.media.type, this.fileTypeBook)) {
          this.check_file_type = true;
        } else {
          this.check_file_type = false;
        }
      }
    } else if (checkMedia == "audio") {
      if (this.media != undefined) {
        if (!this.validFileType(this.media.type, this.fileTypeAudio)) {
          this.check_file_type = true;
        } else {
          this.check_file_type = false;
        }
      }
    } else if (checkMedia == "video") {
      if (this.media != undefined) {
        if (!this.validFileType(this.media.type, this.fileTypeVideo)) {
          this.check_file_type = true;
        } else {
          this.check_file_type = false;
        }
      }
    }
  }

  validFileType(file, mediaType) {
    return mediaType.includes(file);
  }

  onChangeMedia(element1): void {
    if (element1[0] != undefined) {
      this.check_file_type = false;
      let checkMedia = this.updateMediaForm.controls.media_type.value;
      if (checkMedia == "book") {
        if (!this.validFileType(element1[0].type, this.fileTypeBook)) {
          this.check_file_type = true;
          this.media = element1[0];
        } else {
          this.media = element1[0];
        }
      } else if (checkMedia == "audio") {
        if (!this.validFileType(element1[0].type, this.fileTypeAudio)) {
          this.check_file_type = true;
          this.media = element1[0];
        } else {
          this.media = element1[0];
        }
      } else {
        if (!this.validFileType(element1[0].type, this.fileTypeVideo)) {
          this.check_file_type = true;
          this.media = element1[0];
        } else {
          this.media = element1[0];
        }
      }
      let file = element1[0];
      this.checkMediaDefault = true;
      let fileReader: FileReader = new FileReader();
      this.title = file.name;
      fileReader.readAsDataURL(file);
      this.checkImage1 = true;
    }
  }

  changePublishDate() {
    this.publishDate = this.updateMediaForm.controls.push_date.value;
  }

  deleteImage(index) {
    this.checkImage = true;

    if (index < this.count_images) {
      this.images_id.push(this.images[index].id);
      this.images.splice(index, 1);
      this.count_images--;
    } else {
      this.images_change.splice(index, 1);
      let fileArray = Array.from(this.countImage);
      fileArray.splice(index, 1);
      this.countImage = fileArray;
    }

    if (this.images == undefined) {
      if (this.countImage != undefined) {
        if (this.countImage.length == 0) {
          this.checkImage = false;
        }
      } else {
        this.checkImage = false;
      }
    } else if (this.countImage == undefined) {
      if (this.images != undefined) {
        if (this.images.length == 0) {
          this.checkImage = false;
        }
      } else {
        this.checkImage = false;
      }
    } else if (this.countImage.length == 0 && this.images.length == 0) {
      this.checkImage = false;
    }
  }

  portChange(event: { component: IonicSelectableComponent; value: any }) {}

  formatPorts(item: Category[]) {
    return item.map((data) => data.name).join(", ");
  }

  checkLoopForArray(arr1, arr2) {
    if (arr1 != undefined && arr1.length > 0) {
      this.category_search = [];
      for (var i = 0; i < arr1.length; i++) {
        if (arr2.length > 0 && arr2 != undefined) {
          for (var j = 0; j < arr2.length; j++) {
            if (arr1[i].id == arr2[j]) {
              this.category_search.push(arr1[i]);
            }
          }
        }
      }
    }
  }
  get mainCategory() {
    return this.updateMediaForm.get("mainCategory");
  }
  get specificCategory() {
    return this.updateMediaForm.get("specificCategory");
  }

  async chooseCategory() {
    const modal = await this.modalController.create({
      component: ChooseCategoryComponent,
      showBackdrop: true,
      backdropDismiss: false,
      // cssClass: "chooseCategoryModalCss",
      componentProps: {
        main: this.updateMediaForm.get("mainCategory").value,
        specific: this.updateMediaForm.get("specificCategory").value,
        multiple: true,
      },
    });
    await modal.present();
    modal.onDidDismiss().then((data) => {
      if (data?.role == "submit") {
        this.updateMediaForm.patchValue({
          mainCategory: data.data?.mainCategory,
          specificCategory: data.data?.specificCategory,
        });
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
