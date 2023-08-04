import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TeacherService } from "src/app/services/teacher.service";
import { TranslateService } from "@ngx-translate/core";
import { LibraryService } from "src/app/services/library.service";

@Component({
  selector: "app-teacher-view",
  templateUrl: "./teacher-view.page.html",
  styleUrls: ["./teacher-view.page.scss"],
})
export class TeacherViewPage implements OnInit {
  public name = "";
  public short_name = "";
  public address = "";
  public phone = "";
  public email = "";
  public username = "";
  public logo = "";
  public isActive = "";
  public library;
  public storage;
  public teacher_id;
  public dataLibrary;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private teacherService: TeacherService,
    private translate: TranslateService,
    private libraryService: LibraryService
  ) {
    this.translate.use(localStorage.getItem("language"));
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.translate.use(localStorage.getItem("language"));
    this.libraryService.listLibraries().subscribe((data) => {
      this.dataLibrary = data.results;
    });
    this.teacher_id = +this.activatedRoute.snapshot.paramMap.get("id");
    this.teacherService.getTeacher(this.teacher_id).subscribe((data) => {
      this.name = data.name;
      this.short_name = data.short_name;
      this.address = data.address;
      this.phone = data.phone;
      this.email = data.email;
      this.username = data.username;
      this.storage = data?.storage;
      let temp = data.library;
      this.libraryService.listLibraries().subscribe((data) => {
        this.dataLibrary = data.results;
        this.dataLibrary.forEach((element) => {
          if (element.id == temp) {
            this.library = element.name;
          }
        });
      });
      if (data.is_active) {
        this.isActive = "Active";
      } else {
        this.isActive = "Inactive";
      }
      if (data.logo != null) {
        this.logo = data.logo;
      } else {
        this.logo = "";
      }
    });
  }
}
