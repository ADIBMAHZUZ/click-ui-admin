import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SubscriberService } from "src/app/services/subscriber.service";
import { TranslateService } from "@ngx-translate/core";
import { LibraryService } from "src/app/services/library.service";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { isNumber } from "util";
import { ToastController } from "@ionic/angular";
import { of } from "rxjs";
import { catchError } from "rxjs/operators";

@Component({
  selector: "app-subscriber-view",
  templateUrl: "./subscriber-view.page.html",
  styleUrls: ["./subscriber-view.page.scss"],
})
export class SubscriberViewPage implements OnInit {
  public library;
  public subscriber = "";
  public subscribershort = "";
  public address = "";
  public phone = "";
  public email = "";
  public username = "";
  public isActive = "";
  public subscriber_id;
  public logo = "";
  public dataLibrary;
  public max_devices = 2;
  public max_download;
  public max_duration;
  public checkDevice = true;
  public checkError = false;
  public checkUserType = false;
  updateMaxDeviceForm: FormGroup = this.formBuilder.group({
    max_device: ["", [Validators.required]],
  });
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private subscriberService: SubscriberService,
    private translate: TranslateService,
    private libraryService: LibraryService,
    private formBuilder: FormBuilder,
    private toastController: ToastController
  ) {
    this.translate.use(localStorage.getItem("language"));
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.translate.use(localStorage.getItem("language"));
    let temp_user = localStorage.getItem("user_type");
    if (temp_user == "admin") {
      this.checkUserType = true;
    }

    if (temp_user == "librarian") {
      this.checkUserType = false;
    }

    this.subscriber_id = +this.activatedRoute.snapshot.paramMap.get("id");
    this.subscriberService
      .getSubscriber(this.subscriber_id)
      .subscribe((data) => {
        this.subscriber = data.name;
        this.subscribershort = data.short_name;
        this.address = data.address;
        this.phone = data.phone;
        this.email = data.email;
        this.username = data.username;
        this.max_devices = data.max_device;
        this.max_download = data.max_download;
        this.max_duration = data.max_borrow_duration + " days";
        let temp = data.library;
        this.libraryService.listLibraries().subscribe((data) => {
          this.dataLibrary = data.results;
          this.dataLibrary.forEach((element) => {
            if (element.id == temp) {
              this.library = element.name;
            }
          });
        });
        if (data.is_active) {
          this.isActive = "Active";
        } else {
          this.isActive = "Inactive";
        }
        if (data.logo != null) {
          this.logo = data.logo;
        } else {
          this.logo = "";
        }
      });
  }

  updateMaxDevice() {
    if (this.updateMaxDeviceForm.valid && this.checkDevice) {
      this.checkError = false;
      let params = {
        max_device: this.updateMaxDeviceForm.controls.max_device.value,
      };
      this.subscriberService
        .updateMaxDevice(this.subscriber_id, params)
        .pipe(
          catchError((data) => {
            if (data.error) {
              this.updateFail();
            }
            return of();
          })
        )
        .subscribe((data) => {
          this.router.navigate(["/subscriber"]);
          this.updateSuccess();
        });
    } else {
      this.checkError = true;
    }
  }

  checkMaxDevice() {
    let checkNull = this.updateMaxDeviceForm.controls.max_device.value;
    let check = parseInt(this.updateMaxDeviceForm.controls.max_device.value);
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

  async updateSuccess() {
    let title = "";
    this.translate
      .get("Subscriber.update_subscriber.update_max_device_success")
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
      .get("Subscriber.update_subscriber.update_max_device_fail")
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
}
