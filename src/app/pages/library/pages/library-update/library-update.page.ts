import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LibraryService } from "src/app/services/library.service";
import { TranslateService } from "@ngx-translate/core";
import { isNumber } from "util";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import {
  AlertController,
  ModalController,
  NavController,
  ToastController,
} from "@ionic/angular";
import { ModalViewFilePage } from "src/app/shared/modal/modal-view-file/modal-view-file.page";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-library-update",
  templateUrl: "./library-update.page.html",
  styleUrls: ["./library-update.page.scss"],
})
export class LibraryUpdatePage implements OnInit {
  public isActiveArr = [
    { value: true, name: "Active" },
    { value: false, name: "Inactive" },
  ];
  public err = "";
  public name = "";
  public short_name = "";
  public address = "";
  public phone = "";
  public email = "";
  public max_subscriber;
  public username = "";
  public isActive = true;
  public img = new Image();
  public checkImage = false;
  public checkError = false;
  public library_id;
  public password = "";
  public formData = new FormData();
  public logo = [""];
  public checkNull = true;
  public isActiveToggleTextPassword: Boolean = true;
  public checkSubmit = false;
  public temp_logo;
  public checkNumber = true;
  public checkPhoneNumber = true;
  public fileTypes = ["image/jpeg", "image/png"];
  public check_file_type = false;
  public title = "";
  image: any;

  updateLibraryForm: FormGroup = this.formBuilder.group({
    name: ["", [Validators.required, Validators.maxLength(50)]],
    short_name: ["", [Validators.required, Validators.maxLength(50)]],
    email: ["", [Validators.required, Validators.email]],
    username: ["", [Validators.required]],
    address: ["", []],
    phone: ["", []],
    // logo: ['', [Validators.required]],
    password: ["", [Validators.minLength(6)]],
    isActive: ["", [Validators.required]],
    max_subscriber: ["", [Validators.required]],
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private libraryService: LibraryService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    public alertController: AlertController,
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
    this.library_id = +this.activatedRoute.snapshot.paramMap.get("id");
    this.libraryService.getLibrary(this.library_id).subscribe((data) => {
      this.name = data.name;
      this.short_name = data.short_name;
      this.address = data.address;
      this.phone = data.phone;

      this.username = data.username;
      this.email = data.email;
      this.isActive = data.is_active;
      this.password = data.password;
      this.max_subscriber = data.max_subscribers;
      if (data.logo != null) {
        this.img.src = data.logo;
        this.checkImage = true;
        this.check_file_type = false;
      } else {
        this.img.src = "assets/img/no.png";
        this.checkImage = false;
      }
    });
  }

  updateLibrary() {
    this.checkSubmit = true;
    if (this.img.src == "") {
      this.checkImage = false;
    }
    if (
      this.updateLibraryForm.valid &&
      !this.check_file_type &&
      this.checkNumber &&
      this.checkPhoneNumber
    ) {
      let formData = new FormData();
      formData.append(
        "username",
        this.updateLibraryForm.controls.username.value
      );
      formData.append("email", this.updateLibraryForm.controls.email.value);
      formData.append(
        "short_name",
        this.updateLibraryForm.controls.short_name.value
      );
      formData.append("address", this.updateLibraryForm.controls.address.value);
      formData.append("name", this.updateLibraryForm.controls.name.value);
      formData.append(
        "is_active",
        this.updateLibraryForm.controls.isActive.value
      );
      formData.append(
        "max_subscribers",
        this.updateLibraryForm.controls.max_subscriber.value
      );
      if (
        this.updateLibraryForm.controls.password.value == "" ||
        this.updateLibraryForm.controls.password.value == undefined
      ) {
      } else {
        formData.append(
          "password",
          this.updateLibraryForm.controls.password.value
        );
      }
      formData.append("phone", this.updateLibraryForm.controls.phone.value);
      if (this.temp_logo != undefined) {
        formData.append("logo", this.temp_logo, this.temp_logo.name);
      }

      this.libraryService
        .updateLibrary(this.library_id, formData)
        .pipe(
          catchError((data) => {
            if (!data.error.success) {
              console.log(data.error);
              if (localStorage.getItem("language") == "en") {
                this.err = data.error.error;
              } else {
                this.err = data.error.error;
              }
              this.checkErrorUpdate();
            }

            return of();
          })
        )
        .subscribe((data) => {
          this.updateSuccess();
          this.router.navigate(["/library"]);
        });
    } else {
      this.checkError = true;
    }
  }

  async updateSuccess() {
    let title = "";
    this.translate
      .get("Library.update_library.update_success")
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

  async checkErrorUpdate() {
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

  checkNumberMaxSub() {
    let checkNull = this.updateLibraryForm.controls.max_subscriber.value;
    let check = parseInt(this.updateLibraryForm.controls.max_subscriber.value);
    if (checkNull != undefined) {
      if (check < 0) {
        this.checkNumber = false;
      } else if (
        (!isNumber(check) ||
          isNaN(check) ||
          check < 0 ||
          !isNumber(checkNull)) &&
        checkNull != "" &&
        check != checkNull
      ) {
        this.checkNumber = false;
      } else {
        this.checkNumber = true;
      }
    } else {
      this.checkNumber = true;
    }
  }

  checkPhone() {
    let checkNull = this.updateLibraryForm.controls.phone.value;
    let check = parseInt(this.updateLibraryForm.controls.phone.value);
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
