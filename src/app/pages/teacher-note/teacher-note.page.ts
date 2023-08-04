import { Component, OnInit, ChangeDetectorRef, NgZone } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {
  AlertController,
  ModalController,
  ToastController,
} from "@ionic/angular";
import { ModalViewFilePage } from "src/app/shared/modal/modal-view-file/modal-view-file.page";
import { TeacherNoteService } from "src/app/services/teacher-note.service";
import { dirname, format } from "path";
import { UploadFilePage } from "src/app/shared/modal/upload-file/upload-file.page";
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from "ngx-file-drop";
import { findLast } from "@angular/compiler/src/directive_resolver";
import { threadId } from "worker_threads";
import { of, from, Subscription, Subscriber, Subject, Observable } from "rxjs";
import { mergeMap, map, takeUntil, catchError } from "rxjs/operators";
import { ReturnStatement } from "@angular/compiler";
import { FileDetector } from "protractor";
import { GlobalMenuService } from "src/app/services/global-menu.service";
import { copyFileSync } from "fs";
import {
  HttpParams,
  HttpHeaders,
  HttpEvent,
  HttpEventType,
} from "@angular/common/http";
import { FocusKeyManager } from "@angular/cdk/a11y";
import { RenameNotePage } from "src/app/shared/modal/rename-note/rename-note.page";
import { CreateFolderPage } from "src/app/shared/modal/create-folder/create-folder.page";

@Component({
  selector: "app-teacher-note",
  templateUrl: "./teacher-note.page.html",
  styleUrls: ["./teacher-note.page.scss"],
})
export class TeacherNotePage implements OnInit {
  public temp_position_create = 0;
  public temp_position_upload = 0;
  public temp_form_data = [];
  public temp_form_data_upload = [];
  public temp_file_data_upload = [];
  public temp_create_folder = [];
  public dirname_temp_file = [];
  public temp_multi = [];
  public diranme_multi = [];
  public temp_files = [];
  public items;
  public quantity_folder;
  public searchTeacherNote = "";
  public checkUpload = false;
  public data_display = [];
  public url = "";
  public preUrl = [];
  public prePage = [];
  public count = 0;
  public preUrlChild = [];
  public countChild = 0;
  public dirName = "";
  public checkDisableBack = true;
  public checkChangeFolder = false;
  public files: NgxFileDropEntry[] = [];
  public indexPage;
  public changePage = false;
  public checkCreate = false;
  public urlTemp = "";
  public countPage = 0;
  public checkUploadSingle = false;
  // public pagePre = ''

  public color = [];
  public checkDelete = true;
  public url_delete = "";
  public id_forcus = [];
  public notify_delete = "";
  public checkDeletePage = true;
  public checkCreatePage = true;
  public pageDelete;
  public tempUrlFolder = [];
  public urlFolder = "";

  public checkUploadFile = false;

  public headerCreate = "";
  public valueLabel = "";
  public valueCreate = "";
  public placeholderCreate = "";
  public txtCalcel = "";
  public pagePre = "";

  public name_rename = "";

  public progress = 0;

  public temp_upload = 0;

  public checkFocusPage = false;

  public arrayPercent = [];
  public arrayPercentUpload = [];
  public arrayPercentUploadComplete = [];

  public backFolderCheck = false;

  public checkSpecialCharacters = true;

  public subscription = new Subject();

  accessType = [
    "pdf",
    "txt",
    "pptx",
    "ppt",
    "mp3",
    "mp4",
    "docx",
    "doc",
    "xlsx",
    "xls",
  ];

