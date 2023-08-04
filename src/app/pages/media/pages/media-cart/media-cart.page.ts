import { Component, OnInit, ɵɵsetComponentScope } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { Router, RouteConfigLoadEnd, ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ThemeService } from "ng2-charts";
import { MediaService } from "src/app/services/media.service";
import { threadId } from "worker_threads";
import { GlobalMenuService } from "src/app/services/global-menu.service";
import { id } from "@swimlane/ngx-datatable";
import { Location } from "@angular/common";
import { MediaCart } from "../../shared/model/model";

@Component({
  selector: "app-media-cart",
  templateUrl: "./media-cart.page.html",
  styleUrls: ["./media-cart.page.scss"],
})
export class MediaCartPage implements OnInit {
  public rowCountPage;
  public currentPageLimit: number = 10;
  public currentVisible: number = 3;
  public columns: any;
  public data: MediaCart[] = [];
  public notify_delete = "";
  public checkSubmit = false;
  public rental_period = ["12", "24", "36", "48"];
  id: string;

  constructor(
    public alertController: AlertController,
    private router: Router,
    private translate: TranslateService,
    private globalFooService: GlobalMenuService,
    private mediaService: MediaService,
    private location: Location,
    private route: ActivatedRoute,
    private toastController: ToastController
  ) {
    this.columns = [
      { prop: "id", name: "ID" },
      { prop: "title", name: "Title" },
      { prop: "price", name: "Author" },
      { prop: "quantity", name: "Quantity" },
      { prop: "publisher_name", name: "Author" },
      { prop: "rental_period", name: "Rental Period" },
      // {prop: 'phone', name: 'Phone'},
    ];
    this.translate.use(localStorage.getItem("language"));
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id) {
      this.mediaService.getMediaDetail(this.id).subscribe((data) => {
        this.data = [
          {
            id: data?.id,
            name: data?.media?.name,
            rental_period: data?.rental_period,
            publisher_name: data?.media?.publisher_name,
            count: data?.quantity,
            price: data?.media?.price,
          },
        ];
      });
    } else {
      this.loadData();
      this.translate.use(localStorage.getItem("language"));
      if (localStorage.getItem("language") == "en") {
        this.notify_delete = "Are you sure you want to delete?";
      } else {
        this.notify_delete = "Adakah anda pasti ingin memadam?";
      }
    }
  }

  loadData() {
    this.data = [];
    this.checkSubmit = false;
    if (localStorage.getItem("data") != null) {
      this.data = JSON.parse(localStorage.getItem("data"));
    }

    if (localStorage.getItem("add_to_cart") != undefined) {
      let temp = JSON.parse(localStorage.getItem("add_to_cart"));
      let temp_id = JSON.parse(localStorage.getItem("data_id"));

      if (temp.length == 0) {
        this.checkSubmit = true;
        localStorage.removeItem("data");
        localStorage.removeItem("data_id");
        localStorage.removeItem("add_to_cart");
      }
      this.rowCountPage = temp.length;
      let check = false;
      let arr_temp = [];

      temp.forEach((item, index) => {
        let check = true;
        if (localStorage.getItem("data") != null) {
          let temp_data = JSON.parse(localStorage.getItem("data"));
          for (var i = 0; i < temp_data.length; i++) {
            if (item.id == temp_data[i].id) {
              check = false;
            }
          }
          if (check) {
            let temp_add = {
              id: item.id,
              name: item.name,
              count: 1,
              rental_period: "12",
              publisher_name: item.publisher_name,
              price: item.price > 0 ? item?.price : "0",
            };
            this.data.push(temp_add);
          }
        } else {
          let temp_add = {
            id: item.id,
            name: item.name,
            count: 1,
            rental_period: "12",
            publisher_name: item.publisher_name,
            price: item.price > 0 ? item?.price : "0",
          };
          this.data.push(temp_add);
        }
      });

      this.rowCountPage = temp.length;
    } else {
      this.checkSubmit = true;
      localStorage.removeItem("data");
      localStorage.removeItem("data_id");
      localStorage.removeItem("add_to_cart");
    }
  }

  checkLoop(id, arr) {
    for (var i = 0; i < arr.length; i++) {
      if (id == arr[i]) {
        return false;
      }
    }
    return true;
  }

  onSubmit() {
    let formData = new FormData();
    if (this.id) {
      formData.append("library_media", this.id);
      formData.append("rental_period", this.data[0].rental_period);
      formData.append("quantity", this.data[0].count.toString());

      this.mediaService.addToCart(formData).subscribe((data) => {
        if (data?.success) {
          this.renewSuccess();
          this.router.navigate(["/media/new"]);
        } else {
          this.renewFailed();
        }
      });
    } else {
      let temp_id = [];
      let temp_count = [];
      let temp_rental = [];
      if (this.data.length > 0) {
        let checkSubmit = true;

        for (const item of this.data) {
          if (item.count <= 0) {
            temp_id = [];
            temp_count = [];
            temp_rental = [];
            checkSubmit = false;
            break;
          }
          temp_id.push(item?.id);
          temp_count.push(item?.count);
          temp_rental.push(item?.rental_period);
        }

        if (checkSubmit) {
          let media_array = [];
          let quantity_array = [];
          let rental_array = [];

          this.data.forEach((media) => {
            media_array.push(media?.id);
            quantity_array.push(media?.count);
            rental_array.push(media?.rental_period);
          });

          formData.append("media", media_array.join(","));
          formData.append("quantity", quantity_array.join(","));
          formData.append("rental_period", rental_array.join(","));

          this.mediaService.addToCart(formData).subscribe((data) => {
            localStorage.removeItem("add_to_cart");
            localStorage.removeItem("data_id");
            localStorage.removeItem("data");
            this.globalFooService.publishSomeData({ change: "change" });
            this.router.navigate(["/media/new"]);
          });
        } else {
          this.notifySubmit();
        }
      }
    }
  }

  async notifySubmit() {
    let temp = localStorage.getItem("language");
    let err = "";
    if (temp == "en") {
      err = "The input value should definitely be positive";
    } else {
      err = "Nilai input pasti positif";
    }
    const alert = await this.alertController.create({
      header: "Notify error",
      message: err,
      buttons: ["OK"],
    });

    await alert.present();
  }

  async renewSuccess() {
    const toast = await this.toastController.create({
      message: this.translate.instant("Media.cart.renew_success"),
      duration: 2000,
      position: "bottom",
      color: "primary",
      cssClass: "custom-toast",
    });
    toast.present();
  }

  async renewFailed() {
    const toast = await this.toastController.create({
      message: this.translate.instant("Media.cart.renew_failed"),
      duration: 2000,
      position: "bottom",
      color: "danger",
      cssClass: "custom-toast",
    });
    toast.present();
  }

  async deleteMediaCart(index, id) {
    const alert = await this.alertController.create({
      header: "",
      cssClass: "my-custom-alert",
      message: this.notify_delete,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            this.loadData();
          },
        },
        {
          text: "Ok",
          handler: () => {
            let data_id_temp = JSON.parse(localStorage.getItem("data_id"));
            let temp_id = [];

            for (var i = 0; i < data_id_temp.length; i++) {
              if (data_id_temp[i] != id) {
                temp_id.push(data_id_temp[i]);
              }
            }
            localStorage.removeItem("data_id");
            localStorage.setItem("data_id", JSON.stringify(temp_id));

            let temp = this.data;
            temp.splice(index, 1);
            if (
              this.data.length == 0 &&
              localStorage.getItem("add_to_cart") != undefined
            ) {
              localStorage.removeItem("add_to_cart");
              this.checkSubmit = true;
            }
            this.data = [];
            temp.forEach((element) => {
              this.data.push(element);
            });
            localStorage.removeItem("add_to_cart");
            localStorage.setItem("add_to_cart", JSON.stringify(this.data));
            let params = {};
          },
        },
      ],
    });
    await alert.present();
  }

  delete() {
    this.data.splice(1, 1);
    let temp = this.data;
    return temp;
  }

  addMore() {
    // this.router.navigate(['/media/new']);
    this.location.back();
    let temp_new = localStorage.getItem("media_type_new");
    if (temp_new == "book") {
      this.globalFooService.publishBackGetNew({
        page: localStorage.getItem("index_page_new"),
      });
    }
    if (temp_new == "audio") {
      this.globalFooService.publishBackGetNewAudio({
        page: localStorage.getItem("index_page_new"),
      });
    }
    if (temp_new == "video") {
      this.globalFooService.publishBackGetNewVideo({
        page: localStorage.getItem("index_page_new"),
      });
    }

    localStorage.removeItem("data");
    localStorage.setItem("data", JSON.stringify(this.data));
    // this.globalFooService.publishSomeData({change: "change"})
  }

  changePage(ev) {}
}
