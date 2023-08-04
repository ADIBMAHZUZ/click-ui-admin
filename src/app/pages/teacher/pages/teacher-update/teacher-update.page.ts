import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TeacherService } from "src/app/services/teacher.service";
import { LibraryService } from "src/app/services/library.service";
import { TranslateService } from "@ngx-translate/core";
import { isNumber } from "util";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-teacher-update",
  templateUrl: "./teacher-update.page.html",
  styleUrls: ["./teacher-update.page.scss"],
})
export class TeacherUpdatePage implements OnInit {
  public isActiveArr = [
    { value: true, name: "Active" },
    { value: false, name: "Inactive" },
  ];
  public library;
  public isActive = true;
  public name = "";
  public short_name = "";
  public address = "";
  public phone = "";
  public email = "";
  public username = "";
  public img = new Image();
  public checkImage = false;
  public checkError = false;
  public teacher_id;
  public logo = [""];
  public password = "";
  public dataLibrary;
  public isActiveToggleTextPassword: Boolean = true;
  public checkSubmit = false;
  public temp_logo;
  public checkPhoneNumber = true;
  public fileTypes = ["image/jpeg", "image/png"];
  public check_file_type = false;
  public title = "";

  updateTeacherForm: FormGroup;
  // = this.formBuilder.group({
  //   name: ['', [Validators.required, Validators.maxLength(50)]],
  //   short_name: ['', [Validators.required, Validators.maxLength(50)]],
  //   email: ['', [Validators.required, Validators.email]],
  //   username: ['', [Validators.required]],
  //   address: ['', []],
  //   phone: ['', []],
  //   // logo: ['', [Validators.required]],
  //   password: ['', [Validators.minLength(6)]],
  //   isActive: ['', [Validators.required]],
  //   library: ['', [Validators.required]],
  // });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private teacherService: TeacherService,
    private formBuilder: FormBuilder,
    private libraryService: LibraryService,
    private translate: TranslateService,
    private toastController: ToastController
  ) {
    this.translate.use(localStorage.getItem("language"));
    this.libraryService.listLibraries().subscribe((data) => {
      this.dataLibrary = data.results;
    });

    this.updateTeacherForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.maxLength(50)]],
      short_name: ["", [Validators.required, Validators.maxLength(50)]],
      email: ["", [Validators.required, Validators.email]],
      username: ["", [Validators.required]],
      address: ["", []],
      phone: ["", []],
      logo: ["", []],
      password: ["", [Validators.minLength(6)]],
      isActive: ["", [Validators.required]],
      storage: [3, [Validators.required, Validators.max(3)]],
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.translate.use(localStorage.getItem("language"));
    this.teacher_id = +this.activatedRoute.snapshot.paramMap.get("id");
    this.libraryService.listLibraries().subscribe((data) => {
      this.dataLibrary = data.results;
    });
    this.libraryService.listLibraries().subscribe((data) => {
      this.dataLibrary = data.results;
      this.teacherService.getTeacher(this.teacher_id).subscribe((data) => {
        this.name = data.name;
        this.short_name = data.short_name;
        this.address = data.address;
        this.phone = data.phone;
        this.email = data.email;
        this.username = data.username;
        this.isActive = data.is_active;
        this.library = data.library;
        this.updateTeacherForm.patchValue({
          storage: data?.storage,
        });
        if (data.logo != null) {
          this.img.src = data.logo;
          this.checkImage = true;
        } else {
          this.img.src = "assets/img/no.png";
          this.checkImage = false;
        }
      });
    });
  }

  updateTeacher() {
    this.checkSubmit = true;
    if (this.img.src == "") {
      this.checkImage = false;
    }
    if (
      this.updateTeacherForm.valid &&
      !this.check_file_type &&
      this.checkPhoneNumber
    ) {
      let formData = new FormData();
      formData.append(
        "username",
        this.updateTeacherForm.controls.username.value
      );
      formData.append("email", this.updateTeacherForm.controls.email.value);
      formData.append(
        "short_name",
        this.updateTeacherForm.controls.short_name.value
      );
      formData.append("address", this.updateTeacherForm.controls.address.value);
      formData.append("name", this.updateTeacherForm.controls.name.value);
      formData.append(
        "is_active",
        this.updateTeacherForm.controls.isActive.value
      );
      if (
        this.updateTeacherForm.controls.password.value == "" ||
        this.updateTeacherForm.controls.password.value == undefined
      ) {
      } else {
        formData.append(
          "password",
          this.updateTeacherForm.controls.password.value
        );
      }
      formData.append("phone", this.updateTeacherForm.controls.phone.value);
      formData.append("storage", this.updateTeacherForm.controls.storage.value);

      if (this.temp_logo != undefined) {
        formData.append("logo", this.temp_logo, this.temp_logo.name);
      }

      this.teacherService
        .updateTeacher(this.teacher_id, formData)
        .subscribe((data) => {
          this.updateSuccess();
          this.router.navigate(["/teacher"]);
        });
    } else {
      this.checkError = true;
    }
  }

  async updateSuccess() {
    let title = "";
    this.translate
      .get("Teacher.update_teacher.update_success")
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
    let checkNull = this.updateTeacherForm.controls.phone.value;
    let check = parseInt(this.updateTeacherForm.controls.phone.value);
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

  get storage() {
    return this.updateTeacherForm.get("storage");
  }
}
