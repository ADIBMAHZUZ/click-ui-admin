import { ToastController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";
import { MediaService } from "src/app/services/media.service";
import { Router } from "@angular/router";
import { GlobalMenuService } from "src/app/services/global-menu.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-list-video",
  templateUrl: "./list-video.page.html",
  styleUrls: ["./list-video.page.scss"],
})
export class ListVideoPage implements OnInit {
  public searchVideo = "";
  public checkSearchPage = false;
  public checkFilterVideo = false;
  public filterVideo = "";
  public data = [];
  public images = [];
  public dataAddToCart = [];
  public items;
  public pageSize = 12;
  public maxPages = 5;
  public checkDisable = [];
  public dataID = [];
  public checkSearch = false;
  public loadDataPagensub;
  public loadDataUnsub;
  public global;
  public pagePre = -1;
  public searchPre = "";
  public filterPre = "";
  public indexPage;
  public checkBackPage = false;
  public globalBack;
  constructor(
    private mediaService: MediaService,
    private router: Router,
    private globalFooService: GlobalMenuService,
    private translate: TranslateService,
    private toastController: ToastController
  ) {
    this.translate.use(localStorage.getItem("language"));
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.globalFooService.publishResetSearchFilterGetNew({ reset: true });
    this.translate.use(localStorage.getItem("language"));
    localStorage.removeItem("media_type_new");
    localStorage.setItem("media_type_new", "video");
    this.checkSearch = false;
    localStorage.removeItem("media_type");
    localStorage.setItem("media_type", "video");
    this.indexPage = 1;
    this.checkBackPage = true;
    this.loadData();
    this.globalBack = this.globalFooService
      .getObservableBackGetNewVideo()
      .subscribe((data) => {
        this.loadData();
      });
    this.global = this.globalFooService.getObservable().subscribe((data) => {
      if (
        data.filter == undefined &&
        data.change != undefined &&
        data.change != ""
      ) {
        this.checkSearchPage = true;
        this.checkFilterVideo = false;
      }

      if (
        data.change == undefined &&
        data.filter != undefined &&
        data.filter != "all"
      ) {
        this.checkSearchPage = false;
        this.checkFilterVideo = true;
      }
      let count_search = 0;
      if (data.change != undefined) {
        this.checkSearch = true;
        if (data.change == "" || data.change == "change") {
          this.checkSearchPage = false;
          this.checkFilterVideo = false;
          this.pagePre = -1;
          this.loadData();
        } else if (data.change.results != undefined) {
          this.checkSearchPage = false;
          this.checkFilterVideo = false;
          this.loadData();
        } else if (data.change == "1") {
        } else {
          let params = {
            name: data.change,
            media_type: "video",
          };
          this.searchVideo = data.change;
          let number_search = data.number;
          this.mediaService.searchAllMedia(params).subscribe((data) => {
            if (data) {
              if (count_search == 0) {
                count_search++;
                this.checkSearchPage = true;
                this.checkFilterVideo = false;
                if (this.searchPre === "") {
                  this.loadDataSearch(data);
                  this.searchPre = number_search;
                }
                if (this.searchPre !== "" && this.searchPre !== number_search) {
                  this.loadDataSearch(data);
                  this.searchPre = number_search;
                }
              }
            }
          });
        }
      }

      if (data.filter != undefined) {
        let count_search = 0;
        if (data.filter == "all") {
          this.indexPage = 1;
          this.checkSearchPage = false;
          this.checkFilterVideo = false;
          this.loadData();
        } else if (data.filter != "all") {
          this.indexPage = 1;
          let params = {
            publisher: data.filter,
            media_type: "video",
            page: 1,
          };
          this.filterVideo = data.filter;
          let number_search = data.number;
          this.mediaService.searchAllMedia(params).subscribe((data) => {
            if (data) {
              this.checkSearchPage = false;
              this.checkFilterVideo = true;
              this.loadDataSearch(data);
              // if(count_search == 0){
              //   count_search++
              //   this.checkSearchPage = false
              //   this.checkFilterVideo = true
              //   // this.loadDataSearch(data)
              //   if(this.filterPre === ''){
              //     this.loadDataSearch(data)
              //     this.filterPre = number_search
              //   }
              //   if(this.filterPre !== '' && this.filterPre !== number_search){
              //     this.loadDataSearch(data)
              //     this.filterPre = number_search
              //   }
              // }
            }
          });
        }
      }
    });
  }

