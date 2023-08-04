import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { LibraryService } from "src/app/services/library.service";
import { Router } from "@angular/router";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import {
  AlertController,
  ModalController,
  NavController,
  ToastController,
} from "@ionic/angular";
import { async } from "rxjs/internal/scheduler/async";
import { TranslateService } from "@ngx-translate/core";
import { isNumber } from "util";
import { ModalViewFilePage } from "src/app/shared/modal/modal-view-file/modal-view-file.page";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-library-create",
  templateUrl: "./library-create.page.html",
  styleUrls: ["./library-create.page.scss"],
})
export class LibraryCreatePage implements OnInit {
  public isActiveArr = [
    { value: "True", name: "Active" },
    { value: "False", name: "Inactive" },
  ];
  public name = "";
  public short_name = "";
  public address = "";
  public phone = "";
  public maxSub = "";
  public email = "";
  public username = "";
  public isActive = "True";
  public password = "";
  public img = new Image();
  public checkImage = true;
  public checkError = false;
  public formData = new FormData();
  public logo = [""];
  public isActiveToggleTextPassword: Boolean = true;
  public temp_logo;
  public err = "";
  public checkNumber = true;
  public checkPhoneNumber = true;
  public fileTypes = ["image/jpeg", "image/png"];
  public check_file_type = false;
  public title = "";
  image: any;

  createLibraryForm: FormGroup = this.formBuilder.group({
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
    max_subscriber: ["", [Validators.required]],
  });

  constructor(
    private libraryService: LibraryService,
    private router: Router,
    private formBuilder: FormBuilder,
    public alertController: AlertController,
    private translate: TranslateService,
    private navCtrl: NavController,
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

  createLibrary() {
    if (this.img.src == "") {
      this.checkImage = false;
    }

    if (
      this.createLibraryForm.valid &&
      !this.check_file_type &&
      this.checkNumber &&
      this.checkPhoneNumber
    ) {
      let formData = new FormData();
      formData.append(
        "username",
        this.createLibraryForm.controls.username.value
      );
      formData.append("email", this.createLibraryForm.controls.email.value);
      formData.append(
        "short_name",
        this.createLibraryForm.controls.short_name.value
      );
      formData.append("address", this.createLibraryForm.controls.address.value);
      formData.append("name", this.createLibraryForm.controls.name.value);
      formData.append(
        "is_active",
        this.createLibraryForm.controls.isActive.value
      );
      formData.append(
        "password",
        this.createLibraryForm.controls.password.value
      );
      formData.append("phone", this.createLibraryForm.controls.phone.value);
      formData.append(
        "max_subscribers",
        this.createLibraryForm.controls.max_subscriber.value
      );

      if (this.temp_logo != undefined) {
        formData.append("logo", this.temp_logo, this.temp_logo.name);
      }

      this.libraryService
        .createLibrary(formData)
        .pipe(
          catchError((data) => {
            if (
              data.error.username != undefined &&
              data.error.email != undefined
            ) {
              if (localStorage.getItem("language") == "en") {
                this.err =
                  "Username " +
                  this.createLibraryForm.controls.username.value +
                  "  and email " +
                  this.createLibraryForm.controls.email.value +
                  " already exist.";
              } else {
                this.err =
                  "Nama pengguna " +
                  this.createLibraryForm.controls.username.value +
                  " dan e-mel " +
                  this.createLibraryForm.controls.email.value +
                  " sudah ada.";
              }
              this.checkErrorCreate();
            } else if (data.error.email != undefined) {
              if (localStorage.getItem("language") == "en") {
                this.err =
                  "Email " +
                  this.createLibraryForm.controls.email.value +
                  " already exists.";
              } else {
                this.err =
                  "e-mel " +
                  this.createLibraryForm.controls.email.value +
                  " asudah ada.";
              }
              this.checkErrorCreate();
            } else if (data.error.username != undefined) {
              if (localStorage.getItem("language") == "en") {
                this.err =
                  "Username " +
                  this.createLibraryForm.controls.username.value +
                  " already exists.";
              } else {
                this.err =
                  "Nama pengguna " +
                  this.createLibraryForm.controls.username.value +
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
            this.router.navigate(["/library"]);
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
      .get("Library.create_library.create_success")
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

  async createFalse(error: string) {
    const toast = await this.toastController.create({
      message: error,
      duration: 2000,
      position: "bottom",
      color: "danger",
      cssClass: "custom-toast",
    });
    toast.present();
  }

  onChange(element): void {
    this.check_file_type = false;
    let file = element[0];
    this.temp_logo = element[0];
    let fileReader: FileReader = new FileReader();
    if (!this.validFileType(element[0].type)) {
      this.check_file_type = true;
      this.title = element[0].name;
    } else {
      this.temp_logo = element[0];
    }
    this.img.src = URL.createObjectURL(file);
    this.img.title = file.name;
    fileReader.readAsDataURL(file);
    this.checkImage = true;
  }

  validFileType(file) {
    return this.fileTypes.includes(file);
  }

  checkNumberMaxSub() {
    let checkNull = this.createLibraryForm.controls.max_subscriber.value;
    let check = parseInt(this.createLibraryForm.controls.max_subscriber.value);
    if (check < 0) {
      this.checkNumber = false;
    } else if (
      (!isNumber(check) || isNaN(check) || check < 0 || !isNumber(checkNull)) &&
      checkNull != "" &&
      check != checkNull
    ) {
      this.checkNumber = false;
    } else {
      this.checkNumber = true;
    }
  }

  checkPhone() {
    let checkNull = this.createLibraryForm.controls.phone.value;
    let check = parseInt(this.createLibraryForm.controls.phone.value);
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
