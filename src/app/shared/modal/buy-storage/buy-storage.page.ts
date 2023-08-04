import { Component, OnInit } from "@angular/core";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import { GlobalMenuService } from "src/app/services/global-menu.service";
import { PublisherService } from "src/app/services/publisher.service";
import { TranslateService } from "@ngx-translate/core";
import { ToastController, ModalController } from "@ionic/angular";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { isNumber } from "util";

@Component({
  selector: "app-buy-storage",
  templateUrl: "./buy-storage.page.html",
  styleUrls: ["./buy-storage.page.scss"],
})
export class BuyStoragePage implements OnInit {
  public storage = 1;
  public checkStorageNumber = true;
  public checkStorageIndex = true;
  public checkError = false;

  public arr_storage = [
    { value: 1, name: "1 GB" },
    { value: 2, name: "2 GB" },
    { value: 3, name: "3 GB" },
    { value: 4, name: "4 GB" },
    { value: 5, name: "5 GB" },
    { value: 6, name: "6 GB" },
    { value: 7, name: "7 GB" },
    { value: 8, name: "8 GB" },
    { value: 9, name: "9 GB" },
    { value: 10, name: "10 GB" },
  ];

  requestStorageForm: FormGroup = this.formBuilder.group({
    storage: ["", [Validators.required]],
  });
  constructor(
    private globalFooService: GlobalMenuService,
    private publisherService: PublisherService,
    private translate: TranslateService,
    private toastController: ToastController,
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder
  ) {
    this.translate.use(localStorage.getItem("language"));
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.translate.use(localStorage.getItem("language"));
  }

  changeStorage(item) {
    console.log(item);
  }

  checkStorage() {
    let checkNull = this.requestStorageForm.controls.storage.value;
    let check = parseFloat(this.requestStorageForm.controls.storage.value);
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
      let str = this.requestStorageForm.controls.storage.value.toString();
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

  requestBuyStorage() {
    if (
      this.requestStorageForm.valid &&
      this.checkStorageNumber &&
      this.checkStorageIndex
    ) {
      // this.globalFooService.publishSomeData({change: "storage"})
      let params = {
        data: Number(this.requestStorageForm.controls.storage.value),
      };
      this.publisherService.buyStoragePublisher(params).subscribe((data) => {
        this.globalFooService.publishSomeData({ change: "storage" });
        if (data?.success) {
          this.requestSuccess();
          this.closeModal();
        } else {
          this.requestFail(data?.error);
        }
      });
    } else {
      this.checkError = true;
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  async requestSuccess() {
    let title = "";
    this.translate.get("Publisher.notify_buy").subscribe((result: string) => {
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

  async requestFail(error: string) {
    let title = "";
    this.translate
      .get("Publisher.notify_buy_fail")
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
}