  constructor(
    private translate: TranslateService,
    public alertController: AlertController,
    public modalController: ModalController,
    private modalCtrl: ModalController,
    private teacherNoteService: TeacherNoteService,
    public toastController: ToastController,
    public globalService: GlobalMenuService,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {
    this.translate.use(localStorage.getItem("language"));
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.translate.use(localStorage.getItem("language"));
    this.loadData();
  }

  loadData() {
    if (!this.checkChangeFolder) {
      if (this.indexPage != undefined) {
        this.data_display = [];
        let temp_id = localStorage.getItem("user_id");
        let params = {
          page: this.indexPage,
        };

        if (this.count == 0) {
          let note = new FormData();
          note.append("folder", this.dirName);
          let page;
          if (this.indexPage > 0) {
            page = this.indexPage;
          } else {
            page = 1;
          }
          this.teacherNoteService
            .listTeacherNotesNew(temp_id, page, note)
            .subscribe((data) => {
              // this.teacherNoteService.getDataPage(temp_id, params).subscribe(data => {
              this.dirName = this.teacherNoteService.urlDirname(temp_id);
              this.preUrl.push(this.dirName);
              this.count++;
              if (this.count > 1) {
                this.checkDisableBack = false;
                this.checkChangeFolder = true;
              } else if (this.count == 1) {
                this.checkDisableBack = true;
                this.checkChangeFolder = false;
              }
              this.data_display = data.results.notes.results;
              this.cdr.detectChanges();
              this.quantity_folder = data.results.notes.results.length;
              this.items = data.results.notes.count;
              // this.globalService.publishDataTeacherNoteChangePage({item: data.results.notes.count})
              if (this.changePage) {
                this.urlTemp = data.results.notes.next;
              } else {
                this.urlTemp = data.results.notes.previous;
              }
            });
        } else if (
          (this.count == 1 && this.checkCreate) ||
          (this.count == 1 && this.checkUploadSingle)
        ) {
          this.data_display = [];
          let temp_id = localStorage.getItem("user_id");
          let note = new FormData();
          let temp_url_page;
          if (this.indexPage == 0 || this.indexPage == undefined) {
            temp_url_page = this.teacherNoteService.urlListRoot(temp_id) + 1;
          } else {
            temp_url_page =
              this.teacherNoteService.urlListRoot(temp_id) + this.indexPage;
          }
          let page;
          if (this.indexPage == 0 || this.indexPage == undefined) {
            page = 1;
          } else {
            page = this.indexPage;
          }

          note.append("folder", "");
          // this.teacherNoteService.listTeacherNotes(temp_id).subscribe(data => {
          this.teacherNoteService
            .listTeacherNotesNew(temp_id, page, note)
            .subscribe((data) => {
              if (this.count > 1) {
                this.checkDisableBack = false;
                this.checkChangeFolder = true;
              } else if (this.count == 1) {
                this.checkDisableBack = true;
                this.checkChangeFolder = false;
              }
              this.data_display = data.results.notes.results;
              this.globalService.publishDataTeacherNoteChangePage({
                item: data.results.notes.count,
              });
              this.cdr.detectChanges();
            });
        } else if (this.count > 1 && this.preUrlChild.length > 0) {
          let page;
          if (this.indexPage == 0 || this.indexPage == undefined) {
            page = 1;
          } else {
            page = this.indexPage;
          }
          let note = new FormData();
          note.append("folder", this.dirName);
          // this.teacherNoteService.getDataChildPage(temp_id, params).subscribe(data => {
          this.teacherNoteService
            .listTeacherNotesNew(temp_id, page, note)
            .subscribe((data) => {
              this.dirName = this.teacherNoteService.urlDirname(temp_id);
              this.preUrl.push(this.dirName);
              this.count++;
              if (this.count > 1) {
                this.checkDisableBack = false;
                this.checkChangeFolder = true;
              } else if (this.count == 1) {
                this.checkDisableBack = true;
                this.checkChangeFolder = false;
              }
              this.data_display = data.results.notes.results;
              this.cdr.detectChanges();
              this.quantity_folder = data.results.notes.results.length;
              this.items = data.results.notes.count;
              this.globalService.publishDataTeacherNoteChangePage({
                item: data.results.notes.count,
              });
              if (this.changePage) {
                this.urlTemp = data.results.notes.next;
              } else {
                this.urlTemp = data.results.notes.previous;
              }
            });
        }
      } else if (this.indexPage == undefined) {
        this.data_display = [];
        let temp_id = localStorage.getItem("user_id");
        let note = new FormData();
        // note.append("folder", "")
        let temp_url_page;
        if (this.indexPage == 0 || this.indexPage == undefined) {
          temp_url_page = this.teacherNoteService.urlListRoot(temp_id) + 1;
        } else {
          temp_url_page =
            this.teacherNoteService.urlListRoot(temp_id) + this.indexPage;
        }
        let page;
        if (this.indexPage == 0 || this.indexPage == undefined) {
          page = 1;
        } else {
          page = this.indexPage;
        }
        note.append("folder", "");
        this.teacherNoteService
          .listTeacherNotesNew(temp_id, page, note)
          .subscribe((data) => {
            // this.teacherNoteService.listTeacherNotes(temp_id).subscribe(data => {
            this.dirName = this.teacherNoteService.urlDirname(temp_id);
            this.preUrl.push(this.dirName);
            this.count++;
            if (this.count > 1) {
              this.checkDisableBack = false;
              this.checkChangeFolder = true;
            } else if (this.count == 1) {
              this.checkDisableBack = true;
              this.checkChangeFolder = false;
            }
            this.data_display = data.results.notes.results;
            this.cdr.detectChanges();
            this.quantity_folder = data.results.notes.results.length;
            this.items = data.results.notes.count;
            this.globalService.publishDataTeacherNoteChangePage({
              item: data.results.notes.count,
            });
            this.urlTemp = data.results.notes.next;
          });
      }
    } else if (this.countChild > 0) {
      this.data_display = [];
      if (this.indexPage == 0) {
        this.indexPage = 1;
      }
      let temp_id = localStorage.getItem("user_id");
      let url =
        this.teacherNoteService.urlDirnameChild(temp_id) + this.indexPage;
      let params = this.preUrlChild[this.countChild - 1];

      let formData = new FormData();
      formData.append("folder", params);
      let note = new FormData();
      let page;
      if (this.indexPage == 0 || this.indexPage == undefined) {
        page = 1;
      } else {
        page = this.indexPage;
      }
      note.append("folder", params);
      this.teacherNoteService
        .listTeacherNotesNew(temp_id, page, note)
        .subscribe((data) => {
          // this.teacherNoteService.listTeacherNotesUrlPage(url, formData).subscribe(data => {
          if (this.count > 1) {
            this.checkDisableBack = false;
            this.checkChangeFolder = true;
          } else if (this.count == 1) {
            this.checkDisableBack = true;
            this.checkChangeFolder = false;
          }

          this.data_display = data.results.notes.results;
          this.cdr.detectChanges();
          this.quantity_folder = data.results.notes.results.length;
          this.items = data.results.notes.count;
          this.globalService.publishDataTeacherNoteChangePage({
            item: data.results.notes.count,
          });
          if (this.changePage) {
            this.urlTemp = data.results.notes.next;
          } else {
            this.urlTemp = data.results.notes.previous;
          }
        });
    }

    if (this.preUrlChild.length == 0) {
      let temp_id = localStorage.getItem("user_id");
      this.data_display = [];
      let page;
      if (this.indexPage > 0) {
        page = this.indexPage;
      } else {
        page = 1;
      }

      let params = {
        page: page,
      };
      let note = new FormData();
      note.append("folder", this.dirName);

      this.teacherNoteService
        .listTeacherNotesNew(temp_id, page, note)
        .subscribe((data) => {
          // this.teacherNoteService.getDataPage(temp_id, params).subscribe(data => {
          this.data_display = data.results.notes.results;
          this.cdr.detectChanges();
          this.quantity_folder = data.results.notes.results.length;
          this.items = data.results.notes.count;
          this.globalService.publishDataTeacherNoteChangePage({
            item: data.results.notes.count,
          });
          this.checkChangeFolder = false;
          this.checkDisableBack = true;
        });
    }
    this.checkCreate = false;
    this.checkUploadSingle = false;
    this.checkUploadFile = false;
    this.checkCreatePage = false;
  }

  changeFolder(item) {
    this.pagePre == "";
    if (this.indexPage == 0 || this.indexPage == undefined) {
      this.indexPage = 1;
    }
    this.prePage.push(this.indexPage);
    this.checkUpload = false;
    this.countChild++;
    this.preUrlChild.push(item.url);
    let temp_id = localStorage.getItem("user_id");
    // this.count++
    let formData = new FormData();
    formData.append("folder", item.url);
    let urlTemp = item.url + "/";
    // this.dirName = urlTemp
    if (this.count == 0) {
      this.count += 2;
      // this.count++
      this.dirName = this.teacherNoteService.urlDirname(temp_id);
      this.preUrl.push(this.dirName);
      this.preUrl.push(urlTemp);
    } else {
      this.dirName = urlTemp;
      this.count++;
      this.preUrl.push(urlTemp);
    }
    this.url = item.url;
    let url = item.url + "/";
    let note = new FormData();
    note.append("folder", item.url);
    let page;
    if (this.indexPage == 0 || this.indexPage == undefined) {
      page = 1;
    } else {
      page = this.indexPage;
    }
    this.teacherNoteService
      .listTeacherNotesNew(temp_id, 1, note)
      .subscribe((data) => {
        // this.teacherNoteService.listTeacherNotesUrl(temp_id, formData).subscribe(data => {
        this.data_display = data.results.notes.results;
        this.quantity_folder = data.results.notes.results.length;
        this.indexPage = 1;
        this.items = data.results.notes.count;
        this.globalService.publishDataTeacherNoteChangeFolder({
          item: data.results.notes.count,
        });
        this.cdr.detectChanges();
      });
    if (this.count > 1) {
      this.checkDisableBack = false;
      this.checkChangeFolder = true;
    } else if (this.count == 1) {
      this.preUrl = [];
      this.dirName = this.teacherNoteService.urlDirname(temp_id);
      this.preUrl.push(this.dirName);
      this.checkDisableBack = true;
      this.checkChangeFolder = false;
    }
    this.urlFolder = "";
    this.tempUrlFolder.push(item.name);
    if (this.tempUrlFolder.length > 0) {
      for (var i = 0; i < this.tempUrlFolder.length; i++) {
        if (i == 0) {
          this.urlFolder += this.tempUrlFolder[i];
        } else {
          let temp = " > " + this.tempUrlFolder[i];
          this.urlFolder += temp;
        }
      }
    }
    this.dirName = this.preUrl[this.preUrl.length - 1];
  }

  backFolder() {
    this.pagePre = "";
    this.backFolderCheck = true;
    this.checkUpload = false;
    this.count--;
    let url;
    if (this.preUrl.length > 0) {
      url = this.preUrl[this.count - 1];
    }
    this.countChild--;
    this.preUrlChild.pop();
    // this.preUrl.pop()
    this.indexPage = this.prePage[this.prePage.length - 1];

    this.backFolderCheck = true;

    let temp_id = localStorage.getItem("user_id");
    let formData = new FormData();
    formData.append("folder", url);
    let note = new FormData();
    note.append("folder", url);
    let page;
    if (this.indexPage == 0 || this.indexPage == undefined) {
      page = 1;
    } else {
      page = this.indexPage;
    }
    this.teacherNoteService
      .listTeacherNotesNew(temp_id, this.prePage[this.prePage.length - 1], note)
      .subscribe((data) => {
        this.globalService.publishDataTeacherNoteBackPage({
          page: this.prePage[this.prePage.length - 1],
          item: data.results.notes.count,
        });
        if (this.prePage.length > 0) {
          this.prePage.pop();
        }
      });
    if (this.count > 1) {
      this.checkDisableBack = false;
      this.checkChangeFolder = true;
    } else if (this.count == 1) {
      this.checkDisableBack = true;
      this.checkChangeFolder = false;
      this.preUrl = [];
      this.dirName = this.teacherNoteService.urlDirname(temp_id);
      this.preUrl.push(this.dirName);
    }

    this.urlFolder = "";
    if (this.tempUrlFolder.length > 0) {
      this.tempUrlFolder.pop();
    }

    if (this.tempUrlFolder.length > 0) {
      for (var i = 0; i < this.tempUrlFolder.length; i++) {
        if (i == 0) {
          this.urlFolder += this.tempUrlFolder[i];
        } else {
          let temp = " > " + this.tempUrlFolder[i];
          this.urlFolder += temp;
        }
      }
    } else {
      this.urlFolder = "";
    }
  }

  async createFolder() {
    if (localStorage.getItem("language") == "en") {
      this.headerCreate = "Create folder";
      this.valueLabel = "Create folder";
      this.valueCreate = "Name folder";
      this.placeholderCreate = "Create folder";
      this.txtCalcel = "Cancel";
    } else {
      this.headerCreate = "Buat folder";
      this.valueLabel = "Folder nama";
      this.valueCreate = "Folder nama";
      this.placeholderCreate = "Buat folder";
      this.txtCalcel = "Batal";
    }
    const alert = await this.alertController.create({
      header: this.headerCreate,
      cssClass: "my-custom-alert-update",
      inputs: [
        {
          name: "max_1",
          type: "text",
          label: "Name",
          placeholder: "Name",
          value: this.valueLabel,
          disabled: true,
        },
        {
          name: "name_foler",
          type: "text",
          placeholder: this.placeholderCreate,
          value: this.valueCreate,
          label: "Name",
        },
      ],
      buttons: [
        {
          text: this.txtCalcel,
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {},
        },
        {
          text: "Ok",
          handler: (dataAlert) => {
            let formData = new FormData();
            // formData.append("dirname", this.dirName)
            // formData.append("folder", dataAlert.name_foler)
            formData.append("name", dataAlert.name_foler);
            formData.append("folder", this.dirName);
            formData.append("type", "folder");
            let id = localStorage.getItem("user_id");
            this.teacherNoteService
              .createTeacherNotes(formData)
              .pipe(
                catchError((data) => {
                  if (!data.error.success) {
                    this.createFail(dataAlert.name_foler);
                  }
                  return of();
                })
              )
              .subscribe(
                (data) => {
                  this.checkCreate = true;
                  this.checkDeletePage = true;
                  this.checkUploadFile = false;
                  this.checkCreatePage = false;
                  this.backFolderCheck = false;
                  this.createSuccess();
                  this.loadDataAfterDeleteCreate();
                },
                (error) => {
                  this.uploadFailed();
                }
              );
          },
        },
      ],
    });
    await alert.present();
  }
  async createSuccess() {
    let title = "";
    let txtCancel = "";
    if (localStorage.getItem("language") == "en") {
      title = "Your folder have been created successfully.";
      txtCancel = "Cancel";
    } else {
      title = "Folder anda berjaya dibuat.";
      txtCancel = "Batal";
    }
    const toast = await this.toastController.create({
      message: title,
      duration: 2000,
      position: "bottom",
      color: "primary",
      cssClass: "custom-toast",
      buttons: [
        {
          text: txtCancel,
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          },
        },
      ],
    });
    toast.present();
    this.loadData();
  }

