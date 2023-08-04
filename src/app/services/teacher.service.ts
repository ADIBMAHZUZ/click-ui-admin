import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { ConfigService } from "./config.service";
import { Observable } from "rxjs";

declare var require: any;
const FileSaver = require("file-saver");

@Injectable({
  providedIn: "root",
})
export class TeacherService {
  teacherUrl = this.config.getConfig().teachers;

  constructor(
    private http: HttpClient,
    private router: Router,
    private config: ConfigService
  ) {}

  listTeacher() {
    return this.http.get<any>(this.teacherUrl.list);
  }
  getTeacher(id): Observable<any> {
    return this.http.get(this.teacherUrl.get.replace(":id", id));
  }

  createTeacher(params): Observable<any> {
    return this.http.post(this.teacherUrl.create, params);
  }

  updateTeacher(id, params): Observable<any> {
    return this.http.patch(this.teacherUrl.update.replace(":id", id), params);
  }

  updateStatusTeacher(id): Observable<any> {
    return this.http.delete(this.teacherUrl.updateStatus.replace(":id", id));
  }

  searchTeacher(text): Observable<any> {
    // return this.http.get(`${this.teacherUrl.search}?search=<${text}>`);
    return this.http.get(this.teacherUrl.search + "?search=" + text);
  }

  listPageTeacher(params) {
    return this.http.get<any>(this.teacherUrl.list, {
      params,
    });
  }

  listTeacherLibrary(params) {
    return this.http.get<any>(this.teacherUrl.list, {
      params,
    });
  }

  downloadFile() {
    const pdfUrl = "/assets/csv/teacher.csv";
    //const pdfName = 'your_pdf_file';
    FileSaver.saveAs(pdfUrl, "teacher.csv", { type: "text/csv;charset=utf-8" });
  }

  importCsvTeachers(params): Observable<any> {
    return this.http.post(this.teacherUrl.import, params);
  }

  delete(params): Observable<any> {
    return this.http.delete(this.teacherUrl.deleteMulti, params);
  }
}
