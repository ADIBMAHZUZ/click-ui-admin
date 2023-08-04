import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { LibraryService } from "src/app/services/library.service";
import { Observable, of } from "rxjs";
import { SubscriberService } from "src/app/services/subscriber.service";
import { Router } from "@angular/router";
import { catchError } from "rxjs/operators";
import { AlertController, ToastController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { isNumber } from "util";

@Component({
  selector: "app-subscriber-create",
  templateUrl: "./subscriber-create.page.html",
  styleUrls: ["./subscriber-create.page.scss"],
})
export class SubscriberCreatePage implements OnInit {
  public library;
  public name = "";
  public short_name = "";
  public address = "";
  public phone = "";
  public email = "";
  public username = "";
  public img = new Image();
  public isActive = true;
  public libraries$;
  public check_user_type = false;
  public title = "";
  public checkPhoneNumber = true;
  public isActiveArr = [
    { value: true, name: "Active" },
    { value: false, name: "Inactive" },
  ];
  public checkDuration = true;
  public checkDevice = true;
  public checkDownload = true;

  public duration = 7;
  public maxDevice = 2;
  public maxDownload = 5;

  public arr_max_duration = [
    { value: 7, name: "7 days" },
    { value: 14, name: "14 days" },
    { value: 21, name: "21 days" },
    { value: 28, name: "28 days" },
  ];

  public arr_max_download = [
    { value: 5, name: "5" },
    { value: 10, name: "10" },
    { value: 15, name: "15" },
  ];

  public fileTypes = ["image/jpeg", "image/png"];
  public check_file_type = false;
  public password = "";
  public logo = [""];
  public isActiveToggleTextPassword: Boolean = true;
  public checkImage = true;
  public checkError = false;
  public temp_logo;
  public err = "";

  createSubscriberForm: FormGroup;

  constructor(
    private libraryService: LibraryService,
    private subscriberService: SubscriberService,
    private router: Router,
    private formBuilder: FormBuilder,
    public alertController: AlertController,
    private translate: TranslateService,
    private toastController: ToastController
  ) {
    this.translate.use(localStorage.getItem("language"));
    this.check_user_type = false;
    this.createSubscriberForm = this.formBuilder.group({
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
      // logo: ['', [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      isActive: ["", [Validators.required]],
      // library: ['', [Validators.required]]
      max_device: [2, []],
      max_download: [5, [Validators.required]],
      max_duration: [7, [Validators.required]],
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.translate.use(localStorage.getItem("language"));
    this.libraries$ = this.libraryService.listLibraries();
    this.check_user_type = false;
    if (localStorage.getItem("user_type") == "admin") {
      this.check_user_type = true;
    }
    this.maxDownload = this.arr_max_download[0].value;
  }

  createSubscriber() {
    if (this.img.src == "") {
      this.checkImage = false;
    }

    if (
      this.createSubscriberForm.valid &&
      !this.check_file_type &&
      this.checkPhoneNumber &&
      this.checkDevice &&
      this.checkDuration &&
      this.checkDownload
    ) {
      let formData = new FormData();
      formData.append(
        "username",
        this.createSubscriberForm.controls.username.value
      );
      formData.append("email", this.createSubscriberForm.controls.email.value);
      formData.append(
        "short_name",
        this.createSubscriberForm.controls.short_name.value
      );
      formData.append(
        "address",
        this.createSubscriberForm.controls.address.value
      );
      formData.append("name", this.createSubscriberForm.controls.name.value);
      formData.append(
        "is_active",
        this.createSubscriberForm.controls.isActive.value
      );
      formData.append(
        "password",
        this.createSubscriberForm.controls.password.value
      );
      formData.append("phone", this.createSubscriberForm.controls.phone.value);
      formData.append(
        "max_device",
        this.createSubscriberForm.controls.max_device.value
      );
      formData.append(
        "max_download",
        this.createSubscriberForm.controls.max_download.value
      );
      formData.append(
        "max_borrow_duration",
        this.createSubscriberForm.controls.max_duration.value
      );
      if (this.check_user_type) {
        formData.append(
          "library_id",
          this.createSubscriberForm.controls.library.value
        );
      }
      if (this.temp_logo != undefined) {
        formData.append("logo", this.temp_logo, this.temp_logo.name);
      }
      this.subscriberService
        .createSubscriber(formData)
        .pipe(
          catchError((data) => {
            if (!data.error.success) {
              if (localStorage.getItem("language") == "en") {
                this.err = data.error.error;
              } else {
                this.err = data.error.error;
              }
              this.checkErrorCreate();
            }
            if (
              data.error.username != undefined &&
              data.error.email != undefined
            ) {
              if (localStorage.getItem("language") == "en") {
                this.err =
                  "Username " +
                  this.createSubscriberForm.controls.username.value +
                  "  and email " +
                  this.createSubscriberForm.controls.email.value +
                  " already exist.";
              } else {
                this.err =
                  "Nama pengguna " +
                  this.createSubscriberForm.controls.username.value +
                  " dan e-mel " +
                  this.createSubscriberForm.controls.email.value +
                  " sudah ada.";
              }
              this.checkErrorCreate();
            } else if (data.error.email != undefined) {
              if (localStorage.getItem("language") == "en") {
                this.err =
                  "Email " +
                  this.createSubscriberForm.controls.email.value +
                  " already exists.";
              } else {
                this.err =
                  "e-mel " +
                  this.createSubscriberForm.controls.email.value +
                  " asudah ada.";
              }
              this.checkErrorCreate();
            } else if (data.error.username != undefined) {
              if (localStorage.getItem("language") == "en") {
                this.err =
                  "Username " +
                  this.createSubscriberForm.controls.username.value +
                  " already exists.";
              } else {
                this.err =
                  "Nama pengguna " +
                  this.createSubscriberForm.controls.username.value +
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
            this.router.navigate(["/subscriber"]);
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
      .get("Subscriber.create_subscriber.create_success")
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

  checkMaxDevice() {
    let checkNull = this.createSubscriberForm.controls.max_device.value;
    let check = parseInt(this.createSubscriberForm.controls.max_device.value);
    if (check < 0) {
      this.checkDevice = false;
    } else if (
      (!isNumber(check) || isNaN(check) || check < 0 || !isNumber(checkNull)) &&
      checkNull != "" &&
      check != checkNull
    ) {
      this.checkDevice = false;
    } else {
      this.checkDevice = true;
    }
  }

  checkMaxDownload() {
    let checkNull = this.createSubscriberForm.controls.max_download.value;
    let check = parseInt(this.createSubscriberForm.controls.max_download.value);
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
    let checkNull = this.createSubscriberForm.controls.max_duration.value;
    let check = parseInt(this.createSubscriberForm.controls.max_duration.value);
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

  checkPhone() {
    let checkNull = this.createSubscriberForm.controls.phone.value;
    let check = parseInt(this.createSubscriberForm.controls.phone.value);
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

  validFileType(file) {
    return this.fileTypes.includes(file);
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
}
