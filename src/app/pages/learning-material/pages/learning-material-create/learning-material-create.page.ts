import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { LearningMaterialService } from "src/app/services/learning-material.service";
import { Router } from "@angular/router";
import {
  AlertController,
  ModalController,
  ToastController,
} from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import * as moment from "moment";
import { GlobalMenuService } from "src/app/services/global-menu.service";
import { isNumber } from "util";
import { HttpEvent, HttpEventType } from "@angular/common/http";
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
  selector: "app-learning-material-create",
  templateUrl: "./learning-material-create.page.html",
  styleUrls: ["./learning-material-create.page.scss"],
})
export class LearningMaterialCreatePage implements OnInit {
  categories_search: Category[];
  category_search: Category[];
  public isActiveArr = [
    { value: true, name: "Active" },
    { value: false, name: "Inactive" },
  ];
  public mediaTypeArr = [
    { value: "audio", name: "Audio" },
    { value: "video", name: "Video" },
    { value: "book", name: "Book" },
  ];

  public formatTypeArr = [
    { value: "mp3", name: "MP3" },
    { value: "mp4", name: "MP4" },
    { value: "pdf", name: "PDF" },
  ];
  public fileTypeImage = ["image/png", "image/jpeg"];
  public fileTypeBook = ["application/pdf"];
  public fileTypeAudio = ["audio/mpeg"];
  public fileTypeVideo = ["video/mp4"];
  // public formatType = 'pdf'
  // public mediaType = 'book'
  public fileSize;
  public images = [];
  public media;
  public title = "";
  public countImage;
  public categories;
  public isActive = true;
  public img = new Image();
  public checkImage = true;
  public checkImage1 = false;
  public checkError = false;
  public logo = [""];
  public temp_logo;
  public err = "";
  public checkSubmit = false;
  public check_file_type = false;
  public check_format_type = false;
  public checkDuration = true;
  public checkDownload = true;
  public formatType = "pdf";
  public uploading = false;
  public progress: number = 0;
  public labelProgress = "";
  public mediaType = "";
  public acceptType = this.fileTypeBook;
  public listCategory: string[];

  createLearningMaterialForm: FormGroup;
  image: any;
  constructor(
    private learningMaterialService: LearningMaterialService,
    private router: Router,
    private formBuilder: FormBuilder,
    public alertController: AlertController,
    private translate: TranslateService,
    private globalFooService: GlobalMenuService,
    private toastController: ToastController,
    private modalController: ModalController,
    private sanitizer: DomSanitizer
  ) {
    this.translate.use(localStorage.getItem("language"));
    this.declareForm();
  }

  declareForm() {
    this.createLearningMaterialForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      author: ["", [Validators.required]],
      format_type: ["pdf", [Validators.required]],
      mainCategory: [""],
      specificCategory: [[]],
      media_type: ["book", [Validators.required]],
      is_active: ["", [Validators.required]],
      thumbnail: ["", [Validators.required]],
      published_date: ["", [Validators.required]],
      isbn: ["", []],
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.translate.use(localStorage.getItem("language"));
    this.mediaType = localStorage.getItem("type_media_material");
    this.learningMaterialService.listCategories().subscribe((data) => {
      this.categories = data;
      this.categories_search = data;
    });
    this.images = [];
  }