  async createFail(name) {
    let title = "";
    if (localStorage.getItem("language") == "en") {
      title = "Folder '" + name + "' already exists";
    } else {
      title = "Folder '" + name + "' sudah ada";
    }
    const alert = await this.alertController.create({
      header: "",
      cssClass: "my-custom-alert",
      message: title,
      buttons: [
        {
          text: "Ok",
          handler: () => {},
        },
      ],
    });
    await alert.present();
  }

  viewPdf(id) {}

  viewFileTeacherNote(item) {
    if (
      this.accessType.some((data) => data == item.file_type)
      // item.file_type == "pdf" ||
      // item.file_type == "mp3" ||
      // item.file_type == "mp4" ||
      // item.file_type == "txt"
    ) {
      this.viewFileModal(item);
    } else {
      this.viewFail();
    }
  }

  async viewFail() {
    let title = "";
    if (localStorage.getItem("language") == "en") {
      title = "Could not open file. Unsupported file type.";
    } else {
      title = "Tidak dapat membuka fail. Jenis fail yang tidak disokong.";
    }
    const alert = await this.alertController.create({
      header: "",
      cssClass: "my-custom-alert",
      message: title,
      buttons: [
        {
          text: "Ok",
          handler: () => {},
        },
      ],
    });
    await alert.present();
  }

