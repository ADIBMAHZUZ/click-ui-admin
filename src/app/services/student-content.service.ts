import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentContentService {
  studentContentUrl = this.config.getConfig().student_content;

  constructor(private http: HttpClient,
    private router: Router,
    private config: ConfigService,) { }

  listStudentContent() {
    return this.http.get<any>(this.studentContentUrl.list)
  }
  getStudentContent(id): Observable<any>{
    return this.http.get(this.studentContentUrl.get.replace(':id', id));
  }
  createStudentContent(params): Observable<any>{
    return this.http.post(this.studentContentUrl.create, params);
  }

  updateStudentContent(id, params): Observable<any>{
    return this.http.patch(this.studentContentUrl.update.replace(':id', id), params);
  }

  deleteStudentContent(id): Observable<any>{
    return this.http.delete(this.studentContentUrl.delete.replace(':id', id));
  }

  searchStudentContent(title): Observable<any>{
    // return this.http.get(`${this.studentContentUrl.search}?title=${title}`);
    return this.http.get(this.studentContentUrl.search + "?title=" + title);
  }

  listPageStudentContent(params){
    return this.http.get<any>(this.studentContentUrl.list, {
      params
    })
  }
  
  deleteReal(id): Observable<any>{
    return this.http.delete(this.studentContentUrl.remove.replace(':id', id));
  }
}
