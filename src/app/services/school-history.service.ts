import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchoolHistoryService {
  schoolHistoryUrl = this.config.getConfig().school_history;

  constructor(private http: HttpClient,
    private router: Router,
    private config: ConfigService,) { }

  listSchoolHistory() {
    return this.http.get<any>(this.schoolHistoryUrl.list)
  }
  getSchoolHistory(id): Observable<any>{
    return this.http.get(this.schoolHistoryUrl.get.replace(':id', id));
  }
  createSchoolHistory(params): Observable<any>{
    return this.http.post(this.schoolHistoryUrl.create, params);
  }

  updateSchoolHistory(id, params): Observable<any>{
    return this.http.patch(this.schoolHistoryUrl.update.replace(':id', id), params);
  }

  deleteSchoolHistory(id): Observable<any>{
    return this.http.delete(this.schoolHistoryUrl.delete.replace(':id', id));
  }

  deleteSchoolHistoryReal(id): Observable<any>{
    return this.http.delete(this.schoolHistoryUrl.remove.replace(':id', id));
  }
  
  searchSchoolHistory(title): Observable<any>{
    // return this.http.get(`${this.schoolHistoryUrl.search}?title=${title}`);
    return this.http.get(this.schoolHistoryUrl.search + "?title=" + title);
  }

  listPageSchoolHistory(params){
    return this.http.get<any>(this.schoolHistoryUrl.list, {
      params
    })
  }
}
