import { Component, OnInit } from "@angular/core";
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from "ngx-file-drop";
import { MediaService } from "src/app/services/media.service";
import {
  AlertController,
  ModalController,
  ToastController,
} from "@ionic/angular";
import { environment } from "src/environments/environment";
import { runInThisContext } from "vm";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { HttpEventType, HttpEvent } from "@angular/common/http";
import { Router } from "@angular/router";
import { ModalViewFilePage } from "src/app/shared/modal/modal-view-file/modal-view-file.page";
import * as moment from "moment";

@Component({
  selector: "app-multi-upload",
  templateUrl: "./multi-upload.page.html",
  styleUrls: ["./multi-upload.page.scss"],
})
export class MultiUploadPage implements OnInit {
  public temp_name = [];
  public temp_data = [];
  public dataSubscriber = [];
  public data = [];
  public title = "";
  public checkCsv = false;
  public checkLoading = false;
  public checkCountCsv = true;
  public countCsv = 0;
  public labelProgress = "";
  public progress: number = 0;
  public uploading = false;

  constructor(
    private mediaService: MediaService,
    private alertController: AlertController,
    private toastController: ToastController,
    private translate: TranslateService,
    private router: Router
  ) {
    this.translate.use(localStorage.getItem("language"));
    if (localStorage.getItem("language") == "en") {
      this.title = "No file selected";
    } else {
      this.title = "Tiada fail yang dipilih";
    }
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.translate.use(localStorage.getItem("language"));
  }