  createLearningMaterial() {
    this.checkSubmit = true;
    if (this.img.src == "") {
      this.checkImage = false;
    }

    if (
      this.createLearningMaterialForm.valid &&
      this.checkImage &&
      !this.check_file_type &&
      this.checkImage1 &&
      !this.check_format_type &&
      this.checkDownload
    ) {
      this.uploading = true;
      let formData = new FormData();
      formData.append(
        "name",
        this.createLearningMaterialForm.controls.name.value
      );
      formData.append(
        "author",
        this.createLearningMaterialForm.controls.author.value
      );
      formData.append(
        "release_date",
        moment(
          this.createLearningMaterialForm.controls.published_date.value
        ).format("YYYY-MM-DD HH:mm:ss")
      );
      formData.append(
        "is_active",
        this.createLearningMaterialForm.controls.is_active.value
      );
      formData.append(
        "media_type",
        this.createLearningMaterialForm.controls.media_type.value
      );

      if (
        this.createLearningMaterialForm.controls.isbn.value != "" &&
        this.createLearningMaterialForm.controls.isbn.value != undefined
      ) {
        formData.append(
          "isbn",
          this.createLearningMaterialForm.controls.isbn.value
        );
      }
      formData.append(
        "main_category",
        this.createLearningMaterialForm.controls.mainCategory.value
      );
      formData.append(
        "category",
        this.createLearningMaterialForm.controls.specificCategory.value?.id
      );

      for (var i = 0; i < this.countImage.length; i++) {
        formData.append("images[]", this.countImage[i]);
      }
      if (this.media != undefined) {
        // formData.append("media", this.media, this.media.name)
        formData.append("url", this.media, this.media.name);
      }

      this.learningMaterialService
        .createLearningMaterial(formData)
        .pipe(
          catchError((data) => {
            if (data.error) {
              this.uploadFail();
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
              let temp_percent = Math.round((event.loaded / event.total) * 100);
              this.translate
                .get("Learning_material.create_material.percent_upload", {
                  output: temp_percent,
                })
                .subscribe((result: string) => {
                  this.labelProgress = result;
                });
              break;
            case HttpEventType.Response:
              this.uploadSuccess();
              this.uploading = false;
              this.progress = 0;
              let temp =
                this.createLearningMaterialForm.controls.media_type.value;
              if (temp == "book") {
                this.router.navigate(["/learning-material/book"]);
              }
              if (temp == "audio") {
                this.router.navigate(["/learning-material/audio"]);
              }
              if (temp == "video") {
                this.router.navigate(["/learning-material/video"]);
              }
          }
        });
    } else {
      this.checkError = true;
    }
  }

  onChange(element): void {
    this.images = [];
    this.countImage = [];
    let file = element[0];
    this.temp_logo = element[0];
    let fileReader: FileReader = new FileReader();
    this.img.src = URL.createObjectURL(file);
    this.img.title = file.name;
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

  validFileType(file, mediaType) {
    return mediaType.includes(file);
  }

  changeMediaType() {
    let checkMedia = this.createLearningMaterialForm.controls.media_type.value;
    let checkFormat =
      this.createLearningMaterialForm.controls.format_type.value;
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
      // check file type
      if (this.media != undefined) {
        if (!this.validFileType(this.media.type, this.fileTypeAudio)) {
          this.check_file_type = true;
        } else {
          this.check_file_type = false;
        }
      }
    } else if (checkMedia == "video") {
      this.formatType = "mp4";
      this.acceptType = this.fileTypeVideo;
      if (this.media != undefined) {
        if (!this.validFileType(this.media.type, this.fileTypeVideo)) {
          this.check_file_type = true;
        } else {
          this.check_file_type = false;
        }
      }
    }
  }

  changeFormatType() {
    let checkMedia = this.createLearningMaterialForm.controls.media_type.value;
    let checkFormat =
      this.createLearningMaterialForm.controls.format_type.value;
    if (checkMedia == "book") {
      if (checkFormat == "pdf") {
        this.check_format_type = false;
      } else {
        this.check_format_type = true;
      }
    } else if (checkMedia == "audio") {
      if (checkMedia == "mp3") {
        this.check_format_type = false;
      } else {
        this.check_format_type = true;
      }
    } else if (checkMedia == "video") {
      if (checkFormat == "mp4") {
        this.check_format_type = false;
      } else {
        this.check_format_type = true;
      }
    }
  }

  onChangeMedia(element1): void {
    if (element1[0] != undefined) {
      this.check_file_type = false;
      let checkMedia =
        this.createLearningMaterialForm.controls.media_type.value;
      if (checkMedia == "book") {
        if (!this.validFileType(element1[0].type, this.fileTypeBook)) {
          this.check_file_type = true;
          this.media = element1[0];
          // this.fileSize = ''
        } else {
          this.media = element1[0];
          this.fileSize = Number(
            (parseInt(element1[0].size) / (1024 * 1024)).toFixed(0)
          );
        }
      } else if (checkMedia == "audio") {
        if (!this.validFileType(element1[0].type, this.fileTypeAudio)) {
          this.check_file_type = true;
          this.media = element1[0];
          // this.fileSize = ''
        } else {
          this.media = element1[0];
          this.fileSize = Number(
            (parseInt(element1[0].size) / (1024 * 1024)).toFixed(0)
          );
        }
      } else {
        if (!this.validFileType(element1[0].type, this.fileTypeVideo)) {
          this.check_file_type = true;
          this.media = element1[0];
          // this.fileSize = ''
        } else {
          this.media = element1[0];
          this.fileSize = Number(
            (parseInt(element1[0].size) / (1024 * 1024)).toFixed(0)
          );
        }
      }
      let file = element1[0];
      this.title = file.name;
      this.checkImage1 = true;
    }
  }

  checkNumberDownload() {
    let checkNull =
      this.createLearningMaterialForm.controls.number_of_download.value;
    let check = parseInt(
      this.createLearningMaterialForm.controls.number_of_download.value
    );
    if (check < 0) {
      this.checkDownload = false;
    } else if (
      (!isNumber(check) || isNaN(check) || check < 0 || !isNumber(checkNull)) &&
      checkNull != "" &&
      check != checkNull
    ) {
      this.checkDownload = false;
    } else {
      this.checkDownload = true;
    }
  }

  checkMaxDuration() {
    let checkNull = this.createLearningMaterialForm.controls.duration.value;
    let check = parseInt(
      this.createLearningMaterialForm.controls.duration.value
    );
    if (check < 0) {
      this.checkDuration = false;
    } else if (
      (!isNumber(check) || isNaN(check) || check < 0 || !isNumber(checkNull)) &&
      checkNull != "" &&
      check != checkNull
    ) {
      this.checkDuration = false;
    } else {
      this.checkDuration = true;
    }
  }

  deleteImage(index) {
    this.images.splice(index, 1);
    let fileArray = Array.from(this.countImage);
    fileArray.splice(index, 1);
    this.countImage = fileArray;
  }

  async uploadSuccess() {
    let title = "";
    this.translate
      .get("Learning_material.create_material.upload_success")
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

  async uploadFail() {
    let title = "";
    this.translate
      .get("Learning_material.create_material.upload_fail")
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

  portChange(event: { component: IonicSelectableComponent; value: any }) {}

  formatPorts(item: Category[]) {
    return item.map((data) => data.name).join(", ");
  }

  async chooseCategory() {
    const modal = await this.modalController.create({
      component: ChooseCategoryComponent,
      showBackdrop: false,
      cssClass: "chooseCategoryModalCss",
      componentProps: {
        main: this.createLearningMaterialForm.get("mainCategory").value,
        specific: this.createLearningMaterialForm.get("specificCategory").value,
      },
    });
    await modal.present();
    modal.onDidDismiss().then((data) => {
      if (data.role == "submit") {
        this.createLearningMaterialForm.patchValue({
          mainCategory: data.data?.mainCategory,
          specificCategory: data.data?.specificCategory,
        });
      }
    });
  }

  get mainCategory() {
    return this.createLearningMaterialForm.get("mainCategory");
  }

  get specificCategory() {
    return this.createLearningMaterialForm.get("specificCategory");
  }

  zoomPicture(imgUrl) {
    this.image = this.sanitizer.bypassSecurityTrustResourceUrl(imgUrl);
  }

  closeZoom() {
    this.image = "";
  }
}
