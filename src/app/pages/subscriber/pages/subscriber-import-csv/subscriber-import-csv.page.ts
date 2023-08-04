import { Component, OnInit } from "@angular/core";
import { LibraryService } from "src/app/services/library.service";
import { TranslateService } from "@ngx-translate/core";
import { SubscriberService } from "src/app/services/subscriber.service";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import { AlertController, ToastController } from "@ionic/angular";

@Component({
  selector: "app-subscriber-import-csv",
  templateUrl: "./subscriber-import-csv.page.html",
  styleUrls: ["./subscriber-import-csv.page.scss"],
})
export class SubscriberImportCsvPage implements OnInit {
  public title = "";
  public library;
  public dataSubscriber = [];
  public dataLibrary;
  public checkLoading = false;
  public contentError = "";

  constructor(
    private libraryService: LibraryService,
    private translate: TranslateService,
    private subscriberService: SubscriberService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    this.translate.use(localStorage.getItem("language"));
    if (localStorage.getItem("language") == "en") {
      this.title = "No select file..";
    } else {
      this.title = "Tiada fail pilih ..";
    }
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.translate.use(localStorage.getItem("language"));
    if (localStorage.getItem("language") == "en") {
      this.title = "No select file..";
    } else {
      this.title = "Tiada fail pilih ..";
    }
    this.libraryService.listLibraries().subscribe((data) => {
      this.dataLibrary = data.results;
    });
  }

  onChange(fileList: FileList): void {
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    let self = this;
    // let dataSubscriber = []
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
            temp[headerdata[i].toLowerCase()] = item[i];
          }
          var checkTemp = Object.entries(temp);
          // if(checkTemp.length == headerdata.length){
          this.dataSubscriber.push(temp);
          // }
        }
      });
      if (this.dataSubscriber.length <= 1000) {
        let params = {
          results: this.dataSubscriber,
        };
        this.checkLoading = true;
        this.subscriberService
          .importCsvSubscribers(params)
          .pipe(
            catchError((data) => {
              if (!data.error.success) {
                if (data.error.error && data.error.line == undefined) {
                  this.translate
                    .get("Subscriber.import_csv.notify_full")
                    .subscribe((result: string) => {
                      this.contentError = result;
                    });
                } else {
                  this.translate
                    .get("Subscriber.import_csv.notify_invalid", {
                      output: data.error.line,
                    })
                    .subscribe((result: string) => {
                      this.contentError = result;
                    });
                }
                this.checkErrorImport(this.contentError);
                this.checkLoading = false;
              }
              return of();
            })
          )
          .subscribe((data) => {
            this.importSuccess();
            this.checkLoading = false;
          });
      } else {
        let temp = localStorage.getItem("language");
        if (temp == "en") {
          this.contentError = "Data must be less than or equal to 1000.";
        } else {
          this.contentError =
            "Data mestilah kurang daripada atau sama dengan 1000.";
        }

        this.checkErrorImport(this.contentError);
      }
    };
    let formData = new FormData();
    formData.append("file", file);
    this.title = file.name;
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

  async checkErrorImport(item) {
    const alert = await this.alertController.create({
      header: "Error import CSV",
      cssClass: "my-custom-alert",
      message: item,
      buttons: [
        {
          text: "Ok",
          handler: () => {},
        },
      ],
    });
    await alert.present();
  }
  async importSuccess() {
    const toast = await this.toastController.create({
      message: "Your file have been imported successfully.",
      duration: 2000,
      position: "bottom",
      color: "primary",
      cssClass: "custom-toast",
    });
    toast.present();
  }

  downloadFile() {
    this.subscriberService.downloadFile();
  }
}