  drop(event) {
    const items = event.dataTransfer.items;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.kind === "file") {
        const entry = item.webkitGetAsEntry();
        if (entry.isFile) {
          console.log(entry.isFile);
        } else if (entry.isDirectory) {
          console.log(entry.isDirectory);
        }
      }
    }
  }

  parseFileEntry(fileEntry) {
    return new Promise((resolve, reject) => {
      fileEntry.file(
        (file) => {
          resolve(file);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  parseDirectoryEntry(directoryEntry) {
    const directoryReader = directoryEntry.createReader();
    return new Promise((resolve, reject) => {
      directoryReader.readEntries(
        (entries) => {
          resolve(entries);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  filesPicked(files) {
    this.countCsv = 0;
    this.checkCountCsv = true;
    if (files != undefined) {
      let count = 0;
      this.temp_name = [];
      this.temp_data = [];
      // let params = {
      //   "images": [],
      //   "media": File
      // }
      let params = {
        images: [],
        media: [],
      };

      if (localStorage.getItem("language") == "en") {
        this.title = files.length + " files selected";
      } else {
        this.title = files.length + " fail dipilih";
      }
      let t;
      for (let i = 0; i < files.length; i++) {
        if (files[i].type == "text/csv") {
          let t = files[i].name;
          let t1 = t.indexOf(".");
          let t2 = t.substring(t1 + 1, t.length);

          // if (t2.toLowerCase() == "csv") {
          this.checkCsv = true;
          this.getDataFromCsvFile(files[i]);
          this.countCsv++;
          // }
        }

        var str1 = files[i].webkitRelativePath;
        var l1 = str1.lastIndexOf("/");
        var r1 = str1.substring(0, l1 + 1);
        t = files[0];

        if (i > 0) {
          var str2 = files[i - 1].webkitRelativePath;
          var l2 = str2.lastIndexOf("/");
          var r2 = str2.substring(0, l2 + 1);
          t = files[i - 1];
        }
        if (r1 != r2 && t.type != "") {
          if (files[i].type == "image/jpeg" || files[i].type == "image/png") {
            params.images.push(files[i]);
          }

          if (
            files[i].type == "audio/mpeg" ||
            files[i].type == "application/pdf" ||
            files[i].type == "video/mp4"
          ) {
            params.media.push(files[i]);
          }

          if (params.images.length > 0 || params.media.length > 0) {
            this.temp_data.push(params);
          }

          params = {
            images: [],
            media: [],
          };
        } else {
          const file = files[i];
          const path = file.webkitRelativePath.split("/");
          if (path.length == 3) {
            let temp = [];
            let check = true;
            // upload file using path
            var str = files[i].webkitRelativePath;
            var n = str.indexOf("/");
            var l = str.lastIndexOf("/");

            if (files[i].type == "image/jpeg" || files[i].type == "image/png") {
              params.images.push(files[i]);
            }

            if (
              files[i].type == "audio/mpeg" ||
              files[i].type == "application/pdf" ||
              files[i].type == "video/mp4"
            ) {
              params.media.push(files[i]);
            }

            if (n != l) {
              var res = str.substring(n + 1, l);
              for (var k = 0; k < this.temp_name.length; k++) {
                if (res.toLowerCase() == this.temp_name[k].toLowerCase()) {
                  check = false;
                  break;
                }
              }
              if (check) {
                this.temp_name.push(res);
              }
            }
          }
        }
        if (i == files.length - 1 && files[files.length - 1].type != "") {
          if (params.images.length > 0 && params.media.length > 0) {
            this.temp_data.push(params);
          }
        }
      }

      if (!this.checkCsv) {
        this.checkErrorMulti();
      }

      if (this.countCsv > 1 && this.checkCountCsv) {
        this.checkErrorMulti();
        this.checkCountCsv = false;
      }
    } else {
      // this.title = 'No file selected'
      if (localStorage.getItem("language") == "en") {
        this.title = "No file selected";
      } else {
        this.title = "Tiada fail yang dipilih";
      }
    }
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.checkCountCsv = true;
    this.countCsv = 0;
    let count = 0;
    this.temp_name = [];
    this.temp_data = [];
    let params = {
      images: [],
      media: [],
    };
    let temp;
    // this.title = files.length + " files selected"
    if (localStorage.getItem("language") == "en") {
      this.title = files.length + " files selected";
    } else {
      this.title = files.length + " fail dipilih";
    }
    for (const droppedFile of files) {
      const path = droppedFile.relativePath.split("/");
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;

        fileEntry.file((file: File) => {
          count++;
          if (file.type == "text/csv") {
            let t = file.name;
            let t1 = t.indexOf(".");
            let t2 = t.substring(t1 + 1, t.length);

            if (t2.toLowerCase() == "csv") {
              this.checkCsv = true;
              this.getDataFromCsvFile(file);
              this.countCsv++;
            }
          }

          if (
            (path.length == 3 && temp == path[1]) ||
            (path.length == 3 && temp == undefined)
          ) {
            if (file.type == "image/jpeg" || file.type == "image/png") {
              params.images.push(file);
            }
            if (
              file.type == "audio/mpeg" ||
              file.type == "application/pdf" ||
              file.type == "video/mp4"
            ) {
              params.media.push(file);
            }
            let check = true;
            if (this.temp_name.length > 0) {
              check = !this.temp_name.some(
                (name) => name.toLowerCase() == path[1].toLowerCase()
              );
            }

            if (check) {
              this.temp_name.push(path[1]);
            }

            temp = path[1];
          } else if (path.length == 3 && temp != path[1]) {
            this.temp_data.push(params);
            params = {
              images: [],
              media: [],
            };

            if (file.type == "image/jpeg" || file.type == "image/png") {
              params.images.push(file);
            }

            if (
              file.type == "audio/mpeg" ||
              file.type == "application/pdf" ||
              file.type == "video/mp4"
            ) {
              params.media.push(file);
            }

            temp = path[1];
          }

          if (count == files.length) {
            this.temp_data.push(params);
            if (!this.checkCsv) {
              this.checkErrorMulti();
            }
          }

          if (this.countCsv > 1 && this.checkCountCsv) {
            this.checkErrorMulti();
            this.checkCountCsv = false;
          }
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  toObject(arr) {
    var dataObject = {};
    for (var i = 0; i < arr.length; ++i) {
      dataObject[arr[i]] = "";
    }
    return dataObject;
  }

  getHeaderArray(csvRecordsArr) {
    let headerTemp = csvRecordsArr[0].split(" ").join("");
    let headers = headerTemp.split(",");
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray) {
    var dataArr = [];

    for (let i = 0; i < csvRecordsArray.length; i++) {
      let recordTemp = csvRecordsArray[i].split(", ").join(",");
      let data = recordTemp.split(",");

      let col = [];
      for (let j = 0; j < data.length; j++) {
        col.push(data[j]);
      }
      dataArr.push(col);
    }
    return dataArr;
  }

  getDataFromCsvFile(file) {
    this.dataSubscriber = [];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (data) => {
      let csvData = reader.result;
      const re = /\r\n|\n/;
      let csvRecordsArray = (csvData as string).split(re);
      let headerdata = this.getHeaderArray(csvRecordsArray);
      let recordData = this.getDataRecordsArrayFromCSVFile(csvRecordsArray);
      recordData.forEach((item, index) => {
        if (index != 0) {
          var temp = {};
          for (var i = 0; i < item.length; ++i) {
            temp[headerdata[i]] = item[i];
          }
          if (temp["name"] != "") {
            this.dataSubscriber.push(temp);
          }
        }
      });
      this.checkCsv = false;
      if (
        this.temp_data.length > 0 &&
        this.temp_name.length > 0 &&
        this.dataSubscriber.length > 0 &&
        this.dataSubscriber.length == this.temp_name.length &&
        this.temp_name.length == this.temp_data.length
      ) {
        this.uploadMultiMedia(
          this.temp_name,
          this.dataSubscriber,
          this.temp_data
        );
      } else {
        // this.checkErrorMulti();
      }
    };
  }

  uploadMultiMedia(arr_name, arr_data, arr_media) {
    let count = 0;
    this.data = [];
    for (var i = 0; i < arr_name.length; i++) {
      for (var k = 0; k < arr_data.length; k++) {
        if (
          arr_name[i].toLowerCase() == arr_data[k].name.trim().toLowerCase() &&
          arr_media[i]["media"].length > 0
        ) {
          for (var j = 0; j < arr_media[i]["media"].length; j++) {
            let t = arr_media[i]["media"][j].name;
            let t1 = t.indexOf(".");
            let t2 = t.substring(0, t1).toLowerCase();
            let type = arr_data[k].type;

            let params = {
              name: "",
              author: "",
              is_Active: "",
              media_type: "",
              media: File,
              images: [],
              category: "",
              release_date: "",
              price: 0,
              main_category: "",
            };

            if (
              type == "book" &&
              arr_media[i]["media"][j].type == "application/pdf" &&
              t2 == arr_data[k].name.trim().toLowerCase()
            ) {
              params = {
                name: arr_data[k].name,
                author: arr_data[k].author,
                is_Active: arr_data[k].is_active,
                media_type: arr_data[k].type,
                media: arr_media[i]["media"][j],
                images: arr_media[i]["images"],
                category: arr_data[k].category,
                release_date: moment(arr_data[k].release_date).format(
                  "YYYY-MM-DD"
                ),
                price: arr_data[k].price,
                main_category: arr_data[k].main_category,
              };
              count++;
              this.data.push(params);
            }

            if (
              type == "audio" &&
              arr_media[i]["media"][j].type == "audio/mpeg" &&
              t2 == arr_data[k].name.trim().toLowerCase()
            ) {
              params = {
                name: arr_data[k].name,
                author: arr_data[k].author,
                is_Active: arr_data[k].is_active,
                media_type: arr_data[k].type,
                media: arr_media[i]["media"][j],
                images: arr_media[i]["images"],
                category: arr_data[k].category,
                release_date: moment(arr_data[k].release_date).format(
                  "YYYY-MM-DD"
                ),
                price: arr_data[k].price,
                main_category: arr_data[k].main_category,
              };
              count++;
              this.data.push(params);
            }

            if (
              type == "video" &&
              arr_media[i]["media"][j].type == "video/mp4" &&
              t2 == arr_data[k].name.trim().toLowerCase()
            ) {
              params = {
                name: arr_data[k].name,
                author: arr_data[k].author,
                is_Active: arr_data[k].is_active,
                media_type: arr_data[k].type,
                media: arr_media[i]["media"][j],
                images: arr_media[i]["images"],
                category: arr_data[k].category,
                release_date: moment(arr_data[k].release_date).format(
                  "YYYY-MM-DD"
                ),
                price: arr_data[k].price,
                main_category: arr_data[k].main_category,
              };
              count++;
              this.data.push(params);
            }
            console.log(
              "🚀 ~ file: multi-upload.page.ts ~ line 509 ~ MultiUploadPage ~ uploadMultiMedia ~ this.data",
              this.data
            );
          }
        }
      }
    }
    if (count == this.dataSubscriber.length) {
      //call service upload multi media
      let formData = new FormData();
      if (this.data.length > 0) {
        let name = [];
        let author = [];
        let media_type = [];
        let is_active = [];
        let count_images = [];
        let category = [];
        let count_category = [];
        let price = [];
        let release_date = [];
        let main_category = [];

        for (var i = 0; i < this.data.length; i++) {
          name.push(this.data[i].name);
          author.push(this.data[i].author);
          is_active.push(this.data[i].is_Active);
          media_type.push(this.data[i].media_type);
          count_images.push(this.data[i].images.length);
          price.push(this.data[i].price);
          release_date.push(this.data[i].release_date);
          main_category.push(this.data[i].main_category);
          let temp_category = this.data[i].category?.split("|");
          if (temp_category?.length > 0) {
            for (var x = 0; x < this.data[i].category?.split("|").length; x++) {
              category.push(temp_category[x].trim());
            }
            count_category.push(temp_category.length);
          }
          formData.append(
            "files[]",
            this.data[i].media,
            this.data[i].media.name
          );
          if (this.data[i].images.length > 0) {
            for (var k = 0; k < this.data[i].images.length; k++) {
              formData.append(
                "images[]",
                this.data[i].images[k],
                this.data[i].images[k].name
              );
            }
          }
        }
        formData.append("name", name.join(","));
        formData.append("author", author.join(","));
        formData.append("media_type", media_type.join(","));
        formData.append("is_active", is_active.join(","));
        formData.append("count_image", count_images.join(","));
        formData.append("category", category.join(","));
        formData.append("price", price.join(","));
        formData.append("release_date", release_date.join(","));
        formData.append("main_category", main_category.join(","));
        formData.append("count_category", count_category.join(","));

        this.checkLoading = true;
        this.uploading = true;

        this.mediaService
          .multiUpload(formData)
          .pipe(
            catchError((data) => {
              if (!data.error) {
                this.checkErrorMulti();
                this.checkLoading = false;
              }
              return of();
            })
          )
          .subscribe((event: HttpEvent<any>) => {
            switch (event.type) {
              case HttpEventType.Sent:
                break;
              case HttpEventType.ResponseHeader:
                break;
              case HttpEventType.UploadProgress:
                let complete = (event.loaded / event.total).toFixed(2);
                this.progress = parseFloat(complete);
                let temp_percent = Math.round(
                  (event.loaded / event.total) * 100
                );
                this.translate
                  .get("Learning_material.create_material.percent_upload", {
                    output: temp_percent,
                  })
                  .subscribe((result: string) => {
                    this.labelProgress = result;
                  });
                break;
              case HttpEventType.Response:
                this.checkLoading = false;
                this.uploading = false;
                this.progress = 0;
                this.labelProgress = "";
                if (!event?.body?.success) {
                  this.messageFalse(event?.body?.error);
                  return;
                }

                this.uploadSuccess();
                this.router.navigate(["/media"]);
            }
          });
      }
    } else {
      this.checkErrorMulti();
    }
  }

  async checkErrorMulti() {
    if (localStorage.getItem("language") == "en") {
      this.title = "Invalid data please check again.";
    } else {
      this.title = "Data tidak sah sila periksa lagi.";
    }

    const alert = await this.alertController.create({
      header: "Error multi upload",
      cssClass: "my-custom-alert",
      message: this.title,
      buttons: [
        {
          text: "Ok",
          handler: () => {},
        },
      ],
    });
    await alert.present();
  }

  async uploadSuccess() {
    let title = "";
    if (localStorage.getItem("language") == "en") {
      title = "Your file have been updated successfully.";
    } else {
      title = "Fail anda berjaya dikemas kini.";
    }
    const toast = await this.toastController.create({
      message: title,
      duration: 2000,
      position: "bottom",
      color: "primary",
      cssClass: "custom-toast",
    });
    toast.present();
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  downloadFile() {
    this.mediaService.downloadFile();
  }

  goToLink() {
    window.open(
      "/assets/csv/CLICk _ Media_Multi_Uploading_Manual.pdf",
      "_blank"
    );
  }

  async messageFalse(error: string) {
    const toast = await this.toastController.create({
      message: error,
      duration: 2000,
      position: "bottom",
      color: "danger",
      cssClass: "custom-toast",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          },
        },
      ],
    });
    toast.present();
  }
}
