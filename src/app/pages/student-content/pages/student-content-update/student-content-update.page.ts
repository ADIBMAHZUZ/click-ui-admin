import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormControl,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { StudentContentService } from "src/app/services/student-content.service";
import * as moment from "moment";
import { TranslateService } from "@ngx-translate/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-student-content-update",
  templateUrl: "./student-content-update.page.html",
  styleUrls: ["./student-content-update.page.scss"],
})
export class StudentContentUpdatePage implements OnInit {
  public statusLibrary = [
    { value: "draft", name: "Draft" },
    { value: "publish", name: "Publish" },
  ];

  public statusLibraryPublish = [{ value: "publish", name: "Publish" }];

  public statusTeacher = [{ value: "draft", name: "Draft" }];
  public checkStatus = false;

  public title = "";
  public publishDate: Date;
  public publishDateStr = "";
  public isActive = true;
  public isActiveArr = [
    { value: true, name: "Active" },
    { value: false, name: "Inactive" },
  ];
  public img = new Image();
  public checkImage = false;
  public checkError = false;
  public photo = "";
  public formData = new FormData();
  public student_content_id;
  public checkSubmit = false;
  public checkQuill = false;
  public status = "";
  public temp_photo;
  public checkUpdate = false;
  public status_active = "";

  updateStudentForm: FormGroup = this.formBuilder.group({
    title: ["", [Validators.required]],
    push_date: ["", [Validators.required]],
    // logo: ['', [Validators.required]],
    isActive: ["", [Validators.required]],
    quill: ["", [Validators.required]],
    status: ["", [Validators.required]],
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
    private studentContentService: StudentContentService,
    private translate: TranslateService,
    private sanitizer: DomSanitizer
  ) {
    this.translate.use(localStorage.getItem("language"));
    let uerType = localStorage.getItem("user_type");
    if (uerType == "librarian") {
      this.checkStatus = true;
    } else if (uerType == "subscriber") {
      this.checkStatus = false;
    }
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.translate.use(localStorage.getItem("language"));
    let uerType = localStorage.getItem("user_type");
    if (uerType == "librarian") {
      this.checkStatus = true;
    } else if (uerType == "subscriber") {
      this.checkStatus = false;
    }
    this.student_content_id = +this.activatedRoute.snapshot.paramMap.get("id");
    this.studentContentService
      .getStudentContent(this.student_content_id)
      .subscribe((data) => {
        this.title = data.title;
        this.publishDate = new Date(
          moment.utc(data.publish_date).format("MM-DD-YYYY HH:mm")
        );
        this.publishDateStr = moment
          .utc(data.publish_date)
          .format("MM/DD/YYYY HH:mm");
        this.htmlText = data.content;
        this.isActive = data.is_active;
        if (data.is_active) {
          this.status_active = "Active";
        } else {
          this.status_active = "Inactive";
        }
        this.status = data.status;
        if (data.status == "publish" && uerType == "librarian") {
          this.checkUpdate = true;
        } else {
          this.checkUpdate = false;
        }
        if (data.photo != null) {
          this.img.src = data.photo;
          this.checkImage = true;
        } else {
          this.img.src = "";
          this.checkImage = false;
        }
      });
  }

  updateStudent() {
    this.checkSubmit = true;
    if (this.img.src == "") {
      this.checkImage = false;
    }
    if (this.updateStudentForm.valid && this.checkImage) {
      let formData = new FormData();
      formData.append("title", this.updateStudentForm.controls.title.value);
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
        moment(this.updateStudentForm.controls.push_date.value).format(
          "YYYY-MM-DD HH:mm:ss"
        )
      );
      formData.append(
        "is_active",
        this.updateStudentForm.controls.isActive.value
      );
      if (this.checkStatus) {
        formData.append("status", this.updateStudentForm.controls.status.value);
      }
      this.studentContentService
        .updateStudentContent(this.student_content_id, formData)
        .subscribe((data) => {
          this.router.navigate(["/student-content"]);
        });
    } else {
      this.checkError = true;
    }
  }

  onChange(fileList: FileList): void {
    let file = fileList[0];
    this.temp_photo = fileList[0];
    let fileReader: FileReader = new FileReader();
    // if (file != undefined) {
    //   this.formData.append("photo", file, file.name);
    // }
    this.img.src = URL.createObjectURL(file);
    this.img.title = file.name;
    fileReader.readAsDataURL(file);
    this.checkImage = true;
  }

  changePublishDate() {}

  handleEditorCreated(event: any) {
    this.editor = event;
  }

  handleEditorUpdatePub(event: any) {
    event.enable(false);
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
