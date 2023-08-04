import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { LearningMaterialService } from "src/app/services/learning-material.service";
import { Router, ActivatedRoute } from "@angular/router";
import {
  AlertController,
  ModalController,
  ToastController,
} from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import * as moment from "moment";
import { id } from "@swimlane/ngx-datatable";
import { isNumber } from "util";
import { threadId } from "worker_threads";
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
  selector: "app-learning-material-update",
  templateUrl: "./learning-material-update.page.html",
  styleUrls: ["./learning-material-update.page.scss"],
})
export class LearningMaterialUpdatePage implements OnInit {
  categories_search: Category[];
  category_search: Category;
  public fileTypeImage = ["image/png", "image/jpeg"];
  public fileTypeBook = ["application/pdf"];
  public fileTypeAudio = ["audio/mpeg"];
  public fileTypeVideo = ["video/mp4"];

  public count_images = 0;
  public images_id = [];
  public images = [];
  public images_change = [];
  public media;
  public title = "";
  public name = "";
  public published_date: Date;
  public isActive = true;
  public duration = "";
  public author = "";
  public format_type = "";
  public number_of_download;
  public media_type;
  public file_size;
  public url;
  public preview_url;
  public category: any;
  public publisher;
  public categories;
  public mediaType = "book";
  public formatType = "pdf";
  public checkImage = true;
  public checkSubmit = false;
  public checkQuill = false;
  public checkDuration = true;
  public checkDownload = true;
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
  public countImage;
  public checkImage1 = false;
  public check_file_type = false;
  public check_format_type = false;
  public img = new Image();
  public checkError = false;
  public photo = "";
  public formData = new FormData();
  public learning_material_id;
  public temp_photo;
  public temp_media = "";
  public checkMediaDefault = false;
  public checkISBN = false;
  public isbn = "";
  public temp_category = [];
  updateLearningMaterialForm: FormGroup;
  public acceptType = this.fileTypeBook;
  image: any;
  constructor(
    private learningMaterialService: LearningMaterialService,
    private router: Router,
    private formBuilder: FormBuilder,
    public alertController: AlertController,
    private translate: TranslateService,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private modalController: ModalController,
    private sanitizer: DomSanitizer
  ) {
    this.declareForm();
  }

  declareForm() {
    this.updateLearningMaterialForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      author: ["", [Validators.required]],
      number_of_download: ["", [Validators.required]],
      is_active: ["", [Validators.required]],
      mainCategory: ["", [Validators.required]],
      specificCategory: [[Validators.required]],
      published_date: ["", [Validators.required]],
      publisher: ["", []],
      isbn: ["", []],
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.images_change = [];
    this.images_id = [];
    this.countImage = [];
    this.checkMediaDefault = false;
    this.learningMaterialService.listCategories().subscribe((data) => {
      this.categories = data;
      this.categories_search = data;
    });
    this.translate.use(localStorage.getItem("language"));
    this.learning_material_id =
      +this.activatedRoute.snapshot.paramMap.get("id");

    this.learningMaterialService
      .getLearningMaterial(this.learning_material_id)
      .subscribe((data) => {
        this.updateLearningMaterialForm.patchValue({
          mainCategory: data?.main_category,
          specificCategory: this.categories.find(
            (item) => item.id == data?.category
          ),
        });
        this.temp_media = data.media_type;
        this.name = data.name;
        this.published_date = new Date(
          moment.utc(data.release_date).format("MM-DD-YYYY HH:mm:ss")
        );
        this.duration = data.duration;
        this.isActive = data.is_active;
        this.author = data.author;
        this.format_type = data.format_type;
        this.number_of_download = data.number_of_download;
        this.mediaType = data.media_type;
        this.preview_url = data.preview_url;
        this.url = data.url;
        if (data.category != null) {
          this.category = data.category;
          this.checkLoopForArray(this.categories, this.category);
        }
        this.temp_category = data.category;
        if (data.category != null) {
          this.checkLoopForArray(this.categories, this.category);
        }

        this.media_type = data.media_type;

        this.file_size = data.file_size;
        if (data.images.length > 0) {
          this.images = data.images;
          this.count_images = this.images.length;
          this.checkImage = true;
        } else {
          this.img.src = "";
          this.checkImage = false;
        }
        if (data.url != null) {
          this.checkImage1 = true;
        }
      });
  }

