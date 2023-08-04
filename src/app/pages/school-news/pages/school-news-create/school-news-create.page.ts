import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { SchoolNewsService } from "src/app/services/school-news.service";
import { Router } from "@angular/router";
import * as moment from "moment";
import { TranslateService } from "@ngx-translate/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-school-news-create",
  templateUrl: "./school-news-create.page.html",
  styleUrls: ["./school-news-create.page.scss"],
})
export class SchoolNewsCreatePage implements OnInit {
  public isActiveArr = [
    { value: true, name: "Active" },
    { value: false, name: "Inactive" },
  ];
  public img = new Image();
  public checkImage = false;
  public checkError = false;
  public checkQuill = false;
  public checkSubmit = false;
  public formData = new FormData();
  public publishDate;
  public date;
  public temp_photo;
  public fileTypes = ["image/jpeg", "image/png"];
  public check_file_type = false;
  public title_update = "";

  createNewsForm: FormGroup = this.formBuilder.group({
    title: ["", [Validators.required]],
    push_date: ["", [Validators.required]],
    logo: ["", [Validators.required]],
    isActive: ["", [Validators.required]],
    // quill: ['', [Validators.required]],
  });

  public editor;
  public changed;
  image: any;
  constructor(
    private formBuilder: FormBuilder,
    private schoolNewsService: SchoolNewsService,
    private router: Router,
    private translate: TranslateService,
    private sanitizer: DomSanitizer
  ) {
    this.translate.use(localStorage.getItem("language"));
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.translate.use(localStorage.getItem("language"));
  }

  createNews() {
    this.checkSubmit = true;
    if (this.img.src == "") {
      this.checkImage = false;
    }

    if (this.createNewsForm.valid && this.checkQuill && !this.check_file_type) {
      let formData = new FormData();
      formData.append("title", this.createNewsForm.controls.title.value);
      formData.append("content", this.changed);
      formData.append(
        "publish_date",
        moment(this.createNewsForm.controls.push_date.value).format(
          "YYYY-MM-DD HH:mm"
        )
      );
      formData.append("is_active", this.createNewsForm.controls.isActive.value);
      formData.append("photo", this.temp_photo, this.temp_photo.name);
      // formData.append('created_by', "1")
      // formData.append('updated_by', "2")
      this.schoolNewsService.createSchoolNews(formData).subscribe((data) => {
        this.router.navigate(["/school-news"]);
      });
    } else {
      this.checkError = true;
    }
  }

  onChange(element): void {
    this.check_file_type = false;
    let file = element[0];
    this.temp_photo = element[0];
    let fileReader: FileReader = new FileReader();
    if (!this.validFileType(element[0].type)) {
      this.check_file_type = true;
      this.title_update = element[0].name;
    } else {
      this.temp_photo = element[0];
    }
    this.img.src = URL.createObjectURL(file);
    this.img.title = file.name;
    fileReader.readAsDataURL(file);
    this.checkImage = true;
  }

  validFileType(file) {
    return this.fileTypes.includes(file);
  }

  changePublishDate() {
    this.publishDate = this.createNewsForm.controls.push_date.value;
  }

  handleEditorCreated(event: any) {
    this.editor = event;
  }

  handleChange(event: any) {
    this.checkQuill = true;
    this.changed = event.html;
  }
  zoomPicture(imgUrl) {
    this.image = this.sanitizer.bypassSecurityTrustResourceUrl(imgUrl);
  }

  closeZoom() {
    this.image = "";
  }
}
