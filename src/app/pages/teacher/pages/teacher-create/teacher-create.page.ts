import { Store } from "@ngxs/store";
import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { Router } from "@angular/router";
import { TeacherService } from "src/app/services/teacher.service";
import { LibraryService } from "src/app/services/library.service";
import { AlertController, ToastController } from "@ionic/angular";
import { of } from "rxjs";
import { catchError, max } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import { isNumber } from "util";
import { GetProfile } from "src/app/pages/auth/store/auth.action";

@Component({
  selector: "app-teacher-create",
  templateUrl: "./teacher-create.page.html",
  styleUrls: ["./teacher-create.page.scss"],
})
export class TeacherCreatePage implements OnInit {
  public img = new Image();
  public phone = "";
  public checkImage = true;
  public checkError = false;
  public isActive = true;
  public dataLibrary;
  public isActiveArr = [
    { value: true, name: "Active" },
    { value: false, name: "Inactive" },
  ];
  public isActiveToggleTextPassword: Boolean = true;
  public logo = [""];
  public password = "";
  public temp_logo;
  public err = "";
  public checkPhoneNumber = true;
  public fileTypes = ["image/jpeg", "image/png"];
  public check_file_type = false;
  public title = "";

  createTeacherForm: FormGroup;
  // = this.formBuilder.group({
  //   name: ['', [Validators.required, Validators.maxLength(50)]],
  //   short_name: ['', [Validators.required, Validators.maxLength(50)]],
  //   email: ['', [Validators.required, Validators.email]],
  //   username: ['', [Validators.required]],
  //   address: ['', []],
  //   phone: ['', []],
  //   logo: ['', []],
  //   password: ['', [Validators.required, Validators.minLength(6)]],
  //   isActive: ['', [Validators.required]],
  //   library: ['', [Validators.required]],
  // });

  constructor(
    private router: Router,
    private teacherService: TeacherService,
    private formBuilder: FormBuilder,
    private libraryService: LibraryService,
    public alertController: AlertController,
    private translate: TranslateService,
    private toastController: ToastController,
    private store: Store
  ) {
    this.translate.use(localStorage.getItem("language"));
    this.createTeacherForm = this.formBuilder.group({
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
      storage: [3, [Validators.required, Validators.max(3), Validators.min(0)]],
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.translate.use(localStorage.getItem("language"));
    this.libraryService.listLibraries().subscribe((data) => {
      this.dataLibrary = data.results;
    });
  }

  createTeacher() {
    if (this.img.src == "") {
      this.checkImage = false;
    }

    if (
      this.createTeacherForm.valid &&
      !this.check_file_type &&
      this.checkPhoneNumber
    ) {
      let formData = new FormData();
      formData.append(
        "username",
        this.createTeacherForm.controls.username.value
      );
      formData.append("email", this.createTeacherForm.controls.email.value);
      formData.append(
        "short_name",
        this.createTeacherForm.controls.short_name.value
      );
      formData.append("address", this.createTeacherForm.controls.address.value);
      formData.append("name", this.createTeacherForm.controls.name.value);
      formData.append(
        "is_active",
        this.createTeacherForm.controls.isActive.value
      );
      formData.append(
        "password",
        this.createTeacherForm.controls.password.value
      );
      formData.append("phone", this.createTeacherForm.controls.phone.value);
      formData.append("storage", this.createTeacherForm.controls.storage.value);

      if ((this, this.temp_logo != undefined)) {
        formData.append("logo", this.temp_logo, this.temp_logo.name);
      }
      this.teacherService
        .createTeacher(formData)
        .pipe(
          catchError((data) => {
            if (
              data.error.username != undefined &&
              data.error.email != undefined
            ) {
              if (localStorage.getItem("language") == "en") {
                this.err =
                  "Username " +
                  this.createTeacherForm.controls.username.value +
                  "  and email " +
                  this.createTeacherForm.controls.email.value +
                  " already exist.";
              } else {
                this.err =
                  "Nama pengguna " +
                  this.createTeacherForm.controls.username.value +
                  " dan e-mel " +
                  this.createTeacherForm.controls.email.value +
                  " sudah ada.";
              }
              this.checkErrorCreate();
            } else if (data.error.email != undefined) {
              if (localStorage.getItem("language") == "en") {
                this.err =
                  "Email " +
                  this.createTeacherForm.controls.email.value +
                  " already exists.";
              } else {
                this.err =
                  "e-mel " +
                  this.createTeacherForm.controls.email.value +
                  " asudah ada.";
              }
              this.checkErrorCreate();
            } else if (data.error.username != undefined) {
              if (localStorage.getItem("language") == "en") {
                this.err =
                  "Username " +
                  this.createTeacherForm.controls.username.value +
                  " already exists.";
              } else {
                this.err =
                  "Nama pengguna " +
                  this.createTeacherForm.controls.username.value +
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
            this.router.navigate(["/teacher"]);
            this.store.dispatch(new GetProfile());
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
      .get("Teacher.create_teacher.create_success")
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
    let checkNull = this.createTeacherForm.controls.phone.value;
    let check = parseInt(this.createTeacherForm.controls.phone.value);
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

  get storage() {
    return this.createTeacherForm.get("storage");
  }
}