  async viewFileModal(item) {
    const modal = await this.modalController.create({
      component: ModalViewFilePage,
      showBackdrop: false,
      cssClass: "dynamicModalCss",
      componentProps: {
        url: item.url,
        type: item.file_type,
      },
    });
    return await modal.present();
  }

  uploadFile() {
    this.checkUpload = true;
  }

  onSearchTeacher() {}

  public dropped(files: NgxFileDropEntry[]) {
    this.checkSpecialCharacters = true;
    this.temp_files = [];
    this.dirname_temp_file = [];
    this.temp_multi = [];
    this.diranme_multi = [];
    this.files = files;
    for (const droppedFile of files) {
      if (this.checkSpecialCharacters) {
        this.loadDataUpload(droppedFile.relativePath);
      }
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          if (this.checkSpecialCharacters) {
            if (this.checkSpecailChracterUpload(file.name)) {
              this.checkSpecialCharacters = false;
              this.uploadFailedSpecialCharacter();
            }
            this.temp_files.push(file);
          }
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }

    if (
      this.temp_multi.length > 0 &&
      this.diranme_multi.length > 0 &&
      this.checkSpecialCharacters
    ) {
      this.createMultiFolder(this.temp_multi, this.diranme_multi);
    } else {
      const droppedFile = files[0];
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          let temp_id = localStorage.getItem("user_id");
          let formData = new FormData();
          formData.append("type", "file");
          formData.append("name", file, file.name);
          formData.append("folder", this.dirName);
          if (this.checkSpecialCharacters) {
            if (this.checkSpecailChracterUpload(file.name)) {
              this.checkSpecialCharacters = false;
              this.uploadFailedSpecialCharacter();
            }
          }

          if (this.checkSpecialCharacters) {
            this.checkUploadFile = true;
            this.arrayPercent.push(0);
            this.arrayPercentUploadComplete.push(0);
            this.arrayPercentUpload.push(file.size);
            this.uploadOneFilePercent(temp_id, formData, 0, 1);
          }
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
    this.checkUpload = false;
  }

  async loadingAlert() {
    const alert = await this.alertController.create({
      message: "Low battery",
      subHeader: "10% of battery remaining",
      buttons: ["Dismiss"],
    });
    await alert.present();
  }

  async updateSuccess() {
    let title = "";
    if (localStorage.getItem("language") == "en") {
      title = "Your file have been updated successfully.";
    } else {
      title = "Fail anda berjaya dikemas kini.";
    }
    this.globalService.publishDataTeacherNote({ success: true });
    this.loadData();
    const toast = await this.toastController.create({
      message: title,
      duration: 2000,
      position: "bottom",
      color: "primary",
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

  public fileOver(event) {}

  public fileLeave(event) {}

  uploadFolder(files) {
    this.checkSpecialCharacters = true;
    this.temp_files = files;
    this.dirname_temp_file = [];
    this.temp_multi = [];
    this.diranme_multi = [];
    for (var i = 0; i < files.length; i++) {
      if (this.checkSpecailChracterUpload(files[i].name)) {
        this.checkSpecialCharacters = false;
        this.uploadFailedSpecialCharacter();
        break;
      }
      if (this.checkSpecialCharacters) {
        this.loadDataUpload(files[i].webkitRelativePath);
      }
    }
    if (this.temp_multi.length > 0 && this.diranme_multi.length > 0) {
      if (this.checkSpecialCharacters) {
        this.createMultiFolder(this.temp_multi, this.diranme_multi);
      }
    } else {
      let temp_id = localStorage.getItem("user_id");
      let formData = new FormData();
      formData.append("type", "file");
      formData.append("name", files[0], files[0].name);
      formData.append("folder", this.dirName);
      this.checkUploadFile = true;
      this.arrayPercent.push(0);
      this.arrayPercentUploadComplete.push(0);
      this.arrayPercentUpload.push(files[0].size);
      if (this.checkSpecialCharacters) {
        this.uploadOneFilePercent(temp_id, formData, 0, 1);
      }
    }
    this.checkUpload = false;
  }

  uploadFileMulti(files) {
    let temp_id = localStorage.getItem("user_id");
    this.checkSpecialCharacters = true;

    if (files != undefined) {
      this.checkUpload = false;
    }
    this.globalService.getObservable().subscribe((data) => {
      if (data.cancel) {
        this.temp_position_upload = files.length;
        this.checkUploadFile = false;
      }
    });
    if (files != undefined && files.length > 0) {
      for (var k = 0; k < files.length; k++) {
        if (this.checkSpecailChracterUpload(files[k].name)) {
          this.checkSpecialCharacters = false;
          this.uploadFailedSpecialCharacter();
          break;
        }
      }
    }
    if (this.checkSpecialCharacters) {
      if (files != undefined && files.length > 2) {
        this.checkUploadFile = true;
        this.checkDeletePage = true;
        this.checkCreatePage = true;
        this.backFolderCheck = true;
        for (var i = 0; i < files.length; i++) {
          let formData = new FormData();
          formData.append("type", "file");
          formData.append("name", files[i], files[i].name);
          formData.append("folder", this.dirName);
          this.arrayPercent.push(0);
          this.arrayPercentUploadComplete.push(0);
          this.arrayPercentUpload.push(files[i].size);
          this.checkUploadFile = true;
          this.uploadOneFilePercent(temp_id, formData, i, files.length);
        }
      } else if (files != undefined && files.length == 1) {
        let formData = new FormData();
        formData.append("type", "file");
        formData.append("name", files[0], files[0].name);
        formData.append("folder", this.dirName);
        this.checkUploadFile = true;
        this.arrayPercent.push(0);
        this.arrayPercentUploadComplete.push(0);
        this.arrayPercentUpload.push(files[0].size);
        this.uploadOneFilePercent(temp_id, formData, 0, 1);
      } else if (files != undefined && files.length == 2) {
        for (var i = 0; i < 2; i++) {
          let formData = new FormData();
          formData.append("type", "file");
          formData.append("name", files[i], files[i].name);
          formData.append("folder", this.dirName);
          this.checkUploadFile = true;
          this.arrayPercent.push(0);
          this.arrayPercentUploadComplete.push(0);
          this.arrayPercentUpload.push(files[i].size);
          this.uploadOneFilePercent(temp_id, formData, i, 2);
        }
      }
    }
  }

  uploadOneFilePercent(temp_id, formData, index, len) {
    // this.teacherNoteService.uploadFileSingle(temp_id, formData)
    this.teacherNoteService
      .uploadFile(formData)
      .pipe(
        catchError((data) => {
          if (data.error) {
            this.uploadFailed();
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
            this.checkUploadFile = true;
            this.checkDeletePage = true;
            let complete = (event.loaded / event.total).toFixed(2);
            let progress = parseFloat(complete);
            this.arrayPercent[index] = progress;
            this.arrayPercentUploadComplete[index] = event.loaded;
            this.globalService.publishDataTeacherNote({
              sum: this.arrayPercentUpload.reduce((a, b) => a + b, 0),
              count: this.arrayPercentUploadComplete.reduce((a, b) => a + b, 0),
            });
            break;
          case HttpEventType.Response:
            this.arrayPercent = [];
            this.temp_form_data_upload = [];
            this.temp_file_data_upload = [];
            this.arrayPercentUpload = [];
            this.arrayPercentUploadComplete = [];
            this.checkUploadFile = false;
            this.temp_position_upload = 0;
            if (!event?.body?.success) {
              this.messageFalse(event?.body?.error);
              return;
            }
            if (this.arrayPercent.reduce((a, b) => a + b, 0) == len) {
              this.globalService.publishDataTeacherNote({
                sum: this.arrayPercentUpload.reduce((a, b) => a + b, 0),
                count: this.arrayPercentUploadComplete.reduce(
                  (a, b) => a + b,
                  0
                ),
                success: true,
              });
              this.updateSuccess();
              // this.loadData()
            }
        }
      });
  }

  uploadOneFile(temp_id, formData) {
    this.teacherNoteService
      .uploadFileSingle(temp_id, formData)
      .pipe(
        catchError((data) => {
          if (data.error) {
            this.uploadFailed();
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
            this.checkUploadFile = true;
            this.checkDeletePage = true;
            let complete = (event.loaded / event.total).toFixed(2);
            let progress = parseFloat(complete);
            this.globalService.publishDataTeacherNote({
              sum: 1,
              count: progress,
            });
            break;
          case HttpEventType.Response:
            this.checkUploadFile = false;
            if (!event?.body?.success) {
              this.messageFalse(event?.body?.error);
              return;
            }
            // this.temp_position_upload = 0
            this.updateSuccess();
          // this.loadData()
        }
      });
  }

  uploadTwoFile(temp_id, formData) {
    this.teacherNoteService
      .uploadFileSingle(temp_id, formData)
      .pipe(
        catchError((data) => {
          if (data.error) {
            this.uploadFailed();
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
            this.checkUploadFile = true;
            this.checkDeletePage = true;
            let complete = (event.loaded / event.total).toFixed(2);
            let progress = parseFloat(complete);
            this.globalService.publishDataTeacherNote({
              sum: 1,
              count: progress,
            });
            break;
          case HttpEventType.Response:
            this.checkUploadFile = false;
            if (!event?.body?.success) {
              this.messageFalse(event?.body?.error);
              return;
            }
            this.temp_upload++;
            if (this.temp_upload == 2) {
              this.updateSuccess();
              this.temp_upload = 0;
            }
        }
      });
  }

  uploadMultiFileLoop(id, item) {
    this.teacherNoteService.uploadFile(item).subscribe((data) => {});
  }

  uploadFileTeacher(file) {
    let temp_id = localStorage.getItem("user_id");
    let formData = new FormData();
    formData.append("folder", this.dirName);
    formData.append("file", file, file.name);
    this.teacherNoteService.uploadFile(formData).subscribe(
      (data) => {
        this.checkUploadSingle = true;
        this.updateSuccess();
        // this.loadData()
      },
      (error) => {
        this.uploadFailed();
      }
    );
  }

  getAllIndexes(str, value) {
    var result = [];
    for (var i = 0; i < str.length; i++) {
      if (str[i] == value) {
        result.push(i);
      }
    }
    return result;
  }

  createMultiFolder(arr_name, arr_dirname) {
    this.temp_create_folder = [];
    this.temp_form_data = [];
    if (arr_name.length > 0) {
      for (var i = 0; i < arr_name.length; i++) {
        let name = arr_name[i];
        let dirname = "";
        if (arr_dirname[i] != "") {
          dirname = this.dirName + arr_dirname[i] + "/";
        } else {
          dirname = this.dirName;
        }

        let temp = {
          name: name,
          dirname: dirname,
        };
        this.temp_create_folder.push(temp);
        let formData = new FormData();
        if (this.checkSpecailChracterUpload(name)) {
          this.checkSpecialCharacters = false;
          this.uploadFailedSpecialCharacter();
          break;
        }
        formData.append("folder", dirname);
        formData.append("name", name);
        formData.append("type", "folder");
        this.temp_form_data.push(formData);
      }
    }
    if (this.temp_form_data.length > 0 && this.checkSpecialCharacters) {
      this.createFolderLoop(this.temp_form_data[this.temp_position_create]);
    }
  }

  uploadMultiFiles(arr) {
    this.temp_create_folder = [];
    this.temp_form_data = [];
    if (arr.length > 0) {
      for (var i = 0; i < arr.length; i++) {
        let folder = "";
        let file = this.temp_files[i];
        if (arr[i] != "") {
          folder = this.dirName + arr[i] + "/";
        } else {
          folder = this.dirName;
        }
        if (file != undefined) {
          let formData = new FormData();
          if (this.checkSpecailChracterUpload(file.name)) {
            this.checkSpecialCharacters = false;
            this.uploadFailedSpecialCharacter();
            break;
          }

          formData.append("name", file, file.name);
          formData.append("folder", folder);
          formData.append("type", "file");
          this.temp_form_data_upload.push(formData);
          this.temp_file_data_upload.push(file);
        }
      }
    }
    if (this.temp_form_data_upload.length > 0 && this.checkSpecialCharacters) {
      this.uploadFileLoop(
        this.temp_form_data_upload[this.temp_position_upload]
      );
    }
  }

  createFolderLoop(item) {
    this.teacherNoteService.createTeacherNotes(item).subscribe(
      (data) => {
        this.temp_position_create++;
        if (this.temp_position_create <= this.temp_form_data.length - 1) {
          this.createFolderLoop(this.temp_form_data[this.temp_position_create]);
        } else {
          this.temp_position_create = 0;
          this.temp_form_data = [];
          this.uploadMultiFiles(this.dirname_temp_file);
        }
      },
      (error) => {
        this.uploadFailed();
      }
    );
  }

  uploadFileLoop(item) {
    let temp_id = localStorage.getItem("user_id");
    this.checkUploadFile = true;
    this.checkDeletePage = true;
    this.checkCreatePage = true;
    this.backFolderCheck = true;
    if (this.temp_form_data_upload.length > 2) {
      // this.arrayPercent = []
      for (var i = 0; i < this.temp_form_data_upload.length; i++) {
        this.checkUploadFile = true;
        this.arrayPercent.push(0);
        this.arrayPercentUploadComplete.push(0);
        this.arrayPercentUpload.push(this.temp_file_data_upload[i].size);
        this.uploadOneFilePercent(
          temp_id,
          this.temp_form_data_upload[i],
          i,
          this.temp_form_data_upload.length
        );
      }
    } else if (this.temp_form_data_upload.length == 1) {
      // this.uploadOneFile(temp_id, this.temp_form_data_upload[0])
      this.checkUploadFile = true;
      this.arrayPercent.push(0);
      this.arrayPercentUploadComplete.push(0);
      this.arrayPercentUpload.push(this.temp_file_data_upload[0].size);
      this.uploadOneFilePercent(temp_id, this.temp_form_data_upload[0], 0, 1);
    } else if (this.temp_form_data_upload.length == 2) {
      for (var i = 0; i < 2; i++) {
        // this.uploadTwoFile(temp_id, this.temp_form_data_upload[i])
        this.checkUploadFile = true;
        this.arrayPercent.push(0);
        this.arrayPercentUploadComplete.push(0);
        this.arrayPercentUpload.push(this.temp_file_data_upload[i].size);
        this.uploadOneFilePercent(temp_id, this.temp_form_data_upload[i], i, 2);
      }
    }

    this.globalService.getObservable().subscribe((data) => {
      if (data.cancel) {
        this.temp_position_upload = this.temp_form_data_upload.length;
        this.checkUploadFile = false;
      }
    });
  }

  loadDataUpload(path) {
    let t = this.getAllIndexes(path, "/");
    var t1 = 0,
      t2 = 0;
    for (var k = 0; k < t.length; k++) {
      t1 = t[k];
      if (k > 0) {
        t2 = t[k - 1];
      }
      var str = "";
      if (t2 == 0) {
        str = path.substring(t2, t1);
      } else {
        str = path.substring(t2 + 1, t1);
      }

      var dirStr = path.substring(0, t2);

      let checkFolder = true;
      if (this.temp_multi.length > 0) {
        for (var f = 0; f < this.temp_multi.length; f++) {
          if (str == this.temp_multi[f] && dirStr == this.diranme_multi[f]) {
            checkFolder = false;
          }
        }
      }

      if (checkFolder) {
        this.temp_multi.push(str);
        this.diranme_multi.push(dirStr);
      }
      if (this.checkSpecailChracterUpload(str)) {
        this.checkSpecialCharacters = false;
        this.uploadFailedSpecialCharacter();
        break;
      }
    }
    if (dirStr != "") {
      let driname_file = dirStr + "/" + str;
      this.dirname_temp_file.push(driname_file);
    } else {
      let driname_file = str;
      this.dirname_temp_file.push(driname_file);
    }
  }

  loadDataPage() {
    let temp_id = localStorage.getItem("user_id");
    let note = new FormData();
    let page;
    if (this.indexPage == 0 || this.indexPage == undefined) {
      page = 1;
    } else {
      page = this.indexPage;
    }
    if (this.preUrl.length == 0) {
      note.append("folder", "");
    } else {
      note.append("folder", this.preUrl[this.count - 1]);
    }
    this.checkDelete = true;
    this.resetColorForDelete();

    this.teacherNoteService
      .listTeacherNotesNew(temp_id, page, note)
      .subscribe((data) => {
        if (this.count > 1) {
          this.checkDisableBack = false;
          this.checkChangeFolder = true;
        } else if (this.count == 1) {
          this.checkDisableBack = true;
          this.checkChangeFolder = false;
        }
        this.data_display = data.results.notes.results;
        this.quantity_folder = data.results.notes.results.length;
        this.items = data.results.notes.count;
        this.backFolderCheck = false;
      });
  }

  onChangePage(event) {
    if (!this.checkSpecialCharacters) {
      this.checkUploadFile = false;
    }
    if (!this.backFolderCheck && !this.checkUploadFile) {
      this.indexPage = event;
      let temp = event;
      if (this.pagePre == "") {
        this.pagePre = temp;
        if (this.pagePre != "") {
          this.loadDataPage();
        }
      }
      if (this.pagePre != "" && event != this.pagePre) {
        this.pagePre = event;
        this.loadDataPage();
      }
    }
    this.backFolderCheck = false;
  }

  checkFocus(index, url, name, id, type, event) {
    let t;
    if (this.color.length == 0) {
      if (this.quantity_folder > 0) {
        for (var i = 0; i < this.quantity_folder; i++) {
          if (i == index) {
            this.color.push("danger");
          } else {
            this.color.push("primary");
          }
          this.checkDelete = false;
          (this.url_delete = url), (t = name.lastIndexOf("."));
          if (t != -1 && type != "folder") {
            this.name_rename = name.substring(0, t);
          } else {
            this.name_rename = name;
          }
        }
      }
    } else {
      if (this.color[index] == "danger") {
        this.color[index] = "primary";
        this.checkDelete = true;
        this.url_delete = "";
        this.id_forcus = this.id_forcus.filter((data) => data != id);
        this.name_rename = "";
      } else if (this.color[index] == "primary") {
        this.color[index] = "danger";
        this.checkDelete = false;
        this.url_delete = url;
        this.id_forcus.push(id);
        t = name.lastIndexOf(".");
        if (t != -1 && type != "folder") {
          this.name_rename = name.substring(0, t);
        } else {
          this.name_rename = name;
        }
      }
      if (!event.shiftKey) {
        for (var i = 0; i < this.quantity_folder; i++) {
          if (i != index) {
            this.color[i] = "primary";
          }
        }
        this.id_forcus = this.id_forcus.filter((data) => data == id);
      }
    }

    this.cdr.detectChanges();
    this.checkFocusPage = true;
  }

  resetColorForDelete() {
    this.color = [];
    for (var i = 0; i < 20; i++) {
      this.color.push("primary");
    }
  }

  async DeleteFolderFile() {
    let txtCancel = "";
    if (localStorage.getItem("language") == "en") {
      this.notify_delete = "Are you sure you want to delete?";
      txtCancel = "Cancel";
    } else {
      this.notify_delete = "Adakah anda pasti ingin memadam?";
      txtCancel = "Batal";
    }

    this.checkDeletePage = true;
    const alert = await this.alertController.create({
      header: "",
      cssClass: "my-custom-alert",
      message: this.notify_delete,
      buttons: [
        {
          text: txtCancel,
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {},
        },
        {
          text: "Ok",
          handler: () => {
            const params = {
              body: {
                ids: this.id_forcus.join(","),
              },
            };

            this.teacherNoteService.multiDelete(params).subscribe((data) => {
              this.deleteSuccess();
              this.checkDeletePage = false;
              this.checkDelete = true;
              this.checkUploadFile = false;
              this.backFolderCheck = false;
              this.loadDataAfterDeleteCreate();
              this.resetColorForDelete();
            });
          },
        },
      ],
    });
    await alert.present();
  }

  loadDataAfterDeleteCreate() {
    let temp_id = localStorage.getItem("user_id");
    let note = new FormData();
    let page;
    if (this.indexPage == 0 || this.indexPage == undefined) {
      page = 1;
    } else {
      page = this.indexPage;
    }
    this.data_display = [];
    // note.append("folder", this.preUrl[this.preUrl.length - 1])
    note.append("folder", this.preUrl[this.count - 1]);
    this.teacherNoteService
      .listTeacherNotesNew(temp_id, page, note)
      .subscribe((data) => {
        if (this.count > 1) {
          this.checkDisableBack = false;
          this.checkChangeFolder = true;
        } else if (this.count == 1) {
          this.checkDisableBack = true;
          this.checkChangeFolder = false;
        }
        this.data_display = data.results.notes.results;
        this.cdr.detectChanges();
        // this.globalService.publishDataTeacherNote({"page": this.indexPage})
        this.quantity_folder = data.results.notes.results.length;
        this.items = data.results.notes.count;
        this.globalService.publishDataTeacherNoteChangeFolder({
          item: data.results.notes.count,
          page: this.indexPage,
        });
      });
  }

  async RenameFolderFile() {
    let title = "";
    this.translate
      .get("Teacher_note.btn_rename")
      .subscribe((result: string) => {
        title = result;
      });
    let name = "";
    this.translate.get("Teacher_note.name").subscribe((result: string) => {
      name = result;
    });
    const alert = await this.alertController.create({
      header: title,
      cssClass: "my-custom-alert-update",
      inputs: [
        {
          name: "name_txt",
          type: "text",
          label: name,
          placeholder: name,
          value: name,
          disabled: true,
        },
        {
          name: "name",
          type: "text",
          placeholder: name,
          value: this.name_rename,
          label: name,
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            // this.loadData()
          },
        },
        {
          text: "Ok",
          handler: (dataAlert) => {
            let params = {
              name: dataAlert.name,
            };
            this.teacherNoteService
              .renameNotes(this.id_forcus, params)
              .pipe(
                catchError((data) => {
                  if (data.error) {
                    this.renameFail();
                  }
                  return of();
                })
              )
              .subscribe((data) => {
                this.renameSuccess();
                this.checkDeletePage = false;
                this.checkDelete = true;
                this.checkUploadFile = false;
                this.backFolderCheck = false;
                this.loadDataAfterDeleteCreate();
                // this.loadDataPage()
                this.resetColorForDelete();
              });
          },
        },
      ],
    });
    await alert.present();
  }

  async deleteSuccess() {
    let title = "";
    if (localStorage.getItem("language") == "en") {
      title = "Your file/folder has been deleted successfully.";
    } else {
      title = "Fail / folder anda berjaya dihapus.";
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

  async deleteFail() {
    let title = "";
    this.translate
      .get("Teacher_note.delete_fail")
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

  async renameSuccess() {
    let title = "";
    this.translate
      .get("Teacher_note.rename_success")
      .subscribe((result: string) => {
        title = result;
      });
    const toast = await this.toastController.create({
      message: title,
      duration: 2000,
      position: "bottom",
      color: "primary",
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

  async renameFail() {
    let title = "";
    this.translate
      .get("Teacher_note.rename_fail")
      .subscribe((result: string) => {
        title = result;
      });
    const toast = await this.toastController.create({
      message: title,
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

  async uploadFailed() {
    let title = "";
    if (localStorage.getItem("language") == "en") {
      title =
        "Your file / folder has been failed to upload because of duplicated name.";
    } else {
      title = "Fail / folder anda gagal dimuat kerana nama pendua.";
    }
    this.globalService.publishDataTeacherNote({ success: true });
    const toast = await this.toastController.create({
      message: title,
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

  async uploadFailedSpecialCharacter() {
    let title = "";
    this.translate
      .get("Teacher_note.upload_fail_special")
      .subscribe((result: string) => {
        title = result;
      });
    this.globalService.publishDataTeacherNote({ success: true });
    const toast = await this.toastController.create({
      message: title,
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

  uploadSingleFile(temp_id, file) {
    const formData = new FormData();
    formData.append("folder", this.dirName);
    formData.append("file", file, file.name);
    this.teacherNoteService.uploadSingleFile(temp_id, formData).subscribe(
      (data) => {
        const { loaded, total } = data;
        if (total - loaded !== 0) {
          this.globalService.publishDataTeacherNote({
            sum: total,
            count: loaded,
          });
        } else {
          this.checkUploadFile = false;
          this.updateSuccess();
        }
      },
      (error) => {
        this.uploadFailed();
      }
    );
  }

  // Rename file/folder
  async renameTeacherNoteModal() {
    const modal = await this.modalController.create({
      component: RenameNotePage,
      showBackdrop: false,
      cssClass: "renameNote",
      componentProps: {
        nameNote: this.name_rename,
        idNote: this.id_forcus[0],
      },
    });
    modal.onDidDismiss().then((data) => {
      if (data.data != undefined) {
        if (data.data.success) {
          this.renameSuccess();
          this.checkDeletePage = false;
          this.checkDelete = true;
          this.checkUploadFile = false;
          this.backFolderCheck = false;
          this.loadDataAfterDeleteCreate();
          this.resetColorForDelete();
        } else {
          this.renameFail();
        }
      }
    });
    return await modal.present();
  }

  // Create folder
  async createFolderModal() {
    const modal = await this.modalController.create({
      component: CreateFolderPage,
      showBackdrop: false,
      cssClass: "renameNote",
      componentProps: {
        // folder: this.dirName
        folder: this.preUrl[this.count - 1],
      },
    });
    modal.onDidDismiss().then((data) => {
      if (data.data != undefined) {
        if (data.data.success) {
          this.checkCreate = true;
          this.checkDeletePage = true;
          this.checkUploadFile = false;
          this.checkCreatePage = false;
          this.backFolderCheck = false;
          this.createSuccess();
          this.loadDataAfterDeleteCreate();
        } else {
          this.createFail(data.role);
        }
      }
    });
    return await modal.present();
  }

  checkSpecailChracterUpload(name) {
    var pattern = /^[a-zA-Z0-9:.,=+_ -]*$/;
    if (name.match(pattern)) {
    } else {
      this.checkUploadFile = false;
      return true;
    }
    return false;
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