  loadData() {
    this.checkBackPage = true;
    this.checkSearchPage = false;
    this.checkFilterVideo = false;
    this.checkSearch = false;
    if (localStorage.getItem("index_page_new")) {
      this.indexPage = localStorage.getItem("index_page_new");
      this.checkBackPage = true;
      this.pagePre = parseInt(localStorage.getItem("index_page_new"));
      if (this.checkBackPage) {
        this.globalFooService.publishDataChangePageNewVideo({
          item: this.items,
          page: this.indexPage,
          check: true,
        });
      } else {
        this.globalFooService.publishDataChangePageNewVideo({
          item: this.items,
          page: this.indexPage,
          check: false,
        });
      }
      // this.checkBackPage = false
      localStorage.removeItem("index_page_new");
    } else {
      if (this.indexPage == 0 || this.indexPage == undefined) {
        this.indexPage = 1;
      }
      this.pagePre = -1;
    }
    let params = {
      media_type: "video",
      page: this.indexPage,
    };
    if (this.checkBackPage) {
      this.data = [];
      this.images = [];
      this.checkDisable = [];
      this.loadDataUnsub = this.mediaService
        .listAllMedia(params)
        .subscribe((data) => {
          this.checkSearchPage = false;
          this.checkFilterVideo = false;
          let temp_id = JSON.parse(localStorage.getItem("data_id"));
          this.items = data.count;
          let temp_data = data.results;
          if (this.checkBackPage) {
            this.globalFooService.publishDataChangePageNewVideo({
              item: this.items,
              page: this.indexPage,
              check: true,
            });
            this.pagePre = this.indexPage;
          } else {
            this.globalFooService.publishDataChangePageNewVideo({
              item: this.items,
              page: this.indexPage,
              check: false,
            });
          }

          if (temp_id == null) {
            for (var i = 0; i < data.results.length; i++) {
              this.checkDisable.push(false);
            }
          }
          if (temp_data != undefined) {
            temp_data.forEach((element) => {
              if (element.thumbnail != null) {
                this.images.push(element.thumbnail);
              } else {
                this.images.push("/assets/img/Media_1@4x.png");
              }
              if (temp_id != null) {
                if (this.checkLoop(element.id, temp_id)) {
                  this.checkDisable.push(false);
                  // temp_id.push(element.id)
                } else {
                  this.checkDisable.push(true);
                }
              }
              this.data.push(element);
            });
          }
        });
    }
    this.checkBackPage = false;
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }

  loadDataSearch(data) {
    this.pagePre = -1;
    let temp_id = JSON.parse(localStorage.getItem("data_id"));
    this.items = data.count;
    this.data = [];
    this.images = [];
    this.checkDisable = [];
    let temp_data = data.results;
    if (this.checkBackPage) {
      this.globalFooService.publishDataChangePageNewVideo({
        item: this.items,
        page: this.indexPage,
        check: true,
      });
    } else {
      this.globalFooService.publishDataChangePageNewVideo({
        item: this.items,
        page: this.indexPage,
        check: false,
      });
    }
    this.checkBackPage = false;
    if (temp_id == null) {
      for (var i = 0; i < data.results.length; i++) {
        this.checkDisable.push(false);
      }
    }
    if (temp_data != undefined) {
      temp_data.forEach((element) => {
        if (element.thumbnail != null) {
          this.images.push(element.thumbnail);
        } else {
          this.images.push("/assets/img/Media_1@4x.png");
        }
        if (temp_id != null) {
          if (this.checkLoop(element.id, temp_id)) {
            this.checkDisable.push(false);
            // temp_id.push(element.id)
          } else {
            this.checkDisable.push(true);
          }
        }
        this.data.push(element);
      });
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

  addToCart(item) {
    this.dataAddToCart = [];
    this.dataID = [];
    let check = false;
    if (
      localStorage.getItem("add_to_cart") != undefined &&
      localStorage.getItem("data_id") != undefined
    ) {
      this.dataAddToCart = JSON.parse(localStorage.getItem("add_to_cart"));
      this.dataID = JSON.parse(localStorage.getItem("data_id"));

      if (this.dataID.every((ele) => ele != item?.id)) {
        this.dataID.push(item.id);
        this.dataAddToCart.push(item);
      }
      
      localStorage.removeItem("data_id");
      localStorage.setItem("data_id", JSON.stringify(this.dataID));
      localStorage.removeItem("add_to_cart");
      localStorage.setItem("add_to_cart", JSON.stringify(this.dataAddToCart));
    } else {
      this.dataAddToCart.push(item);
      this.dataID.push(item.id);
      localStorage.setItem("data_id", JSON.stringify(this.dataID));
      localStorage.setItem("add_to_cart", JSON.stringify(this.dataAddToCart));
    }
    localStorage.removeItem("index_page_new");
    localStorage.setItem("index_page_new", this.indexPage);
    this.addMediaSuccess();
  }

  onChangePage(ev) {
    if (!this.checkSearchPage && !this.checkFilterVideo) {
      if (ev != 0 && !this.checkSearch) {
        let temp_page = ev;
        if (ev == undefined) {
          temp_page = 1;
        }
        this.indexPage = temp_page;
        let params = {
          media_type: "video",
          page: this.indexPage,
        };
        if (localStorage.getItem("media_type_new") == "video") {
          if (temp_page != this.pagePre) {
            this.pagePre = temp_page;
            this.getDataSearchPage(params);
          }
        }
      }
      this.checkSearch = false;
    } else if (this.checkSearchPage && !this.checkFilterVideo) {
      let temp_page = ev;
      if (ev == undefined || ev == 0) {
        temp_page = 1;
      }
      this.indexPage = temp_page;
      let params = {
        media_type: "video",
        page: this.indexPage,
        name: this.searchVideo,
      };
      if (temp_page != this.pagePre) {
        this.pagePre = temp_page;
        this.getDataSearchPage(params);
      }
    } else if (!this.checkSearchPage && this.checkFilterVideo) {
      let temp_page = ev;
      if (ev == undefined || ev == 0) {
        temp_page = 1;
      }
      this.indexPage = temp_page;
      let params = {
        media_type: "video",
        page: this.indexPage,
        publisher: this.filterVideo,
      };
      this.getDataSearchPage(params);
    }
  }

  getDataSearchPage(params) {
    this.loadDataPagensub = this.mediaService
      .listAllPageMedia(params)
      .subscribe((data) => {
        let temp_id = JSON.parse(localStorage.getItem("data_id"));
        this.items = data.count;
        this.data = [];
        this.images = [];
        this.checkDisable = [];
        let temp_data = data.results;
        if (temp_id == null) {
          for (var i = 0; i < data.results.length; i++) {
            this.checkDisable.push(false);
          }
        }
        if (temp_data != undefined) {
          temp_data.forEach((element) => {
            if (element.thumbnail != null) {
              this.images.push(element.thumbnail);
            } else {
              this.images.push("/assets/img/Media_1@4x.png");
            }
            if (temp_id != null) {
              if (this.checkLoop(element.id, temp_id)) {
                this.checkDisable.push(false);
                // temp_id.push(element.id)
              } else {
                this.checkDisable.push(true);
              }
            }
            this.data.push(element);
          });
        }
      });
  }

  ionViewDidLeave() {
    if (this.loadDataPagensub != undefined) {
      this.loadDataPagensub.unsubscribe();
    }
    if (this.loadDataUnsub != undefined) {
      this.loadDataUnsub.unsubscribe();
    }
    if (this.global != undefined) {
      this.global.unsubscribe();
    }
    if (this.globalBack != undefined) {
      this.globalBack.unsubscribe();
    }
  }

  ngOnDestroy() {
    if (this.loadDataPagensub != undefined) {
      this.loadDataPagensub.unsubscribe();
    }
    if (this.loadDataUnsub != undefined) {
      this.loadDataUnsub.unsubscribe();
    }
    if (this.global != undefined) {
      this.global.unsubscribe();
    }
    if (this.globalBack != undefined) {
      this.globalBack.unsubscribe();
    }
  }
  async addMediaSuccess() {
    const toast = await this.toastController.create({
      message: this.translate.instant("Media.cart.add_success"),
      duration: 2000,
      position: "bottom",
      color: "primary",
      cssClass: "custom-toast",
    });
    toast.present();
  }
}
