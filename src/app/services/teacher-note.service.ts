import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { ConfigService } from "./config.service";
import { Observable } from "rxjs";
import { url } from "inspector";

@Injectable({
  providedIn: "root",
})
export class TeacherNoteService {
  teacherNotesUrl = this.config.getConfig().teacher_notes;

  constructor(
    private http: HttpClient,
    private router: Router,
    private config: ConfigService
  ) {}

  listTeacherNotes(id): Observable<any> {
    return this.http.get(this.teacherNotesUrl.list.replace(":id", id));
  }

  // createTeacherNotes(params): Observable<any>{
  //   return this.http.post(this.teacherNotesUrl.create, params);
  // }

  // uploadFile(id, params): Observable<any>{
  //   return this.http.post(this.teacherNotesUrl.list.replace(':id', id), params);
  // }

  createTeacherNotes(params): Observable<any> {
    return this.http.post(this.teacherNotesUrl.upload, params);
  }

  uploadFile(params): Observable<any> {
    return this.http.post(this.teacherNotesUrl.upload, params, {
      reportProgress: true,
      observe: "events",
    });
  }

  DeleteFolderFile(id, params): Observable<any> {
    return this.http.delete(
      this.teacherNotesUrl.delete.replace(":id", id),
      params
    );
  }

  uploadSingleFile(id, params): Observable<any> {
    return this.http.post(
      this.teacherNotesUrl.list.replace(":id", id),
      params,
      {
        reportProgress: true,
        observe: "events",
      }
    );
  }

  uploadFileSingle(id, params): Observable<any> {
    return this.http.post(
      this.teacherNotesUrl.list.replace(":id", id),
      params,
      {
        reportProgress: true,
        observe: "events",
      }
    );
  }

  listTeacherNotesUrl(id, params): Observable<any> {
    return this.http.post(
      this.teacherNotesUrl.list_child.replace(":id", id),
      params
    );
  }

  listTeacherNotesUrlPage(url, params): Observable<any> {
    return this.http.post(url, params);
  }

  urlListRoot(id) {
    return this.teacherNotesUrl.list_new_root.replace(":id", id);
  }

  urlDirname(id) {
    return this.teacherNotesUrl.dirname.replace(":id", id);
  }

  urlDirnameChild(id) {
    return this.teacherNotesUrl.dirname_child.replace(":id", id);
  }

  urlDirnamePage(id) {
    return this.teacherNotesUrl.dirname_child.replace(":id", id);
  }

  getDataPage(id, params): Observable<any> {
    return this.http.get(this.teacherNotesUrl.list.replace(":id", id), {
      params,
    });
  }

  getDataChildPage(id, params): Observable<any> {
    return this.http.get(this.teacherNotesUrl.list_child.replace(":id", id), {
      params,
    });
  }

  listTeacherNotesNew(id, index, params): Observable<any> {
    return this.http.post(
      this.teacherNotesUrl.list_new.replace(":id", id).replace(":index", index),
      params
    );
  }

  DeleteNotes(id): Observable<any> {
    return this.http.delete(this.teacherNotesUrl.remove.replace(":id", id));
  }

  renameNotes(id, params): Observable<any> {
    return this.http.patch(
      this.teacherNotesUrl.rename.replace(":id", id),
      params
    );
  }

  deleteTeacher(id): Observable<any> {
    return this.http.delete(this.teacherNotesUrl.delete.replace(":id", id));
  }

  multiDelete(params): Observable<any> {
    return this.http.delete(this.teacherNotesUrl.multi_delete, params);
  }
}
