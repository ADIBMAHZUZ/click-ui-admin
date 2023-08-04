import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import * as moment from "moment";
import { MediaService } from "src/app/services/media.service";
import { ModalController, ToastController } from "@ionic/angular";
import { HttpEventType, HttpEvent } from "@angular/common/http";
import { pipe, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { IonicSelectableComponent } from "ionic-selectable";
import { ModalViewFilePage } from "src/app/shared/modal/modal-view-file/modal-view-file.page";
import { ChooseCategoryComponent } from "src/app/shared/modal/choose-category/choose-category.component";
import { DomSanitizer } from "@angular/platform-browser";

class Category {
  public id: any;
  public name: string;
}

@Component({
  selector: "app-media-create",
  templateUrl: "./media-create.page.html",
  styleUrls: ["./media-create.page.scss"],
})
export class MediaCreatePage implements OnInit {
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
  public mediaType = "";
  public checkImage1 = false;
  public media;
  public temp_logo;
  public countImage = [];
  public images = [];
  public title = "";
  public check_file_type = false;
  public file;
  public srcVideo = "";
  public img = new Image();
  public checkError = false;
  public checkImage = false;
  public checkQuill = false;
  public checkSubmit = false;
  public formData = new FormData();
  public publishDate;
  public temp_photo;
  public categories = [];
  public labelProgress = "";
  public progress: number = 0;
  public uploading = false;
  public is_active = true;
  public category;
  public check_file_size = false;
  createMediaForm: FormGroup = this.formBuilder.group({
    name: ["", [Validators.required]],
    push_date: ["", [Validators.required]],
    isActive: ["", [Validators.required]],
    mainCategory: ["", [Validators.required]],
    specificCategory: [[], [Validators.required]],
    author: ["", [Validators.required]],
    thumbnail: ["", [Validators.required]],
    media_type: ["", [Validators.required]],
    isbn: [""],
    price_per_copy: ["0", [Validators.required, Validators.min(0)]],
  });
  formatType = "pdf";
  acceptType = this.fileTypeAudio;
  term: boolean = false;
  image: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private translate: TranslateService,
    private mediaService: MediaService,
    private toastController: ToastController,
    private modalController: ModalController,
    private sanitizer: DomSanitizer
  ) {
    this.translate.use(localStorage.getItem("language"));
    if (localStorage.getItem("language") == "en") {
      this.title = "No select file..";
    } else {
      this.title = "Tiada fail pilih ..";
    }
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.translate.use(localStorage.getItem("language"));
    this.mediaType = localStorage.getItem("type_media");
    if (localStorage.getItem("language") == "en") {
      this.title = "No select file..";
    } else {
      this.title = "Tiada fail pilih ..";
    }

    this.mediaService.listCategories().subscribe((data) => {
      this.categories = data;
      this.categories_search = data;
    });
    this.images = [];
  }

  createMedia() {
    this.checkSubmit = true;
    if (!this.term) return;

    const {
      name,
      author,
      push_date,
      isActive,
      media_type,
      price_per_copy,
      mainCategory,
      specificCategory,
      isbn,
    } = this.createMediaForm.value;

    if (
      this.createMediaForm.valid &&
      this.checkImage &&
      !this.check_file_type &&
      this.checkImage1 &&
      !this.check_file_size
    ) {
      this.uploading = true;
      let formData = new FormData();
      formData.append("name", name);
      formData.append("author", author);
      formData.append("release_date", moment(push_date).format("YYYY-MM-DD"));
      formData.append("is_active", isActive);
      formData.append("media_type", media_type);
      formData.append("price", price_per_copy);
      formData.append("main_category", mainCategory);
      const specificCategoryList = specificCategory.map((item) => item?.id);
      formData.append("category", specificCategoryList);

      for (var i = 0; i < this.countImage.length; i++) {
        formData.append("images[]", this.countImage[i]);
      }
      if (this.media != undefined) {
        formData.append("url", this.media, this.media.name);
      }
      if (isbn != "" && isbn != undefined) {
        formData.append("isbn", isbn);
      }
      this.mediaService
        .createMedia(formData)
        .pipe(
          catchError((data) => {
            if (data.error) {
              if (data.error.code != undefined) {
                this.uploadFail(data.error.code);
              } else {
                this.uploadFail("CLC409");
              }
              this.uploading = false;
              this.progress = 0;
              this.labelProgress = "";
            }
            return of();
          })
        )
        .subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              break;
            case HttpEventType.ResponseHeader:
              break;
            case HttpEventType.UploadProgress:
              let complete = (event.loaded / event.total).toFixed(2);
              this.progress = parseFloat(complete);
              let temp_percent = Math.round(
                event.loaded / (event.total * 1024)
              );
              let temp_uploaded = ((event.loaded / event.total) * 1024).toFixed(
                2
              );
              if (parseFloat(temp_uploaded) > 1024) {
                temp_uploaded = "100.0";
              }
              this.translate
                .get("Learning_material.create_material.percent_upload", {
                  output: temp_uploaded,
                })
                .subscribe((result: string) => {
                  this.labelProgress = result;
                });
              break;
            case HttpEventType.Response:
              this.uploading = false;
              this.progress = 0;
              this.labelProgress = "";
              this.uploadSuccess();
              let temp = this.createMediaForm.controls.media_type.value;
              this.createMediaForm.reset();
              this.createMediaForm.markAsUntouched();
              if (temp == "book") {
                this.router.navigate(["/media"]);
              }
              if (temp == "audio") {
                this.router.navigate(["/media/audio"]);
              }
              if (temp == "video") {
                this.router.navigate(["/media/video"]);
              }
          }
        });
    } else {
      this.checkError = true;
    }
  }

  async uploadSuccess() {
    let title = "";
    this.translate
      .get("Media.create_media.upload_success")
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

  async uploadFail(code_err) {
    let title = "";
    let temp_err = "";
    if (code_err == "CLC400") {
      temp_err = "Media.create_media.upload_clc_400";
    } else if (code_err == "CLC401") {
      temp_err = "Media.create_media.upload_clc_401";
    } else if (code_err == "CLC402") {
      temp_err = "Media.create_media.upload_clc_402";
    } else if (code_err == "CLC403") {
      temp_err = "Media.create_media.upload_clc_403";
    } else if (code_err == "CLC404") {
      temp_err = "Media.create_media.upload_clc_404";
    } else {
      temp_err = "Media.create_media.upload_clc_409";
    }
    this.translate.get(temp_err).subscribe((result: string) => {
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
    // this.check_file_type = false
    this.countImage = [];
    let file = element[0];
    this.temp_logo = element[0];
    let fileReader: FileReader = new FileReader();
    this.img.src = URL.createObjectURL(file);
    this.img.title = file.name;
    // this.title = file.name
    fileReader.readAsDataURL(file);
    this.checkImage = true;

    if (element.length > 0) {
      for (var i = 0; i < element.length; i++) {
        let temp = element[i];
        if (this.validFileType(temp.type, this.fileTypeImage)) {
          let t = URL.createObjectURL(temp);
          this.images.push(t);
          this.countImage.push(temp);
        }
      }
    }
  }

  onChangeMedia(element1): void {
    if (element1[0] != undefined) {
      this.check_file_type = false;
      this.check_file_size = false;
      let temp = (parseFloat(element1[0].size) / (1024 * 1024)).toFixed(1);
      let checkMedia = this.createMediaForm.controls.media_type.value;
      if (checkMedia == "book") {
        if (!this.validFileType(element1[0].type, this.fileTypeBook)) {
          this.check_file_type = true;
          this.media = element1[0];
        } else {
          this.media = element1[0];
          if (parseFloat(temp) > 100) {
            this.check_file_size = true;
          }
        }
      } else if (checkMedia == "audio") {
        if (!this.validFileType(element1[0].type, this.fileTypeAudio)) {
          this.check_file_type = true;
          this.media = element1[0];
        } else {
          this.media = element1[0];
          if (parseFloat(temp) > 100) {
            this.check_file_size = true;
          }
        }
      } else {
        if (!this.validFileType(element1[0].type, this.fileTypeVideo)) {
          this.check_file_type = true;
          this.media = element1[0];
        } else {
          this.media = element1[0];
          if (parseFloat(temp) > 100) {
            this.check_file_size = true;
          }
        }
      }
      let file = element1[0];
      let fileReader: FileReader = new FileReader();
      this.title = file.name;
      fileReader.readAsDataURL(file);
      this.checkImage1 = true;
    }
  }

  deleteImage(index) {
    this.images.splice(index, 1);
    let fileArray = Array.from(this.countImage);
    fileArray.splice(index, 1);
    this.countImage = fileArray;
  }

  changePublishDate() {
    this.publishDate = this.createMediaForm.controls.push_date.value;
  }

  changeMediaType() {
    let checkMedia = this.createMediaForm.controls.media_type.value;
    if (checkMedia == "book") {
      this.formatType = "pdf";
      this.acceptType = this.fileTypeBook;
      if (this.media != undefined) {
        if (!this.validFileType(this.media.type, this.fileTypeBook)) {
          this.check_file_type = true;
        } else {
          this.check_file_type = false;
        }
      }
    } else if (checkMedia == "audio") {
      this.formatType = "mp3";
      this.acceptType = this.fileTypeAudio;
      if (this.media != undefined) {
        if (!this.validFileType(this.media.type, this.fileTypeAudio)) {
          this.check_file_type = true;
        } else {
          this.check_file_type = false;
        }
      }
    } else if (checkMedia == "video") {
      this.acceptType = this.fileTypeVideo;
      this.formatType = "mp4";
      if (this.media != undefined) {
        if (!this.validFileType(this.media.type, this.fileTypeVideo)) {
          this.check_file_type = true;
        } else {
          this.check_file_type = false;
        }
      }
    }
  }

  portChange(event: { component: IonicSelectableComponent; value: any }) {
    this.chooseCategory();
  }

  formatPorts(item: Category[]) {
    return item.map((data) => data.name).join(", ");
  }

  validFileType(file, mediaType) {
    return mediaType.includes(file);
  }

  zoomPicture(imgUrl) {
    this.image = this.sanitizer.bypassSecurityTrustResourceUrl(imgUrl);
  }

  closeZoom() {
    this.image = "";
  }

  async chooseCategory() {
    const modal = await this.modalController.create({
      component: ChooseCategoryComponent,
      showBackdrop: false,
      cssClass: "chooseCategoryModalCss",
      componentProps: {
        main: this.createMediaForm.get("mainCategory").value,
        specific: this.createMediaForm.get("specificCategory").value,
        multiple: true,
      },
    });
    await modal.present();
    modal.onDidDismiss().then((data) => {
      if (data.role == "submit") {
        this.createMediaForm.patchValue({
          mainCategory: data.data?.mainCategory,
          specificCategory: data.data?.specificCategory,
        });
      }
    });
  }

  get mainCategory() {
    return this.createMediaForm.get("mainCategory");
  }

  get specificCategory() {
    return this.createMediaForm.get("specificCategory");
  }

  checkTerm({ detail }) {
    this.term = detail.checked;
  }
}
