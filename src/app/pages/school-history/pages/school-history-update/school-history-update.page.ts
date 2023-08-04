import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormControl,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SchoolHistoryService } from "src/app/services/school-history.service";
import * as moment from "moment";
import { TranslateService } from "@ngx-translate/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-school-history-update",
  templateUrl: "./school-history-update.page.html",
  styleUrls: ["./school-history-update.page.scss"],
})
export class SchoolHistoryUpdatePage implements OnInit {
  public publishDate: Date;
  public isActive = true;
  public checkImage = true;
  public checkSubmit = false;
  public checkQuill = false;
  public isActiveArr = [
    { value: true, name: "Active" },
    { value: false, name: "Inactive" },
  ];

  public img = new Image();
  public checkError = false;
  public img1 = "/assets/img/1.jpg";
  public photo = "";
  public formData = new FormData();
  public school_history_id;
  public temp_photo;
  public fileTypes = ["image/jpeg", "image/png"];
  public check_file_type = false;
  public title = "";
  public title_update = "";
  updateHistoryForm: FormGroup = this.formBuilder.group({
    title: ["", [Validators.required]],
    push_date: ["", [Validators.required]],
    // photo: ['', [Validators.required]],
    isActive: ["", [Validators.required]],
    quill: ["", [Validators.required]],
  });

  public editor;
  public changed;
  public selectChanged;
  public htmlText: any;
  image: any;
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private schoolHistoryService: SchoolHistoryService,
    private translate: TranslateService,
    private sanitizer: DomSanitizer
  ) {
    this.translate.use(localStorage.getItem("language"));
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.translate.use(localStorage.getItem("language"));
    this.school_history_id = +this.activatedRoute.snapshot.paramMap.get("id");
    this.schoolHistoryService
      .getSchoolHistory(this.school_history_id)
      .subscribe((data) => {
        this.title = data.title;
        this.publishDate = new Date(
          moment.utc(data.publish_date).format("MM-DD-YYYY HH:mm")
        );
        this.htmlText = data.content;
        this.isActive = data.is_active;
        if (data.photo != null) {
          this.img.src = data.photo;
          this.checkImage = true;
        } else {
          this.img.src = "";
          this.checkImage = false;
        }
      });
  }

  updateHistory() {
    this.checkSubmit = true;
    if (this.img.src == "") {
      this.checkImage = false;
    }
    if (
      this.updateHistoryForm.valid &&
      this.checkImage &&
      !this.check_file_type
    ) {
      let formData = new FormData();
      formData.append("title", this.updateHistoryForm.controls.title.value);
      if (this.checkQuill) {
        formData.append("content", this.changed);
      } else {
        formData.append("content", this.htmlText);
      }
      if (this.temp_photo != undefined) {
        formData.append("photo", this.temp_photo, this.temp_photo.name);
      }
      formData.append(
        "publish_date",
        moment(this.updateHistoryForm.controls.push_date.value).format(
          "YYYY-MM-DD HH:mm:ss"
        )
      );
      formData.append(
        "is_active",
        this.updateHistoryForm.controls.isActive.value
      );
      // formData.append('created_by', "1")
      // formData.append('updated_by', "2")
      this.schoolHistoryService
        .updateSchoolHistory(this.school_history_id, formData)
        .subscribe((data) => {
          this.router.navigate(["/school-history"]);
        });
    } else {
      this.checkError = true;
    }
  }

  onChange(fileList: FileList): void {
    this.check_file_type = false;
    let file = fileList[0];
    this.temp_photo = fileList[0];
    let fileReader: FileReader = new FileReader();
    if (!this.validFileType(fileList[0].type)) {
      this.check_file_type = true;
      this.title_update = fileList[0].name;
    } else {
      this.temp_photo = fileList[0];
    }
    this.img.src = URL.createObjectURL(file);
    this.img.title = file.name;
    fileReader.readAsDataURL(file);
    this.checkImage = true;
  }

  validFileType(file) {
    return this.fileTypes.includes(file);
  }

  changePublishDate() {}

  handleEditorCreated(event: any) {
    this.editor = event;
  }

  handleChange(event: any) {
    this.checkQuill = true;
    this.changed = event.html;
  }

  onSelectionChanged(event: any) {
    this.selectChanged = event;
  }

  zoomPicture(imgUrl) {
    this.image = this.sanitizer.bypassSecurityTrustResourceUrl(imgUrl);
  }

  closeZoom() {
    this.image = "";
  }
}
