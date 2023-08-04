import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormControl,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { Router } from "@angular/router";
import { StudentContentService } from "src/app/services/student-content.service";
import * as moment from "moment";
import { TranslateService } from "@ngx-translate/core";
import { UserType } from "src/app/models/user";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-student-content-create",
  templateUrl: "./student-content-create.page.html",
  styleUrls: ["./student-content-create.page.scss"],
})
export class StudentContentCreatePage implements OnInit {
  public isActiveArr = [
    { value: true, name: "Active" },
    { value: false, name: "Inactive" },
  ];

  public isActiveArrStudent = [{ value: true, name: "Active" }];

  public statusLibrary = [
    { value: "draft", name: "Draft" },
    { value: "publish", name: "Publish" },
  ];

  public statusTeacher = [{ value: "draft", name: "Draft" }];

  public checkStatus = false;

  public img = new Image();
  public checkError = false;
  public checkImage = false;
  public checkQuill = false;
  public checkSubmit = false;
  public formData = new FormData();
  public publishDate;
  public temp_photo;
  public title = "";
  public fileTypes = ["image/jpeg", "image/png"];
  public check_file_type = false;

  createStudentForm: FormGroup = this.formBuilder.group({
    title: ["", [Validators.required]],
    push_date: ["", [Validators.required]],
    logo: ["", [Validators.required]],
    isActive: ["", [Validators.required]],
    status: ["draft", [Validators.required]],
  });

  public editor;
  public changed;
  image: any;
  constructor(
    private formBuilder: FormBuilder,
    private studentContentService: StudentContentService,
    private router: Router,
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
  }

  createStudent() {
    this.checkSubmit = true;
    if (
      this.createStudentForm.valid &&
      this.checkQuill &&
      !this.check_file_type
    ) {
      let formData = new FormData();
      formData.append("title", this.createStudentForm.controls.title.value);
      formData.append("content", this.changed);
      formData.append(
        "publish_date",
        moment(this.createStudentForm.controls.push_date.value).format(
          "YYYY-MM-DD HH:mm"
        )
      );
      formData.append(
        "is_active",
        this.createStudentForm.controls.isActive.value
      );
      formData.append("photo", this.temp_photo, this.temp_photo.name);

      if (this.checkStatus) {
        formData.append("status", this.createStudentForm.controls.status.value);
      }
      this.studentContentService
        .createStudentContent(formData)
        .subscribe((data) => {
          this.router.navigate(["/student-content"]);
        });
    } else {
      this.checkError = true;
    }
  }

  onChange(element): void {
    this.check_file_type = false;
    let file = element[0];
    if (!this.validFileType(element[0].type)) {
      this.check_file_type = true;
    } else {
      this.temp_photo = element[0];
      this.img.src = URL.createObjectURL(file);
    }
    let fileReader: FileReader = new FileReader();
    this.title = file.name;
    this.img.title = file.name;
    fileReader.readAsDataURL(file);
    this.checkImage = true;
  }

  changePublishDate() {
    this.publishDate = this.createStudentForm.controls.push_date.value;
  }

  handleEditorCreated(event: any) {
    this.editor = event;
  }

  handleChange(event: any) {
    this.checkQuill = true;
    this.changed = event.html;
  }

  validFileType(file) {
    return this.fileTypes.includes(file);
  }

  zoomPicture(imgUrl) {
    this.image = this.sanitizer.bypassSecurityTrustResourceUrl(imgUrl);
  }

  closeZoom() {
    this.image = "";
  }
}
