import { Image } from "./../../../media/shared/model/model";
import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PublisherService } from "src/app/services/publisher.service";
import { TranslateService } from "@ngx-translate/core";
import { isNumber } from "util";
import { ModalController, ToastController } from "@ionic/angular";
import { parse } from "path";
import { ModalViewFilePage } from "src/app/shared/modal/modal-view-file/modal-view-file.page";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-publisher-update",
  templateUrl: "./publisher-update.page.html",
  styleUrls: ["./publisher-update.page.scss"],
})
export class PublisherUpdatePage implements OnInit {
  public isActiveArr = [
    { value: true, name: "Active" },
    { value: false, name: "Inactive" },
  ];
  public name = "";
  public short_name = "";
  public address = "";
  public phone = "";
  public email = "";
  public username = "";
  public storage;
  public currentStorage;
  public img = new Image();
  public checkImage = false;
  public checkError = false;
  public publisher_id;
  public isActive = true;
  public logo = [""];
  public password = "";
  public isActiveToggleTextPassword: Boolean = true;
  public checkSubmit = false;
  public temp_logo;
  public checkPhoneNumber = true;
  public fileTypes = ["image/jpeg", "image/png"];
  public check_file_type = false;
  public title = "";
  public checkStorageNumber = true;
  public checkStorageIndex = true;
  public checkCurrentStorage = true;
  image: any;

  updatePublisherForm: FormGroup = this.formBuilder.group({
    name: ["", [Validators.required, Validators.maxLength(50)]],
    short_name: ["", [Validators.required, Validators.maxLength(50)]],
    email: ["", [Validators.required, Validators.email]],
    username: ["", [Validators.required]],
    address: ["", []],
    phone: ["", []],
    // logo: ['', [Validators.required]],
    password: ["", [Validators.minLength(6)]],
    isActive: ["", [Validators.required]],
    storage: ["", [Validators.required]],
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private publisherService: PublisherService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private modalController: ModalController,
    private toastController: ToastController,
    private sanitizer: DomSanitizer
  ) {
    this.translate.use(localStorage.getItem("language"));
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.translate.use(localStorage.getItem("language"));
    this.publisher_id = +this.activatedRoute.snapshot.paramMap.get("id");
    this.publisherService.getPublisher(this.publisher_id).subscribe((data) => {
      this.name = data.name;
      this.short_name = data.short_name;
      this.address = data.address;
      this.phone = data.phone;
      this.username = data.username;
      this.email = data.email;
      this.isActive = data.is_active;
      this.storage = data.storage;
      this.currentStorage = data.current_storage;
      if (data.logo != null) {
        this.img.src = data.logo;
        this.checkImage = true;
      } else {
        this.img.src = "assets/img/no.png";
        this.checkImage = false;
      }
    });
  }

  updatePublisher() {
    this.checkSubmit = true;
    if (this.img.src == "") {
      this.checkImage = false;
    }
    if (
      this.updatePublisherForm.valid &&
      !this.check_file_type &&
      this.checkPhoneNumber &&
      this.checkStorageIndex &&
      this.checkCurrentStorage &&
      this.checkStorageNumber
    ) {
      let formData = new FormData();
      formData.append(
        "username",
        this.updatePublisherForm.controls.username.value
      );
      formData.append("email", this.updatePublisherForm.controls.email.value);
      formData.append(
        "short_name",
        this.updatePublisherForm.controls.short_name.value
      );
      formData.append(
        "address",
        this.updatePublisherForm.controls.address.value
      );
      formData.append("name", this.updatePublisherForm.controls.name.value);
      formData.append(
        "is_active",
        this.updatePublisherForm.controls.isActive.value
      );
      formData.append(
        "storage",
        this.updatePublisherForm.controls.storage.value
      );
      if (
        this.updatePublisherForm.controls.password.value == "" ||
        this.updatePublisherForm.controls.password.value == undefined
      ) {
      } else {
        formData.append(
          "password",
          this.updatePublisherForm.controls.password.value
        );
      }
      formData.append("phone", this.updatePublisherForm.controls.phone.value);
      if (this.temp_logo != undefined) {
        formData.append("logo", this.temp_logo, this.temp_logo.name);
      }

      this.publisherService
        .updatePublisher(this.publisher_id, formData)
        .subscribe((data) => {
          this.updateSuccess();
          this.router.navigate(["/publisher"]);
        });
    } else {
      this.checkError = true;
    }
  }

  async updateSuccess() {
    let title = "";
    this.translate
      .get("Publisher.update_publisher.update_success")
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

  onChange(fileList: FileList): void {
    this.check_file_type = false;
    let file = fileList[0];
    this.temp_logo = fileList[0];
    let fileReader: FileReader = new FileReader();
    if (!this.validFileType(fileList[0].type)) {
      this.check_file_type = true;
      this.title = fileList[0].name;
    } else {
      this.temp_logo = fileList[0];
    }
    this.img.src = URL.createObjectURL(file);
    this.img.title = file.name;
    fileReader.readAsDataURL(file);
    this.checkImage = true;
  }

  validFileType(file) {
    return this.fileTypes.includes(file);
  }

  checkPhone() {
    let checkNull = this.updatePublisherForm.controls.phone.value;
    let check = parseInt(this.updatePublisherForm.controls.phone.value);
    if (check < 0) {
      this.checkPhoneNumber = false;
    } else if (
      (!isNumber(check) || isNaN(check) || check < 0 || !isNumber(checkNull)) &&
      checkNull != "" &&
      check != checkNull
    ) {
      this.checkPhoneNumber = false;
    } else {
      this.checkPhoneNumber = true;
    }
  }

  checkStorage() {
    let checkNull = this.updatePublisherForm.controls.storage.value;
    let check = parseFloat(this.updatePublisherForm.controls.storage.value);
    if (this.currentStorage > check) {
      this.checkStorageIndex = true;
      this.checkStorageNumber = true;
      this.checkCurrentStorage = false;
    } else {
      this.checkCurrentStorage = true;
      if (check <= 0 || check > 1024) {
        this.checkStorageNumber = false;
        this.checkStorageIndex = true;
      } else if (
        (!isNumber(check) ||
          isNaN(check) ||
          check < 0 ||
          !isNumber(checkNull)) &&
        checkNull != "" &&
        check != checkNull
      ) {
        this.checkStorageNumber = false;
        this.checkStorageIndex = true;
      } else {
        this.checkStorageNumber = true;
      }
      if (this.checkStorageNumber) {
        let str = this.updatePublisherForm.controls.storage.value.toString();
        let index = str.indexOf(".");
        if (index != -1) {
          if (str.length - 1 - index > 1 || str.length - 1 - index == 0) {
            this.checkStorageIndex = false;
          } else {
            this.checkStorageIndex = true;
          }
        }
      }
    }
  }

  public toggleTextPassword() {
    this.isActiveToggleTextPassword =
      this.isActiveToggleTextPassword == true ? false : true;
  }
  public getType() {
    return this.isActiveToggleTextPassword ? "password" : "text";
  }

  public getName() {
    return this.isActiveToggleTextPassword ? "eye-off" : "eye";
  }

  zoomPicture(imgUrl) {
    this.image = this.sanitizer.bypassSecurityTrustResourceUrl(imgUrl);
  }

  closeZoom() {
    this.image = "";
  }
}
