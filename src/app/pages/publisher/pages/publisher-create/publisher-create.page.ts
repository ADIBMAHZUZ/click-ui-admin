import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { Router } from "@angular/router";
import { PublisherService } from "src/app/services/publisher.service";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import {
  AlertController,
  ModalController,
  ToastController,
} from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { isNumber } from "util";
import { ModalViewFilePage } from "src/app/shared/modal/modal-view-file/modal-view-file.page";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-publisher-create",
  templateUrl: "./publisher-create.page.html",
  styleUrls: ["./publisher-create.page.scss"],
})
export class PublisherCreatePage implements OnInit {
  public isActiveArr = [
    { value: true, name: "Active" },
    { value: false, name: "Inactive" },
  ];
  public name = "";
  public short_name = "";
  public address = "";
  public phone = "";
  public email = "";
  public password = "";
  public username = "";
  public img = new Image();
  public checkImage = true;
  public checkError = false;
  public isActive = true;
  public logo = [""];
  public isActiveToggleTextPassword: Boolean = true;
  // public formData = new FormData()
  public temp_logo;
  public err = "";
  public checkPhoneNumber = true;
  public checkStorageNumber = true;
  public checkStorageIndex = true;
  public fileTypes = ["image/jpeg", "image/png"];
  public check_file_type = false;
  public title = "";
  public storage = "10";
  image: any;

  createPublisherForm: FormGroup = this.formBuilder.group({
    name: ["", [Validators.required, Validators.maxLength(50)]],
    short_name: ["", [Validators.required, Validators.maxLength(50)]],
    email: ["", [Validators.required, Validators.email]],
    username: [
      "",
      [
        Validators.required,
        Validators.pattern(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{0,}$"
        ),
      ],
    ],
    address: ["", []],
    phone: ["", []],
    logo: ["", []],
    password: ["", [Validators.required, Validators.minLength(6)]],
    isActive: ["", [Validators.required]],
    storage: ["", [Validators.required]],
  });

  constructor(
    private router: Router,
    private publisherService: PublisherService,
    private formBuilder: FormBuilder,
    public alertController: AlertController,
    private translate: TranslateService,
    private toastController: ToastController,
    private modalController: ModalController,
    private sanitizer: DomSanitizer
  ) {
    this.translate.use(localStorage.getItem("language"));
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.translate.use(localStorage.getItem("language"));
  }

  createPublisher() {
    if (this.img.src == "") {
      this.checkImage = false;
    }
    if (
      this.createPublisherForm.valid &&
      !this.check_file_type &&
      this.checkPhoneNumber &&
      this.checkStorageIndex &&
      this.checkStorageNumber
    ) {
      let formData = new FormData();
      formData.append(
        "username",
        this.createPublisherForm.controls.username.value
      );
      formData.append("email", this.createPublisherForm.controls.email.value);
      formData.append(
        "short_name",
        this.createPublisherForm.controls.short_name.value
      );
      formData.append(
        "address",
        this.createPublisherForm.controls.address.value
      );
      formData.append("name", this.createPublisherForm.controls.name.value);
      formData.append(
        "is_active",
        this.createPublisherForm.controls.isActive.value
      );
      formData.append(
        "password",
        this.createPublisherForm.controls.password.value
      );
      formData.append("phone", this.createPublisherForm.controls.phone.value);
      formData.append(
        "storage",
        this.createPublisherForm.controls.storage.value
      );
      // formData.append('storage', this.storage.toString())
      if (this.temp_logo != undefined) {
        formData.append("logo", this.temp_logo, this.temp_logo.name);
      }

      this.publisherService
        .createPublisher(formData)
        .pipe(
          catchError((data) => {
            if (
              data.error.username != undefined &&
              data.error.email != undefined
            ) {
              if (localStorage.getItem("language") == "en") {
                this.err =
                  "Username " +
                  this.createPublisherForm.controls.username.value +
                  "  and email " +
                  this.createPublisherForm.controls.email.value +
                  " already exist.";
              } else {
                this.err =
                  "Nama pengguna " +
                  this.createPublisherForm.controls.username.value +
                  " dan e-mel " +
                  this.createPublisherForm.controls.email.value +
                  " sudah ada.";
              }
              this.checkErrorCreate();
            } else if (data.error.email != undefined) {
              if (localStorage.getItem("language") == "en") {
                this.err =
                  "Email " +
                  this.createPublisherForm.controls.email.value +
                  " already exists.";
              } else {
                this.err =
                  "e-mel " +
                  this.createPublisherForm.controls.email.value +
                  " asudah ada.";
              }
              this.checkErrorCreate();
            } else if (data.error.username != undefined) {
              if (localStorage.getItem("language") == "en") {
                this.err =
                  "Username " +
                  this.createPublisherForm.controls.username.value +
                  " already exists.";
              } else {
                this.err =
                  "Nama pengguna " +
                  this.createPublisherForm.controls.username.value +
                  " asudah ada.";
              }
              this.checkErrorCreate();
            }
            return of();
          })
        )
        .subscribe((data) => {
          if (data?.success) {
            this.createSuccess();
            this.router.navigate(["/publisher"]);
          } else {
            this.createFalse(data?.message);
          }
        });
    } else {
      this.checkError = true;
    }
  }

  async createSuccess() {
    let title = "";
    this.translate
      .get("Publisher.create_publisher.create_success")
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
  async createFalse(error) {
    const toast = await this.toastController.create({
      message: error,
      duration: 2000,
      position: "bottom",
      color: "danger",
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
    let checkNull = this.createPublisherForm.controls.phone.value;
    let check = parseInt(this.createPublisherForm.controls.phone.value);
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
    let checkNull = this.createPublisherForm.controls.storage.value;
    let check = parseFloat(this.createPublisherForm.controls.storage.value);

    if (check <= 0 || check > 1024) {
      this.checkStorageNumber = false;
      this.checkStorageIndex = true;
    } else if (
      (!isNumber(check) || isNaN(check) || check < 0 || !isNumber(checkNull)) &&
      checkNull != "" &&
      check != checkNull
    ) {
      this.checkStorageNumber = false;
      this.checkStorageIndex = true;
    } else {
      this.checkStorageNumber = true;
    }
    if (this.checkStorageNumber) {
      let str = this.createPublisherForm.controls.storage.value.toString();
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

  async checkErrorCreate() {
    const alert = await this.alertController.create({
      header: "",
      cssClass: "my-custom-alert",
      message: this.err,
      buttons: [
        {
          text: "Ok",
          handler: () => {},
        },
      ],
    });
    await alert.present();
  }

  zoomPicture(imgUrl) {
    this.image = this.sanitizer.bypassSecurityTrustResourceUrl(imgUrl);
  }

  closeZoom() {
    this.image = "";
  }
}