  updateLearningMaterial() {
    this.checkSubmit = true;

    if (
      this.updateLearningMaterialForm.valid &&
      this.checkImage &&
      this.checkImage1 &&
      !this.check_file_type &&
      !this.check_format_type &&
      this.checkDownload &&
      this.checkDuration
    ) {
      let formData = new FormData();
      formData.append(
        "name",
        this.updateLearningMaterialForm.controls.name.value
      );
      formData.append(
        "author",
        this.updateLearningMaterialForm.controls.author.value
      );
      formData.append(
        "release_date",
        moment(
          this.updateLearningMaterialForm.controls.published_date.value
        ).format("YYYY-MM-DD HH:mm:ss")
      );
      formData.append(
        "is_active",
        this.updateLearningMaterialForm.controls.is_active.value
      );
      formData.append(
        "number_of_download",
        this.updateLearningMaterialForm.controls.number_of_download.value
      );
      formData.append("media_type", this.media_type);

      if (
        this.updateLearningMaterialForm.controls.isbn.value != "" &&
        this.updateLearningMaterialForm.controls.isbn.value != undefined
      ) {
        formData.append(
          "isbn",
          this.updateLearningMaterialForm.controls.isbn.value
        );
      }

      formData.append(
        "category",
        this.updateLearningMaterialForm.controls.specificCategory.value.id
      );
      formData.append(
        "main_category",
        this.updateLearningMaterialForm.controls.mainCategory.value
      );
      formData.append(
        "publisher",
        this.updateLearningMaterialForm.controls.publisher.value
      );
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

      if (this.media != undefined) {
        // formData.append("media", this.media, this.media.name)
        // formData.append('url', this.media, this.media.name)
      }

      this.learningMaterialService
        .updateLearningMaterial(this.learning_material_id, formData)
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
          this.router.navigate(["/learning-material"]);
        });
    } else {
      this.checkError = true;
    }
  }

  async updateSuccess() {
    let title = "";
    this.translate
      .get("Learning_material.update_material.update_success")
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
      .get("Learning_material.update_material.update_fail")
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

  onChange(fileList: FileList): void {
    this.countImage = [];
    this.images_change = [];
    let file = fileList[0];
    this.temp_photo = fileList[0];
    let fileReader: FileReader = new FileReader();
    this.img.src = URL.createObjectURL(file);
    this.img.title = file.name;
    fileReader.readAsDataURL(file);
    this.checkImage = true;
    if (fileList.length > 0) {
      for (var i = 0; i < fileList.length; i++) {
        let temp = fileList[i];
        if (this.validFileType(temp.type, this.fileTypeImage)) {
          let t = URL.createObjectURL(temp);
          this.images_change.push(t);
          this.countImage.push(temp);
        }
      }
    }
  }

  changeMediaType() {
    let checkMedia = this.updateLearningMaterialForm.controls.media_type.value;
    let checkFormat =
      this.updateLearningMaterialForm.controls.format_type.value;

    if (checkMedia != this.temp_media && !this.checkMediaDefault) {
      this.checkImage1 = false;
    } else {
      this.checkImage1 = true;
    }

    if (checkMedia == "book") {
      this.format_type = "pdf";
      this.acceptType = this.fileTypeBook;
      if (this.media != undefined) {
        if (!this.validFileType(this.media.type, this.fileTypeBook)) {
          this.check_file_type = true;
        } else {
          this.check_file_type = false;
        }
      }
    } else if (checkMedia == "audio") {
      this.format_type = "mp3";
      if (this.media != undefined) {
        if (!this.validFileType(this.media.type, this.fileTypeAudio)) {
          this.check_file_type = true;
        } else {
          this.check_file_type = false;
        }
      }
    } else if (checkMedia == "video") {
      this.format_type = "mp4";
      if (this.media != undefined) {
        if (!this.validFileType(this.media.type, this.fileTypeVideo)) {
          this.check_file_type = true;
        } else {
          this.check_file_type = false;
        }
      }
    }

    if (checkMedia == "book") {
      this.checkISBN = false;
    } else {
      this.checkISBN = true;
    }
  }

  changeFormatType() {
    let checkMedia = this.updateLearningMaterialForm.controls.media_type.value;
    let checkFormat =
      this.updateLearningMaterialForm.controls.format_type.value;
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

  validFileType(file, mediaType) {
    return mediaType.includes(file);
  }

  onChangeMedia(element1): void {
    if (element1[0] != undefined) {
      this.check_file_type = false;
      let checkMedia =
        this.updateLearningMaterialForm.controls.media_type.value;
      if (checkMedia == "book") {
        if (!this.validFileType(element1[0].type, this.fileTypeBook)) {
          this.check_file_type = true;
          this.media = element1[0];
        } else {
          this.media = element1[0];
          this.file_size = Number(
            (parseInt(element1[0].size) / (1024 * 1024)).toFixed(0)
          );
        }
      } else if (checkMedia == "audio") {
        if (!this.validFileType(element1[0].type, this.fileTypeAudio)) {
          this.check_file_type = true;
          this.media = element1[0];
        } else {
          this.media = element1[0];
          this.file_size = Number(
            (parseInt(element1[0].size) / (1024 * 1024)).toFixed(0)
          );
        }
      } else {
        if (!this.validFileType(element1[0].type, this.fileTypeVideo)) {
          this.check_file_type = true;
          this.media = element1[0];
        } else {
          this.media = element1[0];
          this.file_size = Number(
            (parseInt(element1[0].size) / (1024 * 1024)).toFixed(0)
          );
        }
      }
      this.checkMediaDefault = true;
      let file = element1[0];
      this.title = file.name;
      this.checkImage1 = true;
    }
  }

  checkNumberDownload() {
    let checkNull =
      this.updateLearningMaterialForm.controls.number_of_download.value;
    let check = parseInt(
      this.updateLearningMaterialForm.controls.number_of_download.value
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
    let checkNull = this.updateLearningMaterialForm.controls.duration.value;
    let check = parseInt(
      this.updateLearningMaterialForm.controls.duration.value
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

  checkLoopForArray(arr1, category) {
    if (arr1 != undefined && arr1.length > 0) {
      for (var i = 0; i < arr1.length; i++) {
        if (arr1[i].id == category) {
          let temp = {
            id: arr1[i].id,
            name: arr1[i].name,
          };

          this.category_search = temp;
        }
      }
    }
  }

  zoomPicture(imgUrl) {
    this.image = this.sanitizer.bypassSecurityTrustResourceUrl(imgUrl);
  }

  closeZoom() {
    this.image = "";
  }

  get mainCategory() {
    return this.updateLearningMaterialForm.get("mainCategory");
  }

  get specificCategory() {
    return this.updateLearningMaterialForm.get("specificCategory");
  }

  async chooseCategory() {
    const modal = await this.modalController.create({
      component: ChooseCategoryComponent,
      showBackdrop: false,
      cssClass: "chooseCategoryModalCss",
      componentProps: {
        main: this.updateLearningMaterialForm.get("mainCategory").value,
        specific: this.updateLearningMaterialForm.get("specificCategory").value,
      },
    });
    await modal.present();
    modal.onDidDismiss().then((data) => {
      if (data.role == "submit") {
        this.updateLearningMaterialForm.patchValue({
          mainCategory: data.data?.mainCategory,
          specificCategory: data.data?.specificCategory,
        });
      }
    });
  }
}
