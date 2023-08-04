import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SubscriberService } from "src/app/services/subscriber.service";
import { LibraryService } from "src/app/services/library.service";
import { Observable, of } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { isNumber } from "util";
import { ToastController } from "@ionic/angular";
import { catchError } from "rxjs/operators";

@Component({
  selector: "app-subscriber-update",
  templateUrl: "./subscriber-update.page.html",
  styleUrls: ["./subscriber-update.page.scss"],
})
export class SubscriberUpdatePage implements OnInit {
  public library;
  public name = "";
  public short_name = "";
  public address = "";
  public phone = "";
  public email = "";
  public username = "";
  public max_device: any;
  public max_download: any;
  public max_duration: any;
  public img = new Image();
  public subscriber_id;
  public isActive = true;
  public isActiveArr = [
    { value: true, name: "Active" },
    { value: false, name: "Inactive" },
  ];
  public dataLibrary;
  public logo = [""];
  public password = "";
  public checkImage = false;
  public checkError = false;
  public isActiveToggleTextPassword: Boolean = true;
  public checkSubmit = false;
  public temp_logo;
  public check_user_type = false;
  public checkPhoneNumber = true;
  public checkDuration = true;
  public checkDevice = true;
  public checkDownload = true;
  public checkUserType = false;

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
  public title = "";
  updateSubscriberForm: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private subscriberService: SubscriberService,
    private libraryService: LibraryService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private toastController: ToastController
  ) {
    this.translate.use(localStorage.getItem("language"));
    this.check_user_type = false;
    if (localStorage.getItem("user_type") == "admin") {
      this.check_user_type = true;
      this.updateSubscriberForm = this.formBuilder.group({
        name: ["", [Validators.required, Validators.maxLength(50)]],
        short_name: ["", [Validators.required, Validators.maxLength(50)]],
        email: ["", [Validators.required, Validators.email]],
        username: ["", [Validators.required]],
        address: ["", []],
        phone: ["", []],
        // logo: ['', [Validators.required]],
        password: ["", [Validators.minLength(6)]],
        isActive: ["", [Validators.required]],
        library: ["", [Validators.required]],
        max_device: [2, [Validators.required]],
        max_download: [5, [Validators.required]],
        max_duration: [7, [Validators.required]],
      });
    } else {
      this.updateSubscriberForm = this.formBuilder.group({
        name: ["", [Validators.required, Validators.maxLength(50)]],
        short_name: ["", [Validators.required, Validators.maxLength(50)]],
        email: ["", [Validators.required, Validators.email]],
        username: ["", [Validators.required]],
        address: ["", []],
        phone: ["", []],
        // logo: ['', [Validators.required]],
        password: ["", [Validators.minLength(6)]],
        isActive: ["", [Validators.required]],
        // library: ['', [Validators.required]],
        max_device: [2, [Validators.required]],
        max_download: [5, [Validators.required]],
        max_duration: [7, [Validators.required]],
      });
    }
    this.checkUserType = false;
    if (localStorage.getItem("user_type") != "admin") {
      this.checkUserType = true;
    }
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.translate.use(localStorage.getItem("language"));
    this.checkUserType = false;
    if (localStorage.getItem("user_type") != "admin") {
      this.checkUserType = true;
    }
    this.subscriber_id = +this.activatedRoute.snapshot.paramMap.get("id");
    this.libraryService.listLibraries().subscribe((data) => {
      this.dataLibrary = data.results;
      this.subscriberService
        .getSubscriber(this.subscriber_id)
        .subscribe((data) => {
          console.log(data);
          this.name = data.name;
          this.short_name = data.short_name;
          this.address = data.address;
          this.phone = data.phone;
          this.email = data.email;
          this.username = data.username;
          this.isActive = data.is_active;
          this.library = data.library;
          this.img.src = data.logo;
          this.max_device = data.max_device;
          this.max_download = data.max_download;
          this.max_duration = data.max_borrow_duration;
          if (data.logo != null) {
            this.img.src = data.logo;
            this.checkImage = true;
            this.check_file_type = false;
          } else {
            this.img.src = "assets/img/no.png";
            this.checkImage = false;
          }
        });
    });
  }

  updateSubscriber() {
    this.checkSubmit = true;
    if (this.img.src == "") {
      this.checkImage = false;
    }
    if (
      this.updateSubscriberForm.valid &&
      !this.check_file_type &&
      this.checkPhoneNumber &&
      this.checkDevice &&
      this.checkDuration &&
      this.checkDownload
    ) {
      let formData = new FormData();
      formData.append(
        "username",
        this.updateSubscriberForm.controls.username.value
      );
      formData.append("email", this.updateSubscriberForm.controls.email.value);
      formData.append(
        "short_name",
        this.updateSubscriberForm.controls.short_name.value
      );
      formData.append(
        "address",
        this.updateSubscriberForm.controls.address.value
      );
      formData.append("name", this.updateSubscriberForm.controls.name.value);
      formData.append(
        "is_active",
        this.updateSubscriberForm.controls.isActive.value
      );
      formData.append(
        "max_device",
        this.updateSubscriberForm.controls.max_device.value
      );
      formData.append(
        "max_download",
        this.updateSubscriberForm.controls.max_download.value
      );
      formData.append(
        "max_borrow_duration",
        this.updateSubscriberForm.controls.max_duration.value
      );
      if (
        this.updateSubscriberForm.controls.password.value == "" ||
        this.updateSubscriberForm.controls.password.value == undefined
      ) {
      } else {
        formData.append(
          "password",
          this.updateSubscriberForm.controls.password.value
        );
      }
      formData.append("phone", this.updateSubscriberForm.controls.phone.value);
      // this.formData.append('birthday', null)
      if (!this.checkUserType) {
        formData.append(
          "library_id",
          this.updateSubscriberForm.controls.library.value
        );
      }

      if (this.temp_logo != undefined) {
        formData.append("logo", this.temp_logo, this.temp_logo.name);
      }

      this.subscriberService
        .updateSubscriber(this.subscriber_id, formData)
        .subscribe((data) => {
          if (data?.success) {
            this.updateSuccess();
            this.router.navigate(["/subscriber"]);
          } else {
            this.updateFail(data?.message);
          }
        });
    } else {
      this.checkError = true;
    }
  }

  async updateSuccess() {
    let title = "";
    this.translate
      .get("Subscriber.update_subscriber.update_success")
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

  async updateFail(error: string) {
    let title = "";
    this.translate
      .get("Subscriber.update_subscriber.update_fail")
      .subscribe((result: string) => {
        title = result;
      });
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

  checkMaxDevice() {
    let checkNull = this.updateSubscriberForm.controls.max_device.value;
    let check = parseInt(this.updateSubscriberForm.controls.max_device.value);
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
    let checkNull = this.updateSubscriberForm.controls.max_download.value;
    let check = parseInt(this.updateSubscriberForm.controls.max_download.value);
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
    let checkNull = this.updateSubscriberForm.controls.max_duration.value;
    let check = parseInt(this.updateSubscriberForm.controls.max_duration.value);
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
    let checkNull = this.updateSubscriberForm.controls.phone.value;
    let check = parseInt(this.updateSubscriberForm.controls.phone.value);
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
}
